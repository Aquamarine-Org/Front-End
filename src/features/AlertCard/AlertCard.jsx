import styles from "./AlertCard.module.css";
import { useNavigate } from "react-router-dom";

function AlertCard({ icon: Icon, title, time, level, tone }) {
  const navigate = useNavigate();

  return (
    <article className={styles.alertRow} onClick={() => navigate("/alertas")}>
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
