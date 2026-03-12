---
title: "Component example: Interactive counter"
slug: /develop/concepts/custom-components/components-v2/examples/interactive-counter
description: A counter component demonstrating state values, trigger values, multiple event handlers, and cleanup functions.
keywords: custom components v2, example, counter, state values, trigger values, cleanup function, event handlers
---

# Component example: Interactive counter

This is a counter component that can be incremented, decremented, and reset. It demonstrates combining state values (persistent count) with trigger values (reset event).

<Cloud name="doc-components-v2-interactive-counter" height="300px" />

## Key concepts demonstrated

This component demonstrates the following concepts:

- Combining state and trigger values in one component
- Multiple event handlers

## Complete code

For easy copying, expand the complete code below. For easier reading, the HTML, CSS, and JavaScript are shown separately.

<Collapse title="Complete single-file code">

```python filename="streamlit_app.py"
import streamlit as st

counter_component = st.components.v2.component(
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
    }
    """,
)

result = counter_component(
    default={"count": 0},
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

```markup
<div class="counter">
  <h3>Count: <span id="display">0</span></h3>
  <div class="buttons">
    <button id="decrement">-1</button>
    <button id="increment">+1</button>
    <button id="reset">Reset</button>
  </div>
</div>
```

```css
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

```javascript
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
}
```

```python filename="streamlit_app.py"
import streamlit as st

counter_component = st.components.v2.component(
    "interactive_counter",
    html="...",
    css="...",
    js="...",
)

result = counter_component(
    default={"count": 0},
    data={"initialCount": 0},
    on_count_change=lambda: None,
    on_reset_change=lambda: None,
)

st.write(f"Current count: {result.count}")

if result.reset:
    st.toast("Counter was reset!")
```

## How it works

### State and trigger values

You can have multiple state and trigger values for a single component, and this component uses both. The `count` state value is persistent across reruns and the `reset` trigger value is transient, returning `True` for one rerun when the reset button is clicked.

The increment, decrement, and reset buttons have event listeners that update the `count` state value and report the change to Python with `setStateValue()`. Additionally, the reset button sets the `reset` trigger value to `True` with `setTriggerValue()`, which is only available for one rerun. This means that when the reset button is clicked, both the state and trigger values are updated, but this will only trigger a single rerun of the script.

### Component initialization

The `data.initialCount` value sets the initial value of the component on the frontend. The `default` parameter sets the initial value of the component in Python. Using optional chaining (`data?.initialCount`) handles cases where data might be undefined. In this example, the component will fallback to an initial count of `0` if no initial count is provided in `data`. Therefore, when the initial count is `0`, you can omit the `data` parameter.

### The `on_count_change` and `on_reset_change` callbacks

The callbacks ensure that the `count` and `reset` attributes are available in the component's result object before they are set from the frontend. This is important because the component's result object is used to access the component's state and trigger values in Python. Without the callbacks, your Python code must check for the presence of the attributes before accessing them.

In this example, the callbacks are set to `lambda: None`, which is an empty callback function.

### Multifile component structure

When your component is complex enough to warrant multiple files, it's recommended to use package-based development, which requires defining `pyproject.toml` files and understanding the basics of packaging Python projects. For simplicity, this example uses inline development and passes the HTML, CSS, and JavaScript as strings. This is because you can't use file references with inline components. After understanding the basics of creating a custom component with inline development, you can explore [package-based development](/develop/concepts/custom-components/components-v2/package-based).
