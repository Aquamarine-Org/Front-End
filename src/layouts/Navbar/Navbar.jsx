import { useEffect, useState } from "react";
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
    path: "/configuracoes",
  },
];

function Navbar({ currentPage = "inicio" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleViewportChange = (event) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleViewportChange);

    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <>
      <button
        type="button"
        className={styles.menuToggle}
        aria-expanded={menuOpen}
        aria-controls="dashboard-sidebar"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen ? (
        <button
          type="button"
          className={styles.menuBackdrop}
          aria-label="Fechar menu"
          onClick={closeMenu}
        />
      ) : null}

      <aside
        id="dashboard-sidebar"
        className={`${styles.container} ${menuOpen ? styles.menuOpen : ""}`}
        aria-label="Menu do dashboard"
      >
        <div className={styles.sidebar}>
          <div className={styles.topContent}>
            <div className={styles.logoContainer}>
              <Link className={styles.logoContent} to="/" onClick={closeMenu}>
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

            <nav className={styles.navigationContainer} aria-label="Navegação">
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;

                const navigationContent = (
                  <>
                    <Icon className={styles.navigationIcon} aria-hidden="true" />

                    <span className={styles.navigationText}>{item.label}</span>
                  </>
                );

                const navigationClassName = `${styles.navigationItem} ${
                  currentPage === item.id ? styles.active : ""
                }`;

                if (item.path) {
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={navigationClassName}
                      title={item.label}
                      onClick={closeMenu}
                    >
                      {navigationContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className={navigationClassName}
                    title={item.label}
                  >
                    {navigationContent}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className={styles.bottomContent}>
            <Link
              to="/dispositivos"
              className={styles.actionButtonLink}
              onClick={closeMenu}
            >
              <ActionButton backgroundColor="#097cd8">
                <div className={styles.buttonContent}>
                  <BsHouseX
                    className={styles.buttonIcon}
                    aria-hidden="true"
                  />

                  <span className={styles.buttonText}>Fechar Válvula</span>
                </div>
              </ActionButton>
            </Link>

            <div className={styles.footerActions}>
              <Link to="/dados" className={styles.footerLink} onClick={closeMenu}>
                <div className={styles.supportItem}>
                  <FaRegCircleQuestion
                    className={styles.supportIcon}
                    aria-hidden="true"
                  />

                  <span className={styles.footerText}>Suporte</span>
                </div>
              </Link>

              <Link to="/" className={styles.footerLink} onClick={closeMenu}>
                <div className={styles.logoutItem}>
                  <MdExitToApp
                    className={styles.logoutIcon}
                    aria-hidden="true"
                  />

                  <span className={styles.footerText}>Sair</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
