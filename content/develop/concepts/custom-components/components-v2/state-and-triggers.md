---
title: State vs trigger values
slug: /develop/concepts/custom-components/components-v2/state-and-triggers
description: Learn the fundamental difference between state and trigger values in Custom Components v2, and when to use each approach for bidirectional communication.
keywords: custom components v2, state values, trigger values, bidirectional communication, component events, callback functions, setStateValue, setTriggerValue
---

# State versus trigger values

Custom components v2 provides two distinct mechanisms for frontend-to-backend communication, each designed for different use cases. Understanding when to use state values versus trigger values is crucial for building effective interactive components.

## Two communication patterns

### State values: Persistent data

**Purpose**: Represent the current "state" of your component that persists across reruns.

**When to use**: For values that represent ongoing component state like current selections, input values, or configuration settings.

State values have the following behavior:

- Persist across Streamlit reruns.
- Accessible via direct property access on the result object and through Session State (when mounted with a key).
- Updated using `setStateValue(key, value)` in JavaScript.

### Trigger values: Event-based communication

**Purpose**: Signal one-time events or user interactions.

**When to use**: For user actions like clicks, form submissions, or other discrete events.

Trigger values have the following behavior:

- Are transient and only available for one script rerun.
- Reset to `None` after the rerun completes.
- Accessible via direct property access on the result object and through Session State (when mounted with a key).
- Updated using `setTriggerValue(key, value)` in JavaScript.

## Differences at a glance

| Aspect              | State values                                  | Trigger values                           |
| :------------------ | :-------------------------------------------- | :--------------------------------------- |
| Persistence         | Maintained across reruns                      | Only available for one rerun             |
| Use case            | Current component state                       | One-time events/actions                  |
| JavaScript function | `setStateValue(key, value)`                   | `setTriggerValue(key, value)`            |
| Callback execution  | Only if `setStateValue()` _changed_ the value | Every time `setTriggerValue()` is called |

## State values in practice: Radial menu component

State values are perfect for tracking the ongoing state of your component. Here's a practical example that demonstrates using a state value to track a selection. The following code creates a radial menu component that allows the user to select a food item from a list of options. When the user selects an item, the component updates the state value with `setStateValue("selection", currentSelection)`. You can expand or collapse the each code block as needed. For emphasis, the JavaScript and example app code are expanded by default.

For simplicity, this component assumes it will always have six options in its menu, but with a little more code, you can generalize it accept an arbitrary number of items. The complete code provided at the end of this section demonstrates a generalized version that accepts an arbitrary number of items.

For this example, the component is registered in an imported module.

```
project_directory/
├── radial_menu_component/
│   ├── __init__.py
│   ├── menu.css
│   ├── menu.html
│   └── menu.js
└── streamlit_app.py
```

### Radial menu component registration

<Collapse title="radial_menu_component/__init__.py">

```python
from pathlib import Path
import streamlit as st

component_dir = Path(__file__).parent


@st.cache_data
def load_component_code():
    with open(component_dir / "menu.css", "r") as f:
        CSS = f.read()
    with open(component_dir / "menu.html", "r") as f:
        HTML = f.read()
    with open(component_dir / "menu.js", "r") as f:
        JS = f.read()
    return HTML, CSS, JS


HTML, CSS, JS = load_component_code()

radial_menu = st.components.v2.component(
    name="radial_menu",
    html=HTML,
    css=CSS,
    js=JS,
)
```

</Collapse>

### Radial menu HTML code

<Collapse title="radial_menu_component/menu.html">

```markup
<div class="radial-menu">
    <button class="menu-selector" id="selector">
        <span class="selector-icon" id="selector-icon">?</span>
    </button>

    <div class="menu-overlay" id="overlay">
        <div class="menu-ring" id="ring">
            <!-- 6 items generated from data.options -->
        </div>
    </div>
</div>
```

</Collapse>

### Radial menu CSS code

<Collapse title="radial_menu_component/menu.css">

