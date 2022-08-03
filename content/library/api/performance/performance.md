---
title: Optimize performance
slug: /library/api-reference/performance
---

# Optimize performance

Streamlit provides powerful [cache primitives](/library/advanced-features/experimental-cache-primitives) for memoization and storing heavyweight singleton objects across sessions. They allow your app to stay performant even when loading data from the web, caching the results of expensive computations, and storing singleton objects (like TensorFlow/Torch/Keras sessions and/or database connections).

The two new primitives: `st.experimental_memo` and `st.experimental_singleton` are conceptually simpler and much, much faster than [@st.cache](/library/advanced-features/caching), with the potentional to replace `@st.cache` at some point in 2022.

<TileContainer>
<RefCard href="/library/api-reference/performance/st.cache">

#### Caching

Function decorator to memoize function executions.

```python
@st.cache(ttl=3600)
def run_long_computation(arg1, arg2):
  # Do stuff here
  return computation_output
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.experimental_memo">

#### Memo

Experimental function decorator to memoize function executions.

```python
@st.experimental_memo
def fetch_and_clean_data(url):
  # Fetch data from URL here, and then clean it up.
  return data
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.experimental_singleton">

#### Singleton

Experimental function decorator to store singleton objects.

```python
@st.experimental_singleton
def get_database_session(url):
  # Create a database session object that points to the URL.
  return session
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.experimental_memo.clear">

#### Clear memo

Clear all in-memory and on-disk memo caches.

```python
@st.experimental_memo
def fetch_and_clean_data(url):
  # Fetch data from URL here, and then clean it up.
  return data

if st.checkbox("Clear All"):
  # Clear values from *all* memoized functions
  st.experimental_memo.clear()
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.experimental_singleton.clear">

#### Clear singleton

Clear all singleton caches.

```python
@st.experimental_singleton
def get_database_session(url):
  # Create a database session object that points to the URL.
  return session

if st.button("Clear All"):
  # Clears all singleton caches:
  st.experimental_singleton.clear()
```

</RefCard>
</TileContainer>
