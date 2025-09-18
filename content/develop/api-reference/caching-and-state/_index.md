---
title: Caching and state
slug: /develop/api-reference/caching-and-state
description: Optimize performance and manage state in Streamlit apps with st.cache_data, st.cache_resource, session state, and query parameters for efficient applications.
keywords: caching, state, session state, cache_data, cache_resource, query_params, context, performance, optimization
---

# Caching and state

Optimize performance and add statefulness to your app!

## Caching

Streamlit provides powerful [cache primitives](/develop/concepts/architecture/caching) for data and global resources. They allow your app to stay performant even when loading data from the web, manipulating large datasets, or performing expensive computations.

<TileContainer>

<RefCard href="/develop/api-reference/caching-and-state/st.cache_data" size="half">

<h4>Cache data</h4>

Function decorator to cache functions that return data (e.g. dataframe transforms, database queries, ML inference).

```python
@st.cache_data
def long_function(param1, param2):
  # Perform expensive computation here or
  # fetch data from the web here
  return data
```

</RefCard>

<RefCard href="/develop/api-reference/caching-and-state/st.cache_resource" size="half">

<h4>Cache resource</h4>

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

</TileContainer>

## Browser and server state

Streamlit re-executes your script with each user interaction. Widgets have built-in statefulness between reruns, but Session State lets you do more!

<TileContainer>
<RefCard href="/develop/api-reference/caching-and-state/st.context">

<h4>Context</h4>

`st.context` provides a read-only interface to access cookies, headers, locale, and other browser-session information.

```python
st.context.cookies
st.context.headers
```

</RefCard>
<RefCard href="/develop/api-reference/caching-and-state/st.session_state">

<h4>Session State</h4>

Save data between reruns and across pages.

```python
st.session_state["foo"] = "bar"
```

</RefCard>
<RefCard href="/develop/api-reference/caching-and-state/st.query_params">

<h4>Query parameters</h4>

Get, set, or clear the query parameters that are shown in the browser's URL bar.

```python
st.query_params[key] = value
st.query_params.clear()
```

</RefCard>

</TileContainer>

## Deprecated commands

<TileContainer>

<RefCard href="/develop/api-reference/caching-and-state/st.experimental_get_query_params" size="half" deprecated={true}>

<h4>Get query parameters</h4>

Get query parameters that are shown in the browser's URL bar.

```python
param_dict = st.experimental_get_query_params()
```

</RefCard>
<RefCard href="/develop/api-reference/caching-and-state/st.experimental_set_query_params" size="half" deprecated={true}>

<h4>Set query parameters</h4>

Set query parameters that are shown in the browser's URL bar.

```python
st.experimental_set_query_params(
  {"show_all"=True, "selected"=["asia", "america"]}
)
```

</RefCard>
</TileContainer>
