import { FiCheck, FiX } from "react-icons/fi";
import styles from "./DeviceValveStatusCard.module.css";

function DeviceValveStatusCard({
  title,
  isOpen,
  statusLabel,
  description,
  actionLabel,
  onAction,
}) {
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

      <button type="button" className={styles.actionButton} onClick={onAction}>
        {isOpen ? <FiX /> : <FiCheck />}
        {actionLabel}
      </button>
    </section>
  );
}

export default DeviceValveStatusCard;
