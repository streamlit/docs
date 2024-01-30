import streamlit as st
from menu import menu

st.set_option("client.showSidebarNavigation", False)

if "role" in st.session_state:
    st.session_state._role = st.session_state.role
else:
    st.session_state.role = None


def set_role():
    st.session_state.role = st.session_state._role


st.selectbox(
    "Select your role:",
    [None, "user", "admin", "super-admin"],
    key="_role",
    on_change=set_role,
)
menu()
