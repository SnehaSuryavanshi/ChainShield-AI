import "./TransportModeChart.css";
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

interface TransportModeChartProps {
  shipments: any[];
}

const TransportModeChart = ({
  shipments,
}: TransportModeChartProps) => {
  const modeCounts: Record<string, number> = {};

  shipments.forEach((shipment) => {
    const mode = shipment["Shipping Mode"] ?? "Unknown";

    modeCounts[mode] = (modeCounts[mode] || 0) + 1;
  });

  const data = Object.entries(modeCounts).map(
    ([mode, count]) => ({
      mode,
      count,
    })
  );

  return (
    <div className="chart-card">
      <h3>Transport Mode Analysis</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="mode"
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
            dataKey="count"
            name="Shipments"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
            animationBegin={200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransportModeChart;