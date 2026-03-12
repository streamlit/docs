---
title: "Component example: Danger Button"
slug: /develop/concepts/custom-components/components-v2/examples/danger-button
description: A hold-to-confirm button with frontend validation, visual feedback, and rate limiting.
keywords: custom components v2, example, danger button, hold to confirm, frontend validation, animations, touch events
---

# Component example: Danger Button

This is a button that requires the user to hold for two seconds to confirm a dangerous action. It demonstrates frontend validation, visual feedback, and rate limiting.

<Cloud name="doc-components-v2-danger-button" height="500px" />

## Key concepts demonstrated

This component demonstrates the following concepts:

- Frontend validation before sending data to Python
- Timed interactions with `requestAnimationFrame()`
- Visual feedback with CSS animations and transitions
- Rate limiting with cooldown periods
- Touch events for mobile support
- Layout control using the `width` parameter
- Cleanup functions for event listeners

## Complete code

For easy copying, expand the complete code below. For easier reading, the HTML, CSS, and JavaScript are shown separately.

<Collapse title="Complete single-file code">

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

```markup
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

<Collapse title="CSS">

```css
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

</Collapse>

<Collapse title="JavaScript">

```javascript
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
      triggerAction();
    } else {
      animationFrame = requestAnimationFrame(updateProgress);
    }
  }

  function startHold() {
    if (isDisabled) return;

    startTime = Date.now();
    button.classList.add("holding");
    label.textContent = data?.continue ?? "Keep holding...";
    animationFrame = requestAnimationFrame(updateProgress);
  }

  function cancelHold() {
    if (isDisabled) return;

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
    isDisabled = true;

    button.classList.remove("holding");
    button.classList.add("triggered");
    button.disabled = true;

    icon.textContent = "✓";
    label.textContent = data?.completed ?? "Deleted!";
    progress.style.strokeDashoffset = 0;

    setTriggerValue("confirmed", true);

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
  button.addEventListener("contextmenu", cancelHold);

  // Touch events for mobile
  button.addEventListener("touchstart", handleTouchStart);
  button.addEventListener("touchend", cancelHold);
  button.addEventListener("touchcancel", cancelHold);

  return () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);

    button.removeEventListener("mousedown", startHold);
    button.removeEventListener("mouseup", cancelHold);
    button.removeEventListener("mouseleave", cancelHold);
    button.removeEventListener("contextmenu", cancelHold);

    button.removeEventListener("touchstart", handleTouchStart);
    button.removeEventListener("touchend", cancelHold);
    button.removeEventListener("touchcancel", cancelHold);
  };
}
```

</Collapse>

```python filename="streamlit_app.py"
import streamlit as st

danger_button = st.components.v2.component(
    name="hold_to_confirm",
    html="...",
    css="...",
    js="...",
)

st.title("Hold-to-Confirm Button")
st.caption("A dangerous action that requires intentional confirmation")

if "deleted_items" not in st.session_state:
    st.session_state.deleted_items = []


def on_delete_confirmed():
    st.session_state.deleted_items.append(
        f"Deleted item #{len(st.session_state.deleted_items) + 1}"
    )
    st.toast("Item permanently deleted!", icon="🗑️")


with st.container(horizontal_alignment="center"):
    result = danger_button(
        key="danger_btn",
        on_confirmed_change=on_delete_confirmed,
        width="content"
    )

if st.session_state.deleted_items:
    st.divider()
    st.subheader("Deletion Log")
    for item in reversed(st.session_state.deleted_items[-3:]):
        st.write(f"• {item}")
```

## How it works

### Frontend validation

The trigger only fires after the user holds for the full 2 seconds. If they release early, `cancelHold()` resets the progress:

```javascript
if (progressPercent >= 1) {
  triggerAction();
} else {
  animationFrame = requestAnimationFrame(updateProgress);
}
```

### Rate limiting

After triggering, the button enters a cooldown period where interactions are ignored:

```javascript
isDisabled = true;
setTimeout(() => {
  isDisabled = false;
  // ... reset visual state
}, COOLDOWN_DURATION);
```

### Touch support

The component handles both mouse and touch events for mobile compatibility:

```javascript
button.addEventListener("touchstart", handleTouchStart);
button.addEventListener("touchend", cancelHold);
button.addEventListener("touchcancel", cancelHold);
```

### Customizable labels

Labels are customizable via the `data` parameter with fallback defaults:

```javascript
label.textContent = data?.start ?? "Hold to Delete";
label.textContent = data?.continue ?? "Keep holding...";
label.textContent = data?.completed ?? "Deleted!";
```
