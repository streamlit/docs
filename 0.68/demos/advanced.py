from streamlit import area_chart
from streamlit import bar_chart
from streamlit import line_chart

import streamlit as st
import pandas as pd
import numpy as np
import random

def advanced():
    st.write("""
    # Layouts: Best Practices

    Finally, we're introducing a new syntax to help you manage all these new
    containers: with container. Instead of making function calls directly on
    the container, use the container as a Context Manager (`with`) and call
    functions from the `st.` namespace!

    In order to use custom components, we recommend using `with`.

    ----

    ### Example
    """)

    with st.echo():
        charts = [area_chart, bar_chart, line_chart]
        def make_chart():
            chart_data = pd.DataFrame(
                np.random.randn(20, 3),
                columns=['a', 'b', 'c']
            )
            random.choice(charts)(chart_data)

        for i in range(1, 3):
            cols = st.beta_columns(2)
            for col in cols:
                with col:
                    make_chart()
