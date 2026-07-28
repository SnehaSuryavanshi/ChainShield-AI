import "./ModelMetricsGrid.css";
import AccuracyCard from "./AccuracyCard";

interface ModelMetricsGridProps {
  shipments: any[];
}

const ModelMetricsGrid = ({
  shipments,
}: ModelMetricsGridProps) => {
  const total = shipments.length;

  const avgConfidence =
    total > 0
      ? (
          shipments.reduce(
            (sum, shipment) => sum + shipment["Confidence"],
            0
          ) / total
        ).toFixed(1)
      : "0";

  const highRisk = shipments.filter(
    (shipment) => shipment["AI Risk"] === "High"
  ).length;

  const delayed = shipments.filter(
    (shipment) => shipment["Prediction"] === 1
  ).length;

  const onTime = total - delayed;

  return (
    <div className="metrics-grid">
      <AccuracyCard
        icon="🎯"
        title="Average Confidence"
        value={`${avgConfidence}%`}
        subtitle="Average AI confidence"
        variant="blue"
      />

      <AccuracyCard
        icon="⚠️"
        title="High Risk"
        value={String(highRisk)}
        subtitle="Flagged shipments"
        variant="green"
      />

      <AccuracyCard
        icon="🚚"
        title="Delayed"
        value={String(delayed)}
        subtitle="Predicted delays"
        variant="orange"
      />

      <AccuracyCard
        icon="✅"
        title="On-Time"
        value={String(onTime)}
        subtitle="Predicted on-time deliveries"
        variant="purple"
      />
    </div>
  );
};

export default ModelMetricsGrid;