/*
  ADICIONE SUAS FONTES AQUI.
  Copie um bloco { ... } e preencha os campos:
    nome       – nome da fonte
    url        – endereço do site (com https://)
    descricao  – uma frase curta do que a fonte cobre
    categoria  – lista de assuntos, ex.: ["Geral", "Política"]
    tipo       – "Jornal", "Agência", "Checagem", "Ciência", "Público" etc.
    pais       – país de origem
    idioma     – idioma principal
    logo       – (opcional) caminho da imagem da fonte, ex.: "assets/fontes/lupa.png".
                 Sem este campo, ou se o arquivo não existir, aparece a inicial do nome.
  Os filtros da página são gerados automaticamente a partir destes campos.
  Exemplos abaixo: confira cada URL antes de publicar.
*/
const FONTES = [
  {
    nome: "Agência Brasil",
    url: "https://agenciabrasil.ebc.com.br",
    descricao: "Agência pública de notícias do governo federal, com cobertura nacional e internacional.",
    categoria: ["Geral", "Política"],
    tipo: "Agência",
    pais: "Brasil",
    idioma: "Português"
  },
  {
    nome: "Agência Lupa",
    url: "https://lupa.news",
    descricao: "Checagem de fatos e de declarações públicas, com metodologia explicada.",
    categoria: ["Checagem"],
    tipo: "Checagem",
    pais: "Brasil",
    idioma: "Português"
  },
  {
    nome: "Aos Fatos",
    url: "https://www.aosfatos.org",
    descricao: "Checagem de discursos e monitoramento de desinformação nas redes.",
    categoria: ["Checagem", "Política"],
    tipo: "Checagem",
    pais: "Brasil",
    idioma: "Português"
  },
  {
    nome: "Agência FAPESP",
    url: "https://agencia.fapesp.br",
    descricao: "Notícias sobre pesquisa científica e tecnológica produzida no Brasil.",
    categoria: ["Ciência", "Tecnologia"],
    tipo: "Ciência",
    pais: "Brasil",
    idioma: "Português"
  },
  {
    nome: "Agência de Notícias do IBGE",
    url: "https://agenciadenoticias.ibge.gov.br",
    descricao: "Divulgação de dados oficiais sobre economia, população e território.",
    categoria: ["Economia", "Dados"],
    tipo: "Público",
    pais: "Brasil",
    idioma: "Português"
  },
  {
    nome: "BBC News Brasil",
    url: "https://www.bbc.com/portuguese",
    descricao: "Reportagens e análises em português da emissora pública britânica.",
    categoria: ["Geral", "Internacional"],
    tipo: "Jornal",
    pais: "Reino Unido",
    idioma: "Português"
  },
  {
    nome: "Reuters",
    url: "https://www.reuters.com",
    descricao: "Agência internacional com foco em negócios, mercados e política global.",
    categoria: ["Internacional", "Economia"],
    tipo: "Agência",
    pais: "Reino Unido",
    idioma: "Inglês"
  },
  {
    nome: "Associated Press",
    url: "https://apnews.com",
    descricao: "Cooperativa de jornalismo com cobertura factual de eventos no mundo todo.",
    categoria: ["Geral", "Internacional"],
    tipo: "Agência",
    pais: "Estados Unidos",
    idioma: "Inglês"
  },
  {
    nome: "Nature News",
    url: "https://www.nature.com/news",
    descricao: "Notícias sobre ciência da revista científica Nature.",
    categoria: ["Ciência"],
    tipo: "Ciência",
    pais: "Reino Unido",
    idioma: "Inglês"
  },
  {
    nome: "Nexo Jornal",
    url: "https://www.nexojornal.com.br",
    descricao: "Jornalismo explicativo com contexto e dados sobre os temas do dia.",
    categoria: ["Geral", "Política", "Economia"],
    tipo: "Jornal",
    pais: "Brasil",
    idioma: "Português"
  },
  {
    nome: "Ars Technica",
    url: "https://arstechnica.com",
    descricao: "Cobertura aprofundada de tecnologia, ciência e políticas digitais.",
    categoria: ["Tecnologia", "Ciência"],
    tipo: "Jornal",
    pais: "Estados Unidos",
    idioma: "Inglês"
  },
  {
    nome: "Tecnoblog",
    url: "https://tecnoblog.net",
    descricao: "Notícias e análises sobre tecnologia, internet e telecomunicações no Brasil.",
    categoria: ["Tecnologia"],
    tipo: "Jornal",
    pais: "Brasil",
    idioma: "Português"
  }
];