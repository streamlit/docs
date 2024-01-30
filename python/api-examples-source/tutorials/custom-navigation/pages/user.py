import streamlit as st
from menu import menu

st.set_option("client.showSidebarNavigation", False)

if "role" not in st.session_state or st.session_state.role is None:
    st.switch_page("app.py")
menu()

st.title("This page is available to all users")
st.markdown(f"You are currently logged with the role of {st.session_state.role}.")
