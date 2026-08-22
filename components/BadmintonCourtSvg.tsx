export default function BadmintonCourtSvg(
    { color, opacity }: { color?: string, opacity?: number }
) {
    return (
        <div className="absolute inset-0 flex items-center justify-center [perspective:800px]">
            <div className={`h-[150%] w-[150%] translate-y-[2%] opacity-${opacity || 30} [transform:rotateX(62deg)_rotateZ(-22deg)]`}>
                <svg
                    viewBox="0 0 1340 610"
                    className="h-full w-full max-w-none"
                    fill="none"
                    stroke={color || "var(--sidebar-primary)"}
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    aria-hidden="true"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Court boundary */}
                    <rect
                        x="0"
                        y="0"
                        width="1340"
                        height="610"
                    />

                    {/* Doubles sidelines */}
                    <line
                        x1="0"
                        y1="46"
                        x2="1340"
                        y2="46"
                    />
                    <line
                        x1="0"
                        y1="564"
                        x2="1340"
                        y2="564"
                    />

                    {/* Net */}
                    <line
                        x1="670"
                        y1="0"
                        x2="670"
                        y2="610"
                        strokeWidth="5"
                    />

                    {/* Singles sidelines */}
                    <line
                        x1="472"
                        y1="0"
                        x2="472"
                        y2="610"
                    />
                    <line
                        x1="868"
                        y1="0"
                        x2="868"
                        y2="610"
                    />

                    {/* Short service lines */}
                    <line
                        x1="76"
                        y1="0"
                        x2="76"
                        y2="610"
                    />
                    <line
                        x1="1264"
                        y1="0"
                        x2="1264"
                        y2="610"
                    />

                    {/* Center service lines */}
                    <line
                        x1="0"
                        y1="305"
                        x2="472"
                        y2="305"
                    />
                    <line
                        x1="868"
                        y1="305"
                        x2="1340"
                        y2="305"
                    />
                </svg>
            </div>
        </div>
    )
}