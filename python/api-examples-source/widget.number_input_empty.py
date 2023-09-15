import streamlit as st

number = st.number_input('Insert a number', value=None)
st.write('The current number is ', number)
