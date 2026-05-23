import { useId, useMemo, useState } from "react";

import styles from "./SensorHistoryChart.module.css";

const CHART_WIDTH = 920;
const CHART_HEIGHT = 346;
const MARGIN = {
  top: 28,
  right: 28,
  bottom: 52,
  left: 66,
};
const GRID_STEPS = 4;

function formatNumber(value, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits,
  }).format(value);
}

function formatMetricValue(value, serie) {
  return `${formatNumber(value, serie.decimalDigits ?? 1)} ${serie.unit}`;
}

function buildSmoothPath(points) {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  return points
    .map((point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const previous = points[index - 1];
      const beforePrevious = points[index - 2] ?? previous;
      const next = points[index + 1] ?? point;
      const controlPointOneX = previous.x + (point.x - beforePrevious.x) / 6;
      const controlPointOneY = previous.y + (point.y - beforePrevious.y) / 6;
      const controlPointTwoX = point.x - (next.x - previous.x) / 6;
      const controlPointTwoY = point.y - (next.y - previous.y) / 6;

      return `C ${controlPointOneX} ${controlPointOneY} ${controlPointTwoX} ${controlPointTwoY} ${point.x} ${point.y}`;
    })
    .join(" ");
}

function buildAreaPath(points, baselineY) {
  if (points.length === 0) {
    return "";
  }

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  return `${buildSmoothPath(points)} L ${lastPoint.x} ${baselineY} L ${firstPoint.x} ${baselineY} Z`;
}

function getAverage(values) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

