---
title: st.experimental_memo
slug: /library/api-reference/performance/st.experimental_memo
description: st.experimental_memo is used to memoize function executions.
---

<Important>

This is an experimental feature. Experimental features and their APIs may change or be removed at any time. To learn more, click [here](/library/advanced-features/prerelease#experimental-features).

</Important>

<Autofunction function="streamlit.experimental_memo" />

### Replay static `st` elements in cache-decorated functions

Functions decorated with `@st.experimental_memo` can contain static `st` elements. When a cache-decorated function is executed, we record the element and block messages produced, so the elements will appear in the app even when execution of the function is skipped because the result was cached.

In the example below, the `@st.experimental_memo` decorator is used to cache the execution of the `load_data` function, that returns a pandas DataFrame. Notice the cached function also contains a `st.area_chart` command, which will be replayed when the function is skipped because the result was cached.

```python
import numpy as np
import pandas as pd
import streamlit as st

@st.experimental_memo
def load_data(rows):
    chart_data = pd.DataFrame(
        np.random.randn(rows, 10),
        columns=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    )
    # Contains a static element st.area_chart
    st.area_chart(chart_data) # This will be recorded and displayed even when the function is skipped
    return chart_data

df = load_data(20)
st.dataframe(df)
```

<Image src="/images/replay-cached-elements.png" clean />

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

All other `st` commands, including widgets, forms, and media elements are not supported in cache-decorated functions. If you use them, the code will only be called when we detect a cache "miss", which can lead to unexpected results. Which is why Streamlit will throw a `CachedStFunctionWarning`, like the one below:

```python
import numpy as np
import pandas as pd
import streamlit as st

@st.experimental_memo
def load_data(rows):
    chart_data = pd.DataFrame(
        np.random.randn(rows, 10),
        columns=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    )
    # Contains an unsupported st command
    st.slider("Select a value", 0, 10, 5) # Streamlit will throw a CachedStFunctionWarning

    return chart_data

df = load_data(20)
st.dataframe(df)
```

<Image src="/images/cached-st-function-warning.png" clean />
