import { useEffect, useState } from "react";
import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import { useNavigate } from "react-router-dom";
import { IoAlertCircleOutline, IoWifiOutline } from "react-icons/io5";
import { TbDeviceAnalytics } from "react-icons/tb";
import { PiSealCheckBold } from "react-icons/pi";

import styles from "./calibracao.module.css";

function CalibracaoConfig() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const isComplete = progress === 100 && !isCalibrating;

  useEffect(() => {
    if (!isCalibrating || progress >= 100) {
      return undefined;
    }

    const timer = setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress = currentProgress + 2;

        if (nextProgress >= 100) {
          setIsCalibrating(false);
          return 100;
        }

        return nextProgress;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [isCalibrating, progress]);

  const handleStartCalibration = () => {
    setProgress(0);
    setIsCalibrating(true);
  };

  return (
    <DashboardLayout
      currentPage="configurar-dispositivos"
      pageTitle="Configuração do Dispositivo"
    >
      <div className={styles.calibracaoWrapper}>
        <section className={styles.calibracaoCard}>
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

            <button
              type="button"
              className={`${styles.progressItem} ${styles.completed} ${styles.progressButton}`}
              onClick={() => navigate("/configurar-wifi")}
            >
              <div className={styles.progressCircle}>
                <IoWifiOutline size={22} />
              </div>
              <p>Wi-Fi</p>
            </button>

            <div className={styles.progressLine}></div>

            <div className={`${styles.progressItem} ${styles.active}`}>
              <div className={styles.progressCircle}>
                <PiSealCheckBold size={22} />
              </div>
              <p>Calibração</p>
            </div>
          </div>

          <div className={styles.calibracaoContent}>
            <h2>Calibrar dispositivo</h2>

            <div className={styles.alertBox}>
              <IoAlertCircleOutline size={26} />
              <p>
                Verifique se o dispositivo está instalado corretamente e se o
                fluxo de água está funcionando da maneira correta antes de
                iniciar a calibração.
              </p>
            </div>

            <button
              type="button"
              className={styles.calibrationButton}
              onClick={handleStartCalibration}
              disabled={isCalibrating}
            >
              {isCalibrating ? "Calibrando..." : "Iniciar calibração"}
            </button>

            <div className={styles.progressArea}>
              <div className={styles.calibrationTrack}>
                <div
                  className={styles.calibrationFill}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>{progress}%</p>
              {isComplete && (
                <strong className={styles.successMessage}>
                  Calibração concluída com sucesso
                </strong>
              )}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default CalibracaoConfig;
