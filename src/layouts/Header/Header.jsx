import { Link } from "react-router-dom";

import logo from "@assets/logo.png";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <a href="/#inicio" className={styles.navbarLogo}>
          <img src={logo} alt="Logo da Aquamarine" />

          <span>AQUAMARINE</span>
        </a>

        <nav className={styles.navbarLinks}>
          <a href="/#inicio">Início</a>
          <a href="/#sobre">Sobre nós</a>
          <a href="/#produto">Produto</a>
          <a href="/#avaliacoes">Avaliações</a>
          <a href="/#planos">Planos</a>
          <a href="/#parceiros">Parceiros</a>
          <a href="/#suporte">Suporte</a>
        </nav>

        <div className={styles.navbarActions}>
          <Link to="/login">
            <button type="button" className={styles.navbarLoginButton}>
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
