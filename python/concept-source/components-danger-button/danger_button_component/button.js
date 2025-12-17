const HOLD_DURATION = 2000; // 2 seconds
const COOLDOWN_DURATION = 1500; // cooldown after trigger
const CIRCUMFERENCE = 2 * Math.PI * 45; // circle circumference

export default function ({ parentElement, setTriggerValue }) {
    const button = parentElement.querySelector("#danger-btn");
    const progress = parentElement.querySelector("#ring-progress");
    const icon = parentElement.querySelector("#icon");
    const label = parentElement.querySelector("#label");

    let startTime = null;
    let animationFrame = null;
    let isDisabled = false; // Prevent interaction during cooldown

    function updateProgress() {
        if (!startTime) return;

        const elapsed = Date.now() - startTime;
        const progressPercent = Math.min(elapsed / HOLD_DURATION, 1);
        const offset = CIRCUMFERENCE * (1 - progressPercent);

        progress.style.strokeDashoffset = offset;

        if (progressPercent >= 1) {
            // Triggered!
            triggerAction();
        } else {
            animationFrame = requestAnimationFrame(updateProgress);
        }
    }

    function startHold() {
        if (isDisabled) return; // Ignore if in cooldown

        startTime = Date.now();
        button.classList.add("holding");
        label.textContent = "Keep holding...";
        animationFrame = requestAnimationFrame(updateProgress);
    }

    function cancelHold() {
        if (isDisabled) return; // Ignore if in cooldown

        startTime = null;
        button.classList.remove("holding");
        label.textContent = "Hold to Delete";
        progress.style.strokeDashoffset = CIRCUMFERENCE;

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    function triggerAction() {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
        startTime = null;
        isDisabled = true; // Disable during cooldown

        button.classList.remove("holding");
        button.classList.add("triggered");
        button.disabled = true;

        icon.textContent = "✓";
        label.textContent = "Deleted!";
        progress.style.strokeDashoffset = 0;

        // Send trigger to Python
        setTriggerValue("confirmed", true);

        // Reset after cooldown
        setTimeout(() => {
            button.classList.remove("triggered");
            button.disabled = false;
            isDisabled = false;
            icon.textContent = "🗑️";
            label.textContent = "Hold to Delete";
            progress.style.strokeDashoffset = CIRCUMFERENCE;
        }, COOLDOWN_DURATION);
    }

    function handleTouchStart(e) {
        e.preventDefault();
        startHold();
    }

    // Mouse events
    button.addEventListener("mousedown", startHold);
    button.addEventListener("mouseup", cancelHold);
    button.addEventListener("mouseleave", cancelHold);

    // Touch events for mobile
    button.addEventListener("touchstart", handleTouchStart);
    button.addEventListener("touchend", cancelHold);
    button.addEventListener("touchcancel", cancelHold);

    return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);

        // Remove mouse event listeners
        button.removeEventListener("mousedown", startHold);
        button.removeEventListener("mouseup", cancelHold);
        button.removeEventListener("mouseleave", cancelHold);

        // Remove touch event listeners
        button.removeEventListener("touchstart", handleTouchStart);
        button.removeEventListener("touchend", cancelHold);
        button.removeEventListener("touchcancel", cancelHold);
    };
}
