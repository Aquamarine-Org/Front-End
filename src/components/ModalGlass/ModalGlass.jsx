import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

import styles from "./ModalGlass.module.css";

function ModalGlass({
  isOpen,
  onClose,
  children,
  width = "600px",
  height = "auto",
  closeOnOverlay = true,
  showCloseButton = true,
  className = "",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";

      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlay) {
      onClose();
    }
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={`${styles.modal} ${className}`}
        style={{
          width,
          height,
        }}
        onClick={handleContentClick}
      >
        {showCloseButton && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            <IoClose />
          </button>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default ModalGlass;
