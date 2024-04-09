---
title: Create a fragment with disconnected content
slug: /develop/tutorials/execution-flow/create-a-disconnected-fragment
---

# Create a fragment with disconnected content

Streamlit lets you turn function into fragments which can rerun independently from the full script. If your fragment is written to a single container, Streamlit will clear and redraw all the fragment elements with each fragment rerun. However, when you use a fragment to write elements to outside containers, those elements will not be cleared during a fragment rerun. Instead, those elements accumulate with each fragment rerun until the next full-script rerun. If you want a fragment to update multiple, disconnected parts of your app, use `st.empty` containers to prevent accumulating elements.

## Prerequisites

**`streamlit>=1.33.0`**

- This tutorial uses fragments, which was introduced in Streamlit version 1.33.0.
- This tutorial assumes you have a clean working directory called `your-repository`.

## Summary

In this example,

## Build the example
