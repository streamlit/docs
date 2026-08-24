---
title: st.markdown
slug: /develop/api-reference/text/st.markdown
description: st.markdown displays a string formatted as Markdown.
keywords: markdown, text, formatting, html, display
---

<Autofunction function="streamlit.markdown" />

```python
import streamlit as st

md = st.text_area('Type in your markdown string (without outer quotes)',
                  "Happy Streamlit-ing! :balloon:")

st.code(f"""
import streamlit as st

st.markdown('''{md}''')
""")

st.markdown(md)
```

<Cloud name="doc-markdown1" height="500px" />
