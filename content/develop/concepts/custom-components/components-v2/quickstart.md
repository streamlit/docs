---
title: Quickstart examples
slug: /develop/concepts/custom-components/components-v2/quickstart
description: Get started quickly with Custom Components v2 through practical examples showing interactive buttons, data exchange, and complete component implementations.
keywords: custom components v2, quickstart, examples, interactive components, data exchange, component examples, getting started
---

# Quickstart examples

Get started with Custom Components v2 through these practical examples that demonstrate the key features and capabilities.

## Two-step component process

Creating and using a custom component involves two distinct steps:

1. Register your component to define its structure (HTML, CSS, JavaScript).
   - Register a component with [`st.components.v2.component()`](/develop/api-reference/custom-components/st.components.v2.component).
   - Within your component's JavaScript function, communicate with Python by destructuring a [`ComponentArgs`](/develop/api-reference/custom-components/component-v2-lib-componentargs) object.

2. Mount your component to create a specific instance in your app.
   - Use your component command that implements the [`BidiComponentCallable`](/develop/api-reference/custom-components/st.components.v2.types.bidicomponentcallable) type.

For more information, see [Create components](/develop/concepts/custom-components/components-v2/create).

## Simple interactive button

This example shows the basics of creating an interactive component with bidirectional communication:

```python
import streamlit as st

if "click_count" not in st.session_state:
    st.session_state.click_count = 0

def handle_button_click():
    st.session_state.click_count += 1

my_component = st.components.v2.component(
    "interactive_button",
    html="<button id='btn'>Click me</button>",
    js="""
    export default function(component) {
      const { setTriggerValue, parentElement } = component;

        parentElement.querySelector('button').onclick = () => {
            setTriggerValue('action', 'button_clicked');
        };
    }
    """,
)

result = my_component(on_action_change=handle_button_click)

if result.action:
    st.write(f"Button clicked! Total clicks: {st.session_state.click_count}")
```

**Key concepts demonstrated:**

- Component registration with HTML and JavaScript
- Trigger values using `setTriggerValue()`
- Callback functions with `on_{event}_change` pattern
- Session state integration

## Rich data exchange

This example shows how to pass different data types to your component:

```python
import pandas as pd
import streamlit as st

# Create sample data
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"],
    "age": [25, 30, 35],
    "city": ["New York", "London", "Tokyo"]
})

# Pass multiple DataFrames, JSON, or raw bytes - automatically handled
chart_component = st.components.v2.component(
    "data_display",
    html="<div id='data-container'>Loading data...</div>",
    js="""
    export default function({ data, parentElement }) {
        const container = parentElement.querySelector('#data-container');

        // Access different data types
        const userInfo = data.user_info;
        const dataframe = data.df;  // Automatically converted from pandas
        const settings = data.settings;

        container.innerHTML = `
            <h4>User: ${userInfo.name}</h4>
            <p>DataFrame rows: ${dataframe.length}</p>
            <p>Theme: ${settings.theme}</p>
        `;
    }
    """
)

result = chart_component(
    data={
        "df": df,                           # Converted to Arrow format
        "user_info": {"name": "Alice"},     # Passed as JSON
        "settings": {"theme": "dark"},      # Passed as JSON
        "binary_data": b"raw bytes"         # Binary data support
    }
)
```

**Key concepts demonstrated:**

- Automatic dataframe conversion to Arrow format
- JSON data passing
- Binary data support
- Accessing data in JavaScript via `component.data`

## Complete interactive counter

This comprehensive example demonstrates both state and trigger values:

```python
import streamlit as st

# Interactive counter with both state and triggers
counter = st.components.v2.component(
    "interactive_counter",
    html="""
    <div class="counter">
        <h3>Count: <span id="display">0</span></h3>
        <div class="buttons">
            <button id="increment">+1</button>
            <button id="decrement">-1</button>
            <button id="reset">Reset</button>
        </div>
    </div>
    """,
    css="""
    .counter {
        padding: 20px;
        border: 1px solid var(--st-border-color);
        border-radius: var(--st-base-radius);
        font-family: var(--st-font);
        text-align: center;
    }
    .buttons {
        margin-top: 15px;
    }
    button {
        margin: 0 5px;
        padding: 8px 16px;
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
    export default function({ parentElement, setStateValue, setTriggerValue, data }) {
        let count = data?.initialCount || 0;
        const display = parentElement.querySelector('#display');
        const incrementBtn = parentElement.querySelector('#increment');
        const decrementBtn = parentElement.querySelector('#decrement');
        const resetBtn = parentElement.querySelector('#reset');

        const updateDisplay = () => {
            display.textContent = count;
            setStateValue('count', count);  // Persistent state
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
            setTriggerValue('reset', true);  // One-time trigger
        };

        // Initialize
        updateDisplay();

        // Cleanup function
        return () => {
            incrementBtn.removeEventListener('click', incrementBtn.onclick);
            decrementBtn.removeEventListener('click', decrementBtn.onclick);
            resetBtn.removeEventListener('click', resetBtn.onclick);
        };
    }
    """
)

# Define callbacks
def handle_reset():
    st.balloons()
    st.success("Counter reset!")

# Use with callbacks
result = counter(
    data={"initialCount": 0},
    on_count_change=lambda: None,  # Track count state
    on_reset_change=handle_reset   # Handle reset events
)

# Display current state
st.write(f"Current count: {result.count}")

# Show when reset was triggered (only for one rerun)
if result.reset:
    st.info("Reset button was clicked!")
```

