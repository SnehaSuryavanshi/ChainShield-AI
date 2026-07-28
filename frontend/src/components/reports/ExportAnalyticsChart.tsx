import "./ExportAnalyticsChart.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

interface ExportAnalyticsChartProps {
  shipments: any[];
}

const COLORS = [
  "#22c55e",
  "#facc15",
  "#ef4444",
];

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

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="custom-tooltip">
      <p>{payload[0].name}</p>
      <span>{payload[0].value}</span>
    </div>
  );
};

const ExportAnalyticsChart = ({
  shipments,
}: ExportAnalyticsChartProps) => {
  const riskData = [
    {
      name: "Low Risk",
      value: shipments.filter(
        (s) => s["AI Risk"] === "Low"
      ).length,
      color: COLORS[0],
    },
    {
      name: "Medium Risk",
      value: shipments.filter(
        (s) => s["AI Risk"] === "Medium"
      ).length,
      color: COLORS[1],
    },
    {
      name: "High Risk",
      value: shipments.filter(
        (s) => s["AI Risk"] === "High"
      ).length,
      color: COLORS[2],
    },
  ];

  const monthCounts: Record<string, number> = {};

  MONTHS.forEach((month) => {
    monthCounts[month] = 0;
  });

  shipments.forEach((shipment) => {
    const date = shipment["Order Date"];

    if (!date) return;

    const parsed = new Date(date);

    if (isNaN(parsed.getTime())) return;

    monthCounts[MONTHS[parsed.getMonth()]]++;
  });

  const monthlyData = MONTHS.map((month) => ({
    month,
    shipments: monthCounts[month],
  }));

  return (
    <div className="export-analytics-grid">

      <div className="chart-card">

        <div className="chart-header">
          <h3>Risk Distribution</h3>
          <p>AI prediction breakdown.</p>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={riskData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
            >
              {riskData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="custom-legend">
          {riskData.map((item) => (
            <div className="legend-item" key={item.name}>
              <span
                className="legend-color"
                style={{ background: item.color }}
              />

              <span>{item.name}</span>
            </div>
          ))}
        </div>

      </div>

      <div className="chart-card">

        <div className="chart-header">
          <h3>Monthly Shipments</h3>
          <p>Shipment volume by month.</p>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="shipments"
              radius={[10, 10, 0, 0]}
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ExportAnalyticsChart;