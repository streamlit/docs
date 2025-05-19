import streamlit as st


st.header("Full radius")
cols = st.columns(2)
with cols[0]:
    st.markdown("This is Markdown with `inline code`.")
    st.markdown("This is Markdown with a :primary-background[:primary[color badge]].")
    st.multiselect("Multiselect", ["A", "B", "C"], default=["A"], help="This is a tooltip.")
    st.button("Secondary button")
    st.segmented_control("Segmented control", ["Alpha", "Beta", "Gamma"])
with cols[1]:
    st.code("""import streamlit as st\n\nst.write("Hello World!")""")
    st.dataframe({"Dataframe column 1": [1, 2], "Dataframe column 2": [3, 4]})
    st.info("This is an info message.")


with st.sidebar:
    st.header("Zero radius")
    st.markdown("This is Markdown with `inline code`.")
    st.markdown("This is Markdown with a :primary-background[:primary[color badge]].")
    st.multiselect("Sidebar multiselect", ["A", "B", "C"], default=["A"], help="This is a tooltip.")
    st.button("Sidebar secondary button")
    st.segmented_control("Sidebar segmented control", ["One", "Two", "Three"])
