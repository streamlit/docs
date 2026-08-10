import argparse
import os
import subprocess
import sys
import time
from pathlib import Path

import requests
import yaml  # Add yaml for YAML parsing
from PIL import Image
from playwright.sync_api import sync_playwright

# Image size configuration will be loaded from config.yaml

# Parse command line arguments
parser = argparse.ArgumentParser(description="Take screenshots of Streamlit elements")
parser.add_argument(
    "--headed", action="store_true", help="Run browser in headed mode (not headless)"
)
parser.add_argument(
    "--only",
    nargs="+",
    help="Only take screenshots of specific elements (e.g. --only st.multiselect st.selectbox)",
)
args = parser.parse_args()

# Create screenshots directory if it doesn't exist
SCREENSHOTS_DIR = "screenshots"
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

# URL of the Streamlit app (default local development server)
STREAMLIT_URL = "http://localhost:9000"


def is_streamlit_running():
    """Check if Streamlit is already running on the default port."""
    try:
        response = requests.get(STREAMLIT_URL, timeout=2)
        return response.status_code == 200
    except:
        return False


def start_streamlit_server():
    """Start the Streamlit server as a subprocess."""
    print("Starting Streamlit server...")

    # Get the path to the capture_app.py file
    app_path = Path(__file__).parent / "capture_app.py"

    # Start the Streamlit server as a subprocess
    process = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "streamlit",
            "run",
            str(app_path),
            "--server.headless",
            "true",
            "--server.port",
            # Start on port 9000 so there's no conflict if the app is running on 8501
            "9000",
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    # Wait for the server to start
    max_wait = 30  # Maximum wait time in seconds
    start_time = time.time()

    while not is_streamlit_running():
        if time.time() - start_time > max_wait:
            print("Error: Streamlit server failed to start within the timeout period.")
            process.terminate()
            sys.exit(1)

        time.sleep(1)

    print("Streamlit server started successfully!")
    return process


def get_elements_from_file():
    """Read the list of elements from config.yaml file."""
    config_file = Path(__file__).parent / "config.yaml"
    if not config_file.exists():
        print(f"Error: {config_file} not found.")
        sys.exit(1)

    with open(config_file, "r") as f:
        # Parse YAML file
        yaml_data = yaml.safe_load(f)
        elements_data = yaml_data.get("elements", [])
        
        # Get screenshot dimensions, padding and browser window width from yaml file
        width = yaml_data.get("screenshot_width", 800)  # Default to 800 if not specified
        height = yaml_data.get("screenshot_height", 600)  # Default to 600 if not specified
        padding = yaml_data.get("default_padding", 50)  # Default to 50 if not specified
        window_width = yaml_data.get("browser_window_width", 1280)  # Default to 1280 if not specified
        enable_overlays = yaml_data.get("enable_overlays", True)  # Default to True if not specified
        
        print(f"Using screenshot width: {width}, screenshot height: {height}, default padding: {padding}, browser window width: {window_width}")

    # Extract element names and any custom properties
    elements = []
    element_properties = {}

    for element_item in elements_data:
        element_name = element_item.get("name")
        if element_name:
            elements.append(element_name)
            # Store all properties for this element
            element_properties[element_name] = element_item

    # If --only argument is provided, filter the elements list
    if args.only:
        filtered_elements = [e for e in elements if e in args.only]
        if not filtered_elements:
            print(f"Error: None of the specified elements {args.only} were found in config.yaml")
            sys.exit(1)
        print(f"Filtering to only capture: {', '.join(filtered_elements)}")
        return filtered_elements, element_properties, width, height, padding, window_width, enable_overlays

    return elements, element_properties, width, height, padding, window_width, enable_overlays


def process_screenshot(image_path, element_name=None, element_properties={}, width=800, height=600, padding=50, enable_overlays=False):
    """
    Process a screenshot image:
    1. Trim whitespace around the image
    2. Resize to fit with exact padding
    3. Create a rectangular image of width x height
    4. Apply an overlay if specified in element_properties and enable_overlays is True
    """
    # Open the image
    img = Image.open(image_path)

    # Convert to RGB if not already
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Get the background color (assuming white background)
    bg_color = (255, 255, 255)

    # Get the image data
    img_width, img_height = img.size
    pixels = img.load()

    # Find the bounding box of non-white pixels
    left = img_width
    top = img_height
    right = 0
    bottom = 0

    # Scan the image to find the bounds of non-white pixels
    for y in range(img_height):
        for x in range(img_width):
            if pixels[x, y] != bg_color:
                left = min(left, x)
                top = min(top, y)
                right = max(right, x)
                bottom = max(bottom, y)

    # If we found non-white pixels, crop the image with a 10px margin
    if left < right and top < bottom:
        # Add a 1px margin on all sides to not cut off borders
        left = max(0, left - 1)
        top = max(0, top - 1)
        right = min(img_width - 1, right + 1)
        bottom = min(img_height - 1, bottom + 1)

        # Crop the image
        img = img.crop((left, top, right + 1, bottom + 1))

        # Check if this element has a custom padding
        custom_padding = None
        if element_name and element_name in element_properties:
            custom_padding = element_properties.get(element_name, {}).get("padding")

        # Use custom padding if available, otherwise use default
        padding_value = custom_padding if custom_padding is not None else padding

        # Calculate the available space for the content (dimensions minus padding on both sides)
        available_width = width - (2 * padding_value)
        available_height = height - (2 * padding_value)

        # Calculate the scale factor to fit the image within the available space
        img_width, img_height = img.size
        width_scale = available_width / img_width
        height_scale = available_height / img_height

        # Use the smaller scale factor to ensure the image fits within the available space
        scale_factor = min(width_scale, height_scale)

        # Calculate new dimensions
        new_width = int(img_width * scale_factor)
        new_height = int(img_height * scale_factor)

        # Resize the image
        img = img.resize((new_width, new_height), Image.LANCZOS)

        # Create a new white image of width x height
        final_img = Image.new("RGB", (width, height), bg_color)

        # Calculate position to paste the resized image (centered)
        paste_x = (width - new_width) // 2
        paste_y = (height - new_height) // 2

        # Paste the resized image onto the white background
        final_img.paste(img, (paste_x, paste_y))
        
        # Check if overlays are enabled and if an overlay is specified for this element
        if enable_overlays and element_name and element_name in element_properties:
            overlay_path = element_properties.get(element_name, {}).get("overlay")
            if overlay_path:
                try:
                    # Get the full path to the overlay file
                    overlay_full_path = Path(__file__).parent / overlay_path
                    
                    # Check if the overlay file exists
                    if not overlay_full_path.exists():
                        print(f"Error: Overlay file {overlay_path} not found for element {element_name}")
                    else:
                        # Open the overlay image
                        if overlay_path.lower().endswith('.svg'):
                            # For SVG files, use cairosvg to convert to PNG first
                            import cairosvg
                            import io
                            
                            # Convert SVG to PNG in memory
                            png_data = cairosvg.svg2png(url=str(overlay_full_path), output_width=width, output_height=height)
                            overlay_img = Image.open(io.BytesIO(png_data))
                        else:
                            # For PNG and other image formats
                            overlay_img = Image.open(overlay_full_path)
                            
                            # Convert to RGBA if not already
                            if overlay_img.mode != "RGBA":
                                overlay_img = overlay_img.convert("RGBA")
                        
                        # Check if overlay dimensions match the final image
                        if overlay_img.size != (width, height):
                            print(f"Error: Overlay dimensions {overlay_img.size} do not match screenshot dimensions ({width}, {height}) for element {element_name}")
                        else:
                            # Composite the overlay onto the final image
                            if overlay_img.mode == 'RGBA':
                                # If overlay has transparency, use alpha_composite
                                # Convert final_img to RGBA
                                final_img_rgba = final_img.convert("RGBA")
                                final_img = Image.alpha_composite(final_img_rgba, overlay_img)
                            else:
                                # If no transparency, just paste
                                final_img.paste(overlay_img, (0, 0), overlay_img if 'A' in overlay_img.mode else None)
                except Exception as e:
                    print(f"Error applying overlay for element {element_name}: {e}")

        # Save the final image
        final_img.save(image_path)


