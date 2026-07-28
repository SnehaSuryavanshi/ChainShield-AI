import "./PerformanceTrendChart.css";
import CustomTooltip from "./CustomTooltip";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", accuracy: 89, precision: 87, recall: 84 },
  { month: "Feb", accuracy: 90, precision: 88, recall: 85 },
  { month: "Mar", accuracy: 92, precision: 90, recall: 88 },
  { month: "Apr", accuracy: 93, precision: 91, recall: 90 },
  { month: "May", accuracy: 95, precision: 93, recall: 91 },
  { month: "Jun", accuracy: 96.8, precision: 94.2, recall: 92.7 },
];

const PerformanceTrendChart = () => {
  return (
    <div className="performance-chart-card">
      <h3>Model Performance Trend</h3>

      <p className="chart-subtitle">
        Accuracy, precision and recall over the last six months
      </p>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data}>
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[80, 100]}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend />

          <Line
            type="monotone"
            dataKey="accuracy"
            name="Accuracy"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            animationDuration={1500}
            animationBegin={200}
          />

          <Line
            type="monotone"
            dataKey="precision"
            name="Precision"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            animationDuration={1500}
            animationBegin={350}
          />

          <Line
            type="monotone"
            dataKey="recall"
            name="Recall"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 4 }}
            animationDuration={1500}
            animationBegin={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceTrendChart;