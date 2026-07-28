import "./ShipmentStatusChart.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import type { Shipment } from "./ShipmentsTable";

interface ShipmentStatusChartProps {
  shipments: Shipment[];
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
];

const ShipmentStatusChart = ({
  shipments,
}: ShipmentStatusChartProps) => {
  const statusData = [
    {
      name: "Delivered",
      value: shipments.filter(
        (s) => s.status === "Delivered"
      ).length,
    },
    {
      name: "In Transit",
      value: shipments.filter(
        (s) => s.status === "In Transit"
      ).length,
    },
    {
      name: "Delayed",
      value: shipments.filter(
        (s) => s.status === "Delayed"
      ).length,
    },
    {
      name: "High Risk",
      value: shipments.filter(
        (s) => s.risk === "High"
      ).length,
    },
  ];

  const riskData = [
    {
      name: "Low",
      count: shipments.filter(
        (s) => s.risk === "Low"
      ).length,
    },
    {
      name: "Medium",
      count: shipments.filter(
        (s) => s.risk === "Medium"
      ).length,
    },
    {
      name: "High",
      count: shipments.filter(
        (s) => s.risk === "High"
      ).length,
    },
    
  ];

  return (
    <div className="shipment-chart-grid">
      <div className="shipment-chart-card">
        <h3>Shipment Status Distribution</h3>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>
            <Pie  
              data={statusData.filter(item => item.value > 0)}
              dataKey="value"
              outerRadius={110}
              label
            >
              {statusData.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="shipment-chart-card">
        <h3>Risk Distribution</h3>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ShipmentStatusChart;