import { FiChevronDown } from "react-icons/fi";
import { PiShootingStarBold } from "react-icons/pi";
import styles from "./AlertsFeedItem.module.css";

function AlertsFeedItem({
  title,
  timeLabel,
  tone = "warning",
  severityLabel = "Medio",
  icon: Icon,
  description,
  aiSuggestion,
  actionLabel,
  onAction,
  expanded = false,
  onToggle,
}) {
  return (
    <article className={styles.item}>
      <header className={styles.header}>
        <div className={styles.left}>
          <div className={`${styles.iconBox} ${styles[tone]}`}>
            <Icon />
          </div>

          <div className={styles.meta}>
            <h3>{title}</h3>
            <p>{timeLabel}</p>
          </div>
        </div>

        <div className={styles.right}>
          <span className={`${styles.severity} ${styles[`severity-${tone}`]}`}>
            {severityLabel}
          </span>

          <button
            type="button"
            aria-label={`Expandir alerta ${title}`}
            className={`${styles.expandButton} ${
              expanded ? styles.expandedButton : ""
            }`}
            onClick={onToggle}
          >
            <FiChevronDown />
          </button>
        </div>
      </header>

      {expanded && (
        <div className={styles.expandedContent}>
          <p className={styles.description}>{description}</p>

          <div className={styles.suggestionCard}>
            <strong>
              <PiShootingStarBold />
              Sugestao da IA
            </strong>

            <p>{aiSuggestion}</p>
          </div>

          {actionLabel ? (
            <button
              type="button"
              className={styles.actionButton}
              onClick={onAction}
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      )}
    </article>
  );
}

export default AlertsFeedItem;
