import "./AIRecommendations.css";

interface AIRecommendationsProps {
  shipments: any[];
}

interface Recommendation {
  icon: string;
  title: string;
  description: string;
}

const AIRecommendations = ({
  shipments,
}: AIRecommendationsProps) => {
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
    Object.entries(modeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "N/A";

  const recommendations: Recommendation[] = [
    {
      icon: "⚠️",
      title: "High-Risk Shipments",
      description: `${highRisk} out of ${total} shipments are classified as High Risk. Prioritize these shipments for monitoring and intervention.`,
    },
    {
      icon: "🚚",
      title: "Transport Optimization",
      description: `${mostUsedMode} is currently the most frequently used shipping mode. Consider reviewing its performance and capacity planning.`,
    },
    {
      icon: "🎯",
      title: "AI Model Performance",
      description: `The prediction model is operating with an average confidence of ${avgConfidence}%, indicating consistent prediction quality.`,
    },
    {
      icon: "🤖",
      title: "Operational Recommendation",
      description: `The AI predicts ${delayed} shipments may experience delays. Reviewing these shipments early can help reduce operational disruptions.`,
    },
  ];

  return (
    <div className="ai-recommendations-card">
      <div className="ai-recommendations-header">
        <h3>AI Recommendations</h3>
        <p>
          AI-generated insights based on live shipment analytics.
        </p>
      </div>

      <div className="recommendations-list">
        {recommendations.map((item, index) => (
          <div
            className="recommendation-item"
            key={index}
          >
            <div className="recommendation-icon">
              {item.icon}
            </div>

            <div className="recommendation-content">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;