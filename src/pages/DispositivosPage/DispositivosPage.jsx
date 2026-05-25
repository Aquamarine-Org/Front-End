import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import DeviceValveStatusCard from "@src/features/DeviceValveStatusCard/DeviceValveStatusCard.jsx";
import DeviceControlCard from "@src/features/DeviceControlCard/DeviceControlCard.jsx";
import DeviceActionHistoryCard from "@src/features/DeviceActionHistoryCard/DeviceActionHistoryCard.jsx";
import styles from "./DispositivosPage.module.css";

const DEVICE_METRICS = [
  { id: "sensors-online", label: "Sensores online", value: 5 },
  { id: "sensors-offline", label: "Sensores offline", value: 0 },
  { id: "valves-active", label: "Valvulas em funcionamento", value: 2 },
];

const DEVICE_ACTIONS = [
  {
    id: "action-1",
    title: "Valvula desativada",
    description: "Fechamento automatico",
    timeLabel: "A 12 horas",
  },
  {
    id: "action-2",
    title: "Valvula reativada",
    description: "Ativacao efetuada pelo usuario",
    timeLabel: "A 1 dia",
  },
  {
    id: "action-3",
    title: "Valvula desativada",
    description: "Fechamento automatico",
    timeLabel: "A 2 dias",
  },
  {
    id: "action-4",
    title: "Valvula reativada",
    description: "Ativacao efetuada pelo usuario",
    timeLabel: "A 1 mes",
  },
];

function DispositivosPage() {
  return (
    <DashboardLayout pageTitle="Dispositivos" currentPage="dispositivos">
      <section className={styles.devicesPage}>
        <div className={styles.topGrid}>
          <DeviceValveStatusCard
            title="Valvula principal"
            isOpen
            statusLabel="ABERTA"
            description="A valvula esta operando normalmente. Em caso de vazamento, feche imediatamente."
            actionLabel="Fechar valvula"
          />

          <DeviceControlCard
            title="Controle de dispositivos"
            metrics={DEVICE_METRICS}
          />
        </div>

        <DeviceActionHistoryCard
          title="Historico de acionamentos"
          actions={DEVICE_ACTIONS}
        />
      </section>
    </DashboardLayout>
  );
}

export default DispositivosPage;
