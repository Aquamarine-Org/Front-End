import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoWifiOutline, IoCameraOutline } from "react-icons/io5";
import { TbDeviceAnalytics } from "react-icons/tb";
import { PiSealCheckBold } from "react-icons/pi";

import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout";
import Modal from "@src/components/Modal/Modal.jsx";

import styles from "./ConfigDispositivo.module.css";

// Constantes de validação
const SERIAL_NUMBER_MAX_LENGTH = 16;
const SERIAL_NUMBER_GROUP_SIZE = 4;
const SERIAL_NUMBER_PLACEHOLDER = "AAAA-AAAA-AAAA-AAAA";
const FORMATTED_LENGTH_WITH_DASHES = 19;

function ConfigDispositivo() {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState("");
  const [cameraModalOpen, setCameraModalOpen] = useState(false);

  const formatSerialNumber = (value) => {
    return value
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, SERIAL_NUMBER_MAX_LENGTH)
      .replace(new RegExp(`(.{${SERIAL_NUMBER_GROUP_SIZE}})`, "g"), "$1-")
      .replace(/-$/, "");
  };

  const handleSerialNumberChange = (event) => {
    setSerialNumber(formatSerialNumber(event.target.value));
  };

  const handleConnectDevice = (event) => {
    event.preventDefault();
    navigate("/configurar-wifi");
  };

  return (
    <DashboardLayout
      currentPage="configurar-dispositivos"
      pageTitle="Configuração do Dispositivo"
    >
      <div className={styles.conectarDispositivoWrapper}>
        <section className={styles.conectarDispositivoCard}>
          <div className={styles.progressContainer}>
            <div className={`${styles.progressItem} ${styles.active}`}>
              <div className={styles.progressCircle}>
                <TbDeviceAnalytics size={24} />
              </div>
              <p>Dispositivo</p>
            </div>

            <div className={styles.progressLine}></div>

            <div className={styles.progressItem}>
              <div className={styles.progressCircle}>
                <IoWifiOutline size={24} />
              </div>
              <p>Wi-Fi</p>
            </div>

            <div className={styles.progressLine}></div>

            <div className={styles.progressItem}>
              <div className={styles.progressCircle}>
                <PiSealCheckBold size={24} />
              </div>
              <p>Calibração</p>
            </div>
          </div>

          <div className={styles.qrSection}>
            <div className={styles.qrScanner}>
              <div className={styles.qrOverlay}>
                <div className={`${styles.corner} ${styles.topLeft}`}></div>
                <div className={`${styles.corner} ${styles.topRight}`}></div>
                <div className={`${styles.corner} ${styles.bottomLeft}`}></div>
                <div className={`${styles.corner} ${styles.bottomRight}`}></div>
              </div>

              <div className={styles.scanLine}></div>

              <button
                type="button"
                className={styles.cameraButton}
                onClick={() => setCameraModalOpen(true)}
              >
                <IoCameraOutline size={16} />
                Abrir câmera
              </button>
            </div>

            <p>Escaneie o QR Code do sensor principal</p>
          </div>

          <div className={styles.optionsDivider}>
            <span></span>
            <p>Outras opções de conexão</p>
            <span></span>
          </div>

          <form className={styles.connectForm} onSubmit={handleConnectDevice}>
            <div className={styles.connectInputGroup}>
              <label>Número de série do dispositivo</label>

              <input
                type="text"
                placeholder={SERIAL_NUMBER_PLACEHOLDER}
                value={serialNumber}
                onChange={handleSerialNumberChange}
                maxLength={FORMATTED_LENGTH_WITH_DASHES}
                required
              />
            </div>

            <div className={styles.connectInputGroup}>
              <label>Zona de instalação</label>

              <input type="text" placeholder="Medidor da cozinha" required />
            </div>

            <button type="submit" className={styles.connectButton}>
              Conectar dispositivo
            </button>
          </form>
        </section>

        <Modal
          isOpen={cameraModalOpen}
          onClose={() => setCameraModalOpen(false)}
          icon={IoCameraOutline}
          title="Leitor de QR Code"
        >
          <div className={styles.cameraModalContent}>
            <p>
              A leitura por câmera fica pronta para integração com o dispositivo.
              Por enquanto, use o número de série para continuar a configuração.
            </p>

            <button
              type="button"
              className={styles.cameraModalButton}
              onClick={() => setCameraModalOpen(false)}
            >
              Inserir número manualmente
            </button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default ConfigDispositivo;
