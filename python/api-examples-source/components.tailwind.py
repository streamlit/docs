import streamlit as st

HTML = """
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click me!
    </button>
"""
JS = """
    export default function(component) {
        const { setTriggerValue, parentElement } = component;
        const button = parentElement.querySelector('button');
        button.onclick = () => {
            setTriggerValue('clicked', true);
        };
    }
"""
my_component = st.components.v2.component(
    "my_tailwind_button",
    html=HTML,
    js=JS,
)
result_1 = my_component(
    isolate_styles=False, on_clicked_change=lambda: None, key="one"
)
result_1

result_2 = my_component(
    isolate_styles=False, on_clicked_change=lambda: None, key="two"
)
result_2
