---
title: st.rerun
slug: /library/api-reference/control-flow/st.rerun
description: st.rerun will rerun the script immediately.
---

<Autofunction function="streamlit.rerun" />

### Caveats for `st.rerun`

`st.rerun` is one of the tools to control the logic of your app. While it is great for prototyping, there can be negative side effects:

- Additional script runs may be inefficient and slower.
- Excessive reruns may complicate your app's logic and be harder to follow.
- If used incorrectly, infinite looping may crash your app.

In many cases where `st.rerun` works, [callbacks](/library/api-reference/session-state#use-callbacks-to-update-session-state) may be a cleaner alternative. [Containers](/library/api-reference/layout) may also be useful.

### A simple example in three variations

#### Using `st.rerun` to update an earlier header

```python
st.header(st.session_state.value)

if st.button("Foo"):
    st.session_state.value = "Foo"
    st.rerun()
```

#### Using a callback to update an earlier header

```python
st.header(st.session_state.value)

def update_value():
    st.session_state.value = "Bar"

st.button("Bar", on_click=update_value)
```

#### Using containers to update an earlier header

```python
container = st.container()

if st.button("Foo"):
    st.session_state.value = "Foo"

container.header(st.session_state.value)
```
