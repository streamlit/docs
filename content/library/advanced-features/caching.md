---
title: Caching
slug: /library/advanced-features/caching
---

<Note>

Documentation for the deprecated `@st.cache` decorator can be found in [Optimize performance with st.cache](/library/advanced-features/st.cache).

</Note>

# Caching

Streamlit runs your script from top to bottom at every user interaction or code change. This execution model makes development super easy. But it comes with two major challenges:

1. Long-running functions run again and again, which slows down your app.
2. Objects get recreated again and again, which makes it hard to persist them across reruns or sessions.

But don’t worry! Streamlit lets you tackle both issues with its built-in caching mechanism. Caching stores the results of slow function calls, so they only need to run once. This makes your app much faster and helps with persisting objects across reruns.

<Collapse title="Table of contents" expanded={true}>

1. [Minimal example](#minimal-example)
2. [Basic usage](#basic-usage)
3. [Advanced usage](#advanced-usage)
4. [Migrating from st.cache](#migrating-from-stcache)

</Collapse>

## Minimal example

To cache a function in Streamlit, you must decorate it with one of two decorators (`st.cache_data` or `st.cache_resource`):

```python
@st.cache_data
def long_running_function(param1, param2):
    return …
```

In this example, decorating `long_running_function` with `@st.cache_data` tells Streamlit that whenever the function is called, it checks two things:

1. The values of the input parameters (in this case, `param1` and `param2`).
2. The code inside the function.

If this is the first time Streamlit sees these parameter values and function code, it runs the function and stores the return value in a cache. The next time the function is called with the same parameters and code (e.g., when a user interacts with the app), Streamlit will skip executing the function altogether and return the cached value instead. During development, the cache updates automatically as the function code changes, ensuring that the latest changes are reflected in the cache.

As mentioned, there are two caching decorators:

- `st.cache_data` is the recommended way to cache computations that return data: loading a DataFrame from CSV, transforming a NumPy array, querying an API, or any other function that returns a serializable data object (str, int, float, DataFrame, array, list, …). It creates a new copy of the data at each function call, making it safe against [mutations and race conditions](#mutation-and-concurrency-issues). The behavior of `st.cache_data` is what you want in most cases – so if you're unsure, start with `st.cache_data` and see if it works!
- `st.cache_resource` is the recommended way to cache global resources like ML models or database connections – unserializable objects that you don’t want to load multiple times. Using it, you can share these resources across all reruns and sessions of an app without copying or duplication. Note that any mutations to the cached return value directly mutate the object in the cache (more details below).

<Image src="/images/caching-high-level-diagram.png" caption="Streamlit's two caching decorators and their use cases." alt="Streamlit's two caching decorators and their use cases. Use st.cache_data for anything you'd store in a database. Use st.cache_resource for anything you can't store in a database, like a connection to a database or a machine learning model." />

## Basic usage

### st.cache_data

`st.cache_data` is your go-to command for all functions that return data – whether DataFrames, NumPy arrays, str, int, float, or other serializable types. It’s the right command for almost all use cases!

#### Usage

<br />

Let's look at an example of using `st.cache_data`. Suppose your app loads the [Uber ride-sharing dataset](https://github.com/plotly/datasets/blob/master/uber-rides-data1.csv) – a CSV file of 50 MB – from the internet into a DataFrame:

```python
def load_data(url):
    df = pd.read_csv(url)  # 👈 Download the data
    return df

df = load_data("https://github.com/plotly/datasets/raw/master/uber-rides-data1.csv")
st.dataframe(df)

st.button("Rerun")
```

Running the `load_data` function takes 2 to 30 seconds, depending on your internet connection. (Tip: if you are on a slow connection, use [this 5 MB dataset instead](https://github.com/plotly/datasets/blob/master/26k-consumer-complaints.csv)). Without caching, the download is rerun each time the app is loaded or with user interaction. Try it yourself by clicking the button we added! Not a great experience… 😕

Now let’s add the `@st.cache_data` decorator on `load_data`:

```python
@st.cache_data  # 👈 Add the caching decorator
def load_data(url):
    df = pd.read_csv(url)
    return df

df = load_data("https://github.com/plotly/datasets/raw/master/uber-rides-data1.csv")
st.dataframe(df)

st.button("Rerun")
```

Run the app again. You'll notice that the slow download only happens on the first run. Every subsequent rerun should be almost instant! 💨

Here is another example that does not require downloading data from the Internet. Run this app and wait for the loading process to complete,  then refresh the web page to experience the benefits of caching! 🥳
```python
import streamlit as st
import numpy as np
import pandas as pd
from time import time, sleep

st.title('st.cache')

# Using cache
a0 = time()
st.subheader('Using st.cache')

@st.cache_data()
def load_data_a(flag=1):
    df = pd.DataFrame(
    np.random.rand(2000000, 5),
    columns=['a', 'b', 'c', 'd', 'e']
    )
    sleep(5)
    return df

st.write(load_data_a())
a1 = time()
st.info(a1-a0)


# Not using cache
b0 = time()
st.subheader('Not using st.cache')

def load_data_b(flag=1):
    df = pd.DataFrame(
    np.random.rand(2000000, 5),
    columns=['a', 'b', 'c', 'd', 'e']
    )
    sleep(5)
    return df

st.write(load_data_b())
b1 = time()
st.info(b1-b0)
```

#### Behavior

<br />

How does this work? Let’s go through the behavior of `st.cache_data` step by step:

- On the first run, Streamlit recognizes that it has never called the `load_data` function with the specified parameter value (the URL of the CSV file) So it runs the function and downloads the data.
- Now our caching mechanism becomes active: the returned DataFrame is serialized (converted to bytes) via [pickle](https://docs.python.org/3/library/pickle.html) and stored in the cache (together with the value of the `url` parameter).
- On the next run, Streamlit checks the cache for an entry of `load_data` with the specific `url`. There is one! So it retrieves the cached object, deserializes it to a DataFrame, and returns it instead of re-running the function and downloading the data again.

This process of serializing and deserializing the cached object creates a copy of our original DataFrame. While this copying behavior may seem unnecessary, it’s what we want when caching data objects since it effectively prevents mutation and concurrency issues. Read the section “[Mutation and concurrency issues](#mutation-and-concurrency-issues)” below to understand this in more detail.

#### Examples

<br/>

**DataFrame transformations**

In the example above, we already showed how to cache loading a DataFrame. It can also be useful to cache DataFrame transformations such as `df.filter`, `df.apply`, or `df.sort_values`. Especially with large DataFrames, these operations can be slow.

```python
@st.cache_data
def transform(df):
    df = df.filter(items=['one', 'three'])
    df = df.apply(np.sum, axis=0)
	return df
```

**Array computations**

Similarly, it can make sense to cache computations on NumPy arrays:

```python
@st.cache_data
def add(arr1, arr2):
	return arr1 + arr2
```

**Database queries**

You usually make SQL queries to load data into your app when working with databases. Repeatedly running these queries can be slow, cost money, and degrade the performance of your database. We strongly recommend caching any database queries in your app. See also [our guides on connecting Streamlit to different databases](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources) for in-depth examples.

```python
connection = database.connect()

@st.cache_data
def query():
    return pd.read_sql_query("SELECT * from table", connection)
```

<Tip>

You should set a `ttl` (time to live) to get new results from your database. If you set `st.cache_data(ttl=3600)`, Streamlit invalidates any cached values after 1 hour (3600 seconds) and runs the cached function again. See details in [Controlling cache size and duration](#controlling-cache-size-and-duration).
</Tip>

**API calls**

Similarly, it makes sense to cache API calls. Doing so also avoids rate limits.

```python
@st.cache_data
def api_call():
    response = requests.get('https://jsonplaceholder.typicode.com/posts/1')
    return response.json()
```

**Running ML models (inference)**

Running complex machine learning models can use significant time and memory. To avoid rerunning the same computations over and over, use caching.

```python
@st.cache_data
def run_model(inputs):
    return model(inputs)
```

### st.cache_resource

`st.cache_resource` is the right command to cache “resources” that should be available globally across all users, sessions, and reruns. It has more limited use cases than `st.cache_data`, especially for caching database connections and ML models.

#### Usage

As an example for `st.cache_resource`, let’s look at a typical machine learning app. As a first step, we need to load an ML model. We do this with [Hugging Face’s transformers library](https://huggingface.co/docs/transformers/index):

```python
from transformers import pipeline
model = pipeline("sentiment-analysis")  # 👈 Load the model
```

If we put this code into a Streamlit app directly, the app will load the model at each rerun or user interaction. Repeatedly loading the model poses two problems:

- Loading the model takes time and slows down the app.
- Each session loads the model from scratch, which takes up a huge amount of memory.

Instead, it would make much more sense to load the model once and use that same object across all users and sessions. That’s exactly the use case for `st.cache_resource`! Let’s add it to our app and process some text the user entered:

```python
from transformers import pipeline

@st.cache_resource  # 👈 Add the caching decorator
def load_model():
    return pipeline("sentiment-analysis")

model = load_model()

query = st.text_input("Your query", value="I love Streamlit! 🎈")
if query:
    result = model(query)[0]  # 👈 Classify the query text
    st.write(result)
```

If you run this app, you’ll see that the app calls `load_model` only once – right when the app starts. Subsequent runs will reuse that same model stored in the cache, saving time and memory!

#### Behavior

<br />

Using `st.cache_resource` is very similar to using `st.cache_data`. But there are a few important differences in behavior:

- `st.cache_resource` does **not** create a copy of the cached return value but instead stores the object itself in the cache. All mutations on the function’s return value directly affect the object in the cache, so you must ensure that mutations from multiple sessions do not cause problems. In short, the return value must be thread-safe.

    <Warning>

  Using `st.cache_resource` on objects that are not thread-safe might lead to crashes or corrupted data. Learn more below under [Mutation and concurrency issues](#mutation-and-concurrency-issues).
  </Warning>

- Not creating a copy means there’s just one global instance of the cached return object, which saves memory, e.g. when using a large ML model. In computer science terms, we create a [singleton](https://en.wikipedia.org/wiki/Singleton_pattern).
- Return values of functions do not need to be serializable. This behavior is great for types not serializable by nature, e.g., database connections, file handles, or threads. Caching these objects with `st.cache_data` is not possible.

#### Examples

<br />

**Database connections**

`st.cache_resource` is useful for connecting to databases. Usually, you’re creating a connection object that you want to reuse globally for every query. Creating a new connection object at each run would be inefficient and might lead to connection errors. That’s exactly what `st.cache_resource` can do, e.g., for a Postgres database:

```python
@st.cache_resource
def init_connection():
    host = "hh-pgsql-public.ebi.ac.uk"
    database = "pfmegrnargs"
    user = "reader"
    password = "NWDMCE5xdipIjRrp"
    return psycopg2.connect(host=host, database=database, user=user, password=password)

conn = init_connection()
```

Of course, you can do the same for any other database. Have a look at [our guides on how to connect Streamlit to databases](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources) for in-depth examples.

**Loading ML models**

Your app should always cache ML models, so they are not loaded into memory again for every new session. See the [example](#usage-1) above for how this works with 🤗 Hugging Face models. You can do the same thing for PyTorch, TensorFlow, etc. Here’s an example for PyTorch:

```python
@st.cache_resource
def load_model():
    model = torchvision.models.resnet50(weights=ResNet50_Weights.DEFAULT)
    model.eval()
    return model

model = load_model()
```

### Deciding which caching decorator to use

<br />

The sections above showed many common examples for each caching decorator. But there are edge cases for which it’s less trivial to decide which caching decorator to use. Eventually, it all comes down to the difference between “data” and “resource”:

- Data are serializable objects (objects that can be converted to bytes via [pickle](https://docs.python.org/3/library/pickle.html)) that you could easily save to disk. Imagine all the types you would usually store in a database or on a file system – basic types like str, int, and float, but also arrays, DataFrames, images, or combinations of these types (lists, tuples, dicts, and so on).
- Resources are unserializable objects that you usually would not save to disk or a database. They are often more complex, non-permanent objects like database connections, ML models, file handles, threads, etc.

From the types listed above, it should be obvious that most objects in Python are “data.” That’s also why `st.cache_data` is the correct command for almost all use cases. `st.cache_resource` is a more exotic command that you should only use in specific situations.

Or if you’re lazy and don’t want to think too much, look up your use case or return type in the table below 😉:

| Use case                             |                                                                                                       Typical return types |                                                                                                                                            Caching decorator |
| :----------------------------------- | -------------------------------------------------------------------------------------------------------------------------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Reading a CSV file with pd.read_csv  |                                                                                                           pandas.DataFrame |                                                                                                                                                st.cache_data |
| Reading a text file                  |                                                                                                           str, list of str |                                                                                                                                                st.cache_data |
| Transforming pandas dataframes       |                                                                                            pandas.DataFrame, pandas.Series |                                                                                                                                                st.cache_data |
| Computing with numpy arrays          |                                                                                                              numpy.ndarray |                                                                                                                                                st.cache_data |
| Simple computations with basic types |                                                                                                         str, int, float, … |                                                                                                                                                st.cache_data |
| Querying a database                  |                                                                                                           pandas.DataFrame |                                                                                                                                                st.cache_data |
| Querying an API                      |                                                                                                pandas.DataFrame, str, dict |                                                                                                                                                st.cache_data |
| Running an ML model (inference)      |                                                                                     pandas.DataFrame, str, int, dict, list |                                                                                                                                                st.cache_data |
| Creating or processing images        |                                                                                             PIL.Image.Image, numpy.ndarray |                                                                                                                                                st.cache_data |
| Creating charts                      |                                                        matplotlib.figure.Figure, plotly.graph_objects.Figure, altair.Chart | st.cache_data (but some libraries require st.cache_resource, since the chart object is not serializable – make sure not to mutate the chart after creation!) |
| Loading ML models                    |                                                             transformers.Pipeline, torch.nn.Module, tensorflow.keras.Model |                                                                                                                                            st.cache_resource |
| Initializing database connections    | pyodbc.Connection, sqlalchemy.engine.base.Engine, psycopg2.connection, mysql.connector.MySQLConnection, sqlite3.Connection |                                                                                                                                            st.cache_resource |
| Opening persistent file handles      |                                                                                                         \_io.TextIOWrapper |                                                                                                                                            st.cache_resource |
| Opening persistent threads           |                                                                                                           threading.thread |                                                                                                                                            st.cache_resource |

## Advanced usage

### Controlling cache size and duration

If your app runs for a long time and constantly caches functions, you might run into two problems:

1. The app runs out of memory because the cache is too large.
2. Objects in the cache become stale, e.g. because you cached old data from a database.

You can combat these problems with the `ttl` and `max_entries` parameters, which are available for both caching decorators.

**The `ttl` (time-to-live) parameter**

`ttl` sets a time to live on a cached function. If that time is up and you call the function again, the app will discard any old, cached values, and the function will be rerun. The newly computed value will then be stored in the cache. This behavior is useful for preventing stale data (problem 2) and the cache from growing too large (problem 1). Especially when pulling data from a database or API, you should always set a `ttl` so you are not using old data. Here’s an example:

```python
@st.cache_data(ttl=3600)  # 👈 Cache data for 1 hour (=3600 seconds)
def get_api_data():
    data = api.get(...)
    return data
```

<Tip>

You can also set `ttl` values using `timedelta`, e.g., `ttl=datetime.timedelta(hours=1)`.
</Tip>

**The `max_entries` parameter**

`max_entries` sets the maximum number of entries in the cache. An upper bound on the number of cache entries is useful for limiting memory (problem 1), especially when caching large objects. The oldest entry will be removed when a new entry is added to a full cache. Here’s an example:

```python
@st.cache_data(max_entries=1000)  # 👈 Maximum 1000 entries in the cache
def get_large_array(seed):
    np.random.seed(seed)
    arr = np.random.rand(100000)
    return arr
```

### Customizing the spinner

By default, Streamlit shows a small loading spinner in the app when a cached function is running. You can modify it easily with the `show_spinner` parameter, which is available for both caching decorators:

```python
@st.cache_data(show_spinner=False)  # 👈 Disable the spinner
def get_api_data():
    data = api.get(...)
    return data

@st.cache_data(show_spinner="Fetching data from API...")  # 👈 Use custom text for spinner
def get_api_data():
    data = api.get(...)
    return data
```

### Excluding input parameters

In a cached function, all input parameters must be hashable. Let’s quickly explain why and what it means. When the function is called, Streamlit looks at its parameter values to determine if it was cached before. Therefore, it needs a reliable way to compare the parameter values across function calls. Trivial for a string or int – but complex for arbitrary objects! Streamlit uses [hashing](https://en.wikipedia.org/wiki/Hash_function) to solve that. It converts the parameter to a stable key and stores that key. At the next function call, it hashes the parameter again and compares it with the stored hash key.

Unfortunately, not all parameters are hashable! E.g., you might pass an unhashable database connection or ML model to your cached function. In this case, you can exclude input parameters from caching. Simply prepend the parameter name with an underscore (e.g., `_param1`), and it will not be used for caching. Even if it changes, Streamlit will return a cached result if all the other parameters match up.

Here’s an example:

```python
@st.cache_data
def fetch_data(_db_connection, num_rows):  # 👈 Don't hash _db_connection
    data = _db_connection.fetch(num_rows)
    return data

connection = init_connection()
fetch_data(connection, 10)
```

### Using Streamlit commands in cached functions

#### Static elements

Since version 1.16.0, cached functions can contain Streamlit commands! For example, you can do this:

```python
@st.cache_data
def get_api_data():
    data = api.get(...)
    st.success("Fetched data from API!")  # 👈 Show a success message
    return data
```

As we know, Streamlit only runs this function if it hasn’t been cached before. On this first run, the `st.success` message will appear in the app. But what happens on subsequent runs? It still shows up! Streamlit realizes that there is an `st.` command inside the cached function, saves it during the first run, and replays it on subsequent runs. Replaying static elements works for both caching decorators.

You can also use this functionality to cache entire parts of your UI:

```python
@st.cache_data
def show_data():
    st.header("Data analysis")
    data = api.get(...)
    st.success("Fetched data from API!")
    st.write("Here is a plot of the data:")
    st.line_chart(data)
    st.write("And here is the raw data:")
    st.dataframe(data)
```

#### Input widgets

You can also use [interactive input widgets](/library/api-reference/widgets) like `st.slider` or `st.text_input` in cached functions. Widget replay is an experimental feature at the moment. To enable it, you need to set the `experimental_allow_widgets` parameter:

```python
@st.cache_data(experimental_allow_widgets=True)  # 👈 Set the parameter
def get_data():
    num_rows = st.slider("Number of rows to get")  # 👈 Add a slider
    data = api.get(..., num_rows)
    return data
```

Streamlit treats the slider like an additional input parameter to the cached function. If you change the slider position, Streamlit will see if it has already cached the function for this slider value. If yes, it will return the cached value. If not, it will rerun the function using the new slider value.

Using widgets in cached functions is extremely powerful because it lets you cache entire parts of your app. But it can be dangerous! Since Streamlit treats the widget value as an additional input parameter, it can easily lead to excessive memory usage. Imagine your cached function has five sliders and returns a 100 MB DataFrame. Then we’ll add 100 MB to the cache for _every permutation_ of these five slider values – even if the sliders do not influence the returned data! These additions can make your cache explode very quickly. Please be aware of this limitation if you use widgets in cached functions. We recommend using this feature only for isolated parts of your UI where the widgets directly influence the cached return value.

<Warning>

Support for widgets in cached functions is experimental. We may change or remove it anytime without warning. Please use it with care!
</Warning>

<Note>

Two widgets are currently not supported in cached functions: `st.file_uploader` and `st.camera_input`. We may support them in the future. Feel free to [open a GitHub issue](https://github.com/streamlit/streamlit/issues) if you need them!
</Note>

### Dealing with large data

As we explained, you should cache data objects with `st.cache_data`. But this can be slow for extremely large data, e.g., DataFrames or arrays with >100 million rows. That’s because of the [copying behavior](#copying-behavior) of `st.cache_data`: on the first run, it serializes the return value to bytes and deserializes it on subsequent runs. Both operations take time.

If you’re dealing with extremely large data, it can make sense to use `st.cache_resource` instead. It does not create a copy of the return value via serialization/deserialization and is almost instant. But watch out: any mutation to the function’s return value (such as dropping a column from a DataFrame or setting a value in an array) directly manipulates the object in the cache. You must ensure this doesn’t corrupt your data or lead to crashes. See the section on [Mutation and concurrency issues](#mutation-and-concurrency-issues) below.

When benchmarking `st.cache_data` on pandas DataFrames with four columns, we found that it becomes slow when going beyond 100 million rows. The table shows runtimes for both caching decorators at different numbers of rows (all with four columns):

|                   |                 | 10M rows | 50M rows | 100M rows | 200M rows |
| ----------------- | --------------- | :------: | :------: | :-------: | :-------: |
| st.cache_data     | First run\*     |  0.4 s   |   3 s    |   14 s    |   28 s    |
|                   | Subsequent runs |  0.2 s   |   1 s    |    2 s    |    7 s    |
| st.cache_resource | First run\*     |  0.01 s  |  0.1 s   |   0.2 s   |    1 s    |
|                   | Subsequent runs |   0 s    |   0 s    |    0 s    |    0 s    |

|                                                                                                                                                              |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _\*For the first run, the table only shows the overhead time of using the caching decorator. It does not include the runtime of the cached function itself._ |

### Mutation and concurrency issues

In the sections above, we talked a lot about issues when mutating return objects of cached functions. This topic is complicated! But it’s central to understanding the behavior differences between `st.cache_data` and `st.cache_resource`. So let’s dive in a bit deeper.

First, we should clearly define what we mean by mutations and concurrency:

- By **mutations**, we mean any changes made to a cached function’s return value _after_ that function has been called. I.e. something like this:

  ```python
  @st.cache_data
  def create_list():
      l = [1, 2, 3]

  l = create_list()  # 👈 Call the function
  l[0] = 2  # 👈 Mutate its return value
  ```

- By **concurrency**, we mean that multiple sessions can cause these mutations at the same time. Streamlit is a web framework that needs to handle many users and sessions connecting to an app. If two people view an app at the same time, they will both cause the Python script to rerun, which may manipulate cached return objects at the same time – concurrently.

Mutating cached return objects can be dangerous. It can lead to exceptions in your app and even corrupt your data (which can be worse than a crashed app!). Below, we’ll first explain the copying behavior of `st.cache_data` and show how it can avoid mutation issues. Then, we’ll show how concurrent mutations can lead to data corruption and how to prevent it.

#### Copying behavior

`st.cache_data` creates a copy of the cached return value each time the function is called. This avoids most mutations and concurrency issues. To understand it in detail, let’s go back to the [Uber ridesharing example](#usage) from the section on `st.cache_data` above. We are making two modifications to it:

1. We are using `st.cache_resource` instead of `st.cache_data`. `st.cache_resource` does **not** create a copy of the cached object, so we can see what happens without the copying behavior.
2. After loading the data, we manipulate the returned DataFrame (in place!) by dropping the column `"Lat"`.

Here’s the code:

```python
@st.cache_resource   # 👈 Turn off copying behavior
def load_data(url):
    df = pd.read_csv(url)
    return df

df = load_data("https://raw.githubusercontent.com/plotly/datasets/master/uber-rides-data1.csv")
st.dataframe(df)

df.drop(columns=['Lat'], inplace=True)  # 👈 Mutate the dataframe inplace

st.button("Rerun")
```

Let’s run it and see what happens! The first run should work fine. But in the second run, you see an exception: `KeyError: "['Lat'] not found in axis"`. Why is that happening? Let’s go step by step:

- On the first run, Streamlit runs `load_data` and stores the resulting DataFrame in the cache. Since we’re using `st.cache_resource`, it does **not** create a copy but stores the original DataFrame.
- Then we drop the column `"Lat"` from the DataFrame. Note that this is dropping the column from the _original_ DataFrame stored in the cache. We are manipulating it!
- On the second run, Streamlit returns that exact same manipulated DataFrame from the cache. It does not have the column `"Lat"` anymore! So our call to `df.drop` results in an exception. Pandas cannot drop a column that doesn’t exist.

The copying behavior of `st.cache_data` prevents this kind of mutation error. Mutations can only affect a specific copy and not the underlying object in the cache. The next rerun will get its own, unmutated copy of the DataFrame. You can try it yourself, just replace `st.cache_resource` with `st.cache_data` above, and you’ll see that everything works.

Because of this copying behavior, `st.cache_data` is the recommended way to cache data transforms and computations – anything that returns a serializable object.

#### Concurrency issues

Now let’s look at what can happen when multiple users concurrently mutate an object in the cache. Let's say you have a function that returns a list. Again, we are using `st.cache_resource` to cache it so that we are not creating a copy:

```python
@st.cache_resource
def create_list():
    l = [1, 2, 3]
    return l

l = create_list()
first_list_value = l[0]
l[0] = first_list_value + 1

st.write("l[0] is:", l[0])
```

Let's say user A runs the app. They will see the following output:

```python
l[0] is: 2
```

Let's say another user, B, visits the app right after. In contrast to user A, they will see the following output:

```python
l[0] is: 3
```

Now, user A reruns the app immediately after user B. They will see the following output:

```python
l[0] is: 4
```

What is happening here? Why are all outputs different?

- When user A visits the app, `create_list()` is called, and the list `[1, 2, 3]` is stored in the cache. This list is then returned to user A. The first value of the list, `1`, is assigned to `first_list_value` , and `l[0]` is changed to `2`.
- When user B visits the app, `create_list()` returns the mutated list from the cache: `[2, 2, 3]`. The first value of the list, `2`, is assigned to `first_list_value` and `l[0]` is changed to `3`.
- When user A reruns the app, `create_list()` returns the mutated list again: `[3, 2, 3]`. The first value of the list, `3`, is assigned to `first_list_value,` and `l[0]` is changed to 4.

If you think about it, this makes sense. Users A and B use the same list object (the one stored in the cache). And since the list object is mutated, user A's change to the list object is also reflected in user B's app.

This is why you must be careful about mutating objects cached with `st.cache_resource`, especially when multiple users access the app concurrently. If we had used `st.cache_data` instead of `st.cache_resource`, the app would have copied the list object for each user, and the above example would have worked as expected – users A and B would have both seen:

```python
l[0] is: 2
```

<Note>

This toy example might seem benign. But data corruption can be extremely dangerous! Imagine we had worked with the financial records of a large bank here. You surely don’t want to wake up with less money on your account just because someone used the wrong caching decorator 😉

</Note>

## Migrating from st.cache

We introduced the caching commands described above in Streamlit 1.18.0. Before that, we had one catch-all command `st.cache`. Using it was often confusing, resulted in weird exceptions, and was slow. That’s why we replaced `st.cache` with the new commands in 1.18.0 (read more in this [blog post](https://blog.streamlit.io/introducing-two-new-caching-commands-to-replace-st-cache/)). The new commands provide a more intuitive and efficient way to cache your data and resources and are intended to replace `st.cache` in all new development.

If your app is still using `st.cache`, don’t despair! Here are a few notes on migrating:

- `st.cache` is deprecated. • New versions of Streamlit will show a deprecation warning if your app uses it.
- We will not remove `st.cache` soon, so you don’t need to worry about your 2-year-old app breaking. But we encourage you to try the new commands going forward – they will be way less annoying!
- Switching code to the new commands should be easy in most cases. To decide whether to use `st.cache_data` or `st.cache_resource`, read [Deciding which caching decorator to use](#deciding-which-caching-decorator-to-use). Streamlit will also recognize common use cases and show hints right in the deprecation warnings.
- Most parameters from `st.cache` are also present in the new commands, with a few exceptions:
  - `allow_output_mutation` does not exist anymore. You can safely delete it. Just make sure you use the right caching command for your use case.
  - `suppress_st_warning` does not exist anymore. You can safely delete it. Cached functions can now contain Streamlit commands and will replay them. If you want to use widgets inside cached functions, set `experimental_allow_widgets=True`. See [here](#using-streamlit-commands-in-cached-functions).
  - `hash_funcs` does not exist anymore. You can exclude parameters from caching (and being hashed) by prepending them with an underscore: `_excluded_param`. See [here](#excluding-input-parameters).

If you have any questions or issues during the migration process, please contact us on the [forum](https://discuss.streamlit.io/), and we will be happy to assist you. 🎈
