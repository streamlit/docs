import streamlit as st

st.header("Status elements")

st.error("This is an error message.")
st.warning("This is a warning message.")
st.info("This is an info message.")
st.success("This is a success message.")

e = RuntimeError("This is an exception of type RuntimeError")
st.exception(e)

if st.button("Toast"):
    st.toast("This is a toast message.")
st.button("Balloons", on_click=st.balloons)
st.button("Snow", on_click=st.snow)