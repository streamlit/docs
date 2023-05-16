import streamlit as st
import os
import io

def bar_chart():
    st.write(
        """
        # Updated bar charts for discrete values

        Previously our implementation of bar chart did not define the data type
        for the x-axis as discrete or continuous values. This resulted in a
        less visually appealing chart.

        With this release, we've corrected our use of altair charts to define the
        data as discrete values when data is NOT date/time. This results in
        nicer looking bars in the chart.

        -----

        ### Example
        """
    )

    with st.echo("below"):
        st.bar_chart({"d6": [1, 5, 2, 6, 2, 1]})

        st.write("### Code")
