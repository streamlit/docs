---
title: st.experimental_singleton.clear
slug: /library/api-reference/performance/st.experimental_singleton.clear
description: st.experimental_singleton.clear clears all singleton caches.
---

<Important>

This is an experimental feature. Experimental features and their APIs may change or be removed at any time. To learn more, click [here](/library/advanced-features/prerelease#experimental-features).

</Important>

<Autofunction function="streamlit.experimental_singleton.clear" deprecated={true} deprecatedText="<code>st.experimental_singleton.clear</code> was deprecated in version 1.18.0. Use <a href='/library/api-reference/performance/st.cache_resource.clear'><code>st.cache_resource.clear</code></a> instead. Learn more in <a href='/library/advanced-features/caching'>Caching</a>."/>

#### Example

In the example below, pressing the "Clear All" button will clear _all_ singleton caches. i.e. Clears cached singleton objects from all functions decorated with `@st.experimental_singleton`.

```python
import streamlit as st
from transformers import BertModel

@st.experimental_singleton
 def get_database_session(url):
     # Create a database session object that points to the URL.
     return session

@st.experimental_singleton
def get_model(model_type):
    # Create a model of the specified type.
    return BertModel.from_pretrained(model_type)

if st.button("Clear All"):
    # Clears all singleton caches:
    st.experimental_singleton.clear()
```
