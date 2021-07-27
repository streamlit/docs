#!/usr/bin/python

import sys
import subprocess
import json
import requests
import logging

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

PYPI_URL = 'https://pypi.org/pypi/streamlit/json'

# Get the PyPi data
r = requests.get(PYPI_URL)
d = r.json()

# First open the function file
try:
    current_json = open('streamlit.json', 'r')
    current_data = json.loads(current_json.read())
except:
    current_data = {}

if 'info' in d:
    for release in d['releases']:
        if release not in current_data:
            logging.info(f"[{release}] Installing streamlit...")
            try:
                output = subprocess.Popen(['pip', 'install', f'streamlit=={release}'], stdout=subprocess.DEVNULL)
                output.wait()
            except subprocess.CalledProcessError as exc:
                logging.error(f"[{release}] failed: ", exc.returncode, exc.output)
                continue
            else:
                logging.info(f"[{release}] Starting generation...")
                output = subprocess.Popen(['python', 'generate.py', release], stdout=subprocess.DEVNULL)
                output.wait()
        else:
            logging.warning(f"[{release}] was already saved in streamlit.json. Skipping.")
else:
    logging.error("PyPi index could not be fetched, or returned invalid data.")