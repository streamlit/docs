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
from demos.share import share
from demos.rerun import rerun

previous_version = "0.67.0"
demo_pages = {
    "Streamlit sharing": share,
    "Programmatic reruns [Experimental]": rerun,
}

st.beta_set_page_config(
    page_title=f"New features in Streamlit {VERSION}",
)

contributors = [
    "SimonBiggs",
]

intro = """
We launched a brand new sharing platform in Streamlit - **Streamlit sharing**! This
new platform lets you deploy, manage, and share your apps all for free. It's
so awesome that we just had to include features within Streamlit to further
enhance your sharing experience!
"""

release_notes = """
---

### New Features

- 🎁 With Streamlit sharing, you are now only one click away from
sharing your Streamlit app with the world! Read more about it on our
[blog post](http://blog.streamlit.io/introducing-streamlit-sharing/) or sign up
[here](http://streamlit.io/sharing)!
- 🔁 Added `st.experimental_rerun` to programatically re-run your app. Thanks
[SimonBiggs](https://github.com/SimonBiggs)! Please note, this is an
[experimental feature](https://docs.streamlit.io/en/stable/api.html#experimental),
and subject to change.

**Notable Changes**

- 📹 Better support across browsers for start and stop times for st.video.
- 🖼 Bug fix for intermittently failing media files
- 📦 Bug fix for custom components compatibility with Safari. Make sure to
upgrade to the latest
[streamlit-component-lib](https://www.npmjs.com/package/streamlit-component-lib).

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
