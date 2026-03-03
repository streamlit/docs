import streamlit as st


def on_popover_change():
    if st.session_state.drawer:
        st.toast("You opened the popover.")
    else:
        st.toast("You closed the popover.")


with st.popover("Open popover", on_change=on_popover_change, key="drawer"):
    st.write("This is the popover")
