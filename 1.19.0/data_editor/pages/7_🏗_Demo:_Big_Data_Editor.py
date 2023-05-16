import random

import numpy as np
import pandas as pd
import streamlit as st

np.random.seed(0)
random.seed(0)

st.set_page_config(layout="centered", page_title="Data Editor", page_icon="🧮")
st.title("🏗 Big Data Editor")
st.caption("This is a demo of the `st.experimental_data_editor`.")

""" Wanna use st.experimental_data_editor with a million rows dataset? No problem!"""


@st.cache_resource(max_entries=2)
def get_fake_data():
    from faker import Faker

    fake = Faker()
    Faker.seed(0)

    # Generate 5k rows of fake data
    fake_profile_lite_data = {
        "name": [],
        "homepage": [],
    }

    for _ in range(5000):
        fake_profile_lite_data["name"].append(fake.name())
        fake_profile_lite_data["homepage"].append(fake.url())

    return fake_profile_lite_data


@st.cache_resource(max_entries=4)
def get_profile_dataset(number_of_items: int = 100) -> pd.DataFrame:
    new_data = []
    fake_profile_data = get_fake_data()

    for _ in range(number_of_items):
        new_data.append(
            {
                "name": random.choice(fake_profile_data["name"]),
                "age": random.randint(1, 100),
                "active": random.choice([True, False]),
                "status": round(random.uniform(0, 1), 2),
                "homepage": random.choice(fake_profile_data["homepage"]),
            }
        )

    profile_df = pd.DataFrame(new_data)
    profile_df.index = pd.RangeIndex(start=0, stop=len(profile_df), step=1)
    return profile_df


dataset = get_profile_dataset(int(1e5))
st.write("Length of dataset: ", len(dataset))
with st.form("data_editor_form"):
    st.caption("Edit the dataframe below")
    edited = st.experimental_data_editor(dataset, use_container_width=True)
    submit_button = st.form_submit_button("Submit")

if submit_button:
    st.expander("Edited dataset", expanded=True).dataframe(edited, use_container_width=True)
