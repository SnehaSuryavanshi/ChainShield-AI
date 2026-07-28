import "./AIExplainabilityCard.css";

const insights = [
  {
    title: "Weather Impact",
    description:
      "Weather conditions are one of the strongest factors considered by the AI model when estimating shipment risk.",
  },
  {
    title: "Route Distance",
    description:
      "Long-distance routes consistently increase delivery delays due to additional handling and transit complexity.",
  },
  {
    title: "Traffic Conditions",
    description:
      "Urban traffic congestion has become one of the strongest indicators of late deliveries during peak hours.",
  },
  {
    title: "Transport Mode",
    description:
      "Transport mode significantly influences shipment risk, with different modes exhibiting different delay patterns."
  },
];

const AIExplainabilityCard = () => {
  return (
    <div className="ai-card">
      <div className="ai-card-header">
        <h3>AI Explainability</h3>
        <p>
          Understand how the model evaluates shipment risk and makes
          predictions.
        </p>
      </div>

      <div className="insight-list">
        {insights.map((item, index) => (
          <div className="insight-item" key={index}>
            <div className="insight-icon">🧠</div>

            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIExplainabilityCard;