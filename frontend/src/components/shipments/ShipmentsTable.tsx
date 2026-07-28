import "./ShipmentsTable.css";
import { Eye, Pencil, Trash2 } from "lucide-react";

export interface Shipment {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  vehicle: string;

  risk: "Low" | "Medium" | "High";

  confidence?: number;

  prediction?: number;

  status: string;

  eta: string;
}

interface ShipmentsTableProps {
  shipments: Shipment[];
  onViewShipment: (shipment: Shipment) => void;
  onEditShipment: (shipment: Shipment) => void;
  onDeleteShipment: (shipment: Shipment) => void;
}

const ShipmentsTable = ({
  shipments,
  onViewShipment,
  onEditShipment,
  onDeleteShipment,
}: ShipmentsTableProps) => {
  return (
    <div className="shipments-table-container">
      <table className="shipments-table">
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Customer</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Vehicle</th>
            <th>Risk</th>
            <th>AI Confidence</th>
            <th>Status</th>
            <th>ETA</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {shipments.length > 0 ? (
            shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>

                <td>{shipment.customer}</td>

                <td>{shipment.origin}</td>

                <td>{shipment.destination}</td>

                <td>{shipment.vehicle}</td>

                <td>
                  <span
                    className={`risk-badge ${shipment.risk
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {shipment.risk}
                  </span>
                </td>

                <td>
                  <span
                    style={{
                      fontWeight: 600,
                      color:
                        (shipment.confidence ?? 0) >= 80
                          ? "#22c55e"
                          : (shipment.confidence ?? 0) >= 60
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  >
                    {shipment.confidence ?? 0}%
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${shipment.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {shipment.status}
                  </span>
                </td>

                <td>{shipment.eta}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() =>
                        onViewShipment(shipment)
                      }
                      title="View Shipment"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        onEditShipment(shipment)
                      }
                      title="Edit Shipment"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        onDeleteShipment(shipment)
                      }
                      title="Delete Shipment"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="no-data">
                No shipments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentsTable;