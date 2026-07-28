import "./ShipmentSummaryCard.css";
import type { ReactNode } from "react";

interface ShipmentSummaryCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
  variant?: "blue" | "green" | "orange" | "purple";
}

const ShipmentSummaryCard = ({
  title,
  value,
  icon,
  subtitle,
  variant = "blue",
}: ShipmentSummaryCardProps) => {
  return (
    <div className={`shipment-summary-card ${variant}`}>
      <div className="shipment-card-top-bar"></div>

      <div className="shipment-card-header">
        <div className="shipment-card-icon">
          {icon}
        </div>

        <div className="shipment-card-content">
          <h4>{title}</h4>

          <h2>{value}</h2>

          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default ShipmentSummaryCard;