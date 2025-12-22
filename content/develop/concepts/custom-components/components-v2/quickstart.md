---
title: Quickstart examples
slug: /develop/concepts/custom-components/components-v2/quickstart
description: Get started quickly with Custom Components v2 through practical examples showing interactive buttons, data exchange, and complete component implementations.
keywords: custom components v2, quickstart, examples, interactive components, data exchange, component examples, getting started
---

# Quickstart examples

Get started with custom components v2 through these practical examples that demonstrate the key features and capabilities.

## Two-step component process

Creating and using a custom component involves two distinct steps:

1. Register your component to define its structure (HTML, CSS, JavaScript).
   - Register a component with [`st.components.v2.component()`](/develop/api-reference/custom-components/st.components.v2.component).
   - Optional: To enable bidirectional communication, within your component's JavaScript function, communicate with Python by calling `setStateValue()` or `setTriggerValue()`. These are properties of the [`ComponentArgs`](/develop/api-reference/custom-components/component-v2-lib-componentargs) object passed to your function.
   - Optional: To make your component theme-aware, within your component's CSS, style your component with Streamlit's [theme variables](/develop/concepts/custom-components/components-v2/theming#using-css-custom-properties).

2. Mount your component to create a specific instance in your app.
   - Use your component command, which inherits from the [`BidiComponentCallable`](/develop/api-reference/custom-components/st.components.v2.types.bidicomponentcallable) class.

For more information, see [Create custom v2 components](/develop/concepts/custom-components/components-v2/create).

## Hello world component

You can use custom components v2 to create static HTML and CSS components. The following example display "Hello, World!" in an H2 heading, using the app's primary color for the heading text. This example shows the following key concepts:

- Component registration with HTML and CSS.
- Mounting a component with its command created from registration.
- Styling the component with the app's theme.

```python filename="streamlit_app.py"
import streamlit as st

hello_component = st.components.v2.component(
    name="hello_world",
    html="<h2>Hello, World!</h2>",
    css="h2 { color: var(--st-primary-color); }",
)

hello_component()
```

<Cloud name="doc-components-v2-hello-world-test" height="200px" />

## Simple button component

Your v2 component can send user data to your app. This example shows a simple button that sends a trigger value to your app when clicked. Trigger values are one-time events that are not persisted across reruns. This example shows the following key concepts:

- Component registration with HTML, CSS, and JavaScript.
- Trigger values using `setTriggerValue()`.
- Callback functions with the `on_<event>_change` naming pattern.

```python filename="streamlit_app.py"
import streamlit as st

if "click_count" not in st.session_state:
    st.session_state.click_count = 0


def handle_button_click():
    st.session_state.click_count += 1


my_component = st.components.v2.component(
    "simple_button",
    html="""<button id="btn">Click me</button>""",
    css="""
    button {
      border: none;
      padding: .5rem;
      border-radius: var(--st-button-radius);
      background-color: var(--st-primary-color);
      color: white;
    }
    """,
    js="""
    export default function(component) {
      const { setTriggerValue, parentElement } = component;
        parentElement.querySelector("button").onclick = () => {
            setTriggerValue("action", "button_clicked");
        };
    }
    """,
)

result = my_component(on_action_change=handle_button_click)

if result.action:
    st.write(f"Button clicked! Total clicks: {st.session_state.click_count}")
```

<Cloud name="doc-components-v2-simple-button-test" height="200px" />

For inline component development, you must pass raw HTML, CSS, and JavaScript code to your component. Package-based components allow you to pass file references to your component. If you want to use files for an inline component, you must read them into strings. The previous example is equivalent to the following:

```none hideHeader
project_directory/
├── my_component/
│   ├── __init__.py
│   ├── component.css
│   ├── component.html
│   └── component.js
└── streamlit_app.py
```

<Collapse title="__init__.py">

```python filename="my_component/__init__.py"
import streamlit as st
from pathlib import Path

# Get the current file's directory
_COMPONENT_DIR = Path(__file__).parent

@st.cache_data
def load_html():
    with open(_COMPONENT_DIR / "component.html", "r") as f:
        return f.read()

@st.cache_data
def load_css():
    with open(_COMPONENT_DIR / "component.css", "r") as f:
        return f.read()

@st.cache_data
def load_js():
    with open(_COMPONENT_DIR / "component.js", "r") as f:
        return f.read()

HTML = load_html()
CSS = load_css()
JS = load_js()
```

</Collapse>

<Collapse title="my_component/component.html">

```markup filename="my_component/component.html"
<button id="btn">Click me</button>
```

</Collapse>

<Collapse title="my_component/component.css">

```css filename="my_component/component.css"
button {
  border: none;
  padding: 0.5rem;
  border-radius: var(--st-button-radius);
  background-color: var(--st-primary-color);
  color: white;
}
```

</Collapse>

<Collapse title="my_component/component.js">

```javascript filename="my_component/component.js"
export default function (component) {
  const { setTriggerValue, parentElement } = component;
  parentElement.querySelector("button").onclick = () => {
    setTriggerValue("action", "button_clicked");
  };
}
```

</Collapse>

<Collapse title="streamlit_app.py">

```python filename="streamlit_app.py"
import streamlit as st
from my_component import HTML, CSS, JS

if "click_count" not in st.session_state:
    st.session_state.click_count = 0

def handle_button_click():
    st.session_state.click_count += 1

my_component = st.components.v2.component(
    "interactive_button",
    html=HTML,
    css=CSS,
    js=JS,
)

result = my_component(on_action_change=handle_button_click)

if result.action:
    st.write(f"Button clicked! Total clicks: {st.session_state.click_count}")
```

</Collapse>

The remaining examples on this page will use this file structure for easier viewing of the embedded code blocks. The complete code is provided at the end of each example for easier copying and pasting.

<Tip>

If you are developing a component, temporarily remove `@st.cache_data` decorators to avoid manually clearing the cache when you make changes to the component.

</Tip>

## Rich data component

Streamlit will automatically serialize various data types to JSON or Arrow format. This example shows how to pass different data types to your component and simply display it. It shows the following key concepts:

- Automatic dataframe conversion to Arrow format.
- Passing JSON data.
- Passing an image as a base64 string.
- Accessing data in JavaScript via the destructured `data` property.
- Dynamically updating a placeholder element with the data.

```markup filename="my_component/component.html"
<div id="data-container">Loading data...</div>
```

```javascript filename="my_component/component.js"
export default function ({ data, parentElement }) {
  const container = parentElement.querySelector("#data-container");
  const df = data.df;
  const userInfo = data.user_info;
  const imgBase64 = data.image_base64;
  container.innerHTML = `
    <h4>Dataframe: ${df}</h4>
    <h4>User Info: ${userInfo.name}</h4>
    <img src="data:image/png;base64,${imgBase64}" style="width: 25%;" />
  `;
}
```

```python filename="streamlit_app.py"
import pandas as pd
import streamlit as st
import base64
from my_component import HTML, JS

# Create sample data
@st.cache_data
def create_sample_df():
    return pd.DataFrame(
        {
            "name": ["Alice", "Bob", "Charlie"],
            "city": ["New York", "London", "Tokyo"],
        }
    )

df = create_sample_df()

# Load an image and convert to b64 string
@st.cache_data
def load_image_as_base64(image_path):
    with open(image_path, "rb") as img_file:
        img_bytes = img_file.read()
    return base64.b64encode(img_bytes).decode("utf-8")

img_base64 = load_image_as_base64("favi.png")

# Serialization is automatically handled by Streamlit components
chart_component = st.components.v2.component(
    "data_display",
    html=HTML,
    js=JS,
)

chart_component(
    data={
        "df": df,  # Arrow-serializable dataframe
        "user_info": {"name": "Alice"},  # JSON-serializable data
        "image_base64": img_base64,  # Image as base64 string
    }
)
```

<Collapse title="Complete code">

```python filename="streamlit_app.py"
import pandas as pd
import streamlit as st
import base64

# Create sample data
@st.cache_data
def create_sample_df():
    return pd.DataFrame(
        {
            "name": ["Alice", "Bob", "Charlie"],
            "city": ["New York", "London", "Tokyo"],
        }
    )

df = create_sample_df()

# Load an image and convert to b64 string
@st.cache_data
def load_image_as_base64(image_path):
    with open(image_path, "rb") as img_file:
        img_bytes = img_file.read()
    return base64.b64encode(img_bytes).decode("utf-8")

img_base64 = load_image_as_base64("favi.png")

# Serialization is automatically handled by Streamlit components
chart_component = st.components.v2.component(
    "data_display",
    html="""<div id="data-container">Loading data...</div>""",
    js="""
    export default function({ data, parentElement }) {
      const container = parentElement.querySelector("#data-container");
      const df = data.df;
      const userInfo = data.user_info;
      const imgBase64 = data.image_base64;
      container.innerHTML = `
        <h4>Dataframe: ${df}</h4>
        <h4>User Info: ${userInfo.name}</h4>
        <img src="data:image/png;base64,${imgBase64}" style="width: 25%;" />
      `;
    }
    """,
)

chart_component(
    data={
        "df": df,  # Arrow-serializable dataframe
        "user_info": {"name": "Alice"},  # JSON-serializable data
        "image_base64": img_base64,  # Image as base64 string
    }
)
```

</Collapse>

<Cloud name="doc-components-v2-rich-data-test" height="400px" />

## Interactive counter component

Your v2 component can maintain stateful values, either alone or in combination with trigger values. This example shows a counter component that can be incremented, decremented, and reset. Because it contains event handlers that aren't properties of the component object, they must be cleaned up when the component is unmounted. This example shows the following key concepts:

- State and trigger values together in one component.
- More comprehensive CSS custom properties to match the app's theme.
- Multiple event handlers.
- Cleanup functions to remove event listeners when the component is unmounted.

```markup filename="my_component/component.html"
<div class="counter">
  <h3>Count: <span id="display">0</span></h3>
  <div class="buttons">
    <button id="decrement">-1</button>
    <button id="increment">+1</button>
    <button id="reset">Reset</button>
  </div>
</div>
```

```css filename="my_component/component.css"
.counter {
  padding: 2rem;
  border: 1px solid var(--st-border-color);
  border-radius: var(--st-base-radius);
  font-family: var(--st-font);
  text-align: center;
}

.buttons {
  margin-top: 1rem;
}

button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--st-primary-color);
  color: white;
  border: none;
  border-radius: var(--st-button-radius);
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

#reset {
  background: var(--st-red-color);
}
```

```javascript filename="my_component/component.js"
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
```

```python filename="streamlit_app.py"
import streamlit as st
from my_component import HTML, CSS, JS

# Interactive counter with both state and triggers
counter = st.components.v2.component(
    "interactive_counter",
    html=HTML,
    css=CSS,
    js=JS,
)

# Use with callbacks
result = counter(
    data={"initialCount": 0},
    on_count_change=lambda: None,  # Track count state
    on_reset_change=lambda: None,  # Handle reset events
)

# Display current state
st.write(f"Current count: {result.count}")

# Show when reset was triggered (only for one rerun)
if result.reset:
    st.toast("Counter was reset!")
```

<Collapse title="Complete code">

```python filename="streamlit_app.py"
import streamlit as st

# Interactive counter with both state and triggers
counter = st.components.v2.component(
    "interactive_counter",
    html="""
    <div class="counter">
      <h3>Count: <span id="display">0</span></h3>
      <div class="buttons">
        <button id="decrement">-1</button>
        <button id="increment">+1</button>
        <button id="reset">Reset</button>
      </div>
    </div>
    """,
    css="""
    .counter {
      padding: 2rem;
      border: 1px solid var(--st-border-color);
      border-radius: var(--st-base-radius);
      font-family: var(--st-font);
      text-align: center;
    }

    .buttons {
      margin-top: 1rem;
    }

    button {
      margin: 0 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--st-primary-color);
      color: white;
      border: none;
      border-radius: var(--st-button-radius);
      cursor: pointer;
    }

    button:hover {
      opacity: 0.8;
    }

    #reset {
      background: var(--st-red-color);
    }
    """,
    js="""
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
    """,
)

# Use with callbacks
result = counter(
    data={"initialCount": 0},
    on_count_change=lambda: None,  # Track count state
    on_reset_change=lambda: None,  # Handle reset events
)

# Display current state
st.write(f"Current count: {result.count}")

# Show when reset was triggered (only for one rerun)
if result.reset:
    st.toast("Counter was reset!")
```

</Collapse>

<Cloud name="doc-components-v2-interactive-counter-test" height="300px" />

## Danger button component

You can include frontend validation processes in your component. This example shows a button that requires the user to hold for two seconds to confirm the action. Only when the user continuously holds the button for two seconds will the component send the trigger value with `setTriggerValue("confirmed", true)`. The component gives the user visual feedback via a progress ring. This example shows the following key concepts:

- Frontend logic to validate user submissions before sending them to your app.
- Timed disablement to rate-limit user submissions.
- Visual feedback to the user.
- Cleanup functions to remove event listeners when the component is unmounted.

```markup filename="my_component/my_html.html"
<button id="danger-btn" class="hold-button">
  <svg class="progress-ring" viewBox="0 0 100 100">
    <circle class="ring-bg" cx="50" cy="50" r="45" />
    <circle id="ring-progress" class="ring-progress" cx="50" cy="50" r="45" />
  </svg>
  <div class="button-content">
    <span id="icon" class="icon">🗑️</span>
    <span id="label" class="label">Hold to Delete</span>
  </div>
</button>
```

```css filename="my_component/my_css.css"
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
  0%,
  100% {
    box-shadow: 0 0 0 0 var(--st-red-color);
  }
  50% {
    box-shadow: 0 0 0 15px transparent;
  }
}

@keyframes success-burst {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
    background: var(--st-red-background-color);
  }
  100% {
    transform: scale(1);
  }
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
  filter: drop-shadow(0 0 0.5rem var(--st-red-color));
}

.button-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--st-font);
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
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px) rotate(-5deg);
  }
  75% {
    transform: translateX(2px) rotate(5deg);
  }
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
```

```javascript filename="my_component/my_js.js"
const HOLD_DURATION = 2000; // 2 seconds
const COOLDOWN_DURATION = 1500; // cooldown after trigger
const CIRCUMFERENCE = 2 * Math.PI * 45; // circle circumference

export default function ({ parentElement, setTriggerValue, data }) {
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
    label.textContent = data?.continue ?? "Keep holding...";
    animationFrame = requestAnimationFrame(updateProgress);
  }

  function cancelHold() {
    if (isDisabled) return; // Ignore if in cooldown

    startTime = null;
    button.classList.remove("holding");
    label.textContent = data?.start ?? "Hold to Delete";
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
    label.textContent = data?.completed ?? "Deleted!";
    progress.style.strokeDashoffset = 0;

    // Send trigger to Python
    setTriggerValue("confirmed", true);

    // Reset after cooldown
    setTimeout(() => {
      button.classList.remove("triggered");
      button.disabled = false;
      isDisabled = false;
      icon.textContent = data?.icon ?? "🗑️";
      label.textContent = data?.start ?? "Hold to Delete";
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
  button.addEventListener("contextmenu", cancelHold); // Ctrl+Click on Mac

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
    button.removeEventListener("contextmenu", cancelHold);

    // Remove touch event listeners
    button.removeEventListener("touchstart", handleTouchStart);
    button.removeEventListener("touchend", cancelHold);
    button.removeEventListener("touchcancel", cancelHold);
  };
}
```

```python filename="streamlit_app.py"
import streamlit as st
from danger_button_component import danger_button

st.title("Hold-to-Confirm Button")
st.caption("A dangerous action that requires intentional confirmation")

# Track deletion events
if "deleted_items" not in st.session_state:
    st.session_state.deleted_items = []


# Callback when deletion is confirmed
def on_delete_confirmed():
    st.session_state.deleted_items.append(
        f"Deleted item #{len(st.session_state.deleted_items) + 1}"
    )
    st.toast("Item permanently deleted!", icon="🗑️")


# Render the component
with st.container(horizontal_alignment="center"):
    result = danger_button(
        key="danger_btn",
        on_confirmed_change=on_delete_confirmed,
        width="content"
    )

# Show deletion history
if st.session_state.deleted_items:
    st.divider()
    st.subheader("Deletion Log")
    for item in reversed(st.session_state.deleted_items[-3:]):
        st.write(f"• {item}")
```

<Collapse title="Complete code">

```python filename="streamlit_app.py"
import streamlit as st

danger_button = st.components.v2.component(
    name="hold_to_confirm",
    html="""
    <button id="danger-btn" class="hold-button">
      <svg class="progress-ring" viewBox="0 0 100 100">
        <circle class="ring-bg" cx="50" cy="50" r="45" />
        <circle id="ring-progress" class="ring-progress" cx="50" cy="50" r="45" />
      </svg>
      <div class="button-content">
        <span id="icon" class="icon">🗑️</span>
        <span id="label" class="label">Hold to Delete</span>
      </div>
    </button>
    """,
    css="""
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
      0%,
      100% {
        box-shadow: 0 0 0 0 var(--st-red-color);
      }
      50% {
        box-shadow: 0 0 0 15px transparent;
      }
    }

    @keyframes success-burst {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.15);
        background: var(--st-red-background-color);
      }
      100% {
        transform: scale(1);
      }
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
      filter: drop-shadow(0 0 0.5rem var(--st-red-color));
    }

    .button-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      font-family: var(--st-font);
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
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-2px) rotate(-5deg);
      }
      75% {
        transform: translateX(2px) rotate(5deg);
      }
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
    """,
    js="""
    const HOLD_DURATION = 2000; // 2 seconds
    const COOLDOWN_DURATION = 1500; // cooldown after trigger
    const CIRCUMFERENCE = 2 * Math.PI * 45; // circle circumference

    export default function ({ parentElement, setTriggerValue, data }) {
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
        label.textContent = data?.continue ?? "Keep holding...";
        animationFrame = requestAnimationFrame(updateProgress);
      }

      function cancelHold() {
        if (isDisabled) return; // Ignore if in cooldown

        startTime = null;
        button.classList.remove("holding");
        label.textContent = data?.start ?? "Hold to Delete";
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
        label.textContent = data?.completed ?? "Deleted!";
        progress.style.strokeDashoffset = 0;

        // Send trigger to Python
        setTriggerValue("confirmed", true);

        // Reset after cooldown
        setTimeout(() => {
          button.classList.remove("triggered");
          button.disabled = false;
          isDisabled = false;
          icon.textContent = data?.icon ?? "🗑️";
          label.textContent = data?.start ?? "Hold to Delete";
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
      button.addEventListener("contextmenu", cancelHold); // Ctrl+Click on Mac

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
        button.removeEventListener("contextmenu", cancelHold);

        // Remove touch event listeners
        button.removeEventListener("touchstart", handleTouchStart);
        button.removeEventListener("touchend", cancelHold);
        button.removeEventListener("touchcancel", cancelHold);
      };
    }
    """,
)

st.title("Hold-to-Confirm Button")
st.caption("A dangerous action that requires intentional confirmation")

# Track deletion events
if "deleted_items" not in st.session_state:
    st.session_state.deleted_items = []


# Callback when deletion is confirmed
def on_delete_confirmed():
    st.session_state.deleted_items.append(
        f"Deleted item #{len(st.session_state.deleted_items) + 1}"
    )
    st.toast("Item permanently deleted!", icon="🗑️")


# Render the component
with st.container(horizontal_alignment="center"):
    result = danger_button(
        key="danger_btn",
        on_confirmed_change=on_delete_confirmed,
        width="content"
    )

# Show deletion history
if st.session_state.deleted_items:
    st.divider()
    st.subheader("Deletion Log")
    for item in reversed(st.session_state.deleted_items[-3:]):
        st.write(f"• {item}")
```

</Collapse>

<Cloud name="doc-components-v2-danger-button-test" height="500px" />

## What's next?

Now that you've seen these examples:

- Learn the fundamentals in [Create components](/develop/concepts/custom-components/components-v2/create).
- Understand [State versus trigger values](/develop/concepts/custom-components/components-v2/state-and-triggers) for advanced interactions.
- Explore [Component theming and styling](/develop/concepts/custom-components/components-v2/theming) to make beautiful components.
- Build complex projects with [Package-based components](/develop/concepts/custom-components/components-v2/package-based).
