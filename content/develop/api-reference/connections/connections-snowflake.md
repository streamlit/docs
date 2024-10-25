---
title: st.connections.SnowflakeConnection
slug: /develop/api-reference/connections/st.connections.snowflakeconnection
---

<Tip>

This page only contains the `st.connections.SnowflakeConnection` class. For a deeper dive into creating and managing data connections within Streamlit apps, read [Connecting to data](/develop/concepts/connections/connecting-to-data).

</Tip>

<Autofunction function="streamlit.connections.SnowflakeConnection" />

{/**
Internal note: This section is deep-linked from the library in 1.28.1 via /st.connections.snowflakeconnection-configuration through a redirect.
Maintain the redirect if moved or modified.
**/}

#### Using your existing Snowflake configuration

Snowflake's Python connector supports a [connection configuration file](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-connect#connecting-using-the-connections-toml-file), which is well integrated with Streamlit's `SnowflakeConnection`. If you already have one or more connections configured, all you need to do is pass Streamlit the name of the connection to use. If your `connections.toml` file defines a connection under `[myconnection]`, you can use that configuration in one of the following ways:

- In your app code, set `name` for the connection command: `st.connnection("myconnection", type="snowflake")`. Streamlit will infer `connection_name` from `name`.
- In the `[connections.snowflake]` section of `secrets.toml`, set `connection_name = "myconnection"`. In this case, you must use `st.connection("snowflake")`.
- Set the environment variable `SNOWFLAKE_DEFAULT_CONNECTION_NAME=<"myconnection"`.

If `connections.toml` defines a `[default]` connection, Streamlit will use that when you call `st.connection("snowflake")`. For more information, see [Setting a default connection](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-connect#setting-a-default-connection).

When your app is running in [Streamlit in Snowflake](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit), `st.connection("snowflake")` will connect automatically using the [app owner's role](https://docs.snowflake.com/en/developer-guide/streamlit/owners-rights) and does not require any configuration.

Learn more about setting up connections in the [Connecting Streamlit to Snowflake tutorial](/develop/tutorials/databases/snowflake) and [Connecting to data](/develop/concepts/connections/connecting-to-data).

<Autofunction function="streamlit.connections.SnowflakeConnection.cursor" />

<Autofunction function="streamlit.connections.SnowflakeConnection.query" />

<Autofunction function="streamlit.connections.SnowflakeConnection.raw_connection" />

<Autofunction function="streamlit.connections.SnowflakeConnection.reset" />

<Autofunction function="streamlit.connections.SnowflakeConnection.session" />

<Autofunction function="streamlit.connections.SnowflakeConnection.write_pandas" />
