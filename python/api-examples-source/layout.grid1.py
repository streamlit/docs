import streamlit as st

metrics = [
    ("Revenue", "$1.2M", "+8%"),
    ("Pipeline", "$4.8M", "+12%"),
    ("Conversion", "12.4%", "+1.1%"),
    ("Retention", "96%", "-0.4%"),
]
grid = st.grid(4)
for label, value, delta in metrics:
    grid.metric(label, value, delta, border=True)
