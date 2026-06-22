---
title: Working with fragments
slug: /develop/concepts/architecture/fragments
description: Learn how to use Streamlit fragments to optimize app performance by rerunning portions of code instead of full scripts, improving efficiency for complex applications.
keywords: streamlit fragments, st.fragment, partial reruns, performance optimization, execution control, fragment reruns, efficient reruns, app performance, execution flow
---

# Working with fragments

Reruns are a central part of every Streamlit app. When users interact with widgets, your script reruns from top to bottom, and your app's frontend is updated. Streamlit provides several features to help you develop your app within this execution model. Streamlit version 1.37.0 introduced fragments to allow rerunning a portion of your code instead of your full script. As your app grows larger and more complex, these fragment reruns help your app be efficient and performant. Fragments give you finer, easy-to-understand control over your app's execution flow.

Before you read about fragments, we recommend having a basic understanding of [caching](/develop/concepts/architecture/caching), [Session State](/concepts/architecture/session-state), and [forms](/develop/concepts/architecture/forms).

## Use cases for fragments

Fragments are versatile and applicable to a wide variety of circumstances. Here are just a few, common scenarios where fragments are useful:

- Your app has multiple visualizations and each one takes time to load, but you have a filter input that only updates one of them.
- You have a dynamic form that doesn't need to update the rest of your app (until the form is complete).
- You want to automatically update a single component or group of components to stream data.
- Your app has several slow, independent operations (like database queries or API calls) that you want to run at the same time instead of one after another.

## Defining and calling a fragment

Streamlit provides a decorator ([`st.fragment`](/develop/api-reference/execution-flow/st.fragment)) to turn any function into a fragment function. When you call a fragment function that contains a widget function, a user triggers a _fragment rerun_ instead of a full rerun when they interact with that fragment's widget. During a fragment rerun, only your fragment function is re-executed. Anything within the main body of your fragment is updated on the frontend, while the rest of your app remains the same. We'll describe fragments written across multiple containers later on.

Here is a basic example of defining and calling a fragment function. Just like with caching, remember to call your function after defining it.

```python
import streamlit as st

@st.fragment
def fragment_function():
    if st.button("Hi!"):
        st.write("Hi back!")

fragment_function()
```

If you want the main body of your fragment to appear in the sidebar or another container, call your fragment function inside a context manager.

```python
with st.sidebar:
    fragment_function()
```

### Fragment execution flow

Consider the following code with the explanation and diagram below.

```python
import streamlit as st

st.title("My Awesome App")

@st.fragment()
def toggle_and_text():
    cols = st.columns(2)
    cols[0].toggle("Toggle")
    cols[1].text_area("Enter text")

@st.fragment()
def filter_and_file():
    cols = st.columns(2)
    cols[0].checkbox("Filter")
    cols[1].file_uploader("Upload image")

toggle_and_text()
cols = st.columns(2)
cols[0].selectbox("Select", [1,2,3], None)
cols[1].button("Update")
filter_and_file()
```

When a user interacts with an input widget inside a fragment, only the fragment reruns instead of the full script. When a user interacts with an input widget outside a fragment, the full script reruns as usual.

If you run the code above, the full script will run top to bottom on your app's initial load. If you flip the toggle button in your running app, the first fragment (`toggle_and_text()`) will rerun, redrawing the toggle and text area while leaving everything else unchanged. If you click the checkbox, the second fragment (`filter_and_file()`) will rerun and consequently redraw the checkbox and file uploader. Everything else remains unchanged. Finally, if you click the update button, the full script will rerun, and Streamlit will redraw everything.

![Diagram of fragment execution flow](/images/concepts/fragment_diagram.png)

