---
title: Connect Streamlit to TiDB
slug: /knowledge-base/tutorials/databases/tidb
---

# Connect Streamlit to TiDB

## Introduction

This guide explains how to securely access a remote [TiDB database](https://www.pingcap.com/tidb/) from Streamlit Community Cloud. It uses the [mysqlclient](https://github.com/PyMySQL/mysqlclient) library and Streamlit's [secrets management](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management). TiDB is an open-source, MySQL-compatible database that supports Hybrid Transactional and Analytical Processing (HTAP) workloads.

## Sign in to TiDB Cloud and create a cluster

First, head over to [TiDB Cloud](https://tidbcloud.com/free-trial) and sign up for a free account, using either Google, GitHub or E-mail:

![Sign in TiDB Cloud](/images/databases/tidb-1.png)

Once you've signed in, you can create a cluster:

<Flex>
<Image caption="Choose a cluster tier" src="/images/databases/tidb-2.png" />
<Image caption="Configure cluster specifications" src="/images/databases/tidb-3.png" />
</Flex>

Your screen should list the cluster you created. Click **Security Settings** to set the root password to access the cluster.

<Flex>
<Image caption="List clusters" src="/images/databases/tidb-4.png" />
<Image caption="Set password" src="/images/databases/tidb-5.png" />
</Flex>

<Important>

Make sure to note down the password. It won't be available on TiDB Cloud after this step.

</Important>

Then click **Connect** to easily get the connnection arguments to access the cluster.

![Get connection arguments](/images/databases/tidb-6.png)

## Create a TiDB database

<Note>

If you already have a database that you want to use, feel free
to [skip to the next step](#add-username-and-password-to-your-local-app-secrets).

</Note>

Once your TiDB cluster is up and running, connect to it with the `mysql` client and enter the following commands to create a database and a table with some example values:

```sql
CREATE DATABASE pets;

USE pets;

CREATE TABLE mytable (
    name            varchar(80),
    pet             varchar(80)
);

INSERT INTO mytable VALUES ('Mary', 'dog'), ('John', 'cat'), ('Robert', 'bird');
```

## Add username and password to your local app secrets

Your local Streamlit app will read secrets from a file `.streamlit/secrets.toml` in your app's root directory. Create this file if it doesn't exist yet and add the database name, user, and password of your TiDB cluster as shown below:

```toml
# .streamlit/secrets.toml

[tidb]
host = "<TiDB_cluster_endpoint>"
port = 4000
database = "pets"
user = "<TiDB_cluster_user>"
password = "<TiDB_cluster_password>"
ssl-ca = "<path_to_CA_store>"
```

<Important>

Add this file to `.gitignore` and don't commit it to your GitHub repo!

</Important>

## Copy your app secrets to the cloud

As the `secrets.toml` file above is not committed to GitHub, you need to pass its content to your deployed app (on Streamlit Community Cloud) separately. Go to the [app dashboard](https://share.streamlit.io/) and in the app's dropdown menu, click on **Edit Secrets**. Copy the content of `secrets.toml` into the text area. More information is available at [Secrets Management](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management).

![Secrets manager screenshot](/images/databases/edit-secrets.png)

## Add mysqlclient to your requirements file

Add the [mysqlclient](https://github.com/PyMySQL/mysqlclient) package to your `requirements.txt` file, preferably pinning its version (replace `x.x.x` with the version you want installed):

```bash
# requirements.txt
mysqlclient==x.x.x
```

## Write your Streamlit app

Copy the code below to your Streamlit app and run it. Make sure to adapt `query` to use the name of your table.

```python
# streamlit_app.py

import MySQLdb
import streamlit as st

# Initialize connection.
# Uses st.cache_resource to only run once.
@st.cache_resource
def init_connection():
    config = st.secrets["tidb"]
    return MySQLdb.connect(
        host=config["host"],
        port=config["port"],
        user=config["user"],
        password=config["password"],
        database=config["database"],
        ssl_mode="VERIFY_IDENTITY",
        ssl={"ca": config["ssl-ca"]}
    )

conn = init_connection()

# Perform query.
# Uses st.cache_data to only rerun when the query changes or after 10 min.
@st.cache_data(ttl=600)
def run_query(query):
    with conn.cursor() as cur:
        cur.execute(query)
        return cur.fetchall()

rows = run_query("SELECT * from mytable;")

# Print results.
for row in rows:
    st.write(f"{row[0]} has a :{row[1]}:")
```

See `st.cache_data` above? Without it, Streamlit would run the query every time the app reruns (e.g. on a widget interaction). With `st.cache_data`, it only runs when the query changes or after 10 minutes (that's what `ttl` is for). Watch out: If your database updates more frequently, you should adapt `ttl` or remove caching so viewers always see the latest data. Read more about caching [here](/library/advanced-features/caching).

If everything worked out (and you used the example table we created above), your app should look like this:

![Finished app screenshot](/images/databases/streamlit-app.png)
