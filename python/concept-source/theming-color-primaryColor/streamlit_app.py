import streamlit as st

cols = st.columns(3)
with cols[0]:
    st.number_input("Count", 0, 100)
    st.button("Primary button", type="primary")
with cols[1]:
    st.multiselect("Multiselect", ["A", "B", "C", "D", "E", "F"], ["A", "B"])
    st.button("Secondary button")
with cols[2]:
    st.date_input("Date input")
    st.button("Tertiary button", type="tertiary")

with st.sidebar:
    st.multiselect("Sidebar multiselect", ["A", "B", "C", "D", "E"], ["C"])
    st.slider("Slider", 0, 100, 50)
