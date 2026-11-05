import streamlit as st

grid = st.grid("auto", min_column_width=220)
with grid.cell(column_span="all"):
    st.markdown("**Featured**")
grid.markdown("Card")
