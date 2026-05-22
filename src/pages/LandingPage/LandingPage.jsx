import { Link } from "react-router-dom";
import { FaArrowRight, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import Header from "../../layouts/Header/Header";
import Footer from "@src/layouts/Footer/Footer.jsx";
import ActionButton from "../../components/ActionButton/ActionButton";

import CardInformativoFuncionalidades from "../../features/CardInformativoFuncionalidaes/CardInformativoFuncionalidades";
import InteractiveGallery from "../../features/InteractiveGallery/InteractiveGallery";
import Testimonials from "../../features/Testimonials/Testimonials.jsx";
import PlanosCard from "../../features/PlanosCard/PlanosCard.jsx";

import imagem1 from "@assets/landing_page/card_informativo/imagem1.png";
import imagem2 from "@assets/landing_page/card_informativo/imagem2.png";
import imagem3 from "@assets/landing_page/card_informativo/imagem3.png";

import parceiro1 from "@assets/landing_page/parceiros/parceiro1.png";
import parceiro2 from "@assets/landing_page/parceiros/parceiro2.png";

import styles from "./LandingPage.module.css";

const planos = [
  {
    nome: "Aquamarine Common",
    descricao: "Ferramentas essenciais para começos conscientes.",
    preco: "Teste Grátis",
    destaque: false,
    botao: "Escolher Common",
    funcionalidades: ["Análise do fluxo de pressão", "Alerta de vazamento"],
  },
  {
    nome: "Aquamarine Plus",
    descricao: "Uma imersão profunda no bem-estar avançado.",
    preco: "R$80",
    periodo: "/mensal",
    destaque: true,
    botao: "Escolher Plus",
    funcionalidades: [
      "Análise do fluxo de pressão",
      "Alerta de vazamento",
      "Fechamento de válvulas",
    ],
  },
  {
    nome: "Aquamarine Premium",
    descricao: "O oceano definitivo de possibilidades.",
    preco: "R$100",
    periodo: "/mensal",
    destaque: false,
    botao: "Escolher Premium",
    funcionalidades: [
      "Análise do fluxo de pressão",
      "Alerta de vazamento",
      "Fechamento de válvulas",
      "IA integrada",
    ],
  },
];

function LandingPage() {
  return (
    <div>
      <Header />

      <section id="inicio" className={styles.mainSection}>
        <h1>
          Um vazamento não avisa.
          <br />A <span>Aquamarine</span> sim.
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

      <section id="sobre" className={styles.containerSub}>
        <h2 className={styles.subtitle}>
          Tenha segurança no encanamento da sua casa
        </h2>

        <p className={styles.cardInformativoDescription}>
          Um sistema que analisa o encanamento da sua casa em tempo real e te
          notifica se houver qualquer tipo de alerta.
        </p>

        <Link to="/planos">
          Ver planos <FaArrowRight />
        </Link>

        <div className={styles.containerCardInformativo}>
          <CardInformativoFuncionalidades
            imagem={imagem1}
            alt="Produto da Aquamarine"
            descricao="Análise de encanamentos em tempo real"
          />

          <CardInformativoFuncionalidades
            imagem={imagem2}
            alt="Produto da Aquamarine"
            descricao="Sensor de vazamentos com precisão"
          />

          <CardInformativoFuncionalidades
            imagem={imagem3}
            alt="Produto da Aquamarine"
            descricao="Fechamento de válvula remoto"
          />
        </div>
      </section>

      <section id="produto" className={styles.containerSub}>
        <h2 className={styles.subtitle}>
          Com Aquamarine, o vazamento não vira prejuízo
        </h2>

        <p className={styles.cardInformativoDescription}>
          Um sistema inteligente que monitora o encanamento da sua casa em tempo
          real, detecta vazamentos e age automaticamente para evitar prejuízos.
        </p>

        <InteractiveGallery />
      </section>

      <section id="avaliacoes" className={styles.containerSub}>
        <Testimonials />
      </section>

      <section className={[styles.containerSub, styles.plansSection].join(" ")}>
        <div className={styles.plansHeader} id="planos">
          <h2 className={styles.subtitle}>Nossos planos</h2>
        </div>

        <div className={styles.plansGrid}>
          {planos.map((plano) => (
            <PlanosCard key={plano.nome} plano={plano} />
          ))}
        </div>
      </section>

      <section
        id="parceiros"
        className={[styles.containerSub, styles.partnersSection].join(" ")}
      >
        <h2 className={styles.subtitle}>Conheça nossos parceiros</h2>

        <div className={styles.partnersGrid}>
          <div className={styles.partnerCard}>
            <img src={parceiro1} alt="Logo do Instituto PROA" />

            <p>Instituto PROA</p>
          </div>

          <div className={styles.partnerCard}>
            <img src={parceiro2} alt="Logo do Senac Lapa Tito" />

            <p>Senac Lapa Tito</p>
          </div>
        </div>
      </section>

      <section className={styles.contactSection} id="suporte">
        <div className={styles.contactContainer}>
          <h2 className={styles.contactTitle}>Entre em contato com a gente</h2>

          <p className={styles.contactDescription}>
            Tem alguma dúvida, sugestão ou quer saber mais sobre o Aquamarine?
            Fale com a nossa equipe.
          </p>

          <form className={styles.contactForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="nome">Nome</label>

              <input id="nome" type="text" placeholder="Digite o seu nome" />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>

              <input
                id="email"
                type="email"
                placeholder="Digite o seu e-mail"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="assunto">Assunto</label>

              <input
                id="assunto"
                type="text"
                placeholder="Como podemos ajudar?"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mensagem">Mensagem</label>

              <textarea
                id="mensagem"
                placeholder="Descreva a sua mensagem em detalhes"
                rows="6"
              />
            </div>

            <div className={styles.contactButtonWrapper}>
              <ActionButton backgroundColor="#097cd8" type="submit">
                Enviar mensagem
              </ActionButton>
            </div>
          </form>

          <div className={styles.socialLinks}>
            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

            <a href="#">
              <MdEmail />
            </a>
          </div>
        </div>
      </section>
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
