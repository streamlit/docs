import streamlit as st

def write_sidebar():
    st.write("""
    # Now supporting st.write in the sidebar!

    In previous versions, the sidebar did not support `st.write`. With version 0.66, you can!
    Simply use `st.write` in the same fashion as other components you would like to add to the sidebar.
    """)

    st.info("""
        :point_left: **Check out the example in the sidebar.**
    """)

    with st.echo("below"):
        st.sidebar.write("""
        ### Example: ###
        Here is some text in the sidebar from `st.write`! Check it out by upgrading to the latest.
        """)
