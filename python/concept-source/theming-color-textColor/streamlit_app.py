import streamlit as st

st.markdown(
    """This is Markdown test. This is `inline code` in Markdown.
    This is a link to the [Streamlit docs](https://docs.streamlit.io).
    """
)
st.code("""import streamlit as st\n\nst.write("Hello World!")""")
st.multiselect("Multiselect", ["A", "B", "C"])
cols = st.columns(3)
with cols[0]:
    st.button("Primary button", type="primary")
with cols[1]:
    st.button("Secondary button")
with cols[2]:
    st.link_button("Link button", "https://docs.streamlit.io", icon=":material/open_in_new:")

with st.sidebar:
    st.number_input("Count", 0, 100, 50)
    st.feedback("faces")
    st.segmented_control("Segmented control", ["A", "B", "C"], default="B")
    st.pills("Pills", ["One", "Two", "Three"], default="Two")