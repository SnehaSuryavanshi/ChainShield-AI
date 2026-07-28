import "./AnalyticsCard.css";
import type { ReactNode } from "react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
}

const AnalyticsCard = ({
  title,
  value,
  subtitle,
  icon,
}: AnalyticsCardProps) => {
  return (
    <div className="analytics-card">
      <div className="analytics-card-top">
        <div className="analytics-card-content">
          <h3>{title}</h3>

          <h2>{value}</h2>

          <p>{subtitle}</p>
        </div>

        <div className="analytics-icon">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;