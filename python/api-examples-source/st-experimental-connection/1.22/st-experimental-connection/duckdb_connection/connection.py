from streamlit.connections import ExperimentalBaseConnection
from streamlit.runtime.caching import cache_data

import duckdb
import pandas as pd

class DuckDBConnection(ExperimentalBaseConnection[duckdb.DuckDBPyConnection]):
    """Basic st.experimental_connection implementation for DuckDB"""

    def _connect(self, **kwargs) -> duckdb.DuckDBPyConnection:
        if 'database' in kwargs:
            db = kwargs.pop('database')
        else:
            db = self._secrets['database']
        return duckdb.connect(database=db, **kwargs)
    
    def cursor(self) -> duckdb.DuckDBPyConnection:
        return self._instance.cursor()

    def query(self, query: str, ttl: int = 3600, **kwargs) -> pd.DataFrame:
        @cache_data(ttl=ttl)
        def _query(query: str, **kwargs) -> pd.DataFrame:
            cursor = self.cursor()
            cursor.execute(query, **kwargs)
            return cursor.df()
        
        return _query(query, **kwargs)
