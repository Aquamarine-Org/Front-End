import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import {
  IoCalendarClearOutline,
  IoCloseOutline,
  IoDocumentTextOutline,
  IoFilterOutline,
  IoPulseOutline,
  IoWarningOutline,
  IoWaterOutline,
} from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

import GraficoHistoricoSensores from "./GraficoHistoricoSensores";
import estilos from "./historico.module.css";

const FILTRO_PADRAO = {
  modo: "periodo",
  dataInicial: "2025-04-13",
  dataFinal: "2025-04-13",
  mes: "2025-04",
  ano: "2025",
};

const leiturasDosSensores = [
  {
    dataHora: "2025-04-13T00:00:00",
    rotulo: "00h",
    consumoLitros: 4,
    fluxoLitrosPorMinuto: 0.4,
    pressaoBar: 2.4,
  },
  {
    dataHora: "2025-04-13T02:00:00",
    rotulo: "02h",
    consumoLitros: 3,
    fluxoLitrosPorMinuto: 0.3,
    pressaoBar: 2.5,
  },
  {
    dataHora: "2025-04-13T04:00:00",
    rotulo: "04h",
    consumoLitros: 5,
    fluxoLitrosPorMinuto: 0.6,
    pressaoBar: 2.3,
  },
  {
    dataHora: "2025-04-13T06:00:00",
    rotulo: "06h",
    consumoLitros: 18,
    fluxoLitrosPorMinuto: 3.4,
    pressaoBar: 2.8,
  },
  {
    dataHora: "2025-04-13T08:00:00",
    rotulo: "08h",
    consumoLitros: 16,
    fluxoLitrosPorMinuto: 3.8,
    pressaoBar: 3.1,
  },
  {
    dataHora: "2025-04-13T10:00:00",
    rotulo: "10h",
    consumoLitros: 6,
    fluxoLitrosPorMinuto: 0.8,
    pressaoBar: 0.7,
  },
  {
    dataHora: "2025-04-13T12:00:00",
    rotulo: "12h",
    consumoLitros: 15,
    fluxoLitrosPorMinuto: 3.0,
    pressaoBar: 2.7,
  },
  {
    dataHora: "2025-04-13T14:00:00",
    rotulo: "14h",
    consumoLitros: 11,
    fluxoLitrosPorMinuto: 2.1,
    pressaoBar: 2.4,
  },
  {
    dataHora: "2025-04-13T16:00:00",
    rotulo: "16h",
    consumoLitros: 21,
    fluxoLitrosPorMinuto: 4.2,
    pressaoBar: 3.3,
  },
  {
    dataHora: "2025-04-13T18:00:00",
    rotulo: "18h",
    consumoLitros: 13,
    fluxoLitrosPorMinuto: 2.6,
    pressaoBar: 2.8,
  },
  {
    dataHora: "2025-04-13T20:00:00",
    rotulo: "20h",
    consumoLitros: 9,
    fluxoLitrosPorMinuto: 1.6,
    pressaoBar: 2.0,
  },
  {
    dataHora: "2025-04-13T22:00:00",
    rotulo: "22h",
    consumoLitros: 17,
    fluxoLitrosPorMinuto: 3.5,
    pressaoBar: 3.0,
  },
];

const seriesDoGrafico = [
  {
    chave: "consumoLitros",
    rotulo: "Consumo de água",
    unidade: "litros",
    cor: "#1f5465",
    valorMinimo: 0,
    casasDecimais: 0,
    faixaNormal: {
      minimo: 0,
      maximo: 14,
    },
  },
  {
    chave: "fluxoLitrosPorMinuto",
    rotulo: "Fluxo médio",
    unidade: "litros por minuto",
    cor: "#097cd8",
    valorMinimo: 0,
    casasDecimais: 1,
    faixaNormal: {
      minimo: 0.2,
      maximo: 3.2,
    },
  },
  {
    chave: "pressaoBar",
    rotulo: "Pressão média",
    unidade: "bar",
    cor: "#16a34a",
    valorMinimo: 0,
    casasDecimais: 1,
    faixaNormal: {
      minimo: 1.5,
      maximo: 3.2,
    },
  },
];

