interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      style={{
        background: "rgba(15,23,42,.95)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "16px",
        padding: "14px 16px",
        boxShadow: "0 12px 30px rgba(0,0,0,.35)",
        minWidth: "160px",
      }}
    >
      <div
        style={{
          color: "#ffffff",
          fontWeight: 600,
          marginBottom: "10px",
        }}
      >
        {label}
      </div>

      {payload.map((entry, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            marginBottom: "6px",
            color: "#cbd5e1",
            fontSize: "14px",
          }}
        >
          <span style={{ color: entry.color }}>{entry.name}</span>
          <strong>{entry.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default CustomTooltip;