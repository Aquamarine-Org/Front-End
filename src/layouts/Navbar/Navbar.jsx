import styles from "./Navbar.module.css";
import ActionButton from "../../components/ActionButton/ActionButton";
import { Link } from "react-router-dom";

const NAVIGATION_ITEMS = [
  {
    id: "inicio",
    label: "Início",
    icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/5b14l4z5_expires_30_days.png",
    alt: "Ícone de início",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/ep1f9ukg_expires_30_days.png",
    alt: "Ícone de dashboard",
  },
  {
    id: "alertas",
    label: "Alertas",
    icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/ky85fby7_expires_30_days.png",
    alt: "Ícone de alertas",
  },
  {
    id: "historico",
    label: "Histórico",
    icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/s12clpjf_expires_30_days.png",
    alt: "Ícone de histórico",
  },
  {
    id: "valvulas",
    label: "Válvulas",
    icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/azyt3q3p_expires_30_days.png",
    alt: "Ícone de válvulas",
  },
  {
    id: "configurar-valvulas",
    label: "Configurar válvulas",
    icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/iyln61y8_expires_30_days.png",
    alt: "Ícone de configurar válvulas",
  },
  {
    id: "configuracoes",
    label: "Configurações",
    icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/ne4eu4ii_expires_30_days.png",
    alt: "Ícone de configurações",
  },
];

function Navbar({ currentPage = "inicio" }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.topContent}>
          <div className={styles.logoContainer}>
            <Link className={styles.logoContent} to="/">
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/rdmc84k9_expires_30_days.png"
                alt="Logo da Aquamarine"
                className={styles.logoImage}
              />

              <div className={styles.logoTextContainer}>
                <span className={styles.logoText}>AQUAMARINE</span>
              </div>
            </Link>
          </div>

          <div className={styles.navigationContainer}>
            {NAVIGATION_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`${styles.navigationItem} ${
                  currentPage === item.id ? styles.active : ""
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.alt}
                  className={styles.navigationIcon}
                />

                <span className={styles.navigationText}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottomContent}>
          <ActionButton backgroundColor="#097cd8">
            <div className={styles.buttonContent}>
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/2z4zgc9q_expires_30_days.png"
                alt="Ícone de abrir válvula"
                className={styles.buttonIcon}
              />

              <span className={styles.buttonText}>Abrir válvula</span>
            </div>
          </ActionButton>

          <div className={styles.footerActions}>
            <div className={styles.supportItem}>
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/qpmqv9w4_expires_30_days.png"
                alt="Ícone de suporte"
                className={styles.supportIcon}
              />

              <span className={styles.footerText}>Suporte</span>
            </div>

            <div className={styles.logoutItem}>
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/X7XDcgIuwk/aswgbctf_expires_30_days.png"
                alt="Ícone de sair"
                className={styles.logoutIcon}
              />

              <span className={styles.footerText}>Sair</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