const registrosDetalhados = [
  {
    dataHora: "2025-04-13T08:00:00",
    hora: "08:00",
    consumo: "16 litros",
    fluxo: "3,8 litros por minuto",
    pressao: "3,1 bar",
    status: "Possível vazamento",
  },
  {
    dataHora: "2025-04-13T09:00:00",
    hora: "09:00",
    consumo: "12 litros",
    fluxo: "2,2 litros por minuto",
    pressao: "2,2 bar",
    status: "Normal",
  },
  {
    dataHora: "2025-04-13T10:00:00",
    hora: "10:00",
    consumo: "6 litros",
    fluxo: "0,8 litro por minuto",
    pressao: "0,7 bar",
    status: "Pressão baixa",
  },
  {
    dataHora: "2025-04-13T11:00:00",
    hora: "11:00",
    consumo: "10 litros",
    fluxo: "1,9 litro por minuto",
    pressao: "1,8 bar",
    status: "Normal",
  },
  {
    dataHora: "2025-04-13T12:00:00",
    hora: "12:00",
    consumo: "15 litros",
    fluxo: "3,0 litros por minuto",
    pressao: "2,7 bar",
    status: "Normal",
  },
];

const analisesDaIa = [
  {
    dataHora: "2025-04-13T08:12:00",
    hora: "08:12",
    sensor: "Sensor principal",
    codigo: "OC-0812",
    titulo: "Vazão residual prolongada",
    criticidade: "Crítica",
    estado: "Requer verificação",
    indicador: "Fluxo contínuo por 34 min com consumo acima do repouso.",
    evidencias: [
      "Consumo às 08h: 16 litros",
      "Fluxo médio: 3,8 litros por minuto",
      "Pressão média estável: 3,1 bar",
    ],
    verificacao:
      "Inspecionar caixa acoplada, torneiras e conexões próximas ao sensor principal.",
    gravidade: "alerta",
  },
  {
    dataHora: "2025-04-13T10:04:00",
    hora: "10:04",
    sensor: "Sensor de pressão",
    codigo: "OC-1004",
    titulo: "Queda de pressão localizada",
    criticidade: "Atenção",
    estado: "Acompanhar",
    indicador: "Pressão caiu abaixo da faixa operacional no período analisado.",
    evidencias: [
      "Pressão mínima: 0,7 bar",
      "Fluxo médio no horário: 0,8 litro por minuto",
      "Sem pico de consumo associado",
    ],
    verificacao:
      "Conferir registro parcialmente fechado ou perda de pressão na rede interna.",
    gravidade: "aviso",
  },
  {
    dataHora: "2025-04-13T12:18:00",
    hora: "12:18",
    sensor: "Sensor principal",
    codigo: "OC-1218",
    titulo: "Leituras normalizadas",
    criticidade: "Estável",
    estado: "Sem ação imediata",
    indicador: "Consumo e pressão retornaram ao comportamento esperado.",
    evidencias: [
      "Fluxo dentro da faixa normal",
      "Pressão média recuperada após a ocorrência",
      "Sem novo consumo contínuo detectado",
    ],
    verificacao:
      "Manter o monitoramento ativo e observar se o padrão se repete nas próximas leituras.",
    gravidade: "normal",
  },
];

function formatarNumero(valor, casasDecimais = 1) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: casasDecimais,
  }).format(valor);
}

function formatarDataParaExibicao(valorData) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${valorData}T12:00:00`));
}

function formatarMesParaExibicao(valorMes) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${valorMes}-01T12:00:00`));
}

function obterRotuloFiltro(filtro) {
  if (filtro.modo === "mes") {
    return formatarMesParaExibicao(filtro.mes);
  }

  if (filtro.modo === "ano") {
    return filtro.ano;
  }

  if (filtro.dataInicial === filtro.dataFinal) {
    return formatarDataParaExibicao(filtro.dataInicial);
  }

  return `${formatarDataParaExibicao(
    filtro.dataInicial
  )} até ${formatarDataParaExibicao(filtro.dataFinal)}`;
}

function normalizarFiltroPeriodo(filtro) {
  if (filtro.modo !== "periodo" || filtro.dataInicial <= filtro.dataFinal) {
    return filtro;
  }

  return {
    ...filtro,
    dataInicial: filtro.dataFinal,
    dataFinal: filtro.dataInicial,
  };
}

