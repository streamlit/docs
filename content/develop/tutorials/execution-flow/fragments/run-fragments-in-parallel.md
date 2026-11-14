---
title: Speed up your app with parallel fragments
slug: /develop/tutorials/execution-flow/run-fragments-in-parallel
description: Learn how to run Streamlit fragments concurrently with parallel=True to load slow, independent operations like database queries and API calls at the same time.
keywords: parallel fragments, st.fragment, parallel, concurrency, threading, performance, slow queries, api calls, execution flow, app performance
---

# Speed up your app with parallel fragments

Streamlit lets you turn functions into [fragments](/develop/concepts/architecture/fragments), which can rerun independently from the full script. By default, fragments run one after another on the main thread. If your app has several slow operations, you can run them at the same time by setting `parallel=True` in the [`@st.fragment`](/develop/api-reference/execution-flow/st.fragment) decorator. During a full-app rerun, Streamlit dispatches each parallel fragment to a thread pool so they execute concurrently instead of blocking each other.

Not every slow operation is a good candidate for parallel=True. Before marking a fragment parallel, check whether it's truly independent of your app's other fragments. Independent operations don't need each other's output, and don't share a common state. For example:

- Three API calls to unrelated services (a weather API, a currency-conversion API, and a news headlines API) where none of the responses feed into the others.
- Two database queries against unrelated tables, such as loading a product catalog and loading a list of open support tickets.
- Resizing five unrelated uploaded images, where each image is processed on its own.

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
    start = time.perf_counter()

    # Dummy sleep to simulate a slow API/DB source.
    time.sleep(seconds)
    elapsed = time.perf_counter() - start

    return {"source": source_name, "value": random.randint(0, 100), "elapsed": elapsed}

st.title("Parallel data loading")

@st.fragment(parallel=True)
def load_sales():
    if st.button("Refresh sales"):
        with st.spinner("Loading sales data..."):
            result = slow_load("Sales", 2.8)
    else:
        with st.skeleton(height=100):
            result = slow_load("Sales", 2.8)

    st.session_state["sales_result"] = result
    st.metric("Sales", result["value"])
    st.write("Elapsed time: {:.2f} seconds".format(result["elapsed"]))

@st.fragment(parallel=True)
def load_traffic():
    if st.button("Refresh traffic"):
        with st.spinner("Loading traffic data..."):
            result = slow_load("Traffic", 1.9)
    else:
        with st.skeleton(height=100):
            result = slow_load("Traffic", 1.9)

    st.session_state["traffic_result"] = result
    st.metric("Traffic", result["value"])
    st.write("Elapsed time: {:.2f} seconds".format(result["elapsed"]))


@st.fragment(parallel=True)
def load_inventory():
    if st.button("Refresh inventory"):
        with st.spinner("Loading inventory data..."):
            result = slow_load("Inventory", 1.2)
    else:
        with st.skeleton(height=100):
            result = slow_load("Inventory", 1.2)

    st.session_state["inventory_result"] = result
    st.metric("Inventory", result["value"])
    st.write("Elapsed time: {:.2f} seconds".format(result["elapsed"]))

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
       start = time.perf_counter()
       # Dummy sleep to simulate a slow API/DB source.
       time.sleep(seconds)
       elapsed = time.perf_counter() - start
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
       result = slow_load("Sales", 2.8)
       st.session_state["sales_result"] = result
       st.metric("Sales", result["value"])

       st.write("Elapsed time: {:.2f} seconds".format(result["elapsed"]))
   ```

   The `parallel=True` argument tells Streamlit to dispatch this fragment to a thread pool during a full-app rerun so it can run at the same time as your other parallel fragments.

   Storing `result` in `st.session_state["sales_result"]` matters because `load_sales` runs concurrently with `load_traffic` and `load_inventory` in separate threads. Writing to a key that's unique to this fragment means no other fragment ever reads or writes it at the same time, so there's no race condition to worry about.

   However, once you start appending results to a shared list or a shared key in a dict, then a thread lock would be required for each write operation.

1. Define fragments for your other source in the same way, each writing to its own Session State key.

   ```python
   @st.fragment(parallel=True)
   def load_traffic():
       result = slow_load("Traffic", 1.9)
       st.session_state["traffic_result"] = result
       st.metric("Traffic", result["value"])
       st.write("Elapsed time: {:.2f} seconds".format(result["elapsed"]))


   @st.fragment(parallel=True)
   def load_inventory():
      result = slow_load("Inventory", 1.2)
       st.session_state["inventory_result"] = result
       st.metric("Inventory", result["value"])
       st.write("Elapsed time: {:.2f} seconds".format(result["elapsed"]))

   ```

### Call your fragments

1. Call each fragment in its own column.

   ```python
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

   Because the fragments run in parallel, your app loads in the time taken by the slowest one, in this case about three seconds. Try changing `parallel=True` to `parallel=False` (or removing it) to see the difference: the app will take about six seconds because the fragments run one after another.

