---
title: Optimize performance
slug: /library/api-reference/performance
---

# Optimize performance

Streamlit provides powerful [cache primitives](/library/advanced-features/caching) for data and global resources. They allow your app to stay performant even when loading data from the web, manipulating large datasets, or performing expensive computations.

<TileContainer>

<RefCard href="/library/api-reference/performance/st.cache_data" size="half">

#### Cache data

Function decorator to cache functions that return data (e.g. dataframe transforms, database queries, ML inference).

```python
@st.cache_data
def long_function(param1, param2):
  # Perform expensive computation here or
  # fetch data from the web here
  return data
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.cache_resource" size="half">

#### Cache resource

Function decorator to cache functions that return global resources (e.g. database connections, ML models).

```python
@st.cache_resource
def init_model():
  # Return a global resource here
  return pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
  )
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.cache_data.clear" size="half">

#### Clear cached data

Clear all in-memory and on-disk data caches.

```python
@st.cache_data
def long_function(param1, param2):
  # Perform expensive computation here or
  # fetch data from the web here
  return data

if st.checkbox("Clear All"):
  # Clear values from *all* cache_data functions
  st.cache_data.clear()
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.cache_resource.clear" size="half">

#### Clear cached resources

Clear all `st.cache_resource` caches.

```python
@st.cache_resource
def init_model():
  # Return a global resource here
  return pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
  )

if st.checkbox("Clear All"):
  # Clear values from *all* cache_resource functions
  st.cache_resource.clear()
```

</RefCard>

</TileContainer>

<Important>

All the below commands were deprecated in version 1.18.0. Use the new commands above instead. Learn more in [Caching](/library/advanced-features/caching).
</Important>

## Deprecated commands

<TileContainer>

<RefCard href="/library/api-reference/performance/st.cache" deprecated={true}>

> This command was deprecated in version 1.18.0. Use `st.cache_data` or `st.cache_resource` instead.

#### Caching

Function decorator to memoize function executions.

```python
@st.cache(ttl=3600)
def run_long_computation(arg1, arg2):
  # Do stuff here
  return computation_output
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.experimental_memo" deprecated={true}>

> This command was deprecated in version 1.18.0. Use `st.cache_data` instead.

#### Memo

Experimental function decorator to memoize function executions.

```python
@st.experimental_memo
def fetch_and_clean_data(url):
  # Fetch data from URL here, and then clean it up.
  return data
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.experimental_singleton" deprecated={true}>

> This command was deprecated in version 1.18.0. Use `st.cache_resource` instead.

#### Singleton

Experimental function decorator to store singleton objects.

```python
@st.experimental_singleton
def get_database_session(url):
  # Create a database session object that points to the URL.
  return session
```

</RefCard>

<RefCard href="/library/api-reference/performance/st.experimental_memo.clear" deprecated={true}>

> This command was deprecated in version 1.18.0. Use `st.cache_data.clear` instead.

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

<RefCard href="/library/api-reference/performance/st.experimental_singleton.clear"  deprecated={true}>

> This command was deprecated in version 1.18.0. Use `st.cache_resource.clear`instead.

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
