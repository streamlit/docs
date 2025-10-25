import streamlit as st

JS = """
export default function(component) {
    const { data, setTriggerValue, parentElement } = component;
    parentElement.innerHTML = data;
    const links = parentElement.querySelectorAll('a');

    links.forEach((link) => {
        link.onclick = (e) => {
            setTriggerValue('clicked', link.getAttribute('data-link'));
        };
    });
}
"""

CSS = """
a {
    color: var(--st-link-color);
}
"""

my_component = st.components.v2.component(
    "inline_links",
    css=CSS,
    js=JS,
)

paragraph_html = """
<p>This is an example paragraph with inline links. To see the response in
Python, click on the <a href="#" data-link="link_1">first link</a> or
<a href="#" data-link="link_2">second link</a>.</p>
"""


def callback():
    pass


result = my_component(data=paragraph_html, on_clicked_change=callback)
if result.clicked == "link_1":
    st.write("You clicked the first link!")
elif result.clicked == "link_2":
    st.write("You clicked the second link!")
