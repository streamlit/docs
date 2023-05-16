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
from demos.chart_fullscreen import chart_fullscreen

previous_version = "0.70.0"
demo_pages = {
    "File uploader buffer reset": file_uploader,
    "Optimize chart render": chart_fullscreen
}

st.set_page_config(
    page_title=f"New features in Streamlit {VERSION}",
)

contributors = [
    "darshkpatel",
    "nixphix",
    "imba-tjd",
    "DhruvkBhatt",
]

intro = """
This release is focused on continuing cleanup of the amazing features we launched
last month in addition to setting up the framework for exciting new features!
"""

release_notes = f"""
---
**Notable Changes**

- 📁 Updated [`st.file_uploader`](https://docs.streamlit.io/en/{st.__version__}/api.html#streamlit.file_uploader)
to automatically reset buffer on app reruns.
- 📊 Optimize the default rendering of charts and reduce issues with the initial render.

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
pages.insert(0, "Release Notes")

st.sidebar.title(f"Streamlit v{VERSION} Demos")
selected_demo = st.sidebar.radio("", pages)

# Draw main page

if selected_demo in demo_pages:
    demo_pages[selected_demo]()
else:
    draw_main_page()
