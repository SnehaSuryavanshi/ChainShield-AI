import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

import KPICard from "./KPICard";
import "./KPISection.css";

interface Shipment {
  "Late Delivery Risk": number;
  Confidence: number;
}

interface KPISectionProps {
  shipments: Shipment[];
}

const KPISection = ({ shipments }: KPISectionProps) => {
  const totalShipments = shipments.length;

  const delayedShipments = shipments.filter(
    (shipment) => shipment["Late Delivery Risk"] === 1
  ).length;

  const onTimeDeliveries = totalShipments - delayedShipments;

  const onTimePercentage =
    totalShipments > 0
      ? ((onTimeDeliveries / totalShipments) * 100).toFixed(1)
      : "0.0";

  const averageConfidence =
    totalShipments > 0
      ? (
          shipments.reduce(
            (sum, shipment) => sum + shipment.Confidence,
            0
          ) / totalShipments
        ).toFixed(1)
      : "0.0";

  return (
    <section className="kpi-grid">
      <KPICard
        title="Total Shipments"
        value={totalShipments}
        change="Live from backend"
        icon={<FaTruck />}
      />

      <KPICard
        title="On-Time Deliveries"
        value={`${onTimePercentage}%`}
        change={`${onTimeDeliveries} shipments`}
        icon={<FaCheckCircle />}
      />

      <KPICard
        title="Delayed Shipments"
        value={delayedShipments}
        change={`${(
          (delayedShipments / Math.max(totalShipments, 1)) *
          100
        ).toFixed(1)}% of total`}
        icon={<FaClock />}
      />

      <KPICard
        title="Average AI Confidence"
        value={`${averageConfidence}%`}
        change="Live prediction confidence"
        icon={<FaChartLine />}
      />
    </section>
  );
};

export default KPISection;