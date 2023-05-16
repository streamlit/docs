import streamlit as st
import os
import io

def file_uploader():
    st.write(
        """
        # Upload more with file uploader

        Since the release of our initial file uploader, we've gotten great
        feedback culminating in this redesigned file uploader.

        `st.file_uploader` now supports multiple files! With the addition of
        multiple files and based on what our users have said, we now return
        identifying information about the file including
        - File name
        - File type
        - Size (in bytes)

        -----

        ## Single file uploader
        """
    )

    with st.echo("below"):
        single_file = st.file_uploader("Single File Uploader")

        if single_file:
            file_container = st.beta_expander(
                f"File name: {single_file.name} ({single_file.size}b)"
            )
            file_container.write(single_file.getvalue())

        st.write("### Code")

    st.write("## Multiple file uploader")

    with st.echo("below"):
        multiple_files = st.file_uploader(
            "Multiple File Uploader",
            accept_multiple_files=True
        )
        for file in multiple_files:
            file_container = st.beta_expander(
                f"File name: {file.name} ({file.size}b)"
            )
            file_container.write(file.getvalue())

        st.write("### Code")
