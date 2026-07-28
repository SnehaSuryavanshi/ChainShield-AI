import "./ReportSummaryCard.css";
import type { ReactNode } from "react";

interface ReportSummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  variant?: "blue" | "green" | "orange" | "purple";
}

const ReportSummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  variant = "blue",
}: ReportSummaryCardProps) => {
  return (
    <div className={`report-summary-card ${variant}`}>
      <div className="report-card-top">
        <div className="report-card-content">
          <h3>{title}</h3>
          <h2>{value}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="report-card-icon">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default ReportSummaryCard;