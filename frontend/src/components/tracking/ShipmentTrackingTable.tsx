import { Eye } from "lucide-react";
import "./ShipmentTrackingTable.css";

interface Props {
  shipments: any[];
  selectedShipment: any | null;
  onView: (shipment: any) => void;
}

const ShipmentTrackingTable = ({
  shipments,
  selectedShipment,
  onView,
}: Props) => {
  return (
    <div className="tracking-table-card">
      <div className="tracking-table-header">
        <h2>Active Shipments</h2>

        <p>
          Monitor every active shipment in real time.
        </p>
      </div>

      <div className="tracking-table-wrapper">
        <table className="tracking-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>City</th>
              <th>State</th>
              <th>Shipping Mode</th>
              <th>Confidence</th>
              <th>Risk</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((shipment) => {
              const isSelected =
                selectedShipment?.["Order Id"] ===
                shipment["Order Id"];

              return (
                <tr
                  key={shipment["Order Id"]}
                  className={
                    isSelected
                      ? "selected-shipment-row"
                      : ""
                  }
                >
                  <td>{shipment["Order Id"]}</td>

                  <td>{shipment["Customer City"]}</td>

                  <td>{shipment["Customer State"]}</td>

                  <td>{shipment["Shipping Mode"]}</td>

                  <td>{shipment["Confidence"]}%</td>

                  <td>
                    <span
                      className={`risk-badge ${shipment[
                        "AI Risk"
                      ].toLowerCase()}`}
                    >
                      {shipment["AI Risk"]}
                    </span>
                  </td>

                  <td>
                    {shipment["Prediction"] === 1
                      ? "Delayed"
                      : "On Time"}
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        onView(shipment)
                      }
                    >
                      <Eye size={18} />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentTrackingTable;