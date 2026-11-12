"""Checks that generated docstrings don't contain local file paths.

Run from the repo root:
    uv run --no-project --with pytest pytest python/test_streamlit_json.py
"""

import json
import pathlib
import sys
import types

import pytest

import utils

STREAMLIT_JSON = pathlib.Path(__file__).parent / "streamlit.json"

# Substrings that show up when generate.py leaks the path of the machine that
# ran it, such as a module repr in a default argument.
LOCAL_PATH_MARKERS = ["<module '", "site-packages", "/Users/", "/home/"]


@pytest.mark.parametrize(
    "text, expected",
    [
        (f"obj={json}", "obj=json"),
        (f"obj={sys}", "obj=sys"),
        (f"obj={types.ModuleType('pkg.sub')}", "obj=pkg.sub"),
        (
            "obj=<module 'streamlit' from "
            "'C:\\\\Users\\\\me\\\\Lib\\\\site-packages\\\\streamlit\\\\__init__.py'>",
            "obj=streamlit",
        ),
        (f"mods=({json}, {pathlib})", "mods=(json, pathlib)"),
        (
            'label, value="<module>", width="stretch"',
            'label, value="<module>", width="stretch"',
        ),
    ],
)
def test_normalize_module_reprs(text, expected):
    assert utils.normalize_module_reprs(text) == expected


def _strings_with_local_paths(obj, location):
    if isinstance(obj, dict):
        for key, value in obj.items():
            yield from _strings_with_local_paths(value, location + [key])
    elif isinstance(obj, list):
        for value in obj:
            yield from _strings_with_local_paths(value, location)
    elif isinstance(obj, str):
        if any(marker in obj for marker in LOCAL_PATH_MARKERS):
            yield "/".join(location[:2])


def test_streamlit_json_has_no_local_paths():
    docs = json.loads(STREAMLIT_JSON.read_text())
    leaks = sorted(set(_strings_with_local_paths(docs, [])))
    assert not leaks, f"Local paths in {len(leaks)} entries: {leaks[:10]}"
