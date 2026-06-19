# Screenshot generator for the API reference

This tool automatically generates standardized screenshots of Streamlit elements for
use in the API reference documentation.

## Overview

The screenshot generator consists of:

- A Streamlit app (`capture_app.py`) that displays the Streamlit elements to be
  captured.
- A screenshot capture script (`take_screenshots.py`) that automates browser
  interactions and captures screenshots.
- A configuration file (`config.yaml`) that defines elements and settings.
- A preview app (`preview_app.py`) that displays all captured screenshots in a grid.

## Installation

```bash
pip install -r requirements.txt
playwright install
```

## Usage

### Creating and previewing screenshots

1. Run the screenshot capture script:

   ```bash
   python take_screenshots.py
   ```

   This will start a Streamlit server displaying `capture_app.py`, access it with a headless
   Playwright browser, take screenshots of all elements defined in `config.yaml`, and save
   them to the `screenshots` directory. Note that all existing screenshots in the
   `screenshots` directory will be deleted.

2. Preview all screenshots:

   ```bash
   streamlit run preview_app.py
   ```

   This will start a Streamlit app that displays all screenshots in a grid. The order
   of the screenshots is the same as in `config.yaml`.

### Command line options

When running the screenshot script (`take_screenshots.py`), you can add the following
command line options:

- `--headed`: Run the browser in headed mode (visible) instead of headless. This is great
  for debugging.
- `--only element1 element2`: Only capture specific elements.

Example:

```bash
python take_screenshots.py --headed --only button text_input
```

### Configuration

All settings are defined in `config.yaml`. It contains:

- Some global settings at the top of the file, such as the dimensions and padding of the
  screenshots.
- A list of elements to capture. Each element can have the following properties:
  - `name`: The name of the element (required). This must map to the `key` property of
    an `st.container` in `capture_app.py` (see below for details).
  - `padding`: The padding around the element. If not given, the `default_padding`
    setting will be used. You can use this to make smaller elements (e.g. buttons) not
    take up the entire screenshot.
  - `overlay`: The path to an overlay image to apply on top of the screenshot. Supports
    SVG and PNG files. The overlay image must be the same size as the screenshot. The
    overlay is only applied if the global setting `enable_overlays` is `true`.

### Adding or changing elements

All elements are displayed through the Streamlit app `capture_app.py`. For every element,
this app has an `st.container` with a `key` parameter equal to the element name defined
in `config.yaml`. The content of this container will be screenshotted.

To edit an existing element:

- Simply edit whatever is in the associated `st.container` in `capture_app.py`. You can
  also add supporting code that should not be captured outside of the container (e.g.
  CSS hacks).

To add a new element:

- Add the new element to `config.yaml`.
- Add a new `st.container` to `capture_app.py` with a `key` parameter equal to the
  element name.

## How It Works

1. The script launches a Streamlit server running `capture_app.py`
2. It uses Playwright to automate a browser session
3. For each element defined in `config.yaml`:
   - It locates the `st.container` with its `key` equal to the element name on the page
   - Performs any special handling (e.g., clicking dropdowns)
   - Takes a screenshot
   - Processes the image (trims whitespace, applies padding, adds overlays)
4. All screenshots are saved to the `screenshots` directory

## Special handling for elements

Some elements are handled specially by `take_screenshots.py`. E.g. selectbox,
multiselect, date input, and color picker are clicked to show their dropdowns. Or data
editor is clicked multiple times to show its editing mode. For details, see the
`take_screenshots.py` code.

## Troubleshooting

- If elements aren't found, check the key attributes in `capture_app.py`
- For rendering issues, try running in headed mode with `--headed`
- If overlays don't appear, check that `enable_overlays` is `true` and paths are correct
