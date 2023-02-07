---
title: st.experimental_memo.clear
slug: /library/api-reference/performance/st.experimental_memo.clear
description: st.experimental_memo.clear clears all in-memory and on-disk memo caches.
---

<Important>

This is an experimental feature. Experimental features and their APIs may change or be removed at any time. To learn more, click [here](/library/advanced-features/prerelease#experimental-features).

</Important>

<Autofunction function="streamlit.experimental_memo.clear" deprecated={true} deprecatedText="<code>st.experimental_memo.clear</code> was deprecated in version 1.18.0. Use <a href='/library/api-reference/performance/st.cache_data.clear'><code>st.cache_data.clear</code></a> instead. Learn more in <a href='/library/advanced-features/caching'>Caching</a>."/>

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
