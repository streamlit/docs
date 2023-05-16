import streamlit as st
from streamlit_extras.switch_page_button import switch_page

st.set_page_config(layout="centered", page_title="Data Editor", page_icon="🧮")


@st.cache_data
def icon(emoji: str):
    """Shows an emoji as a Notion-style page icon."""
    st.write(
        f'<span style="font-size: 78px; line-height: 1">{emoji}</span>',
        unsafe_allow_html=True,
    )


icon(":partying_face:")
st.title("Data Editor has arrived!")

st.markdown(
    "Streamlit just unveiled the marvelous 🧮 **st.experimental_data_editor** in its latest 1.19"
    " release. It looks like a dataframe... except it's more: it's editable! Users can click on"
    " cells and edit them. Curious how that looks like? You're in the right place."
)

st.markdown(
    "We cooked some demos (code is available"
    " [here](https://github.com/streamlit/release-demos/tree/master/1.19.0/data_editor)) to show"
    " you how it works!"
)

show = st.button("Jump into the demos!")
if show:
    switch_page("demo: annotations")

st.markdown(
    """
Read more in the dedicated :balloon: [Streamlit blog post](https://blog.streamlit.io/editable-dataframes-are-here) and in our [docs](https://docs.streamlit.io/library/api-reference/widgets/st.experimental_data_editor).
"""
)
