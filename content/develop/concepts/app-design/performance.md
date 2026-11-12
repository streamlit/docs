---
title: Optimizing app performance
slug: /develop/concepts/design/performance
description: Learn how to make your Streamlit app fast and responsive with caching, fragments, forms, conditional rendering, render order, skeleton loading states, and client-side validation.
keywords: performance, slow app, fast app, optimization, caching, st.cache_data, st.cache_resource, fragments, parallel fragments, forms, on_change ignore, st.skeleton, loading states, render order, stale elements, tabs, expanders, client-side validation, high cardinality
---

# Optimizing app performance

Streamlit reruns your script from top to bottom whenever a user interacts with a widget. This makes apps simple to write, but it also means slow code runs again on every interaction unless you tell Streamlit otherwise. This guide brings together the techniques that make apps fast and keep them responsive while slow work is unavoidable.

## Summary

1. Cache expensive data loading and computation. Cache source data, then apply cheap filters outside the cached function.
2. Use fragments so independent sections rerun on their own, and run slow, independent fragments in parallel.
3. Use forms or `on_change="ignore"` to avoid reruns for inputs that don't need an immediate reaction.
4. Don't run expensive work inside hidden tabs, collapsed expanders, or closed popovers.
5. Render fast UI before slow work, and use `st.skeleton` to reserve space for slow elements.
6. Use client-side validation so the browser catches bad input without a rerun.

## Cache at the right granularity

Use [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) for functions that return data, like dataframes and API responses. Use [`st.cache_resource`](/develop/api-reference/caching-and-state/st.cache_resource) for shared resources, like database clients and machine learning models. Don't wrap [`st.connection`](/develop/api-reference/connections/st.connection) in a cache decorator because it's already cached.

Cache the expensive source data, and apply interactive filters outside the cached function. If you cache the filtered result instead, Streamlit fetches the data again for every new filter value and stores a separate result for each one.

```python
# Avoid: fetches the data again for every new region
@st.cache_data
def load_filtered_orders(region):
    orders = fetch_orders()
    return orders[orders["region"] == region]

region = st.selectbox("Region", regions)
orders = load_filtered_orders(region)
```

```python
# Prefer: cache the expensive load once and filter outside the cache
@st.cache_data(ttl="15m")
def load_orders():
    return fetch_orders()

region = st.selectbox("Region", regions)
orders = load_orders()
filtered_orders = orders[orders["region"] == region]
```

Caches are unbounded by default. Use `ttl` so data doesn't become stale, and use `max_entries` when you know how many distinct inputs your function receives. For data that can be slightly out of date, use `refresh_mode="background"` so users get the expired value immediately while Streamlit refreshes it. For more information, see [Caching overview](/develop/concepts/architecture/caching#controlling-cache-size-and-duration).

## Rerun only what changes

### Use fragments for independent sections

A [fragment](/develop/concepts/architecture/fragments) reruns by itself when a user interacts with a widget inside it. Use fragments for sections that don't affect the rest of the page, like a chart with its own controls or a live search.

```python
@st.fragment
def live_search():
    query = st.text_input("Search", type="search", live=True)
    st.dataframe(search(query))

live_search()
```

To refresh a section on a timer, use `run_every` instead of looping your script. Never use `while True` or `time.sleep()` followed by `st.rerun()`, because they block the script or rerun the whole app.

```python
@st.fragment(run_every="30s")
def live_metrics():
    st.metric("Active users", get_active_user_count())

live_metrics()
```

### Run slow, independent fragments in parallel

By default, fragments run one after another. If your page has several slow sections that don't depend on each other, like separate database queries, set `parallel=True` so they run concurrently during full-app reruns. Three sections that each take three seconds then load in about three seconds instead of nine.

```python
@st.fragment(parallel=True)
def revenue():
    st.metric("Revenue", query_revenue())

@st.fragment(parallel=True)
def users():
    st.metric("Users", query_users())

revenue()
users()
```