**Key concepts demonstrated:**

- Both state values (`setStateValue`) and trigger values (`setTriggerValue`)
- Theme integration with CSS custom properties
- Data passing from Python to JavaScript
- Multiple event handlers and callbacks
- Cleanup functions for proper resource management
- Difference between persistent state and transient triggers

## Form with validation

This example shows a more complex component with form validation:

```python
import streamlit as st

form_component = st.components.v2.component(
    "contact_form",
    html="""
    <div class="form-container">
        <h3>Contact Form</h3>
        <form id="contact-form">
            <input type="text" id="name" placeholder="Your name" required>
            <input type="email" id="email" placeholder="Your email" required>
            <textarea id="message" placeholder="Your message" required></textarea>
            <div class="form-actions">
                <button type="button" id="save-draft">Save Draft</button>
                <button type="submit">Send Message</button>
            </div>
        </form>
        <div id="status"></div>
    </div>
    """,
    css="""
    .form-container {
        padding: 20px;
        border: 1px solid var(--st-border-color);
        border-radius: var(--st-base-radius);
        font-family: var(--st-font);
        max-width: 500px;
    }
    input, textarea {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid var(--st-border-color);
        border-radius: 4px;
        font-family: var(--st-font);
        box-sizing: border-box;
    }
    textarea {
        height: 100px;
        resize: vertical;
    }
    .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 15px;
    }
    button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: var(--st-font);
    }
    button[type="submit"] {
        background: var(--st-primary-color);
        color: white;
    }
    button[type="button"] {
        background: var(--st-secondary-background-color);
        color: var(--st-text-color);
        border: 1px solid var(--st-border-color);
    }
    #status {
        margin-top: 10px;
        font-size: 14px;
    }
    """,
    js="""
    export default function({ parentElement, setStateValue, setTriggerValue, data }) {
        const form = parentElement.querySelector('#contact-form');
        const nameInput = parentElement.querySelector('#name');
        const emailInput = parentElement.querySelector('#email');
        const messageInput = parentElement.querySelector('#message');
        const saveDraftBtn = parentElement.querySelector('#save-draft');
        const status = parentElement.querySelector('#status');

        // Load draft if available
        const draft = data?.draft || {};
        nameInput.value = draft.name || '';
        emailInput.value = draft.email || '';
        messageInput.value = draft.message || '';

        // Update draft state as user types
        const updateDraft = () => {
            setStateValue('draft', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        };

        // Save draft
        const saveDraft = () => {
            updateDraft();
            setTriggerValue('action', 'save_draft');
            status.textContent = 'Draft saved!';
            status.style.color = 'var(--st-green-color)';
            setTimeout(() => status.textContent = '', 2000);
        };

        // Submit form
        const submitForm = (e) => {
            e.preventDefault();

            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                status.textContent = 'Please fill all fields';
                status.style.color = 'var(--st-red-color)';
                return;
            }

            updateDraft();
            setTriggerValue('action', 'submit');
            status.textContent = 'Sending message...';
            status.style.color = 'var(--st-blue-color)';
        };

        // Event listeners
        nameInput.addEventListener('input', updateDraft);
        emailInput.addEventListener('input', updateDraft);
        messageInput.addEventListener('input', updateDraft);
        saveDraftBtn.addEventListener('click', saveDraft);
        form.addEventListener('submit', submitForm);

        // Initialize
        updateDraft();
    }
    """
)

# Handle form actions
def handle_form_action():
    if result.action == 'save_draft':
        st.info("Draft saved!")
    elif result.action == 'submit':
        st.success("Message sent successfully!")
        # Clear form after successful submission
        st.rerun()

# Use the component
result = form_component(
    data={"draft": st.session_state.get("form_draft", {})},
    on_draft_change=lambda: setattr(st.session_state, "form_draft", result.draft),
    on_action_change=handle_form_action
)

# Show draft status
if result.draft and any(result.draft.values()):
    st.write("**Current draft:**")
    st.json(result.draft)
```

**Key concepts demonstrated:**

- Form handling and validation
- Real-time state updates as user types
- Draft saving functionality
- Multiple action types with single callback
- Session state integration for persistence

## What's next?

Now that you've seen these examples:

- Learn the fundamentals in [Create components](/develop/concepts/custom-components/components-v2/create).
- Understand [State vs triggers](/develop/concepts/custom-components/components-v2/state-and-triggers) for advanced interactions.
- Explore [Theming and styling](/develop/concepts/custom-components/components-v2/theming) to make beautiful components.
- Build complex projects with [Package-based components](/develop/concepts/custom-components/components-v2/package-based).
