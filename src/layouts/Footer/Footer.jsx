import { FaInstagram, FaLinkedin, FaLink } from "react-icons/fa";
import logo from "@assets/logo.png";

import styles from "./Footer.module.css";

import Modal from "@src/components/ModalGlass/ModalGlass.jsx";
import { useState } from "react";

function Footer() {
  const [isModalOpenAjuda, setIsModalOpenAjuda] = useState(false);

  const [isModalOpenPrivacidade, setIsModalOpenPrivacidade] = useState(false);

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
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/company/somos-aquamarine"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://linktr.ee/somos_aquamarine"
                target="_blank"
                rel="noreferrer"
              >
                <FaLink />
              </a>
            </div>
          </div>

          <div className={styles.linksContainer}>
            <div className={styles.linksColumn}>
              <h3>Sobre nós</h3>

              <a href="#inicio">Aquamarine</a>
              <a href="#parceiros">Parceiros</a>
              <a href="#planos">Planos</a>
              <a href="#suporte">Suporte</a>
            </div>

            <div className={styles.linksColumn}>
              <h3>Links úteis</h3>

              <a
                href="https://www.linkedin.com/company/somos-aquamarine"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/somosaquamarine/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://linktr.ee/somos_aquamarine"
                target="_blank"
                rel="noreferrer"
              >
                Linktree
              </a>
            </div>

            <div className={styles.linksColumn}>
              <h3>Recursos</h3>

              <button
                type="button"
                onClick={() => setIsModalOpenPrivacidade(true)}
              >
                Privacidade
              </button>
              <button type="button" onClick={() => setIsModalOpenAjuda(true)}>
                Ajuda
              </button>

              <Modal
                isOpen={isModalOpenPrivacidade}
                onClose={() => setIsModalOpenPrivacidade(false)}
                width="700px"
                height="500px"
              >
                <div className={styles.modalContent}>
                  <div className={styles.modalHeader}>
                    <h2>Política de Privacidade</h2>

                    <p>
                      A Aquamarine valoriza a segurança e a transparência no
                      tratamento dos seus dados.
                    </p>
                  </div>

                  <div className={styles.modalBody}>
                    <div className={styles.modalSection}>
                      <h3>Coleta de informações</h3>

                      <p>
                        Coletamos apenas os dados necessários para o
                        funcionamento da plataforma, como nome, e-mail e
                        informações relacionadas ao uso do sistema.
                      </p>
                    </div>

                    <div className={styles.modalSection}>
                      <h3>Proteção dos dados</h3>

                      <p>
                        Utilizamos tecnologias modernas de proteção e
                        criptografia para garantir a integridade e
                        confidencialidade das informações.
                      </p>
                    </div>

                    <div className={styles.modalSection}>
                      <h3>Compartilhamento</h3>

                      <p>
                        Seus dados não são vendidos ou compartilhados com
                        terceiros sem autorização, exceto quando exigido por
                        obrigação legal.
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
                width="700px"
                height="500px"
              >
                <div className={styles.modalContent}>
                  <div className={styles.modalHeader}>
                    <h2>Central de Ajuda</h2>

                    <p>
                      Precisa de suporte? Veja algumas informações importantes
                      sobre a plataforma.
                    </p>
                  </div>

                  <div className={styles.modalBody}>
                    <div className={styles.modalSection}>
                      <h3>Monitoramento inteligente</h3>

                      <p>
                        O sistema acompanha em tempo real o fluxo de água da
                        residência, identificando comportamentos anormais
                        automaticamente.
                      </p>
                    </div>

                    <div className={styles.modalSection}>
                      <h3>Alertas de vazamento</h3>

                      <p>
                        Caso um possível vazamento seja detectado, a plataforma
                        envia alertas instantâneos para reduzir riscos e
                        prejuízos.
                      </p>
                    </div>

                    <div className={styles.modalSection}>
                      <h3>Suporte da equipe</h3>

                      <p>
                        Se precisar de ajuda técnica, entre em contato através
                        da seção de suporte disponível na página principal.
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