```css
.radial-menu {
  position: relative;
  display: inline-block;
  font-family: var(--st-font);
}

/* The circular selector button and menu items*/
.menu-selector,
.menu-item {
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  border: 2px solid var(--st-border-color);
  cursor: pointer;
  background: var(--st-secondary-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 1.5rem;
}

.menu-selector:hover {
  transform: scale(1.05);
  border-color: var(--st-primary-color);
}

/* Overlay container */
.menu-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  pointer-events: none;
}

/* The ring of menu items */
.menu-ring {
  position: relative;
  width: 13rem;
  height: 13rem;
  transform: scale(0);
  opacity: 0;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease;
}

.menu-ring.open {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}

/* Menu items arranged in a circle (6 items at 60 degree intervals)*/
.menu-item {
  --angle: calc(var(--i) * 60deg - 90deg);

  background: var(--st-background-color);
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -1.6125rem;
  transform: rotate(var(--angle)) translateX(4rem)
    rotate(calc(-1 * var(--angle)));
}

.menu-item:hover {
  transform: rotate(var(--angle)) translateX(4rem)
    rotate(calc(-1 * var(--angle))) scale(1.15);
  border-color: var(--st-primary-color);
  background: var(--st-secondary-background-color);
}

.menu-item.selected {
  border-color: var(--st-primary-color);
  background: var(--st-secondary-background-color);
}

/* Backdrop when menu is open */
.menu-overlay::before {
  content: "";
  position: fixed;
  inset: -100vh -100vw;
  background: var(--st-background-color);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
}

.menu-overlay.open::before {
  opacity: 0.7;
  pointer-events: auto;
}

/* Center decoration */
.menu-ring::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rem;
  height: 2rem;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: var(--st-secondary-background-color);
  border: 2px dashed var(--st-border-color);
  opacity: 0.6;
  box-sizing: border-box;
}
```

</Collapse>

### Radial menu JavaScript code

<Collapse title="radial_menu_component/menu.js" expanded={true} >

```javascript
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
```

</Collapse>

### Radial menu example app

<Collapse title="streamlit_app.py" expanded={true} >

```python
import streamlit as st
from radial_menu_component import radial_menu

st.header("Radial Menu Component")

st.write("Click the button to open the menu. Select your favorite food!")

options = {
    "pizza": "🍕",
    "burger": "🍔",
    "taco": "🌮",
    "ramen": "🍜",
    "sushi": "🍣",
    "salad": "🥗",
}

result = radial_menu(
    data={"options": options, "selection": "burger"},
    default={"selection": "burger"},
    on_selection_change=lambda: None,
    key="food_menu",
)

if result.selection:
    icon = options.get(result.selection, "")
    st.write(f"You selected: **{icon} {result.selection.title()}**")
```

</Collapse>

<Collapse title="Complete code">

