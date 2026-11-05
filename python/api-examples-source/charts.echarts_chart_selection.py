import pandas as pd
import streamlit as st

df = pd.DataFrame(
    {
        "day": ["Mon", "Tue", "Wed", "Thu", "Fri"],
        "sales": [120, 200, 150, 80, 70],
    }
)

event = st.echarts_chart(
    {
        "dataset": {"source": df},
        "xAxis": {"type": "category"},
        "yAxis": {"type": "value"},
        "series": [{"type": "bar", "selectedMode": "multiple"}],
    },
    key="sales",
    on_select="rerun",
)

rows = [
    i for group in event.selection.selected for i in group["data_indices"]
]
st.dataframe(df.iloc[rows])
