import streamlit as st
import pandas as pd
import numpy as np
from cards import (
    widgets_card,
    text_card,
    dataframe_card,
    charts_card,
    media_card,
    layouts_card,
    chat_card,
    status_card
)

if "init" not in st.session_state:
    st.session_state.chart_data = pd.DataFrame(
        np.random.randn(20, 3), columns=["a", "b", "c"]
    )
    st.session_state.map_data = pd.DataFrame(
        np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4],
        columns=["lat", "lon"],
    )
    st.session_state.init = True


pages = [
    st.Page(
        "home.py",
        title="Home",
        icon=":material/home:"
    ),
    st.Page(
        "widgets.py",
        title="Widgets",
        icon=":material/widgets:"
    ),
    st.Page(
        "text.py",
        title="Text",
        icon=":material/article:"
    ),
    st.Page(
        "data.py",
        title="Data",
        icon=":material/table:"
    ),
    st.Page(
        "charts.py",
        title="Charts",
        icon=":material/insert_chart:"
    ),
    st.Page(
        "media.py",
        title="Media",
        icon=":material/image:"
    ),
    st.Page(
        "layouts.py",
        title="Layouts",
        icon=":material/dashboard:"
    ),
    st.Page(
        "chat.py",
        title="Chat",
        icon=":material/chat:"
    ),
    st.Page(
        "status.py",
        title="Status",
        icon=":material/error:"
    ),
]

page = st.navigation(pages)
page.run()

with st.sidebar.container(height=310):
    if page.title == "Widgets":
        widgets_card()
    elif page.title == "Text":
        text_card()
    elif page.title == "Data":
        dataframe_card()
    elif page.title == "Charts":
        charts_card()
    elif page.title == "Media":
        media_card()
    elif page.title == "Layouts":
        layouts_card()
    elif page.title == "Chat":
        chat_card()
    elif page.title == "Status":
        status_card()
    else:
        st.page_link("home.py", label="Home", icon=":material/home:")
        st.write("Welcome to the home page!")
        st.write(
            "Select a page from above. This sidebar thumbnail shows a subset of "
            "elements from each page so you can see the sidebar theme."
        )

st.sidebar.caption(
    "This app uses [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) "
    "and [Space Mono](https://fonts.google.com/specimen/Space+Mono) fonts."
)
