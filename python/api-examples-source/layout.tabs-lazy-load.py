import streamlit as st
import time

tab1, tab2, tab3 = st.tabs(["Cat", "Dog", "Owl"], on_change="rerun")

if tab1.open:
    with tab1:
        with st.spinner("Loading cat..."):
            time.sleep(2)
        tab1.write("This is the cat")

if tab2.open:
    with tab2:
        with st.spinner("Loading dog..."):
            time.sleep(2)
        tab2.write("This is the dog")

if tab3.open:
    with tab3:
        with st.spinner("Loading owl..."):
            time.sleep(2)
        tab3.write("This is the owl")
