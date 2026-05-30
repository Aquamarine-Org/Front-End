import { IoSearchOutline } from "react-icons/io5";
import styles from "./AlertsFilterBar.module.css";

function AlertsFilterBar({
  scopeLabel = "Todos",
  searchPlaceholder = "Buscar chamado",
  searchValue,
  onSearchChange,
  onScopeClick,
}) {
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.scopeButton}
        onClick={onScopeClick}
        aria-label="Alterar filtro de alertas"
      >
        {scopeLabel}
      </button>

      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchValue}
          onChange={onSearchChange}
          className={styles.searchInput}
          placeholder={searchPlaceholder}
          aria-label="Buscar alertas"
        />

        <IoSearchOutline className={styles.searchIcon} />
      </div>
    </div>
  );
}

export default AlertsFilterBar;
