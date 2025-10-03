---
title: st.markdown
slug: /develop/api-reference/text/st.markdown
description: st.markdown displays a string formatted as Markdown.
keywords: markdown, text, formatting, html, display
---

<Autofunction function="streamlit.markdown" />

```python
import streamlit as st
import re
import streamlit as st

md = st.text_area('Type in your markdown string (without outer quotes)',
                  "Happy Streamlit-ing! :balloon:")

st.code(f"""
import streamlit as st

st.markdown('''{md}''')
""")

st.markdown(md)
```

<Cloud name="doc-markdown1" ```python
import re
import streamlit as st

HEX = re.compile(r"^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$")

def chip(h: str, size: int = 16) -> str:
    # Return empty string for anything that is not a valid hex code
    if not HEX.match(h):
        return ""
    return (
        f'<span style="display:inline-block;width:{size}px;height:{size}px;'
        f'background:{h};border:1px solid #ccc;margin-right:8px;'
        f'vertical-align:middle;"></span> {h}'
    )

hex_values = ["#FF5733", "#1E90FF", "#2ECC71", "#8E44AD"]
html = "".join(chip(h) for h in hex_values)
st.markdown(html, unsafe_allow_html=True)