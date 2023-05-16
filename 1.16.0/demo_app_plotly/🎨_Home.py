import numpy as np
import streamlit as st
from streamlit_extras.markdownlit import mdlit
from streamlit_extras.switch_page_button import switch_page


def icon(emoji: str):
    """Shows an emoji as a Notion-style page icon."""
    st.write(
        f'<span style="font-size: 78px; line-height: 1">{emoji}</span>',
        unsafe_allow_html=True,
    )


TITLE = "Streamlit theme for Plotly charts!"
ICON = "🎨"

st.set_page_config(page_title=TITLE, page_icon=ICON)
icon(ICON)
st.title(TITLE)
PLOTLY_ICON_URL = "https://images.prismic.io/plotly-marketing-website-2/7a351ee7-8d24-45b4-8352-0e1485bd94da_favicon_png_1%402x+%281%29.ico?auto=compress,format"

mdlit(
    f"""Welcome! 👋

This is a demo app for the 1.16 release of Streamlit, focusing on showcasing the new Streamlit theme for Plotly charts! We collected a bunch of example charts from @({PLOTLY_ICON_URL})(Plotly's docs)(https://plotly.com/python/) to show you how the charts look with/without Streamlit theme. \n

👈 Check them out by browsing the pages in the sidebar!
"""
)

show = st.button("I'm lazy!")
if show:
    new_page = np.random.choice(
        ["Bar Charts", "Heatmaps", "Contour Plots", "Histograms"]
    )
    switch_page(new_page)

mdlit(
    """
Read more in the dedicated @(🎈)(Streamlit blog post)(https://blog.streamlit.io/).

Oh and if you liked this demo, you might as well like our @(👯)(twin demo for Altair)(https://altair.streamlit.app)!\n
"""
)
