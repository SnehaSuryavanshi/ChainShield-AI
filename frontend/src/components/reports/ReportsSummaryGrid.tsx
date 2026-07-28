import "./ReportsSummaryGrid.css";
import ReportSummaryCard from "./ReportSummaryCard";

interface ReportsSummaryGridProps {
  shipments: any[];
}

const ReportsSummaryGrid = ({
  shipments,
}: ReportsSummaryGridProps) => {
  const totalReports = shipments.length;

  const today = new Date().toLocaleDateString();

  const todaysReports = shipments.filter((shipment) => {
    if (!shipment["Order Date"]) return false;

    return (
      new Date(shipment["Order Date"]).toLocaleDateString() === today
    );
  }).length;

  const highRiskReports = shipments.filter(
    (shipment) => shipment["AI Risk"] === "High"
  ).length;

  const delayedReports = shipments.filter(
    (shipment) => shipment["Prediction"] === 1
  ).length;

  return (
    <div className="reports-grid">

      <ReportSummaryCard
        title="Total Reports"
        value={String(totalReports)}
        subtitle="Shipment reports available"
        icon="📄"
        variant="blue"
      />

      <ReportSummaryCard
        title="Today's Reports"
        value={String(todaysReports)}
        subtitle="Reports generated today"
        icon="📅"
        variant="green"
      />

      <ReportSummaryCard
        title="High Risk Reports"
        value={String(highRiskReports)}
        subtitle="Require attention"
        icon="⚠️"
        variant="orange"
      />

      <ReportSummaryCard
        title="Delayed Shipments"
        value={String(delayedReports)}
        subtitle="Predicted by AI"
        icon="🚚"
        variant="purple"
      />

    </div>
  );
};

export default ReportsSummaryGrid;