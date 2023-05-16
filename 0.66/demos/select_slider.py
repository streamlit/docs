import streamlit as st

def select_slider():
    st.write(
        """
        # Introducing st.select_slider

        With `st.select_slider`, you can now display a slider using values from a list or object.
        This functions similarly to **[st.slider](https://docs.streamlit.io/en/stable/api.html#streamlit.slider)**
        but for discrete and/or non-numerical data. Please note that values are not sorted and will be listed in the order they are provided.

        For more details, please see our [documentation](https://docs.streamlit.io/en/stable/api.html#streamlit.select_slider)
        """
    )


    with st.echo("below"):
        st.write("### Example 1: ###")
        w1 = st.select_slider(
            "Label 1",
            options=['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
        )
        st.write("Selected value:", w1)

    with st.echo("below"):
        st.write("### Example 2:###")
        w2 = st.select_slider(
            "Label 1",
            options=[10, 40, 50, 90, 121, 800, 1000],
            value=(40, 121)
        )
        st.write("Selected value:", w2)