Parallel fragments run in threads, so they help most with I/O-bound work like queries and API calls. Each fragment should write to its own Session State keys. For more information and restrictions, see [Run fragments in parallel](/develop/concepts/architecture/fragments#run-fragments-in-parallel).

### Batch inputs with forms

If several inputs feed one expensive operation, put them in a [form](/develop/concepts/architecture/forms). The app reruns only when the user submits the form.

```python
with st.form("search", border=False):
    query = st.text_input("Search")
    category = st.selectbox("Category", categories)
    submitted = st.form_submit_button("Search", icon=":material/search:")

if submitted:
    results = search(query, category)
```

Forms don't work when some inputs need to update others, like a country selection that changes the available cities. In that case, set `on_change="ignore"` on the inputs that don't affect anything else. These widgets update in the browser without a rerun, and Python receives their values on the next rerun. Values that the browser holds this way are lost if the user refreshes the page, unless the widget also uses `key` and `bind="query-params"`.

```python
country = st.selectbox("Country", countries)  # Reruns to update the city options
city = st.selectbox("City", get_cities(country), on_change="ignore")
name = st.text_input("Name", on_change="ignore")

if st.button("Save"):
    save_contact(country, city, name)
```

Use `on_change="ignore"` only for widgets where the user doesn't expect an immediate reaction. Any rerun delivers all pending values, so gate the work that uses them behind a button. For more information, see [Widget behavior](/develop/concepts/architecture/widget-behavior).

## Don't run hidden content

By default, Streamlit runs the code inside every tab, expander, and popover on every rerun, even when the content isn't visible. If that content is expensive, set `on_change="rerun"` on the container. Then, its `.open` attribute reports whether it's visible, and you can skip the work when it isn't.

```python
overview, details = st.tabs(["Overview", "Details"], on_change="rerun")

if overview.open:
    with overview:
        show_overview()
if details.open:
    with details:
        show_expensive_details()  # Runs only when this tab is selected
```

```python
diagnostics = st.expander("Advanced diagnostics", on_change="rerun")
if diagnostics.open:
    with diagnostics:
        run_diagnostics()  # Runs only when the expander is open
```

Alternatively, use `st.segmented_control` or `st.toggle` with an `if` statement. For more information, see [Using layouts and containers](/develop/concepts/design/layouts-and-containers).

## Render fast UI before slow work

Streamlit sends elements to the browser as your script creates them. During a rerun, elements from the previous run stay on screen and fade as stale until the new run recreates them. If slow code runs before the rest of your page, users see a faded page until it finishes, even for elements that don't depend on the slow result.

Order your script so that titles, filters, section headers, and anything else that doesn't depend on slow work render first. Then, wrap the slow work and the element it feeds in [`st.skeleton`](/develop/api-reference/status/st.skeleton). The skeleton reserves the element's space with an animated placeholder while the work runs.

```python
# Avoid: the whole page waits for the slow load
orders = load_orders()  # Takes several seconds
st.title("Orders")
region = st.selectbox("Region", regions)
st.dataframe(orders)
```

```python
# Prefer: the title and filter render immediately
st.title("Orders")
region = st.selectbox("Region", regions)

with st.skeleton(height=400):
    orders = load_orders()
    st.dataframe(orders, height=400, key="orders")  # Same height as the skeleton
```

To keep the layout stable:

- Give the skeleton the same height as the element it holds.
- Put the slow element inside the `with` block, and draw it first. Any visible element inside the block replaces the skeleton.
- Give stateful elements, like dataframes and charts, a `key`. On reruns, the previous element stays in place and updates when the new data arrives, so it keeps its scroll position and selections. The skeleton only covers it if the block takes longer than a short delay.

Avoid filling an `st.empty()` placeholder after slow work. An empty placeholder clears its content as soon as the script reaches the `st.empty()` call, so the old element disappears during the slow work and loses its state.

### Load dashboard cards concurrently

For a dashboard with several slow cards, combine parallel fragments with skeletons. Draw each card's frame and title in the main script, and call its fragment inside a skeleton. The page layout appears immediately, and each card fills in as soon as its data arrives.

```python
@st.fragment(parallel=True)
def revenue_card():
    st.bar_chart(load_revenue(), x="region", y="revenue", height=260, alt="Revenue by region")

@st.fragment(parallel=True)
def orders_card():
    st.dataframe(load_orders(), height=260, hide_index=True, alt="Recent orders")

left, right = st.columns(2)
with left.container(border=True):
    st.subheader("Revenue by region")
    with st.skeleton(height=260):
        revenue_card()
with right.container(border=True):
    st.subheader("Recent orders")
    with st.skeleton(height=260):
        orders_card()
```

### Choose a loading indicator

When a wait is unavoidable, show the user that something is happening:

- [`st.skeleton`](/develop/api-reference/status/st.skeleton) reserves space for charts, tables, and metrics while they load. Prefer it for content with a known size.
- [`st.spinner`](/develop/api-reference/status/st.spinner) shows a lightweight indicator while a block of code runs.
- [`st.progress`](/develop/api-reference/status/st.progress) shows a progress bar when you know how much work is done.
- [`st.status`](/develop/api-reference/status/st.status) shows progress and intermediate output for long, multi-step tasks.

## Validate input in the browser

Many widgets can reject invalid input before it reaches Python. This avoids a rerun and gives users immediate feedback. Use these parameters when your widget supports them:

- `st.text_input`: `validate`, `required`, `max_chars`, and `type`. `type="email"` and `type="url"` check the format.
- `st.text_area`: `required` and `max_chars`.
- `st.number_input`: `min_value`, `max_value`, `step`, and `required`.
- `st.date_input` and `st.datetime_input`: `min_value`, `max_value`, and `required`.
- `st.selectbox` and `st.time_input`: `required`.
- `st.file_uploader`: `type`, which rejects files with other extensions.

```python
email = st.text_input("Email", type="email", required=True)
quantity = st.number_input("Quantity", min_value=1, max_value=99, step=1)
```

These checks improve the user experience, but they aren't a security boundary. Always validate input in Python before you use it for anything sensitive.

## Keep payloads small

Everything you display is sent to the browser. Large payloads slow down your app even when your Python code is fast.

- **Charts:** Aggregate data before charting it. From about 10,000 points per chart, rendering in the browser takes longer than your Python code. For more information, see [Chart large datasets](/develop/concepts/design/charts#chart-large-datasets).
- **Selection widgets:** Keep option lists in the low thousands. Instead of loading a whole table to build a dropdown, query distinct values with a limit. For larger domains, use a search input with `live=True` and query matching values.
- **Precomputation:** Move heavy aggregations into your database, a scheduled job, or a materialized view instead of computing them in your app on demand.
