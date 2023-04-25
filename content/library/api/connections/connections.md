---
title: Connections and databases
slug: /library/api-reference/connections
---

# Connections and databases

## Setup your connection

<TileContainer>
<RefCard href="/library/api-reference/connections/st.experimental_connection" size="half">

#### Connect to a data source or API

Connect to a database and return a connection object.

```python
conn = st.experimental_connection('pets_db', type='sql')
pet_owners = conn.query('select * from pet_owners')
st.dataframe(pet_owners)
```

</RefCard>
</TileContainer>

## Built-in connections

<TileContainer>

<RefCard href="/library/api-reference/connections/st.connections.sqlconnection" size="half">

<Image pure alt="screenshot" src="/images/databases/sqlalchemy.png" />

#### SQLConnection

A connection to a SQL database using SQLAlchemy.

```python
conn = st.experimental_connection('sql')
```

</RefCard>

<RefCard href="/library/api-reference/connections/st.connections.snowparkconnection" size="half">

<Image pure alt="screenshot" src="/images/databases/snowflake.png" />

#### SnowparkConnection

A connection to Snowflake Snowpark.

```python
conn = st.experimental_connection('snowpark')
```

</RefCard>
</TileContainer>

## Third-party connections

<TileContainer>
<RefCard href="/library/api-reference/connections/st.connections.experimentalbaseconnection" size="half">

#### Build your own connection with `ExperimentalBaseConnection`

Build a connection class with
`ExperimentalBaseConnection` and return a connection object.

```python
class MyConnection(ExperimentalBaseConnection[myconn.MyConnection]):
    def _connect(self, **kwargs) -> MyConnection:
        return myconn.connect(**self._secrets, **kwargs)
    def query(self, query):
        return self._instance.query(query)
```

</RefCard>

</TileContainer>
