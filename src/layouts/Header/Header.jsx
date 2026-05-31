import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "@assets/logo.png";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/#inicio", label: "Início" },
  { href: "/#sobre", label: "Sobre nós" },
  { href: "/#produto", label: "Produto" },
  { href: "/#avaliacoes", label: "Avaliações" },
  { href: "/#planos", label: "Planos" },
  { href: "/#parceiros", label: "Parceiros" },
  { href: "/#suporte", label: "Suporte" },
];

function Header() {
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
    <header className={styles.navbar}>
      <div
        className={`${styles.navbarContainer} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <a href="/#inicio" className={styles.navbarLogo} onClick={closeMenu}>
          <img src={logo} alt="Logo da Aquamarine" />

          <span>AQUAMARINE</span>
        </a>

        <button
          type="button"
          className={styles.navbarToggle}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="navbar-menu"
          className={styles.navbarLinks}
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.navbarActions}>
          <Link to="/login" onClick={closeMenu}>
            <button type="button" className={styles.navbarLoginButton}>
              Entrar
            </button>
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className={styles.menuBackdrop}
          aria-label="Fechar menu"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}

export default Header;
