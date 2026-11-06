import streamlit as st

grid = st.grid(4)
with grid.cell():
    st.metric("Revenue", "$1.2M", "+8%", border=True)
    st.caption("Trailing 30 days")
with grid.cell(column_span="all"):
    st.markdown("**Featured**")
