import streamlit as st
from menu import menu

st.set_option("client.showSidebarNavigation", False)

if "role" not in st.session_state or st.session_state.role is None:
    st.switch_page("app.py")
menu()

if st.session_state.role not in ["admin", "super-admin"]:
    st.warning("You do not have permission to view this page.")
    st.stop()

st.title("This page is available to all admins")

st.markdown(f"You are currently logged with the role of {st.session_state.role}.")
