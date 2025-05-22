import streamlit as st

st.header("Chat elements")

if "chat_history" not in st.session_state:
    st.session_state.chat_history = [{"role": "assistant", "content": "Hello! How can I assist you today?"}]

for message in st.session_state.chat_history:
    st.chat_message(message["role"]).markdown(message["content"])

if prompt := st.chat_input("Send a message"):
    st.session_state.chat_history.append({"role": "user", "content": prompt})
    st.chat_message("user").markdown(prompt)
    assistant_response_generator = [character for character in f"Echo: {prompt}"]
    response = st.chat_message("assistant").write_stream(assistant_response_generator)
    st.session_state.chat_history.append({"role": "assistant", "content": response})
