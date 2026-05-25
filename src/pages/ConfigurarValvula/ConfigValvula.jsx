import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoWifiOutline } from "react-icons/io5";
import { TbDeviceAnalytics } from "react-icons/tb";
import { PiSealCheckBold } from "react-icons/pi";

import qrCode from "@assets/configuracoes/qr-code.png";

import styles from "./ConfigValvula.module.css";

function ConectarDispositivo() {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState("");

  const formatSerialNumber = (value) => {
    return value
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 16)
      .replace(/(.{4})/g, "$1-")
      .replace(/-$/, "");
  };

  const handleSerialNumberChange = (event) => {
    setSerialNumber(formatSerialNumber(event.target.value));
  };

  const handleConnectDevice = (event) => {
    event.preventDefault();
    navigate("/configuracao-calibracao");
  };

  return (
    <DashboardLayout pageTitle="Configuração da Válvula">
      <div className={styles.conectarDispositivoCard}>
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
          <img src={qrCode} alt="QR Code do sensor" />

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
              placeholder="AAAA-AAAA-AAAA-AAAA"
              value={serialNumber}
              onChange={handleSerialNumberChange}
              maxLength={19}
            />
          </div>

          <div className={styles.connectInputGroup}>
            <label>Zona de instalação</label>

            <input type="text" placeholder="Medidor da cozinha" />
          </div>

          <button type="submit" className={styles.connectButton}>
            Conectar dispositivo
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default ConectarDispositivo;
