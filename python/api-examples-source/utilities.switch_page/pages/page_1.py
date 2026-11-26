import streamlit as st

st.button("Home", on_click=st.switch_page, args=("your_app.py",))
st.button("Page 1", on_click=st.switch_page, args=("pages/page_1.py",))
st.button("Page 2", on_click=st.switch_page, args=("pages/page_2.py",))
