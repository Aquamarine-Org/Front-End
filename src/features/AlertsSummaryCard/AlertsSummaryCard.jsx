import styles from "./AlertsSummaryCard.module.css";

function AlertsSummaryCard({ label, value, description, tone, icon: Icon }) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>

        <div className={styles.valueRow}>
          <strong className={styles.value}>{value}</strong>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <div className={`${styles.iconCircle} ${styles[tone]}`} aria-hidden="true">
        <Icon />
      </div>
    </article>
  );
}

export default AlertsSummaryCard;
