import streamlit as st

st.number_input("Count", 0, 100)
st.multiselect("Widgets", ["A", "B", "C"], ["A", "B"])
cols = st.columns(3)
with cols[0]:
    st.button("CLICK ME!", type="primary")
with cols[1]:
    st.button("Click me!")
with cols[2]:
    st.button("Click me.", type="tertiary")

with st.sidebar:
    st.multiselect("Gizmos", ["A", "B", "C"], ["C"])
    st.button("CLICK ME, TOO!", type="primary")
    st.button("Click me, too!")
