export default function ({
  parentElement,
  data,
  setStateValue,
  setTriggerValue,
}) {
  const minutes = parentElement.querySelector("#minutes");
  const seconds = parentElement.querySelector("#seconds");
  const centiseconds = parentElement.querySelector("#centiseconds");
  const ringProgress = parentElement.querySelector("#ring-progress");
  const startBtn = parentElement.querySelector("#start-btn");
  const lapBtn = parentElement.querySelector("#lap-btn");
  const resetBtn = parentElement.querySelector("#reset-btn");
  const lapList = parentElement.querySelector("#lap-list");

  const CIRCUMFERENCE = 2 * Math.PI * 90;

  // Initialize from state or defaults
  let elapsedMs = data?.elapsed || 0;
  let isRunning = data?.running || false;
  let laps = data?.laps || [];
  let lastTimestamp = null;
  let animationFrame = null;

  let lastMinute = Math.floor(elapsedMs / 60000);
  let isTransitioning = false;

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const cents = Math.floor((ms % 1000) / 10);
    return {
      mins: String(mins).padStart(2, "0"),
      secs: String(secs).padStart(2, "0"),
      cents: String(cents).padStart(2, "0"),
    };
  }

  function updateDisplay() {
    const time = formatTime(elapsedMs);
    minutes.textContent = time.mins;
    seconds.textContent = time.secs;
    centiseconds.textContent = time.cents;

    const currentMinute = Math.floor(elapsedMs / 60000);
    const secondsInMinute = (elapsedMs % 60000) / 1000;

    // Arc length: 0 at second 0, full circle at second 60
    const arcLength = (secondsInMinute / 60) * CIRCUMFERENCE;

    // Detect minute boundary - quick fade transition
    if (currentMinute > lastMinute && !isTransitioning) {
      lastMinute = currentMinute;
      isTransitioning = true;

      // Quick fade out
      ringProgress.style.transition = "opacity 0.15s ease-out";
      ringProgress.style.opacity = "0";

      setTimeout(() => {
        // Reset to small arc while invisible
        ringProgress.style.transition = "none";
        ringProgress.style.strokeDasharray = `${arcLength} ${CIRCUMFERENCE}`;
        ringProgress.style.strokeDashoffset = 0;

        // Fade back in
        requestAnimationFrame(() => {
          ringProgress.style.transition = "opacity 0.15s ease-in";
          ringProgress.style.opacity = "1";

          setTimeout(() => {
            ringProgress.style.transition = "";
            isTransitioning = false;
          }, 150);
        });
      }, 150);
    }

    // Normal ring update
    if (!isTransitioning) {
      ringProgress.style.strokeDasharray = `${arcLength} ${CIRCUMFERENCE}`;
      ringProgress.style.strokeDashoffset = 0;
    }
  }

  function updateButtons() {
    startBtn.querySelector(".btn-icon").textContent = isRunning ? "⏸" : "▶";
    startBtn.querySelector(".btn-label").textContent = isRunning
      ? "Pause"
      : "Start";
    startBtn.classList.toggle("running", isRunning);
    ringProgress.classList.toggle("running", isRunning);

    lapBtn.disabled = !isRunning;
    resetBtn.disabled = isRunning || elapsedMs === 0;
  }

  function renderLaps() {
    lapList.innerHTML = "";

    if (laps.length === 0) return;

    // Calculate deltas and find fastest/slowest
    const deltas = laps.map((lap, i) => {
      return i === 0 ? lap : lap - laps[i - 1];
    });

    const minDelta = Math.min(...deltas);
    const maxDelta = Math.max(...deltas);

    // Render in reverse (newest first)
    [...laps].reverse().forEach((lap, reverseIdx) => {
      const idx = laps.length - 1 - reverseIdx;
      const delta = deltas[idx];
      const time = formatTime(lap);
      const deltaTime = formatTime(delta);

      let deltaClass = "";
      if (laps.length > 1) {
        if (delta === minDelta) deltaClass = "fastest";
        else if (delta === maxDelta) deltaClass = "slowest";
      }

      const item = document.createElement("div");
      item.className = "lap-item";
      item.innerHTML = `
                <span class="lap-number">Lap ${idx + 1}</span>
                <span class="lap-delta ${deltaClass}">+${deltaTime.mins}:${deltaTime.secs}.${deltaTime.cents}</span>
                <span class="lap-time">${time.mins}:${time.secs}.${time.cents}</span>
            `;
      lapList.appendChild(item);
    });
  }

  function tick(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;

    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    elapsedMs += delta;
    updateDisplay();

    if (isRunning) {
      animationFrame = requestAnimationFrame(tick);
    }
  }

  function start() {
    isRunning = true;
    lastTimestamp = null;
    animationFrame = requestAnimationFrame(tick);
    updateButtons();
    setStateValue("running", true);
  }

  function pause() {
    isRunning = false;
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    updateButtons();
    setStateValue("running", false);
    setStateValue("elapsed", elapsedMs);
  }

  function recordLap() {
    laps.push(elapsedMs);
    renderLaps();
    setStateValue("laps", laps);
    const t = formatTime(elapsedMs);
    setTriggerValue("lap", {
      number: laps.length,
      time: elapsedMs,
      formatted: `${t.mins}:${t.secs}.${t.cents}`,
    });
  }

  function reset() {
    elapsedMs = 0;
    laps = [];
    updateDisplay();
    renderLaps();
    updateButtons();
    setStateValue("laps", []);
    setStateValue("elapsed", 0);
    setStateValue("running", false);
    setTriggerValue("reset", true);
  }

  // Event listeners
  startBtn.addEventListener("click", () => {
    if (isRunning) pause();
    else start();
  });

  lapBtn.addEventListener("click", recordLap);
  resetBtn.addEventListener("click", reset);

  // Initialize display
  updateDisplay();
  updateButtons();
  renderLaps();

  // Resume if was running
  if (isRunning) {
    lastTimestamp = null;
    animationFrame = requestAnimationFrame(tick);
  }

  return () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  };
}
