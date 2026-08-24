---
title: Get dataframe row-selections from users (streamlit<1.35.0)
slug: /develop/tutorials/elements/dataframe-row-selections-old
description: Learn how to get dataframe row selections in older Streamlit versions (<1.35.0) using st.data_editor with checkbox columns as a workaround method.
keywords: dataframe selections, row selections, legacy workaround, st.data_editor, checkbox columns, older Streamlit versions, dataframe tutorial, backward compatibility
---

# Get dataframe row-selections from users (`streamlit<1.35.0`)

Before dataframe selections were introduced in Streamlit version 1.35.0, [`st.dataframe`](/api-reference/data/st.dataframe) and [`st.data_editor`](/develop/api-reference/data/st.data_editor) did not natively support passing user-selected rows to the Python backend. If you would like to work with row (or column)selections for dataframes, we recommend upgrading to `streamlit>=1.35.0`. For a newer tutorial, see [Get dataframe row-selections from users](/develop/tutorials/elements/dataframe-row-selections).

However, if you need a workaround for an older version of Streamlit, you can effectively get row selections by adding an extra [Checkbox column](/develop/api-reference/data/st.column_config/st.column_config.checkboxcolumn)) to your dataframe using `st.data_editor`. Use this extra column to collect a user's selection(s).

## Example

In the following example, we define a function which accepts a dataframe and returns the rows selected by a user. Within the function, the dataframe is copied to prevent mutating it. We insert a temporary "Select" column into the copied dataframe before passing the copied data into `st.data_editor`. We have disabled editing for all other columns, but you can make them editable if desired. After filtering the dataframe and dropping the temporary column, our function returns the selected rows.

```python
import streamlit as st
import numpy as np
import pandas as pd

df = pd.DataFrame(
    {
        "Animal": ["Lion", "Elephant", "Giraffe", "Monkey", "Zebra"],
        "Habitat": ["Savanna", "Forest", "Savanna", "Forest", "Savanna"],
        "Lifespan (years)": [15, 60, 25, 20, 25],
        "Average weight (kg)": [190, 5000, 800, 10, 350],
    }
)

def dataframe_with_selections(df):
    df_with_selections = df.copy()
    df_with_selections.insert(0, "Select", False)

    # Get dataframe row-selections from user with st.data_editor
    edited_df = st.data_editor(
        df_with_selections,
        hide_index=True,
        column_config={"Select": st.column_config.CheckboxColumn(required=True)},
        disabled=df.columns,
    )

    # Filter the dataframe using the temporary column, then drop the column
    selected_rows = edited_df[edited_df.Select]
    return selected_rows.drop('Select', axis=1)


selection = dataframe_with_selections(df)
st.write("Your selection:")
st.write(selection)
```
