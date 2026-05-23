import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import { IoWifiOutline } from "react-icons/io5";
import { TbDeviceAnalytics } from "react-icons/tb";
import { PiSealCheckBold } from "react-icons/pi";

import styles from "./ConfigWifi.module.css";

const wifiNetworks = [
  "Wi-Fi da Graze",
  "Wi-Fi do Guilherme",
  "Wi-Fi da Larissa",
  "Wi-Fi da Luana",
  "Wi-Fi do Lucas",
  "Wi-Fi do Pedro",
  "Wi-Fi da Recepção",
  "Wi-Fi da Sala Técnica",
  "Wi-Fi do Laboratório",
  "Wi-Fi Aquamarine",
  "Wi-Fi Visitantes",
  "Wi-Fi Sensor Principal",
];

function ConfigWifi() {
  return (
    <DashboardLayout
      currentPage="configurar-valvulas"
      pageTitle="Configuração do Wi-Fi"
    >
      <div className={styles.configWifiWrapper}>
        <section className={styles.configWifiCard}>
          <div className={styles.progressContainer}>
            <div className={`${styles.progressItem} ${styles.completed}`}>
              <div className={styles.progressCircle}>
                <TbDeviceAnalytics size={22} />
              </div>
              <p>Dispositivo</p>
            </div>

            <div className={styles.progressLine}></div>

            <div className={`${styles.progressItem} ${styles.active}`}>
              <div className={styles.progressCircle}>
                <IoWifiOutline size={22} />
              </div>
              <p>Wi-Fi</p>
            </div>

            <div className={styles.progressLine}></div>

            <div className={styles.progressItem}>
              <div className={styles.progressCircle}>
                <PiSealCheckBold size={22} />
              </div>
              <p>Calibração</p>
            </div>
          </div>

          <div className={styles.wifiContent}>
            <h2>Configurar Wi-Fi</h2>

            <div className={styles.networkList}>
              {wifiNetworks.map((network) => (
                <button
                  key={network}
                  type="button"
                  className={styles.networkButton}
                >
                  <IoWifiOutline size={18} />
                  <span>{network}</span>
                </button>
              ))}
            </div>

            <button type="button" className={styles.continueButton}>
              Continuar
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default ConfigWifi;
