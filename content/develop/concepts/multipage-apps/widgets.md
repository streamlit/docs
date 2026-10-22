---
title: Working with widgets in multipage apps
slug: /develop/concepts/multipage-apps/widgets
description: Learn how widgets behave across pages in multipage Streamlit apps, including widget state management, IDs, and cross-page interactions.
keywords: multipage widgets, widget state, widget IDs, cross-page widgets, widget behavior, state management, multipage interactions, widget persistence
---

# Working with widgets in multipage apps

When you create a widget in a Streamlit app, Streamlit generates a widget ID and uses it to make your widget stateful. As your app reruns with user interaction, Streamlit keeps track of the widget's value by associating its value to its ID. In particular, a widget's ID depends on the page where it's created. By default, if you define an identical widget on two different pages, then the widget will reset to its default value when you switch pages.

This guide explains four strategies to deal with the behavior if you'd like to have a widget remain stateful across all pages. If you don't want a widget to appear on all pages, but you do want it to remain stateful when you navigate away from its page (and then back), use Option 2. Options 3 and 4 are manual alternatives that use Session State directly. For detailed information about these strategies, see [Understanding widget behavior](/develop/concepts/architecture/widget-behavior).

## Option 1 (preferred): Execute your widget command in your entrypoint file

When you define your multipage app with `st.Page` and `st.navigation`, your entrypoint file becomes a frame of common elements around your pages. When you execute a widget command in your entrypoint file, Streamlit associates the widget to your entrypoint file instead of a particular page. Since your entrypoint file is executed in every app rerun, any widget in your entrypoint file will remain stateful as your users switch between pages.

This method does not work if you define your app with the `pages/` directory.

The following example includes a selectbox and slider in the sidebar that are rendered and stateful on all pages. The widgets each have an assigned key so you can access their values through Session State within a page.

**Directory structure:**

```
your-repository/
├── page_1.py
├── page_2.py
└── streamlit_app.py
```

**`streamlit_app.py`:**

```python
import streamlit as st

pg = st.navigation([st.Page("page_1.py"), st.Page("page_2.py")])

st.sidebar.selectbox("Group", ["A","B","C"], key="group")
st.sidebar.slider("Size", 1, 5, key="size")

pg.run()
```

## Option 2: Set `persist_state="session"` on your widget

If a widget is on an individual page, set `persist_state="session"` and provide a `key`. Streamlit keeps the widget's value for the rest of the session, even when the user switches to another page. When the user navigates back, the widget shows the saved value. This also works if you define an identical widget, with the same key, on multiple pages.

```python
import streamlit as st

st.number_input("Number of filters", key="my_key", persist_state="session")
```

`persist_state` is available on most input widgets, but not on buttons, file and media inputs, `st.chat_input`, or `st.data_editor`. For more information, see [Keep a widget's value with persist_state](/develop/concepts/architecture/widget-behavior#keep-a-widgets-value-with-persist_state).

## Option 3: Save your widget values into a dummy key in Session State

If you want to navigate away from a widget and return to it while keeping its value, or if you want to use the same widget on multiple pages, use a separate key in `st.session_state` to save the value independently from the widget. In this example, a temporary key is used with a widget. The temporary key uses an underscore prefix. Hence, `"_my_key"` is used as the widget key, but the data is copied to `"my_key"` to preserve it between pages.

```python
import streamlit as st

def store_value():
    # Copy the value to the permanent key
    st.session_state["my_key"] = st.session_state["_my_key"]

# Copy the saved value to the temporary key
st.session_state["_my_key"] = st.session_state["my_key"]
st.number_input("Number of filters", key="_my_key", on_change=store_value)
```

If this is functionalized to work with multiple widgets, it could look something like this:

```python
import streamlit as st

def store_value(key):
    st.session_state[key] = st.session_state["_"+key]
def load_value(key):
    st.session_state["_"+key] = st.session_state[key]

load_value("my_key")
st.number_input("Number of filters", key="_my_key", on_change=store_value, args=["my_key"])
```

## Option 4: Interrupt the widget clean-up process

When Streamlit gets to the end of an app run, it will delete the data for any widgets that were not rendered. This includes data for any widget not associated to the current page. However, if you re-save a key-value pair in an app run, Streamlit will not associate the key-value pair to any widget until you execute a widget command again with that key.

As a result, if you have the following code at the top of every page, any widget with the key `"my_key"` will retain its value wherever it's rendered (or not). Alternatively, if you are using `st.navigation` and `st.Page`, you can include this once in your entrypoint file before executing your page.

```python
if "my_key" in st.session_state:
    st.session_state.my_key = st.session_state.my_key
```
