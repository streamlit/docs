import streamlit as st
from radial_menu_component import radial_menu

st.header("Radial Menu Component")

st.write("Click the button to open the menu. Select your favorite food!")

options = {
    "pizza": "🍕",
    "burger": "🍔",
    "taco": "🌮",
    "ramen": "🍜",
    "sushi": "🍣",
    "salad": "🥗",
}

result = radial_menu(
    data={"options": options, "selection": "burger"},
    default={"selection": "burger"},
    on_selection_change=lambda: None,
    key="food_menu",
)

if result.selection:
    icon = options.get(result.selection, "")
    st.write(f"You selected: **{icon} {result.selection.title()}**")