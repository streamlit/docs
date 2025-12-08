import streamlit as st

if "click_count" not in st.session_state:
    st.session_state.click_count = 0


def handle_button_click():
    st.session_state.click_count += 1


my_component = st.components.v2.component(
    "interactive_button",
    html="""<button id="btn">Click me</button>""",
    css="""
    button {
        border: none;
        padding: .5rem;
        border-radius: var(--st-button-radius);
        background-color: var(--st-primary-color);
        color: white;
    }
    """,
    js="""
    export default function(component) {
      const { setTriggerValue, parentElement } = component;

        parentElement.querySelector("button").onclick = () => {
            setTriggerValue("action", "button_clicked");
        };
    }
    """,
)

result = my_component(on_action_change=handle_button_click)

if result.action:
    st.write(f"Button clicked! Total clicks: {st.session_state.click_count}")