```python
import streamlit as st
from my_component import radial_menu

radial_menu = st.components.v2.component(
    name="radial_menu",
    html="""
    <div class="radial-menu">
        <button class="menu-selector" id="selector">
            <span class="selector-icon" id="selector-icon">?</span>
        </button>

        <div class="menu-overlay" id="overlay">
            <div class="menu-ring" id="ring">
                <!-- Items generated dynamically from data.options -->
            </div>
        </div>
    </div>
    """,
    css="""
    .radial-menu {
        position: relative;
        display: inline-block;
        font-family: var(--st-font);
    }

    /* The circular selector button */
    .menu-selector, .menu-item {
        width: 3.25rem;
        height: 3.25rem;
        border-radius: 50%;
        border: 2px solid var(--st-border-color);
        cursor: pointer;
        background: var(--st-secondary-background-color);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        font-size: 1.5rem;
    }

    .menu-selector {
        position: relative;
        z-index: 10;
    }

    .menu-selector:hover {
        transform: scale(1.05);
        border-color: var(--st-primary-color);
    }

    /* Overlay container */
    .menu-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        pointer-events: none;
    }

    /* The ring of menu items */
    .menu-ring {
        position: relative;
        width: 13rem;
        height: 13rem;
        transform: scale(0);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                    opacity 0.2s ease;
    }

    .menu-ring.open {
        transform: scale(1);
        opacity: 1;
        pointer-events: auto;
    }

    /* Individual menu items - dynamic angle based on --i and --total */
    .menu-item {
        --angle: calc(var(--i) * (360deg / var(--total, 6)) - 90deg);
        --radius: 4rem;

        background: var(--st-background-color);
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -1.6125rem;
        transform:
            rotate(var(--angle))
            translate(var(--radius))
            rotate(calc(-1 * var(--angle)));
    }

    .menu-item:hover {
        transform:
            rotate(var(--angle))
            translate(var(--radius))
            rotate(calc(-1 * var(--angle)))
            scale(1.15);
        border-color: var(--st-primary-color);
        background: var(--st-secondary-background-color);
    }

    .menu-item.selected {
        border-color: var(--st-primary-color);
        background: var(--st-secondary-background-color);
    }

    /* Backdrop when menu is open */
    .menu-overlay::before {
        content: '';
        position: fixed;
        inset: -100vh -100vw;
        background: var(--st-background-color);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: -1;
    }

    .menu-overlay.open::before {
        opacity: 0.7;
        pointer-events: auto;
    }

    /* Center decoration */
    .menu-ring::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2rem;
        height: 2rem;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: var(--st-secondary-background-color);
        border: 2px dashed var(--st-border-color);
        opacity: 0.6;
        box-sizing: border-box;
    }
    """,
    js="""
    export default function ({ parentElement, data, setStateValue }) {
        const selector = parentElement.querySelector("#selector");
        const selectorIcon = parentElement.querySelector("#selector-icon");
        const overlay = parentElement.querySelector("#overlay");
        const ring = parentElement.querySelector("#ring");

        let isOpen = false;

        // Get options and selection from data
        const options = data?.options || {};
        let currentSelection = data?.selection || Object.keys(options)[0] || "";

        // Calculate angle step based on number of options
        const optionEntries = Object.entries(options);
        const angleStep = 360 / optionEntries.length;

        // Generate menu items dynamically
        function createMenuItems() {
            ring.innerHTML = "";

            optionEntries.forEach(([value, icon], index) => {
                const button = document.createElement("button");
                button.className = "menu-item";
                button.dataset.value = value;
                button.dataset.icon = icon;
                button.style.setProperty("--i", index);
                button.style.setProperty("--total", optionEntries.length);
                button.innerHTML = `<span class="item-icon">${icon}</span>`;

                button.addEventListener("click", (e) => {
                    e.stopPropagation();
                    currentSelection = value;
                    updateDisplay();
                    closeMenu();
                    setStateValue("selection", currentSelection);
                });

                ring.appendChild(button);
            });
        }

        // Update display based on current selection
        function updateDisplay() {
            const icon = options[currentSelection] || "?";
            selectorIcon.textContent = icon;

            ring.querySelectorAll(".menu-item").forEach((item) => {
                item.classList.remove("selected");
                if (item.dataset.value === currentSelection) {
                    item.classList.add("selected");
                }
            });
        }

        // Calculate position to keep menu in viewport
        function calculatePosition() {
            const selectorRect = selector.getBoundingClientRect();
            const menuRadius = 125;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Extra padding at top for Streamlit header
            const topPadding = 70;
            const edgePadding = 10;

            const centerX = selectorRect.left + selectorRect.width / 2;
            const centerY = selectorRect.top + selectorRect.height / 2;

            let offsetX = 0;
            let offsetY = 0;

            if (centerX - menuRadius < edgePadding) {
                offsetX = menuRadius - centerX + edgePadding;
            } else if (centerX + menuRadius > viewportWidth - edgePadding) {
                offsetX = viewportWidth - edgePadding - menuRadius - centerX;
            }

            if (centerY - menuRadius < topPadding) {
                offsetY = menuRadius - centerY + topPadding;
            } else if (centerY + menuRadius > viewportHeight - edgePadding) {
                offsetY = viewportHeight - edgePadding - menuRadius - centerY;
            }

            return { offsetX, offsetY };
        }

        // Open menu with spring animation
        function openMenu() {
            isOpen = true;
            const { offsetX, offsetY } = calculatePosition();
            overlay.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
            overlay.classList.add("open");
            ring.classList.remove("closing");
            ring.classList.add("open");
        }

        // Close menu with reverse animation
        function closeMenu() {
            isOpen = false;
            ring.classList.remove("open");
            ring.classList.add("closing");
            overlay.classList.remove("open");

            setTimeout(() => {
                ring.classList.remove("closing");
                overlay.style.transform = "translate(-50%, -50%)";
            }, 300);
        }

        // Toggle menu
        function toggleMenu() {
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Initialize
        createMenuItems();
        updateDisplay();

        // Selector click
        selector.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Click on ring background to close
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay || e.target === ring) {
                closeMenu();
            }
        });

        // Click outside to close
        const handleOutsideClick = (e) => {
            if (isOpen && !parentElement.contains(e.target)) {
                closeMenu();
            }
        };
        document.addEventListener("click", handleOutsideClick);

        // Cleanup
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }
    """,
)

st.header("Radial Menu Component")

st.write("Click the button to open the menu. Select your favorite food!")

options = {
    "pizza": "🍕",
    "burger": "🍔",
    "taco": "🌮",
    "ramen": "🍜",
    "sushi": "🍣",
    "salad": "🥗",
}

result = radial_menu(
    data={"options": options, "selection": "burger"},
    default={"selection": "burger"},
    on_selection_change=lambda: None,
    key="food_menu",
)

if result.selection:
    icon = options.get(result.selection, "")
    st.write(f"You selected: **{icon} {result.selection.title()}**")
```

