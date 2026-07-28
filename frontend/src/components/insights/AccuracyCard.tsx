import "./AccuracyCard.css";
import type { ReactNode } from "react";

interface AccuracyCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  variant?: "blue" | "green" | "orange" | "purple";
}

const AccuracyCard = ({
  title,
  value,
  subtitle,
  icon,
  variant = "blue",
}: AccuracyCardProps) => {
  return (
    <div className={`accuracy-card ${variant}`}>
      <div className="accuracy-card-top">
        <div className="accuracy-card-content">
          <h3>{title}</h3>
          <h2>{value}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="accuracy-icon">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AccuracyCard;