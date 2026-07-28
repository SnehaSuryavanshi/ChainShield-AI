// Demo GPS coordinates generated from city and country.
// Replace with live GPS coordinates from IoT devices in production.

const cityCoordinates: Record<string, [number, number]> = {
  // Puerto Rico
  "Caguas": [18.2341, -66.0485],
  "San Juan": [18.4655, -66.1057],
  "Bayamon": [18.3986, -66.1557],
  "Carolina": [18.3808, -65.9574],
  "Ponce": [18.0111, -66.6141],
  "Mayaguez": [18.2011, -67.1396],
  "Humacao": [18.1497, -65.8274],
  "Arecibo": [18.4724, -66.7157],
  "Guaynabo": [18.3575, -66.1110],

  // United States
  "New York": [40.7128, -74.0060],
  "Chicago": [41.8781, -87.6298],
  "Houston": [29.7604, -95.3698],
  "Dallas": [32.7767, -96.7970],
  "Phoenix": [33.4484, -112.0740],
  "Los Angeles": [34.0522, -118.2437],
  "San Diego": [32.7157, -117.1611],
  "San Jose": [37.3382, -121.8863],
  "San Francisco": [37.7749, -122.4194],
  "Seattle": [47.6062, -122.3321],
  "Miami": [25.7617, -80.1918],
  "Orlando": [28.5383, -81.3792],
  "Atlanta": [33.7490, -84.3880],
  "Boston": [42.3601, -71.0589],
  "Denver": [39.7392, -104.9903],
  "Philadelphia": [39.9526, -75.1652],
  "Las Vegas": [36.1699, -115.1398],

  // Mexico
  "Mexico City": [19.4326, -99.1332],
  "Guadalajara": [20.6597, -103.3496],
  "Monterrey": [25.6866, -100.3161],
};

function hashString(value: string): number {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return hash;
}

function jitter(seed: number): number {
  return ((seed % 100) - 50) * 0.005;
}

export function getShipmentTrackingData(shipment: any) {
  const city = String(
    shipment["Customer City"] ??
      shipment["Order City"] ??
      ""
  ).trim();

  const orderId = String(
    shipment["Order Id"] ?? ""
  );

  const seed = hashString(orderId);

  const base: [number, number] =
    cityCoordinates[city] ?? [39.8283, -98.5795];

  const position: [number, number] = [
    base[0] + jitter(seed),
    base[1] + jitter(seed * 7),
  ];

  const originPosition: [number, number] = [
    position[0] - 0.35,
    position[1] - 0.45,
  ];

  const destinationPosition: [number, number] = [
    position[0] + 0.35,
    position[1] + 0.45,
  ];

  return {
    position,
    originPosition,
    destinationPosition,
  };
}