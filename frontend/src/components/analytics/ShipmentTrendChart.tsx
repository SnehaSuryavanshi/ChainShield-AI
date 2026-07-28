import "./ShipmentTrendChart.css";
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

interface ShipmentTrendChartProps {
  shipments: any[];
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ShipmentTrendChart = ({
  shipments,
}: ShipmentTrendChartProps) => {
  const monthlyData: Record<
    string,
    {
      shipments: number;
      delayed: number;
      highRisk: number;
    }
  > = {};

  MONTHS.forEach((month) => {
    monthlyData[month] = {
      shipments: 0,
      delayed: 0,
      highRisk: 0,
    };
  });

  shipments.forEach((shipment) => {
    const date = shipment["Order Date"];

    if (!date) return;

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return;

    const month = MONTHS[parsedDate.getMonth()];

    monthlyData[month].shipments++;

    if (shipment["Prediction"] === 1) {
      monthlyData[month].delayed++;
    }

    if (shipment["AI Risk"] === "High") {
      monthlyData[month].highRisk++;
    }
  });

  const data = MONTHS.map((month) => ({
    month,
    ...monthlyData[month],
  }));

  return (
    <div className="trend-chart-card">
      <h3>Monthly Shipment Trends</h3>

      <ResponsiveContainer width="100%" height={350}>
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
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend />

          <Line
            type="monotone"
            dataKey="shipments"
            name="Shipments"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            animationDuration={1500}
            animationBegin={200}
          />

          <Line
            type="monotone"
            dataKey="delayed"
            name="Delayed"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            animationDuration={1500}
            animationBegin={200}
          />

          <Line
            type="monotone"
            dataKey="highRisk"
            name="High Risk"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4 }}
            animationDuration={1500}
            animationBegin={200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShipmentTrendChart;