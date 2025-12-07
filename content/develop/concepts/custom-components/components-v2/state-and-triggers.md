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

## State values in practice

State values are perfect for tracking the ongoing state of your component. Here's a practical example:

```python
import streamlit as st

# Create a component that tracks user preferences
preferences_component = st.components.v2.component(
    name="user_preferences",
    html="""
    <div class="preferences">
        <h3>User Preferences</h3>
        <label>
            <input type="checkbox" id="notifications"> Enable notifications
        </label>
        <br>
        <label>
            Theme:
            <select id="theme">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label>
        <br>
        <label>
            Font size: <span id="font-display">14</span>px
            <input type="range" id="font-size" min="12" max="20" value="14">
        </label>
    </div>
    """,
    css="""
    .preferences {
        padding: 20px;
        border: 1px solid var(--st-border-color);
        border-radius: 8px;
        font-family: var(--st-font);
    }
    label {
        display: block;
        margin: 10px 0;
    }
    """,
    js="""
    export default function({ parentElement, setStateValue, data }) {
        const notifications = parentElement.querySelector('#notifications');
        const theme = parentElement.querySelector('#theme');
        const fontSize = parentElement.querySelector('#font-size');
        const fontDisplay = parentElement.querySelector('#font-display');

        // Initialize with default values
        const defaults = data?.defaults || {};
        notifications.checked = defaults.notifications || false;
        theme.value = defaults.theme || 'light';
        fontSize.value = defaults.fontSize || 14;
        fontDisplay.textContent = fontSize.value;

        // Update state when values change
        const updateState = () => {
            setStateValue('notifications', notifications.checked);
            setStateValue('theme', theme.value);
            setStateValue('fontSize', parseInt(fontSize.value));
        };

        // Handle font size changes with display update
        const handleFontSizeChange = () => {
            fontDisplay.textContent = fontSize.value;
            updateState();
        };

        // Attach event listeners
        notifications.addEventListener('change', updateState);
        theme.addEventListener('change', updateState);
        fontSize.addEventListener('input', handleFontSizeChange);

        // Initialize state
        updateState();

        // Cleanup
        return () => {
            notifications.removeEventListener('change', updateState);
            theme.removeEventListener('change', updateState);
            fontSize.removeEventListener('input', handleFontSizeChange);
        };
    }
    """
)

# Use the component with state tracking
def handle_preferences_change():
    # This callback runs whenever any preference changes
    st.rerun()  # Optional: force immediate UI update

result = preferences_component(
    key="user_prefs",
    data={"defaults": {"notifications": True, "theme": "dark", "fontSize": 16}},
    default={"notifications": False, "theme": "light", "fontSize": 14},
    on_notifications_change=handle_preferences_change,
    on_theme_change=handle_preferences_change,
    on_fontSize_change=handle_preferences_change
)

# Access persistent state values
st.write("**Current Preferences:**")
st.write(f"- Notifications: {result.notifications}")
st.write(f"- Theme: {result.theme}")
st.write(f"- Font Size: {result.fontSize}px")

# Use the preferences to configure your app
if result.theme == "dark":
    st.markdown("🌙 Dark theme selected")
else:
    st.markdown("☀️ Light theme selected")
```

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
