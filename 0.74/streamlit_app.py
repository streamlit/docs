import sys
from pathlib import Path
file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

try:
    sys.path.remove(str(parent))
except ValueError: # Already removed
    pass

import streamlit as st
from util.release_helper import create_static_notes

VERSION = '.'.join(st.__version__.split('.')[:2])

# Begin release updates
from demos.file_uploader import file_uploader

previous_version = "0.73.0"
demo_pages = {
    # "Consolidate Reruns for File Uploader": file_uploader
}

st.set_page_config(
    page_title=f"New features in Streamlit {VERSION}",
    page_icon="random"
)

contributors = [
    # "nicolaskruchten",
]

intro = f"""
This release focused on stabilizing our code base with bug fixes and infrastructure improvements.
This includes the stabilization of
[`st.file_uploader`](https://docs.streamlit.io/en/0.74.0/api.html#streamlit.file_uploader).
"""

release_notes = f"""
---
**Notable Changes**

- 💾 [`st.file_uploader`](https://docs.streamlit.io/en/0.74.0/api.html#streamlit.file_uploader)
has been stabilized and the deprecation warning and associated configuration option
(`deprecation.showfileUploaderEncoding`) has been removed.
- 📊 [`st.bokeh_chart`](https://docs.streamlit.io/en/0.74.0/api.html#streamlit.bokeh_chart) is no longer duplicated when the page loads.
- 🎈 Fixed page icon to support emojis with variants (i.e. 🤦‍♀️ vs 🤦🏼‍♀️) or dashes (i.e 🌙 - crescent-moon).
"""
# End release updates

def draw_main_page():
    st.write(f"""
    # Welcome to Streamlit {VERSION}! 👋
    """)


    st.write(intro)

    st.write(release_notes)

    create_static_notes(contributors, previous_version, VERSION)


# Draw sidebar
pages = list(demo_pages.keys())

if len(pages):
    pages.insert(0, "Release Notes")
    st.sidebar.title(f"Streamlit v{VERSION} Demos")
    selected_demo = st.sidebar.radio("", pages)
else:
    selected_demo = "Release Notes"

# Draw main page
if selected_demo in demo_pages:
    demo_pages[selected_demo]()
else:
    draw_main_page()
