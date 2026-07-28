import "./ShipmentsSummaryGrid.css";
import {
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import ShipmentSummaryCard from "./ShipmentSummaryCard";
import type { Shipment } from "./ShipmentsTable";

interface Props {
  shipments: Shipment[];
}

const ShipmentsSummaryGrid = ({ shipments }: Props) => {
  const totalShipments = shipments.length;

  const delivered = shipments.filter(
    (shipment) => shipment.status === "Delivered"
  ).length;

  const inTransit = shipments.filter(
    (shipment) => shipment.status === "In Transit"
  ).length;

  const highRisk = shipments.filter(
    (shipment) => shipment.risk === "High"
  ).length;

  const deliveredPercentage =
    totalShipments > 0
      ? Math.round((delivered / totalShipments) * 100)
      : 0;

  const transitPercentage =
    totalShipments > 0
      ? Math.round((inTransit / totalShipments) * 100)
      : 0;

  const riskPercentage =
    totalShipments > 0
      ? Math.round((highRisk / totalShipments) * 100)
      : 0;

  return (
    <div className="shipments-summary-grid">
      <ShipmentSummaryCard
        title="Total Shipments"
        value={totalShipments}
        subtitle="AI monitored shipments"
        icon={<Package size={24} />}
        variant="blue"
      />

      <ShipmentSummaryCard
        title="In Transit"
        value={inTransit}
        subtitle={`${transitPercentage}% currently moving`}
        icon={<Truck size={24} />}
        variant="purple"
      />

      <ShipmentSummaryCard
        title="Delivered"
        value={delivered}
        subtitle={`${deliveredPercentage}% successfully delivered`}
        icon={<CheckCircle2 size={24} />}
        variant="green"
      />

      <ShipmentSummaryCard
        title="High Risk"
        value={highRisk}
        subtitle={`${riskPercentage}% require attention`}
        icon={<AlertTriangle size={24} />}
        variant="orange"
      />
    </div>
  );
};

export default ShipmentsSummaryGrid;