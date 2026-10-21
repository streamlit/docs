import streamlit as st
import time

st.title("Cats!")

row1 = st.columns(3)
row2 = st.columns(3)

grid = [col.container(height=200) for col in row1 + row2]


def black_cats():
    time.sleep(1)
    st.title("🐈‍⬛ 🐈‍⬛")
    st.markdown("🐾 🐾 🐾 🐾")


def orange_cats():
    time.sleep(1)
    st.title("🐈 🐈")
    st.markdown("🐾 🐾 🐾 🐾")


@st.fragment
def herd_black_cats(card_a, card_b, card_c):
    st.button("Herd the black cats")
    with card_a:
        black_cats()
    with card_b:
        black_cats()
    with card_c:
        black_cats()


@st.fragment
def herd_orange_cats(card_a, card_b, card_c):
    st.button("Herd the orange cats")
    with card_a:
        orange_cats()
    with card_b:
        orange_cats()
    with card_c:
        orange_cats()


with st.sidebar:
    herd_black_cats(grid[0], grid[2], grid[4])
    herd_orange_cats(grid[1], grid[3], grid[5])
    st.button("Herd all the cats")