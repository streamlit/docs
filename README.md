# Streamlit Docs

## Getting Started

1. Type `make` to install NPM dependecies.
2. Type `make up` to start the development server.

## Updating autofuncs

The file `python/streamlit.json` can be updated by running `make dockstrings`. This will build the nesscary Docker image, and update the file with the documentation for the latest release on PyPi.

If you need to regenerate all function signatrues, across all versions, delete the content in `python/streamlit.json`, leaving the file in place, and run `make docstrings`. This will systematically install each version of streamlit, and generate the nessecary function signatures in `streamlit.json`.