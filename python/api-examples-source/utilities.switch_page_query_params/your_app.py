import streamlit as st


def page_1():
    st.title("Page 1")
    st.button(
        "Switch to Page 2",
        on_click=st.switch_page,
        args=("page_2.py",),
        kwargs={"query_params": {"utm_source": "page_1"}},
    )


pg = st.navigation([page_1, "page_2.py"])
pg.run()
