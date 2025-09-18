---
title: Get dataframe row-selections from users
slug: /develop/tutorials/elements/dataframe-row-selections
description: Learn how to get row selections from users in Streamlit dataframes using st.dataframe selection features for interactive data exploration.
keywords: dataframe selections, row selections, st.dataframe, interactive dataframes, user selections, data exploration, dataframe tutorial
---

# Get dataframe row-selections from users

Streamlit offers two commands for rendering beautiful, interactive dataframes in your app. If you need users to edit data, add rows, or delete rows, use `st.data_editor`. If you don't want users to change the data in your dataframe, use `st.dataframe`. Users can sort and search through data rendered with `st.dataframe`. Additionally, you can activate selections to work with users' row and column selections.

This tutorial uses row selections, which were introduced in Streamlit version 1.35.0. For an older workaround using `st.data_editor`, see [Get dataframe row-selections (`streamlit<1.35.0`)](/develop/tutorials/elements/dataframe-row-selections-old).

## Applied concepts

- Use dataframe row selections to filter a dataframe.

## Prerequisites

- This tutorial requires the following version of Streamlit:

  ```text
  streamlit>=1.35.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of caching and `st.dataframe`.

## Summary

In this example, you'll build an app that displays a table of members and their activity for an imaginary organization. Within the table, a user can select one or more rows to create a filtered view. Your app will show a combined chart that compares the selected employees.

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

    ```python
    import numpy as np
    import pandas as pd
    import streamlit as st

    from faker import Faker

    @st.cache_data
    def get_profile_dataset(number_of_items: int = 20, seed: int = 0) -> pd.DataFrame:
        new_data = []

        fake = Faker()
        np.random.seed(seed)
        Faker.seed(seed)

        for i in range(number_of_items):
            profile = fake.profile()
            new_data.append(
                {
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

## Build the example

### Initialize your app

1. In `your_repository`, create a file named `app.py`.
1. In a terminal, change directories to `your_repository`, and start your app:

   ```bash
   streamlit run app.py
   ```

   Your app will be blank because you still need to add code.

1. In `app.py`, write the following:

   ```python
   import numpy as np
   import pandas as pd
   import streamlit as st

   from faker import Faker
   ```

   You'll be using these libraries as follows:
   - You'll generate random member names with `faker`.
   - You'll generate random activity data with `numpy`.
   - You'll manipulate the data with `pandas`.

1. Save your `app.py` file, and view your running app.
1. In your app, select "**Always rerun**", or press the "**A**" key.

   Your preview will be blank but will automatically update as you save changes to `app.py`.

1. Return to your code.

### Build a function to create random member data

To begin with, you'll define a function to randomly generate some member data. It's okay to skip this section if you just want to copy the function.

<Collapse title="Complete function to randomly generate member data" expanded={false}>

    ```python
    @st.cache_data
    def get_profile_dataset(number_of_items: int = 20, seed: int = 0) -> pd.DataFrame:
        new_data = []

        fake = Faker()
        np.random.seed(seed)
        Faker.seed(seed)

        for i in range(number_of_items):
            profile = fake.profile()
            new_data.append(
                {
                    "name": profile["name"],
                    "daily_activity": np.random.rand(25),
                    "activity": np.random.randint(2, 90, size=12),
                }
            )

        profile_df = pd.DataFrame(new_data)
        return profile_df
    ```

</Collapse>

1. Use an `@st.cache_data` decorator and start your function definition.

   ```python
   @st.cache_data
   def get_profile_dataset(number_of_items: int = 20, seed: int = 0) -> pd.DataFrame:
   ```

   The `@st.cache_data` decorator turns `get_profile_dataset()` into a cached function. Streamlit saves the output of a cached function to reuse when the cached function is called again with the same inputs. This keeps your app performant when rerunning as part of Streamlit's execution model. For more information, see [Caching](/develop/concepts/architecture/caching).

   The `get_profile_dataset` function has two parameters to configure the size of the data set and the seed for random generation. This example will use the default values (20 members in the set with a seed of 0). The function will return a `pandas.DataFrame`.

1. Initialize an empty list to store data.

   ```python
       new_data = []
   ```

1. Initialize the random generators.

   ```python
       fake = Faker()
       random.seed(seed)
       Faker.seed(seed)
   ```

1. Iterate through a range to generate new member data as a dictionary and append it to your list.

   ```python
       for i in range(number_of_items):
           profile = fake.profile()
           new_data.append(
               {
                   "name": profile["name"],
                   "daily_activity": np.random.rand(25),
                   "activity": np.random.randint(2, 90, size=12),
               }
           )
   ```

   For `daily_activity`, you're generating an array of length 25. These values are floats in the interval `[0,1)`. For `activity`, you're generating an array of length 12. These values are integers in the interval `[2,90)`.

1. Convert your list of dictionaries to a single `pandas.DataFrame` and return it.

   ```python
       profile_df = pd.DataFrame(new_data)
       return profile_df
   ```

1. Optional: Test out your function by calling it and displaying the data.

   ```python
   st.dataframe(get_profile_dataset())
   ```

   Save your `app.py` file to see the preview. Delete this line before you continue.

### Display your data with multi-row selections enabled

1. Define your column configuration to format your data.

   ```python
   column_configuration = {
       "name": st.column_config.TextColumn(
           "Name", help="The name of the user", max_chars=100, width="medium"
       ),
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
   ```

   For each column of your dataframe, this defines nicely formatted column name, tooltip, and column width. You'll use a line chart to show yearly activity, and a bar chart to show daily activity.

1. Insert a header to identify the data you will display.

   ```python
   st.header("All members")
   ```

1. Store your data in a convenient variable.

   ```python
   df = get_profile_dataset()
   ```

1. Display your dataframe with selections activated.

   ```python
   event = st.dataframe(
       df,
       column_config=column_configuration,
       use_container_width=True,
       hide_index=True,
       on_select="rerun",
       selection_mode="multi-row",
   )
   ```

   By setting `on_selection="rerun"`, you've activated selections for the dataframe. `selection_mode="multi_row"` specifies the type of selections allowed (multiple rows, no columns). `event` stores the selection data from the user. Selections can be accessed from the `event.selection` attribute.

### Display the selected data

1. Insert a header to identify the subset of data you will display.

   ```python
   st.header("Selected members")
   ```

1. Get the list of selected rows and filter your dataframe.

   ```python
   people = event.selection.rows
   filtered_df = df.iloc[people]
   ```

   Row selections are returned by positional index. You should use pandas methods `.iloc[]` or `.iat[]` to retrieve rows.

1. Display the selected rows in a new dataframe.

   ```python
       st.dataframe(
           filtered_df,
           column_config=column_configuration,
           use_container_width=True,
       )
   ```

   For consistency, reuse the existing column configuration.

1. Optional: Save your file and test it out. Try selecting some rows in your app, and then return to your code.

### Combine activity data for the selected rows

1. Create an empty dictionary to store (yearly) activity data.

   ```python
   activity_df = {}
   ```

1. Iterate through selected rows and save each member's activity in the dictionary indexed by their name.

   ```python
   for person in people:
       activity_df[df.iloc[person]["name"]] = df.iloc[person]["activity"]
   ```

1. Convert the activity dictionary into a `pandas.DataFrame`.

   ```python
   activity_df = pd.DataFrame(activity_df)
   ```

1. Repeat the previous three steps similarly for daily activity.

   ```python
   daily_activity_df = {}
   for person in people:
       daily_activity_df[df.iloc[person]["name"]] = df.iloc[person]["daily_activity"]
   daily_activity_df = pd.DataFrame(daily_activity_df)
   ```

1. Optional: Test out your combined data by displaying it.

   ```python
   st.dataframe(activity_df)
   st.dataframe(daily_activity_df)
   ```

   Save your `app.py` file to see the preview. Delete these two lines before you continue.

### Use charts to visualize the activity comparison

1. Start a conditional block to check if anyone is currently selected.

   ```python
   if len(people) > 0:
   ```

   Since no members are selected when the app loads, this check will prevent empty charts from being displayed.

1. Add a header to identify your first chart.

   ```python
       st.header("Daily activity comparison")
   ```

1. Show the daily activity comparison in a bar chart.

   ```python
       st.bar_chart(daily_activity_df)
   ```

1. Similarly, for yearly activity, add a header and line chart.

   ```python
       st.header("Yearly activity comparison")
       st.line_chart(activity_df)
   ```

1. Complete the conditional block with a default message to show when no members are selected.

   ```python
   else:
       st.markdown("No members selected.")
   ```

### Make it pretty

You should have a functioning app at this point. Now you can beautify it. In this section, you'll separate the selection UI from the comparison by using `st.tabs`.

1. Immediately after the column configuration definition, insert two tabs.

   ```python
   select, compare = st.tabs(["Select members", "Compare selected"])
   ```

1. Indent the code following the line in the previous step and group it into the two new tabs.

   ```python
   with select: # Add select tab #############################################
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

   with compare: # Add compare tab ###########################################
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

1. Save your file and try out your completed example.
