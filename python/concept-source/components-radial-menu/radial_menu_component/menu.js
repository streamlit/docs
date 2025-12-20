export default function ({ parentElement, data, setStateValue }) {
    const selector = parentElement.querySelector("#selector");
    const selectorIcon = parentElement.querySelector("#selector-icon");
    const overlay = parentElement.querySelector("#overlay");
    const ring = parentElement.querySelector("#ring");

    let isOpen = false;
    const options = data?.options || {};
    let currentSelection = data?.selection || Object.keys(options)[0];

    // Create the 6 menu items from options
    Object.entries(options).forEach(([value, icon], index) => {
        const button = document.createElement("button");
        button.className = "menu-item";
        button.dataset.value = value;
        button.style.setProperty("--i", index);
        button.textContent = icon;

        button.addEventListener("click", () => {
            currentSelection = value;
            updateDisplay();
            toggleMenu();
            setStateValue("selection", currentSelection);
        });

        ring.appendChild(button);
    });

    // Update the selector icon and highlight selected item
    function updateDisplay() {
        selectorIcon.textContent = options[currentSelection] || "?";

        ring.querySelectorAll(".menu-item").forEach((item) => {
            item.classList.toggle(
                "selected",
                item.dataset.value === currentSelection,
            );
        });
    }

    // Toggle menu open/closed
    function toggleMenu() {
        isOpen = !isOpen;
        overlay.classList.toggle("open", isOpen);
        ring.classList.toggle("open", isOpen);

        if (isOpen) {
            // Calculate viewport-safe position
            const selectorRect = selector.getBoundingClientRect();
            const menuRadius = ring.offsetWidth / 2;
            const toolbarHeight = 60; // Streamlit toolbar height

            // Center of selector in viewport
            const centerX = selectorRect.left + selectorRect.width / 2;
            const centerY = selectorRect.top + selectorRect.height / 2;

            // Calculate overflow on each side (account for toolbar at top)
            const overflowLeft = menuRadius - centerX;
            const overflowRight = centerX + menuRadius - window.innerWidth;
            const overflowTop = menuRadius - (centerY - toolbarHeight);
            const overflowBottom = centerY + menuRadius - window.innerHeight;

            // Apply offset to keep menu in viewport
            const offsetX =
                Math.max(0, overflowLeft) - Math.max(0, overflowRight);
            const offsetY =
                Math.max(0, overflowTop) - Math.max(0, overflowBottom);

            overlay.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        } else {
            // Reset position after close animation completes (400ms matches CSS transition)
            setTimeout(() => {
                if (!isOpen) overlay.style.transform = "";
            }, 400);
        }
    }

    // Initialize display
    updateDisplay();

    // Selector click toggles menu
    selector.addEventListener("click", toggleMenu);

    // Click outside closes menu
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) toggleMenu();
    });
}
