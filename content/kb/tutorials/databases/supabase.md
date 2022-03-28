---
title: Connect Streamlit to Supabase
slug: /knowledge-base/tutorials/databases/supabase
---

# Connect Streamlit to Supabase

## Introduction

This guide explains how to securely access a Supabase instance from Streamlit Cloud using the [Supabase Python Client Library](https://github.com/supabase-community/supabase-py). The example makes use of Streamlit's [secrets management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).


## Create a Supabase Instance

First, head over to Supabase to [create an instance](https://supabase.com/) and create a database.


## Using Streamlit with Supabase

### Add Supabase to your requirements file

```bash
# requirements.txt
supabase==x.x.x
```

### Add Supabase URL and Key to your local app secrets

Your local Streamlit app will read secrets from a file `.streamlit/secrets.toml` in your app's root directory. Create this file if it doesn't exist yet and add the `supabase_url` and `supabase_key` here:

```toml
# .streamlit/secrets.toml

[supabase]
supabase_url ="<your_connection_string>"
supabase_key ="<your_supabase_key>"

```

You can find your url and key under Settings > API on the Supabase Dashboard

<Important>

Add this file to `.gitignore` and don't commit it to your Github repo!

</Important>

## Copy your app secrets to the cloud

As the `secrets.toml` file above is not committed to Github, you need to pass its content to your deployed app (on Streamlit Cloud) separately. Go to the [app dashboard](https://share.streamlit.io/) and in the app's dropdown menu, click on **Edit Secrets**. Copy the content of `secrets.toml` into the text area. More information is available at [Secrets Management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

![Secrets manager screenshot](/images/databases/edit-secrets.png)


### Write your Streamlit app

Copy the code below to your Streamlit app and run it. Make sure to adapt `query` to use the name of your table.

```python
# streamlit_app.py

import streamlit as st
from supabase import create_client, Client

# Initialize connection.
# Uses st.experimental_singleton to only run once.
@st.experimental_singleton
def init_connection():
    url    = st.secrets["supabase"]["supabase_url"]
    key    = st.secrets["supabase"]["supabase_key"]
    return create_client(url, key)

supabase = init_connection()

# Perform query.
# Uses st.experimental_memo to only rerun when the query changes or after 10 min.
@st.experimental_memo(ttl=600)
def run_query():
    return supabase.table("countries").select("*").execute()

rows = run_query()

# Print results.
for row in rows.data:
    st.write(f"Name of country is {row.name} and it is on:{row.continent}:")
```


See `st.experimental_memo` above? Without it, Streamlit would run the query every time the app reruns (e.g. on a widget interaction). With `st.experimental_memo`, it only runs when the query changes or after 10 minutes (that's what `ttl` is for). Watch out: If your database updates more frequently, you should adapt `ttl` or remove caching so viewers always see the latest data. Read more about caching [here](/library/advanced-features/experimental-cache-primitives).

If everything worked out (and you used the example table we created above), your app should look like this:
![Finished app screenshot](/images/databases/streamlit-app.png)


## Additional Notes

<Note>
As Supabase uses Postgres under the hood, you can also connect to Supabase by using the connection string we provide under Settings > Databases. From there, you can refer to the Postgres tutorial to connect to your database.
</Note>
