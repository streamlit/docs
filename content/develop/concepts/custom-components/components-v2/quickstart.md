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

For inline component development, you must pass raw HTML, CSS, and JavaScript code to your component. Package-based components allow you to pass file references to your component. If you want to use files for an inline component, you'll need to read them into strings. The previous example is equivalent to the following:

```
project_directory/
├── my_component/
│   ├── __init__.py
│   ├── my_css.css
│   ├── my_html.html
│   └── my_js.js
└── streamlit_app.py
```

<Collapse title="__init__.py">

```python
import streamlit as st
from pathlib import Path

# Get the current file's directory
_COMPONENT_DIR = Path(__file__).parent

@st.cache_data
def load_html():
    with open(_COMPONENT_DIR / "my_html.html", "r") as f:
        return f.read()

@st.cache_data
def load_css():
    with open(_COMPONENT_DIR / "my_css.css", "r") as f:
        return f.read()

@st.cache_data
def load_js():
    with open(_COMPONENT_DIR / "my_js.js", "r") as f:
        return f.read()

HTML = load_html()
CSS = load_css()
JS = load_js()
```

</Collapse>

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
<button id="btn">Click me</button>
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

<Note>

To avoid repeat warnings about re-registering the component, you can register your component in another module and import it. The standalone examples on this page are simple enough that this issue isn't apparent, but with more complex apps and components, this can be a nuisance.

</Note>

## Rich data exchange

This example shows how to pass different data types to your component. It shows the following key concepts:

- Automatic dataframe conversion to Arrow format.
- Passing JSON data.
- Passing an image as a base64 string.
- Accessing data in JavaScript via the destructured `data` property.

`my_component/my_html.html`:

```markup
<div id="data-container">Loading data...</div>
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
from my_component import HTML, JS

# Create sample data
@st.cache_data
def create_sample_df():
    return pd.DataFrame({
        "name": ["Alice", "Bob", "Charlie"],
        "city": ["New York", "London", "Tokyo"]
})
df = create_sample_df()
# Load an image and convert to bytes
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
@st.cache_data
def create_sample_df():
    return pd.DataFrame({
        "name": ["Alice", "Bob", "Charlie"],
        "city": ["New York", "London", "Tokyo"]
})
df = create_sample_df()
# Load an image and convert to bytes
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
        const display = parentElement.querySelector("#display");
        const incrementBtn = parentElement.querySelector("#increment");
        const decrementBtn = parentElement.querySelector("#decrement");
        const resetBtn = parentElement.querySelector("#reset");

        const updateDisplay = () => {
            display.textContent = count;
            setStateValue("count", count);  // Persistent state
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
            setTriggerValue("reset", true);  // One-time trigger
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

This example shows a more complex component with form validation. It shows the following key concepts:

- Form handling and validation.
- Draft saving functionality.
- Multiple event handlers and callbacks.
- Using CSS custom properties to style the component.
- Session state integration for more complex, bidirectional state management.
- Cleanup functions for proper resource management.

`my_component/my_html.html`:

```markup
<div class="form-container">
    <h3>Contact Form</h3>
    <form id="contact-form">
        <input type="text" id="name" placeholder="Your name" required>
        <input type="email" id="email" placeholder="Your email" required>
        <textarea id="message" placeholder="Your message" required></textarea>
        <div class="form-actions">
            <button type="button" id="save-draft">Save Draft</button>
            <button type="submit">Send Message</button>
            <div id="status"></div>
        </div>
    </form>
