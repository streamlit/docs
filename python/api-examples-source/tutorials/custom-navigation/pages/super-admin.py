import streamlit as st
from menu import menu

if "role" not in st.session_state or st.session_state.role is None:
    st.switch_page("app.py")
menu()

if st.session_state.role not in ["super-admin"]:
    st.warning("You do not have permission to view this page.")
    st.stop()

st.title("This page is available to super-admins")
st.markdown(f"You are currently logged with the role of {st.session_state.role}.")
