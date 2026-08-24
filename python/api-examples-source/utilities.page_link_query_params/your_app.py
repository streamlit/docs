import streamlit as st


def page_1():
    st.title("Page 1")
    st.page_link("page_2.py", query_params={"utm_source": "page_1"})


pg = st.navigation([page_1, "page_2.py"])
pg.run()
