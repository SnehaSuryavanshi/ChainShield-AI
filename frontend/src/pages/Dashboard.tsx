import { useEffect, useState } from "react";

import KPISection from "../components/dashboard/KPISection";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import RecentShipments from "../components/dashboard/RecentShipments";
import AIInsights from "../components/dashboard/AIInsights";

import { getShipments } from "../services/api";

interface Shipment {
  "Order Id": number;
  "Customer City": string;
  "Customer Country": string;
  "Order Region": string;
  "Shipping Mode": string;
  "Order Status": string;
  "Sales": number;
  "Order Date": string;
  "Shipping Date": string;
  "Late Delivery Risk": number;
  "AI Risk": string;
  Confidence: number;
  Prediction: number;
}

const Dashboard = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (error) {
        console.error("Failed to fetch shipments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <>
      <KPISection shipments={shipments} />

      <DashboardCharts shipments={shipments} />

      <RecentShipments shipments={shipments} />

      <AIInsights shipments={shipments} />
    </>
  );
};

export default Dashboard;