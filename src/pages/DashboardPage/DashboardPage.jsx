import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import { FiDroplet, FiEdit3, FiShield } from "react-icons/fi";
import { IoEyeOutline, IoWaterOutline } from "react-icons/io5";
import { GiValve } from "react-icons/gi";
import { FaStairs } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styles from "./DashboardPage.module.css";

const STATUS_CARDS = [
  {
    id: "sistema",
    label: "STATUS DO SISTEMA",
    value: "Funcionando",
    icon: FiDroplet,
  },
  {
    id: "registro",
    label: "STATUS DO REGISTRO",
    value: "Aberto",
    icon: GiValve,
  },
  {
    id: "risco",
    label: "RISCO ATUAL DE VAZAMENTO",
    value: "Baixo",
    icon: FiShield,
  },
  {
    id: "dispositivos",
    label: "DISPOSITIVOS ONLINE",
    value: "5",
    icon: IoWaterOutline,
  },
];

const ROOMS = [
  {
    id: "cozinha",
    name: "Cozinha",
    area: "12m²",
    sensors: "1 sensor",
    status: "Normal",
    tone: "normal",
    showDetails: true,
  },
  {
    id: "banheiro",
    name: "Banheiro",
    area: "12m²",
    sensors: "1 sensor",
    status: "Risco",
    tone: "risk",
  },
];

function RoomCard({ room }) {
  return (
    <article className={`${styles.roomCard} ${styles[room.tone]}`}>
      <header className={styles.roomHeader}>
        <h3>{room.name}</h3>

        {room.showDetails ? (
          <button
            type="button"
            className={styles.roomViewButton}
            aria-label={`Visualizar ${room.name}`}
          >
            <IoEyeOutline />
          </button>
        ) : null}
      </header>

      <div className={styles.roomMetrics}>
        <span>{room.area}</span>
        <span>{room.sensors}</span>
      </div>

      <span className={`${styles.roomStatus} ${styles[`${room.tone}Status`]}`}>
        {room.status}
      </span>
    </article>
  );
}

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      currentPage="dashboard"
      pageTitleClassName={styles.dashboardTitle}
    >
      <section className={styles.dashboardPage}>
        <div className={styles.statusGrid}>
          {STATUS_CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <article className={styles.statusCard} key={card.id}>
                <div className={styles.statusText}>
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </div>

                <div className={styles.statusIcon}>
                  <Icon />
                </div>
              </article>
            );
          })}
        </div>

        <article className={styles.floorPanel}>
          <header className={styles.floorHeader}>
            <h2>Térreo</h2>

            <div className={styles.floorActions}>
              <button type="button" className={styles.floorActionButton}>
                <FaStairs />
                Andares
              </button>

              <button
                type="button"
                className={styles.floorActionButton}
                onClick={() => navigate("/planta-da-casa")}
              >
                <FiEdit3 />
                editar mapa
              </button>
            </div>
          </header>

          <div className={styles.floorCanvas}>
            <div className={styles.roomStack}>
              <RoomCard room={ROOMS[0]} />

              <span className={styles.connector} aria-hidden="true"></span>

              <RoomCard room={ROOMS[1]} />
            </div>
          </div>
        </article>
      </section>
    </DashboardLayout>
  );
}

export default DashboardPage;
