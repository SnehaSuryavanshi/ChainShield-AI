import { useState } from "react";
import "./PredictionForm.css";

interface PredictionFormProps {
  loading: boolean;
  shipments: any[];
  onPredict: (shipment: any) => void;
}

const PredictionForm = ({
  loading,
  shipments,
  onPredict,
}: PredictionFormProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSubmit = () => {
    if (shipments.length === 0) return;

    onPredict(shipments[selectedIndex]);
  };

  return (
    <div className="prediction-form-container">
      <h2>Select Shipment</h2>

      <div className="prediction-form">

        <div className="form-group">
          <label>Shipment</label>

          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
          >
            {shipments.map((shipment, index) => (
              <option key={shipment["Order Id"]} value={index}>
                #{shipment["Order Id"]} | {shipment["Customer City"]} →{" "}
                {shipment["Customer Country"]} | {shipment["Shipping Mode"]}
              </option>
            ))}
          </select>
        </div>

        {shipments.length > 0 && (
          <div className="shipment-preview">
            <p>
              <strong>Region:</strong>{" "}
              {shipments[selectedIndex]["Order Region"]}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {shipments[selectedIndex]["Order Status"]}
            </p>

            <p>
              <strong>Sales:</strong> ₹
              {shipments[selectedIndex]["Sales"]}
            </p>
          </div>
        )}

        <button
          className="predict-btn"
          onClick={handleSubmit}
          disabled={loading || shipments.length === 0}
        >
          {loading ? "Analyzing Shipment..." : "Predict Risk"}
        </button>

      </div>
    </div>
  );
};

export default PredictionForm;