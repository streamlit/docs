#!/usr/bin/python

import sys
import types
import json
import inspect
import docstring_parser
import stoutput
import logging
import pathlib
import utils
import streamlit

from docutils.core import publish_parts
from docutils.parsers.rst import directives
from numpydoc.docscrape import NumpyDocString

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)


def parse_rst(rst_string):
    docutil_settings = {'embed_stylesheet': 0}
    directives.register_directive('output', stoutput.StOutput)
    document = publish_parts(rst_string, writer_name='html', settings_overrides=docutil_settings)
    return str(document['body'])


def get_function_docstring_dict(func, funcname, signature_prefix):
    description = {}
    docstring = getattr(func, '__doc__', '')
    description['name'] = funcname
    arguments = get_sig_string_without_annots(func)
    description['signature'] = f'{signature_prefix}.{funcname}({arguments})'

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


def get_sig_string_without_annots(func):
    sig = inspect.signature(func)
    args = []
    prev = None

    for name, param in sig.parameters.items():

        if prev:
            # Insert "/" if going from positional_only to anything else
            if prev.kind is prev.POSITIONAL_ONLY and param.kind is not param.POSITIONAL_ONLY:
                args.append('/')
                prev_was_positional_only = False

            # Insert "*" if going from something that's not *foo to keyword-only
            if prev.kind not in (prev.VAR_POSITIONAL, prev.KEYWORD_ONLY) and param.kind is param.KEYWORD_ONLY:
                args.append('*')

        if param.default != inspect._empty:
            if type(param.default) is str:
                def_value = f'"{param.default}"'
            elif type(param.default) is type or callable(param.default):
                def_value = f'special_internal_function'
            else:
                def_value = param.default

            args.append(f'{name}={def_value}')

        elif param.kind is param.VAR_POSITIONAL:
            args.append(f'*{name}')

        elif param.kind is param.VAR_KEYWORD:
            args.append(f'**{name}')

        else:
            args.append(name)

        prev = param

    return ', '.join(args)


def get_obj_docstring_dict(obj, key_prefix, signature_prefix):
    obj_docstring_dict = {}

    for membername in dir(obj):
        if membername.startswith('_'):
            continue

        member = getattr(obj, membername)

        if not isinstance(member, types.FunctionType) and not isinstance(member, types.MethodType):
            continue

        if not callable(member):
            continue

        fullname = '{}.{}'.format(key_prefix, membername)
        member_docstring_dict = get_function_docstring_dict(member, membername, signature_prefix)

        obj_docstring_dict[fullname] = member_docstring_dict

    return obj_docstring_dict


def get_streamlit_docstring_dict():
    module_docstring_dict = get_obj_docstring_dict(streamlit, 'streamlit', 'st')
    delta_docstring_dict = get_obj_docstring_dict(streamlit._DeltaGenerator, 'DeltaGenerator', 'element')

    module_docstring_dict.update(delta_docstring_dict)

    return module_docstring_dict


if __name__ == '__main__':
    data = get_streamlit_docstring_dict()
    utils.write_to_existing_dict(streamlit.__version__, data)
