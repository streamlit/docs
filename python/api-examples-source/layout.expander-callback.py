import streamlit as st


def on_expander_change():
    if st.session_state.summary:
        st.toast("You opened the expander.")
    else:
        st.toast("You closed the expander.")


with st.expander("Open expander", on_change=on_expander_change, key="summary"):
    st.write("This is the popover")