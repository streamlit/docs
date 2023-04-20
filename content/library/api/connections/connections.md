---
title: Connections and databases
slug: /library/api-reference/connections
---

# Connections and databases

## Setup your connection

<TileContainer>
<RefCard href="/library/api-reference/connections/st.experimental_connection" size="half">

<Image pure alt="screenshot" src="/images/databases/experimental-connection.png" />

#### Create a connection

Connect to a database and return a connection object.

```python
st.experimental_connection('pet_db', type='sql')
```

</RefCard>
</TileContainer>

## Built-in connections

<TileContainer>

<RefCard href="/library/api-reference/connections/st.connections.sql" size="half">

<Image pure alt="screenshot" src="/images/databases/sqlalchemy.png" />

#### SQL connection

Connect to a SQLAlchemy Session and return a connection object.

```python
conn = st.connections.SQL('pet_db')
```

</RefCard>

<RefCard href="/library/api-reference/connections/st.connections.snowpark" size="half">

<Image pure alt="screenshot" src="/images/databases/snowflake.png" />

#### Snowpark connection

Connect to a Snowpark Session and return a connection object.

```python
conn = st.connections.SQL('pet_db', type='snowpark')
```

</RefCard>
</TileContainer>

## Third-party connections

<TileContainer>
<RefCard href="/library/api-reference/connections/st.connections.experimentalbaseconnection" size="half">

#### Connection base class

Build a connection class with
`ExperimentalBaseConnection` and return a connection object.

```python
class MyConnection(st.connections.ExperimentalBaseConnection):
    def __init__(self, name):
        super().__init__(name, type='my_connection')

    def query(self, query):
        return pd.DataFrame({'a': [1, 2, 3]})
```

</RefCard>

</TileContainer>
