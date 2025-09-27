import streamlit as st
import os
import yaml
from pathlib import Path

st.set_page_config(
    page_title="Screenshot preview",
    page_icon="🖼️",
    layout="wide",
)

# Add CSS hack to adjust image positioning and width
st.markdown("""
<style>
    .stImage img {
        margin-left: -1rem;
        margin-top: -1rem;
        width: calc(100% + 2rem) !important;
        max-width: calc(100% + 2rem) !important;
        border: 1px solid #d6d6d8;
        border-top-left-radius: 0.5rem !important;
        border-top-right-radius: 0.5rem !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
</style>
""", unsafe_allow_html=True)

st.title("Screenshot preview")
st.markdown("This page shows previews of all screenshots in a similar layout to the Streamlit docs.")

auto_refresh = st.checkbox("Auto refresh while screenshots are generated", value=True)

# Wrap this in a fragment to auto refresh while screenshots are generated
@st.fragment(run_every=2 if auto_refresh else None)
def show_gallery():

    # Path to screenshots directory
    SCREENSHOTS_DIR = Path(__file__).parent / "screenshots"
    CONFIG_FILE = Path(__file__).parent / "config.yaml"

    # Get the order of elements from config.yaml
    def get_elements_order():
        with open(CONFIG_FILE, "r") as f:
            yaml_data = yaml.safe_load(f)
            elements = yaml_data.get("elements", [])
            # Extract just the names in order
            return [element["name"] for element in elements]

    # Get the ordered list of elements
    try:
        elements_order = get_elements_order()
    except Exception as e:
        st.error(f"Error reading config.yaml: {e}")
        elements_order = []

    # Get all screenshot files
    all_screenshot_files = [f for f in os.listdir(SCREENSHOTS_DIR) if f.endswith(".png")]

    # Sort screenshot files according to config.yaml order
    def get_element_name(filename):
        return filename.replace(".png", "")

    # Create a dictionary of available screenshots
    available_screenshots = {get_element_name(f): f for f in all_screenshot_files}

    # Create ordered list of screenshots based on config.yaml order
    screenshot_files = []
    for element in elements_order:
        if element in available_screenshots:
            screenshot_files.append(available_screenshots[element])

    # Add any screenshots that weren't in config.yaml at the end
    for filename in all_screenshot_files:
        element_name = get_element_name(filename)
        if element_name not in elements_order:
            screenshot_files.append(filename)

    # Display screenshots in rows of 4
    for i in range(0, len(screenshot_files), 4):
        # Create a new row of 4 columns for every 4 elements with borders
        cols = st.columns(4, border=True)
        
        # Process the next 4 screenshots (or fewer if we're at the end)
        for j in range(4):
            if i + j < len(screenshot_files):
                screenshot_file = screenshot_files[i + j]
                
                # Get the element name without extension
                element_name = screenshot_file.replace(".png", "")
                
                # Use the column directly with border
                with cols[j]:
                    st.image(str(SCREENSHOTS_DIR / screenshot_file), use_container_width=True)
                    st.write(f"##### st.{element_name}")
                    st.write("This is an example text.")
        

    # If no screenshots found
    if not screenshot_files:
        st.warning("No screenshots found in the screenshots directory. Run take_screenshots.py first to generate screenshots.")
        st.info(f"Looking for screenshots in: {SCREENSHOTS_DIR}")
        
show_gallery()