import "./FeatureImportanceChart.css";
import CustomTooltip from "./CustomTooltip";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { feature: "Weather", importance: 92 },
  { feature: "Route Distance", importance: 87 },
  { feature: "Traffic", importance: 79 },
  { feature: "Transport Mode", importance: 74 },
  { feature: "Shipment Value", importance: 61 },
  { feature: "Delivery Deadline", importance: 53 },
];

const FeatureImportanceChart = () => {
  return (
    <div className="feature-chart-card">
      <h3>Feature Importance</h3>
      <p className="chart-subtitle">
        Factors influencing AI prediction decisions
      </p>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            type="number"
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            type="category"
            dataKey="feature"
            stroke="#cbd5e1"
            tickLine={false}
            axisLine={false}
            width={120}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="importance"
            name="Importance (%)"
            fill="#3b82f6"
            radius={[0, 8, 8, 0]}
            animationDuration={1200}
            animationBegin={200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;