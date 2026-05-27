import styles from "./Navbar.module.css";
import ActionButton from "../../components/ActionButton/ActionButton";
import { Link } from "react-router-dom";
import logo from "/public/logo.png";
import { FiHome } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { GrAlert } from "react-icons/gr";
import { MdOutlineHistory } from "react-icons/md";
import { GiValve } from "react-icons/gi";
import { BsHouseGear, BsHouseX } from "react-icons/bs";
import { FaGear, FaRegCircleQuestion } from "react-icons/fa6";
import { MdExitToApp } from "react-icons/md";

const NAVIGATION_ITEMS = [
  {
    id: "inicio",
    label: "Início",
    icon: FiHome,
    path: "/home",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: MdOutlineDashboard,
    path: "/dashboard",
  },
  {
    id: "alertas",
    label: "Alertas",
    icon: GrAlert,
    path: "/alertas",
  },
  {
    id: "historico",
    label: "Histórico",
    icon: MdOutlineHistory,
    path: "/historico",
  },
  {
    id: "dispositivos",
    label: "Dispositivos",
    icon: GiValve,
    path: "/dispositivos",
  },
  {
    id: "configurar-dispositivos",
    label: "Configurar válvulas",
    icon: BsHouseGear,
    path: "/configurar-dispositivo",
  },
  {
    id: "configuracoes",
    label: "Configurações",
    icon: FaGear,
    path: "/dados",
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
                src={logo}
                alt="Logo da Aquamarine"
                className={styles.logoImage}
              />

              <div className={styles.logoTextContainer}>
                <span className={styles.logoText}>AQUAMARINE</span>
              </div>
            </Link>
          </div>

          <div className={styles.navigationContainer}>
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`${styles.navigationItem} ${
                    currentPage === item.id ? styles.active : ""
                  }`}
                >
                  <Icon className={styles.navigationIcon} />

                  <span className={styles.navigationText}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className={styles.bottomContent}>
          <Link to="/dispositivos" className={styles.actionButtonLink}>
            <ActionButton backgroundColor="#097cd8">
              <div className={styles.buttonContent}>
                <BsHouseX className={styles.buttonIcon} />

                <span className={styles.buttonText}>Fechar Válvula</span>
              </div>
            </ActionButton>
          </Link>

          <div className={styles.footerActions}>
            <Link to="/dados" className={styles.footerLink}>
              <div className={styles.supportItem}>
                <FaRegCircleQuestion className={styles.supportIcon} />

                <span className={styles.footerText}>Suporte</span>
              </div>
            </Link>

            <Link to="/" className={styles.footerLink}>
              <div className={styles.logoutItem}>
                <MdExitToApp className={styles.logoutIcon} />

                <span className={styles.footerText}>Sair</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
