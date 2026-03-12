---
title: "Component example: Radial Menu"
slug: /develop/concepts/custom-components/components-v2/examples/radial-menu
description: A radial selection menu demonstrating state values for persistent selections.
keywords: custom components v2, example, radial menu, state values, setStateValue, dynamic elements
---

# Component example: Radial Menu

This is a circular menu component that allows users to select from a list of options.

<Cloud name="doc-components-v2-radial-menu" height="300px" />

## Key concepts demonstrated

This component demonstrates the following concepts:

- CSS custom properties for dynamic positioning (`--i`, `--total`)
- A fixed-position backdrop for click-outside behavior
- Complex animations with CSS transitions

## Complete code

For easy copying, expand the complete code below. For easier reading, the HTML, CSS, and JavaScript are shown separately.

<Collapse title="Complete single-file code">

```python filename="streamlit_app.py"
import streamlit as st

radial_menu = st.components.v2.component(
    name="radial_menu",
    html="""
    <div class="radial-menu">
        <button class="menu-selector" id="selector">
            <span class="selector-icon" id="selector-icon">?</span>
        </button>

        <div class="menu-backdrop" id="backdrop"></div>

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

    /* Menu items arranged in a circle */
    .menu-item {
      --angle: calc(var(--i) * (360deg / var(--total)) - 90deg);
      --radius: 4rem;

      background: var(--st-background-color);
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -1.6125rem;
      transform: rotate(var(--angle)) translate(var(--radius))
        rotate(calc(-1 * var(--angle)));
    }

    .menu-item:hover {
      transform: rotate(var(--angle)) translate(var(--radius))
        rotate(calc(-1 * var(--angle))) scale(1.15);
      border-color: var(--st-primary-color);
      background: var(--st-secondary-background-color);
    }

    .menu-item.selected {
      border-color: var(--st-primary-color);
      background: var(--st-secondary-background-color);
    }

    /* Backdrop when menu is open (must be outside .menu-overlay to avoid
       its transform creating a containing block for position: fixed) */
    .menu-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: var(--st-background-color);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 99;
    }

    .menu-backdrop.open {
      display: block;
      opacity: 0.7;
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
    """,
    js="""
    export default function ({ parentElement, data, setStateValue }) {
      const selector = parentElement.querySelector("#selector");
      const selectorIcon = parentElement.querySelector("#selector-icon");
      const overlay = parentElement.querySelector("#overlay");
      const backdrop = parentElement.querySelector("#backdrop");
      const ring = parentElement.querySelector("#ring");

      let isOpen = false;
      const options = data?.options || {};
      let currentSelection = data?.selection || Object.keys(options)[0];
      const optionCount = Object.keys(options).length;

      // Set total item count for CSS angle calculation
      ring.style.setProperty("--total", optionCount);

      // Create the menu items from options
      Object.entries(options).forEach(([value, icon], index) => {
        const button = document.createElement("button");
        button.className = "menu-item";
        button.dataset.value = value;
        button.style.setProperty("--i", index);
        button.textContent = icon;

        button.onclick = () => {
          currentSelection = value;
          updateDisplay();
          toggleMenu();
          setStateValue("selection", currentSelection);
        };

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

      // Calculate and apply viewport-safe position for the menu
      function updatePosition() {
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
        const offsetX = Math.max(0, overflowLeft) - Math.max(0, overflowRight);
        const offsetY = Math.max(0, overflowTop) - Math.max(0, overflowBottom);

        overlay.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
      }

      // Debounced resize handler for performance
      let resizeTimeout;
      function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updatePosition, 16); // ~60fps
      }

      // Toggle menu open/closed
      function toggleMenu() {
        isOpen = !isOpen;
        backdrop.classList.toggle("open", isOpen);
        overlay.classList.toggle("open", isOpen);
        ring.classList.toggle("open", isOpen);

        if (isOpen) {
          updatePosition();
          window.addEventListener("resize", handleResize);
        } else {
          window.removeEventListener("resize", handleResize);
          clearTimeout(resizeTimeout);
          // Reset position after close animation completes (400ms matches CSS transition)
          setTimeout(() => {
            if (!isOpen) overlay.style.transform = "";
          }, 400);
        }
      }

      // Initialize display
      updateDisplay();

      // Attach click handlers
      selector.onclick = toggleMenu;
      backdrop.onclick = () => toggleMenu();

      // Cleanup function
      return () => {
        clearTimeout(resizeTimeout);
        window.removeEventListener("resize", handleResize);
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

```markup
<div class="radial-menu">
    <button class="menu-selector" id="selector">
        <span class="selector-icon" id="selector-icon">?</span>
    </button>

    <div class="menu-backdrop" id="backdrop"></div>

    <div class="menu-overlay" id="overlay">
        <div class="menu-ring" id="ring">
            <!-- Items generated dynamically from data.options -->
        </div>
    </div>
