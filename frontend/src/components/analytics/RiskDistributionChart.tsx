import "./RiskDistributionChart.css";
import CustomTooltip from "./CustomTooltip";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface RiskDistributionChartProps {
  shipments: any[];
}

const COLORS = [
  "#22c55e",
  "#facc15",
  "#ef4444",
];

const RiskDistributionChart = ({
  shipments,
}: RiskDistributionChartProps) => {
  const data = [
    {
      name: "Low Risk",
      value: shipments.filter(
        (shipment) => shipment["AI Risk"] === "Low"
      ).length,
    },
    {
      name: "Medium Risk",
      value: shipments.filter(
        (shipment) => shipment["AI Risk"] === "Medium"
      ).length,
    },
    {
      name: "High Risk",
      value: shipments.filter(
        (shipment) => shipment["AI Risk"] === "High"
      ).length,
    },
  ];

  return (
    <div className="chart-card">
      <h3>Risk Distribution</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={60}
            paddingAngle={4}
            isAnimationActive
            animationDuration={1200}
            animationBegin={200}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskDistributionChart;