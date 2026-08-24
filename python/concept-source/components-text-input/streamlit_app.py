import streamlit as st
from my_component import textbox_component_wrapper

if st.button("Hello World"):
    st.session_state["my_textbox"]["value"] = "Hello World"
if st.button("Clear text"):
    st.session_state["my_textbox"]["value"] = ""
result = textbox_component_wrapper(
    "Enter something",
    default="I love Streamlit!",
    key="my_textbox",
)

st.write("Result:", result)
st.write("Session state:", st.session_state)
