export interface TrackingShipment {
  id: string;
  driver: string;
  vehicle: string;

  origin: string;
  destination: string;

  eta: string;
  speed: string;

  risk: "Low" | "Medium" | "High";
  status: "In Transit" | "Delayed" | "Delivered";

  // Current truck location
  position: [number, number];

  // Route start
  originPosition: [number, number];

  // Route destination
  destinationPosition: [number, number];
}

export const trackingShipments: TrackingShipment[] = [
  {
    id: "SH-1001",
    driver: "Rahul Sharma",
    vehicle: "MH12AB1234",

    origin: "Pune",
    destination: "Mumbai",

    eta: "2h 15m",
    speed: "62 km/h",

    risk: "Low",
    status: "In Transit",

    position: [18.5204, 73.8567],

    originPosition: [18.5204, 73.8567],
    destinationPosition: [19.0760, 72.8777],
  },

  {
    id: "SH-1002",
    driver: "Amit Verma",
    vehicle: "MH14XY9876",

    origin: "Nagpur",
    destination: "Hyderabad",

    eta: "4h 10m",
    speed: "55 km/h",

    risk: "Medium",
    status: "In Transit",

    position: [21.1458, 79.0882],

    originPosition: [21.1458, 79.0882],
    destinationPosition: [17.3850, 78.4867],
  },

  {
    id: "SH-1003",
    driver: "Priya Singh",
    vehicle: "MH20PQ4321",

    origin: "Nashik",
    destination: "Aurangabad",

    eta: "1h 40m",
    speed: "48 km/h",

    risk: "High",
    status: "Delayed",

    position: [19.9975, 73.7898],

    originPosition: [19.9975, 73.7898],
    destinationPosition: [19.8762, 75.3433],
  },

  {
    id: "SH-1004",
    driver: "Rohan Patil",
    vehicle: "MH43JK6789",

    origin: "Kolhapur",
    destination: "Pune",

    eta: "3h 05m",
    speed: "66 km/h",

    risk: "Low",
    status: "In Transit",

    position: [16.7050, 74.2433],

    originPosition: [16.7050, 74.2433],
    destinationPosition: [18.5204, 73.8567],
  },
];