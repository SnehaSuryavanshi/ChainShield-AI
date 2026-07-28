import "./ModelInsights.css";
import { useEffect, useState } from "react";

import { getShipments } from "../services/api";

import ModelMetricsGrid from "../components/insights/ModelMetricsGrid";
import FeatureImportanceChart from "../components/insights/FeatureImportanceChart";
import PerformanceTrendChart from "../components/insights/PerformanceTrendChart";
import ConfidenceDistributionChart from "../components/insights/ConfidenceDistributionChart";
import AIExplainabilityCard from "../components/insights/AIExplainabilityCard";
import ModelStatisticsTable from "../components/insights/ModelStatisticsTable";

const ModelInsights = () => {
  const [shipments, setShipments] = useState<any[]>([]);

  useEffect(() => {
    async function loadShipments() {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (error) {
        console.error(
          "Failed to load model insights:",
          error
        );
      }
    }

    loadShipments();
  }, []);

  return (
    <div className="model-insights-page">
      <div className="model-page-container">

        <ModelMetricsGrid shipments={shipments} />

        <FeatureImportanceChart />

        <PerformanceTrendChart />

        <ConfidenceDistributionChart
          shipments={shipments}
        />

        <AIExplainabilityCard />

        <ModelStatisticsTable
          shipments={shipments}
        />

      </div>
    </div>
  );
};

export default ModelInsights;