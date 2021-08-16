---
title: Layouts and Containers
slug: /library/api-reference/layout
---

# Layouts and Containers

## Add widgets to sidebar

Not only can you add interactivity to your report with widgets, you can organize them into a sidebar with `st.sidebar.[element_name]`. Each element that's passed to `st.sidebar` is pinned to the left, allowing users to focus on the content in your app. The only elements that aren't supported are `st.echo` and `st.spinner`.

Here's an example of how you'd add a selectbox to your sidebar.

```python
import streamlit as st

add_selectbox = st.sidebar.selectbox(
    "How would you like to be contacted?",
    ("Email", "Home phone", "Mobile phone")
)
```

## Complex layouts

In addition to the sidebar, you have a few other options for controlling how your app is laid out.

<Autofunction function="streamlit.beta_columns" />
<Autofunction function="streamlit.beta_expander" />
<Autofunction function="streamlit.beta_container" />
<Autofunction function="streamlit.empty" />
