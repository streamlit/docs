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

previous_version = "0.72.0"
demo_pages = {
    # "Consolidate Reruns for File Uploader": file_uploader
}

st.set_page_config(
    page_title=f"New features in Streamlit {VERSION}",
)

contributors = [
    "nicolaskruchten",
]

intro = """
For this release, we focused on bug fixes and our infrastructure, including
partial support for Python 3.9.
"""

release_notes = f"""
---
**Notable Changes**

- 🐍 Streamlit can now be installed on Python 3.9. Streamlit components are not
yet compatible with Python 3.9 and must use version 3.8 or earlier.
- 🧱 Streamlit Components now allows same origin, enabling features provided by
the browser such as a webcam component.
- 🐙 Fix Streamlit sharing deploy experience for users running on Git versions
2.7.0 or earlier.
- 🧰 Handle unexpected closing of uploaded files for [`st.file_uploader`](https://docs.streamlit.io/en/0.73.0/api.html#streamlit.file_uploader).

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
