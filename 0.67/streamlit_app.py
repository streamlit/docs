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
import validators
from util.release_helper import create_static_notes

VERSION = '.'.join(st.__version__.split('.')[:2])

# Begin release updates
from demos.cc_bytes import cc_bytes
from demos.large_selects import large_selects

previous_version = "0.66.0"
demo_pages = {
    "Bytes with Streamlit Components": cc_bytes,
    "Selects with large datasets": large_selects,
}

st.beta_set_page_config(
    page_title=f"New features in Streamlit {VERSION}",
)

contributors = [
"domoritz",
"masa3141",
]

intro = """
For this release, we focused primarily on code cleanliness and several bug fixes.
We have many exciting things coming next release — stay tuned!
"""

release_notes = """
### New Features

- 🦷 Streamlit Components can now return bytes to your Streamlit App. To create a
component that returns bytes, make sure to upgrade to the latest
[streamlit-component-lib](https://www.npmjs.com/package/streamlit-component-lib).


### Notable Changes

- 📈 Deprecation warning: Beginning December 1st, 2020 `st.pyplot()` will require a figure to
be provided. To disable the deprecation warning, please set `deprecation.showPyplotGlobalUse`
 to `False`
- 🎚 `st.multiselect` and `st.selectbox` are now lightning fast when working with large datasets. Thanks [masa3141](https://github.com/masa3141)!
"""
# End release updates

def draw_main_page():
    st.write(f"""
    # Welcome to Streamlit {VERSION}! 👋
    """)


    st.write(intro)

    st.info("""
        :point_left: **To get started, choose a demo on the left sidebar.**
    """)

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
