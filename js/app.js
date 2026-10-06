(() => {
  "use strict";

  // Campos usados como filtro: [chave nos dados, rótulo exibido]
  const CAMPOS = [
    ["categoria", "Categoria"],
    ["tipo", "Tipo de fonte"],
    ["pais", "País"],
    ["idioma", "Idioma"]
  ];

  const $ = (id) => document.getElementById(id);
  const el = {
    busca: $("busca"), ordem: $("ordem"), lista: $("lista"), vazio: $("vazio"),
    contagem: $("contagem"), grupos: $("filtros-grupos"), selo: $("filtros-ativos"),
    limpar: $("limpar"), limparVazio: $("limpar-vazio")
  };

  const estado = { termo: "", filtros: {}, ordem: "az" };
  CAMPOS.forEach(([k]) => (estado.filtros[k] = new Set()));

  const valores = (fonte, chave) => [].concat(fonte[chave] ?? []);
  // Remove acentos e caixa para a pesquisa ignorar "á" vs "a"
  const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const collator = new Intl.Collator("pt-BR");

  function montarFiltros() {
    el.grupos.innerHTML = "";
    CAMPOS.forEach(([chave, rotulo]) => {
      const contagem = new Map();
      FONTES.forEach((f) => valores(f, chave).forEach((v) => contagem.set(v, (contagem.get(v) || 0) + 1)));
      if (!contagem.size) return;

      const fs = document.createElement("fieldset");
      fs.className = "grupo";
      const lg = document.createElement("legend");
      lg.textContent = rotulo;
      fs.append(lg);
      [...contagem.keys()].sort(collator.compare).forEach((valor) => {
        const label = document.createElement("label");
        label.className = "opcao";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.dataset.chave = chave;
        input.value = valor;
        input.checked = estado.filtros[chave].has(valor);
        const texto = document.createElement("span");
        texto.textContent = valor;
        const n = document.createElement("small");
        n.textContent = contagem.get(valor);
        label.append(input, texto, n);
        fs.append(label);
      });
      el.grupos.append(fs);
    });
  }

  function filtrar() {
    const termos = norm(estado.termo).split(/\s+/).filter(Boolean);
    return FONTES.filter((f) => {
      // Entre grupos: E. Dentro do mesmo grupo: OU.
      const passaFiltros = CAMPOS.every(([k]) => {
        const sel = estado.filtros[k];
        return !sel.size || valores(f, k).some((v) => sel.has(v));
      });
      if (!passaFiltros) return false;
      const alvo = norm([f.nome, f.descricao, f.tipo, f.pais, f.idioma, ...valores(f, "categoria")].join(" "));
      return termos.every((t) => alvo.includes(t));
    });
  }

  function ordenar(lista) {
    const porNome = (a, b) => collator.compare(a.nome, b.nome);
    if (estado.ordem === "za") return lista.sort((a, b) => porNome(b, a));
    if (estado.ordem === "categoria")
      return lista.sort((a, b) => collator.compare(valores(a, "categoria")[0] || "", valores(b, "categoria")[0] || "") || porNome(a, b));
    return lista.sort(porNome);
  }

  // Cor do monograma derivada do nome (sempre a mesma para a mesma fonte)
  function matiz(nome) {
    let h = 0;
    for (const c of nome) h = (h * 31 + c.charCodeAt(0)) % 360;
    return h;
  }

  function dominio(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
  }

  function cartao(f) {
    const li = document.createElement("li");
    li.className = "cartao";
    li.style.setProperty("--matiz", matiz(f.nome));

    const mono = document.createElement("span");
    mono.className = "cartao__mono";
    mono.setAttribute("aria-hidden", "true");
    mono.textContent = f.nome.trim().charAt(0).toUpperCase();

    // Se a fonte tiver "logo", troca a inicial pela imagem assim que ela carregar.
    // Se o arquivo não existir ou falhar, a inicial continua aparecendo.
    if (f.logo) {
      const img = new Image();
      img.alt = "";
      img.loading = "lazy";
      img.addEventListener("load", () => {
        mono.textContent = "";
        mono.classList.add("cartao__mono--logo");
        mono.append(img);
      });
      img.src = f.logo;
    }

    const corpo = document.createElement("div");
    corpo.className = "cartao__corpo";

    const h2 = document.createElement("h2");
    const a = document.createElement("a");
    a.href = f.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = f.nome;
    h2.append(a);

    const dom = document.createElement("p");
    dom.className = "cartao__dominio";
    dom.textContent = dominio(f.url);

    const desc = document.createElement("p");
    desc.className = "cartao__desc";
    desc.textContent = f.descricao;

    const tags = document.createElement("ul");
    tags.className = "tags";
    [f.tipo, ...valores(f, "categoria")].filter(Boolean).forEach((t, i) => {
      const tag = document.createElement("li");
      tag.textContent = t;
      if (i === 0) tag.className = "tag--tipo";
      tags.append(tag);
    });

    const meta = document.createElement("p");
    meta.className = "cartao__meta";
    meta.textContent = `${f.pais} · ${f.idioma}`;

    corpo.append(h2, dom, desc, tags, meta);
    li.append(mono, corpo);
    return li;
  }

  function renderizar() {
    const resultado = ordenar(filtrar());
    el.lista.replaceChildren(...resultado.map(cartao));
    el.vazio.hidden = resultado.length > 0;
    el.contagem.textContent =
      resultado.length === FONTES.length
        ? `${FONTES.length} fontes`
        : `${resultado.length} de ${FONTES.length} fontes`;

    const ativos = CAMPOS.reduce((n, [k]) => n + estado.filtros[k].size, 0);
    el.selo.hidden = !ativos;
    el.selo.textContent = ativos;
    el.limpar.disabled = !ativos && !estado.termo;
  }

  function limparTudo() {
    estado.termo = "";
    el.busca.value = "";
    CAMPOS.forEach(([k]) => estado.filtros[k].clear());
    montarFiltros();
    renderizar();
    el.busca.focus();
  }

  // Eventos
  el.busca.addEventListener("input", (e) => { estado.termo = e.target.value; renderizar(); });
  el.ordem.addEventListener("change", (e) => { estado.ordem = e.target.value; renderizar(); });
  el.grupos.addEventListener("change", (e) => {
    const chave = e.target.dataset.chave;
    if (!chave) return;
    if (e.target.checked) estado.filtros[chave].add(e.target.value);
    else estado.filtros[chave].delete(e.target.value);
    renderizar();
  });
  el.limpar.addEventListener("click", limparTudo);
  el.limparVazio.addEventListener("click", limparTudo);

  // Em telas pequenas, os filtros começam recolhidos
  if (window.matchMedia("(max-width: 800px)").matches) {
    document.querySelector(".filtros__caixa").removeAttribute("open");
  }

  montarFiltros();
  renderizar();
})();