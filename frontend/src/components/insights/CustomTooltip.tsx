interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
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
      }}
    >
      <div
        style={{
          color: "#ffffff",
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        {payload[0].name}
      </div>

      <div
        style={{
          color: "#cbd5e1",
        }}
      >
        {payload[0].value}%
      </div>
    </div>
  );
};

export default CustomTooltip;