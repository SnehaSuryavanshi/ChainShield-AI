import "./ConfidenceDistributionChart.css";
import CustomTooltip from "./CustomTooltip";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

interface ConfidenceDistributionChartProps {
  shipments: any[];
}

const colors = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
];

const ConfidenceDistributionChart = ({
  shipments,
}: ConfidenceDistributionChartProps) => {
  const data = [
    {
      level: "Very High",
      confidence: shipments.filter(
        (s) => s["Confidence"] >= 90
      ).length,
    },
    {
      level: "High",
      confidence: shipments.filter(
        (s) =>
          s["Confidence"] >= 75 &&
          s["Confidence"] < 90
      ).length,
    },
    {
      level: "Medium",
      confidence: shipments.filter(
        (s) =>
          s["Confidence"] >= 50 &&
          s["Confidence"] < 75
      ).length,
    },
    {
      level: "Low",
      confidence: shipments.filter(
        (s) => s["Confidence"] < 50
      ).length,
    },
  ];

  return (
    <div className="confidence-chart-card">
      <h3>Prediction Confidence Distribution</h3>

      <p className="chart-subtitle">
        Distribution of AI confidence across recent predictions
      </p>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="level"
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="confidence"
            radius={[10, 10, 0, 0]}
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.level}
                fill={colors[index]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConfidenceDistributionChart;