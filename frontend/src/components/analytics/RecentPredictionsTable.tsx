import "./RecentPredictionsTable.css";

interface RecentPredictionsTableProps {
  shipments: any[];
}

const getRiskClass = (risk: string) => {
  switch (risk) {
    case "High":
      return "risk-high";
    case "Medium":
      return "risk-medium";
    default:
      return "risk-low";
  }
};

const RecentPredictionsTable = ({
  shipments,
}: RecentPredictionsTableProps) => {
  return (
    <div className="recent-table-card">
      <div className="table-header">
        <h2>Recent Predictions</h2>
        <p>Latest AI shipment risk predictions</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Risk</th>
            <th>Confidence</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {shipments.slice(0, 10).map((shipment, index) => (
            <tr key={shipment["Order Id"] ?? index}>
              <td>{shipment["Order Id"]}</td>

              <td>{shipment["Customer City"]}</td>

              <td>{shipment["Customer State"]}</td>

              <td>
                <span
                  className={`risk-badge ${getRiskClass(
                    shipment["AI Risk"]
                  )}`}
                >
                  {shipment["AI Risk"]}
                </span>
              </td>

              <td>{shipment["Confidence"]}%</td>

              <td>
                {shipment["Prediction"] === 1
                  ? "Delayed"
                  : "On Time"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentPredictionsTable;