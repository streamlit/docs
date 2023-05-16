import streamlit as st
import numpy as np

def large_selects():
    st.write("""
    # Lightning fast dropdowns with larger datasets!

    Previously, opening an `st.multiselect` and `st.selectbox` would be very slow if
    there were too many options to draw. Now, thanks to a contribution from masa3141,
    version 0.67 can now handle datasets as large as ~10k items without a problem

    Thanks [masa3141](https://github.com/masa3141), you rock!
    """)

    with st.echo("below"):
        @st.cache
        def get_data():
            return np.random.randn(10000)

        st.multiselect('Select a number', get_data())

        st.selectbox('Select a number', get_data())
