import { useEffect, useMemo, useState } from "react";
import "./PredictionGauge.css";

interface PredictionGaugeProps {
  score: number;
}

const PredictionGauge = ({ score }: PredictionGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current++;

      if (current >= score) {
        current = score;
        clearInterval(interval);
      }

      setAnimatedScore(current);
    }, 15);

    return () => clearInterval(interval);
  }, [score]);

  const color = useMemo(() => {
    if (score < 40) return "#22c55e";
    if (score < 70) return "#facc15";
    return "#ef4444";
  }, [score]);

  const degree = (animatedScore / 100) * 360;

  return (
    <div
      className="prediction-gauge"
      style={{
        background: `conic-gradient(
          ${color} ${degree}deg,
          #1e293b ${degree}deg
        )`,
      }}
    >
      <div className="prediction-gauge-inner">
        <h1>{animatedScore}%</h1>
      </div>
    </div>
  );
};

export default PredictionGauge;