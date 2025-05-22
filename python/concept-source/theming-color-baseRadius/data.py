import streamlit as st

chart_data = st.session_state.chart_data
st.header("Data elements")

display_type = st.segmented_control("Display type", ["Dataframe", "Data editor", "Table", "JSON"], default="Dataframe")

cols = st.columns(3)
event = None
if display_type == "Dataframe":
    st.info("Select rows to compute metrics for a subset of the data.")
    event = st.dataframe(chart_data, use_container_width=True, on_select="rerun", selection_mode="multi-row")
elif display_type == "Data editor":
    st.data_editor(chart_data, num_rows="dynamic", use_container_width=True)
elif display_type == "Table":
    st.table(chart_data)
elif display_type == "JSON":
    st.json(chart_data.to_dict(orient="records"), expanded=True)

metric_values = {}
if event is not None and event.selection.rows:
    metric_values["a_value"] = chart_data["a"].iloc[event.selection.rows].mean()
    metric_values["a_delta"] = metric_values["a_value"] - chart_data["a"].mean()
    metric_values["b_value"] = chart_data["b"].iloc[event.selection.rows].mean()
    metric_values["b_delta"] = metric_values["b_value"] - chart_data["b"].mean()
    metric_values["c_value"] = chart_data["c"].iloc[event.selection.rows].mean()
    metric_values["c_delta"] = metric_values["c_value"] - chart_data["c"].mean()
else:
    metric_values["a_value"] = chart_data["a"].mean()
    metric_values["a_delta"] = chart_data["a"].std()
    metric_values["b_value"] = chart_data["b"].mean()
    metric_values["b_delta"] = -chart_data["b"].std()
    metric_values["c_value"] = chart_data["c"].mean()
    metric_values["c_delta"] = 0

cols[0].metric(
    "Metric A",
    round(metric_values["a_value"],4),
    round(metric_values["a_delta"], 4),
    border=True
)
cols[1].metric(
    "Metric B",
    round(metric_values["b_value"],4),
    round(metric_values["b_delta"], 4),
    border=True
)
cols[2].metric(
    "Metric C",
    round(metric_values["c_value"],4),
    round(metric_values["c_delta"], 4),
    border=True
)