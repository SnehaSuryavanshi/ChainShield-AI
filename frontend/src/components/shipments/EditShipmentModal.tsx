import "./AddShipmentModal.css";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Shipment } from "./ShipmentsTable";

interface EditShipmentModalProps {
  isOpen: boolean;
  shipment: Shipment | null;
  onClose: () => void;
  onUpdateShipment: (shipment: Shipment) => void;
}

const EditShipmentModal = ({
  isOpen,
  shipment,
  onClose,
  onUpdateShipment,
}: EditShipmentModalProps) => {
  const [formData, setFormData] = useState<Shipment>({
    id: "",
    customer: "",
    origin: "",
    destination: "",
    vehicle: "",
    risk: "Low",
    status: "In Transit",
    eta: "",
  });

  useEffect(() => {
    if (shipment) {
      setFormData(shipment);
    }
  }, [shipment]);

  if (!isOpen || !shipment) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    onUpdateShipment(formData);

    onClose();
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal">
        <div className="add-modal-header">
          <h2>Edit Shipment</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form
          className="add-form"
          onSubmit={handleSubmit}
        >
          <input
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />

          <input
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          />

          <input
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
          />

          <input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />

          <input
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            required
          />

          <input
            name="eta"
            value={formData.eta}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Delivered</option>
            <option>In Transit</option>
            <option>Delayed</option>
            <option>High Risk</option>
          </select>

          <select
            name="risk"
            value={formData.risk}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <button
            type="submit"
            className="save-btn"
          >
            Update Shipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditShipmentModal;