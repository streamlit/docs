import pathlib
import json
import logging
import semver
from typing import Dict, Any, Optional

OUT_FILE_NAME = "streamlit_api.json"


def get_existing_dict(filename=OUT_FILE_NAME) -> Dict[str, Any]:
    """
    Read and parse a JSON file into a dictionary.

    Args:
        filename: Path to the JSON file to read

    Returns:
        Dictionary containing the parsed JSON data
    """
    logging.debug(f"Reading {filename}...")

    if pathlib.Path(filename).is_file():
        with open(filename, "r") as current_json:
            docstring_dict = json.loads(current_json.read())
            logging.debug(f"Done!")
            return docstring_dict

    return {}


def write_to_existing_dict(
    streamlit_version: str,
    docstring_dict: Dict[str, Any],
    filename: str = OUT_FILE_NAME,
) -> None:
    """
    Write docstring data for a specific Streamlit version to a JSON file.

    Args:
        streamlit_version: The version of Streamlit this data is for
        docstring_dict: Dictionary containing the docstring data
        filename: Path to the JSON file to write to
    """
    logging.debug(f"Writing {filename}...")

    existing_dict = get_existing_dict(filename)
    existing_dict[streamlit_version] = docstring_dict

    with open(filename, "w") as out_file:
        out_file.write(json.dumps(existing_dict))
        logging.debug(f"Done!")


def get_latest_version(version_dict: Dict[str, Any]) -> Optional[str]:
    """
    Find the latest version in a dictionary using semver.

    Args:
        version_dict: Dictionary with version strings as keys

    Returns:
        The latest version string, or None if no valid versions found
    """
    latest_version = None
    for version in version_dict.keys():
        try:
            if latest_version is None or semver.compare(version, latest_version) > 0:
                latest_version = version
        except ValueError:
            # Skip non-semver versions
            continue

    return latest_version


def get_latest_data(json_path: str) -> Dict[str, Any]:
    """
    Read a versioned JSON file and return data for the latest version.

    Args:
        json_path: Path to the JSON file

    Returns:
        Dictionary containing the data for the latest version
    """
    try:
        with open(json_path, "r") as f:
            data = json.load(f)

        latest_version = get_latest_version(data)
        if latest_version is None:
            logging.error("No valid version found in JSON file")
            return {}

        logging.info(f"Using latest version: {latest_version}")
        return data[latest_version]

    except (FileNotFoundError, json.JSONDecodeError, KeyError) as e:
        logging.error(f"Error reading JSON file: {str(e)}")
        return {}
