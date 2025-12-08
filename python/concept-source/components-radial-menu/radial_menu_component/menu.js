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
