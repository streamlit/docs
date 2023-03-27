import pandas
import streamlit as st

col1, col2 = st.columns(2)
with col1:
    # Get help for Pandas DataFrame:
    pandas.DataFrame

with col2:
    # Get help for Streamlit itself:
    st
