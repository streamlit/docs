import streamlit as st


def page_1():
    st.write("Page 1")
    if st.button("Switch to Page 2"):
        st.switch_page("page_2.py", query_params={"utm_source": "page_1"})


pg = st.navigation([page_1, "page_2.py"])
pg.run()
