import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import DeviceValveStatusCard from "@src/features/DeviceValveStatusCard/DeviceValveStatusCard.jsx";
import DeviceControlCard from "@src/features/DeviceControlCard/DeviceControlCard.jsx";
import DeviceActionHistoryCard from "@src/features/DeviceActionHistoryCard/DeviceActionHistoryCard.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DispositivosPage.module.css";

const DEVICE_METRICS = [
  { id: "sensors-online", label: "Sensores online", value: 5 },
  { id: "sensors-offline", label: "Sensores offline", value: 0 },
  { id: "valves-active", label: "Válvulas em funcionamento", value: 2 },
];

const DEVICE_ACTIONS = [
  {
    id: "action-1",
    title: "Válvula desativada",
    description: "Fechamento automático",
    timeLabel: "Há 12 horas",
  },
  {
    id: "action-2",
    title: "Válvula reativada",
    description: "Ativação efetuada pelo usuário",
    timeLabel: "Há 1 dia",
  },
  {
    id: "action-3",
    title: "Válvula desativada",
    description: "Fechamento automático",
    timeLabel: "Há 2 dias",
  },
  {
    id: "action-4",
    title: "Válvula reativada",
    description: "Ativação efetuada pelo usuário",
    timeLabel: "Há 1 mês",
  },
];

function DispositivosPage() {
  const navigate = useNavigate();
  const [valvulaAberta, setValvulaAberta] = useState(true);

  return (
    <DashboardLayout pageTitle="Dispositivos" currentPage="dispositivos">
      <section className={styles.devicesPage}>
        <div className={styles.topGrid}>
          <DeviceValveStatusCard
            title="Válvula principal"
            isOpen={valvulaAberta}
            statusLabel={valvulaAberta ? "ABERTA" : "FECHADA"}
            description={
              valvulaAberta
                ? "A válvula está operando normalmente. Em caso de vazamento, feche imediatamente."
                : "A válvula está fechada. Abra novamente quando a verificação estiver concluída."
            }
            actionLabel={valvulaAberta ? "Fechar válvula" : "Abrir válvula"}
            onAction={() => setValvulaAberta((estadoAtual) => !estadoAtual)}
          />

          <DeviceControlCard
            title="Controle de dispositivos"
            metrics={DEVICE_METRICS}
            onOpenSettings={() => navigate("/dispositivos/gerenciar")}
          />
        </div>

        <button
          type="button"
          className={styles.manageButton}
          onClick={() => navigate("/dispositivos/gerenciar")}
        >
          Gerenciar dispositivos
        </button>

        <DeviceActionHistoryCard
          title="Histórico de acionamentos"
          actions={DEVICE_ACTIONS}
        />
      </section>
    </DashboardLayout>
  );
}

export default DispositivosPage;
