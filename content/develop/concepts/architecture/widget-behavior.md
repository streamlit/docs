---
title: Widget behavior
slug: /develop/concepts/architecture/widget-behavior
description: Learn how Streamlit widgets behave across reruns, handle state persistence, manage user interactions, and control widget lifecycle in your applications.
keywords: widget behavior, widget state, user interactions, widget persistence, rerun behavior, interaction handling, state management, widget lifecycle, query parameters, bind
---

# Understanding widget behavior

Widgets (like `st.button`, `st.selectbox`, and `st.text_input`) are at the heart of Streamlit apps. They are the interactive elements of Streamlit that pass information from your users into your Python code. Widgets are magical and often work how you want, but they can have surprising behavior in some situations. Understanding the different parts of a widget and the precise order in which events occur helps you achieve your desired results.

This guide covers advanced concepts about widgets. Generally, it begins with simpler concepts and increases in complexity. For most beginning users, these details won't be important to know right away. When you want to dynamically change widgets or preserve widget information between pages, these concepts will be important to understand. We recommend having a basic understanding of [Session State](/develop/api-reference/caching-and-state/st.session_state) before reading this guide.

<Collapse title="🎈 TL;DR" expanded={false}>

1. The actions of one user don't affect the widgets of any other user.
2. A widget command returns the widget's current value, which is a simple Python type. For example, `st.button` returns a Boolean value.
3. Widgets return their default values on their first call before a user interacts with them.
4. A widget's identity depends on the arguments passed to the widget command. If a key is provided, the key determines the widget's identity, with limited exceptions noted in each widget's `key` parameter description. If no key is provided, changing a widget's label, min value, max value, default value, placeholder text, or help text will cause it to reset.
5. If you don't call a widget command in a script run, Streamlit will delete the widget's information&mdash;_including its key-value pair in Session State_. If you call the same widget command later, Streamlit treats it as a new widget.
6. Widgets are not stateful between pages. If you have two widgets with the same key on different pages, they will be treated as two different widgets.

