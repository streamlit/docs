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

For simplicity, this compoenent assumes it will always have six options in its menu, but with a little more code, you can generalize it accept an arbitrary number of items. The complete code provided at the end of this section demonstrates a generalized version that accepts an arbitrary number of items.

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

## Trigger values in practice

Trigger values are ideal for handling discrete user actions. Here's an example:

```python
import streamlit as st

# Initialize session state for tracking actions
if "action_log" not in st.session_state:
    st.session_state.action_log = []
if "save_count" not in st.session_state:
    st.session_state.save_count = 0

# Create a component with various action buttons
action_component = st.components.v2.component(
    name="action_buttons",
    html="""
    <div class="actions">
        <h3>Document Actions</h3>
        <button id="save" class="primary">💾 Save</button>
        <button id="export" class="secondary">📤 Export</button>
        <button id="share" class="secondary">🔗 Share</button>
        <button id="delete" class="danger">🗑️ Delete</button>
    </div>
    """,
    css="""
    .actions {
        padding: 20px;
        border: 1px solid var(--st-border-color);
        border-radius: 8px;
    }
    button {
        margin: 5px;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }
    .primary {
        background: var(--st-primary-color);
        color: white;
    }
    .secondary {
        background: var(--st-secondary-background-color);
        color: var(--st-text-color);
        border: 1px solid var(--st-border-color);
    }
    .danger {
        background: var(--st-red-color);
        color: white;
    }
    button:hover {
        opacity: 0.8;
    }
    """,
    js="""
    export default function({ parentElement, setTriggerValue }) {
        const saveBtn = parentElement.querySelector('#save');
        const exportBtn = parentElement.querySelector('#export');
        const shareBtn = parentElement.querySelector('#share');
        const deleteBtn = parentElement.querySelector('#delete');

        // Handle different actions with trigger values
        const handleSave = () => {
            setTriggerValue('action', 'save');
        };

        const handleExport = () => {
            setTriggerValue('action', 'export');
        };

        const handleShare = () => {
            setTriggerValue('action', 'share');
        };

        const handleDelete = () => {
            // Confirm before triggering delete
            if (confirm('Are you sure you want to delete this document?')) {
                setTriggerValue('action', 'delete');
            }
        };

        // Attach event listeners
        saveBtn.addEventListener('click', handleSave);
        exportBtn.addEventListener('click', handleExport);
        shareBtn.addEventListener('click', handleShare);
        deleteBtn.addEventListener('click', handleDelete);

        // Cleanup
        return () => {
            saveBtn.removeEventListener('click', handleSave);
            exportBtn.removeEventListener('click', handleExport);
            shareBtn.removeEventListener('click', handleShare);
            deleteBtn.removeEventListener('click', handleDelete);
        };
    }
    """
)

# Define action handlers
def handle_action():
    action = result.action
    timestamp = st.session_state.get('timestamp', 'Unknown time')

    if action == 'save':
        st.session_state.save_count += 1
        st.session_state.action_log.append(f"Document saved (#{st.session_state.save_count})")
        st.success("Document saved successfully!")

    elif action == 'export':
        st.session_state.action_log.append("Document exported")
        st.info("Document exported to downloads folder")

    elif action == 'share':
        st.session_state.action_log.append("Share link generated")
        st.info("Share link copied to clipboard!")

    elif action == 'delete':
        st.session_state.action_log.append("Document deleted")
        st.error("Document deleted permanently")

# Use the component
result = action_component(
    key="doc_actions",
    on_action_change=handle_action
)

# Show action feedback only when triggered
if result.action:
    st.write(f"**Last action:** {result.action}")

# Display action log
if st.session_state.action_log:
    st.write("**Action History:**")
    for i, log_entry in enumerate(reversed(st.session_state.action_log[-5:]), 1):
        st.write(f"{i}. {log_entry}")
```

## Combining state and triggers

Many components benefit from using both patterns together. Here's a comprehensive example:

```python
import streamlit as st

# Initialize session state
if "form_submissions" not in st.session_state:
    st.session_state.form_submissions = 0

# Create a form component that uses both state and triggers
form_component = st.components.v2.component(
    name="interactive_form",
    html="""
    <div class="form-container">
        <h3>Contact Form</h3>
        <form id="contact-form">
            <input type="text" id="name" placeholder="Your name" required>
            <input type="email" id="email" placeholder="Your email" required>
            <textarea id="message" placeholder="Your message" required></textarea>
            <div class="form-actions">
                <button type="button" id="save-draft">💾 Save Draft</button>
                <button type="submit" id="submit">📤 Send Message</button>
            </div>
        </form>
        <div id="status"></div>
    </div>
    """,
    css="""
    .form-container {
        padding: 20px;
        border: 1px solid var(--st-border-color);
        border-radius: 8px;
        max-width: 500px;
    }
    input, textarea {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        border: 1px solid var(--st-border-color);
        border-radius: 4px;
        font-family: var(--st-font);
    }
    textarea {
        height: 100px;
        resize: vertical;
    }
    .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }
    button {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    #save-draft {
        background: var(--st-secondary-background-color);
        color: var(--st-text-color);
        border: 1px solid var(--st-border-color);
    }
    #submit {
        background: var(--st-primary-color);
        color: white;
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
        const submitBtn = parentElement.querySelector('#submit');
        const status = parentElement.querySelector('#status');

        // Load draft data if available
        const draft = data?.draft || {};
        nameInput.value = draft.name || '';
        emailInput.value = draft.email || '';
        messageInput.value = draft.message || '';

        // Update state as user types (for draft saving)
        const updateDraft = () => {
            setStateValue('draft', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        };

        // Save draft action (trigger)
        const saveDraft = () => {
            updateDraft();
            setTriggerValue('action', 'save_draft');
            status.textContent = '✅ Draft saved';
            setTimeout(() => status.textContent = '', 2000);
        };

        // Submit form action (trigger)
        const submitForm = (e) => {
            e.preventDefault();

            // Validate form
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                status.textContent = '❌ Please fill all fields';
                return;
            }

            updateDraft();
            setTriggerValue('action', 'submit');
            status.textContent = '📤 Sending message...';
        };

        // Attach event listeners
        nameInput.addEventListener('input', updateDraft);
        emailInput.addEventListener('input', updateDraft);
        messageInput.addEventListener('input', updateDraft);
        saveDraftBtn.addEventListener('click', saveDraft);
        form.addEventListener('submit', submitForm);

        // Initialize state
        updateDraft();

        // Cleanup
        return () => {
            nameInput.removeEventListener('input', updateDraft);
            emailInput.removeEventListener('input', updateDraft);
            messageInput.removeEventListener('input', updateDraft);
            saveDraftBtn.removeEventListener('click', saveDraft);
            form.removeEventListener('submit', submitForm);
        };
    }
    """
)

# Define action handlers
def handle_form_action():
    action = result.action

    if action == 'save_draft':
        st.info("💾 Draft saved automatically")

    elif action == 'submit':
        st.session_state.form_submissions += 1
        st.success(f"📤 Message sent successfully! (Submission #{st.session_state.form_submissions})")
        # Clear the draft after successful submission
        result.draft = {"name": "", "email": "", "message": ""}

# Use the component
result = form_component(
    key="contact_form",
    data={"draft": st.session_state.get("form_draft", {})},
    default={"draft": {"name": "", "email": "", "message": ""}},
    on_draft_change=lambda: None,  # Register draft as state
    on_action_change=handle_form_action  # Handle form actions
)

# Store draft in session state (persistent across reruns)
if result.draft:
    st.session_state.form_draft = result.draft

# Show current draft status
if result.draft and any(result.draft.values()):
    st.write("**Current Draft:**")
    if result.draft.get('name'):
        st.write(f"- Name: {result.draft['name']}")
    if result.draft.get('email'):
        st.write(f"- Email: {result.draft['email']}")
    if result.draft.get('message'):
        st.write(f"- Message: {len(result.draft['message'])} characters")
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

Both state and trigger values require callback registration using the `on_<key>_change` pattern. This example mounts a component with callbacks for the following keys:

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

- Learn about [Theming and styling](/develop/concepts/custom-components/v2/theming) to make your components look great.
- Explore [Package-based components](/develop/concepts/custom-components/v2/package-based) for complex projects with TypeScript.
- Check out the [JavaScript API reference](/develop/api-reference/custom-components/component-v2-lib) for complete frontend documentation.
