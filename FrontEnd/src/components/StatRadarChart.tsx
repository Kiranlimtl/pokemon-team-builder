const StatRadarChart = ({
  data,
}: {
  data: { stat: string; value: number }[];
}) => {
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const levels = 5;
  const maxValue = 900;

  const angleSlice = (Math.PI * 2) / data.length;

  const getX = (value: number, i: number) =>
    cx + ((radius * value) / maxValue) * Math.cos(angleSlice * i - Math.PI / 2);
  const getY = (value: number, i: number) =>
    cy + ((radius * value) / maxValue) * Math.sin(angleSlice * i - Math.PI / 2);

  const points = data
    .map((d, i) => `${getX(d.value, i)},${getY(d.value, i)}`)
    .join(' ');

  return (
    <svg
      width="100%"
      style={{ maxWidth: `${size}px` }}
      viewBox={`-60 -20 ${size + 120} ${size + 40}`}
    >
      {/* Grid circles */}
      {Array.from({ length: levels }, (_, i) => (
        <polygon
          key={i}
          points={data
            .map(
              (_, j) =>
                `${getX((maxValue * (i + 1)) / levels, j)},${getY((maxValue * (i + 1)) / levels, j)}`,
            )
            .join(' ')}
          fill="none"
          stroke="#ccc"
          strokeWidth={0.5}
        />
      ))}
      {/* Axis lines */}
      {data.map((_, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={getX(maxValue, i)}
          y2={getY(maxValue, i)}
          stroke="#ccc"
          strokeWidth={0.5}
        />
      ))}
      {/* Data polygon */}
      <polygon
        points={points}
        fill="#6F35FC"
        fillOpacity={0.3}
        stroke="#6F35FC"
        strokeWidth={2}
      />
      {/* Data points */}
      {data.map((d, i) => (
        <circle
          key={i}
          cx={getX(d.value, i)}
          cy={getY(d.value, i)}
          r={3}
          fill="#6F35FC"
        />
      ))}
      {/* Labels */}
      {data.map((d, i) => {
        const lx = getX(maxValue * 1.6, i);
        const ly = getY(maxValue * 1.6, i);
        const avg = data.reduce((sum, s) => sum + s.value, 0) / data.length;
        const color =
          d.value >= avg * 1.2
            ? '#4ADE80'
            : d.value <= avg * 0.5
              ? '#EF4444'
              : d.value <= avg * 0.8
                ? '#FACC15'
                : '#ffffff';
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            className="radar-label"
            fontWeight="bold"
          >
            <tspan fill="#ffffff">{d.stat} </tspan>
            <tspan fill={color}>({d.value})</tspan>
          </text>
        );
      })}
    </svg>
  );
};

export default StatRadarChart;
