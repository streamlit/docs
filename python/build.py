#!/usr/bin/python

import sys
import subprocess
import json
import requests
import logging
import utils

from packaging import version

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

PYPI_URL = 'https://pypi.org/pypi/streamlit/json'

# Only consider the latest N releases
LOOKBACK = 15

# Get the PyPI data
pypi_data = requests.get(PYPI_URL).json()
current_data = utils.get_existing_dict()


def get_latest_releases(pypi_data):
    sorted_release_pairs = sorted(
        (version.parse(v), v)
        for v in pypi_data['releases'])

    _, sorted_release_strs = zip(*sorted_release_pairs)

    return sorted_release_strs[-LOOKBACK:]


if 'info' in pypi_data:
    releases = get_latest_releases(pypi_data)

    for version_str in releases:
        version_obj = version.parse(version_str)

        # We only care about versions of the type major.minor.0
        if version_obj.micro != 0:
            continue

        # We don't care about pre-releases. e.g. 1.6.0rc3
        if version_obj.is_prerelease:
            continue

        if version_str not in current_data:
            logging.info(f"[{version_str}] Installing streamlit...")

            # Download Streamlit.
            try:
                output = subprocess.Popen(['pip', 'install', f'streamlit=={version_str}'], stdout=subprocess.DEVNULL)
                output.wait()
            except subprocess.CalledProcessError as exc:
                logging.error(f"[{version_str}] failed: ", exc.returncode, exc.output)
                continue

            # Grab docstring data for all Streamlit commands.
            logging.info(f"[{version_str}] Starting generation...")

            # Needs to be a subprocess so it imports the latest installed Streamlit correctly.
            # (modules are cached!)
            output = subprocess.Popen(['python', 'generate.py', version_str], stdout=subprocess.DEVNULL)
            output.wait()

        else:
            logging.warning(f"[{version_str}] was already saved in JSON file. Skipping.")
else:
    logging.error("PyPi index could not be fetched, or returned invalid data.")
