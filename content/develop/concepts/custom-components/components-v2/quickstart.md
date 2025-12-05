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
   - Within your component's JavaScript function, communicate with Python by destructuring a [`ComponentArgs`](/develop/api-reference/custom-components/component-v2-lib-componentargs) object.
   - Within your component's CSS, use Streamlit's [theme variables](/develop/concepts/custom-components/components-v2/theming#using-css-custom-properties) to style your component.

2. Mount your component to create a specific instance in your app.
   - Use your component command, which inherits from the [`BidiComponentCallable`](/develop/api-reference/custom-components/st.components.v2.types.bidicomponentcallable) class.

For more information, see [Create custom v2 components](/develop/concepts/custom-components/components-v2/create).

## Simple interactive button

This example shows the basics of creating an interactive component with bidirectional communication. It shows the following key concepts:

- Component registration with HTML, CSS, and JavaScript.
- Trigger values using `setTriggerValue()`.
- Callback functions with the `on_<event>_change` naming pattern.
- Mounting a component with its command created from registration.

```python
import streamlit as st

if "click_count" not in st.session_state:
    st.session_state.click_count = 0

def handle_button_click():
    st.session_state.click_count += 1

my_component = st.components.v2.component(
    "interactive_button",
    html="<button id='btn'>Click me</button>",
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

For inline component development, you must pass raw HTML, CSS, and JavaScript code to your component. Package-based components allow you to pass file references to your component. If you want to use files for an inline component, you'll need to read them into strings. The previous example is equivalent to the following:

```
project_directory/
├── my_component/
│   ├── my_css.css
│   ├── my_html.html
│   └── my_js.js
└── streamlit_app.py
```

<Collapse title="my_css.css">

```css
button {
  border: none;
  padding: 0.5rem;
  border-radius: var(--st-button-radius);
  background-color: var(--st-primary-color);
  color: white;
}
```

</Collapse>

<Collapse title="my_html.html">

```markup
<button id='btn'>Click me</button>
```

</Collapse>

<Collapse title="my_js.js">

```javascript
export default function (component) {
  const { setTriggerValue, parentElement } = component;

  parentElement.querySelector("button").onclick = () => {
    setTriggerValue("action", "button_clicked");
  };
}
```

</Collapse>

<Collapse title="streamlit_app.py">

```python
import streamlit as st

with open("my_component/my_html.html", "r") as f:
    HTML = f.read()
with open("my_component/my_css.css", "r") as f:
    CSS = f.read()
with open("my_component/my_js.js", "r") as f:
    JS = f.read()

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

## Rich data exchange

This example shows how to pass different data types to your component. It shows the following key concepts:

- Automatic dataframe conversion to Arrow format.
- Passing JSON data.
- Passing an image as a base64 string.
- Accessing data in JavaScript via the destructured `data` property.

`my_component/my_html.html`:

```markup
<div id='data-container'>Loading data...</div>
```

`my_component/my_js.js`:

```javascript
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

`streamlit_app.py`:

```python
import pandas as pd
import streamlit as st
import base64

with open("my_component/my_html.html", "r") as f:
    HTML = f.read()
with open("my_component/my_js.js", "r") as f:
    JS = f.read()

# Create sample data
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"],
    "city": ["New York", "London", "Tokyo"]
})
# Load an image and convert to bytes
with open("favi.png", "rb") as img_file:
    img_bytes = img_file.read()
img_base64 = base64.b64encode(img_bytes).decode('utf-8')

# Serialization is automatically handled by Streamlit components
chart_component = st.components.v2.component(
    "data_display",
    html=HTML,
    js=JS,
)

result = chart_component(
    data={
        "df": df,                           # Arrow-serializable dataframe
        "user_info": {"name": "Alice"},     # JSON-serializable data
        "image_base64": img_base64          # Image as base64 string
    }
)
```

<Collapse title="Complete code">

```python
import pandas as pd
import streamlit as st
import base64

# Create sample data
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"],
    "city": ["New York", "London", "Tokyo"]
})
# Load an image and convert to bytes
with open("favi.png", "rb") as img_file:
    img_bytes = img_file.read()
img_base64 = base64.b64encode(img_bytes).decode('utf-8')

# Serialization is automatically handled by Streamlit components
chart_component = st.components.v2.component(
    "data_display",
    html="<div id='data-container'>Loading data...</div>",
    js="""
    export default function({ data, parentElement }) {
        const container = parentElement.querySelector('#data-container');

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

result = chart_component(
    data={
        "df": df,                           # Arrow-serializable dataframe
        "user_info": {"name": "Alice"},     # JSON-serializable data
        "image_base64": img_base64          # Image as base64 string
    }
)
```

</Collapse>

## Complete interactive counter

This comprehensive example demonstrates both state and trigger values. It shows the following key concepts:

- Using state and trigger values together in one component.
- Using CSS custom properties to style the component.
- Bidirectional communication between Python and JavaScript.
- Multiple event handlers.
- Cleanup functions for proper resource management

`my_component/my_html.html`:

```markup
<div class="counter">
    <h3>Count: <span id="display">0</span></h3>
    <div class="buttons">
        <button id="increment">+1</button>
        <button id="decrement">-1</button>
        <button id="reset">Reset</button>
    </div>
</div>
```

`my_component/my_css.css`:

```css
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
```

`my_component/my_js.js`:

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

  // Cleanup function
  return () => {
    incrementBtn.removeEventListener("click", incrementBtn.onclick);
    decrementBtn.removeEventListener("click", decrementBtn.onclick);
    resetBtn.removeEventListener("click", resetBtn.onclick);
  };
}
```

`streamlit_app.py`:

```python
import streamlit as st

with open("my_component/my_html.html", "r") as f:
    HTML = f.read()
with open("my_component/my_css.css", "r") as f:
    CSS = f.read()
with open("my_component/my_js.js", "r") as f:
    JS = f.read()

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
