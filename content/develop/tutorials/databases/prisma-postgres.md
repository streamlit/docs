---
title: Connect Streamlit to Prisma Postgres
slug: /develop/tutorials/databases/prisma-postgres
description: Connect a Streamlit app to a Prisma Postgres database using st.connection, app secrets, and the pooled connection string.
keywords: Prisma Postgres, Prisma, PostgreSQL, managed database, st.connection, psycopg2, connection pooling, secrets management, database connection, database tutorial
---

# Connect Streamlit to Prisma Postgres

## Introduction

This guide explains how to securely access a [Prisma Postgres](https://www.prisma.io/postgres) database from Streamlit. Prisma Postgres is a managed PostgreSQL database. The guide uses [`st.connection`](/develop/api-reference/connections/st.connection), Streamlit's [Secrets management](/develop/concepts/connections/secrets-management), and the PostgreSQL driver. You will create a small table of people and their pets, then display the results in your app.

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

- You need either [Node.js](https://nodejs.org/) 20.12 or later to create a temporary database from your terminal, or a [Prisma Console](https://console.prisma.io) account to create a permanent one.
- You should have a basic understanding of [`st.connection`](/develop/api-reference/connections/st.connection) and [Secrets management](/develop/concepts/connections/secrets-management).

## Create a Prisma Postgres database

If you already have a Prisma Postgres database that you want to use, you can [skip to the next step](#add-the-connection-string-to-your-local-app-secrets).

1. Create a database in one of two ways:
   - To get a temporary database without an account, run the following command in your terminal:

     ```bash
     npx create-db@latest
     ```

     The command prints a connection string and a claim link. The database is deleted after 24 hours unless you claim it with that link. You can set a shorter lifetime with the `--ttl` flag.

   - To create a permanent database, sign in to the [Prisma Console](https://console.prisma.io), create a project with a Prisma Postgres database, and generate a connection string as described in [Connecting to your database](https://www.prisma.io/docs/postgres/database/connecting-to-your-database).

1. Copy your connection string. It should look similar to this:

   ```bash
   postgres://xxxxxxxx:xxxxxxxxxxxx@db.prisma.io:5432/postgres?sslmode=require
   ```

1. Connect to your database with [`psql`](https://www.postgresql.org/docs/current/app-psql.html) or another SQL client, using the connection string from the previous step.

   ```bash
   psql "postgres://xxxxxxxx:xxxxxxxxxxxx@db.prisma.io:5432/postgres?sslmode=require"
   ```

1. Run the following statements to create a table with some example values:

   ```sql
   CREATE TABLE mytable (
       id SERIAL PRIMARY KEY,
       name VARCHAR(80),
       pet VARCHAR(80)
   );

   INSERT INTO mytable (name, pet)
   VALUES ('Mary', 'dog'), ('John', 'cat'), ('Robert', 'bird');
   ```

## Add the connection string to your local app secrets

1. If you do not already have a `.streamlit/secrets.toml` file in your app's root directory, create an empty secrets file.
1. Add your connection string to your app's `.streamlit/secrets.toml` file with two changes: replace the `postgres://` scheme with `postgresql+psycopg2://`, and replace the `db.prisma.io` host with `pooled.db.prisma.io`.

   ```toml
   # .streamlit/secrets.toml

   [connections.prisma_postgres]
   url = "postgresql+psycopg2://xxxxxxxx:xxxxxxxxxxxx@pooled.db.prisma.io:5432/postgres?sslmode=require"
   ```

   `st.connection` passes this URL to SQLAlchemy, which doesn't accept the `postgres://` scheme. Naming the driver in the scheme tells SQLAlchemy to use `psycopg2` from your requirements.

   Every Prisma Postgres database has a direct host (`db.prisma.io`) and a pooled host (`pooled.db.prisma.io`) that share the same credentials. The pooled host routes your app's queries through a connection pooler, so use it for your Streamlit app. Use the direct host for administrative tools like `psql`. Keep `sslmode=require` in the URL because Prisma Postgres only accepts encrypted connections.

   <Important>
       Add this file to `.gitignore` and don't commit it to your GitHub repo!
   </Important>

## Write your Streamlit app

1. Copy the code below to your Streamlit app and save it.

   ```python
   # streamlit_app.py

   import streamlit as st

   # Initialize connection.
   conn = st.connection("prisma_postgres", type="sql")

   # Perform query.
   df = conn.query("SELECT * FROM mytable ORDER BY id;", ttl="10m")

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

## Connecting to a Prisma Postgres database from Community Cloud

This tutorial assumes a local Streamlit app, but you can also connect to a Prisma Postgres database from apps hosted on Community Cloud. The additional steps are:

- If you created a temporary database with `npx create-db`, claim it so it isn't deleted while your app is deployed.
- Add a [`requirements.txt`](/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies) file to your repo. Include all the packages listed in [Prerequisites](#prerequisites) and any other dependencies.
- [Add your secrets](/deploy/streamlit-community-cloud/deploy-your-app/secrets-management#how-to-use-secrets-management) to your app in Community Cloud.
