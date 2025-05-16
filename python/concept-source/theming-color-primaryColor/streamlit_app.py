import streamlit as st

row_a = st.columns(3)
row_b = st.columns(3)

row_a[0].number_input("Count", 0, 100)
row_b[0].button("Primary button", type="primary")
row_a[1].multiselect("Multiselect", ["A", "B", "C", "D", "E", "F"], ["A"])
row_b[1].button("Secondary button")
row_a[2].date_input("Date input")
row_b[2].button("Tertiary button", type="tertiary")

with st.sidebar:
    st.multiselect("Sidebar multiselect", ["A", "B", "C", "D", "E"], ["C"])
    st.slider("Slider", 0, 100, 50)
