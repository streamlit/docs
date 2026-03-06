---
title: "Component example: Text input"
slug: /develop/concepts/custom-components/components-v2/examples/text-input
description: A text input component demonstrating bidirectional communication with programmatic updates from Python.
keywords: custom components v2, example, text input, bidirectional communication, session state, feedback loop
---

# Component example: Text input

This is a text input component that demonstrates full bidirectional communication, including programmatic updates from Python.

<Cloud name="doc-components-v2-text-input-test" height="300px" />

## Key concepts demonstrated

This component demonstrates the following concepts:

- Mounting a component with a key and reading component state from Session State
- Wrapping a component's raw mounting command to create a user-friendly mounting command
- Programmatic updates from Python via the `data` parameter
- Syncing frontend state without interrupting user input

## Complete code

For easy copying and pasting, expand the complete code below. However, for easier reading, the code is split into multiple files in the next section.

<Collapse title="Complete single-file code">

```python filename="streamlit_app.py"
import streamlit as st

HTML = """
    <label style='padding-right: 1em;' for='txt'>Enter text</label>
    <input id='txt' type='text' />
"""

JS = """
    export default function(component) {
        const { setStateValue, parentElement, data } = component;

        const label = parentElement.querySelector('label');
        label.innerText = data.label;

        const input = parentElement.querySelector('input');
        if (input.value !== data.value) {
            input.value = data.value ?? '';
        };

        input.onkeydown = (e) => {
            if (e.key === 'Enter') {
                setStateValue('value', e.target.value);
            }
        };

        input.onblur = (e) => {
            setStateValue('value', e.target.value);
        };
    }
"""

text_component = st.components.v2.component(
    "my_text_input",
    html=HTML,
    js=JS,
)


def text_component_wrapper(
    label, *, default="", key=None, on_change=lambda: None
):
    component_state = st.session_state.get(key, {})
    value = component_state.get("value", default)
    data = {"label": label, "value": value}
    result = text_component(
        data=data,
        default={"value": value},
        key=key,
        on_value_change=on_change,
    )
    return result


if st.button("Hello World"):
    st.session_state["my_text_input_instance"]["value"] = "Hello World"
if st.button("Clear text"):
    st.session_state["my_text_input_instance"]["value"] = ""
result = text_component_wrapper(
    "Enter something",
    default="I love Streamlit!",
    key="my_text_input_instance",
)

st.write("Result:", result)
st.write("Session state:", st.session_state)
```

</Collapse>

## File-based version

```none filename="Directory structure"
my_app/
├── streamlit_app.py
└── my_component/
    ├── __init__.py
    ├── component.html
    └── component.js
```

```markup filename="my_component/component.html"
<label style='padding-right: 1em;' for='txt'>Enter text</label>
<input id='txt' type='text' />
```

```javascript filename="my_component/component.js"
export default function (component) {
  const { setStateValue, parentElement, data } = component;

  const label = parentElement.querySelector("label");
  label.innerText = data.label;

  const input = parentElement.querySelector("input");
  if (input.value !== data.value) {
    input.value = data.value ?? "";
  }

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      setStateValue("value", e.target.value);
    }
  };

  input.onblur = (e) => {
    setStateValue("value", e.target.value);
  };
}
```

```python filename="my_component/__init__.py"
from pathlib import Path
import streamlit as st

component_dir = Path(__file__).parent

@st.cache_data
def load_component_code():
    with open(component_dir / "component.html", "r") as f:
        HTML = f.read()
    with open(component_dir / "component.js", "r") as f:
        JS = f.read()
    return HTML, JS

HTML, JS = load_component_code()

text_component = st.components.v2.component(
    name="my_text_input",
    html=HTML,
    js=JS,
)

def text_component_wrapper(
    label, *, default="", key=None, on_change=lambda: None
):
    component_state = st.session_state.get(key, {})
    value = component_state.get("value", default)
    data = {"label": label, "value": value}
    result = text_component(
        data=data,
        default={"value": value},
        key=key,
        on_value_change=on_change,
    )
    return result
```

```python filename="streamlit_app.py"
from my_component import text_component_wrapper

if st.button("Hello World"):
    st.session_state["my_text_input_instance"]["value"] = "Hello World"
if st.button("Clear text"):
    st.session_state["my_text_input_instance"]["value"] = ""
result = text_component_wrapper(
    "Enter something",
    default="I love Streamlit!",
    key="my_text_input_instance",
)

st.write("Result:", result)
st.write("Session state:", st.session_state)
```

## How it works

### The wrapper function pattern

The wrapper function creates a reusable interface for your component:

```python
def my_component_wrapper(
    label, *, default="", key=None, on_change=lambda: None
):
    # Read current state from Session State
    component_state = st.session_state.get(key, {})
    value = component_state.get("value", default)

    # Pass current value to component
    data = {"label": label, "value": value}
    result = my_component(
        data=data,
        default={"value": value},
        key=key,
        on_value_change=on_change,
    )
    return result
```

This pattern:

1. Reads the current value from Session State (falling back to `default`)
2. Passes the value to the component via `data`
3. Returns the result for the caller to use

### Syncing without interruption

The JavaScript checks if the value has actually changed before updating:

```javascript
if (input.value !== data.value) {
  input.value = data.value ?? "";
}
```

This prevents the input from being overwritten while the user is typing. Without this check, each rerun would reset the input to the last committed value.

### Programmatic updates

Buttons can modify Session State directly:

```python
if st.button("Hello World"):
    st.session_state["my_text_input_instance"]["value"] = "Hello World"
```

On the next rerun, the wrapper reads this new value from Session State and passes it to the component via `data`. The JavaScript then updates the input field.

## Related documentation

- [Bidirectional communication](/develop/concepts/custom-components/components-v2/communicate)
- [Component mounting](/develop/concepts/custom-components/components-v2/mount)
- [State vs trigger values](/develop/concepts/custom-components/components-v2/state-and-triggers)
