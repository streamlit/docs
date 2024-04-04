---
title: How to remove "· Streamlit" from the app title?
slug: /knowledge-base/using-streamlit/remove-streamlit-app-title
---

# How to remove "· Streamlit" from the app title?

Using [`st.set_page_config`](/develop/api-reference/configuration/st.set_page_config) to assign the page title will not append "· Streamlit" to that title. E.g.:

```python
import streamlit as st

st.set_page_config(
   page_title="Ex-stream-ly Cool App",
   page_icon="🧊",
   layout="wide",
   initial_sidebar_state="expanded",
)
```
