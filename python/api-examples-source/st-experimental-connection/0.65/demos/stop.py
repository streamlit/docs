import streamlit as st

def stop():
    st.write("""
    # Introducing the new st.stop API

    With 0.65, we now offer the ability to stop code execution immediately with
    `st.stop`. This functionality can be used to handle conditional cases.

    To learn more, please check out our [docs](https://docs.streamlit.io/en/stable/api.html#streamlit.stop)
    """)
    with st.echo("below"):
        name = st.text_input('Name')
        if not name:
            st.warning('Please input a name to see sample code.')
            st.stop()
        st.success('Thank you for inputting a name.')
