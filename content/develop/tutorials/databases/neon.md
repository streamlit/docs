---
title: Connect Streamlit to Neon
slug: /develop/tutorials/databases/neon
---

# Connect Streamlit to Neon

## Introduction

This guide explains how to securely access a [Neon database](https://neon.tech/) from Streamlit Community Cloud. Neon is a fully managed serverless PostgreSQL database, that separates storage and compute to offer features such as instant branching and automatic scaling.

The below example code uses [st.connection](/develop/api-reference/connections/st.connection) and Streamlit's [Secrets management](/develop/concepts/connections/secrets-management). It will **only work on Streamlit version >= 1.28**, when `st.connection` was added.

## Create a Neon project

<Note>
    If you already have a Neon project that you want to use, feel free to skip to the next step of adding the neon connection string to your local app secrets. 
</Note>

1. Log in to the Neon console and navigate to the [Projects](https://console.neon.tech/app/projects) section.
2. Select an existing project or click the **New Project** button to create a new one.
3. Choose the desired region and Postgres version for your project, then click **Create Project**.

The project is created with a ready-to-use `neondb` database, which we will connect to from Streamlit. To create some sample data, click on **SQL Editor** from the sidebar in the project page, and run the following SQL queries to create a table with some example values:

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100)
);

INSERT INTO employees (name, department)
VALUES
    ('Alice', 'Engineering'),
    ('Bob', 'Sales'),
    ('Carol', 'Marketing'),
    ('David', 'Engineering');
```

## Add Neon connection string to your local app secrets

Navigate to the **Connection Details** section from your `Neon` project page to find your database connection string. It should look similar to this:

```bash
postgres://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/dbname?sslmode=require
```

Your local Streamlit app will read secrets from a file `.streamlit/secrets.toml` in your app's root directory. Create this file if it doesn't exist yet and add your `Neon` connection string as shown below:

```toml
# .streamlit/secrets.toml

[connections.neon]
url="NEON_DB_CONNECTION_STRING"
```

Make sure you quote the `Neon` connection string so the `TOML` parser doesn't run into decoding issues.

<Important>
    Add this file to `.gitignore` and don't commit it to your GitHub repo!
</Important>

## Copy your app secrets to the cloud

As the `secrets.toml` file above is not committed to GitHub, you need to pass its content to your deployed app (on Streamlit Community Cloud) separately.

Go to your [Streamlit workspace](https://share.streamlit.io/) and after navigating to the app's settings, click on the **Secrets** tab. Copy the content of `secrets.toml` into the text area. More information is available at [Secrets management](/deploy/streamlit-community-cloud/deploy-your-app/secrets-management).

![Secrets manager screenshot](/images/databases/edit-secrets.png)

## Add dependencies to your requirements file

Add the [psycopg2-binary](https://www.psycopg.org/) and [SQLAlchemy](https://github.com/sqlalchemy/sqlalchemy) packages to your `requirements.txt` file, preferably with the latest versions. This is necessary for connecting to the Neon database:

```bash
# requirements.txt

psycopg2-binary>=2.9.6
sqlalchemy>=2.0.0
```

## Write your Streamlit app

Copy the code below to your Streamlit app and run it.

```python
# streamlit_app.py

import streamlit as st

# Initialize connection.
conn = st.connection("neon", type="sql")

# Perform query.
df = conn.query('SELECT * FROM employees;', ttl="10m")

# Print results.
for row in df.itertuples():
    st.write(f"{row.name} works in the {row.department} department.")
```

The `st.connection` object above handles secrets retrieval, setup, query caching and retries.

By default, `query()` results are cached without expiring. Setting the `ttl` parameter to `"10m"` ensures the query result is cached for no longer than 10 minutes. You can also set `ttl=0` to disable caching. Learn more in [Caching](/develop/concepts/architecture/caching).

If everything worked out (and you used the example table we created above), your app should display the following text:

```text
Alice works in the Engineering department.
Bob works in the Sales department.
Carol works in the Marketing department.
David works in the Engineering department.
```
