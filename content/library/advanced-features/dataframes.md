---
title: Dataframes
slug: /library/advanced-features/dataframes
---

# Dataframes

Dataframes are a great way to display and edit data in a tabular format. Working with Pandas DataFrames and other tabular data structures is key to data science workflows. If developers and data scientists want to display this data in Streamlit, they have multiple options: `st.dataframe` and `st.experimental_data_editor`. If you want to solely display data in a table-like UI, [st.dataframe](/library/api-reference/data/st.dataframe) is the way to go. If you want to interactively edit data, use [st.experimental_data_editor](/library/api-reference/widgets/st.experimental_data_editor). We explore the use cases and advantages of each option in the following sections.

## Display dataframes with st.dataframe

Streamlit can display dataframes in a table-like UI via `st.dataframe` :

```python
import streamlit as st
import pandas as pd

df = pd.DataFrame(
    [
        {"command": "st.selectbox", "rating": 4, "is_widget": True},
        {"command": "st.balloons", "rating": 5, "is_widget": False},
        {"command": "st.time_input", "rating": 3, "is_widget": True},
    ]
)

st.dataframe(df, use_container_width=True)
```

<Cloud src="https://doc-dataframe-basic.streamlit.app/?embed=true" height="300px"/>

## Additional UI features

`st.dataframe` also provides some additional functionality by using [glide-data-grid](https://github.com/glideapps/glide-data-grid) under the hood:

- **Column sorting**: sort columns by clicking on their headers.
- **Column resizing**: resize columns by dragging and dropping column header borders.
- **Table resizing**: resize tables by dragging and dropping the bottom right corner.
- **Search**: search through data by clicking a table, using hotkeys (`⌘ Cmd + F` or `Ctrl + F`) to bring up the search bar, and using the search bar to filter data.
- **Copy to clipboard**: select one or multiple cells, copy them to the clipboard and paste them into your favorite spreadsheet software.

![dataframe-ui.gif](/images/dataframe-ui.gif)

Try out all the addition UI features using the embedded app from the prior section.

In addition to Pandas DataFrames, `st.dataframe` also supports other common Python types, e.g., list, dict, or numpy array. It also supports [Snowpark](https://docs.snowflake.com/en/developer-guide/snowpark/index) and [PySpark](https://spark.apache.org/docs/latest/api/python/) DataFrames, which allow you to lazily evaluate and pull data from databases. This can be useful for working with large datasets.

## Edit data with st.experimental_data_editor

Streamlit supports editable dataframes via the `st.experimental_data_editor` command. Check out its API in [st.experimental_data_editor](/library/api-reference/widgets/st.experimental_data_editor). It shows the dataframe in a table, similar to `st.dataframe`. But in contrast to `st.dataframe`, this table isn't static! The user can click on cells and edit them. The edited data is then returned on the Python side. Here's an example:

```python
df = pd.DataFrame(
    [
        {"command": "st.selectbox", "rating": 4, "is_widget": True},
        {"command": "st.balloons", "rating": 5, "is_widget": False},
        {"command": "st.time_input", "rating": 3, "is_widget": True},
    ]
)

df = load_data()
edited_df = st.experimental_data_editor(df) # 👈 An editable dataframe

favorite_command = edited_df.loc[edited_df["rating"].idxmax()]["command"]
st.markdown(f"Your favorite command is **{favorite_command}** 🎈")
```

<Collapse title="View interactive app">

<Cloud src="https://doc-data-editor.streamlit.app/?embed=true" height="300px"/>

</Collapse>

Try it out by double-clicking on any cell. You'll notice you can edit all cell values. Try editing the values in the rating column and observe how the text output at the bottom changes:

![data-editor-editing.gif](/images/data-editor-editing.gif)

`st.experimental_data_editor` also supports a few additional things:

- [Copy and paste support](#copy-and-paste-support) from and to Excel and Google Sheets.
- [Add and delete rows](#add-and-delete-rows). You can do this by setting `num_rows= "dynamic"` when calling `st.experimental_data_editor`. This will allow users to add and delete rows as needed.
- [Access edited data](#access-edited-data).
- [Bulk edits](#bulk-edits) (similar to Excel, just drag a handle to edit neighboring cells).
- [Automatic input validation](#automatic-input-validation), e.g. no way to enter letters into a number cell.
- [Edit common data structures](#edit-common-data-structures) such as lists, dicts, NumPy ndarray, etc.

### Copy and paste support

The data editor supports pasting in tabular data from Google Sheets, Excel, Notion, and many other similar tools. You can also copy-paste data between `st.experimental_data_editor` instances. This can be a huge time saver for users who need to work with data across multiple platforms. To try it out:

1. Copy data from [this Google Sheets document](https://docs.google.com/spreadsheets/d/1Z0zd-5dF_HfqUaDDq4BWAOnsdlGCjkbTNwDZMBQ1dOY/edit?usp=sharing) to clipboard
2. Select any cell in the `name` column of the table below and paste it in (via `ctrl/cmd + v`).

<Collapse title="View interactive app">

<Cloud src="https://doc-data-editor-clipboard.streamlit.app/?embed=true" height="400px"/>

</Collapse>

![data-editor-clipboard.gif](/images/data-editor-clipboard.gif)

<Note>

Every cell of the pasted data will be evaluated individually and inserted into the cells if the data is compatible with the column type. E.g., pasting in non-numerical text data into a number column will be ignored.

</Note>

Did you notice that although the initial dataframe had just five rows, pasting all those rows from the spreadsheet added additional rows to the dataframe? 👀 Let's find out how that works in the next section.

### Add and delete rows

With `st.experimental_data_editor`, viewers can add or delete rows via the table UI. This mode can be activated by setting the `num_rows` parameter to `"dynamic"`. E.g.

```python
edited_df = st.experimental_data_editor(df, num_rows=”dynamic”)
```

- To add new rows, scroll to the bottom-most row and click on the “+” sign in any cell.
- To delete rows, select one or more rows and press the `delete` key on your keyboard.

<Collapse title="View interactive app">

<Cloud src="https://doc-data-editor-clipboard.streamlit.app/?embed=true" height="400px"/>

</Collapse>

![data-editor-add-delete.gif](/images/data-editor-add-delete.gif)

### Access edited data

Sometimes, it is more convenient to know which cells have been changed rather than getting the entire edited dataframe back. Streamlit makes this easy through the use of [session state](https://docs.streamlit.io/library/advanced-features/session-state). If a `key` parameter is set, Streamlit will store any changes made to the dataframe in the session state.

This snippet shows how you can access changed data using session state:

```python
st.experimental_data_editor(df, key="data_editor") # 👈 Set a key
st.write("Here's the session state:")
st.write(st.session_state["data_editor"]) # 👈 Access the edited data
```

In this code snippet, the `key` parameter is set to `"data_editor"`. Any changes made to the data in the `st.experimental_data_editor` instance will be tracked by Streamlit and stored in session state under the key `"data_editor"`.

After the data editor is created, the contents of the `"data_editor"` key in session state are printed to the screen using `st.write(st.session_state["data_editor"])`. This allows you to see the changes made to the original dataframe without having to return the entire dataframe from the data editor.

This can be useful when working with large dataframes and you only need to know which cells have changed, rather than the entire edited dataframe.

<Collapse title="View interactive app">

<Cloud src="https://doc-data-editor-changed.streamlit.app/?embed=true" height="700px"/>

</Collapse>

Use all we've learned so far and apply them to the above embedded app. Try editing cells, adding new rows, and deleting rows.

![data-editor-session-state.gif](/images/data-editor-session-state.gif)

Notice how edits to the table are reflected in session state: when you make any edits, a rerun is triggered which sends the edits to the backend via `st.experimental_data_editor`'s keyed widget state. Its widget state is a JSON object containing three properties: **edited_cells**, **added_rows**, and **deleted rows:**.

- `edited_cells` maps a cell position to the edited value: `row:column` → `value` .
- `added_rows` is a list of newly added rows to the table. Each row is a dictionary where the keys are the column indices and the values are the corresponding cell values.
- `deleted_rows` is a list of row indices that have been deleted from the table.

### Bulk edits

The data editor includes a feature that allows for bulk editing of cells. Similar to Excel, you can drag a handle across a selection of cells to edit their values in bulk. You can even apply commonly used [keyboard shortcuts](https://github.com/glideapps/glide-data-grid/blob/main/packages/core/API.md#keybindings) in spreadsheet software. This is useful when you need to make the same change across multiple cells, rather than editing each cell individually:

![data-editor-bulk-editing.gif](/images/data-editor-bulk-editing.gif)

### Automatic input validation

The data editor includes automatic input validation to help prevent errors when editing cells. For example, if you have a column that contains numerical data, the input field will automatically restrict the user to only entering numerical data. This helps to prevent errors that could occur if the user were to accidentally enter a non-numerical value.

### Edit common data structures

Editing doesn't just work for Pandas DataFrames! You can also edit lists, tuples, sets, dictionaries, NumPy arrays, or Snowpark & PySpark DataFrames. Most data types will be returned in their original format. But some types (e.g. Snowpark and PySpark) are converted to Pandas DataFrames. To learn about all the supported types, read the [st.experimental_data_editor](/library/api-reference/widgets/st.experimental_data_editor) API.

E.g. you can easily let the user add items to a list:

```python
edited_list = st.experimental_data_editor(["red", "green", "blue"], num_rows= "dynamic")
st.write("Here are all the colors you entered:")
st.write(edited_list)
```

Or numpy arrays:

```python
import numpy as np

st.experimental_data_editor(np.array([
	["st.text_area", "widget", 4.92],
	["st.markdown", "element", 47.22]
]))
```

Or lists of records:

```python
st.experimental_data_editor([
    {"name": "st.text_area", "type": "widget"},
    {"name": "st.markdown", "type": "element"},
])
```

Or dictionaries and many more types!

```python
st.experimental_data_editor({
	"st.text_area": "widget",
	"st.markdown": "element"
})
```

## Configuring columns

You will be able configure the display and editing behavior of columns via `st.dataframe` and `st.experimental_data_editor` in to-be-announced future releases. We are developing an API to let you add images, charts, and clickable URLs in dataframe columns. Additionally, you will be able to make individual columns editable, set columns as categorical and specify which options they can take, hide the index of the dataframe, and much more.

<Important>

We will release the ability to configure columns in a future version of Streamlit. Keep at an eye out for updates on this page and the [Streamlit roadmap](https://roadmap.streamlit.app/).

</Important >

While the ability to configure columns has yet to be released, there are techniques you can use with Pandas today to render columns as checkboxes, selectboxes, and change the type of columns.

### Boolean columns (checkboxes)

To render columns as checkboxes and clickable checkboxes in `st.dataframe` and `st.experimental_data_editor`, respectively, set the type of the Pandas column as `bool`.

Here’s an example of creating a Pandas DataFrame with column `A` containing boolean values. When we display it using `st.dataframe`, the boolean values are rendered as checkboxes, where `True` and `False` values are checked and unchecked, respectively.

```python
import pandas as pd

# create a dataframe with a boolean column
df = pd.DataFrame({"A": [True, False, True, False]})

# show the dataframe with checkboxes
st.dataframe(df)
```

![data-editor-dataframe-boolean.gif](/images//data-editor-dataframe-boolean.gif)

Notice you cannot change their values from the frontend. To let users check and uncheck values, we display the dataframe with `st.experimental_data_editor` instead:

```python
import pandas as pd

# create a dataframe with a boolean column
df = pd.DataFrame({"A": [True, False, True, False]})

# show the data editor with checkboxes
st.experimental_data_editor(df)
```

![data-editor-boolean.gif](/images/data-editor-boolean.gif)

### Categorical columns (selectboxes)

To render columns as selectboxes with `st.experimental_data_editor`, set the type of the Pandas column as `category`:

```python
import pandas as pd

df = pd.DataFrame(
    {"command": ["st.selectbox", "st.slider", "st.balloons", "st.time_input"]}
)
df["command"] = df["command"].astype("category")

edited_df = st.experimental_data_editor(df)
```

In some cases, you may want users to select categories that aren’t in the original Pandas DataFrame. Let’s say we use `df` from above. Currently, the `command` column can take on four unique values. What should we do if we want users to see additional options such as `st.button` and `st.radio`?

To add additional categories to the selection, use [pandas.Series.cat.add_categories](https://pandas.pydata.org/docs/reference/api/pandas.Series.cat.add_categories.html):

```python
import pandas as pd

df = pd.DataFrame(
    {"command": ["st.selectbox", "st.slider", "st.balloons", "st.time_input"]}
)
df["command"] = (
    df["command"].astype("category").cat.add_categories(["st.button", "st.radio"])
)

edited_df = st.experimental_data_editor(df)
```

![data-editor-categorical.gif](/images/data-editor-categorical.gif)

### Change column type

To change the type of a column, you can change the type of the underlying Pandas DataFrame column. E.g., say you have a column with only integers but want users to be able to add numbers with decimals. To do so, simply change the Pandas DataFrame column type to `float`, like so:

```python
import pandas as pd

import streamlit as st

# create a dataframe with an integer column
df = pd.DataFrame({"A": [1, 2, 3, 4]})

# unable to add float values to the column
edited_df = st.experimental_data_editor(df)

# cast the column to float
df["A"] = df["A"].astype("float")

# able to add float values to the column
edited_df = st.experimental_data_editor(df)
```

In the first data editor instance, you cannot add decimal values to any entries. But after casting column `A` to type `float`, we’re able to edit the values as floating point numbers:

![data-editor-change-type.gif](/images/data-editor-change-type.gif)

## Handling large datasets

`st.dataframe` and `st.experimental_data_editor` have been designed to theoretically handle tables with millions of rows thanks to their highly performant implementation using the glide-data-grid library and HTML canvas. However, the maximum amount of data that an app can realistically handle will depend on several other factors, including:

1. The maximum size of WebSocket messages: Streamlit's WebSocket messages are configurable via the `server.maxMessageSize` [config option](https://docs.streamlit.io/library/advanced-features/configuration#view-all-configuration-options), which limits the amount of data that can be transferred via the WebSocket connection at once.
2. The server memory: The amount of data that your app can handle will also depend on the amount of memory available on your server. If the server's memory is exceeded, the app may become slow or unresponsive.
3. The user's browser memory: Since all the data needs to be transferred to the user's browser for rendering, the amount of memory available on the user's device can also affect the app's performance. If the browser's memory is exceeded, it may crash or become unresponsive.

In addition to these factors, a slow network connection can also significantly slow down apps that handle large datasets.

When handling large datasets with more than 150,000 rows, Streamlit applies additional optimizations and disables column sorting. This can help to reduce the amount of data that needs to be processed at once and improve the app's performance.

## Limitations

While Streamlit's data editing capabilities offer a lot of functionality, there are some limitations to be aware of:

- The editing functionalities are not yet optimized for mobile devices.
- Editing is enabled only for a limited set of types (e.g. string, numbers, boolean). We are actively working on supporting more types soon, such as date, time, and datetime.
- Editing of Pandas DataFrames only supports the following index types: `RangeIndex`, (string) `Index`, `Float64Index`, `Int64Index`, and `UInt64Index`.
- The column type is inferred from the underlying data and cannot be configured yet.
- Some actions like deleting rows or searching data can only be triggered via keyboard hotkeys.

We are working to fix the above limitations in future releases, so keep an eye out for updates.
