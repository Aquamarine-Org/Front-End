import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import styles from "./HomePage.module.css";

import {
  FiAlertTriangle,
  FiArrowUpRight,
  FiCheck,
  FiTrendingDown,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";

import { LuGauge } from "react-icons/lu";

import ActionButton from "@src/components/ActionButton/ActionButton.jsx";
import AlertCard from "@src/features/AlertCard/AlertCard.jsx";

import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

import { useMemo, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts";

const ALERTS = [
  {
    id: 1,
    title: "Consumo Elevado",
    time: "Ha 12h",
    level: "Medio",
    tone: "warning",
    icon: FiTrendingUp,
  },
  {
    id: 2,
    title: "Pressao Anomala",
    time: "Ha 2 dias",
    level: "Comum",
    tone: "normal",
    icon: LuGauge,
  },
  {
    id: 3,
    title: "Vazamento Detectado",
    time: "Ha 1 semana",
    level: "Perigo",
    tone: "danger",
    icon: FiAlertTriangle,
  },
];

const chartData = [
  { hour: "00h", fluxo: 10, pressao: 22 },
  { hour: "04h", fluxo: 15, pressao: 18 },
  { hour: "08h", fluxo: 12, pressao: 26 },
  { hour: "12h", fluxo: 18, pressao: 20 },
  { hour: "16h", fluxo: 14, pressao: 24 },
  { hour: "20h", fluxo: 11, pressao: 19 },
  { hour: "24h", fluxo: 13, pressao: 21 },
];

function HomePage() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValveOpen, setIsValveOpen] = useState(true);

  const averageFlow = useMemo(() => {
    const total = chartData.reduce((acc, item) => acc + item.fluxo, 0);

    return (total / chartData.length).toFixed(1);
  }, []);

  const handleToggleValve = () => {
    setIsValveOpen((prev) => !prev);
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout pageTitle="Inicio" currentPage="inicio">
      <div className={styles.home}>
        <div className={styles.topRow}>
          <section className={`${styles.card} ${styles.chartCard}`}>
            <div className={styles.chartHeader}>
              <h2 className={styles.cardTitle}>
                FLUXO E PRESSAO - ULTIMAS 24H
              </h2>

              <span className={styles.deltaBadge}>
                <FiTrendingDown className={styles.deltaIcon} aria-hidden="true" />
                -4% vs. medio
              </span>
            </div>

            <p className={styles.chartValue}>
              {averageFlow}
              <span>L/min</span>
            </p>

            <div className={styles.chartArea}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="flowGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ea4a4a" stopOpacity={0.3} />

                      <stop offset="95%" stopColor="#ea4a4a" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#dfe6ee" />

                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 11 }}
                    tickMargin={6}
                    interval="preserveStartEnd"
                  />

                  <YAxis tick={{ fontSize: 11 }} width={32} />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="fluxo"
                    stroke="#ea4a4a"
                    fill="url(#flowGradient)"
                    strokeWidth={2.5}
                  />

                  <Line
                    type="monotone"
                    dataKey="pressao"
                    stroke="#1f769b"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className={`${styles.card} ${styles.valveCard}`}>
            <h2 className={styles.cardTitle}>DISPOSITIVO PRINCIPAL</h2>

            <div className={styles.valveStatus}>
              <div
                className={`${styles.statusRing} ${
                  isValveOpen ? styles.openRing : styles.closedRing
                }`}
              >
                <div
                  className={`${styles.statusIcon} ${
                    isValveOpen ? styles.openIcon : styles.closedIcon
                  }`}
                >
                  {isValveOpen ? <FiCheck /> : <FiX />}
                </div>
              </div>

              <span
                className={`${styles.statusChip} ${
                  isValveOpen ? styles.openChip : styles.closedChip
                }`}
              >
                {isValveOpen ? "ABERTA" : "FECHADA"}
              </span>
            </div>

            <p className={styles.valveDescription}>
              {isValveOpen
                ? "O dispositivo esta aberto e funcionando normalmente."
                : "O dispositivo esta fechado. Abra-o para retornar a operacao."}
            </p>

            <ActionButton
              backgroundColor={isValveOpen ? "#ea4a4a" : "#5ac7a2"}
              className={`${styles.valveButton} ${
                isValveOpen ? styles.valveButtonClose : styles.valveButtonOpen
              }`}
              onClick={() => setIsModalOpen(true)}
            >
              {isValveOpen ? "FECHAR DISPOSITIVO" : "ABRIR DISPOSITIVO"}

              {isValveOpen ? (
                <FiX className={styles.buttonCheck} aria-hidden="true" />
              ) : (
                <FiCheck className={styles.buttonCheck} aria-hidden="true" />
              )}
            </ActionButton>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Confirmar acao"
            >
              <div className={styles.modalContent}>
                <p>
                  Deseja realmente {isValveOpen ? "fechar" : "abrir"} o
                  dispositivo principal?
                </p>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    className={styles.confirmButton}
                    onClick={handleToggleValve}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </Modal>
          </section>
        </div>

        <section className={`${styles.card} ${styles.alertsCard}`}>
          <header className={styles.alertsHeader}>
            <h2 className={styles.alertsTitle}>Alertas recentes</h2>

            <button
              type="button"
              className={styles.viewAllButton}
              onClick={() => navigate("/alertas")}
            >
              VER TODOS
              <FiArrowUpRight aria-hidden="true" />
            </button>
          </header>

          <div className={styles.alertList}>
            {ALERTS.map((alert) => (
              <AlertCard
                key={alert.id}
                icon={alert.icon}
                title={alert.title}
                time={alert.time}
                level={alert.level}
                tone={alert.tone}
              />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default HomePage;
