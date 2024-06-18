---
title: Working with widgets in multipage apps
slug: /develop/concepts/multipage-apps/widgets
description: Understand how widgets interact with pages
---

# Working with widgets in multipage apps

When you call a widget function in a Streamlit app, Streamlit creates a widget ID and uses it to make your widget stateful. As your users interact with your app and your app reruns, Streamlit keeps track of the widget's value by associating its value to its ID. In particular, a widget's ID depends on the page it's called from. If you define an identical widget on two different pages, then the widget will reset to its default value when you switch pages.

This guide explains several strategies to deal with the behavior if you'd like to have a widget remain stateful across all pages.

## Option 1 (preferred): Call your widget function in your entrypoint file

When you define your multipage app with `st.Page` and `st.navigation`, your entrypoint file becomes a frame of common elements around your pages. When you call a widget function in your entrypoint, it is associated to your entrypoint file instead of a particular page. Since your entrypoint file is executed in every app rerun, any widget in your entrypoint file will remain stateful as your users switch between pages.

This method does not work if you define your app with the `pages/` directory.

## Option 2: Save your widget values into a dummy key in Session State

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

## Option 3: Interrupt the widget clean-up process

When Streamlit gets to the end of an app run, it will delete the data for any widgets it has in memory that were not rendered on the screen. This includes data for any widget not associated to the current page. However, if you re-save a key-value pair in an app run, Streamlit will view this as new data not associated to a widget and therefore not delete it.

As a result, if you have the following code at the top of every page, any widget with the key `"my_key"` will retain its value wherever its rendered (or not).

```python
st.session_state.my_key = st.session_state.my_key
```
