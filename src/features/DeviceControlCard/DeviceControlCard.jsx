import { FiSettings } from "react-icons/fi";
import DeviceControlMetric from "@src/features/DeviceControlMetric/DeviceControlMetric.jsx";
import styles from "./DeviceControlCard.module.css";

function DeviceControlCard({ title, metrics, onOpenSettings }) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2>{title}</h2>

        <button
          type="button"
          className={styles.settingsButton}
          onClick={onOpenSettings}
          aria-label="Abrir controle de dispositivos"
        >
          <FiSettings />
        </button>
      </header>

      <div className={styles.metricsList}>
        {metrics.map((metric) => (
          <DeviceControlMetric
            key={metric.id}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>
    </section>
  );
}

export default DeviceControlCard;
