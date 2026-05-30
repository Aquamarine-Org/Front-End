import { IoCloseOutline } from "react-icons/io5";
import styles from "./Modal.module.css";

function Modal({
  isOpen,
  onClose,
  icon: Icon,
  title,
  subtitle,
  children,
  onSubmit,
  aria_labelledby = "modal-title",
}) {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    if (onSubmit) {
      onSubmit(event);
      return;
    }

    event.preventDefault();
  };

  return (
    <div className={styles.modalOverlay}>
      <form
        className={styles.connectionModal}
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby={aria_labelledby}
      >
        <button
          type="button"
          className={styles.closeModalButton}
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <IoCloseOutline size={24} />
        </button>

        {(Icon || title) && (
          <div className={styles.modalHeader}>
            {Icon && (
              <div className={styles.modalIcon}>
                <Icon size={28} />
              </div>
            )}
            <div>
              <h3 id={aria_labelledby}>{title}</h3>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
        )}

        {children}
      </form>
    </div>
  );
}

export default Modal;
