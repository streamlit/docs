---
title: Get dataframe row-selections from users
slug: /develop/tutorials/elements/dataframe-row-selections
---

# Get dataframe row-selections from users

Streamlit offers two commands for rendering beautiful, interactive dataframes in your app. If you need users to edit data, add rows, or delete rows, use `st.data_editor`. If you don't want users to change the data in your dataframe, use `st.dataframe`. Users can sort and search through data rendered with `st.dataframe`. Additionally, you can activate selections to work with users' row and column selections.

This tutorial uses row selections which were introduced in Streamlit version 1.35.0. For an older workaround using `st.data_editor`, see [Get dataframe row-selections (`streamlit<1.35.0`)](/develop/tutorials/elements/dataframe-row-selections-old).

## Applied concepts

- Use dataframe row-selections to filter a dataframe.

## Prerequisites

- The following must be installed in your Python environment:

  ```text
  streamlit>=1.35.0
  ```

- You should have an empty entrypoint file (`your-repository/app.py`) that is already running.

  ```bash
  cd your-repository
  streamlit run app.py
  ```

- You should have a basic understanding of fragments and `st.dataframe`.

## Summary

In this example, you'll build an app that displays a table of members and their activity for an imaginary organization. Within the table, a user can select one or more rows to create a filtered view. Your app will show a combined chart that compares the selected employees.

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

    ```python
    import random

    import numpy as np
    import pandas as pd
    import streamlit as st


    @st.cache_data
    def get_profile_dataset(number_of_items: int = 20, seed: int = 0) -> pd.DataFrame:
        from faker import Faker

        new_data = []

        fake = Faker()
        random.seed(seed)
        Faker.seed(seed)

        for i in range(number_of_items):
            profile = fake.profile()
            new_data.append(
                {
                    "avatar": f"https://picsum.photos/400/200?lock={i}",
                    "name": profile["name"],
                    "daily_activity": np.random.rand(25),
                    "activity": np.random.randint(2, 90, size=12),
                }
            )

        profile_df = pd.DataFrame(new_data)
        return profile_df


    column_configuration = {
        "name": st.column_config.TextColumn(
            "Name", help="The name of the user", max_chars=100, width="medium"
        ),
        "avatar": st.column_config.ImageColumn("Avatar", help="The user's avatar"),
        "activity": st.column_config.LineChartColumn(
            "Activity (1 year)",
            help="The user's activity over the last 1 year",
            width="large",
            y_min=0,
            y_max=100,
        ),
        "daily_activity": st.column_config.BarChartColumn(
            "Activity (daily)",
            help="The user's activity in the last 25 days",
            width="medium",
            y_min=0,
            y_max=1,
        ),
    }

    select, compare = st.tabs(["Select members", "Compare selected"])

    with select:
        st.header("All members")

        df = get_profile_dataset()

        event = st.dataframe(
            df,
            column_config=column_configuration,
            use_container_width=True,
            hide_index=True,
            on_select="rerun",
            selection_mode="multi-row",
        )

        st.header("Selected members")
        people = event.selection.rows
        filtered_df = df.iloc[people]
        st.dataframe(
            filtered_df,
            column_config=column_configuration,
            use_container_width=True,
        )

    with compare:
        activity_df = {}
        for person in people:
            activity_df[df.iloc[person]["name"]] = df.iloc[person]["activity"]
        activity_df = pd.DataFrame(activity_df)

        daily_activity_df = {}
        for person in people:
            daily_activity_df[df.iloc[person]["name"]] = df.iloc[person]["daily_activity"]
        daily_activity_df = pd.DataFrame(daily_activity_df)

        if len(people) > 0:
            st.header("Daily activity comparison")
            st.bar_chart(daily_activity_df)
            st.header("Yearly activity comparison")
            st.line_chart(activity_df)
        else:
            st.markdown("No members selected.")
    ```

</Collapse>

<Cloud name="doc-tutorial-dataframe-row-selections" height="600px" />
