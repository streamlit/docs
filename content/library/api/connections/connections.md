---
title: Connections and databases
slug: /library/api-reference/connections
---

# Connections and databases

## First-party connections

<TileContainer>
<RefCard href="/library/api-reference/connections/st.experimental_connection" size="half">

#### Connect to a database

Connect to a database and return a connection object.

```python
conn = st.experimental_connection('pet_db', type='sql')
```

</RefCard>

<RefCard href="/library/api-reference/connections/st.connections.sql" size="half">

#### Connect to a SQLAlchemy Session

Connect to a SQLAlchemy Sessione and return a connection object.

```python
conn = st.connections.SQL('pet_db')
```

</RefCard>

<RefCard href="/library/api-reference/connections/st.connections.snowpark" size="half">

#### Connect to a Snowpark Session

Connect to a Snowpark Session and return a connection object.

```python
conn = st.connections.SQL('pet_db', type='snowpark')
```

</RefCard>

<RefCard href="/library/api-reference/connections/st.connections.experimentalbaseconnection" size="half">

#### Extend ExperimentalBaseConnection

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
