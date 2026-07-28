import "./AnalyticsGrid.css";

import AnalyticsCard from "./AnalyticsCard";

interface AnalyticsGridProps {
  shipments: any[];
}

const AnalyticsGrid = ({
  shipments,
}: AnalyticsGridProps) => {
  const totalShipments = shipments.length;

  const highRisk = shipments.filter(
    (shipment) => shipment["AI Risk"] === "High"
  ).length;

  const averageConfidence =
    shipments.length > 0
      ? (
          shipments.reduce(
            (sum, shipment) =>
              sum + shipment["Confidence"],
            0
          ) / shipments.length
        ).toFixed(1)
      : "0";

  const onTimeDeliveries =
    shipments.length > 0
      ? (
          (shipments.filter(
            (shipment) =>
              shipment["Prediction"] === 0
          ).length /
            shipments.length) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="analytics-grid">
      <AnalyticsCard
        icon="📦"
        title="Total Shipments"
        value={String(totalShipments)}
        subtitle="Loaded from backend"
      />

      <AnalyticsCard
        icon="⚠️"
        title="High Risk Shipments"
        value={String(highRisk)}
        subtitle={`${(
          (highRisk /
            Math.max(totalShipments, 1)) *
          100
        ).toFixed(1)}% of total`}
      />

      <AnalyticsCard
        icon="🎯"
        title="Average Confidence"
        value={`${averageConfidence}%`}
        subtitle="AI model confidence"
      />

      <AnalyticsCard
        icon="🚚"
        title="On-Time Delivery"
        value={`${onTimeDeliveries}%`}
        subtitle="Predicted by AI"
      />
    </div>
  );
};

export default AnalyticsGrid;