The last three points (widget identity and widget deletion) are the most relevant when dynamically changing widgets or working with multi-page applications. This is covered in detail later in this guide: [Statefulness of widgets](#statefulness-of-widgets) and [Widget life cycle](#widget-life-cycle).

</Collapse>

<Important>

**Key-based widget identity (v1.55.0)**

As of v1.55.0, all widgets support key-based identity. When a `key` is provided, the key is the primary determinant of the widget's identity, and changing other parameters (like `label`, `options`, or `default`) won't reset the widget. Some parameters that constrain valid values still affect identity for specific widgets, even when a key is provided. For example, changing `min_value` or `max_value` for `st.slider` will reset the widget because the current value could be invalidated. These exceptions are noted in each widget's `key` parameter description.

Key-based identity was progressively introduced from v1.50.0 through v1.55.0. If you're using an older version, check the [release notes](/develop/quick-reference/release-notes) to see which widgets support key-based identity in your version.

**Other notable changes:**

- **v1.46.0**: When navigating between pages, widget keys in `st.session_state` are deleted at the beginning of the new page's script run instead of the end.
- **v1.55.0**: Most widgets support a new `bind` parameter to sync widget values with URL query parameters. See [Binding widgets to query parameters](#binding-widgets-to-query-parameters).

</Important>

## Anatomy of a widget

There are four parts to keep in mind when using widgets:

1. The frontend component as seen by the user.
2. The backend (Python) in-memory value.
3. The key-value pair in `st.session_state` that provides programmatic access to the widget's value.
4. The return value given by the widget's function.

### Widgets are session dependent

Widget states are dependent on a particular session (browser connection). The actions of one user do not affect the widgets of any other user. Furthermore, if a user opens up multiple tabs to access an app, each tab will be a unique session. Changing a widget in one tab will not affect the same widget in another tab.

### Widgets return simple Python data types

The value of a widget as seen through `st.session_state` and returned by the widget function are of simple Python types. For example, `st.button` returns a boolean value and will have the same boolean value saved in `st.session_state` if using a key. The first time a widget function is called (before a user interacts with it), it will return its default value. For example, `st.selectbox` returns the first option by default. Default values are configurable for all widgets with a few special exceptions like `st.button` and `st.file_uploader`.

### Callbacks let you react to widget changes

Most widgets accept an `on_change` callback parameter (or `on_click` for buttons). A callback is a Python function that Streamlit calls when the user interacts with the widget. You can optionally pass arguments to the callback through the `args` and `kwargs` parameters. Callbacks are covered in detail in [Order of operations](#order-of-operations).

### Keys help distinguish widgets and access their values

Widget keys serve three purposes:

1. Distinguishing two otherwise identical widgets.
2. Maintaining statefulness of the widget while changing its parameters.
3. Creating a means to access and manipulate the widget's value through `st.session_state`.

Additionally, for developer convenience, keys are repeated in the DOM as HTML attributes with a Streamlit-specific prefix, `st-key-`, to prevent conflicts. The exact prefix, attribute name, and placement within the widget's DOM subtree aren't guaranteed to be stable between versions.

#### Widget identity: Key-based vs parameter-based

Whenever possible, Streamlit updates widgets incrementally on the frontend instead of rebuilding them with each rerun. This means Streamlit assigns a widget identity to each widget from the arguments passed to the widget command.

Widget identity depends on whether a key is provided:

- **With a key**: The key is the primary determinant of the widget's identity. Other parameters like `label`, `default`, `placeholder`, and `help` can change without resetting the widget. However, some widgets have specific parameters that also affect identity because changing them could invalidate the current value. For example, changing `min_value`/`max_value` on `st.slider` or `selection_mode` on `st.pills` will reset the widget even with a key. Check the `key` parameter description of each widget to see its exceptions, if any.
- **Without a key**: A widget's parameters (label, options, min/max, default, placeholder, help text) determine the widget identity. Changing one of these parameters will reset the widget. Note that callback functions, callback args and kwargs, label visibility, and disabling a widget do not affect the widget identity.

In all cases, widget identities and states aren't preserved between pages. More information is provided below in [Statefulness of widgets](#statefulness-of-widgets).

#### Streamlit can't understand two identical widgets on the same page

If you have two widgets of the same type with the same arguments on the same page, you will get a `DuplicateWidgetID` error. In this case, assign unique keys to the two widgets.

The following example will cause a `DuplicateWidgetID` error.

```python
st.button("OK")
st.button("OK")
```

The following example correctly assigns unique keys to the two buttons to avoid the `DuplicateWidgetID` error.

```python
st.button("OK", key="privacy")
st.button("OK", key="terms")
```

## Order of operations

When a user interacts with a widget, the widget is updated and triggers a rerun in the following order:

1. The widget value in `st.session_state` is updated.
2. The callback function (if any) is executed.
3. The page reruns with the widget command returning its new value.

If the callback function displays anything on the screen, that content will appear above the rest of the page. A callback function runs as a _prefix_ to the script run. Consequently, that means anything written via a callback function will disappear as soon as the user performs their next action. Widget commands should generally not be called within a callback function.

<Note>

If a callback function is passed any args or kwargs, those arguments will be established when the widget command is called, not later when the user interacts with the widget. In particular, if you want to use a widget's value in its own callback function, you can't pass that value to the callback function via the `args` parameter; you must assign a key to the widget and look up its value using `st.session_state` _within the callback function_.

</Note>

### Using callback functions with forms

Using a callback function with a form requires understanding of this order of operations.

```python
import streamlit as st

if "attendance" not in st.session_state:
    st.session_state.attendance = set()


def take_attendance():
    if st.session_state.name in st.session_state.attendance:
        st.info(f"{st.session_state.name} has already been counted.")
    else:
        st.session_state.attendance.add(st.session_state.name)


with st.form(key="my_form"):
    st.text_input("Name", key="name")
    st.form_submit_button("I'm here!", on_click=take_attendance)
```

<Cloud name="doc-guide-widgets-form-callbacks" height="250px"/>

## Statefulness of widgets

As long as the widget identity remains the same and that widget is continuously rendered on the frontend, then it will be stateful and remember user input.

### Changing a widget's identity will reset it

If any of the parameters that determine a widget's identity change, Streamlit will see it as a new widget and it will reset. Providing a key protects the widget from resets when most parameters change. The use of default values is particularly important in this case. If you use a key and change a widget's default value, there will be no change to the widget's state. If you don't use a key, changing a widget's default value will reset the widget to that default value.

In this example, we have two sliders where you can change the min, max, and default values. Try interacting with each slider to change its value then change the min or max setting to see what happens. Because `min_value` and `max_value` constrain valid values, changing them resets `st.slider` even with a key. However, if you change the default value, only the slider without a key will reset. The keyed slider will remain stateful.

```python
import streamlit as st

cols = st.columns([2, 1, 2])
minimum = cols[0].number_input("Minimum", 1, 3)
maximum = cols[2].number_input("Maximum", 8, 10, 10)
value = cols[1].number_input("Default", 4, 7, 5)

st.slider("No key", minimum, maximum, value)
st.slider("With a key", minimum, maximum, value, key="a")
```

<Cloud name="doc-guide-widgets-change-parameters" height="550px"/>

### Retain statefulness when changing a widget's identity

Here is a solution for the above example that preserves the slider's value when the min and max change. The widget's initial value is set through Session State rather than the `value` parameter. When you are programmatically changing a widget, use Session State to maintain the widget's state to avoid unexpected behavior.

```python
import streamlit as st

st.session_state.setdefault("a", 5)

cols = st.columns(2)
minimum = cols[0].number_input("Min", 1, 5, key="min")
maximum = cols[1].number_input("Max", 6, 10, 10, key="max")


def update_value():
    st.session_state.a = min(st.session_state.a, maximum)
    st.session_state.a = max(st.session_state.a, minimum)


update_value()
st.slider("A", minimum, maximum, key="a")
```

<Cloud name="doc-guide-widgets-change-parameters-solution" height="250px"/>

The `update_value()` function ensures consistency between the widget parameters and value. By writing to `st.session_state.a`, the key-value pair is available for use by the "new" widget. Without this write, Streamlit would overwrite the key-value pair with the default value. The reason for this is explained in [Widget life cycle](#widget-life-cycle).

### Widgets do not persist when not continually rendered

If a widget command for a specific widget instance isn't called during a script run, then none of its parts are retained, including its value in `st.session_state`. If a widget has a key and you navigate away from that widget, its key and associated value in `st.session_state` are deleted. Even temporarily hiding a widget causes it to reset when it reappears; Streamlit will treat it like a new widget. To preserve widget state across pages or when widgets are temporarily hidden, save the value to a separate placeholder key as shown below.

#### Save widget values in Session State to preserve them between pages

If you want to navigate away from a widget and return to it while keeping its value, use a separate key in `st.session_state` to save the information independently from the widget. This technique is also recommended to carry a widget's state to a new instance on another page. In this example, an underscore-prefixed, temporary key is used with a widget. Hence, `"_my_key"` is used as the widget key, but the data is copied to `"my_key"` to preserve it between pages.

```python
import streamlit as st

def store_value():
    # Copy the value to the permanent key
    st.session_state["my_key"] = st.session_state["_my_key"]

# Copy the saved value to the temporary key
st.session_state["_my_key"] = st.session_state["my_key"]
st.number_input("Number of filters", key="_my_key", on_change=store_value)
```

If this is functionalized to work with multiple widgets, it could look something like this:

```python
import streamlit as st

def store_value(key):
    st.session_state[key] = st.session_state["_"+key]
def load_value(key):
    st.session_state["_"+key] = st.session_state[key]

load_value("my_key")
st.number_input("Number of filters", key="_my_key", on_change=store_value, args=["my_key"])
```

## Widget life cycle

When a widget command is called, Streamlit will check if it already has a widget with the same identity. Streamlit will reconnect if it thinks the widget already exists. Otherwise, it will make a new one.

As mentioned earlier, Streamlit determines a widget's identity differently based on if it has a key. The page name also factors into a widget's identity, where widget identites are not preserved between pages. On the other hand, callback functions, callback args and kwargs, label visibility, and disabling a widget never affect a widget's identity.

### Calling a widget command when the widget doesn't already exist

If your script rerun calls a widget command with a changed identity or calls a widget command that wasn't used on the last script run:

1. Streamlit will build the frontend and backend parts of the widget, using its default value.
2. If the widget has been assigned a key, Streamlit will check if that key already exists in Session State.
   a. If the key exists and **isn't** associated to a widget with a different identity, Streamlit will assign that key's value to the widget.
   b. If the key exists and is associated to a widget with a different identity, Streamlit will overwrite the key-value pair with the default value. This is why writing to Session State before the widget command is important when [retaining statefulness across identity changes](#retain-statefulness-when-changing-a-widgets-identity).
   c. If the key doesn't exist, Streamlit will create a new key-value pair with the default value.
3. If there are args or kwargs for a callback function, they are evaluated and saved in memory.
4. The widget value is then returned by the function.

For step 2, prior to v1.46.0, Streamlit would ignore the value in Session State if it came from an instance of the widget on another page. This is because a widget on another page necessarily has a different identity. As of v1.46.0, Streamlit deletes such values at the beginning of a script run on a new page.

### Calling a widget command when the widget already exists

When rerunning a script without changing a widget's identity:

1. Streamlit will connect to the existing frontend and backend parts.
2. If the widget has a key that was deleted from `st.session_state`, then Streamlit will recreate the key using the current frontend value. This is because deleting a key from Session State will not revert the widget to a default value.
3. The widget command will return the current value of the widget.

### Widget clean-up process

Streamlit cleans up widget data at the end of every script run and at the beginning of a script run on a new page.

When Streamlit gets to the end of a script run, it will delete the data for any widgets it has in memory that were not rendered on the screen. Most importantly, that means Streamlit will delete all key-value pairs in `st.session_state` associated with a widget not currently on screen. When you switch pages, Streamlit will delete all data associated with widgets from the previous page.

## Binding widgets to query parameters

As of v1.55.0, most widgets support a `bind` parameter that syncs the widget's value with a URL query parameter. This makes it easy to create shareable URLs that preserve widget state and allow users to bookmark specific app configurations.

### How binding works

To bind a widget to a query parameter, set `bind="query-params"` and provide a `key`. The key is used as the query parameter name in the URL.

```python
import streamlit as st

st.selectbox("Color", ["Red", "Green", "Blue"], key="color", bind="query-params")
```

When a user selects "Green", the URL updates to include `?color=Green`. If someone opens that URL, the selectbox initializes to "Green" instead of the default "Red".

### Behavior details

- **Default values keep URLs clean**: When a widget's value matches its default, the query parameter is removed from the URL.
- **Invalid values are ignored**: If the URL contains an invalid value for the widget, the value is ignored and removed from the URL.
- **Programmatic updates**: A bound query parameter can't be set or deleted through `st.query_params`. To programmatically change a bound widget's value, use `st.session_state`.
- **Range values**: Widgets that return a range, like range sliders, use repeated query parameters. For example, a slider with a range of 10 to 90 will produce a URL ending with `?price=10&price=90`.

Trigger-like widgets (`st.button`, `st.download_button`, `st.chat_input`, `st.file_uploader`, `st.camera_input`, and `st.audio_input`) don't support binding because their values are transient.

### Example: Filterable dashboard with a shareable URL

```python
import streamlit as st

category = st.selectbox(
    "Category",
    ["All", "Electronics", "Clothing", "Books"],
    key="category",
    bind="query-params",
)
price = st.slider(
    "Max price",
    0, 1000, 500,
    key="max_price",
    bind="query-params",
)

st.write(f"Showing {category} items under ${price}")
```

With this setup, a URL like `https://myapp.streamlit.app/?category=Electronics&max_price=200` initializes the app with "Electronics" selected and the price slider set to 200. Sharing this URL gives others the exact same view.

## Best practices and recommendations

### For multipage apps

**Primary recommendation:** Use common widgets in the entrypoint file with [`st.navigation`](/develop/api-reference/navigation/st.navigation) to bypass page identity issues entirely:

```python
# streamlit_app.py (entrypoint)
import streamlit as st

# Common widgets that persist across all pages
user_name = st.sidebar.text_input("Name", key="global_name")
user_role = st.sidebar.selectbox("Role", ["User", "Admin"], key="global_role")

# Navigation
page = st.navigation([
    st.Page("page1.py", title="Dashboard"),
    st.Page("page2.py", title="Settings"),
])
page.run()
```

**Secondary recommendation:** For widgets that must be on individual pages, use the placeholder key pattern. See [Save widget values in Session State to preserve them between pages](#save-widget-values-in-session-state-to-preserve-them-between-pages) for more information.

### For parameter changes

- Use keys when you need widgets to maintain state despite parameter changes.
- If you need to change a parameter that affects a widget's identity, use placeholder keys like you would for multipage apps,
  or use a callback to directly maintain a widget's state. For more information, see [Retain statefulness when changing a widget's identity](#retain-statefulness-when-changing-a-widgets-identity).
- To force a widget to reset, update its key, or update a parameter without using a key.