</Collapse>

## Trigger values in practice

Trigger values are ideal for handling discrete user actions. The following example creates a button that requires the user to hold for two seconds to confirm the action. Only when the user continuously holds the button for two seconds will the component update the trigger value with `setTriggerValue("deleted", true)`. The component also displays a progress ring to indicate the user's progress.

```python
import streamlit as st

st.title("Hold-to-Confirm Button")
st.caption("A dangerous action that requires intentional confirmation")

# Track deletion events
if "deleted_items" not in st.session_state:
    st.session_state.deleted_items = []

danger_button = st.components.v2.component(
    name="hold_to_confirm",
    html="""
    <div class="danger-zone">
        <div class="warning-banner">
            <span class="warning-icon">⚠️</span>
            <span class="warning-text">Danger Zone</span>
        </div>

        <button id="danger-btn" class="hold-button">
            <svg class="progress-ring" viewBox="0 0 100 100">
                <circle class="ring-bg" cx="50" cy="50" r="45"/>
                <circle id="ring-progress" class="ring-progress" cx="50" cy="50" r="45"/>
            </svg>
            <div class="button-content">
                <span id="icon" class="icon">🗑️</span>
                <span id="label" class="label">Hold to Delete</span>
            </div>
        </button>

        <p class="hint">Press and hold for 2 seconds to confirm</p>
    </div>
    """,
    css="""
    .danger-zone {
        font-family: var(--st-font);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }

    .warning-banner {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--st-red-background-color);
        border: 1px solid var(--st-red-color);
        border-radius: var(--st-base-radius);
    }

    .warning-icon {
        font-size: 1rem;
    }

    .warning-text {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: var(--st-red-color);
    }

    .hold-button {
        position: relative;
        width: 7.5rem;
        height: 7.5rem;
        padding: 0 2rem;
        border-radius: 50%;
        border: 1px solid var(--st-primary-color);
        background: var(--st-secondary-background-color);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .hold-button:hover {
        transform: scale(1.05);
        border-color: var(--st-red-color);
    }

    .hold-button:active:not(:disabled) {
        transform: scale(0.98);
    }

    .hold-button:disabled {
        cursor: not-allowed;
        opacity: 0.9;
    }

    .hold-button.holding {
        animation: pulse 0.5s ease-in-out infinite;
        border-color: var(--st-red-color);
    }

    .hold-button.triggered {
        animation: success-burst 0.6s ease-out forwards;
    }

    @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 var(--st-red-color); }
        50% { box-shadow: 0 0 0 15px transparent; }
    }

    @keyframes success-burst {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); background: var(--st-red-background-color); }
        100% { transform: scale(1); }
    }

    .progress-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
    }

    .ring-bg {
        fill: none;
        stroke: var(--st-border-color);
        stroke-width: 4;
    }

    .ring-progress {
        fill: none;
        stroke: var(--st-red-color);
        stroke-width: 4;
        stroke-linecap: round;
        stroke-dasharray: 283;
        stroke-dashoffset: 283;
        transition: stroke-dashoffset 0.1s linear;
        filter: drop-shadow(0 0 6px var(--st-red-color));
    }

    .button-content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
    }

    .icon {
        font-size: 2rem;
        transition: transform 0.3s ease;
    }

    .hold-button:hover .icon {
        transform: scale(1.1);
    }

    .hold-button.holding .icon {
        animation: shake 0.15s ease-in-out infinite;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px) rotate(-5deg); }
        75% { transform: translateX(2px) rotate(5deg); }
    }

    .label {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--st-text-color);
        opacity: 0.6;
        transition: all 0.3s ease;
    }

    .hold-button.holding .label {
        color: var(--st-red-color);
        opacity: 1;
    }

    .hold-button.triggered .icon,
    .hold-button.triggered .label {
        color: var(--st-primary-color);
        opacity: 1;
    }

    .hint {
        font-size: 0.7rem;
        color: var(--st-text-color);
        opacity: 0.5;
        margin: 0;
    }
    """,
    js="""
    export default function({ parentElement, setTriggerValue }) {
        const button = parentElement.querySelector("#danger-btn");
        const progress = parentElement.querySelector("#ring-progress");
        const icon = parentElement.querySelector("#icon");
        const label = parentElement.querySelector("#label");

        const HOLD_DURATION = 2000; // 2 seconds
        const COOLDOWN_DURATION = 1500; // cooldown after trigger
        const CIRCUMFERENCE = 2 * Math.PI * 45; // circle circumference

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

        // Mouse events
        button.addEventListener("mousedown", startHold);
        button.addEventListener("mouseup", cancelHold);
        button.addEventListener("mouseleave", cancelHold);

        // Touch events for mobile
        button.addEventListener("touchstart", (e) => {
            e.preventDefault();
            startHold();
        });
        button.addEventListener("touchend", cancelHold);
        button.addEventListener("touchcancel", cancelHold);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }
    """,
)


# Callback when deletion is confirmed
def on_delete_confirmed():
    st.session_state.deleted_items.append(
        f"Deleted item #{len(st.session_state.deleted_items) + 1}"
    )
    st.toast("🗑️ Item permanently deleted!", icon="⚠️")


# Render the component
result = danger_button(key="danger_btn", on_confirmed_change=on_delete_confirmed)

# Show deletion history
if st.session_state.deleted_items:
    st.divider()
    st.subheader("Deletion Log")
    for item in reversed(st.session_state.deleted_items[-3:]):
        st.write(f"• {item}")
```

