import streamlit as st
import time

message = st.text_area("Message", value="Lorem ipsum.\nStreamlit is cool.")
time.sleep(.5) # Simulate some other code running

st.download_button(
    label="Download text",
    data=message,
    file_name="message.txt",
    mime="text/txt",
    on_click="ignore",
)
