import DelayTrendChart from "../charts/DelayTrendChart";
import RiskDistributionChart from "../charts/RiskDistributionChart";
import "./DashboardCharts.css";

interface Shipment {
  "Order Date": string;
  "Late Delivery Risk": number;
  "AI Risk": string;
}

interface DashboardChartsProps {
  shipments: Shipment[];
}

const DashboardCharts = ({ shipments }: DashboardChartsProps) => {
  return (
    <section className="dashboard-charts">
      <div className="chart-wrapper">
        <DelayTrendChart shipments={shipments} />
      </div>

      <div className="chart-wrapper">
        <RiskDistributionChart shipments={shipments} />
      </div>
    </section>
  );
};

export default DashboardCharts;