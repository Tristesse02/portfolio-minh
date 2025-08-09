type Props = {
  size?: number; // px width
  color?: string; // CSS color or currentColor
  playing?: boolean; // animate or show static bars
  className?: string;
};

export default function Equalizer({
  size = 18,
  color = "currentColor",
  playing = true,
  className,
}: Props) {
  // maintain the same aspect ratio as the SVG (18 x 14)
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
      {[
        { x: 0, y: 4, h: 10, delay: "0s" },
        { x: 5, y: 2, h: 12, delay: "-.2s" },
        { x: 10, y: 6, h: 8, delay: "-.4s" },
        { x: 15, y: 3, h: 11, delay: "-.1s" },
      ].map(({ x, y, h, delay }, i) => (
        <rect key={i} x={x} y={y} width="3" height={h} fill="currentColor">
          {playing && (
            <>
              <animate
                attributeName="height"
                values="3;14;3"
                dur="0.9s"
                begin={delay}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="11;0;11"
                dur="0.9s"
                begin={delay}
                repeatCount="indefinite"
              />
            </>
          )}
        </rect>
      ))}
    </svg>
  );
}
