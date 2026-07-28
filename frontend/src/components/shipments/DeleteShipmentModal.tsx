import "./DeleteShipmentModal.css";
import { AlertTriangle } from "lucide-react";
import type { Shipment } from "./ShipmentsTable";

interface DeleteShipmentModalProps {
  isOpen: boolean;
  shipment: Shipment | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteShipmentModal = ({
  isOpen,
  shipment,
  onClose,
  onConfirm,
}: DeleteShipmentModalProps) => {
  if (!isOpen || !shipment) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <AlertTriangle
          size={55}
          className="delete-icon"
        />

        <h2>Delete Shipment?</h2>

        <p>
          Are you sure you want to delete
          <strong> {shipment.id}</strong>?
        </p>

        <p className="warning-text">
          This action cannot be undone.
        </p>

        <div className="delete-actions">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete Shipment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteShipmentModal;