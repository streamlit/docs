---
title: "Component example: Radial Menu"
slug: /develop/concepts/custom-components/components-v2/examples/radial-menu
description: A radial selection menu demonstrating state values for persistent selections.
keywords: custom components v2, example, radial menu, state values, setStateValue, dynamic elements
---

# Component example: Radial Menu

This is a circular menu component that allows users to select from a list of options.

<Cloud name="doc-components-v2-radial-menu-test" height="300px" />

## Key concepts demonstrated

This component demonstrates the following concepts:

- CSS custom properties for dynamic positioning (`--i`, `--total`)
- Document-level event listeners
- Complex animations with CSS transitions

## File-based version

```none hideHeader
project_directory/
├── radial_menu_component/
│   ├── __init__.py
│   ├── menu.css
│   ├── menu.html
│   └── menu.js
└── streamlit_app.py
```

<Collapse title="__init__.py">

```python filename="radial_menu_component/__init__.py"
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

```markup filename="radial_menu_component/menu.html"
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
```

<Collapse title="menu.css">

```css filename="radial_menu_component/menu.css"
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
  --angle: calc(var(--i) * (360deg / var(--total, 6)) - 90deg);
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

<Collapse title="menu.js">

```javascript filename="radial_menu_component/menu.js"
export default function ({ parentElement, data, setStateValue }) {
  const selector = parentElement.querySelector("#selector");
  const selectorIcon = parentElement.querySelector("#selector-icon");
  const overlay = parentElement.querySelector("#overlay");
  const ring = parentElement.querySelector("#ring");

  let isOpen = false;
  const options = data?.options || {};
  let currentSelection = data?.selection || Object.keys(options)[0];

  // Create menu items from options
  Object.entries(options).forEach(([value, icon], index) => {
    const button = document.createElement("button");
    button.className = "menu-item";
    button.dataset.value = value;
    button.style.setProperty("--i", index);
    button.style.setProperty("--total", Object.keys(options).length);
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

  // Document-level click to close
  const handleOutsideClick = (e) => {
    if (isOpen && !parentElement.contains(e.target)) {
      toggleMenu();
    }
  };
  document.addEventListener("click", handleOutsideClick);

  // Cleanup
  return () => {
    document.removeEventListener("click", handleOutsideClick);
  };
}
```

</Collapse>

```python filename="streamlit_app.py"
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

## How it works

### State values for selection

When the user selects an item, `setStateValue("selection", currentSelection)` updates the persistent state. Unlike trigger values, this persists across reruns:

```javascript
button.addEventListener("click", () => {
  currentSelection = value;
  updateDisplay();
  toggleMenu();
  setStateValue("selection", currentSelection);
});
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
Object.entries(options).forEach(([value, icon], index) => {
  const button = document.createElement("button");
  button.style.setProperty("--i", index);
  button.style.setProperty("--total", Object.keys(options).length);
  // ...
  ring.appendChild(button);
});
```

### CSS-based circular positioning

The CSS uses custom properties to calculate each item's angle:

```css
.menu-item {
  --angle: calc(var(--i) * (360deg / var(--total, 6)) - 90deg);
  transform: rotate(var(--angle)) translate(var(--radius))
    rotate(calc(-1 * var(--angle)));
}
```

### Cleanup for document listeners

Since the component adds a document-level click handler, it must be removed in the cleanup function:

```javascript
return () => {
  document.removeEventListener("click", handleOutsideClick);
};
```

## Related documentation

- [Component registration](/develop/concepts/custom-components/components-v2/register)
- [Component mounting](/develop/concepts/custom-components/components-v2/mount)
- [Bidirectional communication](/develop/concepts/custom-components/components-v2/communicate)
- [State vs trigger values](/develop/concepts/custom-components/components-v2/state-and-triggers)
