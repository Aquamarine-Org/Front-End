import { Link } from "react-router-dom";

import logo from "@assets/logo.png";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.navbarLogo}>
          <img src={logo} alt="Logo da Aquamarine" />

          <span>AQUAMARINE</span>
        </Link>

        <nav className={styles.navbarLinks}>
          <Link to="/">Início</Link>
          <Link to="/sobre">Sobre nós</Link>
          <Link to="/produto">Produto</Link>
          <Link to="/avaliacoes">Avaliações</Link>
          <Link to="/planos">Planos</Link>
          <Link to="/parceiros">Parceiros</Link>
          <Link to="/suporte">Suporte</Link>
        </nav>

        <div className={styles.navbarActions}>
          <Link to="/login">
            <button className={styles.navbarLoginButton}>Entrar</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
