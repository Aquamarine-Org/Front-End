import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import {
  IoCalendarClearOutline,
  IoDocumentTextOutline,
  IoFilterOutline,
  IoPulseOutline,
  IoWarningOutline,
  IoWaterOutline,
} from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

import SensorHistoryChart from "./SensorHistoryChart";
import styles from "./historico.module.css";

const sensorReadings = [
  {
    timestamp: "2025-04-13T00:00:00",
    label: "00h",
    consumptionLiters: 4,
    flowLitersPerMinute: 0.4,
    pressureBar: 2.4,
  },
  {
    timestamp: "2025-04-13T02:00:00",
    label: "02h",
    consumptionLiters: 3,
    flowLitersPerMinute: 0.3,
    pressureBar: 2.5,
  },
  {
    timestamp: "2025-04-13T04:00:00",
    label: "04h",
    consumptionLiters: 5,
    flowLitersPerMinute: 0.6,
    pressureBar: 2.3,
  },
  {
    timestamp: "2025-04-13T06:00:00",
    label: "06h",
    consumptionLiters: 18,
    flowLitersPerMinute: 3.4,
    pressureBar: 2.8,
  },
  {
    timestamp: "2025-04-13T08:00:00",
    label: "08h",
    consumptionLiters: 16,
    flowLitersPerMinute: 3.8,
    pressureBar: 3.1,
  },
  {
    timestamp: "2025-04-13T10:00:00",
    label: "10h",
    consumptionLiters: 6,
    flowLitersPerMinute: 0.8,
    pressureBar: 0.7,
  },
  {
    timestamp: "2025-04-13T12:00:00",
    label: "12h",
    consumptionLiters: 15,
    flowLitersPerMinute: 3.0,
    pressureBar: 2.7,
  },
  {
    timestamp: "2025-04-13T14:00:00",
    label: "14h",
    consumptionLiters: 11,
    flowLitersPerMinute: 2.1,
    pressureBar: 2.4,
  },
  {
    timestamp: "2025-04-13T16:00:00",
    label: "16h",
    consumptionLiters: 21,
    flowLitersPerMinute: 4.2,
    pressureBar: 3.3,
  },
  {
    timestamp: "2025-04-13T18:00:00",
    label: "18h",
    consumptionLiters: 13,
    flowLitersPerMinute: 2.6,
    pressureBar: 2.8,
  },
  {
    timestamp: "2025-04-13T20:00:00",
    label: "20h",
    consumptionLiters: 9,
    flowLitersPerMinute: 1.6,
    pressureBar: 2.0,
  },
  {
    timestamp: "2025-04-13T22:00:00",
    label: "22h",
    consumptionLiters: 17,
    flowLitersPerMinute: 3.5,
    pressureBar: 3.0,
  },
];

const chartSeries = [
  {
    key: "consumptionLiters",
    label: "Consumo de água",
    unit: "litros",
    color: "#1f5465",
    minValue: 0,
    decimalDigits: 0,
    normalRange: {
      min: 0,
      max: 14,
    },
  },
  {
    key: "flowLitersPerMinute",
    label: "Fluxo médio",
    unit: "litros por minuto",
    color: "#097cd8",
    minValue: 0,
    decimalDigits: 1,
    normalRange: {
      min: 0.2,
      max: 3.2,
    },
  },
  {
    key: "pressureBar",
    label: "Pressão média",
    unit: "bar",
    color: "#16a34a",
    minValue: 0,
    decimalDigits: 1,
    normalRange: {
      min: 1.5,
      max: 3.2,
    },
  },
];

const detailRows = [
  {
    hour: "08:00",
    consumption: "16 litros",
    flow: "3,8 litros por minuto",
    pressure: "3,1 bar",
    status: "Possível vazamento",
  },
  {
    hour: "09:00",
    consumption: "12 litros",
    flow: "2,2 litros por minuto",
    pressure: "2,2 bar",
    status: "Normal",
  },
  {
    hour: "10:00",
    consumption: "6 litros",
    flow: "0,8 litro por minuto",
    pressure: "0,7 bar",
    status: "Pressão baixa",
  },
  {
    hour: "11:00",
    consumption: "10 litros",
    flow: "1,9 litro por minuto",
    pressure: "1,8 bar",
    status: "Normal",
  },
  {
    hour: "12:00",
    consumption: "15 litros",
    flow: "3,0 litros por minuto",
    pressure: "2,7 bar",
    status: "Normal",
  },
];

