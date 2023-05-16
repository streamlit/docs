import streamlit as st
import pandas as pd

def file_uploader():
    st.write(
        """
        # File Uploader: Automatically reset file buffer

        In file uploader, Streamlit was creating a new buffer each
        time there was a rerun. This led to brittleness in app code 
        dependent on the file uploader. As part of this release, we have optimized to
        return the same buffer on rerun. 

        File buffer positions do not automatically reset. This was not obvious to users based
        on the error message.

        To make it easy for our users, Streamlit now automatically resets the
        file buffers returned from `st.file_uploader` on rerun.

        -----

        ### Example
        """
    )

    with st.echo("below"):
        # Changing slider after uploading a file will trigger a re-run.
        # This action would throw an error in previous versions but after this release 
        # that is no longer the case
        value = st.slider('Drag to trigger a rerun', 0, 100)

        file = st.file_uploader('Upload CSV', type="csv")
        if file:
            df = pd.read_csv(file)
            st.write(df.head())
