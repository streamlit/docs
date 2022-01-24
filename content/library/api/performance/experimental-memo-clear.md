---
title: st.experimental_memo.clear
slug: /library/api-reference/performance/st.experimental_memo.clear
description: st.experimental_memo.clear clears all in-memory and on-disk memo caches.
---

<Autofunction function="streamlit.experimental_memo.clear" />

#### Example

In the example below, pressing the "Clear All" button will clear memoized values from all functions decorated with `@st.experimental_memo`.

```python
import streamlit as st

@st.experimental_memo
def square(x):
    return x**2

@st.experimental_memo
def cube(x):
    return x**3

if st.button("Clear All"):
    # Clear values from *all* memoized functions:
    # i.e. clear values from both square and cube
    st.experimental_memo.clear()
```
