---
title: Connect Streamlit to Snowflake
slug: /knowledge-base/tutorials/databases/snowflake
---

# Connect Streamlit to Snowflake

## Introduction

This guide explains how to securely access a Snowflake database from Streamlit Cloud. It uses the [snowflake-connector-python](https://docs.snowflake.com/en/user-guide/python-connector.html) library and Streamlit's [secrets management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

## Create a Snowflake database

<Note>

If you already have a database that you want to use, feel free to [skip to the next step](#add-username-and-password-to-your-local-app-secrets).

</Note>

First, [sign up for Snowflake](https://signup.snowflake.com/) and log into the [Snowflake web interface](https://docs.snowflake.com/en/user-guide/connecting.html#logging-in-using-the-web-interface) (note down your username, password, and account identifier!):

![](/images/databases/snowflake-1.png)

Enter the following queries into the SQL editor in the Worksheets page to create a database and a table with some example values:

```sql
CREATE DATABASE PETS;

CREATE TABLE MYTABLE (
    NAME            varchar(80),
    PET             varchar(80)
);

INSERT INTO MYTABLE VALUES ('Mary', 'dog'), ('John', 'cat'), ('Robert', 'bird');

SELECT * FROM MYTABLE;
```

Before you execute the queries, first determine which Snowflake UI / web interface you're using. You can either use the [classic web interface](https://docs.snowflake.com/en/user-guide/ui-using.html) or the [new web interface](https://docs.snowflake.com/en/user-guide/ui-gs.html).

### Using the Classic Web Interface

To execute the queries in the classic web interface, select **All Queries** and click on **Run**.

<Image alt="AWS screenshot 1" src="/images/databases/snowflake-2.png" />

Make sure to note down the name of your warehouse, database, and schema from the **Context** dropdown menu on the same page:

<Image alt="AWS screenshot 2" src="/images/databases/snowflake-3.png" />

### Using the New Web Interface

To execute the queries in the new web interface, highlight or select all the queries with your mouse, and click the play button in the top right corner.

<Image alt="AWS screenshot 1" src="/images/databases/snowflake-4.png" />

<Important>

Be sure to highlight or select **all** the queries (lines 1-10) before clicking the play button.

</Important>

Once you have executed the queries, you should see a preview of the table in the **Results** panel at the bottom of the page. Addionally, you should see your newly created database and schema by expanding the accordion on the left side of the page. Lastly, the warehouse name is displayed on the button to the left of the **Share** button.

<Image alt="AWS screenshot 2" src="/images/databases/snowflake-5.png" />

Make sure to note down the name of your warehouse, database, and schema. ☝️

## Add username and password to your local app secrets

Your local Streamlit app will read secrets from a file `.streamlit/secrets.toml` in your app’s root directory. Create this file if it doesn’t exist yet and add your Snowflake username, password, account identifier, and the name of your warehouse, database, and schema as shown below:

```python
# .streamlit/secrets.toml

[snowflake]
user = "xxx"
password = "xxx"
account = "xxx"
warehouse = "xxx"
database = "xxx"
schema = "xxx"
```

If you created the database from the previous step, the names of your database and schema are `PETS` and `PUBLIC`, respectively.

<Important>

Add this file to `.gitignore` and don't commit it to your Github repo!

</Important>

## Copy your app secrets to the cloud

As the `secrets.toml` file above is not committed to Github, you need to pass its content to your deployed app (on Streamlit Cloud) separately. Go to the [app dashboard](https://share.streamlit.io/) and in the app's dropdown menu, click on **Edit Secrets**. Copy the content of `secrets.toml` into the text area. More information is available at [Secrets Management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

![Secrets manager screenshot](/images/databases/edit-secrets.png)

## Add snowflake-connector-python to your requirements file

Add the [snowflake-connector-python](https://docs.snowflake.com/en/user-guide/python-connector.html) package to your `requirements.txt` file, preferably pinning its version (replace `x.x.x` with the version you want installed):

```bash
# requirements.txt
snowflake-connector-python==x.x.x
```

## Write your Streamlit app

Copy the code below to your Streamlit app and run it. Make sure to adapt query to use the name of your table.

```python
# streamlit_app.py

import streamlit as st
import snowflake.connector

# Initialize connection.
# Uses st.experimental_singleton to only run once.
@st.experimental_singleton
def init_connection():
    return snowflake.connector.connect(**st.secrets["snowflake"])

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

![Finished app screenshot](/images/databases/snowflake-app.png)
