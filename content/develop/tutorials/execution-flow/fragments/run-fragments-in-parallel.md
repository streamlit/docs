---
title: Speed up your app with parallel fragments
slug: /develop/tutorials/execution-flow/run-fragments-in-parallel
description: Learn how to run Streamlit fragments concurrently with parallel=True to load slow, independent operations like database queries and API calls at the same time.
keywords: parallel fragments, st.fragment, parallel, concurrency, threading, performance, slow queries, api calls, execution flow, app performance
---

# Speed up your app with parallel fragments

Streamlit lets you turn functions into [fragments](/develop/concepts/architecture/fragments), which can rerun independently from the full script. By default, fragments run one after another on the main thread. If your app has several slow, independent operations—like database queries or API calls—you can run them at the same time by setting `parallel=True` in the [`@st.fragment`](/develop/api-reference/execution-flow/st.fragment) decorator. During a full-app rerun, Streamlit dispatches each parallel fragment to a thread pool so they execute concurrently instead of blocking each other.

## Applied concepts

- Use `parallel=True` to run slow, independent fragments concurrently.
- Store each fragment's results in Session State to safely combine them.

## Prerequisites

- This tutorial requires the following version of Streamlit:

  ```text
  streamlit>=1.58.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of fragments and Session State.

## Summary

In this example, you'll build an app that loads data from three independent, slow sources. Without parallel fragments, the app waits for each source in turn, so the total load time is the sum of all three. By marking each source's fragment with `parallel=True`, the three loads run concurrently during a full-app rerun, and the app finishes in about the time of the slowest single source.

You'll simulate slow work with `time.sleep`, but in a real app these fragments would run database queries, call external APIs, or perform other independent, time-consuming work.

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

```python
import streamlit as st
import time
import random


def slow_load(source_name, seconds):
    """Simulate a slow, independent data source."""
    time.sleep(seconds)
    return {"source": source_name, "value": random.randint(0, 100)}


st.title("Parallel data loading")

@st.fragment(parallel=True)
def load_sales():
    result = slow_load("Sales", 3)
    st.session_state.sales = result
    st.metric("Sales", result["value"])

@st.fragment(parallel=True)
def load_traffic():
    result = slow_load("Traffic", 3)
    st.session_state.traffic = result
    st.metric("Traffic", result["value"])

@st.fragment(parallel=True)
def load_inventory():
    result = slow_load("Inventory", 3)
    st.session_state.inventory = result
    st.metric("Inventory", result["value"])

start = time.time()

cols = st.columns(3)
with cols[0]:
    load_sales()
with cols[1]:
    load_traffic()
with cols[2]:
    load_inventory()
```

</Collapse>

## Build the app

### Initialize your app and a slow data source

1. In `your-repository`, create a file named `app.py`.

1. In a terminal, change directories to `your-repository`, and start your app.

   ```bash
   streamlit run app.py
   ```

   Your app will be blank because you still need to add code.

1. In `app.py`, write the following:

   ```python
   import streamlit as st
   import time
   import random
   ```

   You'll use `time` to simulate slow work and `random` to generate sample values.

1. Save your `app.py` file, and view your running app.

1. In your app, select "**Always rerun**", or press the "**A**" key.

   Your preview will be blank but will automatically update as you save changes to `app.py`.

1. Return to your code.

1. Define a helper function to simulate a slow, independent data source.

   ```python
   def slow_load(source_name, seconds):
       """Simulate a slow, independent data source."""
       time.sleep(seconds)
       return {"source": source_name, "value": random.randint(0, 100)}
   ```

   In a real app, you'd replace the `time.sleep` call with a database query, an API call, or another time-consuming operation.

1. Add a title to your app.

   ```python
   st.title("Parallel data loading")
   ```

### Define parallel fragments for each data source

Each data source is independent, so each one is a good candidate for its own parallel fragment. Each fragment writes its result to its own Session State key, which keeps the fragments from interfering with each other when they run concurrently.

1. Define a fragment to load your first source.

   ```python
   @st.fragment(parallel=True)
   def load_sales():
       result = slow_load("Sales", 3)
       st.session_state.sales = result
       st.metric("Sales", result["value"])
   ```

   The `parallel=True` argument tells Streamlit to dispatch this fragment to a thread pool during a full-app rerun so it can run at the same time as your other parallel fragments.

1. Define fragments for your other two sources in the same way.

   ```python
   @st.fragment(parallel=True)
   def load_traffic():
       result = slow_load("Traffic", 3)
       st.session_state.traffic = result
       st.metric("Traffic", result["value"])


   @st.fragment(parallel=True)
   def load_inventory():
       result = slow_load("Inventory", 3)
       st.session_state.inventory = result
       st.metric("Inventory", result["value"])
   ```

   Each fragment writes to a different Session State key (`sales`, `traffic`, and `inventory`). Because parallel fragments can run concurrently, having each one write to its own key avoids race conditions.

### Call your fragments and measure the speedup

1. Call each fragment in its own column.

   ```python
   start = time.time()

   cols = st.columns(3)
   with cols[0]:
       load_sales()
   with cols[1]:
       load_traffic()
   with cols[2]:
       load_inventory()
   ```

   Each fragment renders its metric into its own column. Because the columns are created in the main body of the script, each fragment writes only into its own main body.

1. Save your `app.py` file, and view your running app.

   Each fragment sleeps for three seconds, but because they run in parallel, your app loads in about three seconds total instead of nine. Try changing `parallel=True` to `parallel=False` (or removing it) to see the difference: the app will take about nine seconds because the fragments run one after another.

## Next steps

Replace the `slow_load` helper with your own slow operations, such as database queries or API calls. To learn more about parallel execution, including command restrictions and thread safety, see [Run fragments in parallel](/develop/concepts/architecture/fragments#run-fragments-in-parallel).

```

```
