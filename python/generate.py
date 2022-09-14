#!/usr/bin/python

import inspect
import json
import logging
import pathlib
import sys
import types

import docstring_parser
import streamlit
import streamlit.components.v1 as components
from docutils.core import publish_parts
from docutils.parsers.rst import directives
from numpydoc.docscrape import NumpyDocString

import stoutput
import utils

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)


def parse_rst(rst_string):
    docutil_settings = {"embed_stylesheet": 0}
    directives.register_directive("output", stoutput.StOutput)
    document = publish_parts(
        rst_string, writer_name="html", settings_overrides=docutil_settings
    )
    return str(document["body"])


def strip_code_prompts(rst_string):
    """Removes >>> and ... prompts from code blocks in examples."""
    return (
        rst_string.replace("&gt;&gt;&gt; ", "")
        .replace("&gt;&gt;&gt;\n", "\n")
        .replace("\n... ", "\n")
        .replace("\n...", "\n")
    )


def get_github_source(func):
    repo_prefix = "https://github.com/streamlit/streamlit/blob/develop/lib"

    # For Streamlit commands (e.g. st.spinner) wrapped by decorator
    while "__wrapped__" in func.__dict__:
        func = func.__wrapped__

    path_parts = func.__code__.co_filename.partition("/streamlit")
    line = func.__code__.co_firstlineno

    return "".join([repo_prefix, path_parts[1], path_parts[2], f"#L{line}"])


def get_function_docstring_dict(func, funcname, signature_prefix):
    description = {}
    docstring = getattr(func, "__doc__", "")
    description["name"] = funcname
    arguments = get_sig_string_without_annots(func)
    description["signature"] = f"{signature_prefix}.{funcname}({arguments})"

    # Remove _ from the start of static component function names
    if funcname.startswith("_"):
        description["name"] = funcname.lstrip("_")
        description[
            "signature"
        ] = f'{signature_prefix}.{description["name"]}({arguments})'

    # Edge case for .clear() method on st.experimental_memo and st.experimental_singleton
    # Prepend "experimental_[memo | singleton]." to the name "clear"
    if "experimental" in signature_prefix:
        description["name"] = f"{signature_prefix}.{funcname}".lstrip("st.")

    if docstring:
        try:
            # Explicitly create the 'Example' section which Streamlit seems to use a lot of.
            NumpyDocString.sections.update({"Example": []})
            numpydoc_obj = NumpyDocString(docstring)

            if "Notes" in numpydoc_obj and len(numpydoc_obj["Notes"]) > 0:
                collapsed = "\n".join(numpydoc_obj["Notes"])
                description["notes"] = parse_rst(collapsed)

            if "Warning" in numpydoc_obj and len(numpydoc_obj["Warning"]) > 0:
                collapsed = "\n".join(numpydoc_obj["Warning"])
                description["warnings"] = parse_rst(collapsed)

            if "Example" in numpydoc_obj and len(numpydoc_obj["Example"]) > 0:
                collapsed = "\n".join(numpydoc_obj["Example"])
                description["example"] = strip_code_prompts(parse_rst(collapsed))

            if "Examples" in numpydoc_obj and len(numpydoc_obj["Examples"]) > 0:
                collapsed = "\n".join(numpydoc_obj["Examples"])
                description["examples"] = strip_code_prompts(parse_rst(collapsed))
        except:
            pass

        docstring_obj = docstring_parser.parse(docstring)
        short_description = docstring_obj.short_description
        long_description = str(
            ""
            if docstring_obj.long_description is None
            else docstring_obj.long_description
        )

        # Insert a blank line between the short and long description, if the latter exists.
        if long_description:
            description["description"] = parse_rst(
                "\n\n".join([short_description, long_description])
            )
        else:
            description["description"] = short_description

        description["args"] = []
        for param in docstring_obj.params:
            arg_obj = {}
            arg_obj["name"] = param.arg_name
            arg_obj["type_name"] = param.type_name
            arg_obj["is_optional"] = param.is_optional
            arg_obj["description"] = (
                parse_rst(param.description) if param.description else ""
            )
            arg_obj["default"] = param.default
            description["args"].append(arg_obj)

        description["returns"] = []
        if type(docstring_obj.returns) is not None:
            for returns in docstring_obj.many_returns:
                return_obj = {}
                return_obj["type_name"] = returns.type_name
                return_obj["is_generator"] = returns.is_generator
                return_obj["description"] = (
                    parse_rst(returns.description) if returns.description else ""
                )
                return_obj["return_name"] = returns.return_name
                description["returns"].append(return_obj)

        description["source"] = get_github_source(func)

    return description


