---
title: Hide row indices when displaying a dataframe
slug: /knowledge-base/using-streamlit/hide-row-indices-displaying-dataframe
---

# Hide row indices when displaying a dataframe

## Overview

Streamlit offers two ways to display a dataframe: as a static table using [`st.table()`](/library/api-reference/data/st.table), and as an interactive table using [`st.dataframe()`](/library/api-reference/data/st.dataframe).

Both options display row indices in the left-most column. To see this in action, let's display a dataframe with random entries using both `st.table()` and `st.dataframe()`:

```python
import streamlit as st
import pandas as pd
import numpy as np

df = pd.DataFrame(
    np.random.randn(10, 5),
    columns=("col %d" % i for i in range(5)))

# Display a static table
st.table(df)

# Display an interactive table
st.dataframe(df)
```

Notice how row indices are displayed to the left of the `col0` column: 👇

![Diplay dataframe](/images/knowledge-base/display-dataframe.png)

To hide the column containing row indices, you can use CSS selectors to modify the visibility of the column. Before you display your dataframe, you must inject the appropriate CSS with `st.markdown()`, and set `allow_unsafe_html=True`.

Now that you have a conceptual understanding of how to hide row indices, let's implement it in code!

## Hide row indices with st.table

```python
import streamlit as st
import pandas as pd
import numpy as np

df = pd.DataFrame(
    np.random.randn(10, 5),
    columns=("col %d" % i for i in range(5)))

# CSS to inject contained in a string
hide_table_row_index = """
            <style>
            tbody th {display:none}
            .blank {display:none}
            </style>
            """

# Inject CSS with Markdown
st.markdown(hide_table_row_index, unsafe_allow_html=True)

# Display a static table
st.table(df)
```

![Hide dataframe index](/images/knowledge-base/hide-dataframe-index.png)

## Hide row indices with st.dataframe

```python
import streamlit as st
import pandas as pd
import numpy as np

df = pd.DataFrame(
    np.random.randn(10, 5),
    columns=("col %d" % i for i in range(5)))

# CSS to inject contained in a string
hide_dataframe_row_index = """
            <style>
            .row_heading.level0 {display:none}
            .blank {display:none}
            </style>
            """

# Inject CSS with Markdown
st.markdown(hide_dataframe_row_index, unsafe_allow_html=True)

# Display an interactive table
st.dataframe(df)
```

![Hide table index](/images/knowledge-base/hide-table-index.png)
