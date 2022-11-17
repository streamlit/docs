---
title: st.experimental_singleton
slug: /library/api-reference/performance/st.experimental_singleton
description: st.experimental_singleton is a function decorator used to store singleton objects.
---

<Important>

This is an experimental feature. Experimental features and their APIs may change or be removed at any time. To learn more, click [here](/library/advanced-features/prerelease#experimental-features).

</Important>

<Autofunction function="streamlit.experimental_singleton" />

### Replay static `st` elements in cache-decorated functions

Functions decorated with `@st.experimental_singleton` can contain static `st` elements. When a cache-decorated function is executed, we record the element and block messages produced, so the elements will appear in the app even when execution of the function is skipped because the result was cached.

In the example below, the `@st.experimental_singleton` decorator is used to cache the execution of the `get_model` function, that returns a 🤗 Hugging Face Transformers model. Notice the cached function also contains a `st.bar_chart` command, which will be replayed when the function is skipped because the result was cached.

```python
import numpy as np
import pandas as pd
import streamlit as st
from transformers import AutoModel

@st.experimental_singleton
def get_model(model_type):
    # Contains a static element st.bar_chart
    st.bar_chart(
        np.random.rand(10, 1)
    )  # This will be recorded and displayed even when the function is skipped

    # Create a model of the specified type
    return AutoModel.from_pretrained(model_type)

bert_model = get_model("distilbert-base-uncased")
st.help(bert_model) # Display the model's docstring
```

<Image src="/images/replay-cached-elements-singleton.png" clean />

Supported static `st` elements in cache-decorated functions include:

- `st.alert`
- `st.altair_chart`
- `st.area_chart`
- `st.bar_chart`
- `st.ballons`
- `st.bokeh_chart`
- `st.caption`
- `st.code`
- `st.components.v1.html`
- `st.components.v1.iframe`
- `st.container`
- `st.dataframe`
- `st.echo`
- `st.empty`
- `st.error`
- `st.exception`
- `st.expander`
- `st.experimental_get_query_params`
- `st.experimental_set_query_params`
- `st.graphviz_chart`
- `st.help`
- `st.info`
- `st.json`
- `st.latex`
- `st.line_chart`
- `st.markdown`
- `st.metric`
- `st.plotly_chart`
- `st.progress`
- `st.pydeck_chart`
- `st.snow`
- `st.spinner`
- `st.success`
- `st.table`
- `st.text`
- `st.vega_lite_chart`
- `st.warning`

Forms and media elements are not supported in cache-decorated functions. If you use them, the code will only be called when we detect a cache "miss", which can lead to unexpected results. Which is why Streamlit will throw a `CachedStFunctionWarning`, like the one below:

```python
import numpy as np
import pandas as pd
import streamlit as st
from transformers import AutoModel

@st.experimental_singleton
def get_model(model_type):
    # Contains an unsupported st command
    st.video("https://www.youtube.com/watch?v=wpDuY9I2fDg")
    # Streamlit will throw a CachedStFunctionWarning

    # Create a model of the specified type
    return AutoModel.from_pretrained(model_type)

bert_model = get_model("distilbert-base-uncased")
st.help(bert_model) # Display the model's docstring
```

<Image src="/images/cached-st-function-warning-singleton.png" clean />

### Replay input widgets in cache-decorated functions

In addition to static elements, functions decorated with `@st.experimental_singleton` can also contain [input widgets](/library/api-reference/widgets)! Replaying input widgets is disabled by default. To enable it, you can set the `experimental_allow_widgets` parameter for `@st.experimental_singleton` to `True`. The example below enables widget replaying, and shows the use of a checkbox widget within a cache-decorated function.

```python
import streamlit as st

# Enable widget replay
@st.experimental_singleton(experimental_allow_widgets=True)
def func():
    # Contains an input widget
    st.checkbox("Works!")

func()
```

If the cache decorated function contains input widgets, but `experimental_allow_widgets` is set to `False` or unset, Streamlit will throw a `CachedStFunctionWarning`, like the one below:

```python
import streamlit as st

# Widget replay is disabled by default
@st.experimental_singleton
def func():
    # Streamlit will throw a CachedStFunctionWarning
    st.checkbox("Doesn't work")

func()
```

<Image src="/images/cached-st-function-warning-widgets.png" clean />

### How widget replay works

Let's demystify how widget replay in cache-decorated functions works and gain a conceptual understanding. Widget values are treated as additional inputs to the function, and are used to determine whether the function should be executed or not. Consider the following example:

```python
import streamlit as st

@st.experimental_singleton(experimental_allow_widgets=True)
def plus_one(x):
    y = x + 1
    if st.checkbox("Nuke the value 💥"):
        st.write("Value was nuked, returning 0")
        y = 0
    return y

st.write(plus_one(2))
```

The `plus_one` function takes an integer `x` as input, and returns `x + 1`. The function also contains a checkbox widget, which is used to "nuke" the value of `x`. i.e. the return value of `plus_one` depends on the state of the checkbox: if it is checked, the function returns `0`, otherwise it returns `3`.

In order to know which value the cache should return (in case of a cache hit), Streamlit treats the checkbox state (checked / unchecked) as an additional input to the function `plus_one` (just like `x`). If the user checks the checkbox (thereby changing its state), we look up the cache for the same value of `x` (2) and the same checkbox state (checked). If the cache contains a value for this combination of inputs, we return it. Otherwise, we execute the function and store the result in the cache.

Let's now understand how enabling and disabling widget replay changes the behavior of the function.

#### Widget replay disabled

- Widgets in cached functions throw a `CachedStFunctionWarning` and are ignored.
- Other static elements in cached functions replay as expected.

#### Widget replay enabled

- Widgets in cached functions don't lead to a warning, and are replayed as expected.
- Interacting with a widget in a cached function will cause the function to be executed again, and the cache to be updated.
- Widgets in cached functions retain their state across reruns.
- Each unique combination of widget values is treated as a separate input to the function, and is used to determine whether the function should be executed or not. i.e. Each unique combination of widget values has its own cache entry; the cached function runs the first time and the saved value is used afterwards.
- Calling a cached function multiple times in one script run with the same arguments triggers a `DuplicateWidgetID` error.
- If the arguments to a cached function change, widgets from that function that render again retain their state.
- Changing the source code of a cached function invalidates the cache.
- Both [`st.experimental_singleton`](/library/api-reference/performance/st.experimental_singleton) and [`st.experimental_memo`](/library/api-reference/performance/st.experimental_memo) support widget replay.
- Fundamentally, the behavior of a function with (supported) widgets in it doesn't change when it is decorated with `@st.experimental_singleton` or `@st.experimental_memo`. The only difference is that the function is only executed when we detect a cache "miss".

### Supported widgets

All input widgets are supported in cache-decorated functions. The following is an exhaustive list of supported widgets:

- `st.button`
- `st.camera_input`
- `st.checkbox`
- `st.color_picker`
- `st.date_input`
- `st.download_button`
- `st.file_uploader`
- `st.multiselect`
- `st.number_input`
- `st.radio`
- `st.selectbox`
- `st.select_slider`
- `st.slider`
- `st.text_area`
- `st.text_input`
- `st.time_input`
