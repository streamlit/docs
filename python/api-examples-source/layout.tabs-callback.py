import streamlit as st


def on_tab_change():
    st.toast(f"You opened the {st.session_state.animal} tab.")


cat, dog, owl = st.tabs(
    ["Cat", "Dog", "Owl"], on_change=on_tab_change, key="animal"
)

if cat.open:
    with cat:
        st.write("This is the cat")

if dog.open:
    with dog:
        st.write("This is the dog")

if owl.open:
    with owl:
        st.write("This is the owl")
