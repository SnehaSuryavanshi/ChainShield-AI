import "./ModelStatisticsTable.css";

interface ModelStatisticsTableProps {
  shipments: any[];
}

const ModelStatisticsTable = ({
  shipments,
}: ModelStatisticsTableProps) => {
  const totalPredictions = shipments.length;

  const avgConfidence =
    totalPredictions > 0
      ? (
          shipments.reduce(
            (sum, shipment) => sum + shipment["Confidence"],
            0
          ) / totalPredictions
        ).toFixed(1)
      : "0";

  const highRisk = shipments.filter(
    (shipment) => shipment["AI Risk"] === "High"
  ).length;

  const delayed = shipments.filter(
    (shipment) => shipment["Prediction"] === 1
  ).length;

  const onTime = totalPredictions - delayed;

  const statistics = [
    {
      metric: "Total Predictions",
      value: totalPredictions.toString(),
    },
    {
      metric: "Average Confidence",
      value: `${avgConfidence}%`,
    },
    {
      metric: "High Risk Shipments",
      value: highRisk.toString(),
    },
    {
      metric: "Predicted Delays",
      value: delayed.toString(),
    },
    {
      metric: "Predicted On-Time Deliveries",
      value: onTime.toString(),
    },
    {
      metric: "Dataset Size",
      value: `${totalPredictions} shipments`,
    },
  ];

  return (
    <div className="statistics-card">
      <div className="statistics-header">
        <h3>Model Statistics</h3>

        <p>
          Operational metrics and AI model health summary.
        </p>
      </div>

      <div className="statistics-table">
        {statistics.map((item) => (
          <div className="statistics-row" key={item.metric}>
            <span>{item.metric}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelStatisticsTable;