import streamlit as st
import validators
from demos.svg import svg
from demos.query_params import query_params
from demos.dataframe import dataframe
from demos.stop import stop
from demos.page_config import page_config


VERSION = '.'.join(st.__version__.split('.')[:2])

st.beta_set_page_config(
    page_title=f"New features in Streamlit {VERSION}",
    page_icon=":shark:",  # Pick a fun new emoji for every version.
)

def draw_main_page():
    st.write(f"""
# Welcome!

This app is a demo of several :fire: **red-hot** :fire: features that made it into this Streamlit
version.
""")

    st.info("""
        :point_left: **To get started, choose a demo on the left sidebar.**
    """)


    st.write(f"""
## Release notes {VERSION}

### New features

- Page config [beta]
- Query params [experimental]
- Improved support for Pandas dataframes
- Stop streamlit with st.stop
- Inline SVG support for st.image

### Callouts

Deprecation Warning: The `st.image` parameter `format` has been renamed to `output_format`

## More info

- As usual, the source code for this app can be found in [Github](#).
- If you'd like to know what _exactly_ went into this release, check out the [commit
diff](https://github.com/streamlit/streamlit/compare/0.64.0...0.65.0).
- We can be found at https://streamlit.io and https://twitter.com/streamlit
- Finally, come by
[the forums](https://discuss.streamlit.io/c/official-announcements/6) if you'd like ask questions,
post awesome apps, or just say hi!
    """)

pages = {
    "Release notes": draw_main_page,
    "Page config [beta]": page_config,
    "Query params [experimental]": query_params,
    "Pandas for dataframes": dataframe,
    "Stop streamlit with st.stop": stop,
    "Inline SVG support for st.image": svg,
}

# Draw sidebar

st.sidebar.title(f"Streamlit {VERSION}")
selected_demo = st.sidebar.radio("Select a page", list(pages.keys()))

# Draw main page


pages[selected_demo]()
