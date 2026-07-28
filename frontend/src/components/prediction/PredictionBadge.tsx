import "./PredictionBadge.css";

interface PredictionBadgeProps {
  risk: "Low" | "Medium" | "High";
}

const PredictionBadge = ({ risk }: PredictionBadgeProps) => {
  return (
    <span className={`prediction-badge ${risk.toLowerCase()}`}>
      {risk} Risk
    </span>
  );
};

export default PredictionBadge;