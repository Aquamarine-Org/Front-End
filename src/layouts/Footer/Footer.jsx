import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaLink } from "react-icons/fa";
import logo from "@assets/logo.png";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.brandSection}>
            <div className={styles.logoContainer}>
              <img src={logo} alt="Logo da Aquamarine" />

              <h2>AQUAMARINE</h2>
            </div>

            <p>Sistema de monitoramento inteligente de encanamentos</p>

            <div className={styles.socialLinks}>
              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaLinkedin />
              </a>

              <a href="#">
                <FaLink />
              </a>
            </div>
          </div>

          <div className={styles.linksContainer}>
            <div className={styles.linksColumn}>
              <h3>Sobre nós</h3>

              <Link to="/">Aquamarine</Link>
              <Link to="/parceiros">Parceiros</Link>
              <Link to="/planos">Planos</Link>
              <Link to="/suporte">Suporte</Link>
            </div>

            <div className={styles.linksColumn}>
              <h3>Links úteis</h3>

              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
              <a href="#">Linktree</a>
            </div>

            <div className={styles.linksColumn}>
              <h3>Recursos</h3>

              <Link to="/privacidade">Privacidade</Link>
              <Link to="/ajuda">Ajuda</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
