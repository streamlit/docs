import pathlib
import json
import logging

OUT_FILE_NAME = 'streamlit.json'


def get_existing_dict(filename=OUT_FILE_NAME):
    logging.debug(f'Reading {filename}...')

    if pathlib.Path(filename).is_file():
        with open(filename, 'r') as current_json:
            docstring_dict = json.loads(current_json.read())
            logging.debug(f'Done!')
            return docstring_dict

    return {}


def filter_old_versions(releases, num_new_versions, force_keep=[]):
    versions_to_include = set(force_keep)

    new_versions = list(releases.keys())[-num_new_versions:]
    versions_to_include.update(new_versions)

    return {k: releases(k) for k in sorted(versions_to_include)}


def clean_up_existing_file(releases, force_keep=[], filename=OUT_FILE_NAME):
    docstring_dict = get_existing_dict()

    for k in list(docstring_dict.keys()):
        if k in force_keep:
            continue

        if k in releases:
            continue

        del docstring_dict[k]

    write_to_existing_file(docstring_dict, filename)


def write_version_to_existing_file(
        streamlit_version,
        docstring_dict,
        filename=OUT_FILE_NAME
    ):
    existing_dict = get_existing_dict(filename)
    existing_dict[streamlit_version] = docstring_dict

    write_to_existing_file(existing_dict, filename)


def write_to_existing_file(docstring_dict, filename=OUT_FILE_NAME):
    logging.debug(f'Writing {filename}...')

    with open(filename, 'w') as out_file:
        out_file.write(json.dumps(docstring_dict))
        logging.debug(f'Done!')
