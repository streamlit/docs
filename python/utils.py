import pathlib
import json
import logging

OUT_FILE_NAME = 'streamlit.json'
CUSTOM_COMPONENT = 'custom_components.json'


def get_existing_dict(filename=OUT_FILE_NAME):
    logging.debug(f'Reading {filename}...')

    if pathlib.Path(filename).is_file():
        with open(filename, 'r') as current_json:
            docstring_dict = json.loads(current_json.read())
            logging.debug(f'Done!')
            return docstring_dict

    return {}

def get_custom_component_dict(filename=CUSTOM_COMPONENT):
    return get_existing_dict(filename)

def write_to_existing_dict(
        streamlit_version,
        docstring_dict,
        filename=OUT_FILE_NAME
    ):
    custom_component_data = get_custom_component_dict()
    docstring_dict.update(custom_component_data)
    logging.debug(f'Writing {filename}...')

    existing_dict = get_existing_dict(filename)
    existing_dict[streamlit_version] = docstring_dict

    with open(filename, 'w') as out_file:
        out_file.write(json.dumps(existing_dict))
        logging.debug(f'Done!')
