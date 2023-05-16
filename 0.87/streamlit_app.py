import sys
from pathlib import Path

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

try:
    sys.path.remove(str(parent))
except ValueError:  # Already removed
    pass

import streamlit as st
from util.release_helper import create_static_notes

VERSION = ".".join(st.__version__.split(".")[:2])

from demos import st_metric

previous_version = "0.86.0"
demo_pages = {
    "st.metric": st_metric.show,
}

st.set_page_config(page_title=f"New features in Streamlit {VERSION}")

contributors = []

intro = f"""
This release launches `st.metric` 🎉
"""

release_notes = f"""
---
**Highlights**

- 🔢  Introducing `st.metric`, an API for displaying KPIs

**Other Changes**

- 🐞  Bug Fixes: File uploader retains state upon expander closing [#3557](https://github.com/streamlit/streamlit/issues/3557),  
setIn Error with st.empty [#3659](https://github.com/streamlit/streamlit/issues/3659), 
Missing IFrame embeds in docs [#3706](https://github.com/streamlit/streamlit/issues/3706), 
Fix error writing certain PNG files [#3597](https://github.com/streamlit/streamlit/issues/3597)

"""
# End release updates


def draw_main_page():
    st.write(
        f"""
        # Welcome to Streamlit {VERSION}! 👋
        """
    )

    st.write(intro)

    st.write(release_notes)

    create_static_notes(contributors, previous_version, VERSION)


# Draw sidebar
pages = list(demo_pages.keys())

if len(pages):
    pages.insert(0, "Release Notes")
    st.sidebar.title(f"Streamlit v{VERSION} Demos")
    query_params = st.experimental_get_query_params()
    if "page" in query_params and query_params["page"][0] == "headliner":
        idx = 1
    else:
        idx = 0
    selected_demo = st.sidebar.radio("", pages, idx)
else:
    selected_demo = "Release Notes"

# Draw main page
if selected_demo in demo_pages:
    demo_pages[selected_demo]()
else:
    draw_main_page()