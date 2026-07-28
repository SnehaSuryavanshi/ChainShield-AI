import "./Analytics.css";
import { useEffect, useState } from "react";

import { getShipments } from "../services/api";

import AnalyticsGrid from "../components/analytics/AnalyticsGrid";
import RiskDistributionChart from "../components/analytics/RiskDistributionChart";
import TransportModeChart from "../components/analytics/TransportModeChart";
import ShipmentTrendChart from "../components/analytics/ShipmentTrendChart";
import AIInsightsCard from "../components/analytics/AIInsightsCard";
import RecentPredictionsTable from "../components/analytics/RecentPredictionsTable";

const Analytics = () => {
  const [shipments, setShipments] = useState<any[]>([]);

  useEffect(() => {
    async function loadShipments() {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (error) {
        console.error("Failed to load shipments:", error);
      }
    }

    loadShipments();
  }, []);

  return (
    <div className="analytics-page">
      <div className="page-container">

        <AnalyticsGrid shipments={shipments} />

        <div className="analytics-chart-grid">
          <RiskDistributionChart shipments={shipments} />
          <TransportModeChart shipments={shipments} />
        </div>

        <ShipmentTrendChart shipments={shipments} />

        <AIInsightsCard shipments={shipments} />

        <RecentPredictionsTable shipments={shipments} />

      </div>
    </div>
  );
};

export default Analytics;