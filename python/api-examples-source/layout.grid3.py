import streamlit as st
from numpy.random import default_rng as rng

df = rng(0).standard_normal((20, 3))
grid = st.grid(3, wrap=False, border=True)
grid.line_chart(df, height=220)
grid.bar_chart(df, height=220)
grid.dataframe(df, height=220)