</div>
```

`my_component/my_css.css`:

```css
.form-container {
  padding: 1rem;
  border: 1px solid var(--st-border-color);
  border-radius: var(--st-base-radius);
  box-sizing: border-box;
}
h3 {
  font-size: var(--st-heading-font-size-h3, inherit);
  font-weight: var(--st-heading-font-weight-h3, inherit);
  margin: 0;
}
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: var(--st-secondary-background-color);
  border: 1px solid transparent;
  border-radius: var(--st-base-radius);
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: var(--st-primary-color);
}
textarea {
  height: 5rem;
  resize: vertical;
}
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
}
button {
  padding: 0.5rem 1rem;
  border-radius: var(--st-button-radius);
  border: 1px solid transparent;
  font-size: inherit;
  font-family: inherit;
}
button[type="submit"] {
  background: var(--st-primary-color);
  color: white;
}
button[type="button"] {
  border: 1px solid var(--st-border-color);
  background: var(--st-primary-background-color);
  color: var(--st-text-color);
}
button:hover {
  opacity: 0.9;
  border-color: var(--st-primary-color);
}
#status {
  margin-top: 0.5rem;
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
  const form = parentElement.querySelector("#contact-form");
  const nameInput = parentElement.querySelector("#name");
  const emailInput = parentElement.querySelector("#email");
  const messageInput = parentElement.querySelector("#message");
  const saveDraftBtn = parentElement.querySelector("#save-draft");
  const status = parentElement.querySelector("#status");

  // Register custom CSS variables with third values from --st-heading-font-sizes and --st-heading-font-weights
  requestAnimationFrame(() => {
    const container = parentElement.querySelector(".form-container");
    const headingSizes = getComputedStyle(form)
      .getPropertyValue("--st-heading-font-sizes")
      .trim();
    const headingWeights = getComputedStyle(form)
      .getPropertyValue("--st-heading-font-weights")
      .trim();
    const sizes = headingSizes.split(",").map((s) => s.trim());
    const weights = headingWeights.split(",").map((s) => s.trim());
    if (sizes[2] && container) {
      container.style.setProperty("--st-heading-font-size-h3", sizes[2]);
    }
    if (weights[2] && container) {
      container.style.setProperty("--st-heading-font-weight-h3", weights[2]);
    }
  });

  // Load draft if available
  const loadDraft = (draft) => {
    nameInput.value = draft.name || "";
    emailInput.value = draft.email || "";
    messageInput.value = draft.message || "";
  };

  loadDraft(data?.draft || {});

  // Save draft
  const saveDraft = () => {
    setStateValue("draft", {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    });
    setTriggerValue("action", "save_draft");
    status.textContent = "Draft saved!";
    status.style.color = "var(--st-green-color)";
    setTimeout(() => (status.textContent = ""), 2000);
  };

  // Submit form
  const submitForm = (e) => {
    e.preventDefault();

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      status.textContent = "Please fill all fields";
      status.style.color = "var(--st-red-color)";
      return;
    }

    status.textContent = "Message sent!";
    status.style.color = "var(--st-blue-color)";
    setTimeout(() => (status.textContent = ""), 2000);
    setTriggerValue("submit", {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    });
    loadDraft({});
    setStateValue("draft", {});
  };

  // Event listeners - only update on button clicks
  saveDraftBtn.addEventListener("click", saveDraft);
  form.addEventListener("submit", submitForm);

  return () => {
    saveDraftBtn.removeEventListener("click", saveDraft);
    form.removeEventListener("submit", submitForm);
  };
}
```

`streamlit_app.py`:

```python
import streamlit as st
from my_component import HTML, CSS, JS

form_component = st.components.v2.component(
    "contact_form",
    html=HTML,
    css=CSS,
    js=JS,
)

# Handle form actions
def handle_form_action():
    # Process submission
    # if submission_failed:
    #     submission = st.session_state.message_form.submit
    #     st.session_state.message_form.draft=submission
    pass

# Use the component
form_state = st.session_state.get("message_form", {})
result = form_component(
    data={"draft": form_state.get("draft", {})},
    default={"draft": form_state.get("draft", {})},
    on_draft_change=lambda: None,
    on_submit_change=handle_form_action,
    key="message_form"
)

if result.submit:
    st.write("Message Submitted:")
    result.submit
else:
    st.write("Current Draft:")
    result.draft
