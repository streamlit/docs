---
title: Start and stop a streaming fragment
slug: /develop/tutorials/execution-flow/start-and-stop-fragment-auto-reruns
---

# Start and stop a streaming fragment

Streamlit lets you turn function into fragments which can rerun independently from the full script. A fragment can be set to automatically rerun at a set time interval. This is great for streaming data or monitoring processes. You may want the user to start and stop this live streaming. To do this, you can programmatically set the `run_every` parameter for your fragment.

## Prerequisites

**`streamlit>=1.33.0`**

- This tutorial uses fragments, which require Streamlit version 1.33.0 or later.
- This tutorial assumes you have a clean working directory called `your-repository`.

## Summary

## Build the example
