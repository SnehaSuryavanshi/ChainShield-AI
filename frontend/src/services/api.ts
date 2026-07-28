const API = "https://chainshield-ai.onrender.com";

export async function getShipments() {
  const response = await fetch(`${API}/shipments`);

  if (!response.ok) {
    throw new Error("Failed to fetch shipments");
  }

  return response.json();
}