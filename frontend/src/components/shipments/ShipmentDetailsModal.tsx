import "./ShipmentDetailsModal.css";
import {
  X,
  Package,
  User,
  Truck,
  MapPin,
  Clock,
  AlertTriangle,
  Brain,
  ShieldCheck,
} from "lucide-react";

import type { Shipment } from "./ShipmentsTable";

interface ShipmentDetailsModalProps {
  isOpen: boolean;
  shipment: Shipment | null;
  onClose: () => void;
}

const ShipmentDetailsModal = ({
  isOpen,
  shipment,
  onClose,
}: ShipmentDetailsModalProps) => {
  if (!isOpen || !shipment) return null;

  const confidence = shipment.confidence ?? 0;

  const prediction =
    shipment.prediction === 1
      ? "High Risk Shipment"
      : "Safe Shipment";

  return (
    <div className="shipment-modal-overlay">
      <div className="shipment-modal">
        <div className="shipment-modal-header">
          <div>
            <h2>Shipment Details</h2>
            <p>
              AI-powered shipment overview and logistics intelligence
            </p>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        <div className="shipment-details-grid">
          <div className="detail-card">
            <Package size={22} />
            <div>
              <h4>Shipment ID</h4>
              <p>{shipment.id}</p>
            </div>
          </div>

          <div className="detail-card">
            <User size={22} />
            <div>
              <h4>Customer</h4>
              <p>{shipment.customer}</p>
            </div>
          </div>

          <div className="detail-card">
            <Truck size={22} />
            <div>
              <h4>Vehicle</h4>
              <p>{shipment.vehicle}</p>
            </div>
          </div>

          <div className="detail-card">
            <MapPin size={22} />
            <div>
              <h4>Origin</h4>
              <p>{shipment.origin}</p>
            </div>
          </div>

          <div className="detail-card">
            <MapPin size={22} />
            <div>
              <h4>Destination</h4>
              <p>{shipment.destination}</p>
            </div>
          </div>

          <div className="detail-card">
            <Clock size={22} />
            <div>
              <h4>ETA</h4>
              <p>{shipment.eta}</p>
            </div>
          </div>

          <div className="detail-card risk-card">
            <AlertTriangle size={22} />
            <div>
              <h4>AI Risk Level</h4>
              <p>{shipment.risk}</p>
            </div>
          </div>

          <div className="detail-card">
            <Package size={22} />
            <div>
              <h4>Status</h4>
              <p>{shipment.status}</p>
            </div>
          </div>

          <div className="detail-card">
            <Brain size={22} />
            <div>
              <h4>AI Confidence</h4>
              <p>{confidence}%</p>
            </div>
          </div>

          <div className="detail-card">
            <ShieldCheck size={22} />
            <div>
              <h4>AI Prediction</h4>
              <p>{prediction}</p>
            </div>
          </div>
        </div>

        <div className="shipment-timeline">
          <h3>Shipment Timeline</h3>

          <div className="timeline">
            <div className="timeline-item active">
              <span></span>
              Shipment Created
            </div>

            <div className="timeline-item active">
              <span></span>
              Picked Up
            </div>

            <div className="timeline-item active">
              <span></span>
              In Transit
            </div>

            <div className="timeline-item">
              <span></span>
              Out for Delivery
            </div>

            <div className="timeline-item">
              <span></span>
              Delivered
            </div>
          </div>
        </div>

        <div className="ai-recommendation-box">
          <h3>🤖 AI Recommendation</h3>

          {shipment.prediction === 1 ? (
            <p>
              The AI model predicts that this shipment has a
              <strong> high probability of delay or disruption</strong>.
              Confidence: <strong>{confidence}%</strong>.
              It is recommended to prioritize monitoring, review the shipping route,
              and prepare contingency plans if required.
            </p>
          ) : (
            <p>
              The AI model predicts that this shipment is
              <strong> progressing normally</strong>.
              Confidence: <strong>{confidence}%</strong>.
              Continue routine monitoring while maintaining the planned delivery schedule.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailsModal;