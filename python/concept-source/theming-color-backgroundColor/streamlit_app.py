import streamlit as st

st.markdown("This is `inline code` in Markdown.")
st.multiselect("Multiselect", ["A", "B", "C"])
st.dataframe({"Dataframe column 1": [1, 2], "Dataframe column 2": [3, 4]})
st.code("""import streamlit as st\n\nst.write("Hello World!")""")

with st.sidebar:
    st.markdown("This is `inline code` in Markdown.")
    st.text_input("Text input")
    st.number_input("Number input")
    st.divider()
    st.chat_input("Chat input", accept_file=True)