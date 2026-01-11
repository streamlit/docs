import streamlit as st
from my_component import HTML, CSS, JS

# Interactive counter with both state and triggers
counter = st.components.v2.component(
    "interactive_counter",
    html=HTML,
    css=CSS,
    js=JS,
)

# Use with callbacks
result = counter(
    data={"initialCount": 0},
    on_count_change=lambda: None,  # Track count state
    on_reset_change=lambda: None,  # Handle reset events
)

# Display current state
st.write(f"Current count: {result.count}")

# Show when reset was triggered (only for one rerun)
if result.reset:
    st.toast("Counter was reset!")
