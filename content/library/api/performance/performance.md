---
title: Optimize performance
slug: /library/api-reference/performance
---

# Optimize performance

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
</TileContainer>
