import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Shipment {
  "Order Date": string;
  "Late Delivery Risk": number;
}

interface DelayTrendChartProps {
  shipments: Shipment[];
}

const monthNames = [
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

const DelayTrendChart = ({ shipments }: DelayTrendChartProps) => {
  const monthMap: Record<string, number> = {};

  shipments.forEach((shipment) => {
    const date = new Date(shipment["Order Date"]);

    if (isNaN(date.getTime())) return;

    const month = monthNames[date.getMonth()];

    if (!monthMap[month]) {
      monthMap[month] = 0;
    }

    if (shipment["Late Delivery Risk"] === 1) {
      monthMap[month]++;
    }
  });

  const data = monthNames
    .filter((month) => monthMap[month] !== undefined)
    .map((month) => ({
      month,
      delay: monthMap[month],
    }));

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <h3 style={{ fontSize: 20 }}>Shipment Delay Trend</h3>
          <p style={{ color: "#94a3b8", fontSize: 13 }}>
            Monthly delayed shipments
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="delay"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={{
              r: 5,
              fill: "#3b82f6",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default DelayTrendChart;