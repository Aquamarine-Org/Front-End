import styles from "./DeviceActionHistoryItem.module.css";

function DeviceActionHistoryItem({ title, description, timeLabel }) {
  return (
    <article className={styles.item}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <span>{timeLabel}</span>
    </article>
  );
}

export default DeviceActionHistoryItem;
