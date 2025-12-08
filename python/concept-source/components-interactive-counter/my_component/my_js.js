export default function ({
    parentElement,
    setStateValue,
    setTriggerValue,
    data,
}) {
    let count = data?.initialCount || 0;
    const display = parentElement.querySelector("#display");
    const incrementBtn = parentElement.querySelector("#increment");
    const decrementBtn = parentElement.querySelector("#decrement");
    const resetBtn = parentElement.querySelector("#reset");

    const updateDisplay = () => {
        display.textContent = count;
        setStateValue("count", count); // Persistent state
    };

    incrementBtn.onclick = () => {
        count++;
        updateDisplay();
    };

    decrementBtn.onclick = () => {
        count--;
        updateDisplay();
    };

    resetBtn.onclick = () => {
        count = 0;
        updateDisplay();
        setTriggerValue("reset", true); // One-time trigger
    };

    // Initialize
    updateDisplay();

    // Cleanup function
    return () => {
        incrementBtn.removeEventListener("click", incrementBtn.onclick);
        decrementBtn.removeEventListener("click", decrementBtn.onclick);
        resetBtn.removeEventListener("click", resetBtn.onclick);
    };
}
