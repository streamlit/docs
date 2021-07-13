import types
import json
import typing
import inspect
import docstring_parser
from docutils.core import publish_parts

import streamlit


def parse_rst(rst_string):
    docutil_settings = { 'embed_stylesheet': 0 }
    document = publish_parts(rst_string, writer_name='html', settings_overrides=docutil_settings)
    return str(document['body'])


def describe(func):
    description = {}
    docstring_obj = docstring_parser.parse(getattr(func, '__doc__', ''), docstring_parser.common.DocstringStyle.numpydoc)
    description['name'] = func.__name__
    description['signature'] = 'streamlit.{}{}'.format( func.__name__, str( inspect.signature( func ) ) )
    
    if docstring_obj.long_description:
        description['description'] = parse_rst(docstring_obj.long_description)
    
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


functions_json = {}

for funcname in dir(streamlit):
    func = getattr(streamlit, funcname)
    # Don't bother with non-callables
    if not isinstance(func, types.FunctionType) and not isinstance(func, types.MethodType):
        continue
    # Don't bother with private functions    
    if not funcname.startswith('_') and callable(func):
        functions_json[ 'streamlit.{}'.format(funcname) ] = describe( func )

json_path = open('streamlit.json', 'w')
json_path.write(json.dumps(functions_json))
json_path.close()