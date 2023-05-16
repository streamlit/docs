import streamlit as st

def page_config():
    st.write("""
    # Introducing Page Configurations

    In Streamlit 0.65, you can now configure your page with the current options:
    - Page title: Text displayed by your browser tab
    - Page icon: Icon displayed by your browser tab
    - Layout: Choose between wide or centered layout mode
    - Initial Sidebar State: Collapse or expand the sidebar by default

    Note: This feature is currently in beta and subject to change.

    ```
    st.beta_set_page_config(
        page_title="{0}",
        page_icon="{1}",
        layout="{2}",
        initial_sidebar_state="{3}"
    )
    ```
    """)
