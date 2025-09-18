---
title: Connect Streamlit to Neon
slug: /develop/tutorials/databases/neon
description: Learn how to connect Streamlit apps to Neon serverless PostgreSQL databases with instant branching, automatic scaling, and managed hosting.
keywords: Neon, serverless PostgreSQL, managed database, instant branching, automatic scaling, PostgreSQL hosting, database connection, serverless database
---

# Connect Streamlit to Neon

## Introduction

This guide explains how to securely access a [Neon database](https://neon.tech/) from Streamlit. Neon is a fully managed serverless PostgreSQL database that separates storage and compute to offer features such as instant branching and automatic scaling.

### Prerequisites

- The following packages must be installed in your Python environment:

  ```txt
  streamlit>=1.28
  psycopg2-binary>=2.9.6
  sqlalchemy>=2.0.0
  ```

    <Note>
        You may use `psycopg2` instead of `psycopg2-binary`. However, building Psycopg requires a few prerequisites (like a C compiler). To use `psycopg2` on Community Cloud, you must include `libpq-dev` in a [`packages.txt`](/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies#apt-get-dependencies) file in the root of your repository. `psycopg2-binary` is a stand-alone package that is practical for testing and development.
    </Note>

- You must have a Neon account.
- You should have a basic understanding of [`st.connection`](/develop/api-reference/connections/st.connection) and [Secrets management](/develop/concepts/connections/secrets-management).

## Create a Neon project

If you already have a Neon project that you want to use, you can [skip to the next step](#add-neon-connection-string-to-your-local-app-secrets).

1. Log in to the Neon console and navigate to the [Projects](https://console.neon.tech/app/projects) section.
1. If you see a prompt to enter your project name, skip to the next step. Otherwise, click the "**New Project**" button to create a new project.
1. Enter "Streamlit-Neon" for your project name, accept the othe default settings, and click "**Create Project**."

   After Neon creates your project with a ready-to-use `neondb` database, you will be redirected to your project's Quickstart.

1. Click on "**SQL Editor**" from the left sidebar.
1. Replace the text in the input area with the following code and click "**Run**" to add sample data to your project.

   ```sql
   CREATE TABLE home (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       pet VARCHAR(100)
   );

   INSERT INTO home (name, pet)
   VALUES
       ('Mary', 'dog'),
       ('John', 'cat'),
       ('Robert', 'bird');
   ```

## Add the Neon connection string to your local app secrets

1. Within your Neon project, click "**Dashboard**" in the left sidebar.
1. Within the "Connection Details" tile, locate your database connection string. It should look similar to this:

   ```bash
   postgresql://neondb_owner:xxxxxxxxxxxx@ep-adjective-noun-xxxxxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

1. If you do not already have a `.streamlit/secrets.toml` file in your app's root directory, create an empty secrets file.
1. Copy your connection string and add it to your app's `.streamlit/secrets.toml` file as follows:

   ```toml
   # .streamlit/secrets.toml

   [connections.neon]
   url="postgresql://neondb_owner:xxxxxxxxxxxx@ep-adjective-noun-xxxxxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ```

   <Important>
       Add this file to `.gitignore` and don't commit it to your GitHub repo!
   </Important>

## Write your Streamlit app

1. Copy the code below to your Streamlit app and save it.

   ```python
   # streamlit_app.py

   import streamlit as st

   # Initialize connection.
   conn = st.connection("neon", type="sql")

   # Perform query.
   df = conn.query('SELECT * FROM home;', ttl="10m")

   # Print results.
   for row in df.itertuples():
       st.write(f"{row.name} has a :{row.pet}:")
   ```

   The `st.connection` object above handles secrets retrieval, setup, query caching and retries.

   By default, `query()` results are cached without expiring. Setting the `ttl` parameter to `"10m"` ensures the query result is cached for no longer than 10 minutes. You can also set `ttl=0` to disable caching. Learn more in [Caching](/develop/concepts/architecture/caching).

1. Run your Streamlit app.

   ```bash
   streamlit run streamlit_app.py
   ```

   If everything worked out (and you used the example table we created above), your app should look like this:

   ![Finished app screenshot](/images/databases/streamlit-app.png)

## Connecting to a Neon database from Community Cloud

This tutorial assumes a local Streamlit app, but you can also connect to a Neon database from apps hosted on Community Cloud. The additional steps are:

- Add a [`requirements.txt`](/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies) file to your repo. Include all the packages listed in [Prequisites](#prerequisites) and any other dependencies.
- [Add your secrets](/deploy/streamlit-community-cloud/deploy-your-app/secrets-management#deploy-an-app-and-set-up-secrets) to your app in Community Cloud.
