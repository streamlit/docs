import streamlit as st
from my_component import HTML, CSS, JS

counter_component = st.components.v2.component(
    name="counter", html=HTML, css=CSS, js=JS
)


# Define callback function for the count state value
def handle_count_change():
    # Called when the component calls setStateValue("count", value)
    st.toast("Count was updated!")


# Mount the counter component with callback
result = counter_component(
    width="content", on_count_change=handle_count_change, key="counter_1"
)

# Access the current count value
st.write(f"Current count: {result.count}")

# Access the current count value in Session State
st.write(f"Current count: {st.session_state.counter_1.count}")
