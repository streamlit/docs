---
title: Experimental cache primitives
slug: /library/advanced-features/experimental-cache-primitives
---

<Deprecation>

The experimental cache primitives described on this page were deprecated in version 1.18.0. Use [`st.cache_data`](/library/api-reference/performance/st.cache_data) or [`st.cache_resource`](/library/api-reference/performance/st.cache_resource) instead. Learn more in [Caching](/library/advanced-features/caching).

</Deprecation>

# Experimental cache primitives

## Overview

Streamlit's unique execution model is a part of what makes it a joy to use: your code executes from top to bottom like a simple script for every interaction. There's no need to think about models, views, controllers, or anything of the sort.

Whenever your code re-executes, a decorator called [`@st.cache`](/library/api-reference/performance/st.cache)—which is a powerful primitive for memoization and state storage capabilities—provides a caching mechanism that allows your app to stay performant even when loading data from the web, manipulating large datasets, or performing expensive computations.

However, we've found that [`@st.cache`](/library/advanced-features/caching) is hard to use and not fast. You're either faced with cryptic errors like `InternalHashError` or `UnhashableTypeError`. Or you need to understand concepts like [`hash_funcs`](/library/advanced-features/caching#the-hash_funcs-parameter) and [`allow_output_mutation`](/library/advanced-features/caching#example-1-pass-a-database-connection-around).

Our solutions include two new primitives: [**`st.experimental_memo`**](/library/api-reference/performance/st.experimental_memo) and [**`st.experimental_singleton`**](/library/api-reference/performance/st.experimental_singleton). They're conceptually simpler and much, much faster. In some of our internal tests on caching large dataframes, `@st.experimental_memo` has outperformed `@st.cache` by an order of magnitude. That's over 10X faster! 🚀

Let's take a look at the use-cases these _two_ experimental APIs serve, and how they're a significant improvement over `@st.cache`.

## Problem

`@st.cache` was serving the following use-cases:

1. Storing computation results given different kinds of inputs. In Computer Science literature, this is called [**memoization**](https://en.wikipedia.org/wiki/Memoization).
2. Initializing an object exactly once, and reusing that same instance on each rerun for the Streamlit server's lifetime. This is called the [**singleton pattern**](https://en.wikipedia.org/wiki/Singleton_pattern).
3. Storing global state to be shared and modified across multiple Streamlit sessions (and, since Streamlit is threaded, you need to pay special attention to thread-safety).

As a result of `@st.cache` trying to cover too many use-cases under a single unified API, it's both slow and complex.

## Solution

While `@st.cache` tries to solve two very different problems simultaneously (caching data and sharing global singleton objects), these new primitives simplify things by dividing the problem across two different APIs. As a result, they are faster and simpler.

### `@st.experimental_memo`

Use [`@st.experimental_memo`](/library/api-reference/performance/st.experimental_memo) to store expensive computation which can be "cached" or "memoized" in the traditional sense. It has almost the exact same API as the existing `@st.cache`, so you can often blindly replace one for the other:

```python
import streamlit as st

@st.experimental_memo
def factorial(n):
	if n < 1:
		return 1
	return n * factorial(n - 1)

f10 = factorial(10)
f9 = factorial(9)  # Returns instantly!
```

#### Properties

- Unlike `@st.cache`, this returns cached items by value, not by reference. This means that you no longer have to worry about accidentally mutating the items stored in the cache. Behind the scenes, this is done by using Python's `pickle()` function to serialize/deserialize cached values.
- Although this uses a custom hashing solution for generating cache keys (like `@st.cache`), it does **_not_** use `hash_funcs` as an escape hatch for unhashable parameters. Instead, we allow you to ignore unhashable parameters (e.g. database connections) by prefixing them with an underscore.

For example:

```python
import streamlit as st
import pandas as pd
from sqlalchemy.orm import sessionmaker

@st.experimental_memo
def get_page(_sessionmaker, page_size, page):
	"""Retrieve rows from the RNA database, and cache them.

	Parameters
	----------
	_sessionmaker : a SQLAlchemy session factory. Because this arg name is
	                prefixed with "_", it won't be hashed.
	page_size : the number of rows in a page of result
	page : the page number to retrieve

	Returns
	-------
	pandas.DataFrame
	A DataFrame containing the retrieved rows. Mutating it won't affect
	the cache.
	"""
	with _sessionmaker() as session:
		query = (
			session
				.query(RNA.id, RNA.seq_short, RNA.seq_long, RNA.len, RNA.upi)
				.order_by(RNA.id)
				.offset(page_size * page)
				.limit(page_size)
		)

		return pd.read_sql(query.statement, query.session.bind)
```

### `@st.experimental_singleton`

[`@st.experimental_singleton`](/library/api-reference/performance/st.experimental_singleton) is a key-value store that's shared across all sessions of a Streamlit app. It's great for storing heavyweight singleton objects across sessions (like TensorFlow/Torch/Keras sessions and/or database connections).

Example usage:

```python
import streamlit as st
from sqlalchemy.orm import sessionmaker

@st.experimental_singleton
def get_db_sessionmaker():
	# This is for illustration purposes only
	DB_URL = "your-db-url"
	engine = create_engine(DB_URL)
	return sessionmaker(engine)

dbsm = get_db_sessionmaker()
```

#### How this compares to `@st.cache`:

- Like `@st.cache`, **this returns items by reference.**
- You can return any object type, including objects that are not serializable.
- Unlike `@st.cache`, this decorator does not have additional logic to check whether you are unexpectedly mutating the cached object. That logic was slow and produced confusing error messages. So, instead, we're hoping that by calling this decorator "singleton," we're nudging you to the correct behavior.
- This does not follow the computation graph.
- You don't have to worry about `hash_funcs`! Just prefix your arguments with an underscore to ignore them.

<Warning>

Singleton objects can be used concurrently by every user connected to your app, and _you are responsible for ensuring that `@st.singleton` objects are thread-safe_. (Most objects you'd want to stick inside an `@st.singleton` annotation are probably already safe—but you should verify this.)

</Warning>

### Which to use: memo or singleton?

Decide between `@st.experimental_memo` and `@st.experimental_singleton` based on your function's _return type_. Functions that return _data_ should use `memo`. Functions that return _non-data objects_ should use `singleton`.

For example:

- Dataframe computation (pandas, numpy, etc): this is *data—*use `memo`
- Storing downloaded data: `memo`
- Calculating pi to n digits: `memo`
- Tensorflow session: this is a *non-data object—*use `singleton`
- Database connection: `singleton`

### Clear memo and singleton caches procedurally

You can clear caches of functions decorated with `@st.experimental_memo` and `@st.experimental_singleton` _in code_. For example, you can do the following:

```python
@st.experimental_memo
def square(x):
    return x**2

if st.button("Clear Square"):
    # Clear square's memoized values:
    square.clear()

if st.button("Clear All"):
    # Clear values from *all* memoized functions:
    st.experimental_memo.clear()
```

Pressing the "Clear Square" button will clear `square()`'s memoized values. Pressing the "Clear All" button will clear memoized values from all functions decorated with `@st.experimental_memo`.

In summary:

- Any function annotated with `@st.experimental_memo` or `@st.experimental_singleton` gets its own `clear()` function automatically.
- Additionally, you can use [`st.experimental_memo.clear()`](/library/api-reference/performance/st.experimental_memo.clear) and [`st.experimental_singleton.clear()`](/library/api-reference/performance/st.experimental_singleton.clear) to clear _all_ memo and singleton caches, respectively.

<Note>

The commands are **experimental**, so they're governed by our [experimental API process](/library/advanced-features/prerelease#experimental).

</Note>

These specialized **memoization** and **singleton** commands represent a big step in Streamlit's evolution, with the potential to _entirely replace_ `@st.cache` at some point in 2022.

Yes, today you may use `@st.cache` for storing data you pulled in from a database connection (for a Tensorflow session, for caching the results of a long computation like changing the datetime values on a pandas dataframe, etc.). But these are very different things, so we made two new functions that will make it much faster! 💨

Please help us out by testing these commands in real apps and leaving comments in [the Streamlit forums](https://discuss.streamlit.io/).
