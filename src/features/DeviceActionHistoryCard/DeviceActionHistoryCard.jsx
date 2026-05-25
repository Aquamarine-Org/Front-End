import DeviceActionHistoryItem from "@src/features/DeviceActionHistoryItem/DeviceActionHistoryItem.jsx";
import styles from "./DeviceActionHistoryCard.module.css";

function DeviceActionHistoryCard({ title, actions }) {
  return (
    <section className={styles.card}>
      <h2>{title}</h2>

      <div className={styles.actionsList}>
        {actions.map((action) => (
          <DeviceActionHistoryItem
            key={action.id}
            title={action.title}
            description={action.description}
            timeLabel={action.timeLabel}
          />
        ))}
      </div>
    </section>
  );
}

export default DeviceActionHistoryCard;
