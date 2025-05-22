import streamlit as st

@st.dialog("This is a dialog")
def dialog_function():
    st.write("This is a dialog function.")
    if st.button("Close"):
        st.rerun(scope="app")

st.header("Layout elements")

a, b, c, d = st.tabs(["Tab A", "Tab B", "Tab C", "Tab D"])
with a:
    st.write("This is the content of Tab A.")
with b:
    st.write("This is the content of Tab B.")
with c:
    st.write("This is the content of Tab C.")
with d:
    st.write("This is the content of Tab D.")

st.subheader("Columns")
col0, col1, col2 = st.columns(3, border=True)
col0.write("This is the first column.")
col1.write("This is the second column.")
col2.write("This is the third column.")
st.expander("Expander").write("This is an expander")
col0, col1 = st.columns(2)
col0.popover("Popover").write("This is a popover")
if col1.button("Dialog"):
    dialog_function()
