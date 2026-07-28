import "./RiskBreakdownCard.css";

interface RiskBreakdownCardProps {
  delay: number;
  damage: number;
  theft: number;
}

const RiskBreakdownCard = ({
  delay,
  damage,
  theft,
}: RiskBreakdownCardProps) => {
  const risks = [
    { label: "Delay Risk", value: delay },
    { label: "Damage Risk", value: damage },
    { label: "Theft Risk", value: theft },
  ];

  return (
    <div className="risk-breakdown-card">
      <h3>📊 Risk Intelligence</h3>

      {risks.map((risk) => (
        <div className="risk-item" key={risk.label}>
          <div className="risk-header">
            <span>{risk.label}</span>
            <strong>{risk.value}%</strong>
          </div>

          <div className="risk-track">
            <div
              className="risk-fill"
              style={{ width: `${risk.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiskBreakdownCard;