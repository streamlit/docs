---
title: st.dataframe
slug: /library/api-reference/data/st.dataframe
description: st.dataframe displays a dataframe as an interactive table.
---

<Autofunction function="streamlit.dataframe" />

<br />

`st.dataframe` supports the `use_container_width` parameter to stretch across the full container width:

```python
import pandas as pd
import streamlit as st

# Cache the dataframe so it's only loaded once
@st.cache_data
def load_data():
    return pd.DataFrame(
        {
            "first column": [1, 2, 3, 4],
            "second column": [10, 20, 30, 40],
        }
    )

# Boolean to resize the dataframe, stored as a session state variable
st.checkbox("Use container width", value=False, key="use_container_width")

df = load_data()

# Display the dataframe and allow the user to stretch the dataframe
# across the full width of the container, based on the checkbox value
st.dataframe(df, use_container_width=st.session_state.use_container_width)
```

<Cloud src="https://doc-dataframe2.streamlit.app/?embedded=true" height="350" />

### Interactivity

Dataframes displayed as interactive tables with `st.dataframe` have the following interactive features:

- **Column sorting**: sort columns by clicking on their headers.
- **Column resizing**: resize columns by dragging and dropping column header borders.
- **Table (height, width) resizing**: resize tables by dragging and dropping the bottom right corner of tables.
- **Search**: search through data by clicking a table, using hotkeys (`⌘ Cmd + F` or `Ctrl + F`) to bring up the search bar, and using the search bar to filter data.
- **Copy to clipboard**: select one or multiple cells, copy them to clipboard, and paste them into your favorite spreadsheet software.

<Image src="/images/dataframe-ui.gif" />
