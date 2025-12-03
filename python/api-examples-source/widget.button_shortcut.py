import streamlit as st

with st.container(horizontal=True, horizontal_alignment="distribute"):
    "`A`" if st.button("A", width=100, shortcut="Shift+A") else "` `"
    "`S`" if st.button("S", width=100, shortcut="Ctrl+S") else "` `"
    "`D`" if st.button("D", width=100, shortcut="Cmd+D") else "` `"
    "`F`" if st.button("F", width=100, shortcut="Mod+F") else "` `"
