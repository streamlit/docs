import streamlit as st
from danger_button_component import danger_button

st.title("Hold-to-Confirm Button")
st.caption("A dangerous action that requires intentional confirmation")

# Track deletion events
if "deleted_items" not in st.session_state:
    st.session_state.deleted_items = []


# Callback when deletion is confirmed
def on_delete_confirmed():
    st.session_state.deleted_items.append(
        f"Deleted item #{len(st.session_state.deleted_items) + 1}"
    )
    st.toast("Item permanently deleted!", icon="🗑️")


# Render the component
with st.container(horizontal_alignment="center"):
    result = danger_button(
        key="danger_btn",
        on_confirmed_change=on_delete_confirmed,
        width="content"
    )

# Show deletion history
if st.session_state.deleted_items:
    st.divider()
    st.subheader("Deletion Log")
    for item in reversed(st.session_state.deleted_items[-3:]):
        st.write(f"• {item}")
