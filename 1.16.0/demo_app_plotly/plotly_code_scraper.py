""" Useful code to collect Plotly chart codes automatically.
It's actually a Streamlit app.
To run it just run 'streamlit run plotly_code_scraper.py'
"""

import random
from pathlib import Path
from typing import List

import requests
import streamlit as st
from bs4 import BeautifulSoup

st.title("Testing Plotly theming")
urls = [
    "https://plotly.com/python/line-and-scatter",
    "https://plotly.com/python/line-charts",
    "https://plotly.com/python/bar-charts",
    "https://plotly.com/python/dot-plots",
    "https://plotly.com/python/pie-charts",
    "https://plotly.com/python/bubble-charts",
    "https://plotly.com/python/filled-area-plots",
    "https://plotly.com/python/horizontal-bar-charts",
    "https://plotly.com/python/gantt",
    "https://plotly.com/python/sunburst-charts",
    "https://plotly.com/python/table",
    "https://plotly.com/python/sankey-diagram",
    "https://plotly.com/python/heatmaps",
    "https://plotly.com/python/contour-plots",
    "https://plotly.com/python/time-series",
    "https://plotly.com/python/candlestick-charts",
    "https://plotly.com/python/waterfall-charts",
    "https://plotly.com/python/funnel-charts",
    "https://plotly.com/python/figure-factory-subplots",
    "https://plotly.com/python/histograms",
    "https://plotly.com/python/distplot",
    "https://plotly.com/python/ternary-plots",
    "https://plotly.com/python/histograms",
    "https://plotly.com/python/icicle-charts",
    "https://plotly.com/python/sankey-diagram",
    "https://plotly.com/python/sunburst-charts",
    "https://plotly.com/python/treemaps",
]


SCRIPT_PREFIX = """import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect
"""

CODE_BLOCK_SUFFIX = """
tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
with tab1:
    st.plotly_chart(fig, theme="streamlit")
with tab2:
    st.plotly_chart(fig, theme=None)
"""

CODE_BLOCK_FORMATTER = """
@st.experimental_memo
def get_chart_{}():
    {}
    {}

try:
    st.expander("See code").code(inspect.getsource(get_chart_{}))
    get_chart_{}()
except Exception as e:
    st.exception(e)

"""


@st.experimental_memo
def get_charts_code(url: str) -> List:
    html = requests.get(url).content
    soup = BeautifulSoup(html, "html.parser")
    all_pres = list(soup.find_all("pre"))
    all_code_blocks = list()
    for pre in all_pres:
        code_block_raw = pre.get_text()

        if "dash" in code_block_raw or "fig" not in code_block_raw:
            continue

        function_index = random.randint(1, 100_000_000)
        code_block = CODE_BLOCK_FORMATTER.format(
            function_index,
            "\n    ".join(
                [row for row in code_block_raw.splitlines() if "fig.show" not in row]
            ),
            "\n    ".join(CODE_BLOCK_SUFFIX.splitlines()),
            function_index,
            function_index,
        )

        all_code_blocks += [code_block]
    return all_code_blocks


for url in urls:
    charts_code = get_charts_code(url)
    charts_category = url.split("/")[-1].replace("-", "_").title()
    charts_file = Path("pages") / Path(f"{charts_category}.py")
    if charts_file.exists():
        charts_file.unlink()

    with charts_file.open("w") as file:
        file.write(SCRIPT_PREFIX)
        file.write("\n".join(charts_code))