## Combining state and triggers

Many components benefit from using both patterns together. The following example creates a stopwatch with laps. The component uses state values to track the time and whether the stopwatch is running. It also uses trigger values to track when the user starts a lap or resets the stopwatch. In summary, the component sets state and trigger values in the following events:

- The user starts the stopwatch:
  - `setStateValue("running", true)`

- The user pauses the stopwatch:
  - `setStateValue("running", false)`
  - `setStateValue("elapsed", elapsedMs)`

- The user records a lap:
  - `setStateValue("laps", laps)`
  - ``setTriggerValue("lap", { number: laps.length, time: elapsedMs, formatted: `${t.mins}:${t.secs}.${t.cents}` })``

- The user resets the stopwatch:
  - `setStateValue("laps", [])`
  - `setStateValue("elapsed", 0)`
  - `setStateValue("running", false)`
  - `setTriggerValue("reset", true)`

```python
import streamlit as st

st.title("Stopwatch with Laps")
st.caption("Combining state values (time, running) with trigger values (lap, reset)")

# Track laps in Python
if "laps" not in st.session_state:
    st.session_state.laps = []

stopwatch = st.components.v2.component(
    name="stopwatch",
    html="""
    <div class="stopwatch">
        <div class="display-ring">
            <svg class="ring-svg" viewBox="0 0 200 200">
                <circle class="ring-track" cx="100" cy="100" r="90"/>
                <circle id="ring-progress" class="ring-progress" cx="100" cy="100" r="90"/>
            </svg>
            <div class="display">
                <span id="minutes" class="time-segment">00</span>
                <span class="separator">:</span>
                <span id="seconds" class="time-segment">00</span>
                <span class="separator small">.</span>
                <span id="centiseconds" class="time-segment small">00</span>
            </div>
        </div>

        <div class="controls">
            <button id="lap-btn" class="ctrl-btn secondary" disabled>
                <span class="btn-icon">🏁</span>
                <span class="btn-label">Lap</span>
            </button>
            <button id="start-btn" class="ctrl-btn primary">
                <span class="btn-icon">▶</span>
                <span class="btn-label">Start</span>
            </button>
            <button id="reset-btn" class="ctrl-btn secondary" disabled>
                <span class="btn-icon">⏱️</span>
                <span class="btn-label">Reset</span>
            </button>
        </div>

        <div id="lap-list" class="lap-list"></div>
    </div>
    """,
    css="""
    .stopwatch {
        font-family: var(--st-font);
        color: var(--st-text-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        gap: 2rem;
    }

    /* Ring Display */
    .display-ring {
        position: relative;
        width: 14rem;
        height: 14rem;
    }

    .ring-svg {
        position: absolute;
        inset: -.75rem;
        padding: .75rem;
        transform: rotate(-90deg);
        overflow: visible;
    }

    .ring-track, .ring-progress {
        fill: none;
        stroke-width: 6;
    }

    .ring-track {
        stroke: var(--st-secondary-background-color);
    }

    .ring-progress {
        stroke: var(--st-primary-color);
        stroke-linecap: round;
        stroke-dasharray: 565.5;
        stroke-dashoffset: 565.5;
        transition: stroke-dashoffset 0.1s linear;
        filter: drop-shadow(0 0 8px var(--st-primary-color));
    }

    .ring-progress.running {
        animation: glow 2s ease-in-out infinite;
    }

    @keyframes glow {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
    }

    /* Time Display */
    .display {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: baseline;
        gap: 2px;
        font-family: var(--st-code-font);
        font-size: 2.5rem;
        font-weight: 700;
    }

    .time-segment {
        min-width: 2ch;
        text-align: center;
        letter-spacing: 0.05em;
    }

    .separator {
        opacity: 0.5;
    }

    .time-segment.small, .separator.small {
        font-size: 1.5rem;
        font-weight: 500;
    }

    .time-segment.small {
        opacity: 0.7;
    }

    /* Controls */
    .controls {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .ctrl-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 0.75rem 1.25rem;
        border: none;
        border-radius: var(--st-button-radius);
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        min-width: 5rem;
    }

    .ctrl-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .ctrl-btn:hover:not(:disabled) {
        transform: scale(1.05);
    }

    .ctrl-btn.primary {
        background: var(--st-primary-color);
        color: white;
    }

    .ctrl-btn.primary:hover:not(:disabled) {
        filter: brightness(1.1);
    }

    .ctrl-btn.secondary {
        background: var(--st-secondary-background-color);
        border: 1px solid var(--st-border-color);
    }

    .ctrl-btn.secondary:hover:not(:disabled) {
        border-color: var(--st-primary-color);
    }

    .btn-icon {
        font-size: 1.25rem;
        line-height: 1;
    }

    .btn-label {
        font-size: 0.7rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    /* Lap List */
    .lap-list {
        width: 100%;
        max-width: 280px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 150px;
        overflow-y: auto;
    }

    .lap-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        background: var(--st-secondary-background-color);
        border-radius: var(--st-base-radius);
        font-size: 0.85rem;
        animation: slide-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes slide-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .lap-number {
        color: var(--st-primary-color);
        font-weight: 600;
    }

    .lap-time, .lap-delta {
        font-family: var(--st-code-font);
        font-size: 0.8rem;
        opacity: 0.8;
    }

    .lap-delta.fastest {
        color: var(--st-green-color);
        opacity: 1;
    }

    .lap-delta.slowest {
        color: var(--st-red-color);
        opacity: 1;
    }
    """,
    js="""
    export default function({ parentElement, data, setStateValue, setTriggerValue }) {
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
                cents: String(cents).padStart(2, "0")
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
            startBtn.querySelector(".btn-label").textContent = isRunning ? "Pause" : "Start";
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
                formatted: `${t.mins}:${t.secs}.${t.cents}`
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
    """
)

# Render the component
result = stopwatch(
    key="stopwatch",
    on_lap_change=lambda: None,
    on_reset_change=lambda: None,
    on_running_change=lambda: None,
    on_elapsed_change=lambda: None,
    on_laps_change=lambda: None,
    default={"elapsed": 0, "running": False, "laps": []},
)

# Display state info
col1, col2 = st.columns(2)
with col1:
    st.metric("Status", "Running" if result.running else "Paused")
    elapsed_sec = (result.elapsed or 0) / 1000
    st.metric("Elapsed", f"{elapsed_sec:.1f}s")
with col2:
    st.subheader("Lap Records (Python)")
    for i, lap_ms in enumerate(result.laps[-5:]):
        mins, secs = divmod(lap_ms / 1000, 60)
        st.write(f"**Lap {i+1}**: {int(mins):02d}:{secs:05.2f}")
```

