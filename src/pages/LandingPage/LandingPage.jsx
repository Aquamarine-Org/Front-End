import { Link } from "react-router-dom";
import CardInformativoFuncionalidades from "../../features/CardInformativoFuncionalidaes/CardInformativoFuncionalidades";
import imagem1 from "@assets/landing_page/card_informativo/imagem1.png";
import imagem2 from "@assets/landing_page/card_informativo/imagem2.png";
import imagem3 from "@assets/landing_page/card_informativo/imagem3.png";
import styles from "./LandingPage.module.css";
import Header from "../../layouts/Header/Header";
import { FaArrowRight } from "react-icons/fa";
import InteractiveGallery from "../../features/InteractiveGallery/InteractiveGallery";
import Testimonials from "../../features/Testimonials/Testimonials.jsx";

function LandingPage() {
  return (
    <div>
      <Header></Header>
      <section className={styles.mainSection}>
        <h1>
          Um vazamento não avisa. <br></br> A <span>Aquamarine</span> sim.
        </h1>
        <div className={styles.linkButtons}>
          <Link to="/cadastro">
            <button className={styles.gradientButton}>Começar</button>
          </Link>
          <Link to="/planos">
            <button className={styles.glassButton}>Ver planos</button>
          </Link>
        </div>
      </section>
      <section className={styles.containerSub}>
        <h2 className={styles.subtitle}>
          Tenha segurança no encanamento da sua casa
        </h2>
        <p className={styles.cardinformativoDescription}>
          Um sistema que analisa o encanamento da sua casa em tempo real e te
          notifica se houver qualquer tipo de alerta.
        </p>

        <Link to="/planos">
          Ver planos <FaArrowRight />
        </Link>

        <div className={styles.containerCardInformativo}>
          <CardInformativoFuncionalidades
            imagem={imagem1}
            alt="Produto da aquamarine"
            descricao="Análise de encanamentos em tempo real"
          />
          <CardInformativoFuncionalidades
            imagem={imagem2}
            alt="Produto da aquamarine"
            descricao="Sensor de vazamentos com precisão"
          />
          <CardInformativoFuncionalidades
            imagem={imagem3}
            alt="Produto da aquamarine"
            descricao="Fechamento de válvula remoto"
          />
        </div>
      </section>
      <section className={styles.containerSub}>
        <h2 className={styles.subtitle}>
          Com Aquamarine, o vazamento não vira prejuízo
        </h2>
        <p className={styles.cardInformativoDescription}>
          Um sistema inteligente que monitora o encanamento da sua casa em tempo
          real, detecta vazamentos e age automaticamente para evitar prejuízos.
        </p>

        <InteractiveGallery />
      </section>
      <section>
        <h2 className={styles.subtitle}>O que nossos usuários dizem </h2>
        <p className={styles.cardInformativoDescription}>
          Veja o que nossos clientes dizem sobre nós
        </p>

        <Testimonials></Testimonials>
      </section>
    </div>
  );
}

export default LandingPage;
