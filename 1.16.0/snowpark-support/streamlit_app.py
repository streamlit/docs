import streamlit as st
from snowflake.snowpark import Session


def icon(emoji: str):
    """Shows an emoji as a Notion-style page icon."""
    st.write(
        f'<span style="font-size: 78px; line-height: 1">{emoji}</span>',
        unsafe_allow_html=True,
    )


st.set_page_config("Snowpark & PySpark support", "🏂")
icon("🏂")
"""
# Snowpark & PySpark support

[Release 1.16.0](https://docs.streamlit.io/library/changelog#version-1160) of Streamlit 
adds support for [Snowpark](https://docs.snowflake.com/en/developer-guide/snowpark/index.html[) 
and [PySpark](https://spark.apache.org/docs/latest/api/python/) dataframes! :tada: 
Use them in all places where Streamlit accepts pandas dataframes, and 
they will be automatically converted and evaluated.
"""


"### Automatic conversion"
"First, create a session with Snowpark:"
with st.echo():
    session = Session.builder.configs(st.secrets.snowflake).create()

"Download 100 rows of a sample dataset:"
with st.echo():
    df = (
        session.table("SNOWFLAKE_SAMPLE_DATA.TPCDS_SF100TCL.CATALOG_PAGE")
        .limit(100)
        .collect()
    )

"Pass `df` straight to `st.dataframe` and it *just works*! No conversion to pandas needed."
with st.echo():
    st.dataframe(df)

"Also works with all other Streamlit commands that accept dataframes, e.g. charts, widgets, or maps:"

with st.echo():
    st.line_chart(df, y="CP_CATALOG_PAGE_SK")

"---"
"""
### Automatic evaluation
That's not all! You can also pass your *unevaluated* dataframe (i.e. no `collect()`) directly 
to Streamlit. It will automatically download and convert the data. Large tables get 
capped at 10k rows, see the little warning above the table.
"""
with st.echo():
    df = session.table("SNOWFLAKE_SAMPLE_DATA.TPCDS_SF100TCL.CATALOG_PAGE")
    st.dataframe(df)

st.info(
    "Capping at 10k rows is great for quick data exploration! No need to worry about app crashes or excessive cost because your data has millions of rows.",
    icon="💡",
)

"---"

st.caption(
    "[Code for this demo](https://github.com/streamlit/release-demos/blob/master/1.16.0/snowpark-support/streamlit_app.py)"
)
