// Arc parameters
const CX = 100;
const CY = 95;
const RADIUS = 75;
const START_ANGLE = -135; // degrees from vertical
const END_ANGLE = 135;
const ANGLE_RANGE = END_ANGLE - START_ANGLE; // 270 degrees

function polarToCartesian(angle) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
        x: CX + RADIUS * Math.cos(rad),
        y: CY + RADIUS * Math.sin(rad),
    };
}

function describeArc(start, end) {
    const startPoint = polarToCartesian(start);
    const endPoint = polarToCartesian(end);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${startPoint.x} ${startPoint.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`;
}

export default function ({ parentElement, data }) {
    const track = parentElement.querySelector("#track");
    const progress = parentElement.querySelector("#progress");
    const segmentLow = parentElement.querySelector("#segment-low");
    const segmentMid = parentElement.querySelector("#segment-mid");
    const segmentHigh = parentElement.querySelector("#segment-high");
    const ticksGroup = parentElement.querySelector("#ticks");
    const needleGroup = parentElement.querySelector("#needle-group");
    const valueEl = parentElement.querySelector("#value");
    const unitEl = parentElement.querySelector("#unit");
    const minLabel = parentElement.querySelector("#min-label");
    const maxLabel = parentElement.querySelector("#max-label");
    const titleEl = parentElement.querySelector("#title");

    // Draw background track
    track.setAttribute("d", describeArc(START_ANGLE, END_ANGLE));

    // Draw colored segments (thirds)
    const third = ANGLE_RANGE / 3;
    segmentLow.setAttribute("d", describeArc(START_ANGLE, START_ANGLE + third));
    segmentMid.setAttribute(
        "d",
        describeArc(START_ANGLE + third, START_ANGLE + 2 * third),
    );
    segmentHigh.setAttribute(
        "d",
        describeArc(START_ANGLE + 2 * third, END_ANGLE),
    );

    // Draw tick marks
    const numTicks = 10;
    ticksGroup.innerHTML = "";
    for (let i = 0; i <= numTicks; i++) {
        const angle = START_ANGLE + (ANGLE_RANGE * i) / numTicks;
        const isMajor = i % 5 === 0;
        const innerRadius = isMajor ? RADIUS - 30 : RADIUS - 25;
        const outerRadius = RADIUS - 20;

        const rad = ((angle - 90) * Math.PI) / 180;
        const x1 = CX + innerRadius * Math.cos(rad);
        const y1 = CY + innerRadius * Math.sin(rad);
        const x2 = CX + outerRadius * Math.cos(rad);
        const y2 = CY + outerRadius * Math.sin(rad);

        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
        );
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        if (isMajor) line.classList.add("major");
        ticksGroup.appendChild(line);
    }

    function update(config) {
        const {
            value = 0,
            min = 0,
            max = 100,
            min_label = String(min),
            max_label = String(max),
            unit = "",
            title = "",
            color_zones = true,
        } = config;

        // Calculate percentage
        const percent = Math.max(0, Math.min(1, (value - min) / (max - min)));

        // Calculate angle for this value
        const valueAngle = START_ANGLE + ANGLE_RANGE * percent;

        // Update progress arc
        progress.setAttribute("d", describeArc(START_ANGLE, valueAngle));

        // Update needle rotation
        needleGroup.style.transform = `rotate(${valueAngle}deg)`;

        // Determine color zone
        let zone = "low";
        if (percent > 0.66) zone = "high";
        else if (percent > 0.33) zone = "mid";

        // Apply color classes if color_zones enabled
        progress.classList.remove("low", "mid", "high");
        valueEl.classList.remove("low", "mid", "high");

        if (color_zones) {
            progress.classList.add(zone);
            valueEl.classList.add(zone);
        }

        // Update text
        valueEl.textContent =
            typeof value === "number"
                ? Number.isInteger(value)
                    ? value
                    : value.toFixed(1)
                : value;
        unitEl.textContent = unit;
        minLabel.textContent = min_label;
        maxLabel.textContent = max_label;
        titleEl.textContent = title;
    }

    // Initial render
    update(data || {});
}
