type HeartbeatProps = {
  history: number[];
};

export function Heartbeat({ history }: HeartbeatProps) {
  const width = 480;
  const height = 36;
  const min = history.length > 0 ? Math.min(...history) : 0;
  const max = history.length > 0 ? Math.max(...history) : 1;
  const span = Math.max(max - min, 1);

  const points = history.map((slot, index) => {
    const x = history.length === 1 ? width : (index / (history.length - 1)) * width;
    const y = height - ((slot - min) / span) * (height - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg
      className="heartbeat"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Recent Cookie Chain slot movement"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        points={points.join(" ")}
      />
    </svg>
  );
}
