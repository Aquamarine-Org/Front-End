import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout";
import { useMemo, useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiTrendingUp } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { LuGauge } from "react-icons/lu";
import AlertsSummaryCard from "@src/features/AlertsSummaryCard/AlertsSummaryCard.jsx";
import AlertsFilterBar from "@src/features/AlertsFilterBar/AlertsFilterBar.jsx";
import AlertsFeedItem from "@src/features/AlertsFeedItem/AlertsFeedItem.jsx";
import styles from "./AlertasPage.module.css";

const SUMMARY_CARDS = [
  {
    id: "nao-resolvidos",
    label: "NAO RESOLVIDOS",
    value: 4,
    description: "Nao resolvidos",
    tone: "neutral",
    icon: IoNotifications,
  },
  {
    id: "criticos",
    label: "CRITICOS",
    value: 1,
    description: "Criticos",
    tone: "danger",
    icon: FiAlertTriangle,
  },
  {
    id: "resolvidos-hoje",
    label: "RESOLVIDOS HOJE",
    value: 2,
    description: "Resolvidos hoje",
    tone: "success",
    icon: FiCheckCircle,
  },
];

const ALERT_ITEMS = [
  {
    id: "consumo-elevado-principal",
    title: "Consumo Elevado",
    timeLabel: "Ha 2 semanas",
    tone: "warning",
    severityLabel: "Medio",
    icon: FiTrendingUp,
    description:
      "Fluxo anormal de 15 MPa detectado as 14:32. Padrao incompativel com uso residencial normal.",
    aiSuggestion:
      "Feche imediatamente o dispositivo principal e verifique os encanamentos visiveis.",
    actionLabel: "Fechar dispositivo",
  },
  {
    id: "pressao-anomala",
    title: "Pressao Anomala",
    timeLabel: "Ha 2 dias",
    tone: "normal",
    severityLabel: "Medio",
    icon: LuGauge,
    description:
      "Variacao de pressao fora da faixa ideal durante o horario de menor uso.",
    aiSuggestion:
      "Verifique se houve manutencao recente e confirme se os registros estao totalmente abertos.",
  },
  {
    id: "vazamento-detectado",
    title: "Vazamento Detectado",
    timeLabel: "Ha 1 semana",
    tone: "danger",
    severityLabel: "Medio",
    icon: FiAlertTriangle,
    description:
      "Consumo continuo registrado por longo periodo, com baixa oscilacao de fluxo.",
    aiSuggestion:
      "Inspecione banheiros, caixa d'agua e conexoes externas para identificar perdas.",
  },
  {
    id: "consumo-elevado-secundario",
    title: "Consumo Elevado",
    timeLabel: "Ha 2 semanas",
    tone: "warning",
    severityLabel: "Medio",
    icon: FiTrendingUp,
    description:
      "Consumo acima da media historica no periodo da tarde para este ponto de uso.",
    aiSuggestion:
      "Revise os horarios de uso e compare com dias anteriores para encontrar o pico.",
  },
];

function AlertasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAlertId, setExpandedAlertId] = useState(
    "consumo-elevado-principal",
  );

  const filteredAlerts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return ALERT_ITEMS;
    }

    return ALERT_ITEMS.filter((alert) =>
      alert.title.toLowerCase().includes(normalizedTerm),
    );
  }, [searchTerm]);

  const handleToggleAlert = (alertId) => {
    setExpandedAlertId((currentId) => (currentId === alertId ? null : alertId));
  };

  return (
    <DashboardLayout pageTitle="Central de Alertas" currentPage="alertas">
      <section className={styles.alertsPage}>
        <div className={styles.summaryGrid}>
          {SUMMARY_CARDS.map((card) => (
            <AlertsSummaryCard
              key={card.id}
              label={card.label}
              value={card.value}
              description={card.description}
              tone={card.tone}
              icon={card.icon}
            />
          ))}
        </div>

        <article className={styles.alertsPanel}>
          <AlertsFilterBar
            searchValue={searchTerm}
            onSearchChange={(event) => setSearchTerm(event.target.value)}
          />

          <div className={styles.alertsList}>
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <AlertsFeedItem
                  key={alert.id}
                  title={alert.title}
                  timeLabel={alert.timeLabel}
                  tone={alert.tone}
                  severityLabel={alert.severityLabel}
                  icon={alert.icon}
                  description={alert.description}
                  aiSuggestion={alert.aiSuggestion}
                  actionLabel={alert.actionLabel}
                  expanded={expandedAlertId === alert.id}
                  onToggle={() => handleToggleAlert(alert.id)}
                />
              ))
            ) : (
              <p className={styles.emptyState}>
                Nenhum alerta encontrado para essa busca.
              </p>
            )}
          </div>
        </article>
      </section>
    </DashboardLayout>
  );
}

export default AlertasPage;
