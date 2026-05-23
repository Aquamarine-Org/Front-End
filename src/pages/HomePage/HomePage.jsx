import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import styles from "./HomePage.module.css";
import {
  FiAlertTriangle,
  FiArrowUpRight,
  FiCheck,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";
import { LuGauge } from "react-icons/lu";
import ActionButton from "@src/components/ActionButton/ActionButton.jsx";
import AlertCard from "@src/features/AlertCard/AlertCard.jsx";

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
  {
    id: 4,
    title: "Consumo Elevado",
    time: "Ha 2 semanas",
    level: "Medio",
    tone: "warning",
    icon: FiTrendingUp,
  },
];

function HomePage() {
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
                <FiTrendingDown className={styles.deltaIcon} />
                -4% vs. medio
              </span>
            </div>

            <p className={styles.chartValue}>
              12.4 <span>L/min</span>
            </p>

            <div className={styles.chartArea}>
              <svg
                viewBox="0 0 760 250"
                className={styles.chartSvg}
                aria-label="Grafico de fluxo e pressao"
                role="img"
              >
                <defs>
                  <linearGradient id="flow-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(235, 78, 81, 0.32)" />
                    <stop offset="100%" stopColor="rgba(235, 78, 81, 0.02)" />
                  </linearGradient>
                </defs>

                <line
                  className={styles.gridLine}
                  x1="510"
                  y1="0"
                  x2="510"
                  y2="250"
                />
                <line
                  className={styles.gridLine}
                  x1="620"
                  y1="0"
                  x2="620"
                  y2="250"
                />
                <line
                  className={styles.gridLine}
                  x1="700"
                  y1="0"
                  x2="700"
                  y2="250"
                />

                <path
                  d="M 0 135 C 70 165, 140 80, 205 125 C 290 185, 360 102, 420 150 C 500 222, 575 65, 650 112 C 690 138, 730 165, 760 145 L 760 250 L 0 250 Z"
                  fill="url(#flow-fill)"
                />

                <path
                  d="M 0 135 C 70 165, 140 80, 205 125 C 290 185, 360 102, 420 150 C 500 222, 575 65, 650 112 C 690 138, 730 165, 760 145"
                  className={styles.redCurve}
                />

                <path
                  d="M 0 120 C 100 70, 165 185, 240 138 C 315 90, 370 202, 445 160 C 520 118, 600 170, 675 145 C 720 130, 742 124, 760 124"
                  className={styles.blueCurve}
                />

                <circle cx="268" cy="143" r="5" className={styles.chartDot} />
                <circle cx="465" cy="157" r="5" className={styles.chartDot} />
              </svg>
            </div>
          </section>

          <section className={`${styles.card} ${styles.valveCard}`}>
            <h2 className={styles.cardTitle}>VALVULA PRINCIPAL</h2>

            <div className={styles.valveStatus}>
              <div className={styles.statusRing}>
                <div className={styles.statusIcon}>
                  <FiCheck />
                </div>
              </div>

              <span className={styles.statusChip}>ABERTO</span>
            </div>

            <p className={styles.valveDescription}>
              A valvula nao esta ligada. Ligue-a para retornar a operacao.
            </p>

            <ActionButton
              backgroundColor="#5ac7a2"
              className={styles.valveButton}
              style={{
                width: "70%",
                padding: "1rem 0.6rem",
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                gap: "0.5rem",
                boxShadow: "0 14px 24px rgba(234, 132, 132, 0.28)",
              }}
            >
              ABRIR VALVULA
              <FiCheck className={styles.buttonCheck} />
            </ActionButton>
          </section>
        </div>

        <section className={`${styles.card} ${styles.alertsCard}`}>
          <header className={styles.alertsHeader}>
            <h2 className={styles.alertsTitle}>Alertas recentes</h2>

            <button type="button" className={styles.viewAllButton}>
              VER TODOS
              <FiArrowUpRight />
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
