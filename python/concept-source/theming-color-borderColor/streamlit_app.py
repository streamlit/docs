import streamlit as st

cols = st.columns(2)

with cols[0]:
    st.multiselect("Multiselect", ["A", "B", "C"])
    st.text_input("Text input")
    left, right = st.columns(2)
    left.button("Button")
    with right.popover("Popover"):
        st.markdown("This is a popover.")

with cols[1]:
    st.dataframe({"Dataframe column 1": ["A cell"], "Dataframe column 2": ["A cell"]})
    with st.container(border=True):
        st.markdown("This is a container with a border.")
        st.chat_input("Sidebar chat input")

T1, T2, T3 = st.tabs(["Tab 1", "Tab 2", "Tab 3"])
T1.markdown("This is tab 1.")
T2.markdown("This is tab 2.")
T3.markdown("This is tab 3.")

with st.sidebar:
    st.multiselect("Sidebar multiselect", ["A", "B", "C"])
    st.button("Sidebar button")
    with st.popover("Sidebar popover"):
        st.markdown("This is a popover.")
    st.chat_input("Chat input")
