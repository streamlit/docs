---
title: st.bottom
slug: /develop/api-reference/layout/st.bottom
description: st.bottom inserts a pinned container at the bottom of the app, perfect for chat inputs, toolbars, and persistent controls.
keywords: st.bottom, bottom, pinned container, sticky footer, chat input, toolbar, persistent controls, streamlit bottom
---

## st.bottom

`st.bottom` is a layout container pinned to the bottom of the main app area. Use it for chat inputs, toolbars, footers, and other controls that should stay visible while users scroll through your app content.

Elements can be passed to `st.bottom` using object notation and `with` notation.

The following two snippets are equivalent:

```python
# Object notation
st.bottom.[element_name]
```

```python
# "with" notation
with st.bottom:
    st.[element_name]
```

<Important>

`st.bottom` is only available in the **main app area**. Using it inside [`st.sidebar`](/develop/api-reference/layout/st.sidebar), [`st.dialog`](/develop/api-reference/execution-flow/st.dialog), or event containers (such as [`st.toast`](/develop/api-reference/status/st.toast)) raises an error.

</Important>

## Keep chat input at the bottom

[`st.chat_input`](/develop/api-reference/chat/st.chat_input) behaves differently depending on where you call it in your script. At the **base level** of your app (the main area, not inside another container), the chat input appears at the bottom of the app automatically.

If you call `st.chat_input` **inside a container**, it renders **inline** in that container instead. For example, `st.expander("Settings").chat_input(...)` places the input inside the expander, not at the bottom of the viewport.

Use `st.bottom` to force the chat input to the bottom in those cases:

```python
import streamlit as st

tab_chat, tab_logs = st.tabs(["Chat", "Logs"])

with tab_chat:
    st.write("Chat history goes here.")
    st.bottom.chat_input("Ask a question")

with tab_logs:
    st.write("Log output goes here.")
```

## Add a sticky footer

Use `st.bottom` for footers, toolbars, or status bars that should remain visible at the bottom of the viewport:

```python
import streamlit as st

st.title("Dashboard")
st.line_chart({"sales": [10, 20, 15, 30, 25]})

with st.bottom:
    st.caption("© 2026 My Company · All rights reserved")
```
