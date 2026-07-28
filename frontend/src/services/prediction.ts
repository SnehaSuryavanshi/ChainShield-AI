const API_URL = "http://127.0.0.1:8000";

export interface PredictionInput {
  data: Record<string, any>;
}

export interface PredictionResult {
  prediction: number;
  probability: number;
  confidence: number;
  risk: "Low" | "Medium" | "High";
}

export const predictShipmentRisk = async (
  input: PredictionInput
): Promise<PredictionResult> => {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
};