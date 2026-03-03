import streamlit as st


def on_tab_change():
    st.toast(f"You opened the {st.session_state.animal} tab.")


tab1, tab2, tab3 = st.tabs(
    ["Cat", "Dog", "Owl"], on_change=on_tab_change, key="animal"
)

if tab1.open:
    with tab1:
        st.write("This is the cat")

if tab2.open:
    with tab2:
        st.write("This is the dog")

if tab3.open:
    with tab3:
        st.write("This is the owl")
