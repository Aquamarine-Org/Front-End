import { useState, useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import Modal from "@src/components/Modal/Modal.jsx";
import styles from "./DeviceValveStatusCard.module.css";
import { MdBlock } from "react-icons/md";

function DeviceValveStatusCard({
  title,
  isOpen,
  statusLabel,
  description,
  actionLabel,
  onAction,
}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [lastToggledAt, setLastToggledAt] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutos

  useEffect(() => {
    let timer;
    if (isConfirmOpen && isBlocked && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timer);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isConfirmOpen, isBlocked, secondsLeft]);

  const handleActionClick = () => {
    const now = Date.now();
    if (lastToggledAt && now - lastToggledAt < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - (now - lastToggledAt)) / 1000);
      setSecondsLeft(remaining);
      setIsBlocked(true);
      setIsConfirmOpen(true);
    } else {
      setIsBlocked(false);
      setIsConfirmOpen(true);
    }
  };

  const handleConfirm = () => {
    onAction && onAction();
    setLastToggledAt(Date.now());
    setIsConfirmOpen(false);
  };

  const handleCloseModal = () => {
    setIsConfirmOpen(false);
  };

  return (
    <section className={styles.card}>
      <h2>{title}</h2>

      <div
        className={`${styles.statusRing} ${
          isOpen ? "" : styles.statusRingClosed
        }`}
      >
        <div
          className={`${styles.statusCore} ${
            isOpen ? "" : styles.statusCoreClosed
          }`}
        >
          {isOpen ? <FiCheck /> : <FiX />}
        </div>

        <span
          className={`${styles.statusChip} ${isOpen ? styles.openChip : styles.closedChip}`}
        >
          {statusLabel}
        </span>
      </div>

      <p>{description}</p>

      <button
        type="button"
        className={styles.actionButton}
        onClick={handleActionClick}
      >
        {isOpen ? <FiX /> : <FiCheck />}
        {actionLabel}
      </button>

      <Modal
        isOpen={isConfirmOpen}
        onClose={handleCloseModal}
        icon={isOpen ? MdBlock : FiCheck}
        title={
          isOpen
            ? "Deseja mesmo fechar a válvula?"
            : "Deseja mesmo abrir a válvula?"
        }
        aria_labelledby="valve-modal-title"
        onSubmit={(e) => {
          e.preventDefault();
          if (!isBlocked) handleConfirm();
        }}
      >
        <div className={styles.modalContent}>
          {!isBlocked ? (
            <>
              <p className={styles.modalMessage}>
                Essa ação irá {isOpen ? "fechar" : "abrir"} a válvula
                imediatamente.
              </p>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.modalPrimaryButton}>
                  Confirmar
                </button>

                <button
                  type="button"
                  className={styles.modalSecondaryButton}
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className={styles.modalWarningTitle}>
                Aguarde antes de alternar a válvula
              </h3>
              <p className={styles.modalMessage}>
                Você só pode abrir ou fechar a válvula a cada 10 minutos.
                Aguarde {secondsLeft} segundos antes de tentar novamente.
              </p>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.modalPrimaryButton}
                  onClick={handleCloseModal}
                >
                  Entendi
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </section>
  );
}

export default DeviceValveStatusCard;
