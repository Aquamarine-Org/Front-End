import styles from "./DeviceControlMetric.module.css";

function DeviceControlMetric({ label, value }) {
  return (
    <article className={styles.metricRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default DeviceControlMetric;
