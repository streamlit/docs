import streamlit as st

st.header("Text elements")
cols = st.columns(2)

with cols[0].container(border=True):
    st.title("Title")
    st.markdown("*Lorem ipsum*")
    st.header("Header")
    st.markdown("*Lorem ipsum*")
    st.subheader("Subheader")
    st.markdown("*Lorem ipsum*")

with cols[1]:
    st.markdown(r"Markdown: **bold** *italic* ~strikethrough~ [link](https://streamlit.io) `code` $\int_a^b f(x)$ 🐶 :cat: :material/home: :streamlit: <- -> <-> -- >= <= ~= ")
    st.markdown(
        "Text colors:\n"
        ":blue[blue] :green[green] :orange[orange] :red[red] :violet[violet] "
        ":gray[gray] :rainbow[rainbow] :primary[primary]\n\n"
        ":blue-background[blue] :green-background[green] :orange-background[orange] "
        ":red-background[red] :violet-background[violet] :gray-background[gray] "
        ":rainbow-background[rainbow] :primary-background[primary]\n\n"
        ":blue-background[:blue[blue]] :green-background[:green[green]] "
        ":orange-background[:orange[orange]] :red-background[:red[red]] "
        ":violet-background[:violet[violet]] :gray-background[:gray[gray]] "
        ":rainbow-background[:rainbow[rainbow]] :primary-background[:primary[primary]]"
    )
    st.caption("Caption")
    st.badge("Badge", icon=":material/star:", color="primary")

st.divider()
st.code (
    "import streamlit as st\n"
    "\n"
    'st.write("Hello, world!")\n'
)
st.help(st.write)