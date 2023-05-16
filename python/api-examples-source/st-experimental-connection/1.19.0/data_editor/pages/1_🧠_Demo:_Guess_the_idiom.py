import random

import pandas as pd
import streamlit as st

st.set_page_config(layout="centered", page_title="Data Editor", page_icon="🧮")

st.title("🧠 Guess the idiom")
st.caption("This is a demo of the `st.experimental_data_editor`.")
st.write("")

"""We put together a set of idioms. Idioms are phrases or expressions that have a special meaning. For example when we say "it's raining cats and dogs" we don't actually mean that cats and dogs are falling from the sky. Instead, we mean that it's raining very hard.

Give a try and guess the missing words in the following (rather famous) idioms!"""
random.seed(0)

idioms = [
    "It's raining cats and dogs",
    "One swallow does not make a summer",
    "A penny saved is a penny earned",
    "If you can't beat them, join them",
    "A rolling stone gathers no moss",
    "A chain is only as strong as its weakest link.",
    "A watched pot never boils",
    "A picture is worth a thousand words",
]

if "answers" not in st.session_state:
    st.session_state.answers = [0] * len(idioms)

st.write(" ")

progress_bar = st.empty()

df = pd.DataFrame([idiom.split() for idiom in idioms]).fillna("")
masked_words = list()
for index, idiom in enumerate(idioms):
    words = idiom.split()
    mask_index = random.randint(0, len(words) - 1)
    mask_word = words[mask_index]
    masked_words.append((index, mask_index, mask_word))
    df.loc[index][mask_index] = None

response = st.experimental_data_editor(df, use_container_width=True)

for index, mask_index, mask_word in masked_words:
    if response.loc[index][mask_index] == mask_word:
        st.session_state.answers[index] = 1


def get_label(progress: float) -> str:
    if progress == 0:
        return "Replace 'None's with your guesses... Hint: first missing is `and` :wink:"
    elif progress > 0 and progress < 1:
        return "Now you got it! Keep going... :fire:"

    else:
        return "🤩"


progress_bar.progress(
    sum(st.session_state.answers) / len(idioms),
    text=(
        f"⌛ **{sum(st.session_state.answers)}/{len(idioms)} words guessed** —"
        f" {get_label(sum(st.session_state.answers) / len(idioms))}"
    ),
)


if sum(st.session_state.answers) == len(idioms):
    st.balloons()

with st.expander("See solutions"):
    st.dataframe(
        pd.DataFrame([idiom.split() for idiom in idioms])
        .fillna("")
        .style.background_gradient(),  # .to_numpy()
    )
