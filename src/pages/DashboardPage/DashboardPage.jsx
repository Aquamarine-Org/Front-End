import { useState } from "react";
import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import { FiDroplet, FiEdit3, FiShield } from "react-icons/fi";
import { IoEyeOutline, IoWaterOutline } from "react-icons/io5";
import { GiValve } from "react-icons/gi";
import { FaStairs } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Modal from "@src/components/Modal/Modal.jsx";
import { createFallbackDashboardOverview } from "@src/lib/aquamarineData.js";
import styles from "./DashboardPage.module.css";

function RoomCard({ room, onView }) {
  return (
    <article className={`${styles.roomCard} ${styles[room.tone]}`}>
      <header className={styles.roomHeader}>
        <h3>{room.nome}</h3>

        {room.exibirDetalhes ? (
          <button
            type="button"
            className={styles.roomViewButton}
            aria-label={`Visualizar ${room.nome}`}
            onClick={() => onView(room)}
          >
            <IoEyeOutline />
          </button>
        ) : null}
      </header>

      <div className={styles.roomMetrics}>
        <span>{room.area}</span>
        <span>{room.sensores}</span>
      </div>

      <span className={`${styles.roomStatus} ${styles[`${room.tone}Status`]}`}>
        {room.status}
      </span>
    </article>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const dashboard = createFallbackDashboardOverview();
  const [modalDashboard, setModalDashboard] = useState(null);

  const closeModal = () => setModalDashboard(null);
  const quantidadeAndares = dashboard.resumo?.quantidadeAndares ?? 1;
  const selectedRoom = modalDashboard?.room;

  const getStatusIcon = (cardId) => {
    const icons = {
      sistema: FiDroplet,
      registro: GiValve,
      risco: FiShield,
      dispositivos: IoWaterOutline,
    };

    return icons[cardId] || IoWaterOutline;
  };

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      currentPage="dashboard"
      pageTitleClassName={styles.dashboardTitle}
    >
      <section className={styles.dashboardPage}>
        <div className={styles.statusGrid}>
          {dashboard.statusCards.map((card) => (
            <article className={styles.statusCard} key={card.id}>
              <div className={styles.statusText}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </div>

              <div className={styles.statusIcon} aria-hidden="true">
                {(() => {
                  const StatusIcon = getStatusIcon(card.id);
                  return <StatusIcon />;
                })()}
              </div>
            </article>
          ))}
        </div>

        <article className={styles.floorPanel}>
          <header className={styles.floorHeader}>
            <h2>Térreo</h2>

            <div className={styles.floorActions}>
              <button
                type="button"
                className={styles.floorActionButton}
                onClick={() => setModalDashboard({ type: "floors" })}
              >
                <FaStairs aria-hidden="true" />
                Andares
              </button>

              <button
                type="button"
                className={styles.floorActionButton}
                onClick={() => navigate("/planta-da-casa")}
              >
                <FiEdit3 aria-hidden="true" />
                editar mapa
              </button>
            </div>
          </header>

          <div className={styles.floorCanvas}>
            <div className={styles.roomStack}>
              {dashboard.ambientes.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onView={(selected) =>
                    setModalDashboard({ type: "room", room: selected })
                  }
                />
              ))}
            </div>
          </div>
        </article>
      </section>

      <Modal
        isOpen={modalDashboard?.type === "floors"}
        onClose={closeModal}
        icon={FaStairs}
        title="Andares da residência"
      >
        <div className={styles.dashboardModalContent}>
          <p>Há {quantidadeAndares} andar(es) cadastrado(s) no mapa atual.</p>
          <button
            type="button"
            className={styles.modalPrimaryButton}
            onClick={() => navigate("/planta-da-casa")}
          >
            Editar andares
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={modalDashboard?.type === "room"}
        onClose={closeModal}
        icon={IoEyeOutline}
        title={selectedRoom?.nome}
        subtitle={selectedRoom?.status}
      >
        <div className={styles.dashboardModalContent}>
          <p>
            {selectedRoom?.area} · {selectedRoom?.sensores}
          </p>
          <button
            type="button"
            className={styles.modalPrimaryButton}
            onClick={() => navigate("/planta-da-casa")}
          >
            Abrir no mapa
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default DashboardPage;
