import streamlit as st
import numpy as np
import pandas as pd


def file_uploader():

    st.write("""
    ## File Uploader: Consolidating Reruns for Multiple Files

    In prior versions of Streamlit, each time a file was uploaded
    a re-run occurred. If multiple files were selected as a batch to upload,
    it would trigger multiple re-runs for each file in the batch.

    With this release of Streamlit, we are consolidating re-runs for files uploaded in a
    batch.
    """)

    st.write("""
    ### Case #1

    Select multiple files for upload and note that the dataframe shown below changes
    after all the files have finished uploading. The change in the dataframe indicates
    a re-run
    """)
    with st.echo("below"):
        # Code for above snippet
        a = st.file_uploader(label='Multiple Reruns', accept_multiple_files=True, key='test1')
        st.write(a)


    st.write('Here is a randomly generated dataframe. With every re-run the numbers in the dataframe should change')
    with st.echo('above'):
        df = pd.DataFrame(np.random.randint(0, 10, size=(5, 2)), columns=list('AB'))
        st.write(df)


    st.write("""
    ---
    ### Case #2

    Select a large file for upload and while the large file is uploading
    hit the 'Browse Files' button again and select some additional files to upload.
    The dataframe values should change only after all the files have finished uploading.
    The change in the dataframe indicates a re-run
    """)
    with st.echo("below"):
        # Code for above snippet
        a = st.file_uploader(label='Multiple Reruns', accept_multiple_files=True, key='test2')
        st.write(a)

    st.write('Here is a randomly generated dataframe. With every re-run the numbers in the dataframe should change')
    with st.echo('above'):
        df = pd.DataFrame(np.random.randint(0, 10, size=(5, 2)), columns=list('AB'))
        st.write(df)
