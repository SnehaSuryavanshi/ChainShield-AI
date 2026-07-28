import {
  X,
  Truck,
  MapPin,
  Clock,
  AlertTriangle,
  Gauge,
  CheckCircle2,
} from "lucide-react";

import "./TrackingDetailsDrawer.css";

interface Props {
  shipment: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const TrackingDetailsDrawer = ({
  shipment,
  isOpen,
  onClose,
}: Props) => {
  if (!shipment) return null;

  const progress =
    shipment["Prediction"] === 1
      ? 55
      : shipment["AI Risk"] === "High"
      ? 65
      : shipment["AI Risk"] === "Medium"
      ? 82
      : 95;

  const recommendation =
    shipment["AI Risk"] === "High"
      ? "High shipment risk detected. Consider prioritizing this order and informing the customer about possible delays."
      : shipment["AI Risk"] === "Medium"
      ? "Moderate shipment risk detected. Continue monitoring this shipment for any operational changes."
      : "Shipment is progressing normally with a low predicted delivery risk.";

  return (
    <div className={`tracking-drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <div>
          <h2>Order #{shipment["Order Id"]}</h2>

          <span
            className={`drawer-status ${
              shipment["Prediction"] === 1
                ? "delayed"
                : "on-time"
            }`}
          >
            {shipment["Prediction"] === 1
              ? "Delayed"
              : "On Time"}
          </span>
        </div>

        <button onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      <div className="drawer-section">

        <div className="drawer-item">
          <Truck size={18} />
          <div>
            <small>Shipping Mode</small>
            <span>{shipment["Shipping Mode"]}</span>
          </div>
        </div>

        <div className="drawer-item">
          <MapPin size={18} />
          <div>
            <small>Destination</small>
            <span>
              {shipment["Customer City"]},{" "}
              {shipment["Customer State"]}
            </span>
          </div>
        </div>

        <div className="drawer-item">
          <Clock size={18} />
          <div>
            <small>Order Date</small>
            <span>{shipment["Order Date"]}</span>
          </div>
        </div>

        <div className="drawer-item">
          <Gauge size={18} />
          <div>
            <small>Confidence</small>
            <span>{shipment["Confidence"]}%</span>
          </div>
        </div>

        <div className="drawer-item">
          <AlertTriangle size={18} />
          <div>
            <small>AI Risk</small>
            <span>{shipment["AI Risk"]}</span>
          </div>
        </div>

      </div>

      <div className="drawer-progress">
        <h3>Prediction Confidence</h3>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p>{progress}% shipment completion estimate</p>
      </div>

      <div className="drawer-ai">
        <h3>
          <CheckCircle2 size={18} />
          AI Recommendation
        </h3>

        <p>{recommendation}</p>
      </div>
    </div>
  );
};

export default TrackingDetailsDrawer;