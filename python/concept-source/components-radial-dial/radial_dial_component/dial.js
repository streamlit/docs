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

    // Arc parameters
    const cx = 100,
        cy = 95;
    const radius = 75;
    const startAngle = -135; // degrees from vertical
    const endAngle = 135;
    const angleRange = endAngle - startAngle; // 270 degrees

    function polarToCartesian(angle) {
        const rad = ((angle - 90) * Math.PI) / 180;
        return {
            x: cx + radius * Math.cos(rad),
            y: cy + radius * Math.sin(rad),
        };
    }

    function describeArc(start, end) {
        const startPoint = polarToCartesian(start);
        const endPoint = polarToCartesian(end);
        const largeArc = end - start > 180 ? 1 : 0;
        return `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`;
    }

    // Draw background track
    track.setAttribute("d", describeArc(startAngle, endAngle));

    // Draw colored segments (thirds)
    const third = angleRange / 3;
    segmentLow.setAttribute("d", describeArc(startAngle, startAngle + third));
    segmentMid.setAttribute(
        "d",
        describeArc(startAngle + third, startAngle + 2 * third),
    );
    segmentHigh.setAttribute(
        "d",
        describeArc(startAngle + 2 * third, endAngle),
    );

    // Draw tick marks
    const numTicks = 10;
    ticksGroup.innerHTML = "";
    for (let i = 0; i <= numTicks; i++) {
        const angle = startAngle + (angleRange * i) / numTicks;
        const isMajor = i % 5 === 0;
        const innerRadius = isMajor ? radius - 30 : radius - 25;
        const outerRadius = radius - 20;

        const rad = ((angle - 90) * Math.PI) / 180;
        const x1 = cx + innerRadius * Math.cos(rad);
        const y1 = cy + innerRadius * Math.sin(rad);
        const x2 = cx + outerRadius * Math.cos(rad);
        const y2 = cy + outerRadius * Math.sin(rad);

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
        const valueAngle = startAngle + angleRange * percent;

        // Update progress arc
        progress.setAttribute("d", describeArc(startAngle, valueAngle));

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
