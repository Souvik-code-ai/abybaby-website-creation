export default function SegmentedRing({
  total,
  seen,
  size = 64,
  activeIdx = -1,
  progress = 0,
}) {
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = total > 1 ? 4 : 0;
  const segmentLength = (circumference - total * gap) / total;

  const unseenColor = "#579F63";
  const seenColor = "#dbdbdb";

  return (
    <svg
      width={size}
      height={size}
      className="absoute top-0 left-0"
      viewBox={`0 0 ${size} ${size}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const dashOffset = circumference / 4 - i * (segmentLength + gap);
        const isDone = i < activeIdx;
        const isActive = i === activeIdx;
        const baseColor = seen ? seenColor : unseenColor;

        return (
          <g key={i}>
            {/* Background segment */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={isDone ? unseenColor : seenColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={dashOffset}
              opacity={activeIdx === -1 ? 1 : 0.3}
            />
            {/* Colored overlay */}
            {activeIdx === -1 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={baseColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={dashOffset}
              />
            )}
            {/* Active progress segment */}
            {isActive && activeIdx !== -1 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={unseenColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${(segmentLength * progress) / 100} ${circumference}`}
                strokeDashoffset={dashOffset}
              />
            )}
            {/* Completed segment */}
            {isDone && activeIdx !== -1 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={unseenColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={dashOffset}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
