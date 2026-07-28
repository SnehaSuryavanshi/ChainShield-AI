import "./AIInsightsCard.css";

interface AIInsightsCardProps {
  shipments: any[];
}

interface Insight {
  icon: string;
  title: string;
  description: string;
}

const AIInsightsCard = ({
  shipments,
}: AIInsightsCardProps) => {
  const total = shipments.length;

  const highRisk = shipments.filter(
    (shipment) => shipment["AI Risk"] === "High"
  ).length;

  const delayed = shipments.filter(
    (shipment) => shipment["Prediction"] === 1
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

  // Most common shipping mode
  const modeCounts: Record<string, number> = {};

  shipments.forEach((shipment) => {
    const mode = shipment["Shipping Mode"] || "Unknown";
    modeCounts[mode] = (modeCounts[mode] || 0) + 1;
  });

  const mostUsedMode =
    Object.entries(modeCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "N/A";

  const insights: Insight[] = [
    {
      icon: "📦",
      title: "Shipment Summary",
      description: `${total} shipments were analyzed by the AI model.`,
    },
    {
      icon: "⚠️",
      title: "High-Risk Shipments",
      description: `${highRisk} shipments (${(
        (highRisk / Math.max(total, 1)) *
        100
      ).toFixed(1)}%) are classified as High Risk.`,
    },
    {
      icon: "🚚",
      title: "Transport Analysis",
      description: `${mostUsedMode} is the most frequently used shipping mode.`,
    },
    {
      icon: "🎯",
      title: "Model Confidence",
      description: `The AI model has an average confidence of ${avgConfidence}% and predicts ${delayed} delayed shipments.`,
    },
  ];

  return (
    <div className="ai-insights-card">
      <div className="ai-insights-header">
        <span className="ai-icon">🤖</span>

        <div>
          <h2>AI Insights</h2>
          <p>Automatically generated from shipment analytics</p>
        </div>
      </div>

      <div className="insights-list">
        {insights.map((insight, index) => (
          <div className="insight-item" key={index}>
            <span className="insight-icon">
              {insight.icon}
            </span>

            <div>
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightsCard;