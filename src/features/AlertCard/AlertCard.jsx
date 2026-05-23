import styles from "./AlertCard.module.css";

function AlertCard({ icon: Icon, title, time, level, tone }) {
  return (
    <article className={styles.alertRow}>
      <div className={`${styles.alertIconBox} ${styles[`icon-${tone}`]}`}>
        <Icon />
      </div>

      <div className={styles.alertInfo}>
        <h3>{title}</h3>
        <p>{time}</p>
      </div>

      <span className={`${styles.alertLevel} ${styles[`level-${tone}`]}`}>
        {level}
      </span>
    </article>
  );
}

export default AlertCard;
