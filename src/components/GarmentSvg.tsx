export function GarmentSvg({
  type,
  color,
  view,
}: {
  type: "tshirt" | "trouser";
  color: string;
  view: "front" | "back";
}) {
  if (type === "tshirt") {
    return (
      <svg viewBox="0 0 400 460" className="h-full w-full drop-shadow-2xl">
        <path
          d="M140 30 L100 50 L30 95 L70 160 L110 135 L110 430 Q200 445 290 430 L290 135 L330 160 L370 95 L300 50 L260 30 Q200 70 140 30 Z"
          fill={color}
          stroke="rgba(0,0,0,.45)"
          strokeWidth="3"
        />
        {view === "front" ? (
          <path
            d="M140 30 Q200 78 260 30 Q200 58 140 30 Z"
            fill="rgba(0,0,0,.28)"
          />
        ) : (
          <path d="M140 30 Q200 46 260 30 Q200 40 140 30 Z" fill="rgba(0,0,0,.25)" />
        )}
        <path d="M110 135 L110 430" stroke="rgba(255,255,255,.07)" strokeWidth="6" />
        <path d="M290 135 L290 430" stroke="rgba(0,0,0,.15)" strokeWidth="8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 460" className="h-full w-full drop-shadow-2xl">
      <path
        d="M120 20 L280 20 L292 200 L300 440 L225 440 L200 240 L175 440 L100 440 L108 200 Z"
        fill={color}
        stroke="rgba(0,0,0,.45)"
        strokeWidth="3"
      />
      <rect x="120" y="20" width="160" height="26" fill="rgba(0,0,0,.25)" />
      {view === "front" && (
        <path d="M200 46 L200 120" stroke="rgba(0,0,0,.3)" strokeWidth="4" />
      )}
      <rect
        x={view === "front" ? 130 : 220}
        y="150"
        width="52"
        height="60"
        rx="6"
        fill="rgba(0,0,0,.18)"
      />
    </svg>
  );
}
