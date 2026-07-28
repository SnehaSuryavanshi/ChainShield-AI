import {
  Truck,
  Clock3,
  TriangleAlert,
  MapPinned,
} from "lucide-react";

import "./TrackingSummaryGrid.css";

interface TrackingSummaryGridProps {
  shipments: any[];
}

const TrackingSummaryGrid = ({
  shipments,
}: TrackingSummaryGridProps) => {
  const total = shipments.length;

  const delayed = shipments.filter(
    (shipment) => shipment["Prediction"] === 1
  ).length;

  const highRisk = shipments.filter(
    (shipment) => shipment["AI Risk"] === "High"
  ).length;

  const cards = [
    {
      title: "Active Shipments",
      value: total.toString(),
      subtitle: `${Math.max(total - delayed, 0)} currently on schedule`,
      icon: Truck,
      color: "#3b82f6",
    },
    {
      title: "Average Confidence",
      value:
        total > 0
          ? `${(
              shipments.reduce(
                (sum, shipment) => sum + shipment["Confidence"],
                0
              ) / total
            ).toFixed(1)}%`
          : "0%",
      subtitle: "AI prediction confidence",
      icon: Clock3,
      color: "#10b981",
    },
    {
      title: "Delayed Shipments",
      value: delayed.toString(),
      subtitle: "Predicted delays",
      icon: TriangleAlert,
      color: "#f59e0b",
    },
    {
      title: "High Risk Shipments",
      value: highRisk.toString(),
      subtitle: "Require attention",
      icon: MapPinned,
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="tracking-summary-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            className="tracking-summary-card"
            key={card.title}
          >
            <div
              className="tracking-summary-icon"
              style={{
                background: `${card.color}20`,
                color: card.color,
              }}
            >
              <Icon size={28} />
            </div>

            <div className="tracking-summary-content">
              <h4>{card.title}</h4>

              <h2>{card.value}</h2>

              <p>{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackingSummaryGrid;