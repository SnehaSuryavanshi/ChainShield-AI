import "./Reports.css";
import { useEffect, useState } from "react";

import { getShipments } from "../services/api";

import ReportsSummaryGrid from "../components/reports/ReportsSummaryGrid";
import ReportFilters from "../components/reports/ReportFilters";
import RecentReportsTable from "../components/reports/RecentReportsTable";
import ExportAnalyticsChart from "../components/reports/ExportAnalyticsChart";
import AIRecommendations from "../components/reports/AIRecommendations";

const Reports = () => {
  const [shipments, setShipments] = useState<any[]>([]);

  useEffect(() => {
    async function loadShipments() {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (error) {
        console.error("Failed to load reports:", error);
      }
    }

    loadShipments();
  }, []);

  return (
    <div className="reports-page">

      <ReportsSummaryGrid shipments={shipments} />

      <ReportFilters />

      <RecentReportsTable shipments={shipments} />

      <ExportAnalyticsChart shipments={shipments} />

      <AIRecommendations shipments={shipments} />

    </div>
  );
};

export default Reports;