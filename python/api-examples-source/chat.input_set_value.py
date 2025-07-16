import streamlit as st

if st.button("I would like to..."):
    st.session_state.chat_key = "I would like to "
if st.button("Please tell me about..."):
    st.session_state.chat_key = "Please tell me about "

if prompt := st.chat_input("Say something", key="chat_key"):
    st.chat_message("user").write(prompt)
