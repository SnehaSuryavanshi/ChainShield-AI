import "./PredictionResult.css";

import PredictionGauge from "./PredictionGauge";
import PredictionBadge from "./PredictionBadge";
import ConfidenceBar from "./ConfidenceBar";
import LoadingOverlay from "./LoadingOverlay";
import RiskBreakdownCard from "./RiskBreakdownCard";
import AIExplanationCard from "./AIExplanationCard";
import RecommendationCard from "./RecommendationCard";

import type { PredictionResult as PredictionData } from "../../services/prediction";

interface PredictionResultProps {
  loading: boolean;
  result: PredictionData | null;
}

const PredictionResult = ({
  loading,
  result,
}: PredictionResultProps) => {
  if (loading) {
    return (
      <div className="prediction-result-card loading-card">
        <LoadingOverlay />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="prediction-result-card empty">
        <h2>Prediction Result</h2>

        <div className="empty-state">
          <div className="empty-icon">🤖</div>

          <h3>No Prediction Yet</h3>

          <p>
            Select a shipment and click
            <strong> Predict Risk </strong>
            to generate an AI-powered shipment risk analysis.
          </p>
        </div>
      </div>
    );
  }

  const recommendations =
    result.risk === "High"
      ? [
          {
            title: "Immediate Attention",
            description:
              "This shipment has a high predicted delay risk. Review it before dispatch.",
          },
          {
            title: "Increase Monitoring",
            description:
              "Enable continuous GPS tracking and proactive alerts.",
          },
          {
            title: "Review Route",
            description:
              "Consider an alternate route or shipping method if possible.",
          },
        ]
      : result.risk === "Medium"
      ? [
          {
            title: "Monitor Shipment",
            description:
              "Keep tracking this shipment throughout transit.",
          },
          {
            title: "Check Logistics",
            description:
              "Verify schedules and transportation resources.",
          },
        ]
      : [
          {
            title: "Low Risk",
            description:
              "Shipment appears healthy. Continue with normal operations.",
          },
        ];

  return (
    <div className="prediction-result-card">
      <h2>Prediction Result</h2>

      <PredictionGauge score={result.confidence} />

      <div className="badge-wrapper">
        <PredictionBadge risk={result.risk} />
      </div>

      <ConfidenceBar
        confidence={result.confidence}
        risk={result.risk}
      />

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <h3>
          Prediction:{" "}
          {result.prediction === 1
            ? "Late Delivery Expected"
            : "On-Time Delivery Expected"}
        </h3>
      </div>

      <div className="recommendation-list">
        {recommendations.map((item, index) => (
          <RecommendationCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <RiskBreakdownCard
        delay={result.confidence}
        damage={Math.max(10, result.confidence - 30)}
        theft={Math.max(5, result.confidence - 50)}
      />

      <AIExplanationCard
        explanations={[
          `AI model confidence: ${result.confidence}%`,
          `Predicted Risk Level: ${result.risk}`,
          `Prediction generated using the trained Random Forest model.`,
          `Probability score: ${(result.probability * 100).toFixed(2)}%`,
        ]}
      />
    </div>
  );
};

export default PredictionResult;