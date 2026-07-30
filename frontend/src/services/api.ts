const API = "https://chainshield-ai.onrender.com";

let shipmentCache: any[] | null = null;

export async function getShipments(forceRefresh = false) {
  // Return cached data if available
  if (shipmentCache && !forceRefresh) {
    return shipmentCache;
  }

  const response = await fetch(`${API}/shipments`);

  if (!response.ok) {
    throw new Error("Failed to fetch shipments");
  }

  const data = await response.json();

  shipmentCache = data;

  return data;
}

// Optional helper if you ever need to clear cache
export function clearShipmentCache() {
  shipmentCache = null;
}