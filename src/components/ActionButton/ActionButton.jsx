import styles from "./ActionButton.module.css";

function ActionButton({
  children,
  backgroundColor = "#097cd8",
  className = "",
  style,
  type = "button",
  ...props
}) {
  const buttonClassName = className
    ? `${styles.button} ${className}`
    : styles.button;

  return (
    <button
      className={buttonClassName}
      style={{ backgroundColor, ...style }}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default ActionButton;
