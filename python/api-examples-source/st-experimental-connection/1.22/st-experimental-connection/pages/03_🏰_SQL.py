import streamlit as st

from datetime import timedelta

st.set_page_config(
    page_title='SQLConnection',
    page_icon='🏰'
)

st.title('🏰 SQLConnection')

st.info("`SQLConnection` can load data from any SQL dialect with 4 lines of code", icon="💡")

connection_secrets = """
# .streamlit/secrets.toml
[connections.pets_db]
url = "sqlite:///pets.db"
"""

st.subheader("Setup")

"""
This example uses a local SQLite database that sits alongside the app. The only extra dependency installed is [SQLAlchemy](https://github.com/sqlalchemy/sqlalchemy).

```sh
pip install SQLAlchemy==1.4
```

`.streamlit/secrets.toml` looks like this:
"""

st.code(connection_secrets, language='toml')

"""
Now you can initialize the connection in one line of code:
"""
with st.echo():
    import streamlit as st
    conn = st.experimental_connection('pets_db', type='sql')

    # View the connection contents.
    conn


st.subheader("Use session for writes and transactions")

"""
`conn.session` returns an underlying SQLAlchemy Session that can be used for writes,
transactions, using the SQLAlchemy ORM and other more advanced operations.
"""

with st.echo():
    with conn.session as s:
        st.markdown(f"Note that `s` is a `{type(s)}`")
        s.execute('CREATE TABLE IF NOT EXISTS pet_owners (person TEXT, pet TEXT);')
        s.execute('DELETE FROM pet_owners;')
        pet_owners = {'jerry': 'fish', 'barbara': 'cat', 'alex': 'puppy'}
        for k in pet_owners:
            s.execute(
                'INSERT INTO pet_owners (person, pet) VALUES (:owner, :pet);',
                params=dict(owner=k, pet=pet_owners[k])
            )
        s.commit()
            
st.subheader("query() for common cases")

"""
For a typical use case where you just need to query and cache some data, it's much simpler.
Just use `conn.query()`. By default it caches the result without expiration, or you can add a TTL.
This also support parameters, pagination, date conversions, and more
(see the [full docs](https://docs.streamlit.io/library/api-reference/connections/st.connections.sqlconnection#sqlconnectionquery)).

`query()` returns a `pandas.DataFrame`.
"""

with st.echo():
    pet_owners = conn.query('select * from pet_owners', ttl=timedelta(minutes=10))
    st.dataframe(pet_owners)
