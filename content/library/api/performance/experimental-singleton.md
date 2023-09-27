---
title: st.experimental_singleton
slug: /library/api-reference/performance/st.experimental_singleton
description: st.experimental_singleton is a function decorator used to store singleton objects.
---

<Important>

This is an experimental feature. Experimental features and their APIs may change or be removed at any time. To learn more, click [here](/library/advanced-features/prerelease#experimental-features).

</Important>

<Autofunction function="streamlit.experimental_singleton" deprecated={true} deprecatedText="<code>st.experimental_singleton</code> was deprecated in version 1.18.0. Use <a href='/library/api-reference/performance/st.cache_resource'><code>st.cache_resource</code></a> instead. Learn more in <a href='/library/advanced-features/caching'>Caching</a>."/>

### Validating the cache

The `@st.experimental_singleton` decorator is used to cache the output of a function, so that it only needs to be executed once. This can improve performance in certain situations, such as when a function takes a long time to execute or makes a network request.

However, in some cases, the cached output may become invalid over time, such as when a database connection times out. To handle this, the `@st.experimental_singleton` decorator supports an optional `validate` parameter, which accepts a validation function that is called each time the cached output is accessed. If the validation function returns False, the cached output is discarded and the decorated function is executed again.

<!-- Let's learn how to use the `validate` parameter to ensure that cached output remains valid. Let's also look at specific examples and best practices to help you understand how to use this feature effectively.

#### Example 1: Validating a database connection

In the example below, we connect to a [public PostgreSQL database](https://rnacentral.org/help/public-database) using the `psycopg2` library. We use `@st.experimental_singleton` to cache the connection, and we use the `validate` parameter to validate the connection before returning it. If the connection is invalid, we reconnect and return the new connection. To simulate a connection timeout, we use a checkbox to close the connection. When the connection is closed, the cached value is discarded and the connection is reestablished:

```python
import psycopg2
import streamlit as st

if "logs" not in st.session_state:
    st.session_state.logs = []

# Function to validate psycopg2 connection
def validate_connection(conn):
    try:
        # Check if connection is valid
        # by executing a simple query
        with conn.cursor() as curs:
            curs.execute("SELECT 1")
            curs.fetchone()
    except:
        st.session_state.logs.append("Connection lost. Reconnecting...")
        # Connection is invalid, invalidate cache
        return False
    return True # Connection is valid, don't invalidate cache

# Get connection parameters
host = "hh-pgsql-public.ebi.ac.uk"
dbname = "pfmegrnargs"
port = 5432
user = "reader"
password = "NWDMCE5xdipIjRrp"

# Initialize connection
# Connection will be reinitialized if validation function returns False.
@st.experimental_singleton(validate=validate_connection)
def init_connection():
    # Connect to the database
    conn = psycopg2.connect(
        host=host,
        dbname=dbname,
        port=port,
        user=user,
        password=password,
    )
    return conn

conn = init_connection()

# Create a cursor object
cursor = conn.cursor()

# Execute query
cursor.execute("SELECT * FROM rnc_database ORDER BY id LIMIT 10")

# Fetch data
data = cursor.fetchall()

# Append to logs
st.session_state.logs.append("Data fetched successfully.")

# Create a Dataframe
st.dataframe(data)

# Display logs
st.write(st.session_state.logs)

# Checkbox to close connection
if st.checkbox("Close connection"):
    cursor.close()
    conn.close()
    st.session_state.logs.append("Connection closed.")

st.button("Rerun")
```

First, try running the app without closing the connection. You should see a table with 10 rows and a message saying "Data fetched successfully."

Now, check the checkbox to close the connection and click "Rerun." You should see a message saying "Connection lost. Reconnecting..." and a new table with 10 rows. This is because the cached connection was discarded and a new connection was established.

Next, remove the `validate=validate_connection` parameter from the decorator and rerun the app. You should see an error message saying `InterfaceError: connection already closed`. This is because the cached connection was not validated and was returned even though it was closed.

Here we've simulated a connection timeout by closing the connection. In practice, the above example can be simplified by removing the timeout simulation and using the `validate` parameter to validate the connection like this:

```python
import psycopg2
import streamlit as st

# Function to validate psycopg2 connection
def check_connection(conn):
    try:
        # Check if connection is valid
        conn.poll()
        return True # Connection is valid, don't invalidate cache
    except psycopg.OperationalError:
        return False # Connection is invalid, invalidate cache

# Get connection parameters
host = "hh-pgsql-public.ebi.ac.uk"
dbname = "pfmegrnargs"
port = 5432
user = "reader"
password = "NWDMCE5xdipIjRrp"

# Initialize and cache connection.
# Connection will be reinitialized if validation function returns False.
@st.experimental_singleton(validate=check_connection)
def init_connection():
    # Connect to the database
    conn = psycopg2.connect(
        host=host,
        dbname=dbname,
        port=port,
        user=user,
        password=password,
    )
    return conn

conn = init_connection()

# Create a cursor object
cursor = conn.cursor()

# Execute query
cursor.execute("SELECT * FROM rnc_database ORDER BY id LIMIT %s", (10,))

# Fetch data
data = cursor.fetchall()

# Create a Dataframe
st.dataframe(data)
```

In this example, we used the `validate` parameter to validate a database connection. However, you can use this parameter to validate any type of cached output, such as a network request or a file.

#### Example 2: Validating a API response

Let's say you have a function `get_api_data()` that returns some data from an API. The API is returning a 500 error if the response is not valid. We use the `validate` parameter to check the `status_code` attribute of the response object, which is set to 200 when the API returns a successful response. If the status code is not 200, the validation function returns `False` and the `get_api_data()` function is executed again, re-fetching the data from the API.

Here is a working example of how to use the validate parameter to validate an API response:

```python
import requests

import streamlit as st

if "status_code" not in st.session_state:
    st.session_state.status_code = "200"

if "logs" not in st.session_state:
    st.session_state.logs = []

# A function to validate the response
def validate_response(response):
    if response.status_code == int(st.session_state.status_code):
        return True
    else:
        st.session_state.logs.append("Invalid response. Reconnecting...")
        return False

@st.experimental_singleton(validate=validate_response)
def get_api_data():
    url = "https://jsonplaceholder.typicode.com/posts/1"
    response = requests.get(url)
    return response

data = get_api_data().json()
st.session_state.logs.append("Data fetched successfully.")
st.write(data)

# simulate an invalid API response
if st.checkbox("Simulate invalid API response"):
    st.session_state.status_code = "500"
else:
    st.session_state.status_code = "200"

st.button("Rerun")
st.subheader("Logs")
st.write(st.session_state.logs)
```

The example is using a public API endpoint that returns a JSON object with a post information, and simulates an invalid API response by changing the validation function to return `False` when the `status_code` is not `200` and this is done after the checkbox is checked.

In this example, first run the app without simulating an invalid API response. You should see the data returned from the API and a message saying "Data fetched successfully."

Now, check the checkbox to simulate an invalid API response and click "Rerun." You should see a message saying "Invalid response. Reconnecting..." and the new data returned from the API. This is because the cached response was discarded and the `get_api_data()` function was executed again.

Next, remove the `validate=validate_response` parameter from the `@st.experimental_singleton` decorator and rerun the app. You should see an error message saying "Attribute 'status_code' of 'NoneType' objects" This is because the cached response was not validated and was returned even though it was invalid.

By using the `validate` parameter in the `@st.experimental_singleton` decorator, you can ensure that your cached data remains valid and prevent errors caused by stale or invalid data.

If we do away with the simulation in the above example and use the `validate` parameter to validate the API response, the code can be simplified to:

```python
import requests
import streamlit as st

@st.experimental_singleton(
    validate=lambda response: True if response.status_code == 200 else False
)
def get_api_data():
    url = "https://jsonplaceholder.typicode.com/posts/1"
    response = requests.get(url)
    return response

try:
    response = get_api_data()
    response.raise_for_status()
    data = response.json()
    st.write(data)
except requests.exceptions.HTTPError as err:
    st.error(err)
``` -->

#### Best Practices

- Use the `validate` parameter when the cached output may become invalid over time, such as when a database connection or an API key expires.
- Use the `validate` parameter judiciously, as it will add an additional overhead of calling the validation function each time the cached output is accessed.
- Make sure that the validation function is as fast as possible, as it will be called each time the cached output is accessed.
- Consider to validate cached data periodically, instead of each time it is accessed, to mitigate the performance impact.
- Handle errors that may occur during validation and provide a fallback mechanism if the validation fails.

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
- `st.audio`
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
- `st.form`
- `st.form_submit_button`
- `st.graphviz_chart`
- `st.help`
- `st.image`
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
- `st.video`
- `st.warning`

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
