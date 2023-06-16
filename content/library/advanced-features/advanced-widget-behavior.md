---
title: Widget behavior
slug: /library/advanced-features/widget-behavior
---

# Understanding widget behavior

Widgets are magical and often work how you want. But they can have surprising
behavior in some situations. Understanding the different parts of a widget and
the precise order in which events occur is helpful for achieving desired
results.

## Anatomy of a widget

There are four parts to every widget:

1. The frontend component as seen by the user.
2. The backend value or value as seen through `st.session_state`.
3. The return value given by the widget's function.
4. The key of the widget used to access its value via `st.session_state`.

### Session dependence

These parts are dependent on a particular session (browser connection). The
actions of one user do not affect the widgets of any other user. Furthermore, if
a user opens up multiple tabs to access an app, then each tab will be a unique
session. Hence, changing a widget in one tab will not affect the same widget in
another tab.

### Data types

The backend value (as seen through `st.session_state`) and the return value of a
widget are of simple Python types. For example, `st.button` returns a boolean
value and will have the same boolean value saved in `st.session_state`.

### Widget keys

Widget keys serve two purposes:

1. Distinguishing two otherwise identical widgets.
2. Creating a means to access and manipulate the widget's value through
   `st.session_state`.

A widget's identity depends on the arguments passed to the widget function. If
you have two widgets of the same type with the same arguments, you will get a
`DuplicateWidgetID` error. In this case, you will need to assign unique keys to
the two widgets.

A widget's key is just one additional argument that goes into a widget's
identity; it is not the sole indicator of a widget's identity. Therefore, if any
of the defining parameters of a widget change, Streamlit will see it as a new
widget and it will appear to reset.

[//]: # "TODO example with slider and changing min/max"

### Persistence

If a widget's function is not called during a script run, then none of
its parts will be retained, including its value in `st.session_state`. If you have
assigned a key to a widget and you navigate away from that widget, its key and
associated value in `st.session_state` will be deleted. Even temporarily hiding a
widget will cause it to reset when it reappears; Streamlit will treat it
like a new widget.

## Order of operations

When a user interacts with a widget, the order of logic is:

1. Its value in `st.session_state` is updated.
2. The callback function (if any) is executed.
3. The page reruns, with the widget function returning its new value.

If the callback function writes anything to the screen, that content will appear
above the rest of the page. A callback function runs as a prefix to the page
reloading. Consequently, that means anything written via a callback function
will disappear as soon as the user performs their next action. Other widgets
should generally not be created within a callback function.

<Note>

If a callback function is passed any args or kwargs, those arguments will be
established when the widget is rendered. In particular, if you want to use a
widget's new value in its own callback function, you cannot pass that value to
the callback function via `st.session_state`; you will have to look up its new
value using a call to `st.session_state` _within the callback function_.

</Note>

[//]: # "TODO: simple example and form example"

## Life cycle

When a widget function is called, Streamlit will check if it already has a
widget with the same parameters. Streamlit will reconnect if it thinks the
widget already exists. Otherwise, it will make a new one.

Streamlit identifies widgets as "being the same" based on their construction
parameters: labels, min or max values, default values, placeholder texts,
help text, and keys are all used by Streamlit to identify a widget. On the other
hand, callback functions, callback args and kwargs, disabling options, and label
visibility do not affect a widget's identity.

### Calling a widget function when the widget doesn't already exist

1. Streamlit will build the frontend and backend parts of the widget.
2. If the widget has been assigned a key, Streamlit will check if that key
   already exists in session state.  
    a. If it exists and is not currently associated to another widget, Streamlit
   will attach to that key and take on its value for the widget.  
    b. Otherwise, it will assign the default value to the key in `st.session_state`.
3. If there are args or kwargs for a callback function, they are computed and
   saved at this point in time.
4. The default value is then returned by the function.

Step 2 can be tricky. If you have a widget:

```python
st.number_input('Alpha',key='A')
```

and you change it on a page rerun to:

```python
st.number_input('Beta',key='A')
```

Streamlit will see that as a new widget because of the label change. The key
`'A'` will be considered part of the widget labeled `'Alpha'` and will not be
attached as-is to the new widget labeled `'Beta'`. Streamlit will destroy
`st.session_state.A` and recreate it with the default value.

If a widget attaches to a pre-existing key when created and is also manually
assigned a default value, you will get a warning if there is a disparity. If you
want to control a widget's value through `st.session_state`, initialize the
widget's value through `st.session_state` and avoid the default value argument
to prevent conflict.

[//]: # "TODO: simple example and multipage example"

### Calling a widget function when the widget already exists

1. Streamlit will connect to the existing frontend and backend parts.
2. If the widget has a key that was deleted from `st.session_state`, then
   Streamlit will recreate the key using the current frontend value. (e.g.
   Deleting a key will not revert the widget to a default value.)
3. It will return the current value of the widget.

[//]: # "TODO: Examples with the key copy workaround and pseudo key workflow"

### Cleaning up

When Streamlit gets to the end of a page run, it will delete the data for any
widgets it has in memory that were not rendered on the screen. Most importantly,
that means Streamlit will delete all key-value pairs in `st.session_state`
associated to a widget not currently on screen.

If you navigate away from a widget with some key `'my_key'` and save data to
`st.session_state.my_key` on the new page, you will interrupt the widget
cleanup process and prevent the key-value pair from being deleted. The rest of
the widget will still be deleted and you will be left with an unassociated
key-value in `st.session_state`. To preserve a widget's data, you can do
something as trivial as resaving the key at the top of every page:

```python
st.session_state.my_key = st.session_state.my_key
```
