import streamlit as st


def logged_in():
    st.sidebar.page_link("app.py", label="Switch accounts")
    st.sidebar.page_link("pages/user.py", label="Your profile")
    if st.session_state.role in ["admin", "super-admin"]:
        st.sidebar.page_link("pages/admin.py", label="Manage users")
        st.sidebar.page_link(
            "pages/super-admin.py",
            label="Manage admin access",
            disabled=st.session_state.role != "super-admin",
        )


def not_logged_in():
    st.sidebar.page_link("app.py", label="Log in")


def menu():
    if "role" not in st.session_state or st.session_state.role is None:
        not_logged_in()
        return
    logged_in()
