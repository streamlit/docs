import streamlit as st


def handle_checkbox_change():
    st.toast(f"Checkbox is now: {st.session_state.my_checkbox.checked}")


checkbox_component = st.components.v2.component(
    "simple_checkbox",
    html="""
    <label class="checkbox-container">
        <input type="checkbox" id="checkbox" />
        <span class="label-text">Enable feature</span>
    </label>
    """,
    css="""
    .checkbox-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--st-font);
        color: var(--st-text-color);
        cursor: pointer;
    }
    input[type="checkbox"] {
        width: 1.25rem;
        height: 1.25rem;
        accent-color: var(--st-primary-color);
        cursor: pointer;
    }
    """,
    js="""
    export default function({ parentElement, data, setStateValue }) {
        const checkbox = parentElement.querySelector("#checkbox");

        // Initialize from data
        checkbox.checked = data?.checked ?? false;

        // Send state on change
        checkbox.addEventListener("change", () => {
            setStateValue("checked", checkbox.checked);
        });
    }
    """,
)

initial_state = True

result = checkbox_component(
    data={"checked": initial_state},
    default={"checked": initial_state},
    on_checked_change=handle_checkbox_change,
    key="my_checkbox",
)

st.write(f"Current state: {'Enabled' if result.checked else 'Disabled'}")