function estaDentroDoFiltro(dataHora, filtro) {
  const dataDoRegistro = new Date(dataHora);

  if (filtro.modo === "mes") {
    return dataHora.startsWith(filtro.mes);
  }

  if (filtro.modo === "ano") {
    return dataHora.startsWith(filtro.ano);
  }

  const dataInicial = new Date(`${filtro.dataInicial}T00:00:00`);
  const dataFinal = new Date(`${filtro.dataFinal}T23:59:59`);

  return dataDoRegistro >= dataInicial && dataDoRegistro <= dataFinal;
}

function montarResumo(leituras, analises) {
  const consumoTotal = leituras.reduce(
    (total, leitura) => total + leitura.consumoLitros,
    0
  );
  const fluxoMedio =
    leituras.length > 0
      ? leituras.reduce(
          (total, leitura) => total + leitura.fluxoLitrosPorMinuto,
          0
        ) / leituras.length
      : 0;
  const quantidadeAlertas = analises.filter(
    (analise) => analise.gravidade !== "normal"
  ).length;

  return {
    consumoTotal,
    fluxoMedio,
    quantidadeAlertas,
  };
}

function HistoricoPage() {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(FILTRO_PADRAO);
  const [rascunhoFiltro, setRascunhoFiltro] = useState(FILTRO_PADRAO);

  useEffect(() => {
    if (!filtroAberto) {
      return undefined;
    }

    const fecharComEsc = (evento) => {
      if (evento.key === "Escape") {
        setFiltroAberto(false);
      }
    };

    document.addEventListener("keydown", fecharComEsc);

    return () => document.removeEventListener("keydown", fecharComEsc);
  }, [filtroAberto]);

  const leiturasFiltradas = useMemo(
    () =>
      leiturasDosSensores.filter((leitura) =>
        estaDentroDoFiltro(leitura.dataHora, filtroAplicado)
      ),
    [filtroAplicado]
  );
  const registrosFiltrados = useMemo(
    () =>
      registrosDetalhados.filter((registro) =>
        estaDentroDoFiltro(registro.dataHora, filtroAplicado)
      ),
    [filtroAplicado]
  );
  const analisesFiltradas = useMemo(
    () =>
      analisesDaIa.filter((analise) =>
        estaDentroDoFiltro(analise.dataHora, filtroAplicado)
      ),
    [filtroAplicado]
  );
  const resumo = useMemo(
    () => montarResumo(leiturasFiltradas, analisesFiltradas),
    [leiturasFiltradas, analisesFiltradas]
  );

  const abrirFiltro = () => {
    setRascunhoFiltro(filtroAplicado);
    setFiltroAberto(true);
  };

  const exportarHistoricoParaPdf = () => {
    window.print();
  };

  const aplicarFiltro = () => {
    setFiltroAplicado(normalizarFiltroPeriodo(rascunhoFiltro));
    setFiltroAberto(false);
  };

  const enviarHistoricoMensal = () => {
    const mensagem = encodeURIComponent(
      `Histórico Aquamarine (${obterRotuloFiltro(
        filtroAplicado
      )}): consumo total de ${formatarNumero(
        resumo.consumoTotal,
        0
      )} litros, fluxo médio de ${formatarNumero(
        resumo.fluxoMedio
      )} litros por minuto e ${resumo.quantidadeAlertas} alerta(s) detectado(s) pela IA.`
    );

    window.open(
      `https://wa.me/?text=${mensagem}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <DashboardLayout currentPage="historico" pageTitle="Histórico">
      <section className={estilos.paginaHistorico}>
        <div className={estilos.barraFerramentas}>
          <button
            type="button"
            className={estilos.botaoData}
            onClick={abrirFiltro}
          >
            <IoCalendarClearOutline size={16} aria-hidden="true" />
            {obterRotuloFiltro(filtroAplicado)}
          </button>

          <div className={estilos.acoesBarra}>
            <button
              type="button"
              className={estilos.botaoSecundario}
              onClick={exportarHistoricoParaPdf}
            >
              <IoDocumentTextOutline size={16} aria-hidden="true" />
              Exportar PDF
            </button>

            <button
              type="button"
              className={estilos.botaoWhatsapp}
              onClick={enviarHistoricoMensal}
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              Enviar histórico mensal por WhatsApp
            </button>

            <button
              type="button"
              className={estilos.botaoFiltro}
              onClick={abrirFiltro}
            >
              <IoFilterOutline size={16} aria-hidden="true" />
              Filtros
            </button>
          </div>
        </div>

        <div className={estilos.gradeResumo}>
          <article className={estilos.cartaoResumo}>
            <IoWaterOutline size={24} aria-hidden="true" />
            <span>Consumo de água</span>
            <strong>{formatarNumero(resumo.consumoTotal, 0)} litros</strong>
          </article>

          <article className={estilos.cartaoResumo}>
            <IoPulseOutline size={24} aria-hidden="true" />
            <span>Fluxo médio</span>
            <strong>{formatarNumero(resumo.fluxoMedio)} litros por minuto</strong>
          </article>

          <article className={estilos.cartaoResumo}>
            <IoWarningOutline size={24} aria-hidden="true" />
            <span>Análises com alerta</span>
            <strong>
              {resumo.quantidadeAlertas}{" "}
              {resumo.quantidadeAlertas === 1 ? "ocorrência" : "ocorrências"}
            </strong>
          </article>
        </div>

        <div className={estilos.gradeConteudo}>
          <article className={estilos.cartaoGrafico}>
            <div className={estilos.cabecalhoCartao}>
              <div>
                <h2>Monitoramento dos sensores</h2>
                <p>Gráfico interativo com escala real para cada métrica</p>
              </div>
            </div>

            {leiturasFiltradas.length > 0 ? (
              <GraficoHistoricoSensores
                leituras={leiturasFiltradas}
                seriesDoGrafico={seriesDoGrafico}
              />
            ) : (
              <div className={estilos.estadoVazio}>
                Nenhum registro encontrado para este filtro.
              </div>
            )}
          </article>

          <article className={estilos.cartaoIa}>
            <div className={estilos.cabecalhoCartao}>
              <div>
                <h2>Diagnóstico dos sensores</h2>
                <p>Ocorrências técnicas organizadas por criticidade</p>
              </div>
              <span className={estilos.resumoDiagnostico}>
                {analisesFiltradas.length} registros analisados
              </span>
            </div>

            {analisesFiltradas.length > 0 ? (
              <div className={estilos.listaAnalises}>
                {analisesFiltradas.map((analise) => (
                  <article
                    className={`${estilos.itemAnalise} ${
                      estilos[analise.gravidade]
                    }`}
                    key={`${analise.hora}-${analise.titulo}`}
                  >
                    <div className={estilos.topoAnalise}>
                      <div>
                        <span className={estilos.codigoAnalise}>
                          {analise.codigo}
                        </span>
                        <strong>{analise.titulo}</strong>
                        <small>
                          {analise.sensor} · {analise.hora}
                        </small>
                      </div>

                      <span className={estilos.seloCriticidade}>
                        {analise.criticidade}
                      </span>
                    </div>

                    <div className={estilos.estadoAnalise}>
                      <span>Estado</span>
                      <strong>{analise.estado}</strong>
                    </div>

                    <p className={estilos.indicadorAnalise}>
                      {analise.indicador}
                    </p>

                    <div className={estilos.blocoEvidencias}>
                      <span>Dados observados</span>
                      <ul>
                        {analise.evidencias.map((evidencia) => (
                          <li key={evidencia}>{evidencia}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={estilos.acaoRecomendada}>
                      <span>Verificação sugerida</span>
                      <p>{analise.verificacao}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={estilos.estadoVazio}>
                Nenhuma análise da IA neste período.
              </div>
            )}
          </article>
        </div>

        <article className={estilos.cartaoTabela}>
          <div className={estilos.cabecalhoCartao}>
            <div>
              <h2>Registros detalhados</h2>
              <p>Focado em sensores, consumo e anomalias</p>
            </div>
          </div>

          <table className={estilos.tabelaHistorico}>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Consumo de água</th>
                <th>Fluxo médio</th>
                <th>Pressão média</th>
                <th>Status da análise</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.length > 0 ? (
                registrosFiltrados.map((registro) => (
                  <tr key={registro.hora}>
                    <td>{registro.hora}</td>
                    <td>{registro.consumo}</td>
                    <td>{registro.fluxo}</td>
                    <td>{registro.pressao}</td>
                    <td>
                      <span
                        className={`${estilos.seloStatus} ${
                          registro.status === "Normal"
                            ? estilos.normal
                            : estilos.alerta
                        }`}
                      >
                        {registro.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className={estilos.celulaTabelaVazia} colSpan="5">
                    Nenhum registro detalhado encontrado para este filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>

        {filtroAberto && (
          <div
            className={estilos.sobreposicaoFiltro}
            onMouseDown={(evento) => {
              if (evento.target === evento.currentTarget) {
                setFiltroAberto(false);
              }
            }}
          >
            <div
              className={estilos.modalFiltro}
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                className={estilos.botaoFecharFiltro}
                aria-label="Fechar filtro"
                onClick={() => setFiltroAberto(false)}
              >
                <IoCloseOutline size={20} aria-hidden="true" />
              </button>

              <div className={estilos.iconeFiltro}>
                <IoCalendarClearOutline size={24} aria-hidden="true" />
              </div>

              <p className={estilos.textoFiltro}>
                Você pode consultar o consumo dos últimos 2 anos.
              </p>

              <div className={estilos.modosFiltro}>
                <button
                  type="button"
                  className={
                    rascunhoFiltro.modo === "periodo" ? estilos.modoAtivo : ""
                  }
                  onClick={() =>
                    setRascunhoFiltro((filtroAtual) => ({
                      ...filtroAtual,
                      modo: "periodo",
                    }))
                  }
                >
                  Período
                </button>
                <button
                  type="button"
                  className={
                    rascunhoFiltro.modo === "mes" ? estilos.modoAtivo : ""
                  }
                  onClick={() =>
                    setRascunhoFiltro((filtroAtual) => ({
                      ...filtroAtual,
                      modo: "mes",
                    }))
                  }
                >
                  Mês
                </button>
                <button
                  type="button"
                  className={
                    rascunhoFiltro.modo === "ano" ? estilos.modoAtivo : ""
                  }
                  onClick={() =>
                    setRascunhoFiltro((filtroAtual) => ({
                      ...filtroAtual,
                      modo: "ano",
                    }))
                  }
                >
                  Ano
                </button>
              </div>

              <div className={estilos.camposFiltro}>
                {rascunhoFiltro.modo === "periodo" && (
                  <>
                    <label>
                      <span>Data inicial</span>
                      <input
                        type="date"
                        value={rascunhoFiltro.dataInicial}
                        onChange={(evento) =>
                          setRascunhoFiltro((filtroAtual) => ({
                            ...filtroAtual,
                            dataInicial: evento.target.value,
                          }))
                        }
                      />
                    </label>

                    <label>
                      <span>Data final</span>
                      <input
                        type="date"
                        value={rascunhoFiltro.dataFinal}
                        onChange={(evento) =>
                          setRascunhoFiltro((filtroAtual) => ({
                            ...filtroAtual,
                            dataFinal: evento.target.value,
                          }))
                        }
                      />
                    </label>
                  </>
                )}

                {rascunhoFiltro.modo === "mes" && (
                  <label>
                    <span>Mês consultado</span>
                    <input
                      type="month"
                      value={rascunhoFiltro.mes}
                      onChange={(evento) =>
                        setRascunhoFiltro((filtroAtual) => ({
                          ...filtroAtual,
                          mes: evento.target.value,
                        }))
                      }
                    />
                  </label>
                )}

                {rascunhoFiltro.modo === "ano" && (
                  <label>
                    <span>Ano consultado</span>
                    <select
                      value={rascunhoFiltro.ano}
                      onChange={(evento) =>
                        setRascunhoFiltro((filtroAtual) => ({
                          ...filtroAtual,
                          ano: evento.target.value,
                        }))
                      }
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                  </label>
                )}
              </div>

              <button
                type="button"
                className={estilos.botaoAplicarFiltro}
                onClick={aplicarFiltro}
              >
                Aplicar
              </button>
            </div>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default HistoricoPage;
