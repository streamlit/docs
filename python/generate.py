#!/usr/bin/python

import sys
import types
import json
import inspect
import docstring_parser
import stoutput
import logging
import streamlit

from docutils.core import publish_parts
from docutils.parsers.rst import directives
from numpydoc.docscrape import NumpyDocString

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)


def parse_rst(rst_string):
    docutil_settings = { 'embed_stylesheet': 0 }
    directives.register_directive('output', stoutput.StOutput)
    document = publish_parts(rst_string, writer_name='html', settings_overrides=docutil_settings)
    return str(document['body'])


def describe(func):
    description = {}
    docstring = getattr(func, '__doc__', '')        
    description['name'] = func.__name__
    description['signature'] = 'streamlit.{}{}'.format( func.__name__, str( inspect.signature( func ) ) )
    
    if docstring:
        try:
            # Explicitly create the 'Example' section which Streamlit seems to use a lot of.
            NumpyDocString.sections.update({'Example': []})
            numpydoc_obj = NumpyDocString(docstring)
            if 'Notes' in numpydoc_obj and len(numpydoc_obj['Notes']) > 0:
                collapsed = '\n'.join(numpydoc_obj['Notes'])
                description['notes'] = parse_rst(collapsed)
            if 'Warning' in numpydoc_obj and len(numpydoc_obj['Warning']) > 0:
                collapsed = '\n'.join(numpydoc_obj['Warning'])
                description['warnings'] = parse_rst(collapsed)
            if 'Example' in numpydoc_obj and len(numpydoc_obj['Example']) > 0:
                collapsed = '\n'.join(numpydoc_obj['Example'])
                description['example'] = parse_rst(collapsed)
            if 'Examples' in numpydoc_obj and len(numpydoc_obj['Examples']) > 0:
                collapsed = '\n'.join(numpydoc_obj['Examples'])
                description['examples'] = parse_rst(collapsed)
        except:
            pass
        docstring_obj = docstring_parser.parse(docstring)

        description['description'] = docstring_obj.short_description

        description['args'] = []
        for param in docstring_obj.params:
            arg_obj = {}
            arg_obj['name'] = param.arg_name
            arg_obj['type_name'] = param.type_name
            arg_obj['is_optional'] = param.is_optional
            arg_obj['description'] = parse_rst(param.description) if param.description else ''
            arg_obj['default'] = param.default
            description['args'].append(arg_obj)
    
    return description

def inspect_for_docs(obj, prefix='streamlit'):
    functions_json = {}
    for funcname in dir(obj):
        if funcname.startswith('_'):
            continue
        func = getattr(obj, funcname)
        # Don't bother with non-callables
        if not isinstance(func, types.FunctionType) and not isinstance(func, types.MethodType):
            continue
        # Don't bother with private functions
        if not funcname.startswith('_') and callable(func):
            functions_json[ '{}.{}'.format(prefix, funcname) ] = describe( func )
    return functions_json


def get_funcs():
    import streamlit
    # Handle most cases
    functions_json = inspect_for_docs(streamlit)
    # Handle DeltaGenerator
    delta_json = inspect_for_docs(streamlit._DeltaGenerator, 'DeltaGenerator')
    functions_json.update(delta_json)
    return functions_json


# First open the function file
try:
    current_json = open('streamlit.json', 'r')
    current_data = json.loads(current_json.read())
except:
    current_data = {}

try:
    streamlit_version = streamlit.__version__
except:
    streamlit_version = sys.argv[1]
    logging.warning(f'[{streamlit_version}] did not have a version defined in the package. Using arg.')

logging.info(f'Generating docs for {streamlit_version}')
current_data[streamlit_version] = get_funcs()

json_path = open('streamlit.json', 'w')
json_path.write(json.dumps(current_data))
json_path.close()