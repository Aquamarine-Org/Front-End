import styles from "./ActionButton.module.css";

function ActionButton({ children, backgroundColor = "#097cd8", ...props }) {
  return (
    <button className={styles.button} style={{ backgroundColor }} {...props}>
      {children}
    </button>
  );
}

export default ActionButton;
