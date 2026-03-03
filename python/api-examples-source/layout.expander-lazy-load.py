import streamlit as st
import time

summary = st.expander("Summary", on_change="rerun")

if summary.open:
    with summary:
        with st.spinner("Loading summary..."):
            time.sleep(2)
        summary.write("This is the summary")
