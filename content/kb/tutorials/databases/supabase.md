---
title: Connect Streamlit to Supabase
slug: /knowledge-base/tutorials/databases/supabase
---

# Connect Streamlit to Supabase

## Introduction

This guide explains how to securely access a Supabase instance from Streamlit Cloud. We demonstrate two methods, the first using [psycopg2](https://www.psycopg.org/) library and the second using [supabase-py](https://github.com/supabase-community/supabase-py). Both examples make use of Streamlit's [secrets management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).


## Create a Supabase Instance

<Note>

If you already have a database that you want to use, feel free
to [skip to the next step](#add-username-and-password-to-your-local-app-secrets).

</Note>

First, head over to Supabase to [create an instance](https://app.supabase.io/) and create a database(take note of your password).


## Using Streamlit with Postgres(via Supabase-py)

### Add Supabase to your requirements file

```bash
# requirements.txt
supabase==x.x.x
```

## Using Streamlit with Postgres(via supabase-py)

From here, there are two steps of connecting to Postgres. We will go over how to connect via supabase-py(through postgrest) and then how to connecti via psycopg2.

### Finding your connection string

You will need your connection string, head over to the [settings page on Supabase]()


### Add connection string to your local app secrets

Your local Streamlit app will read secrets from a file `.streamlit/secrets.toml` in your app's root directory. Create this file if it doesn't exist yet and add the connection string above:

```toml
# .streamlit/secrets.toml

[postgres]
supabase_url ="<your_connection_string>"
supabase_key ="<your_supabase_key>"

```

<Important>

Add this file to `.gitignore` and don't commit it to your Github repo!

</Important>

## Copy your app secrets to the cloud

As the `secrets.toml` file above is not committed to Github, you need to pass its content to your deployed app (on Streamlit Cloud) separately. Go to the [app dashboard](https://share.streamlit.io/) and in the app's dropdown menu, click on **Edit Secrets**. Copy the content of `secrets.toml` into the text area. More information is available at [Secrets Management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

![Secrets manager screenshot](/images/databases/edit-secrets.png)

### Add psycopg2 and supabase to your requirements file

Add the [psycopg2](https://www.psycopg.org/) package to your `requirements.txt` file, preferably pinning its version (replace `x.x.x` with the version you want installed):

```bash
# requirements.txt
psycopg2-binary==x.x.x
supabase==x.x.x
```

### Write your Streamlit app

Copy the code below to your Streamlit app and run it. Make sure to adapt `query` to use the name of your table.

```python
# streamlit_app.py

import streamlit as st
import psycopg2
from urllib.parse import urlparse

# Initialize connection.
# Uses st.experimental_singleton to only run once.
@st.experimental_singleton
def init_connection():
    result = urlparse(st.secrets["postgres"]["connstr"])
    username = result.username
    password = result.password
    database = result.path[1:]
    hostname = result.hostname
    return psycopg2.connect(
        database = database,
        user = username,
        password = password,
        host = hostname,
        port = port
    )


conn = init_connection()

# Perform query.
# Uses st.experimental_memo to only rerun when the query changes or after 10 min.
@st.experimental_memo(ttl=600)
def run_query(query):
    with conn.cursor() as cur:
        cur.execute(query)
        return cur.fetchall()

rows = run_query("SELECT * from mytable;")

# Print results.
for row in rows:
    st.write(f"{row[0]} has a :{row[1]}:")
```


See `st.experimental_memo` above? Without it, Streamlit would run the query every time the app reruns (e.g. on a widget interaction). With `st.experimental_memo`, it only runs when the query changes or after 10 minutes (that's what `ttl` is for). Watch out: If your database updates more frequently, you should adapt `ttl` or remove caching so viewers always see the latest data. Read more about caching [here](/library/advanced-features/experimental-cache-primitives).

If everything worked out (and you used the example table we created above), your app should look like this:

![Finished app screenshot](/images/databases/streamlit-app.png)
