import "./RecentReportsTable.css";
import { generateShipmentPDF } from "../../services/reportService";

interface RecentReportsTableProps {
  shipments: any[];
}

const formatDate = (date: string) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const RecentReportsTable = ({
  shipments,
}: RecentReportsTableProps) => {
  return (
    <div className="reports-table-card">
      <div className="reports-table-header">
        <h3>Recent Reports</h3>
        <p>Latest AI-generated shipment reports.</p>
      </div>

      <div className="reports-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Generated On</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {shipments.slice(0, 10).map((shipment, index) => (
              <tr key={shipment["Order Id"] ?? index}>
                <td>
                  Risk Report #{shipment["Order Id"]}
                </td>

                <td>
                  {formatDate(shipment["Order Date"])}
                </td>

                <td>AI Report</td>

                <td>
                  <span className="status completed">
                    🟢 Completed
                  </span>
                </td>

                <td>
                  <button
                    className="download-btn"
                    onClick={() => generateShipmentPDF(shipment)}
                  > 
                    ⬇️ Download
                 </button>
                
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReportsTable;