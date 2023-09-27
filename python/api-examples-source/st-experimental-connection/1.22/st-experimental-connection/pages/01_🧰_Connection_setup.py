import streamlit as st

st.set_page_config(
    page_title='Connection setup',
    page_icon='🧰'
)

st.title("🧰 Connection setup")

"""
Streamlit comes installed with generic connections for SQL and Snowflake Snowpark. These may need additional packages installed to work properly.
There are also many community connections available to install. In most cases, you'll need to:

- Install any necessary packages in your environment (such as with `pip` and `requirements.txt`). You can find these in Streamlit’s data source tutorials or the data source documentation.
    - If something is missing when you run your app, Streamlit will try to detect that and give you a hint about what to install.
- Set up credentials and connection information
- Import and initialize the connection in your app

### Installing packages

For example, with the MySQL connection, you'll need to install SQLAlchemy and mysqlclient.

```shell
pip install SQLAlchemy mysqlclient
```

### Set up credentials

Connection configuration and credentials can be provided in three ways:
- In `.streamlit/secrets.toml`
- In any native config file or ENV for the particular data source
- Passed directly as arguments to st.experimental_connection

If you are using `secrets.toml`, you'll want to create a section called `[connections.<connection name>]` and add parameters there. You can
name the connection whatever you'd like.

```toml
[connections.pets_db]
dialect = "mysql"
url = "mysqldb://scott:tiger@192.168.0.134/pet_db"
```

### Initialize the connection

Then, initialize the connection in your Streamlit app by passing the connection name and type to st.experimental_connection.
The type argument can be a string (for built-in connections) or a class (for connections that ship outside of Streamlit).

```python
# streamlit_app.py

import streamlit as st

conn = st.experimental_connection('pets_db', type='sql')
```
"""
