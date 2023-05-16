import streamlit as st
import plotly.express as px

def chart_fullscreen():
    st.write(
        """
        # Optimize initial chart rendering

        Previously our charts were rendering multiple times on page load. This
        caused some issues with a subset of features available in plotly charts.
        To resolve this, we have optimized the charts to render once on page load.

        -----

        ### Example
        """
    )

    with st.echo("below"):
        y_data = [0.2211651, 0.65165161, 0.65165464, 0.6546549849]
        x_data = ["Group 1", "Group 2", "Group 3", "Group 4"]
        fig = px.bar(x=x_data, y=y_data)
        st.plotly_chart(fig, use_container_width=True)
