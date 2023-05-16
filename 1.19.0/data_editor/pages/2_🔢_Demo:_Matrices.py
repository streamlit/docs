import operator
import time
from typing import Callable

import numpy as np
import pandas as pd
import streamlit as st
from streamlit_extras.add_vertical_space import add_vertical_space
from streamlit_extras.colored_header import ST_COLOR_PALETTE

st.set_page_config(layout="centered", page_title="Data Editor", page_icon="🧮")
st.title("🔢 Matrix Operations")
st.caption("This is a demo of the `st.experimental_data_editor`.")
add_vertical_space(2)
BLANK_COLUMNS_CONFIG = {i: {"title": ""} for i in range(4)}


def color_mask(x: pd.DataFrame, mask: pd.DataFrame, background_color: str) -> pd.DataFrame:
    hue, intensity = background_color.split("-")
    color = f"background-color: {ST_COLOR_PALETTE[hue][intensity]}; color:white;"
    style_df = pd.DataFrame("", index=x.index, columns=x.columns)
    style_df[mask] = color
    return style_df


def operation_interface(
    operation_label: str,
    operation_method: Callable,
    background_color: str,
    key_prefix: str,
) -> None:
    a, operation, b, equals, c = st.columns((10, 1, 10, 1, 10))

    with a:
        st.caption("A")
        A = st.experimental_data_editor(
            np.array([[0, 0, 2], [1, 3, 4], [3, 4, 4]]),
            use_container_width=True,
            key=f"{key_prefix}_A",
        )

    with operation:
        add_vertical_space(6)
        st.write(f"###  {operation_label} ")

    with b:
        st.caption("B")
        B = st.experimental_data_editor(
            np.array([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
            use_container_width=True,
            key=f"{key_prefix}_B",
        )

    with equals:
        add_vertical_space(6)
        st.write("###  = ")

    with c:
        st.caption("C")
        C = pd.DataFrame(operation_method(A, B))

        key_C = f"{key_prefix}_C"
        avoid_coloring = False
        if key_C not in st.session_state:
            st.session_state[key_C] = C
            avoid_coloring = True

        result_df_container = st.empty()
        mask = (C - st.session_state[key_C]) != 0
        result_df_container.dataframe(
            C.style.apply(
                lambda x: color_mask(
                    x,
                    mask=mask,
                    background_color=background_color,
                ),
                axis=None,
            ),
            use_container_width=True,
        )

        if mask.sum().sum() > 0 and not avoid_coloring:
            time.sleep(0.5)
            result_df_container.dataframe(C, use_container_width=True)

        st.session_state[key_C] = C

    add_vertical_space(2)


st.subheader("➕ Matrix Sum")

""" Edit matrices A and B and see how that impacts their :green[**matrix sum**] C!"""

operation_interface(
    "\+",
    operation_method=operator.__add__,
    background_color="green-80",
    key_prefix="sum",
)

st.subheader("➖ Matrix Difference")

""" Edit matrices A and B and see how that impacts their :blue[**matrix difference**] C!"""

operation_interface(
    "\-",
    operation_method=operator.__sub__,
    background_color="blue-80",
    key_prefix="difference",
)

st.subheader("• Matrix Product")

""" Edit matrices A and B and see how that impacts their :orange[**matrix product**] C!"""

operation_interface(
    "•",
    operation_method=np.dot,
    background_color="orange-80",
    key_prefix="product",
)
# operation_interface("*", operation_method=np.dot, key_prefix="product")
