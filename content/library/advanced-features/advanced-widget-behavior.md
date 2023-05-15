---
title: Widget behavior
slug: /library/advanced-features/widget-behavior
---

# Understanding widget behavior

Widgets are magical and often work how you want. But they can have surprising behavior in some situations. Here is a high-level, abstract description of widget behavior, including some common edge-cases:

## Anatomy of a Widget

There are four parts to every widget:

1. the frontend component as seen by the user
2. the backend value or value as seen through session state
3. the return value given by the widget's function
4. the key of the widget through which its session state value can be accessed

### Session Dependence

These parts are dependent on a particular session (browser connection). The
actions of one user do not affect the widgets of any other user. Furthermore, if
a user opens up multiple tabs to access an app, then each tab will be a unique
session. Hence, changing a widget in one tab will not affect the same widget in
another tab.

### Data Types

The backend (session state) and return value of a widget are of simple Python
types. For example, a `st.button` returns a boolean value and will have the same
boolean value saved in session state.

### Widget Keys

Widget keys serve two purposes:

1. distinguishing two otherwise identical widgets
2. creating a means to access and manipulate the widget through session state

A widget's identity depends on the arguments passed to the widget function. If
you have two widgets of the same type with the same arguments, you will get a
`DuplicateWidgetID` error. In this case, you will need to assign unique keys to
the two widgets.

<Note>

A widget's key is just one additional argument that goes into a widget's
identity; it is not the sole indicator of a widget's identity. Therefore, if any
of the defining parameters of a widget change, Streamlit will see it as a new
widget and it will appear to reset.

</Note>

[//]: # "TODO example with slider and changing min/max"

### Persistence

If a widget's function is not called during a script run, then none of
its parts will be retained, including its value in session state. If you have
assigned a key to a widget and you navigate away from that widget, its key and
associated value in session state will be deleted. Even temporarily hiding a
widget, will cause it to reset when it reappears since Streamlit will treat it
like a new widget.

## Order of Operations

When a user interacts with a widget, the order of logic is:

1. its value in session state is updated
2. the callback function (if any) is executed,
3. the page reruns, with the widget function returning its new value

<Note>

If the callback function writes anything to the screen, it will appear above the
rest of the page. The callback functions runs as a prefix to the page reloading.
Consequently, that means anything written via a callback function will disappear
as soon as the user interacts with something else. Other widgets should
generally not be created within a callback function.

</Note>

<Note>

If the callback function is passed any args or kwargs, those arguments will be
established when the widget is rendered. In particular, if you want to use a
widget's new value in its own callback function, you cannot pass that value to
the callback function via session state; you will have to look up its new value
from session state _within the callback function_.

</Note>

[//]: # "TODO: simple example and form example"

## Life Cycle

When a widget function is called, Streamlit will check if it already has a
widget with the same parameters.

### If Streamlit does not have that widget

1. Streamlit will build the frontend and backend parts of the widget.
2. If the widget has been assigned a key, Streamlit will check if that key
   already exists in session state.  
    a. If it exists and is not currently associated to another widget, Streamlit
   will attach to that key and take on its value for the widget.  
    b. Otherwise, it will create the key and assign the default value.
3. If there are args or kwargs for a callback function, they are computed and
   saved at this point in time.
4. The default value is then returned by the function.

<Note>

If a widget attaches to a pre-existing key and is also manually assigned a
default value, you will get a warning if there is a disparity. If you want to
control a widget's value through session state, you may need to initialize the
widget's value through session state and avoid optional default value
argument to prevent conflict.

</Note>

<Note>

Step 2 can be tricky. If you have a widget `st.number_input('A',key='A')` and
you change it to `st.number_input('B',key='A')` on some page rerun, then
Streamlit will see that as a new widget. It will destroy `st.session_state.A`
and recreate it because the key `'A'` was associated to a different widget and
was not available to attach to a new widget.

</Note>

[//]: # "TODO: simple example and multipage example"

### If Streamlit does have that widget

1. It will connect to the existing frontend and backend parts.
2. If it has a key and that key was deleted, the it will recreate the key using
   the current backend value. (e.g. Deleting a key will not revert the widget to
   a default value since the true "backend" value is deeper in the code than what
   is accessed through session state.)
3. It will return the current value of the widget.
