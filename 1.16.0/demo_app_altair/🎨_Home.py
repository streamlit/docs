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


TITLE = "Streamlit theme for Altair charts!"
ICON = "🎨"

st.set_page_config(page_title=TITLE, page_icon=ICON)

icon(ICON)
st.title(TITLE)
ALTAIR_ICON_URL = "https://avatars.githubusercontent.com/u/22396732?s=200&v=4"

mdlit(
    f"""Welcome! 👋

This is a demo app for the 1.16 release of Streamlit, focusing on showcasing the new Streamlit theme for Altair charts! We collected a bunch of example charts from @(Altair's docs)(https://altair-viz.github.io/gallery/index.html) to show you how the charts look with/without Streamlit theme. \n

👈 Check them out by browsing the pages in the sidebar!
"""
)

show = st.button("I'm lazy!")
if show:
    new_page = np.random.choice(
        [
            "Horizontal Stacked Bar Chart",
            "Bar Chart With Mean Line",
            "Layered Bar Chart",
            "Iowa Electricity",
            "Scatter Marginal Hist",
            "Simple Stacked Area Chart",
        ]
    )
    switch_page(new_page)

mdlit(
    """
Read more in the dedicated @(🎈)(Streamlit blog post)(https://blog.streamlit.io/)!

Oh and if you liked this demo, you might as well like our @(👯)(twin demo for Plotly)(https://plotly.streamlit.app)!\n
"""
)
