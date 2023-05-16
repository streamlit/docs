import streamlit as st
import time

def container():
    st.write(
        """
        # Adding a new concept: containers!

        `st.beta_container` is a building block that helps you organize your app.
        Just like `st.empty`, `st.beta_container` lets you set aside some space, and
        then later write things to it out of order. But while subsequent calls to
        the same `st.empty` replace the item inside it, subsequent calls to the
        same `st.beta_container` append to it. This works just like the
        `st.sidebar` you've come to know and love.

        -----
        """
    )

    with st.echo("below"):
        st.write("I come before the container")
        container = st.beta_container()
        for percent_complete in range(10):
            time.sleep(2)
            container.write(
                "I'm in the container but I won't replace what's already here 🤗"
            )
        st.write("I come after the container and am outside 😢")