## Best practices

### When to use state values

- Form inputs: Current values of text fields, dropdowns, checkboxes.
- Component configuration: Settings that affect how the component behaves.
- Selection state: Currently selected items in lists or tables.
- View state: Current tab, page, or mode in multi-view components.

### When to use trigger values

- User actions: Button clicks, form submissions, menu selections.
- Events: File uploads, drag-and-drop operations, keyboard shortcuts.
- Notifications: Status changes, error conditions, completion events.
- Navigation: Page changes, modal opens/closes.

### Callback registration

Both state and trigger values require callback registration using the `on_<key>_change` pattern. This ensures the component's result object consistently contains all of its state and trigger values, including on the first run. The following example mounts a component with callbacks for the following keys:

- `"user_input"` state key
- `"selected_items"` state key
- `"button_click"` trigger key
- `"form_submit"` trigger key

```python
result = my_component(
    # State callbacks - called when state changes
    on_user_input_change=handle_input_change,
    on_selected_items_change=handle_selection_change,

    # Trigger callbacks - called when events fire
    on_button_click_change=handle_button_click,
    on_form_submit_change=handle_form_submit
)
```

### Default values

Use the `default` parameter to set initial state values. If no default is provided, the state key will be set to `None`. Trigger values default (and revert after events) to `None`. The following example mounts a component with default values for the following keys:

- `"user_input"` state key with an empty string.
- `"selected_items"` state key with an empty list.
- `"current_tab"` state key with `0`.
- `"button_click"` trigger key with `None` (Streamlit automatic default).

```python
result = my_component(
    default={
        "user_input": "",
        "selected_items": [],
        "current_tab": 0
    },
    on_user_input_change=handle_input,
    on_selected_items_change=handle_selection,
    on_current_tab_change=handle_tab_change,
    on_button_click_change=handle_button_click
)
```

## What's next?

Now that you understand state and trigger values:

- Learn about [Theming and styling](/develop/concepts/custom-components/components-v2/theming) to make your components look great.
- Explore [Package-based components](/develop/concepts/custom-components/components-v2/package-based) for complex projects with TypeScript.
- Check out the [JavaScript API reference](/develop/api-reference/custom-components/component-v2-lib) for complete frontend documentation.