const aiAnalyses = [
  {
    time: "08:12",
    sensor: "Sensor principal",
    title: "Fluxo contínuo detectado",
    description:
      "A IA identificou fluxo baixo e constante por 34 minutos. Verifique torneiras, caixa acoplada e conexões próximas.",
    severity: "alert",
  },
  {
    time: "10:04",
    sensor: "Sensor de pressão",
    title: "Pressão abaixo do padrão",
    description:
      "A pressão caiu para 0,7 bar. O comportamento pode indicar registro parcialmente fechado ou perda de pressão na rede.",
    severity: "warning",
  },
  {
    time: "12:18",
    sensor: "Sensor principal",
    title: "Padrão normalizado",
    description:
      "O consumo voltou ao intervalo esperado para este período. Nenhuma ação imediata necessária.",
    severity: "normal",
  },
];

function HistoricoPage() {
  const handleSendMonthlyHistory = () => {
    const message = encodeURIComponent(
      "Histórico mensal Aquamarine: consumo total de 1.240 litros, fluxo médio de 2,4 litros por minuto, pressão média de 2,6 bar e 2 possíveis vazamentos detectados pela IA."
    );

    window.open(
      `https://wa.me/?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <DashboardLayout currentPage="historico" pageTitle="Histórico">
      <section className={styles.historyPage}>
        <div className={styles.toolbar}>
          <button type="button" className={styles.dateButton}>
            <IoCalendarClearOutline size={16} />
            13 de abril, 2025
          </button>

          <div className={styles.toolbarActions}>
            <button type="button" className={styles.secondaryButton}>
              <IoDocumentTextOutline size={16} />
              Exportar PDF
            </button>

            <button
              type="button"
              className={styles.whatsappButton}
              onClick={handleSendMonthlyHistory}
            >
              <FaWhatsapp size={18} />
              Enviar histórico mensal por WhatsApp
            </button>

            <button type="button" className={styles.filterButton}>
              <IoFilterOutline size={16} />
              Filtros
            </button>
          </div>
        </div>

        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <IoWaterOutline size={24} />
            <span>Consumo de água</span>
            <strong>142 litros</strong>
          </article>

          <article className={styles.summaryCard}>
            <IoPulseOutline size={24} />
            <span>Fluxo médio</span>
            <strong>2,4 litros por minuto</strong>
          </article>

          <article className={styles.summaryCard}>
            <IoWarningOutline size={24} />
            <span>Análises com alerta</span>
            <strong>2 ocorrências</strong>
          </article>
        </div>

        <div className={styles.contentGrid}>
          <article className={styles.chartCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Monitoramento dos sensores</h2>
                <p>Gráfico interativo com escala real para cada métrica</p>
              </div>
            </div>

            <SensorHistoryChart readings={sensorReadings} series={chartSeries} />
          </article>

          <article className={styles.aiCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Análises dos sensores pela IA</h2>
                <p>Histórico de interpretações automáticas</p>
              </div>
            </div>

            <div className={styles.analysisList}>
              {aiAnalyses.map((analysis) => (
                <article
                  className={`${styles.analysisItem} ${
                    styles[analysis.severity]
                  }`}
                  key={`${analysis.time}-${analysis.title}`}
                >
                  <span>{analysis.time}</span>
                  <div>
                    <strong>{analysis.title}</strong>
                    <small>{analysis.sensor}</small>
                    <p>{analysis.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>

        <article className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Registros detalhados</h2>
              <p>Focado em sensores, consumo e anomalias</p>
            </div>
          </div>

          <table className={styles.historyTable}>
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
              {detailRows.map((row) => (
                <tr key={row.hour}>
                  <td>{row.hour}</td>
                  <td>{row.consumption}</td>
                  <td>{row.flow}</td>
                  <td>{row.pressure}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        row.status === "Normal" ? styles.normal : styles.alert
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </DashboardLayout>
  );
}

export default HistoricoPage;
