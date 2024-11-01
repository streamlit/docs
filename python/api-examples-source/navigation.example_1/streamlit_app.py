import streamlit as st

def Page_2():
    st.title("Page 2")

pg = st.navigation([st.Page("Page_1.py"), st.Page(Page_2)])
pg.run()