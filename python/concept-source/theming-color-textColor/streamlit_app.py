import streamlit as st

st.markdown(
    """This is Markdown test. This is `inline code` in Markdown.
    This is a link to the [Streamlit docs](https://docs.streamlit.io).
    """
)
st.code("""import streamlit as st\n\nst.write("Hello World!")""")
st.multiselect("Widgets", ["A", "B", "C"])
cols = st.columns(3)
with cols[0]:
    st.button("CLICK ME!", type="primary")
with cols[1]:
    st.button("Click me!")
with cols[2]:
    st.link_button("Streamlit Docs", "https://docs.streamlit.io")

with st.sidebar:
    st.number_input("Count", 0, 100, 50)
    st.feedback("faces")
    st.segmented_control("Gadgets", ["A", "B", "C"], default="B")
    st.pills("Doodads", ["One", "Two", "Three"], default="Two")