function SensorHistoryChart({ readings, series }) {
  const reactId = useId();
  const gradientId = `sensor-chart-${reactId.replace(/:/g, "")}`;
  const [selectedKey, setSelectedKey] = useState(series[0]?.key);
  const [activeIndex, setActiveIndex] = useState(null);

  const chart = useMemo(() => {
    const safeReadings = readings.length > 0 ? readings : [];
    const selectedSeries =
      series.find((serie) => serie.key === selectedKey) ?? series[0];
    const innerWidth = CHART_WIDTH - MARGIN.left - MARGIN.right;
    const innerHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom;
    const values = safeReadings.map((reading) =>
      Number(reading[selectedSeries.key] ?? 0)
    );
    const normalRange = selectedSeries.normalRange;
    const valueMin = values.length > 0 ? Math.min(...values) : 0;
    const valueMax = values.length > 0 ? Math.max(...values) : 1;
    const dataMin = Math.min(valueMin, normalRange?.min ?? valueMin);
    const dataMax = Math.max(valueMax, normalRange?.max ?? valueMax);
    const rawRange = dataMax - dataMin || 1;
    const minValue = selectedSeries.minValue ?? dataMin - rawRange * 0.14;
    const maxValue = selectedSeries.maxValue ?? dataMax + rawRange * 0.16;
    const range = maxValue - minValue || 1;
    const xStep =
      safeReadings.length > 1 ? innerWidth / (safeReadings.length - 1) : 0;
    const yScale = (value) =>
      MARGIN.top + innerHeight - ((value - minValue) / range) * innerHeight;
    const xScale = (index) => MARGIN.left + index * xStep;
    const points = safeReadings.map((reading, index) => {
      const value = Number(reading[selectedSeries.key] ?? 0);

      return {
        x: xScale(index),
        y: yScale(value),
        value,
        index,
        label: reading.label,
        raw: reading,
      };
    });
    const gridLines = Array.from({ length: GRID_STEPS + 1 }, (_, index) => {
      const value = minValue + (range / GRID_STEPS) * index;

      return {
        value,
        y: yScale(value),
      };
    }).reverse();
    const xLabels = safeReadings.filter((_, index) => {
      return (
        index === 0 ||
        index === safeReadings.length - 1 ||
        index % Math.max(1, Math.round(safeReadings.length / 6)) === 0
      );
    });
    const normalBand =
      normalRange &&
      normalRange.min >= minValue &&
      normalRange.max <= maxValue
        ? {
            yTop: yScale(normalRange.max),
            yBottom: yScale(normalRange.min),
          }
        : null;

    return {
      selectedSeries,
      points,
      gridLines,
      xLabels,
      minValue,
      maxValue,
      linePath: buildSmoothPath(points),
      areaPath: buildAreaPath(points, MARGIN.top + innerHeight),
      plot: {
        x: MARGIN.left,
        y: MARGIN.top,
        width: innerWidth,
        height: innerHeight,
        bottom: MARGIN.top + innerHeight,
      },
      normalBand,
      averageValue: getAverage(values),
      minReading: valueMin,
      maxReading: valueMax,
    };
  }, [readings, selectedKey, series]);

  const activePoint =
    activeIndex === null
      ? null
      : chart.points.find((point) => point.index === activeIndex);
  const latestPoint = chart.points[chart.points.length - 1];

  return (
    <div className={styles.chartShell}>
      <div className={styles.chartToolbar}>
        <div className={styles.metricTabs} aria-label="Métrica do gráfico">
          {series.map((serie) => (
            <button
              className={`${styles.metricTab} ${
                chart.selectedSeries.key === serie.key ? styles.activeTab : ""
              }`}
              key={serie.key}
              type="button"
              onClick={() => {
                setSelectedKey(serie.key);
                setActiveIndex(null);
              }}
            >
              <span style={{ backgroundColor: serie.color }}></span>
              {serie.label}
            </button>
          ))}
        </div>

        <div className={styles.statStrip}>
          <div>
            <span>Média</span>
            <strong>
              {formatMetricValue(chart.averageValue, chart.selectedSeries)}
            </strong>
          </div>
          <div>
            <span>Pico</span>
            <strong>
              {formatMetricValue(chart.maxReading, chart.selectedSeries)}
            </strong>
          </div>
          <div>
            <span>Última leitura</span>
            <strong>
              {latestPoint
                ? formatMetricValue(latestPoint.value, chart.selectedSeries)
                : "Sem dados"}
            </strong>
          </div>
        </div>
      </div>

      <div
        className={styles.chartCanvas}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <svg
          className={styles.chart}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          role="img"
          aria-label="Gráfico interativo do histórico dos sensores"
        >
          <defs>
            <linearGradient
              id={`${gradientId}-area`}
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={chart.selectedSeries.color}
                stopOpacity="0.28"
              />
              <stop
                offset="100%"
                stopColor={chart.selectedSeries.color}
                stopOpacity="0.03"
              />
            </linearGradient>
          </defs>

          <rect
            className={styles.plotBackground}
            x={chart.plot.x}
            y={chart.plot.y}
            width={chart.plot.width}
            height={chart.plot.height}
          />

          {chart.normalBand && (
            <g>
              <rect
                className={styles.normalBand}
                x={chart.plot.x}
                y={chart.normalBand.yTop}
                width={chart.plot.width}
                height={chart.normalBand.yBottom - chart.normalBand.yTop}
              />
              <text
                className={styles.normalBandLabel}
                x={chart.plot.x + 12}
                y={chart.normalBand.yTop + 18}
              >
                Faixa esperada
              </text>
            </g>
          )}

          {chart.gridLines.map((gridLine) => (
            <g key={gridLine.value}>
              <line
                className={styles.gridLine}
                x1={chart.plot.x}
                x2={chart.plot.x + chart.plot.width}
                y1={gridLine.y}
                y2={gridLine.y}
              />
              <text
                className={styles.axisValue}
                x={chart.plot.x - 14}
                y={gridLine.y + 4}
                textAnchor="end"
              >
                {formatNumber(
                  gridLine.value,
                  chart.selectedSeries.decimalDigits
                )}
              </text>
            </g>
          ))}

          {chart.xLabels.map((reading) => {
            const point = chart.points.find(
              (item) => item.label === reading.label
            );

            return (
              <g key={reading.label}>
                <line
                  className={styles.verticalGridLine}
                  x1={point.x}
                  x2={point.x}
                  y1={chart.plot.y}
                  y2={chart.plot.bottom}
                />
                <text
                  className={styles.xLabel}
                  x={point.x}
                  y={CHART_HEIGHT - 18}
                  textAnchor="middle"
                >
                  {reading.label}
                </text>
              </g>
            );
          })}

          <path
            className={styles.area}
            d={chart.areaPath}
            fill={`url(#${gradientId}-area)`}
          />
          <path
            className={styles.line}
            d={chart.linePath}
            stroke={chart.selectedSeries.color}
          />

          {activePoint && (
            <g>
              <line
                className={styles.focusLine}
                x1={activePoint.x}
                x2={activePoint.x}
                y1={chart.plot.y}
                y2={chart.plot.bottom}
              />
              <circle
                className={styles.focusPoint}
                cx={activePoint.x}
                cy={activePoint.y}
                r="7"
                fill={chart.selectedSeries.color}
              />
            </g>
          )}

          {chart.points.map((point) => (
            <circle
              className={styles.point}
              key={`${chart.selectedSeries.key}-${point.label}`}
              cx={point.x}
              cy={point.y}
              r={activePoint?.index === point.index ? 5 : 3.5}
              fill={chart.selectedSeries.color}
            />
          ))}

          {chart.points.map((point, index) => {
            const previousPoint = chart.points[index - 1];
            const nextPoint = chart.points[index + 1];
            const leftBoundary = previousPoint
              ? (previousPoint.x + point.x) / 2
              : chart.plot.x;
            const rightBoundary = nextPoint
              ? (nextPoint.x + point.x) / 2
              : chart.plot.x + chart.plot.width;

            return (
              <rect
                className={styles.hitArea}
                key={`${point.label}-hit`}
                x={leftBoundary}
                y={chart.plot.y}
                width={rightBoundary - leftBoundary}
                height={chart.plot.height}
                onMouseEnter={() => setActiveIndex(point.index)}
                onFocus={() => setActiveIndex(point.index)}
                tabIndex="0"
              />
            );
          })}
        </svg>

        {activePoint && (
          <div className={styles.tooltip}>
            <strong>{activePoint.label}</strong>
            <span>
              {chart.selectedSeries.label}:{" "}
              {formatMetricValue(activePoint.value, chart.selectedSeries)}
            </span>
            <small>
              Consumo: {formatNumber(activePoint.raw.consumptionLiters)} litros
            </small>
            <small>
              Fluxo: {formatNumber(activePoint.raw.flowLitersPerMinute)} litros
              por minuto
            </small>
            <small>Pressão: {formatNumber(activePoint.raw.pressureBar)} bar</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default SensorHistoryChart;