</div>
```

<Collapse title="CSS">

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

/* Menu items arranged in a circle */
.menu-item {
  --angle: calc(var(--i) * (360deg / var(--total)) - 90deg);
  --radius: 4rem;

  background: var(--st-background-color);
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -1.6125rem;
  transform: rotate(var(--angle)) translate(var(--radius))
    rotate(calc(-1 * var(--angle)));
}

.menu-item:hover {
  transform: rotate(var(--angle)) translate(var(--radius))
    rotate(calc(-1 * var(--angle))) scale(1.15);
  border-color: var(--st-primary-color);
  background: var(--st-secondary-background-color);
}

.menu-item.selected {
  border-color: var(--st-primary-color);
  background: var(--st-secondary-background-color);
}

/* Backdrop when menu is open (must be outside .menu-overlay to avoid
   its transform creating a containing block for position: fixed) */
.menu-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--st-background-color);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 99;
}

.menu-backdrop.open {
  display: block;
  opacity: 0.7;
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

<Collapse title="JavaScript">

```javascript
export default function ({ parentElement, data, setStateValue }) {
  const selector = parentElement.querySelector("#selector");
  const selectorIcon = parentElement.querySelector("#selector-icon");
  const overlay = parentElement.querySelector("#overlay");
  const backdrop = parentElement.querySelector("#backdrop");
  const ring = parentElement.querySelector("#ring");

  let isOpen = false;
  const options = data?.options || {};
  let currentSelection = data?.selection || Object.keys(options)[0];
  const optionCount = Object.keys(options).length;

  // Set total item count for CSS angle calculation
  ring.style.setProperty("--total", optionCount);

  // Create the menu items from options
  Object.entries(options).forEach(([value, icon], index) => {
    const button = document.createElement("button");
    button.className = "menu-item";
    button.dataset.value = value;
    button.style.setProperty("--i", index);
    button.textContent = icon;

    button.onclick = () => {
      currentSelection = value;
      updateDisplay();
      toggleMenu();
      setStateValue("selection", currentSelection);
    };

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

  // Calculate and apply viewport-safe position for the menu
  function updatePosition() {
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
    const offsetX = Math.max(0, overflowLeft) - Math.max(0, overflowRight);
    const offsetY = Math.max(0, overflowTop) - Math.max(0, overflowBottom);

    overlay.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
  }

  // Debounced resize handler for performance
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updatePosition, 16); // ~60fps
  }

  // Toggle menu open/closed
  function toggleMenu() {
    isOpen = !isOpen;
    backdrop.classList.toggle("open", isOpen);
    overlay.classList.toggle("open", isOpen);
    ring.classList.toggle("open", isOpen);

    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", handleResize);
    } else {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      // Reset position after close animation completes (400ms matches CSS transition)
      setTimeout(() => {
        if (!isOpen) overlay.style.transform = "";
      }, 400);
    }
  }

  // Initialize display
  updateDisplay();

  // Attach click handlers
  selector.onclick = toggleMenu;
  backdrop.onclick = () => toggleMenu();

  // Cleanup function
  return () => {
    clearTimeout(resizeTimeout);
    window.removeEventListener("resize", handleResize);
  };
}
```

</Collapse>

```python filename="streamlit_app.py"
import streamlit as st

radial_menu = st.components.v2.component(
    name="radial_menu",
    html="...",
    css="...",
    js="...",
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

## How it works

### State values for selection

When the user selects an item, `setStateValue("selection", currentSelection)` updates the persistent state. Unlike trigger values, this persists across reruns:

```javascript
button.onclick = () => {
  currentSelection = value;
  updateDisplay();
  toggleMenu();
  setStateValue("selection", currentSelection);
};
```

### Default values

The `default` parameter ensures the component has a consistent initial state without triggering an unnecessary rerun:

```python
result = radial_menu(
    data={"options": options, "selection": "burger"},
    default={"selection": "burger"},  # Matches initial selection
    on_selection_change=lambda: None,
)
```

### Dynamic element generation

Menu items are created dynamically based on the options passed via `data`:

```javascript
ring.style.setProperty("--total", optionCount);

Object.entries(options).forEach(([value, icon], index) => {
  const button = document.createElement("button");
  button.style.setProperty("--i", index);
  // ...
  ring.appendChild(button);
});
```

### CSS-based circular positioning

The CSS uses custom properties to calculate each item's angle:

```css
.menu-item {
  --angle: calc(var(--i) * (360deg / var(--total)) - 90deg);
  --radius: 4rem;
  transform: rotate(var(--angle)) translate(var(--radius))
    rotate(calc(-1 * var(--angle)));
}
```

### Backdrop for click-outside behavior

The backdrop is a separate `<div>` positioned outside `.menu-overlay`. This is necessary because `.menu-overlay` uses a CSS `transform`, which would create a new containing block for any `position: fixed` descendants, preventing a backdrop pseudo-element from covering the full viewport. Clicking the backdrop closes the menu:

```javascript
backdrop.onclick = () => toggleMenu();
```
