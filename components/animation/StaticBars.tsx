export default function StaticBars({
  size = 14,
  color = "#9ca3af", // neutral
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const h = (size * 14) / 18;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 18 14"
      aria-hidden="true"
      className={className}
      style={{ color }}
    >
      <rect x="0" y="8" width="3" height="6" fill="currentColor" opacity=".9" />
      <rect x="5" y="5" width="3" height="9" fill="currentColor" opacity=".7" />
      <rect
        x="10"
        y="10"
        width="3"
        height="4"
        fill="currentColor"
        opacity=".6"
      />
      <rect
        x="15"
        y="6"
        width="3"
        height="8"
        fill="currentColor"
        opacity=".8"
      />
    </svg>
  );
}
