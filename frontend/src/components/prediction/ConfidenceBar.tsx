import "./ConfidenceBar.css";

interface ConfidenceBarProps {
  confidence: number;
  risk: "Low" | "Medium" | "High";
}

const ConfidenceBar = ({
  confidence,
  risk,
}: ConfidenceBarProps) => {
  const color =
    risk === "Low"
      ? "#22c55e"
      : risk === "Medium"
      ? "#facc15"
      : "#3b82f6";

  return (
    <div className="confidence-wrapper">
      <div className="confidence-header">
        <span>Model Confidence</span>
        <strong>{confidence}%</strong>
      </div>

      <div className="confidence-track">
        <div
          className="confidence-fill"
          style={{
            width: `${confidence}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
};

export default ConfidenceBar;