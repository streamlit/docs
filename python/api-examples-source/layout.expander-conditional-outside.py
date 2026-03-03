import streamlit as st

with (summary := st.expander("Summary", on_change="rerun")):
    st.write("This is the summary")

st.write(
    f"The expander is {':green[open]' if summary.open else ':red[closed]'}."
)
