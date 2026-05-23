import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import { IoWifiOutline, IoCameraOutline } from "react-icons/io5";
import { TbDeviceAnalytics } from "react-icons/tb";
import { PiSealCheckBold } from "react-icons/pi";

import styles from "./ConfigValvula.module.css";

function ConectarDispositivo() {
  return (
    <DashboardLayout
      currentPage="configurar-valvulas"
      pageTitle="Configuração da Válvula"
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

              <button type="button" className={styles.cameraButton}>
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

          <form className={styles.connectForm}>
            <div className={styles.connectInputGroup}>
              <label>Número de série do dispositivo</label>

              <input type="text" placeholder="AAAA-AAAA-AAAA-AAAA" />
            </div>

            <div className={styles.connectInputGroup}>
              <label>Zona de instalação</label>

              <input type="text" placeholder="Medidor da cozinha" />
            </div>

            <button type="submit" className={styles.connectButton}>
              Conectar dispositivo
            </button>
          </form>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default ConectarDispositivo;
