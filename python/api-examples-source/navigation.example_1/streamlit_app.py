import streamlit as st


def page_2():
    st.title("Page 2")


pg = st.navigation([st.Page("page_1.py"), st.Page(page_2)])
pg.run()
