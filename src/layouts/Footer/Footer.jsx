import { useEffect, useState } from "react";
import { FaChevronDown, FaInstagram, FaLinkedin, FaLink } from "react-icons/fa";
import logo from "@assets/logo.png";

import styles from "./Footer.module.css";

import Modal from "@src/components/ModalGlass/ModalGlass.jsx";

const FOOTER_SECTIONS = [
  {
    id: "sobre",
    title: "Sobre nós",
    links: [
      { href: "#inicio", label: "Aquamarine" },
      { href: "#parceiros", label: "Parceiros" },
      { href: "#planos", label: "Planos" },
      { href: "#suporte", label: "Suporte" },
    ],
  },
  {
    id: "links",
    title: "Links úteis",
    links: [
      {
        href: "https://www.linkedin.com/company/somos-aquamarine",
        label: "LinkedIn",
        external: true,
      },
      {
        href: "https://www.instagram.com/somosaquamarine/",
        label: "Instagram",
        external: true,
      },
      {
        href: "https://linktr.ee/somos_aquamarine",
        label: "Linktree",
        external: true,
      },
    ],
  },
  {
    id: "recursos",
    title: "Recursos",
    actions: [
      { id: "privacidade", label: "Privacidade" },
      { id: "ajuda", label: "Ajuda" },
    ],
  },
];

function Footer() {
  const [isModalOpenAjuda, setIsModalOpenAjuda] = useState(false);
  const [isModalOpenPrivacidade, setIsModalOpenPrivacidade] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleViewportChange = (event) => {
      if (event.matches) {
        setExpandedSections({});
      }
    };

    mediaQuery.addEventListener("change", handleViewportChange);

    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  };

  const handleActionClick = (actionId) => {
    if (actionId === "privacidade") {
      setIsModalOpenPrivacidade(true);
      return;
    }

    if (actionId === "ajuda") {
      setIsModalOpenAjuda(true);
    }
  };

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
              <a
                href="https://www.instagram.com/somosaquamarine/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Aquamarine"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/company/somos-aquamarine"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn da Aquamarine"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://linktr.ee/somos_aquamarine"
                target="_blank"
                rel="noreferrer"
                aria-label="Linktree da Aquamarine"
              >
                <FaLink />
              </a>
            </div>
          </div>

          <div className={styles.linksContainer}>
            {FOOTER_SECTIONS.map((section) => {
              const isExpanded = Boolean(expandedSections[section.id]);

              return (
                <div key={section.id} className={styles.linksColumn}>
                  <button
                    type="button"
                    className={styles.sectionToggle}
                    aria-expanded={isExpanded}
                    aria-controls={`footer-section-${section.id}`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <h3>{section.title}</h3>

                    <FaChevronDown
                      className={`${styles.sectionChevron} ${
                        isExpanded ? styles.sectionChevronOpen : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`footer-section-${section.id}`}
                    className={`${styles.sectionPanel} ${
                      isExpanded ? styles.sectionPanelOpen : ""
                    }`}
                  >
                    {section.links?.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    ))}

                    {section.actions?.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleActionClick(action.id)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpenPrivacidade}
        onClose={() => setIsModalOpenPrivacidade(false)}
        width="min(43.75rem, 92vw)"
        height="min(31.25rem, 85vh)"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Política de Privacidade</h2>

            <p>
              A Aquamarine valoriza a segurança e a transparência no tratamento
              dos seus dados.
            </p>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.modalSection}>
              <h3>Coleta de informações</h3>

              <p>
                Coletamos apenas os dados necessários para o funcionamento da
                plataforma, como nome, e-mail e informações relacionadas ao uso
                do sistema.
              </p>
            </div>

            <div className={styles.modalSection}>
              <h3>Proteção dos dados</h3>

              <p>
                Utilizamos tecnologias modernas de proteção e criptografia para
                garantir a integridade e confidencialidade das informações.
              </p>
            </div>

            <div className={styles.modalSection}>
              <h3>Compartilhamento</h3>

              <p>
                Seus dados não são vendidos ou compartilhados com terceiros sem
                autorização, exceto quando exigido por obrigação legal.
              </p>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.modalButton}
              onClick={() => setIsModalOpenPrivacidade(false)}
            >
              Entendi
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpenAjuda}
        onClose={() => setIsModalOpenAjuda(false)}
        width="min(43.75rem, 92vw)"
        height="min(31.25rem, 85vh)"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Central de Ajuda</h2>

            <p>
              Precisa de suporte? Veja algumas informações importantes sobre a
              plataforma.
            </p>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.modalSection}>
              <h3>Monitoramento inteligente</h3>

              <p>
                O sistema acompanha em tempo real o fluxo de água da residência,
                identificando comportamentos anormais automaticamente.
              </p>
            </div>

            <div className={styles.modalSection}>
              <h3>Alertas de vazamento</h3>

              <p>
                Caso um possível vazamento seja detectado, a plataforma envia
                alertas instantâneos para reduzir riscos e prejuízos.
              </p>
            </div>

            <div className={styles.modalSection}>
              <h3>Suporte da equipe</h3>

              <p>
                Se precisar de ajuda técnica, entre em contato através da seção
                de suporte disponível na página principal.
              </p>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.modalButton}
              onClick={() => setIsModalOpenAjuda(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>
    </footer>
  );
}

export default Footer;
