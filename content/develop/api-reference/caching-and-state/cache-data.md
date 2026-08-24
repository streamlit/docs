---
title: st.cache_data
slug: /develop/api-reference/caching-and-state/st.cache_data
description: st.cache_data is used to cache functions that return data (e.g. dataframe transforms, database queries, ML inference).
keywords: cache_data, caching, data, dataframe, database, ml inference, performance, optimization, memoization
---

<Tip>

This page only contains information on the `st.cache_data` API. For a deeper dive into caching and how to use it, check out [Caching](/develop/concepts/architecture/caching).

</Tip>

<Autofunction function="streamlit.cache_data" oldName="streamlit.experimental_memo" />

<Warning>

`st.cache_data` implicitly uses the `pickle` module, which is known to be insecure. Anything your cached function returns is pickled and stored, then unpickled on retrieval. Ensure your cached functions return trusted values because it is possible to construct malicious pickle data that will execute arbitrary code during unpickling. Never load data that could have come from an untrusted source in an unsafe mode or that could have been tampered with. **Only load data you trust**.

</Warning>

<Autofunction function="streamlit.cache_data.clear" oldName="streamlit.experimental_memo.clear" />

#### Example

In the example below, pressing the "Clear All" button will clear memoized values from all functions decorated with `@st.cache_data`.

```python
import streamlit as st

@st.cache_data
def square(x):
    return x**2

@st.cache_data
def cube(x):
    return x**3

if st.button("Clear All"):
    # Clear values from *all* all in-memory and on-disk data caches:
    # i.e. clear values from both square and cube
    st.cache_data.clear()
```

<Autofunction function="CachedFunc.clear" />

## Using Streamlit commands in cached functions

### Static elements

Since version 1.16.0, cached functions can contain Streamlit commands! For example, you can do this:

```python
@st.cache_data
def get_api_data():
    data = api.get(...)
    st.success("Fetched data from API!")  # 👈 Show a success message
    return data
```

As we know, Streamlit only runs this function if it hasn’t been cached before. On this first run, the `st.success` message will appear in the app. But what happens on subsequent runs? It still shows up! Streamlit realizes that there is an `st.` command inside the cached function, saves it during the first run, and replays it on subsequent runs. Replaying static elements works for both caching decorators.

You can also use this functionality to cache entire parts of your UI:

```python
@st.cache_data
def show_data():
    st.header("Data analysis")
    data = api.get(...)
    st.success("Fetched data from API!")
    st.write("Here is a plot of the data:")
    st.line_chart(data)
    st.write("And here is the raw data:")
    st.dataframe(data)
```
