import "./LoadingOverlay.css";

const LoadingOverlay = () => {
  const steps = [
    "Analyzing shipment route...",
    "Checking weather conditions...",
    "Processing historical data...",
    "Evaluating AI risk model...",
  ];

  return (
    <div className="loading-overlay">
      <div className="ai-loader"></div>

      <h2>AI Prediction Engine</h2>

      <p className="loading-subtitle">
        Please wait while the AI analyzes your shipment.
      </p>

      <div className="loading-steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className="loading-step"
            style={{
              animationDelay: `${index * 0.6}s`,
            }}
          >
            <span>✔</span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingOverlay;