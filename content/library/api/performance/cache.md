---
title: st.cache
slug: /library/api-reference/performance/st.cache
description: st.cache is used to memoize function executions.
---

# st.cache

When you mark a function with Streamlit’s cache annotation, it tells Streamlit
that whenever the function is called it should check three things:

1. The name of the function
2. The actual code that makes up the body of the function
3. The input parameters that you called the function with

If this is the first time Streamlit has seen those three items, with those exact
values, and in that exact combination, it runs the function and stores the
result in a local cache.

Then, next time the function is called, if those three values have not changed
Streamlit knows it can skip executing the function altogether. Instead, it just
reads the output from the local cache and passes it on to the caller.

The main limitation is that Streamlit’s cache feature doesn’t know about
changes that take place outside the body of the annotated function.

For more information about the Streamlit cache, its configuration parameters,
and its limitations, see [Caching](/library/advanced-features/caching).

<Autofunction function="streamlit.cache" deprecated={true} deprecatedText="<code>st.cache</code> was deprecated in version 1.18.0. Use <a href='/library/api-reference/performance/st.cache_data'><code>st.cache_data</code></a> or <a href='/library/api-reference/performance/st.cache_resource'><code>st.cache_resource</code></a> instead. Learn more in <a href='/library/advanced-features/caching'>Caching</a>."/>
