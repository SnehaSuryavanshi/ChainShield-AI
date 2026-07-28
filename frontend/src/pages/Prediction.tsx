import { useEffect, useState } from "react";
import "./Prediction.css";

import PredictionForm from "../components/prediction/PredictionForm";
import PredictionResult from "../components/prediction/PredictionResult";

import { getShipments } from "../services/api";
import { predictShipmentRisk } from "../services/prediction";

import type {
  PredictionResult as PredictionResultType,
} from "../services/prediction";

const Prediction = () => {
  const [loading, setLoading] = useState(false);

  const [shipments, setShipments] = useState<any[]>([]);

  const [result, setResult] =
    useState<PredictionResultType | null>(null);

  useEffect(() => {
    async function loadShipments() {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (error) {
        console.error("Failed to load shipments", error);
      }
    }

    loadShipments();
  }, []);

  const handlePrediction = async (shipment: any) => {
    setLoading(true);

    try {
      const response = await predictShipmentRisk({
        data: shipment.features,
      });

      setResult(response);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="prediction-page">
      <PredictionForm
        loading={loading}
        shipments={shipments}
        onPredict={handlePrediction}
      />

      <PredictionResult
        loading={loading}
        result={result}
      />
    </div>
  );
};

export default Prediction;