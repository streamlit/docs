---
title: Connect Streamlit to ClickHouse
slug: /develop/tutorials/databases/clickhouse
description: Connect a Streamlit app to ClickHouse using st.connection, app secrets, and ClickHouse Connect.
---

# Connect Streamlit to ClickHouse

## Introduction

This guide connects a Streamlit app to [ClickHouse](https://clickhouse.com/) using [`st.connection`](/develop/api-reference/connections/st.connection), [Secrets management](/develop/concepts/connections/secrets-management), and the [ClickHouse Connect SQLAlchemy dialect](https://clickhouse.com/docs/integrations/language-clients/python/sqlalchemy). You will create a small table of people and their pets, then display the results in your app.

### Prerequisites

- A [ClickHouse Cloud account](https://console.clickhouse.cloud/).
- A Python environment with Streamlit installed.

Create a `requirements.txt` file in your app's directory:

```txt
streamlit>=1.28
clickhouse-connect[sqlalchemy]
sqlalchemy>=2.0.0
```

Install the dependencies:

```bash
python -m pip install -r requirements.txt
```

## Create a ClickHouse service and add sample data

If you already have a ClickHouse Cloud service, use it for the following steps.

1. Sign in to the [ClickHouse Cloud console](https://console.clickhouse.cloud/) and [create a ClickHouse service](https://clickhouse.com/docs/get-started/setup/cloud).
1. Open your service's **SQL Console** and select the `default` database.
1. Run these statements to create a table and add three rows:

   ```sql
   CREATE TABLE mytable (
       id UInt8,
       name String,
       pet LowCardinality(String)
   )
   ENGINE = MergeTree
   ORDER BY id;

   INSERT INTO mytable (id, name, pet)
   VALUES (1, 'Mary', 'dog'), (2, 'John', 'cat'), (3, 'Robert', 'bird');
   ```

## Add connection details to your local app secrets

1. Open **Connect** for your ClickHouse service. Copy the hostname, HTTPS port, username, and password.
1. In your app's directory, create `.streamlit/secrets.toml`:

   ```toml
   # .streamlit/secrets.toml

   [connections.clickhouse]
   dialect = "clickhousedb"
   host = "YOUR_HOST.clickhouse.cloud"
   port = 8443
   database = "default"
   username = "default"
   password = "YOUR_PASSWORD"

   [connections.clickhouse.create_engine_kwargs.connect_args]
   secure = true
   ```

1. Replace the example host and credentials with your service's connection details. Enter just the hostname in `host`, without `https://` or a port. ClickHouse Connect uses HTTPS when `secure = true` and verifies the server certificate by default.
1. Add your app's public outbound IP address to your service's [IP access list](https://clickhouse.com/docs/products/cloud/guides/security/connectivity/setting-ip-filters).

<Important>

Add `.streamlit/secrets.toml` to `.gitignore` so your database credentials stay out of your GitHub repository.

</Important>

## Write your Streamlit app

Save this code as `streamlit_app.py`:

```python
# streamlit_app.py

import streamlit as st

# Initialize connection.
conn = st.connection("clickhouse", type="sql")

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
- Allow connections from [Community Cloud's outbound IP addresses](/deploy/streamlit-community-cloud/status#ip-addresses) in your ClickHouse service's IP access list.
