import altair as alt
import pandas as pd
import streamlit as st
from streamlit_extras.altex import _chart

st.set_page_config(layout="centered", page_title="Data Editor", page_icon="🧮")

st.title("📊 Data to Chart")
st.caption("This is a demo of the `st.experimental_data_editor`.")

"Let viewers edit your data and see how that impacts the rest of the app!"


@st.cache_data
def get_data() -> pd.DataFrame:
    df = pd.DataFrame(
        {
            "age": [12, 32, 45, 90, 89],
            "gender": ["male", "male", "other", "female", "male"],
            "active": [False, True, True, False, False],
        },
    )

    df.age = df.age.astype("uint64")
    df.gender = df.gender.astype("category")
    return df


@st.cache_data
def get_age_hist(df: pd.DataFrame) -> alt.Chart:
    return _chart(
        mark_function="bar",
        data=pd.cut(
            df.age, (0, 18, 30, 60, 100), labels=["0 - 18", "18 - 30", "30 - 60", "60 - 100"]
        )
        .value_counts()
        .sort_index()
        .reset_index(),
        x=alt.X("index:N", title="Age", sort="x"),
        y=alt.Y("age:Q", title="Count"),
    )


@st.cache_data
def get_gender_hist(df: pd.DataFrame) -> alt.Chart:
    return _chart(
        mark_function="bar",
        data=df.gender.value_counts().sort_index().reset_index(),
        x=alt.X("index:N", title="Gender", sort="x"),
        y=alt.Y("gender:Q", title=""),
    )


@st.cache_data
def get_active_hist(df: pd.DataFrame) -> alt.Chart:
    return _chart(
        mark_function="bar",
        data=df.active.value_counts().sort_index().reset_index(),
        x=alt.X("index:N", title="Active", sort="x"),
        y=alt.Y("active:Q", title=""),
    )


with st.echo():
    df = get_data()
    edited_df = st.experimental_data_editor(
        df,
        use_container_width=True,
        num_rows="dynamic",
    )

st.caption("Modify cells above 👆 or even ➕ add rows, and check out the impacts below 👇")

left, middle, right = st.columns((4, 3, 3))
left.altair_chart(get_age_hist(edited_df), use_container_width=True)
middle.altair_chart(get_gender_hist(edited_df), use_container_width=True)
right.altair_chart(get_active_hist(edited_df), use_container_width=True)
