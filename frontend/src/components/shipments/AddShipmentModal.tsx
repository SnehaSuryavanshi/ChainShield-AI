import "./AddShipmentModal.css";
import { X } from "lucide-react";
import { useState } from "react";
import type { Shipment } from "./ShipmentsTable";

interface AddShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddShipment: (shipment: Shipment) => void;
}

const AddShipmentModal = ({
  isOpen,
  onClose,
  onAddShipment,
}: AddShipmentModalProps) => {
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

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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

    onAddShipment(formData);

    setFormData({
      id: "",
      customer: "",
      origin: "",
      destination: "",
      vehicle: "",
      risk: "Low",
      status: "In Transit",
      eta: "",
    });

    onClose();
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal">
        <div className="add-modal-header">
          <h2>Add New Shipment</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="add-form"
        >
          <input
            name="id"
            placeholder="Shipment ID"
            value={formData.id}
            onChange={handleChange}
            required
          />

          <input
            name="customer"
            placeholder="Customer"
            value={formData.customer}
            onChange={handleChange}
            required
          />

          <input
            name="origin"
            placeholder="Origin"
            value={formData.origin}
            onChange={handleChange}
            required
          />

          <input
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />

          <input
            name="vehicle"
            placeholder="Vehicle Number"
            value={formData.vehicle}
            onChange={handleChange}
            required
          />

          <input
            name="eta"
            placeholder="ETA"
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
            Save Shipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShipmentModal;