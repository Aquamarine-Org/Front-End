export function createFallbackDashboardOverview() {
  return {
    statusCards: [
      {
        id: "sistema",
        label: "STATUS DO SISTEMA",
        value: "Funcionando",
        tone: "success",
      },
      {
        id: "registro",
        label: "STATUS DO REGISTRO",
        value: "Aberto",
        tone: "success",
      },
      {
        id: "risco",
        label: "RISCO ATUAL DE VAZAMENTO",
        value: "Baixo",
        tone: "success",
      },
      {
        id: "dispositivos",
        label: "DISPOSITIVOS ONLINE",
        value: "5",
        tone: "info",
      },
    ],
    ambientes: [
      {
        id: "cozinha",
        nome: "Cozinha",
        area: "12m²",
        sensores: "1 sensor",
        status: "Normal",
        tone: "normal",
        exibirDetalhes: true,
      },
      {
        id: "banheiro",
        nome: "Banheiro",
        area: "8m²",
        sensores: "1 sensor",
        status: "Risco",
        tone: "risk",
        exibirDetalhes: false,
      },
    ],
    grafico24Horas: [
      { hora: "00h", fluxo: 10, pressao: 22 },
      { hora: "04h", fluxo: 15, pressao: 18 },
      { hora: "08h", fluxo: 12, pressao: 26 },
      { hora: "12h", fluxo: 18, pressao: 20 },
      { hora: "16h", fluxo: 14, pressao: 24 },
      { hora: "20h", fluxo: 11, pressao: 19 },
      { hora: "24h", fluxo: 13, pressao: 21 },
    ],
    alertasRecentes: [
      {
        id: "alerta-1",
        titulo: "Consumo Elevado",
        tempo: "Há 12h",
        tone: "warning",
        nivel: "Médio",
        descricao: "Fluxo acima da média detectado nos últimos ciclos.",
      },
      {
        id: "alerta-2",
        titulo: "Pressão Anômala",
        tempo: "Há 2 dias",
        tone: "normal",
        nivel: "Comum",
        descricao: "Variação de pressão fora da faixa usual.",
      },
      {
        id: "alerta-3",
        titulo: "Vazamento Detectado",
        tempo: "Há 1 semana",
        tone: "danger",
        nivel: "Perigo",
        descricao: "Fluxo contínuo por período prolongado.",
      },
    ],
    dispositivoPrincipal: {
      aberta: true,
      estado: "ABERTA",
      descricao: "O dispositivo está aberto e operando normalmente.",
    },
    resumo: {
      consumoMedioLitrosPorMinuto: 13.4,
      dispositivosOnline: 5,
      quantidadeAndares: 1,
      riscoVazamento: "Baixo",
    },
  };
}

export function createFallbackSettings() {
  return {
    nomeCompleto: "",
    nomeExibicao: "",
    email: "",
    telefone: "",
    idioma: "pt-BR",
    fusoHorario: "America/Sao_Paulo",
    notificacoes: {
      email: true,
      whatsapp: true,
      alertasConta: true,
      relatorioMensal: false,
    },
    seguranca: {
      doisFatores: false,
      avisoLogin: true,
    },
    dispositivosConectados: [
      {
        nome: "Celular principal",
        descricao: "Android · São Paulo",
        acesso: "Agora",
        atual: true,
      },
      {
        nome: "Notebook pessoal",
        descricao: "Chrome · São Paulo",
        acesso: "Ontem às 20:14",
        atual: false,
      },
      {
        nome: "Tablet da residência",
        descricao: "Safari · Último acesso residencial",
        acesso: "13 de abril, 2025",
        atual: false,
      },
    ],
  };
}

export function normalizeSettingsResponse(response) {
  const fallback = createFallbackSettings();

  if (!response) {
    return fallback;
  }

  return {
    ...fallback,
    ...response,
    notificacoes: {
      ...fallback.notificacoes,
      ...(response.notificacoes || {}),
    },
    seguranca: {
      ...fallback.seguranca,
      ...(response.seguranca || {}),
    },
    dispositivosConectados:
      response.dispositivosConectados || fallback.dispositivosConectados,
  };
}
