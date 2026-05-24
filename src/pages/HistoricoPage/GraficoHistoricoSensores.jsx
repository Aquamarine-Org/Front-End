import { useMemo, useState } from "react";

import estilos from "./GraficoHistoricoSensores.module.css";

const LARGURA_GRAFICO = 980;
const ALTURA_GRAFICO = 430;
const MARGEM = {
  topo: 42,
  direita: 38,
  baixo: 74,
  esquerda: 84,
};
const DIVISOES_GRADE = 5;

const CAMPOS_BACKEND_POR_CHAVE = {
  consumoLitros: [
    "consumoLitros",
    "consumo_litros",
    "consumo",
    "litros",
    "consumptionLiters",
    "consumption_liters",
  ],
  fluxoLitrosPorMinuto: [
    "fluxoLitrosPorMinuto",
    "fluxo_litros_por_minuto",
    "fluxo",
    "flowLitersPerMinute",
    "flow_liters_per_minute",
    "flow",
  ],
  pressaoBar: [
    "pressaoBar",
    "pressao_bar",
    "pressao",
    "pressureBar",
    "pressure_bar",
    "pressure",
  ],
};

function formatarNumero(valor, casasDecimais = 1) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: casasDecimais,
  }).format(valor);
}

function formatarValorMetrica(valor, serie) {
  return `${formatarNumero(valor, serie.casasDecimais ?? 1)} ${serie.unidade}`;
}