By default, fragments run inline on the main thread, in the order you call them, just like the rest of your script. If you have slow, independent fragments, you can opt in to running them concurrently during full-app reruns with `parallel=True`. See [Run fragments in parallel](#run-fragments-in-parallel) below.

## Fragment return values and interacting with the rest of your app

Streamlit ignores fragment return values during fragment reruns, so defining return values for your fragment functions is not recommended. Instead, if your fragment needs to share data with the rest of your app, use Session State. Fragments are just functions in your script, so they can access Session State, imported modules, and other Streamlit elements like containers. If your fragment writes to any container created outside of itself, note the following difference in behavior:

- Elements drawn in the main body of your fragment are cleared and redrawn in place during a fragment rerun. Repeated fragment reruns will not cause additional elements to appear.
- Elements drawn to containers outside the main body of fragment will not be cleared with each fragment rerun. Instead, Streamlit will draw them additively and these elements will accumulate until the next full-script rerun.
- A fragment can't draw widgets in containers outside of the main body of the fragment. Widgets can only go in the main body of a fragment.

To prevent elements from accumulating in outside containers, use [`st.empty`](/develop/api-reference/layout/st.empty) containers. For a related tutorial, see [Create a fragment across multiple containers](/develop/tutorials/execution-flow/create-a-multiple-container-fragment).

If you need to trigger a full-script rerun from inside a fragment, call [`st.rerun`](/develop/api-reference/execution-flow/st.rerun). For a related tutorial, see [Trigger a full-script rerun from inside a fragment](/develop/tutorials/execution-flow/trigger-a-full-script-rerun-from-a-fragment).

## Run fragments in parallel

By default, fragments run inline on the main thread, in the order you call them. For fragments that can be run independent of each other (such as database queries or external API calls), you can run these concurrently by setting `parallel=True` in the `st.fragment` decorator.

```python
import streamlit as st

@st.fragment(parallel=True)
def slow_chart():
    data = expensive_query()
    st.line_chart(data)

@st.fragment(parallel=True)
def slow_table():
    data = another_expensive_query()
    st.dataframe(data)

slow_chart()
slow_table()
```

When `parallel=True`, the behavior depends on the type of rerun:

- During a full-app rerun, Streamlit dispatches the fragment to a thread pool. It runs concurrently with your other parallel fragments and with the rest of your main script, rather than blocking on each fragment in turn. If `slow_chart` and `slow_table` each take two seconds, running them in parallel lets your app finish in about two seconds instead of four.

- During a fragment rerun (when a user interacts with a widget inside the fragment), execution stays sequential. The fragment runs by itself on the main thread, exactly like a non-parallel fragment. This keeps your state updates predictable when a user is actively interacting with a fragment.

### Restricted commands during parallel execution

Because parallel fragments run concurrently on separate threads during the initial (full-app) run, a few Streamlit commands aren't safe to call from inside them and will raise an error. These include:

- [`st.dialog`](/develop/api-reference/execution-flow/st.dialog)
- [`st.switch_page`](/develop/api-reference/navigation/st.switch_page)
- Writing to containers created outside the fragment.

These commands work normally during a fragment rerun, even inside a parallel fragment, because fragment reruns are sequential. To use one of these commands inside a parallel fragment, gate it behind a widget interaction rather than calling it unconditionally:

```python
@st.fragment
def my_fragment(parallel=True):
    if st.button("Open dialog"):
        # Safe: only called during a fragment rerun, after the user clicks
        show_dialog()

@st.dialog("My dialog")
def show_dialog():
    st.write("Hello!")
```

### Thread safety and shared state

Parallel fragments can run at the same time, so they can read and write shared resources concurrently. This includes Session State, global variables, files, and external connections. To avoid race conditions:

- Prefer having each parallel fragment write to its **own** Session State keys, then read the combined results back in your main script after the fragments finish.
- Avoid having two parallel fragments mutate the same Session State key, list, or dictionary at the same time.
- If parallel fragments must share a mutable resource, coordinate access explicitly (for example, with a `threading.Lock`).

## Automate fragment reruns

`st.fragment` includes a convenient `run_every` parameter that causes the fragment to rerun automatically at the specified time interval. These reruns are in addition to any reruns (fragment or full-script) triggered by your user. The automatic fragment reruns will continue even if your user is not interacting with your app. This is a great way to show a live data stream or status on a running background job, efficiently updating your rendered data and _only_ your rendered data.

```python
@st.fragment(run_every="10s")
def auto_function():
		# This will update every 10 seconds!
		df = get_latest_updates()
		st.line_chart(df)

auto_function()
```

You can combine `run_every` with `parallel=True`. The automatic reruns triggered by `run_every` are fragment reruns, so they execute sequentially (just like reruns triggered by a user). The `parallel=True` setting only changes how the fragment behaves during a full-app rerun. This combination is handy when you have several independent, auto-updating data feeds that you want to load concurrently on each full-app rerun:

```python
@st.fragment(parallel=True, run_every="5s")
def live_metrics():
    data = fetch_latest_metrics()
    st.metric("Active Users", data["users"])

live_metrics()
```

For a related tutorial, see [Start and stop a streaming fragment](/develop/tutorials/execution-flow/start-and-stop-fragment-auto-reruns).

## Compare fragments to other Streamlit features

### Fragments vs forms

Here is a comparison between fragments and forms:

- **Forms** allow users to interact with widgets without rerunning your app. Streamlit does not send user actions within a form to your app's Python backend until the form is submitted. Widgets within a form can not dynamically update other widgets (in or out of the form) in real-time.
- **Fragments** run independently from the rest of your code. As your users interact with fragment widgets, their actions are immediately processed by your app's Python backend and your fragment code is rerun. Widgets within a fragment can dynamically update other widgets within the same fragment in real-time.

A form batches user input without interaction between any widgets. A fragment immediately processes user input but limits the scope of the rerun.

### Fragments vs callbacks

Here is a comparison between fragments and callbacks:

- **Callbacks** allow you to execute a function at the beginning of a script rerun. A callback is a _single prefix_ to your script rerun.
- **Fragments** allow you to rerun a portion of your script. A fragment is a _repeatable postfix_ to your script, running each time a user interacts with a fragment widget, or automatically in sequence when `run_every` is set.

When callbacks render elements to your page, they are rendered before the rest of your page elements. When fragments render elements to your page, they are updated with each fragment rerun (unless they are written to containers outside of the fragment, in which case they accumulate there).

### Fragments vs custom components

Here is a comparison between fragments and custom components:

- **Components** are custom frontend code that can interact with the Python code, native elements, and widgets in your Streamlit app. Custom components extend what’s possible with Streamlit. They follow the normal Streamlit execution flow.
- **Fragments** are parts of your app that can rerun independently of the full app. Fragments can be composed of multiple Streamlit elements, widgets, or any Python code.

A fragment can include one or more custom components. A custom component could not easily include a fragment!

### Fragments vs caching

Here is a comparison between fragments and caching:

- **Caching:** allows you to skip over a function and return a previously computed value. When you use caching, you execute everything except the cached function (if you've already run it before).
- **Fragments:** allow you to freeze most of your app and just execute the fragment. When you use fragments, you execute only the fragment (when triggering a fragment rerun).

Caching saves you from unnecessarily running a piece of your app while the rest runs. Fragments save you from running your full app when you only want to run one piece.

## Limitations and unsupported behavior

- Fragments can't detect a change in input values. It is best to use Session State for dynamic input and output for fragment functions.
- Using caching and fragments on the same function is unsupported.
- Fragments can't render widgets in externally-created containers; widgets can only be in the main body of a fragment.
