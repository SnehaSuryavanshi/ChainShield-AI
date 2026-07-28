const API = "http://127.0.0.1:8000";

export async function getShipments() {
  const response = await fetch(`${API}/shipments`);

  if (!response.ok) {
    throw new Error("Failed to fetch shipments");
  }

  return response.json();
}