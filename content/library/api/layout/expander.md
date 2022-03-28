---
title: st.expander
slug: /library/api-reference/layout/st.expander
description: st.expander inserts a multi-element container that can be expanded/collapsed.
---

<Autofunction function="streamlit.expander" />

Or you can use object notation and just call methods directly in the returned objects:

```python
import streamlit as st

st.bar_chart({"data": [1, 5, 2, 6, 2, 1]})

expander = st.expander("See explanation")
expander.write("""
    The chart above shows some numbers I picked for you.
    I rolled actual dice for these, so they're *guaranteed* to
    be random.
""")
expander.image("https://static.streamlit.io/examples/dice.jpg")
```