def get_sig_string_without_annots(func):
    sig = inspect.signature(func)
    args = []
    prev = None

    for name, param in sig.parameters.items():

        if prev:
            # Insert "/" if going from positional_only to anything else
            if (
                prev.kind is prev.POSITIONAL_ONLY
                and param.kind is not param.POSITIONAL_ONLY
            ):
                args.append("/")
                prev_was_positional_only = False

            # Insert "*" if going from something that's not *foo to keyword-only
            if (
                prev.kind not in (prev.VAR_POSITIONAL, prev.KEYWORD_ONLY)
                and param.kind is param.KEYWORD_ONLY
            ):
                args.append("*")

        if param.default != inspect._empty:
            if type(param.default) is str:
                def_value = f'"{param.default}"'
            elif type(param.default) is type or callable(param.default):
                def_value = f"special_internal_function"
            else:
                def_value = param.default

            args.append(f"{name}={def_value}")

        elif param.kind is param.VAR_POSITIONAL:
            args.append(f"*{name}")

        elif param.kind is param.VAR_KEYWORD:
            args.append(f"**{name}")

        else:
            args.append(name)

        prev = param

    return ", ".join(args)


def get_obj_docstring_dict(obj, key_prefix, signature_prefix):
    obj_docstring_dict = {}

    allowed_types = (
        types.FunctionType,
        types.MethodType,
        streamlit.runtime.caching.memo_decorator.MemoAPI,
        streamlit.runtime.caching.singleton_decorator.SingletonAPI,
    )

    for membername in dir(obj):
        if membername.startswith("_"):
            continue

        member = getattr(obj, membername)

        if not isinstance(member, allowed_types):
            continue

        if not callable(member):
            continue

        # memo and singleton are callable objects rather than functions
        # See: https://github.com/streamlit/streamlit/pull/4263
        while member in streamlit.runtime.caching.__dict__.values():
            member = member.__call__

        fullname = "{}.{}".format(key_prefix, membername)
        member_docstring_dict = get_function_docstring_dict(
            member, membername, signature_prefix
        )

        obj_docstring_dict[fullname] = member_docstring_dict

    return obj_docstring_dict


def get_streamlit_docstring_dict():
    module_docstring_dict = get_obj_docstring_dict(streamlit, "streamlit", "st")
    memo_clear_docstring_dict = get_obj_docstring_dict(
        streamlit.runtime.caching.memo,
        "streamlit.experimental_memo",
        "st.experimental_memo",
    )
    singleton_clear_docstring_dict = get_obj_docstring_dict(
        streamlit.runtime.caching.singleton,
        "streamlit.experimental_singleton",
        "st.experimental_singleton",
    )
    components_docstring_dict = get_obj_docstring_dict(
        components, "streamlit.components.v1", "st.components.v1"
    )
    delta_docstring_dict = get_obj_docstring_dict(
        streamlit._DeltaGenerator, "DeltaGenerator", "element"
    )

    module_docstring_dict.update(memo_clear_docstring_dict)
    module_docstring_dict.update(singleton_clear_docstring_dict)
    module_docstring_dict.update(components_docstring_dict)
    module_docstring_dict.update(delta_docstring_dict)

    return module_docstring_dict


if __name__ == "__main__":
    data = get_streamlit_docstring_dict()
    utils.write_to_existing_dict(streamlit.__version__, data)
