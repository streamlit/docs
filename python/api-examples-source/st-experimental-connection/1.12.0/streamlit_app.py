import itertools

import streamlit as st
from vega_datasets import data
import pandas as pd
import numpy as np


st.set_page_config(page_title="Charts demo", page_icon="📊")

def icon(emoji: str):
    """Shows an emoji as a Notion-style page icon."""
    st.write(
        f'<span style="font-size: 78px; line-height: 1">{emoji}</span>',
        unsafe_allow_html=True,
    )
    
HEADER_COLOR_CYCLE = itertools.cycle(
    [
        "#00c0f2",  # light-blue-70",
        "#ffbd45",  # "orange-70",
        "#00d4b1",  # "blue-green-70",
        "#1c83e1",  # "blue-70",
        "#803df5",  # "violet-70",
        "#ff4b4b",  # "red-70",
        "#21c354",  # "green-70",
        "#faca2b",  # "yellow-80",
    ]
)
    
def colored_header(label, description=None, color=None):
    """Shows a header with a colored underline and an optional description."""
    st.write("")
    if color is None:
        color = next(HEADER_COLOR_CYCLE)
    st.subheader(label)
    st.write(
        f'<hr style="background-color: {color}; margin-top: 0; margin-bottom: 0; height: 3px; border: none; border-radius: 3px;">',
        unsafe_allow_html=True,
    )
    if description:
        st.caption(description)
    
icon("📊")
"""
# Charts demo

In [Streamlit 1.12.0](https://discuss.streamlit.io/t/version-1-12-0/29078), we gave our 
built-in charts a new look and parameters `x` and `y`! Read more in our 
[blog post](https://blog.streamlit.io/built-in-charts-get-a-new-look-and-parameters/). 
You can find the code for this demo 
[here](https://github.com/streamlit/release-demos/blob/master/1.12.0/streamlit_app.py).
"""

colored_header("🧶 st.line_chart")
with st.expander("Show code"):
    st.code(
        """
chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"])
st.line_chart(chart_data)
"""
    )

chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"])
st.line_chart(chart_data)

colored_header("🏔 st.area_chart")
with st.expander("Show code"):
    st.code(
        """
chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"])
st.area_chart(chart_data)
"""
    )

chart_data = pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"])
st.area_chart(chart_data)

colored_header("🍫 st.bar_chart")
with st.expander("Show code"):
    st.code(
        """
chart_data = pd.DataFrame(np.random.randn(50, 3), columns=["a", "b", "c"])
st.bar_chart(chart_data)
"""
    )
    
chart_data = pd.DataFrame(np.random.randn(50, 3), columns=["a", "b", "c"])
st.bar_chart(chart_data)


colored_header("🏗️ Chart builder")
st.write("Build your own chart, using a [Vega dataset](https://vega.github.io/vega-datasets/) and the new `x` and `y` parameters.")


@st.experimental_memo
def get_dataset(dataset_name: str):
    dataset_name = dataset_name.replace("-", "_")
    dataset = getattr(data, dataset_name)
    return dataset, dataset()

IGNORELIST = [
    "earthquakes",
    "ffox",
    "gimp",
    "graticule",
    "world-110m",
    "us-10m",
    "movies",
    "miserables",
    "londonTubeLines",
    "londonBoroughs",
    "annual-precip",
    "7zip",
]
datasets = data.list_datasets()

datasets = [
    dataset_name
    for dataset_name in data.list_datasets()
    if dataset_name not in IGNORELIST
]

upload_own = "Upload your own dataset"
stocks_wide = "stocks - wide-format"
dataset_options = [upload_own, stocks_wide]
dataset_options.extend(datasets)
selected_dataset_name = st.selectbox(
    "Select a dataset",
    options=dataset_options,
    index=dataset_options.index(str(stocks_wide)),
)

selected_dataset_df = pd.DataFrame()
selected_dataset_code = ""

if selected_dataset_name == upload_own:
    selected_dataset_code = 'return pd.read_csv("PATH_TO_YOUR_CSV", sep=None)'
    uploaded_file = st.file_uploader("Load a CSV file", type="csv")
    if uploaded_file:
        selected_dataset_df = pd.read_csv(uploaded_file, sep=None)
elif selected_dataset_name == stocks_wide:
    selected_dataset_code = 'dataset_df = data.stocks()\n    return dataset_df.pivot(index="date", columns="symbol", values="price")'
    selected_dataset, selected_dataset_df = get_dataset("stocks")

    if selected_dataset.description:
        st.caption(selected_dataset.description)

    selected_dataset_df = selected_dataset_df.pivot(
        index="date", columns="symbol", values="price"
    )
else:
    selected_dataset_code = f"return data.{selected_dataset_name}()"
    selected_dataset, selected_dataset_df = get_dataset(selected_dataset_name)

    if selected_dataset.description:
        st.caption(selected_dataset.description)
        
        
st.dataframe(selected_dataset_df.head(min(len(selected_dataset_df), 1000)))
col1, col2, col3 = st.columns(3)
with col1:
    options = [""]
    options.extend(selected_dataset_df.columns)
    selected_x = st.selectbox("Select column for x", options=options)
    if not selected_x:
        selected_x = None
with col2:
    selected_y = st.multiselect(
        "Select column(s) for y", options=selected_dataset_df.columns
    )
    if not selected_y:
        selected_y = None
    elif len(selected_y) == 1:
        selected_y = selected_y[0]

with col3:
    selected_chart = st.selectbox(
        "Select chart type", options=["line_chart", "area_chart", "bar_chart"]
    )

st.write("")
st.write("And here's your chart:")
try:
    chart_command = getattr(st, selected_chart)
    chart_command(
        selected_dataset_df, x=selected_x, y=selected_y, use_container_width=True
    )
except st.StreamlitAPIException as e:
    st.error(e)

x_parameter = f' x="{selected_x}",' if selected_x else ""
y_parameter = ""
if selected_y and isinstance(selected_y, str):
    y_parameter = f' y="{selected_y}",'
elif selected_y:
    y_parameter = f" y={selected_y},"


# if not x_parameter and not y_parameter:
#     parameters_text = "df"
# else:
parameters_text = f"df,{x_parameter}{y_parameter}"
if parameters_text[-1] == ",":
    parameters_text = parameters_text[:-1]    
st.write("You can create this chart in your app with the following code:")
st.code(
    f"""
import streamlit as st
from vega_datasets import data

@st.experimental_memo
def get_dataset():
    {selected_dataset_code}
    
df = get_dataset()
st.{selected_chart}({parameters_text})
"""
)
