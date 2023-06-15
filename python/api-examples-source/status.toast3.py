import streamlit as st
import time

go = st.radio('Give a toast?', ['Yes','No'])

if go == 'No': st.stop()

with st.toast('Cheers!'):
    time.sleep(2)
    st.balloons()