def take_screenshots():
    # Get the list of elements from config.yaml
    elements, element_properties, width, height, padding, window_width, enable_overlays = get_elements_from_file()
    print(f"Found {len(elements)} elements to capture.")

    # Clear the screenshots directory before generating new screenshots
    for file in Path(SCREENSHOTS_DIR).glob("*.png"):
        file.unlink()
    print(f"Cleared existing screenshots from {SCREENSHOTS_DIR}")

    # Start the Streamlit server if it's not already running
    streamlit_process = None
    if not is_streamlit_running():
        streamlit_process = start_streamlit_server()

    # Launch Playwright
    with sync_playwright() as playwright:
        # Launch the browser
        browser = playwright.chromium.launch(headless=not args.headed)
        
        # Create a new browser context and page
        context = browser.new_context(
            viewport={"width": window_width, "height": 720}, 
            device_scale_factor=4.0
        )
        page = context.new_page()
        
        # Navigate to the Streamlit app
        page.goto(STREAMLIT_URL)
        
        # Wait for the app to load
        page.wait_for_selector("h1:has-text('Streamlit Elements Gallery')")
        print("Streamlit app loaded successfully")
        
        # Take screenshots of each element
        for element in elements:
            try:
                # Create a key for the element (used in the HTML)
                element_key = element.replace(".", "_")
                
                # Find the container using the key-based CSS selector
                selector = f".st-key-{element_key}"
                container = page.locator(selector).first

                # Scroll to the container
                container.scroll_into_view_if_needed()

                # Wait a moment for any animations to complete
                time.sleep(0.5)
                
                if container.count() == 0:
                    print(f"Warning: Element '{element}' not found on the page")
                    continue
                
                # Special handling for certain elements
                
                # Special handling for selectbox and multiselect to show dropdown
                if element == "selectbox" or element == "multiselect":
                    # Find the select element within the container and click it
                    container.locator("div[data-baseweb='select']").first.click()
                    # Wait for dropdown to appear
                    time.sleep(1)

                # Special handling for date input to show dropdown
                elif element == "date_input":
                    # Find the select element within the container and click it
                    container.locator("div[data-baseweb='input']").first.click()
                    # Wait for dropdown to appear
                    time.sleep(1)
                
                # Special handling for color picker to show the color picker panel
                elif element == "color_picker":
                    # Find the color picker input and click it
                    container.locator(".stColorPicker > div").first.click()
                    # Wait for color picker to appear
                    time.sleep(1)
                
                # Special handling for data_editor to click on it first
                elif element == "data_editor":
                    # Find the editor element within the container
                    editor_box = container.locator(".stDataFrame").bounding_box()
                    # Click on the editor to view cell details
                    page.mouse.dblclick(editor_box["x"] + 100, editor_box["y"] + 90)
                    time.sleep(1)
                    # Click again to get into editing mode
                    page.mouse.click(editor_box["x"] + 100, editor_box["y"] + 90)
                    # Wait a moment for any UI response
                    time.sleep(0.5)
                
                # Special handling for page link to hover over it
                elif element == "page_link":
                    # Find the link element within the container
                    link_element = container.locator("a").last
                    # Hover over the link
                    link_element.hover()
                    # Wait a moment for hover effect to appear
                    time.sleep(0.5)
                    
                # Special handling for spinner to show the spinner animation
                elif element == "spinner":
                    # Find and click the "Show spinner" button using its key
                    show_spinner_button = page.locator(".st-key-show_spinner button").first
                    time.sleep(0.5)
                    show_spinner_button.click()
                    # Wait for the spinner to appear
                    page.wait_for_selector(".stSpinner", state="visible", timeout=5000)

                # Get the bounding box
                box = container.bounding_box()

                # Take a screenshot with padding to ensure we don't cut off any content
                screenshot_path = f"{SCREENSHOTS_DIR}/{element}.png"
                page.screenshot(
                    path=screenshot_path,
                    clip={
                        "x": box["x"] - 10,
                        "y": box["y"] - 10,
                        "width": box["width"] + 20,
                        "height": box["height"] + 20,
                    },
                )

                # For select elements, click elsewhere to close the dropdown after screenshot
                if element in [
                    "selectbox",
                    "multiselect",
                    "date_input",
                    "color_picker",
                    "data_editor",
                ]:
                    # Click on the page header to close the dropdown
                    page.locator(
                        "h1:has-text('Streamlit Elements Gallery')"
                    ).click()
                    time.sleep(0.5)

                # Trim any excess whitespace
                process_screenshot(screenshot_path, element, element_properties, width, height, padding, enable_overlays)

                print(f"Saved screenshot of {element} to {screenshot_path}")
            except Exception as e:
                print(f"Error capturing {element}: {e}")

        # Close the browser
        browser.close()

    # If we started the Streamlit server, terminate it
    if streamlit_process:
        streamlit_process.terminate()
        print("Streamlit server terminated")


if __name__ == "__main__":
    take_screenshots()
