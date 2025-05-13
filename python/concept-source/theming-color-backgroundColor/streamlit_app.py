import streamlit as st

st.markdown("This is `inline code` in Markdown.")
st.multiselect("Widgets", ["A", "B", "C"])
st.dataframe({"Column 1": [1, 2], "Column 2": [3, 4]})
st.code("""import streamlit as st\n\nst.write("Hello World!")""")

with st.sidebar:
    st.markdown("This is `inline code` in Markdown.")
    st.multiselect("Gizmos", ["A", "B", "C"])
    st.dataframe({"Column 1": [5, 6], "Column 2": [7, 8]})
