import streamlit as st
import os
import io

def expander():
    st.write(
        """
        # Clean things up with expanders

        Now that we've maximized horizontal space, try st.beta_expander,
        to maximize your vertical space! Some of you may have been using
        `st.checkbox` for this before, and expander is a prettier, more
        performant replacement 🙂

        -----
        """
    )

    st.write("## Example 1")
    expander = st.beta_expander("Toggle to see code")
    expander.code("""
expander = st.beta_expander("Show Code")
expander.code("expander = st.beta_expander("Show Code")")
    """)

    st.write("## Example 2")
    with st.echo("below"):
        st.beta_expander("I am an empty expander")
