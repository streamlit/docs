import streamlit as st
import pandas as pd

def dataframe():
    st.write("""
    # Now with Improved Pandas Dataframe Support

    With 0.65, there is additional support for pandas dataframes. These components can now take in a panda dataframe as a list of options:
    - `st.radio`
    - `st.multiselect`
    - `st.selectbox`
    """)
    with st.echo("below"):
        options = pd.DataFrame({'Options': ['radio', 'multiselect', 'selectbox']})
        st.write("Input", options)

        st.radio("Dataframe as input for radio buttons", options)
        st.multiselect("Dataframe as input for multiselect", options)
        st.selectbox("Dataframe as input for selectbox", options)
