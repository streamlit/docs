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

State values are perfect for tracking the ongoing state of your component. The [Radial menu](/develop/concepts/custom-components/components-v2/examples/radial-menu) quickstart example demonstrates this pattern with a circular selection menu. When the user selects an item, the component calls `setStateValue` to persist their choice across reruns.

<Cloud name="doc-components-v2-radial-menu" height="300px" />

The critical line in the component's JavaScript is the call to `setStateValue` inside the click handler. Because this is a state value, the selection persists across reruns. If the user interacts with another widget and triggers a rerun, `result.selection` still reflects their last choice:

```javascript
button.onclick = () => {
  currentSelection = value;
  updateDisplay();
  toggleMenu();
  setStateValue("selection", currentSelection);
};
```

On the Python side, the component is mounted with a `default` value that matches the initial selection. The `on_selection_change` callback registers the `"selection"` key so it appears on the result object:

```python
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

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/radial-menu"
    icon="arrow_forward"
    label="View the full radial menu example"
    cssModuleIconClassName="IconRight"
/>

## Trigger values in practice: Danger button component

Trigger values are ideal for handling discrete user actions. The [Danger button](/develop/concepts/custom-components/components-v2/examples/danger-button) quickstart example demonstrates this pattern with a hold-to-confirm button. The component performs frontend validation by requiring the user to hold the button for a full two seconds and then calls `setTriggerValue` to fire a one-time trigger to Python.

<Cloud name="doc-components-v2-danger-button" height="500px" />

The key difference from a state value is that the trigger fires every time the action completes, and its value resets to `None` after the rerun. In this example, the `triggerAction` function only calls `setTriggerValue` after the full hold duration passes frontend validation:

```javascript
function triggerAction() {
  // ... reset animation state ...

  setTriggerValue("confirmed", true);

  // Reset after cooldown
  setTimeout(() => {
    // ... restore button to initial state ...
  }, COOLDOWN_DURATION);
}
```

If the user releases early, `cancelHold()` resets the progress without ever calling `setTriggerValue`, so no rerun occurs:

```javascript
function updateProgress() {
  const progressPercent = Math.min(elapsed / HOLD_DURATION, 1);

  if (progressPercent >= 1) {
    triggerAction();
  } else {
    animationFrame = requestAnimationFrame(updateProgress);
  }
}
```

On the Python side, the `on_confirmed_change` callback runs each time the trigger fires. Because trigger values are transient, `result.confirmed` is only `True` during the rerun caused by the trigger&mdash;it reverts to `None` on subsequent reruns:

```python
def on_delete_confirmed():
    st.session_state.deleted_items.append(
        f"Deleted item #{len(st.session_state.deleted_items) + 1}"
    )
    st.toast("Item permanently deleted!", icon="🗑️")

result = danger_button(
    key="danger_btn",
    on_confirmed_change=on_delete_confirmed,
)
```

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/danger-button"
    icon="arrow_forward"
    label="View the full danger button example"
    cssModuleIconClassName="IconRight"
/>

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