### Add a refresh button with a spinner and skeleton

Right now, each fragment loads automatically every time it runs, with no visual feedback while `slow_load` is working. Add a button to each fragment so a user can trigger a manual refresh, and use `st.spinner` and `st.skeleton` to show a placeholder while the load is in progress.

1. Update `load_sales` to check for a button press. Use `st.spinner` while reloading after a click, and `st.skeleton` as a placeholder on the fragment's first run. Keep storing the result under its own Session State key so the fragment stays race-condition-free.

   ```python
   @st.fragment(parallel=True)
   def load_sales():
       if st.button("Refresh sales"):
           with st.spinner("Loading sales data..."):
               result = slow_load("Sales", 2.8)
       else:
           with st.skeleton(height=100):
               result = slow_load("Sales", 2.8)

       st.session_state["sales_result"] = result
       st.metric("Sales", result["value"])
       st.write("Elapsed time: {:.2f} seconds".format(result["elapsed"]))
   ```

   Clicking "**Refresh sales**" reruns just this fragment. The `if` branch shows a spinner with a status message while `slow_load` runs again; the `else` branch (the fragment's initial run) shows a skeleton of the same height while the first load completes. Either way, the result lands in `st.session_state["sales_result"]`, a key only this fragment ever writes to.

1. Update `load_traffic` and `load_inventory` the same way.

   ```python
   @st.fragment(parallel=True)
   def load_traffic():
       if st.button("Refresh traffic"):
           with st.spinner("Loading traffic data..."):
               result = slow_load("Traffic", 1.9)
       else:
           with st.skeleton(height=100):
               result = slow_load("Traffic", 1.9)

       st.session_state["traffic_result"] = result
       st.metric("Traffic", result["value"])
       st.write("Elapsed time: {:.2f} seconds".format(result["elapsed"]))


   @st.fragment(parallel=True)
   def load_inventory():
       if st.button("Refresh inventory"):
           with st.spinner("Loading inventory data..."):
               result = slow_load("Inventory", 1.2)
       else:
           with st.skeleton(height=100):
               result = slow_load("Inventory", 1.2)

       st.session_state["inventory_result"] = result
       st.metric("Inventory", result["value"])
       st.write("Elapsed time: {:.2f} seconds".format(result["elapsed"]))
   ```

1. Save your `app.py` file, and view your running app.

   On first load, all three columns show a skeleton placeholder while their fragments run concurrently. Once the initial load finishes, click any "**Refresh**" button to reload just that source: it shows a spinner while `slow_load` runs, then updates only its own metric and elapsed time, without affecting the other two columns.

## Next steps

Replace the `slow_load` helper with your own slow operations, such as database queries or API calls. To learn more about parallel execution, including command restrictions and thread safety, see [Run fragments in parallel](/develop/concepts/architecture/fragments#run-fragments-in-parallel).
