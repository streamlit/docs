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
from demos.balloons import balloons
from demos.columns import columns
from demos.container import container
from demos.expander import expander
from demos.file_uploader import file_uploader
from demos.advanced import advanced

previous_version = "0.67.0"
demo_pages = {
    "Layouts: Columns": columns,
    "Layouts: Container": container,
    "Layouts: Expander": expander,
    "Layouts: Best Practices": advanced,
    "File Uploader: Redesigned": file_uploader,
}

st.beta_set_page_config(
    page_title=f"New features in Streamlit {VERSION}",
)

contributors = [
    "abhinand5",
    "cdeil",
    "domoritz"
]

intro = """
In celebration of our 1st birthday, we've put together a jam packed release with
features long awaited by the community.

Streamlit is only where it is today
because of the community and we're thankful to have taken this journey with you
over the last year 🤗
"""

release_notes = """
---

### New Features

- ⌗ Introducing new layout options for Streamlit! Move aside, vertical layout.
Make a little space for... horizontal layout! Check out our
[blog post](https://blog.streamlit.io/introducing-new-layout-options-for-streamlit).
- 💾 File uploader redesigned with new functionality for multiple files uploads
and better support for working with uploaded files. This may cause breaking
changes. Please see the new api in our
[documentation](https://docs.streamlit.io/en/0.68.0/api.html#streamlit.file_uploader)


### Notable Changes

- 🎈 `st.balloon` has gotten a facelift with nicer balloons and smoother animations.
- 🚨 Breaking Change: Following the deprecation of `st.deck_gl_chart` in
January 2020, we have now removed the API completely. Please use
`st.pydeck_chart` instead.
- 🚨 Breaking Change: Following the deprecation of `width` and `height` for
`st.altair_chart`, `st.graphviz_chart`, `st.plotly_chart`, and
`st.vega_lite_chart` in January 2020, we have now removed the args completely.
 Please set the width and height in the respective charting library.

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
    balloons()

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
