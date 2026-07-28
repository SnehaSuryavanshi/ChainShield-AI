import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Shipment {
  "AI Risk": string;
}

interface RiskDistributionChartProps {
  shipments: Shipment[];
}

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const RiskDistributionChart = ({
  shipments,
}: RiskDistributionChartProps) => {
  const low = shipments.filter(
    (shipment) => shipment["AI Risk"] === "Low"
  ).length;

  const medium = shipments.filter(
    (shipment) => shipment["AI Risk"] === "Medium"
  ).length;

  const high = shipments.filter(
    (shipment) => shipment["AI Risk"] === "High"
  ).length;

  const data = [
    { name: "Low", value: low },
    { name: "Medium", value: medium },
    { name: "High", value: high },
  ];

  return (
    <>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: 20 }}>Risk Distribution</h3>
        <p style={{ color: "#94a3b8", fontSize: 13 }}>
          Current shipment risk levels
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={4}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default RiskDistributionChart;