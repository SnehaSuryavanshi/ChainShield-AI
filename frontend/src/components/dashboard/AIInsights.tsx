import "./AIInsights.css";

interface Shipment {
  "AI Risk": string;
  Confidence: number;
  "Late Delivery Risk": number;
}

interface AIInsightsProps {
  shipments: Shipment[];
}

const AIInsights = ({ shipments }: AIInsightsProps) => {
  const highRisk = shipments.filter(
    (s) => s["AI Risk"] === "High"
  ).length;

  const mediumRisk = shipments.filter(
    (s) => s["AI Risk"] === "Medium"
  ).length;

  const avgConfidence =
    shipments.length > 0
      ? (
          shipments.reduce(
            (sum, s) => sum + s.Confidence,
            0
          ) / shipments.length
        ).toFixed(1)
      : "0.0";

  const lateDeliveries = shipments.filter(
    (s) => s["Late Delivery Risk"] === 1
  ).length;

  return (
    <div className="ai-insights">
      <div className="insights-header">
        <h2>AI Insights</h2>
        <p>Recommendations generated from live shipment data</p>
      </div>

      <div className="insight-grid">
        <div className="insight-card">
          <h3>High Risk Shipments</h3>
          <p>
            {highRisk} shipment(s) are currently classified as High Risk by the
            AI model.
          </p>
        </div>

        <div className="insight-card">
          <h3>Average AI Confidence</h3>
          <p>
            The prediction model is operating at an average confidence of{" "}
            <strong>{avgConfidence}%</strong>.
          </p>
        </div>

        <div className="insight-card">
          <h3>Delivery Recommendation</h3>
          <p>
            {lateDeliveries > 0 || highRisk > 0
              ? "Prioritize monitoring high-risk and late-delivery shipments to reduce potential delays."
              : "No significant delivery risks detected. Operations are running normally."}
          </p>
        </div>

        <div className="insight-card">
          <h3>Medium Risk Watchlist</h3>
          <p>
            {mediumRisk} shipment(s) are under observation and may require
            additional monitoring.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;