```

<Collapse title="Complete code">

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
                <div id="status"></div>
            </div>
        </form>
    </div>
    """,
    css="""
    .form-container {
        padding: 1rem;
        border: 1px solid var(--st-border-color);
        border-radius: var(--st-base-radius);
        box-sizing: border-box;
    }
    h3 {
        font-size: var(--st-heading-font-size-h3, inherit);
        font-weight: var(--st-heading-font-weight-h3, inherit);
        margin: 0;
    }
    input,
    textarea {
        width: 100%;
        padding: 0.5rem;
        margin: 0.5rem 0;
        background: var(--st-secondary-background-color);
        border: 1px solid transparent;
        border-radius: var(--st-base-radius);
        box-sizing: border-box;
        font-size: inherit;
        font-family: inherit;
    }
    input:focus,
    textarea:focus {
        outline: none;
        border-color: var(--st-primary-color);
    }
    textarea {
        height: 5rem;
        resize: vertical;
    }
    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 0.75rem;
    }
    button {
        padding: 0.5rem 1rem;
        border-radius: var(--st-button-radius);
        border: 1px solid transparent;
        font-size: inherit;
        font-family: inherit;
    }
    button[type="submit"] {
        background: var(--st-primary-color);
        color: white;
    }
    button[type="button"] {
        border: 1px solid var(--st-border-color);
        background: var(--st-primary-background-color);
        color: var(--st-text-color);
    }
    button:hover {
        opacity: 0.9;
        border-color: var(--st-primary-color);
    }
    #status {
        margin-top: 0.5rem;
    }
    """,
    js="""
    export default function ({
        parentElement,
        setStateValue,
        setTriggerValue,
        data,
    }) {
        const form = parentElement.querySelector("#contact-form");
        const nameInput = parentElement.querySelector("#name");
        const emailInput = parentElement.querySelector("#email");
        const messageInput = parentElement.querySelector("#message");
        const saveDraftBtn = parentElement.querySelector("#save-draft");
        const status = parentElement.querySelector("#status");

        // Register custom CSS variables with third values from --st-heading-font-sizes and --st-heading-font-weights
        requestAnimationFrame(() => {
            const container = parentElement.querySelector(".form-container");
            const headingSizes = getComputedStyle(form)
                .getPropertyValue("--st-heading-font-sizes")
                .trim();
            const headingWeights = getComputedStyle(form)
                .getPropertyValue("--st-heading-font-weights")
                .trim();
            const sizes = headingSizes.split(",").map((s) => s.trim());
            const weights = headingWeights.split(",").map((s) => s.trim());
            if (sizes[2] && container) {
                container.style.setProperty("--st-heading-font-size-h3", sizes[2]);
            }
            if (weights[2] && container) {
                container.style.setProperty("--st-heading-font-weight-h3", weights[2]);
            }
        });

        // Load draft if available
        const loadDraft = (draft) => {
            nameInput.value = draft.name || "";
            emailInput.value = draft.email || "";
            messageInput.value = draft.message || "";
        };

        loadDraft(data?.draft || {});

        // Save draft
        const saveDraft = () => {
            setStateValue("draft", {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
            });
            setTriggerValue("action", "save_draft");
            status.textContent = "Draft saved!";
            status.style.color = "var(--st-green-color)";
            setTimeout(() => (status.textContent = ""), 2000);
        };

        // Submit form
        const submitForm = (e) => {
            e.preventDefault();

            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                status.textContent = "Please fill all fields";
                status.style.color = "var(--st-red-color)";
                return;
            }

            status.textContent = "Message sent!";
            status.style.color = "var(--st-blue-color)";
            setTimeout(() => (status.textContent = ""), 2000);
            setTriggerValue("submit", {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
            });
            loadDraft({});
            setStateValue("draft", {});
        };

        // Event listeners - only update on button clicks
        saveDraftBtn.addEventListener("click", saveDraft);
        form.addEventListener("submit", submitForm);

        return () => {
            saveDraftBtn.removeEventListener("click", saveDraft);
            form.removeEventListener("submit", submitForm);
        };
    }
    """
)

# Handle form actions
def handle_form_action():
    # Process submission
    # if submission_failed:
    #     submission = st.session_state.message_form.submit
    #     st.session_state.message_form.draft=submission
    pass

# Use the component
form_state = st.session_state.get("message_form", {})
result = form_component(
    data={"draft": form_state.get("draft", {})},
    default={"draft": form_state.get("draft", {})},
    on_draft_change=lambda: None,
    on_submit_change=handle_form_action,
    key="message_form"
)

if result.submit:
    st.write("Message Submitted:")
    result.submit
else:
    st.write("Current Draft:")
    result.draft
```

</Collapse>

## What's next?

Now that you've seen these examples:

- Learn the fundamentals in [Create components](/develop/concepts/custom-components/components-v2/create).
- Understand [State vs triggers](/develop/concepts/custom-components/components-v2/state-and-triggers) for advanced interactions.
- Explore [Theming and styling](/develop/concepts/custom-components/components-v2/theming) to make beautiful components.
- Build complex projects with [Package-based components](/develop/concepts/custom-components/components-v2/package-based).
