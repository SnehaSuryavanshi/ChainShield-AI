import Card from "../ui/Card";
import "./KPICard.css";

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
}

const KPICard = ({
  title,
  value,
  change,
  icon,
}: KPICardProps) => {
  return (
    <Card className="kpi-card">

      <div className="kpi-top">

        <div>

          <p className="kpi-title">
            {title}
          </p>

          <h2>{value}</h2>

        </div>

        <div className="kpi-icon">
          {icon}
        </div>

      </div>

      <p className="kpi-change">
        {change}
      </p>

    </Card>
  );
};

export default KPICard;