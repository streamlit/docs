import glob
import streamlit as st
import pandas as pd
import numpy as np
import ast
import os

os.chdir("./../")

ALL_MD_FILES = glob.glob("./content/library/api/**/*.md")

FORBIDDEN_PATTERNS = [
    "columns",
    "set_page_config",
    "stop",
    "echo",
    "sidebar",
]

FORBIDDEN_PATTERNS_MD = "\n".join(f"- `{pattern}`" for pattern in FORBIDDEN_PATTERNS)

INTRO_MESSAGE = f"""This app collects Markdown docs files in `content/library/api`, parses code blocks and generates a Streamlit app out of them.

**This is useful to test the docs and catch code blocks that could fail!**

To avoid messing up the app, we didn't run code blocks which contained the following patterns:
{FORBIDDEN_PATTERNS_MD} 
"""


def remove_prefix(text: str, prefix: str) -> str:
    return text[text.startswith(prefix) and len(prefix) :]


TTL = 24 * 60 * 60


# @st.experimental_memo(ttl=TTL)
def load_md(path: str):
    with open(path, "r") as f:
        md = f.read()
    return md


# @st.experimental_memo(ttl=TTL)
def page_to_cards(page_md: str):
    """Parse a Markdown page into a list of cards with text and associated code"""
    cards_output = list()
    cards = page_md.split("####")[1:]

    for card in cards:
        forbidden = False
        text, code, _ = card.split("```")

        # avoid code blocks that are not "intended" to run as such
        if any(pattern in code for pattern in FORBIDDEN_PATTERNS):
            forbidden = True

        text = "####" + text
        code = remove_prefix(code, "python\n")
        cards_output.append(dict(text=text, code=code, forbidden=forbidden))

    return cards_output


def make_streamlit_app_from_md_docs():
    st.title("Doc cards:")

    for md_path in ALL_MD_FILES:
        md = load_md(md_path)
        cards = page_to_cards(md)

        for card in cards:
            st.write("---")

            cols = st.columns((1, 3))
            if not card["forbidden"]:
                cols[0].write(card["text"])
                cols[1].code(card["code"])
                try:
                    with cols[1]:
                        exec(card["code"])
                except Exception as e:
                    cols[1].exception(e)
            else:
                cols[0].write(card["text"])
                cols[1].code(card["code"])
                cols[1].error("(We chose not to run this code block)")


if __name__ == "__main__":
    st.set_page_config(layout="wide")
    st.sidebar.write("# ✍️ __Docs to Streamlit__ app!")
    st.sidebar.write(INTRO_MESSAGE)

    make_streamlit_app_from_md_docs()
