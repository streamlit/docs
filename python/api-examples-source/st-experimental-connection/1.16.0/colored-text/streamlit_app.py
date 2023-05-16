import streamlit as st


def icon(emoji: str):
    """Shows an emoji as a Notion-style page icon."""
    st.write(
        f'<span style="font-size: 78px; line-height: 1">{emoji}</span>',
        unsafe_allow_html=True,
    )


icon("💅")
"# Colored text"
st.caption("[Code for this demo](https://github.com/streamlit/release-demos/blob/master/1.16.0/colored-text/streamlit_app.py)")
"[Release 1.16.0](https://docs.streamlit.io/library/changelog#version-1160) of Streamlit adds support for colored text in all commands that support markdown! :tada:"

"### Usage"

st.code("st.markdown(':color[text to be colored]')")

"Make sure to replace `color` with one of the..."

"### Supported colors"

"""
- :blue[blue]
- :green[green]
- :red[red]
- :violet[violet]
- :orange[orange]
"""

"### Examples"

with st.echo():
    st.markdown(
        "Text can be :blue[blue], but also :orange[orange]. And of course it can be :red[red]. And :green[green]. And look at this :violet[violet]!"
    )

"---"
with st.echo():
    st.subheader("This also works in :blue[titles and headers]")
"---"
with st.echo():
    st.slider("And in :red[widget labels] 🎈")
"---"
with st.echo():
    st.write("Combining **bold and :green[colored text] is totally** fine! Just like with other markdown features.")