function formatarDataHora(dataHora) {
  const data = new Date(dataHora);

  if (Number.isNaN(data.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}

function obterPrimeiroValor(objeto, chaves) {
  const chaveEncontrada = chaves.find((chave) => objeto[chave] !== undefined);

  if (!chaveEncontrada) {
    return undefined;
  }

  return objeto[chaveEncontrada];
}

function obterNumeroDaLeitura(leitura, serie) {
  const chaves = [
    serie.chave,
    serie.campoBackend,
    ...(serie.chavesBackend ?? []),
    ...(serie.aliases ?? []),
    ...(CAMPOS_BACKEND_POR_CHAVE[serie.chave] ?? []),
  ].filter(Boolean);
  const valor = obterPrimeiroValor(leitura, chaves);
  const numero = Number(valor);

  return Number.isFinite(numero) ? numero : null;
}

function obterDataHoraDaLeitura(leitura) {
  return (
    leitura.dataHora ??
    leitura.timestamp ??
    leitura.data_hora ??
    leitura.createdAt ??
    leitura.created_at ??
    leitura.date ??
    null
  );
}

function obterRotuloDaLeitura(leitura, indice) {
  if (leitura.rotulo ?? leitura.label ?? leitura.hora) {
    return leitura.rotulo ?? leitura.label ?? leitura.hora;
  }

  const dataHora = obterDataHoraDaLeitura(leitura);

  if (dataHora) {
    return formatarDataHora(dataHora);
  }

  return `Leitura ${indice + 1}`;
}

function normalizarSeries(seriesDoGrafico) {
  return seriesDoGrafico
    .filter((serie) => Boolean(serie?.chave))
    .map((serie) => ({
      ...serie,
      rotulo: serie.rotulo ?? serie.label ?? serie.chave,
      unidade: serie.unidade ?? serie.unit ?? "",
      cor: serie.cor ?? serie.color ?? "#097cd8",
      valorMinimo: serie.valorMinimo ?? serie.minValue,
      valorMaximo: serie.valorMaximo ?? serie.maxValue,
      casasDecimais: serie.casasDecimais ?? serie.decimalDigits ?? 1,
      faixaNormal:
        serie.faixaNormal || serie.normalRange
          ? {
              minimo:
                serie.faixaNormal?.minimo ??
                serie.faixaNormal?.min ??
                serie.normalRange?.minimo ??
                serie.normalRange?.min,
              maximo:
                serie.faixaNormal?.maximo ??
                serie.faixaNormal?.max ??
                serie.normalRange?.maximo ??
                serie.normalRange?.max,
            }
          : null,
    }));
}

function normalizarLeituras(leituras, seriesNormalizadas) {
  return leituras
    .map((leitura, indice) => {
      const dataHora = obterDataHoraDaLeitura(leitura);
      const leituraNormalizada = {
        ...leitura,
        dataHora,
        dataMs: dataHora ? new Date(dataHora).getTime() : null,
        rotulo: obterRotuloDaLeitura(leitura, indice),
      };

      seriesNormalizadas.forEach((serie) => {
        leituraNormalizada[serie.chave] = obterNumeroDaLeitura(leitura, serie);
      });

      return leituraNormalizada;
    })
    .filter((leitura) =>
      seriesNormalizadas.some((serie) => leitura[serie.chave] !== null)
    )
    .sort((a, b) => {
      if (Number.isFinite(a.dataMs) && Number.isFinite(b.dataMs)) {
        return a.dataMs - b.dataMs;
      }

      return 0;
    });
}

function montarCaminhoLinear(pontos) {
  if (pontos.length === 0) {
    return "";
  }

  return pontos
    .map(
      (ponto, indice) => `${indice === 0 ? "M" : "L"} ${ponto.x} ${ponto.y}`
    )
    .join(" ");
}

function calcularMedia(valores) {
  if (valores.length === 0) {
    return 0;
  }

  return valores.reduce((total, valor) => total + valor, 0) / valores.length;
}

function obterStatusDaLeitura(valor, serie) {
  const minimo = serie.faixaNormal?.minimo;
  const maximo = serie.faixaNormal?.maximo;

  if (minimo === undefined || maximo === undefined) {
    return {
      texto: "Monitorando",
      tipo: "neutro",
    };
  }

  if (valor < minimo) {
    return {
      texto: "Abaixo do esperado",
      tipo: "baixo",
    };
  }

  if (valor > maximo) {
    return {
      texto: "Acima do esperado",
      tipo: "alto",
    };
  }

  return {
    texto: "Dentro da faixa esperada",
    tipo: "normal",
  };
}

function obterRotulosDoEixoX(leituras) {
  const intervalo = Math.max(1, Math.round(leituras.length / 5));

  return leituras.filter((_, indice) => {
    return (
      indice === 0 ||
      indice === leituras.length - 1 ||
      indice % intervalo === 0
    );
  });
}

function GraficoHistoricoSensores({
  leituras = [],
  seriesDoGrafico = [],
  carregando = false,
  erro = null,
  aoSelecionarLeitura,
}) {
  const seriesNormalizadas = useMemo(
    () => normalizarSeries(seriesDoGrafico),
    [seriesDoGrafico]
  );
  const [chaveSelecionada, setChaveSelecionada] = useState(
    seriesNormalizadas[0]?.chave
  );
  const [indiceAtivo, setIndiceAtivo] = useState(null);
  const chaveSerieAtual = seriesNormalizadas.some(
    (serie) => serie.chave === chaveSelecionada
  )
    ? chaveSelecionada
    : seriesNormalizadas[0]?.chave;

  const leiturasNormalizadas = useMemo(
    () => normalizarLeituras(leituras, seriesNormalizadas),
    [leituras, seriesNormalizadas]
  );

  const dadosGrafico = useMemo(() => {
    const serieSelecionada =
      seriesNormalizadas.find((serie) => serie.chave === chaveSerieAtual) ??
      seriesNormalizadas[0];

    if (!serieSelecionada) {
      return null;
    }

    const larguraInterna =
      LARGURA_GRAFICO - MARGEM.esquerda - MARGEM.direita;
    const alturaInterna = ALTURA_GRAFICO - MARGEM.topo - MARGEM.baixo;
    const leiturasDaSerie = leiturasNormalizadas.filter((leitura) =>
      Number.isFinite(leitura[serieSelecionada.chave])
    );
    const valores = leiturasDaSerie
      .map((leitura) => leitura[serieSelecionada.chave])
      .filter((valor) => Number.isFinite(valor));
    const faixaNormal = serieSelecionada.faixaNormal;
    const menorValorLeitura = valores.length > 0 ? Math.min(...valores) : 0;
    const maiorValorLeitura = valores.length > 0 ? Math.max(...valores) : 1;
    const menorValorDados = Math.min(
      menorValorLeitura,
      faixaNormal?.minimo ?? menorValorLeitura
    );
    const maiorValorDados = Math.max(
      maiorValorLeitura,
      faixaNormal?.maximo ?? maiorValorLeitura
    );
    const intervaloBruto = maiorValorDados - menorValorDados || 1;
    const valorMinimo =
      serieSelecionada.valorMinimo ?? menorValorDados - intervaloBruto * 0.14;
    const valorMaximo =
      serieSelecionada.valorMaximo ?? maiorValorDados + intervaloBruto * 0.18;
    const intervalo = valorMaximo - valorMinimo || 1;
    const passoX =
      leiturasDaSerie.length > 1
        ? larguraInterna / (leiturasDaSerie.length - 1)
        : 0;
    const escalaY = (valor) =>
      MARGEM.topo +
      alturaInterna -
      ((valor - valorMinimo) / intervalo) * alturaInterna;
    const escalaX = (indice) => MARGEM.esquerda + indice * passoX;
    const pontos = leiturasDaSerie.map((leitura, indice) => {
      const valor = leitura[serieSelecionada.chave] ?? 0;

      return {
        x: escalaX(indice),
        y: escalaY(valor),
        valor,
        indice,
        rotulo: leitura.rotulo,
        dataHora: leitura.dataHora,
        leituraOriginal: leitura,
      };
    });
    const linhasGrade = Array.from(
      { length: DIVISOES_GRADE + 1 },
      (_, indice) => {
        const valor = valorMinimo + (intervalo / DIVISOES_GRADE) * indice;

        return {
          valor,
          y: escalaY(valor),
        };
      }
    ).reverse();
    const faixaNormalPlotada =
      faixaNormal &&
      faixaNormal.minimo !== undefined &&
      faixaNormal.maximo !== undefined &&
      faixaNormal.minimo >= valorMinimo &&
      faixaNormal.maximo <= valorMaximo
        ? {
            yTopo: escalaY(faixaNormal.maximo),
            yBaixo: escalaY(faixaNormal.minimo),
          }
        : null;

    const media = calcularMedia(valores);

    return {
      serieSelecionada,
      pontos,
      linhasGrade,
      rotulosX: obterRotulosDoEixoX(leiturasDaSerie),
      valorMinimo,
      valorMaximo,
      caminhoLinha: montarCaminhoLinear(pontos),
      areaPlotagem: {
        x: MARGEM.esquerda,
        y: MARGEM.topo,
        largura: larguraInterna,
        altura: alturaInterna,
        base: MARGEM.topo + alturaInterna,
      },
      faixaNormalPlotada,
      media,
      linhaMedia: {
        y: escalaY(media),
      },
      menorLeitura: menorValorLeitura,
      maiorLeitura: maiorValorLeitura,
    };
  }, [leiturasNormalizadas, chaveSerieAtual, seriesNormalizadas]);

  if (carregando) {
    return <div className={estilos.estadoGrafico}>Carregando histórico...</div>;
  }

  if (erro) {
    return <div className={estilos.estadoGrafico}>{erro}</div>;
  }

  if (!dadosGrafico || leiturasNormalizadas.length === 0) {
    return (
      <div className={estilos.estadoGrafico}>
        Nenhuma leitura disponível para montar o gráfico.
      </div>
    );
  }

  if (dadosGrafico.pontos.length === 0) {
    return (
      <div className={estilos.estadoGrafico}>
        Nenhuma leitura válida para esta métrica.
      </div>
    );
  }

  const pontoAtivo =
    indiceAtivo === null
      ? dadosGrafico.pontos[dadosGrafico.pontos.length - 1]
      : dadosGrafico.pontos.find((ponto) => ponto.indice === indiceAtivo);
  const statusLeitura = pontoAtivo
    ? obterStatusDaLeitura(pontoAtivo.valor, dadosGrafico.serieSelecionada)
    : null;

  const selecionarPonto = (ponto) => {
    setIndiceAtivo(ponto.indice);
    aoSelecionarLeitura?.(ponto.leituraOriginal);
  };

  return (
    <div className={estilos.graficoContainer}>
      <div className={estilos.barraGrafico}>
        <div className={estilos.abasMetricas} aria-label="Métrica do gráfico">
          {seriesNormalizadas.map((serie) => (
            <button
              className={`${estilos.abaMetrica} ${
                dadosGrafico.serieSelecionada.chave === serie.chave
                  ? estilos.abaAtiva
                  : ""
              }`}
              key={serie.chave}
              type="button"
              onClick={() => {
                setChaveSelecionada(serie.chave);
                setIndiceAtivo(null);
              }}
            >
              <span style={{ backgroundColor: serie.cor }}></span>
              {serie.rotulo}
            </button>
          ))}
        </div>

        <div className={estilos.resumoMetricas}>
          <div>
            <span>Média</span>
            <strong>
              {formatarValorMetrica(
                dadosGrafico.media,
                dadosGrafico.serieSelecionada
              )}
            </strong>
          </div>
          <div>
            <span>Menor leitura</span>
            <strong>
              {formatarValorMetrica(
                dadosGrafico.menorLeitura,
                dadosGrafico.serieSelecionada
              )}
            </strong>
          </div>
          <div>
            <span>Maior leitura</span>
            <strong>
              {formatarValorMetrica(
                dadosGrafico.maiorLeitura,
                dadosGrafico.serieSelecionada
              )}
            </strong>
          </div>
        </div>
      </div>

      <div className={estilos.legendaGrafico}>
        <span>
          <i
            className={estilos.legendaLinha}
            style={{ backgroundColor: dadosGrafico.serieSelecionada.cor }}
          ></i>
          Leituras
        </span>
        <span>
          <i className={estilos.legendaFaixa}></i>
          Faixa esperada
        </span>
        <span>
          <i className={estilos.legendaMedia}></i>
          Média do período
        </span>
      </div>

      <div className={estilos.conteudoGrafico}>
        <div
          className={estilos.areaGrafico}
          onMouseLeave={() => setIndiceAtivo(null)}
        >
          <svg
            className={estilos.grafico}
            viewBox={`0 0 ${LARGURA_GRAFICO} ${ALTURA_GRAFICO}`}
            role="img"
            aria-label="Gráfico interativo do histórico dos sensores"
          >
            <rect
              className={estilos.fundoPlotagem}
              x={dadosGrafico.areaPlotagem.x}
              y={dadosGrafico.areaPlotagem.y}
              width={dadosGrafico.areaPlotagem.largura}
              height={dadosGrafico.areaPlotagem.altura}
            />

            <text
              className={estilos.rotuloUnidade}
              x={dadosGrafico.areaPlotagem.x}
              y={24}
            >
              {dadosGrafico.serieSelecionada.rotulo} (
              {dadosGrafico.serieSelecionada.unidade})
            </text>

            {dadosGrafico.faixaNormalPlotada && (
              <g>
                <rect
                  className={estilos.faixaNormal}
                  x={dadosGrafico.areaPlotagem.x}
                  y={dadosGrafico.faixaNormalPlotada.yTopo}
                  width={dadosGrafico.areaPlotagem.largura}
                  height={
                    dadosGrafico.faixaNormalPlotada.yBaixo -
                    dadosGrafico.faixaNormalPlotada.yTopo
                  }
                />
                <text
                  className={estilos.rotuloFaixaNormal}
                  x={dadosGrafico.areaPlotagem.x + 14}
                  y={dadosGrafico.faixaNormalPlotada.yTopo + 22}
                >
                  Faixa segura
                </text>
              </g>
            )}

            {dadosGrafico.linhasGrade.map((linhaGrade) => (
              <g key={linhaGrade.valor}>
                <line
                  className={estilos.linhaGrade}
                  x1={dadosGrafico.areaPlotagem.x}
                  x2={
                    dadosGrafico.areaPlotagem.x +
                    dadosGrafico.areaPlotagem.largura
                  }
                  y1={linhaGrade.y}
                  y2={linhaGrade.y}
                />
                <text
                  className={estilos.valorEixo}
                  x={dadosGrafico.areaPlotagem.x - 16}
                  y={linhaGrade.y + 5}
                  textAnchor="end"
                >
                  {formatarNumero(
                    linhaGrade.valor,
                    dadosGrafico.serieSelecionada.casasDecimais
                  )}
                </text>
              </g>
            ))}

            {dadosGrafico.rotulosX.map((leitura) => {
              const ponto = dadosGrafico.pontos.find(
                (item) => item.rotulo === leitura.rotulo
              );

              if (!ponto) {
                return null;
              }

              return (
                <g key={leitura.rotulo}>
                  <line
                    className={estilos.linhaGradeVertical}
                    x1={ponto.x}
                    x2={ponto.x}
                    y1={dadosGrafico.areaPlotagem.y}
                    y2={dadosGrafico.areaPlotagem.base}
                  />
                  <text
                    className={estilos.rotuloX}
                    x={ponto.x}
                    y={ALTURA_GRAFICO - 24}
                    textAnchor="middle"
                  >
                    {leitura.rotulo}
                  </text>
                </g>
              );
            })}

            <line
              className={estilos.linhaMedia}
              x1={dadosGrafico.areaPlotagem.x}
              x2={
                dadosGrafico.areaPlotagem.x + dadosGrafico.areaPlotagem.largura
              }
              y1={dadosGrafico.linhaMedia.y}
              y2={dadosGrafico.linhaMedia.y}
            />
            <text
              className={estilos.rotuloMedia}
              x={
                dadosGrafico.areaPlotagem.x +
                dadosGrafico.areaPlotagem.largura -
                8
              }
              y={dadosGrafico.linhaMedia.y - 8}
              textAnchor="end"
            >
              Média
            </text>

            <path
              className={estilos.linhaPrincipal}
              d={dadosGrafico.caminhoLinha}
              stroke={dadosGrafico.serieSelecionada.cor}
            />

            {pontoAtivo && (
              <g>
                <line
                  className={estilos.linhaFoco}
                  x1={pontoAtivo.x}
                  x2={pontoAtivo.x}
                  y1={dadosGrafico.areaPlotagem.y}
                  y2={dadosGrafico.areaPlotagem.base}
                />
                <circle
                  className={estilos.pontoFoco}
                  cx={pontoAtivo.x}
                  cy={pontoAtivo.y}
                  r="7"
                  fill={dadosGrafico.serieSelecionada.cor}
                />
              </g>
            )}

            {dadosGrafico.pontos.map((ponto) => (
              <circle
                className={estilos.ponto}
                key={`${dadosGrafico.serieSelecionada.chave}-${ponto.rotulo}`}
                cx={ponto.x}
                cy={ponto.y}
                r={pontoAtivo?.indice === ponto.indice ? 5 : 3.5}
                fill={dadosGrafico.serieSelecionada.cor}
              />
            ))}

            {dadosGrafico.pontos.map((ponto, indice) => {
              const pontoAnterior = dadosGrafico.pontos[indice - 1];
              const proximoPonto = dadosGrafico.pontos[indice + 1];
              const limiteEsquerdo = pontoAnterior
                ? (pontoAnterior.x + ponto.x) / 2
                : dadosGrafico.areaPlotagem.x;
              const limiteDireito = proximoPonto
                ? (proximoPonto.x + ponto.x) / 2
                : dadosGrafico.areaPlotagem.x +
                  dadosGrafico.areaPlotagem.largura;

              return (
                <rect
                  aria-label={`${ponto.rotulo}: ${formatarValorMetrica(
                    ponto.valor,
                    dadosGrafico.serieSelecionada
                  )}`}
                  className={estilos.areaClique}
                  key={`${ponto.rotulo}-clique`}
                  role="button"
                  tabIndex="0"
                  x={limiteEsquerdo}
                  y={dadosGrafico.areaPlotagem.y}
                  width={limiteDireito - limiteEsquerdo}
                  height={dadosGrafico.areaPlotagem.altura}
                  onClick={() => selecionarPonto(ponto)}
                  onFocus={() => selecionarPonto(ponto)}
                  onMouseEnter={() => setIndiceAtivo(ponto.indice)}
                />
              );
            })}
          </svg>
        </div>

        {pontoAtivo && statusLeitura && (
          <aside className={estilos.painelLeitura}>
            <div className={estilos.grupoLeitura}>
              <span className={estilos.rotuloPainel}>Leitura selecionada</span>
              <strong>{pontoAtivo.rotulo}</strong>
              <small>{formatarDataHora(pontoAtivo.dataHora)}</small>
            </div>

            <div className={estilos.valorPrincipal}>
              <span>{dadosGrafico.serieSelecionada.rotulo}</span>
              <strong>
                {formatarValorMetrica(
                  pontoAtivo.valor,
                  dadosGrafico.serieSelecionada
                )}
              </strong>
            </div>

            <div className={estilos.blocoStatusLeitura}>
              <span>Condição</span>
              <strong
                className={`${estilos.seloStatusLeitura} ${
                  estilos[statusLeitura.tipo]
                }`}
              >
                {statusLeitura.texto}
              </strong>
            </div>

            <div className={estilos.listaValores}>
              {seriesNormalizadas.map((serie) => {
                const valor = pontoAtivo.leituraOriginal[serie.chave];

                return (
                  <div key={serie.chave}>
                    <span>{serie.rotulo}</span>
                    <strong>
                      {valor === null
                        ? "Sem dado"
                        : formatarValorMetrica(valor, serie)}
                    </strong>
                  </div>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default GraficoHistoricoSensores;
