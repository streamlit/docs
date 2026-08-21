---
title: st.cache_resource
slug: /develop/api-reference/caching-and-state/st.cache_resource
description: st.cache_resource is used to cache functions that return shared, global resources (e.g. database connections, ML models).
keywords: cache_resource, caching, resources, global resources, database connections, ml models, singleton, performance
---

<Tip>

This page only contains information on the `st.cache_resource` API. For a deeper dive into caching and how to use it, check out [Caching](/develop/concepts/architecture/caching).

</Tip>

<Autofunction function="streamlit.cache_resource" oldName="streamlit.experimental_singleton" />

<Autofunction function="streamlit.cache_resource.clear" oldName="streamlit.experimental_singleton.clear" />

#### Example

In the example below, pressing the "Clear All" button will clear _all_ cache_resource caches. i.e. Clears cached global resources from all functions decorated with `@st.cache_resource`.

```python
import streamlit as st
from transformers import BertModel

@st.cache_resource
 def get_database_session(url):
     # Create a database session object that points to the URL.
     return session

@st.cache_resource
def get_model(model_type):
    # Create a model of the specified type.
    return BertModel.from_pretrained(model_type)

if st.button("Clear All"):
    # Clears all st.cache_resource caches:
    st.cache_resource.clear()
```

<Autofunction function="CachedFunc.clear" />

## Using Streamlit commands in cached functions

### Static elements

Since version 1.16.0, cached functions can contain Streamlit commands! For example, you can do this:

```python
from transformers import pipeline

@st.cache_resource
def load_model():
    model = pipeline("sentiment-analysis")
    st.success("Loaded NLP model from Hugging Face!")  # 👈 Show a success message
    return model
```

As we know, Streamlit only runs this function if it hasn’t been cached before. On this first run, the `st.success` message will appear in the app. But what happens on subsequent runs? It still shows up! Streamlit realizes that there is an `st.` command inside the cached function, saves it during the first run, and replays it on subsequent runs. Replaying static elements works for both caching decorators.

You can also use this functionality to cache entire parts of your UI:

```python
@st.cache_resource
def load_model():
    st.header("Data analysis")
    model = torchvision.models.resnet50(weights=ResNet50_Weights.DEFAULT)
    st.success("Loaded model!")
    st.write("Turning on evaluation mode...")
    model.eval()
    st.write("Here's the model:")
    return model
```
