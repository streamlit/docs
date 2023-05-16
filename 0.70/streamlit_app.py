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
from demos.barchart import bar_chart

previous_version = "0.69.0"
demo_pages = {
    "Bar Chart Tweaks": bar_chart
}

st.set_page_config(
    page_title=f"New features in Streamlit {VERSION}",
)

contributors = [
    "tribut",
    "jnothman",
    "domoritz",
]

intro = """
After our exciting [launch of Streamlit share](http://blog.streamlit.io/introducing-streamlit-sharing/),
we doubled down on refining our current set of features and documentation
for this release!
"""

release_notes = f"""
---

**Notable Changes**

- 🧪 [`st.set_page_config`](https://docs.streamlit.io/en/{st.__version__}/api.html#streamlit.set_page_config)
and [`st.color_picker`](https://docs.streamlit.io/en/{st.__version__}/api.html#streamlit.color_picker)
have now been moved into the Streamlit namespace. The old beta-prefixed versions
will continue to work until January 2021. Learn more about our beta process
[here](https://docs.streamlit.io/en/{st.__version__}/api.html#beta-and-experimental-features).
- 📊 Improve display of bar charts for discrete values.

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
