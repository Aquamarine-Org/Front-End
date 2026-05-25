import { useState } from "react";
import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import Modal from "@src/components/Modal/Modal.jsx";
import { useNavigate } from "react-router-dom";
import {
  IoCheckmarkCircleOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  IoLockClosedOutline,
  IoWifiOutline,
} from "react-icons/io5";
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
  const navigate = useNavigate();
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedNetwork, setConnectedNetwork] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectNetwork = (network) => {
    setSelectedNetwork(network);
    setPassword("");
    setShowPassword(false);
    setConnectedNetwork("");
    setIsConnecting(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsConnecting(false);
  };

  const handleConnect = (event) => {
    event.preventDefault();

    if (!selectedNetwork || !password.trim()) {
      return;
    }

    setIsConnecting(true);

    setTimeout(() => {
      setConnectedNetwork(selectedNetwork);
      setIsConnecting(false);
    }, 900);
  };

  return (
    <DashboardLayout
      currentPage="configurar-dispositivos"
      pageTitle="Configuração do Wi-Fi"
    >
      <div className={styles.configWifiWrapper}>
        <section className={styles.configWifiCard}>
          <div className={styles.progressContainer}>
            <button
              type="button"
              className={`${styles.progressItem} ${styles.completed} ${styles.progressButton}`}
              onClick={() => navigate("/configurar-dispositivo")}
            >
              <div className={styles.progressCircle}>
                <TbDeviceAnalytics size={22} />
              </div>
              <p>Dispositivo</p>
            </button>

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
                  className={`${styles.networkButton} ${
                    connectedNetwork === network ? styles.connectedNetwork : ""
                  }`}
                  onClick={() => handleSelectNetwork(network)}
                >
                  <IoWifiOutline size={18} />
                  <span>{network}</span>
                  {connectedNetwork === network && (
                    <IoCheckmarkCircleOutline
                      size={20}
                      className={styles.networkCheck}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.continueButton}
              onClick={() => navigate("/configurar-calibracao")}
              disabled={!connectedNetwork}
            >
              Continuar
            </button>
          </div>
        </section>

        <Modal
          isOpen={selectedNetwork && isModalOpen}
          onClose={handleCloseModal}
          icon={IoWifiOutline}
          title="Conectar ao Wi-Fi"
          subtitle={selectedNetwork}
          aria_labelledby="wifi-modal-title"
          onSubmit={handleConnect}
        >
          <label className={styles.passwordGroup}>
            Senha da rede
            <div className={styles.passwordInput}>
              <IoLockClosedOutline size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite a senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={isConnecting}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
          </label>

          <button
            type="submit"
            className={styles.connectWifiButton}
            disabled={!password.trim() || isConnecting}
          >
            {isConnecting ? "Conectando..." : "Conectar"}
          </button>

          {connectedNetwork === selectedNetwork && (
            <p className={styles.connectedMessage}>
              <IoCheckmarkCircleOutline size={20} />
              Conectado com sucesso
            </p>
          )}

          {connectedNetwork === selectedNetwork && (
            <button
              type="button"
              className={styles.modalContinueButton}
              onClick={() => navigate("/configurar-calibracao")}
            >
              Continuar
            </button>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default ConfigWifi;
