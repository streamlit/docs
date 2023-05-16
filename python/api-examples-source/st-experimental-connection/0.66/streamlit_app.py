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
from demos.select_slider import select_slider
from demos.write_sidebar import write_sidebar

previous_version = "0.65.0"
demo_pages = {
    "st.write in sidebar": write_sidebar,
    "Slider for lists or objects": select_slider,
}

st.beta_set_page_config(
    page_title=f"New features in Streamlit {VERSION}",
    page_icon=":shark:",
)

contributors = [
"scottjohnson623",
"FranzDiebold",
"domoritz",
"koenvossen",
"koenvo",
"wtype",
"tanmaylaud",
]

intro = """
This app is a demo of several **red-hot** features that made it into this Streamlit
version.
"""

release_notes = """
### New Features

- ✏️ `st.write` is now available for use in the sidebar!
- 🎚 A slider for distinct or non-numerical values is now available with `st.select_slider`.
- ⌗ Streamlit Components can now return dataframes to your Streamlit App. Check out our [SelectableDataTable example](https://github.com/streamlit/component-template/tree/master/examples/SelectableDataTable).
- 📦 The Streamlit Components library used in our Streamlit Component template is
now available as a npm package ([streamlit-component-lib](https://www.npmjs.com/package/streamlit-component-lib)) to simplify future upgrades to the latest version.
Existing components do not need to migrate.

### Notable Changes

- 🐼 Support StringDtype from pandas version 1.0.0
- 🧦 Support for running Streamlit on Unix sockets
"""
# End release updates

def draw_main_page():
    # generate_contributors(contributors)

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
