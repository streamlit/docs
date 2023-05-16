import streamlit as st
import time

def rerun():
    st.write(
        """
        # Programatically rerun your app

        Thanks to a contribution from [SimonBiggs](https://github.com/SimonBiggs),
        you can now re-execute your script from the top to bottom. Please note,
        this is an
        [experimental feature](https://docs.streamlit.io/en/stable/api.html#experimental),
        and subject to change.

        Thanks again [SimonBiggs](https://github.com/SimonBiggs)!

        -----
        """
    )

    st.code("""
placeholder = st.empty()
stop = st.button("Stop rerunning")
if stop:
    st.stop()

for i in range(10):
    with placeholder:
        st.write(f"Getting ready to rerun in {10-i}")
        time.sleep(1)

st.experimental_rerun()
    """)

    placeholder = st.empty()
    stop = st.button("Stop rerunning")
    if stop:
        st.stop()

    for i in range(10):
        with placeholder:
            st.write(f"Getting ready to rerun in {10-i}")
            time.sleep(1)

    st.experimental_rerun()
