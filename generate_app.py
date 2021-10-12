import glob

ALL_MD_FILES = glob.glob("./content/library/api/**/*.md")
FORBIDDEN_PATTERNS = [
    "download_button",
    "line_chart",
    "my_",
    "do_something",
    "set_page_config",
    "stop",
    "numpy_array",
    "run_long_computation",
    "echo",
]

FORBIDDEN_PATTERNS_MD = "\n".join(f"- `{pattern}`" for pattern in FORBIDDEN_PATTERNS)

APP_PREFIX = f"""import streamlit as st
import pandas as pd
from generate_app import make_streamlit_app_from_md_docs

st.sidebar.write('# ✍️ __Docs to Streamlit__ app!')
st.sidebar.write('''This app was generated using script `generate_app.py`.  

It takes Markdown doc files in `content/library/api` and generates a Streamlit app out of them.

To avoid execution errors, we disregarded doc cards where code blocks contained following patterns:
{FORBIDDEN_PATTERNS_MD}
'''
)

refresh = st.sidebar.button("Refresh docs")
if refresh:
    make_streamlit_app_from_md_docs()
"""

CODE_BLOCK_PREFIX = """\n\nwith st.echo():
    """


def remove_prefix(text: str, prefix: str) -> str:
    return text[text.startswith(prefix) and len(prefix) :]


def load_md(path: str):
    with open(path, "r") as f:
        md = f.read()
    return md


def page_to_cards(page_md: str):
    """ Parse a Markdown page into a list of cards with text and associated code"""
    cards_output = list()
    cards = page_md.split("####")[1:]

    for card in cards:
        text, code, _ = card.split("```")

        # avoid code blocks that are not "intended" to run as such
        if any(pattern in code for pattern in FORBIDDEN_PATTERNS):
            continue

        text = "###" + text
        code = remove_prefix(code, "python\n")
        cards_output.append(dict(text=text, code=code))

    return cards_output


def make_streamlit_app_from_md_docs():

    app = APP_PREFIX
    for md_path in ALL_MD_FILES:
        md = load_md(md_path)
        cards = page_to_cards(md)

        for card in cards:

            app += f"\nst.write('''{card['text']}''')" + "\n"
            app += CODE_BLOCK_PREFIX + "\n    ".join(card["code"].splitlines())
            app += "\n"

    with open("app.py", "w") as f:
        f.write(app)


if __name__ == "__main__":
    make_streamlit_app_from_md_docs()