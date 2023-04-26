---
title: Connect Streamlit to Snowflake
slug: /knowledge-base/tutorials/databases/snowflake
---

# Connect Streamlit to Snowflake

## Introduction

This guide explains how to securely access a Snowflake database from Streamlit. It uses [st.experimental_connection](/library/api-reference/connections/st.experimental_connection), the [snowpark-python](https://docs.snowflake.com/en/developer-guide/snowpark/python/index) library and Streamlit's [secrets management](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

Skip to the bottom for information about [connecting using Snowflake Connector for Python](#using-the-snowflake-connector-for-python).

## Create a Snowflake database

<Note>

If you already have a database that you want to use, feel free to [skip to the next step](#add-username-and-password-to-your-local-app-secrets).

</Note>

First, [sign up for Snowflake](https://signup.snowflake.com/) and log into the [Snowflake web interface](https://docs.snowflake.com/en/user-guide/connecting.html#logging-in-using-the-web-interface) (note down your username, password, and [account identifier](https://docs.snowflake.com/en/user-guide/admin-account-identifier.html)!):

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

Before you execute the queries, first determine which Snowflake UI / web interface you're using. The examples below use [SnowSight](https://docs.snowflake.com/en/user-guide/ui-snowsight). You can also use [Classic Console Worksheets](https://docs.snowflake.com/en/user-guide/ui-worksheet) or any other means of running Snowflake SQL statements.

### Execute queries in a Worksheet

To execute the queries in a Worksheet, highlight or select all the queries with your mouse, and click the play button in the top right corner.

<Image alt="AWS screenshot 1" src="/images/databases/snowflake-4.png" />

<Important>

Be sure to highlight or select **all** the queries (lines 1-10) before clicking the play button.

</Important>

Once you have executed the queries, you should see a preview of the table in the **Results** panel at the bottom of the page. Additionally, you should see your newly created database and schema by expanding the accordion on the left side of the page. Lastly, the warehouse name is displayed on the button to the left of the **Share** button.

<Image alt="AWS screenshot 2" src="/images/databases/snowflake-5.png" />

Make sure to note down the name of your warehouse, database, and schema. ☝️

## Add connection parameters to your local app secrets

Your local Streamlit app will read secrets from a file `.streamlit/secrets.toml` in your app’s root directory. Create this file if it doesn’t exist yet and add your Snowflake username, password, [account identifier](https://docs.snowflake.com/en/user-guide/admin-account-identifier.html), and the name of your warehouse, database, and schema as shown below:

```toml
# .streamlit/secrets.toml

[connections.snowpark]
account = "xxx"
user = "xxx"
password = "xxx"
role = "xxx"
warehouse = "xxx"
database = "xxx"
schema = "xxx"
client_session_keep_alive = true
```

If you created the database from the previous step, the names of your database and schema are `PETS` and `PUBLIC`, respectively. Streamlit will also use Snowflake config and credentials from a [snowsql config file](https://docs.snowflake.com/en/user-guide/snowsql-config#snowsql-config-file) if available.

<Important>

Add this file to `.gitignore` and don't commit it to your GitHub repo!

</Important>

## Install snowflake-snowpark-python

You can find the instructions and prerequisites for installing snowflake-snowpark-python in the [Snowpark Developer Guide](https://docs.snowflake.com/en/developer-guide/snowpark/python/setup). Currently, only python 3.8 is supported.

```sh
pip install snowflake-snowpark-python
```

## Write your Streamlit app

Copy the code below to your Streamlit app and run it. Make sure to adapt query to use the name of your table.

```python
# streamlit_app.py

import streamlit as st

# Initialize connection.
conn = st.experimental_connection('snowpark')

# Perform query.
df = conn.query('SELECT * from mytable;', ttl=600)

# Print results.
for row in df.itertuples():
    st.write(f"{row.NAME} has a :{row.PET}:")
```

See `st.experimental_connection` above? This handles secrets retrieval, setup, query caching and retries. In this case, we set `ttl=600` to ensure the query result is cached for no longer than 10 minutes. Watch out: If your database updates more frequently, you should adapt `ttl` or remove caching so viewers always see the latest data. Learn more in [Connecting to data](/library/advanced-features/connecting-to-data) and [Caching](/library/advanced-features/caching).

If everything worked out (and you used the example table we created above), your app should look like this:

![Finished app screenshot](/images/databases/snowflake-app.png)

### Using Snowpark Session

The SnowparkConnection also provides access to the [Snowpark Session](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/session.html) for DataFrame-style operations that run natively inside Snowflake. Using this approach, you can rewrite the app above as follows:

```python
# streamlit_app.py

import streamlit as st

# Initialize connection.
session = st.experimental_connection('snowpark').session

# Load the table as a dataframe
@st.cache_data
def load_table():
    return session.table('mytable').to_pandas()

df = load_table()

# Print results.
for row in df.itertuples():
    st.write(f"{row.NAME} has a :{row.PET}:")
```

## Connecting to Snowflake from Community Cloud

This tutorial assumes a local Streamlit app, however you can also connect to Snowflake from apps hosted in Community Cloud. The main additional steps are:

- [Include information about dependencies](/streamlit-community-cloud/get-started/deploy-an-app/app-dependencies) using a `requirements.txt` file with `snowflake-snowpark-python` and any other dependencies.
- [Add your secrets](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management#deploy-an-app-and-set-up-secrets) to your Community Cloud app.
- For apps using snowpark-python, you should also ensure the app is [running on python 3.8](/streamlit-community-cloud/get-started/deploy-an-app#advanced-settings-for-deployment).

## Using the Snowflake Connector for Python

In some cases, you may prefer to use the [Snowflake Connector for Python](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector) instead of Snowpark Python. Streamlit supports this natively through the [SQLConnection](/library/api-reference/connections/st.connections.sqlconnection) and the [snowflake-sqlalchemy](https://docs.snowflake.com/en/developer-guide/python-connector/sqlalchemy) library.

```bash
pip install snowflake-sqlalchemy
```

Installing `snowflake-sqlalchemy` will also install all necessary dependencies.

Configuring credentials follows the `SQLConnection` format which is slightly different. See the [Snowflake SQLAlchemy Configuration Parameters documentation](https://docs.snowflake.com/en/developer-guide/python-connector/sqlalchemy#connection-parameters) for more details.

```toml
# .streamlit/secrets.toml

[connections.snowflake]
url = "snowflake://<user_login_name>:<password>@<account_identifier>/<database_name>/<schema_name>?warehouse=<warehouse_name>&role=<role_name>"
```

Alternatively, specify connection parameters like `authenticator` or key pair authentication using `create_engine_kwargs`, as shown below.

```toml
# .streamlit/secrets.toml

[connections.snowflake]
url = "snowflake://<user_login_name>@<account_identifier>/"

[connections.snowflake.create_engine_kwargs.connect_args]
authenticator = "externalbrowser"
warehouse = "xxx"
role = "xxx"
client_session_keep_alive = true
```

Initializing and using the connection in your app is similar. Note that [SQLConnection.query()](/library/api-reference/connections/st.connections.sqlconnection#sqlconnectionquery) supports extra arguments like `params` and `chunksize` which may be useful for more advanced apps.

```python
# streamlit_app.py

import streamlit as st

# Initialize connection.
conn = st.experimental_connection('snowflake', type='sql')

# Perform query.
df = conn.query('SELECT * from mytable;', ttl=600)

# Print results.
for row in df.itertuples():
    st.write(f"{row.name} has a :{row.pet}:")
```
