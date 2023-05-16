import numpy as np
import streamlit as st

st.set_page_config(layout="wide", page_title="Data Editor", page_icon="🧮")
st.title("🧬 Data Types")
st.caption("This is a demo of the `st.experimental_data_editor`.")

"""
The data editor supports a lot of data structures beyond dataframes: think numpy array, sets, dicts... and more!
"""

col1, col2 = st.columns(2)
with col1:
    st.markdown("**Set of values - `Set[Primitive]`:**")
    with st.expander("Code Example"):
        st.code(
            """
st.experimental_data_editor({"st.text_area", "st.markdown"}, num_rows="dynamic")
        """
        )
    result = st.experimental_data_editor(
        {"st.text_area", "st.markdown"},
        use_container_width=True,
        num_rows="dynamic",
        key="edit_set_of_strings",
    )

    with st.expander("Edited Data"):
        st.write(f"Type: {type(result)}")
        st.json(result)

with col2:
    st.markdown("**List of values - `List[Primitive]`:**")
    with st.expander("Code Example"):
        st.code(
            """
st.experimental_data_editor([4.92, 47.22], num_rows="dynamic")
        """
        )

    result = st.experimental_data_editor(
        [4.92, 47.22],
        use_container_width=True,
        num_rows="dynamic",
        key="edit_list_of_ints",
    )

    with st.expander("Edited Data"):
        st.write(f"Type: {type(result)}")
        st.json(result)

st.markdown("---")

col1, col2 = st.columns(2)
with col1:
    st.markdown("**List of records - `List[Dict[str, Any]]`:**")
    with st.expander("Code Example"):
        st.code(
            """
st.experimental_data_editor([
    {"name": "st.text_area", "type": "widget"},
    {"name": "st.markdown", "type": "element"},
])
        """
        )
    result = st.experimental_data_editor(
        [
            {"name": "st.text_area", "type": "widget"},
            {"name": "st.markdown", "type": "element"},
        ],
        use_container_width=True,
        key="edit_list_of_records",
    )

    with st.expander("Edited Data"):
        st.write(f"Type: {type(result)}")
        st.json(result)

with col2:
    st.markdown("**Key-value dict - `Dict[str, Primitive]`:**")
    with st.expander("Code Example"):
        st.code(
            """
st.experimental_data_editor({
	"st.text_area": "widget",
	"st.markdown": "element"
})
        """
        )

    result = st.experimental_data_editor(
        {"st.text_area": "widget", "st.markdown": "element"},
        use_container_width=True,
        key="edit_key_value_dict",
    )

    with st.expander("Edited Data"):
        st.write(f"Type: {type(result)}")
        st.json(result)

st.markdown("---")

col1, col2 = st.columns(2)
with col1:
    st.markdown("**Column-value mapping - `Dict[str, List[Any]]`:**")
    with st.expander("Code Example"):
        st.code(
            """
st.experimental_data_editor({
    "name": ["st.text_area", "st.markdown"],
    "type": ["widget", "element"],
})
        """
        )
    result = st.experimental_data_editor(
        {
            "name": ["st.text_area", "st.markdown"],
            "type": ["widget", "element"],
        },
        use_container_width=True,
        key="edit_column_value_mapping",
    )

    with st.expander("Edited Data"):
        st.write(f"Type: {type(result)}")
        st.write(result)

with col2:
    st.markdown("**Column-index mapping - `Dict[str, Dict]`:**")
    with st.expander("Code Example"):
        st.code(
            """
st.experimental_data_editor({
    "type": {"st.text_area": "widget", "st.markdown": "element"},
    "usage": {"st.text_area": 4.92, "st.markdown": 47.22},
})
        """
        )

    result = st.experimental_data_editor(
        {
            "type": {"st.text_area": "widget", "st.markdown": "element"},
            "usage": {"st.text_area": 4.92, "st.markdown": 47.22},
        },
        use_container_width=True,
        key="edit_column_index_mapping",
    )

    with st.expander("Edited Data"):
        st.write(f"Type: {type(result)}")
        st.json(result)

st.markdown("---")


col1, col2 = st.columns(2)
with col1:
    st.markdown("**List of rows - `List[List[Primitive]`:**")
    with st.expander("Code Example"):
        st.code(
            """
st.experimental_data_editor([
	["st.text_area", "widget"],
	["st.markdown", "element"]
])
        """
        )

    result = st.experimental_data_editor(
        [["st.text_area", "widget"], ["st.markdown", "element"]],
        use_container_width=True,
        key="edit_list_of_rows",
    )

    with st.expander("Edited Data"):
        st.write(f"Type: {type(result)}")
        st.json(result)

with col2:
    st.markdown("**Numpy ndarray - `np.ndarray`:**")
    with st.expander("Code Example"):
        st.code(
            """
st.experimental_data_editor(np.array([
	["st.text_area", "widget", 4.92],
	["st.markdown", "element", 47.22]
]))
        """
        )
    result = st.experimental_data_editor(
        np.array(
            [["st.text_area", "widget", 4.92], ["st.markdown", "element", 47.22]],
            dtype=object,
        ),
        use_container_width=True,
        key="edit_numpy_ndarray",
    )

    with st.expander("Edited Data"):
        st.write(f"Type: {type(result)}")
        st.write(result)
