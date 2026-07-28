import {
  Brain,
  Route,
  TriangleAlert,
  TrendingUp,
  CheckCircle2,
  Truck,
} from "lucide-react";

import "./AITrackingInsights.css";

interface Props {
  shipments: any[];
}

const AITrackingInsights = ({ shipments }: Props) => {
  const total = shipments.length;

  const delayed = shipments.filter(
    (shipment) => shipment["Prediction"] === 1
  ).length;

  const highRisk = shipments.filter(
    (shipment) => shipment["AI Risk"] === "High"
  ).length;

  const avgConfidence =
    total > 0
      ? (
          shipments.reduce(
            (sum, shipment) => sum + shipment["Confidence"],
            0
          ) / total
        ).toFixed(1)
      : "0";

  const mostCommonShippingMode =
    shipments.reduce((acc: any, shipment: any) => {
      acc[shipment["Shipping Mode"]] =
        (acc[shipment["Shipping Mode"]] || 0) + 1;
      return acc;
    }, {});

  const preferredMode =
    Object.keys(mostCommonShippingMode).sort(
      (a, b) =>
        mostCommonShippingMode[b] -
        mostCommonShippingMode[a]
    )[0] || "N/A";

  const insights = [
    {
      icon: Route,
      title: "Shipping Mode",
      description: `Most shipments are transported using ${preferredMode}.`,
      color: "#3b82f6",
    },
    {
      icon: TriangleAlert,
      title: "High Risk Shipments",
      description: `${highRisk} shipment(s) have been classified as High Risk by the AI model.`,
      color: "#f59e0b",
    },
    {
      icon: Truck,
      title: "Predicted Delays",
      description: `${delayed} shipment(s) are predicted to experience delivery delays.`,
      color: "#ef4444",
    },
    {
      icon: TrendingUp,
      title: "Model Confidence",
      description: `Average prediction confidence is ${avgConfidence}%.`,
      color: "#8b5cf6",
    },
    {
      icon: CheckCircle2,
      title: "Fleet Overview",
      description: `${total} shipments are currently being monitored by ChainShield AI.`,
      color: "#10b981",
    },
  ];

  return (
    <div className="ai-insights-card">
      <div className="ai-header">
        <div>
          <h2>
            <Brain size={24} />
            AI Tracking Insights
          </h2>

          <p>
            Live insights generated from shipment predictions.
          </p>
        </div>
      </div>

      <div className="ai-grid">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="ai-item"
              key={item.title}
            >
              <div
                className="ai-icon"
                style={{
                  background: `${item.color}20`,
                  color: item.color,
                }}
              >
                <Icon size={24} />
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AITrackingInsights;