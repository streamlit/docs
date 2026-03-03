import streamlit as st
import time

with st.popover("Open popover", on_change="rerun"):
    with st.spinner("Loading popover..."):
        time.sleep(2)
    st.write("This is the popover")
