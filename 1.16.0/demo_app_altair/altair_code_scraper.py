""" Useful code to collect Altair chart codes automatically.
It's actually a Streamlit app.
To run it just run 'streamlit run altair_code_scraper.py'
"""

import random
from pathlib import Path
from typing import List

import requests
import streamlit as st
from bs4 import BeautifulSoup

st.title("Testing Altair theming")
urls = [
    "simple_bar_chart.html",
    "simple_heatmap.html",
    "simple_histogram.html",
    "simple_line_chart.html",
    "scatter_tooltips.html",
    "simple_stacked_area_chart.html",
    "strip_plot.html",
    "bar_chart_with_highlighted_bar.html",
    "bar_chart_with_labels.html",
    "bar_chart_with_mean_line.html",
    "bar_and_line_with_dual_axis.html",
    "bar_chart_with_negatives.html",
    "bar_with_rolling_mean.html",
    "bar_rounded.html",
    "layered_chart_bar_mark.html",
    "percentage_of_total.html",
    "bar_chart_trellis_compact.html",
    "diverging_stacked_bar_chart.html",
    "grouped_bar_chart.html",
    "grouped_bar_chart_with_error_bars.html",
    "bar_chart_horizontal.html",
    "grouped_bar_chart_horizontal.html",
    "horizontal_stacked_bar_chart.html",
    "layered_bar_chart.html",
    "normalized_stacked_bar_chart.html",
    "bar_chart_sorted.html",
    "stacked_bar_chart.html",
    "stacked_bar_chart_sorted_segments.html",
    "stacked_bar_chart_with_text.html",
    "trellis_stacked_bar_chart.html",
    "bump_chart.html",
    "filled_step_chart.html",
    "line_with_ci.html",
    "line_chart_with_cumsum.html",
    "layer_line_color_rule.html",
    "line_with_log_scale.html",
    "line_percent.html",
    "line_chart_with_points.html",
    "line_chart_with_generator.html",
    "trail_marker.html",
    "line_chart_with_datum.html",
    "line_chart_with_color_datum.html",
    "multi_series_line.html",
    "slope_graph.html",
    "step_chart.html",
    "area_chart_gradient.html",
    "cumulative_count_chart.html",
    "density_facet.html",
    "horizon_graph.html",
    "interval_selection.html",
    "layered_area_chart.html",
    "normalized_stacked_area_chart.html",
    "density_stack.html",
    "streamgraph.html",
    "trellis_area.html",
    "trellis_area_sort_array.html",
    "donut_chart.html",
    "pacman_chart.html",
    "pie_chart.html",
    "pie_chart_with_labels.html",
    "radial_chart.html",
    "binned_scatterplot.html",
    "scatter_linked_table.html",
    "bubble_plot.html",
    "connected_scatterplot.html",
    "dot_dash_plot.html",
    "multifeature_scatter_plot.html",
    "poly_fit_regression.html",
    "scatter_qq.html",
    "scatter_matrix.html",
    "scatter_href.html",
    "scatter_with_loess.html",
    "scatter_with_minimap.html",
    "scatter_with_rolling_mean.html",
    "simple_scatter_with_errorbars.html",
    "scatter_with_labels.html",
    "stripplot.html",
    "table_bubble_plot_github.html",
    "trellis_scatter_plot.html",
    "wind_vector_map.html",
    "histogram_responsive.html",
    "histogram_with_a_global_mean_overlay.html",
    "layered_histogram.html",
    "trellis_histogram.html",
    "choropleth.html",
    "airports_count.html",
    "choropleth_repeat.html",
    "us_incomebrackets_by_state_facet.html",
    "world_map.html",
    "world_projections.html",
    "selection_layer_bar_month.html",
    "interactive_cross_highlight.html",
    "interactive_layered_crossfilter.html",
    "interactive_legend.html",
    "interactive_brush.html",
    "scatter_with_layered_histogram.html",
    "multiline_highlight.html",
    "multiline_tooltip.html",
    "scatter_linked_brush.html",
    "multiple_interactions.html",
    "scatter_with_histogram.html",
    "select_detail.html",
    "selection_histogram.html",
    "interactive_scatter_plot.html",
    "select_mark_area.html",
    "anscombe_plot.html",
    "co2_concentration.html",
    "beckers_barley_trellis_plot.html",
    "airport_connections.html",
    "cumulative_wiki_donations.html",
    "falkensee.html",
    "gapminder_bubble_plot.html",
    "iowa_electricity.html",
    "isotype.html",
    "isotype_emoji.html",
    "airports.html",
    "london_tube.html",
    "natural_disasters.html",
    "one_dot_per_zipcode.html",
    "weather_heatmap.html",
    "seattle_weather_interactive.html",
    "us_employment.html",
    "top_k_items.html",
    "top_k_letters.html",
    "top_k_with_others.html",
    "us_state_capitals.html",
    "us_population_over_time.html",
    "us_population_pyramid_over_time.html",
    "us_population_over_time_facet.html",
    "wheat_wages.html",
    "window_rank.html",
    "bar_chart_with_highlighted_segment.html",
    "beckers_barley_wrapped_facet.html",
    "binned_heatmap.html",
    "boxplot.html",
    "candlestick_chart.html",
    "comet_chart.html",
    "errorbars_with_std.html",
    "errorbars_with_ci.html",
    "scatter_marginal_hist.html",
    "gantt_chart.html",
    "hexbins.html",
    "image_tooltip.html",
    "isotype_grid.html",
    "layered_chart_with_dual_axis.html",
    "multiple_marks.html",
    "normed_parallel_coordinates.html",
    "parallel_coordinates.html",
    "pyramid.html",
    "ranged_dot_plot.html",
    "ridgeline_plot.html",
    "sorted_error_bars_with_ci.html",
    "stem_and_leaf.html",
    "layered_heatmap_text.html",
    "violin_plot.html",
    "wilkinson-dot-plot.html",
]

urls = ["https://altair-viz.github.io/gallery/" + url for url in urls]


SCRIPT_PREFIX = """import streamlit as st
import altair as alt
import inspect
from vega_datasets import data
"""

CODE_BLOCK_SUFFIX = """
tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])

with tab1:
    st.altair_chart(chart, theme="streamlit", use_container_width=True)
with tab2:
    st.altair_chart(chart, theme=None, use_container_width=True)
"""

CODE_BLOCK_FORMATTER = """
@st.experimental_memo
def get_chart_{}(use_container_width: bool):
    {}
    {}

try:
    st.expander("See code").code(inspect.getsource(get_chart_{}))
    get_chart_{}(use_container_width=True)
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

        # Add 'chart' variable name to last code line
        index = len(code_block_raw) - code_block_raw[::-1].index("\n\n")
        code_block_raw = code_block_raw[:index] + "chart = " + code_block_raw[index:]
        function_index = random.randint(1, 100_000)
        code_block = CODE_BLOCK_FORMATTER.format(
            function_index,
            "\n    ".join([row for row in code_block_raw.splitlines()]),
            "\n    ".join(CODE_BLOCK_SUFFIX.splitlines()),
            function_index,
            function_index,
        )

        all_code_blocks += [code_block]
    return all_code_blocks


for index, url in enumerate(urls):
    charts_code = get_charts_code(url)
    charts_category = url.split("/")[-1].replace("-", "_").title()
    charts_file = Path("pages") / Path(
        f"{index}_{charts_category.replace('.Html', '')}.py"
    )
    if charts_file.exists():
        charts_file.unlink()

    with charts_file.open("w") as file:
        file.write(SCRIPT_PREFIX)
        file.write("\n".join(charts_code))
