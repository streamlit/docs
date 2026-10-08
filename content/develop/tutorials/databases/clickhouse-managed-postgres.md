---
title: Connect Streamlit to ClickHouse Managed Postgres
slug: /develop/tutorials/databases/clickhouse-managed-postgres
description: Connect a Streamlit app to ClickHouse Managed Postgres using st.connection, app secrets, and verified TLS.
---

# Connect Streamlit to ClickHouse Managed Postgres

## Introduction

This guide connects a Streamlit app to [ClickHouse Managed Postgres](https://clickhouse.com/cloud/postgres) using [`st.connection`](/develop/api-reference/connections/st.connection), [Secrets management](/develop/concepts/connections/secrets-management), and the PostgreSQL driver. You will create a small table of people and their pets, then display the results in your app.

### Prerequisites

- A [ClickHouse Cloud account](https://console.clickhouse.cloud/).
- A Python environment with Streamlit installed.

Create a `requirements.txt` file in your app's directory:

```txt
streamlit>=1.28
psycopg2-binary>=2.9.6
sqlalchemy>=2.0.0
```

Install the dependencies:

```bash
python -m pip install -r requirements.txt
```

## Create a Postgres instance and add sample data

If you already have a ClickHouse Managed Postgres instance, use it for the following steps.

1. Sign in to the [ClickHouse Cloud console](https://console.clickhouse.cloud/) and [create a Postgres instance](https://clickhouse.com/docs/products/managed-postgres/quickstart).
1. Open your instance's **SQL Console** and select the `postgres` database.
1. Run these statements to create a table and add three rows:

   ```sql
   CREATE TABLE mytable (
       id INTEGER PRIMARY KEY,
       name TEXT NOT NULL,
       pet TEXT NOT NULL
   );

   INSERT INTO mytable (id, name, pet)
   VALUES (1, 'Mary', 'dog'), (2, 'John', 'cat'), (3, 'Robert', 'bird');
   ```

## Add connection details to your local app secrets

1. Open your Postgres instance's **Connect** menu and select **Directly**. Copy the hostname, port, username, and password.
1. Download the instance's CA certificate bundle from **Settings** and save it as `ca-certificate.pem` in your app's directory.
1. In the same directory, create `.streamlit/secrets.toml`:

   ```toml
   # .streamlit/secrets.toml

   [connections.clickhouse_managed_postgres]
   dialect = "postgresql"
   driver = "psycopg2"
   host = "YOUR_HOST.pg.clickhouse.cloud"
   port = 5432
   database = "postgres"
   username = "postgres"
   password = "YOUR_PASSWORD"

   [connections.clickhouse_managed_postgres.create_engine_kwargs.connect_args]
   sslmode = "verify-full"
   sslrootcert = "ca-certificate.pem"
   ```

1. Replace the example host and credentials with your instance's direct connection details. Enter just the hostname in `host`, without a URL scheme or port.

`sslmode = "verify-full"` checks the server certificate and hostname. The CA certificate is specific to your Postgres instance. See [Connecting to ClickHouse Managed Postgres](https://clickhouse.com/docs/products/managed-postgres/connection) for more details.

<Important>

Add `.streamlit/secrets.toml` to `.gitignore` so your database credentials stay out of your GitHub repository.

</Important>

## Write your Streamlit app

Save this code as `streamlit_app.py`:

```python
# streamlit_app.py

import streamlit as st

# Initialize connection.
conn = st.connection("clickhouse_managed_postgres", type="sql")

# Perform query.
df = conn.query("SELECT name, pet FROM mytable ORDER BY id;", ttl="10m")

# Print results.
for row in df.itertuples():
    st.write(f"{row.name} has a :{row.pet}:")
```

`st.connection` reads the connection details from your secrets file. The query result is cached for ten minutes. Set `ttl=0` to fetch fresh results on every run, or see [Caching](/develop/concepts/architecture/caching) for more options.

Run your app:

```bash
streamlit run streamlit_app.py
```

With the sample data above, your app should look like this:

![Finished app screenshot](/images/databases/streamlit-app.png)

## Connect from Streamlit Community Cloud

To deploy the same app on Community Cloud:

- Include `streamlit_app.py` and `requirements.txt` in your GitHub repository.
- [Add your secrets](/deploy/streamlit-community-cloud/deploy-your-app/secrets-management) to your Community Cloud app by copying the contents of `.streamlit/secrets.toml` into its secrets settings.
- Include `ca-certificate.pem` in the root of your app's repository so the `sslrootcert` path works on Community Cloud. The CA certificate contains no private key or database password and can be committed; keep your credentials in app secrets.
