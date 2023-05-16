import streamlit as st
import os
import io

def cc_bytes():
    st.write(
        """
        # Create a Streamlit Component that uses bytes!

        Your custom Streamlit Components can now send and receive bytes and byte arrays.

        As an example, below is the [react-dropzone](https://react-dropzone.js.org/)
        wrapped into a [Component](https://github.com/streamlit/release-demos/tree/master/0.67/demos/image_uploader).

        This is just a quick demo, of course, since Streamlit already comes with a
        file uploader that takes care of all of this for you. Streamlit's uploader is
        getting a lot of improvements very soon so stay tuned!

        -----
        """
    )

    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "image_uploader/build")

    with st.echo("below"):
        image_uploader = st.components.v1.components.declare_component("image_uploader", path=build_dir)

        file = image_uploader()

        if file:
            st.image(file, width=300)
