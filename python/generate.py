#!/usr/bin/python

import inspect
import json
import logging
import pathlib
import sys
import types

import docstring_parser
import stoutput
import streamlit
import streamlit.components.v1 as components
import utils
from docutils.core import publish_parts
from docutils.parsers.rst import directives
from numpydoc.docscrape import NumpyDocString

# Set up logging to print debug messages to stdout
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)


def parse_rst(rst_string):
    """Parses RST string to HTML using docutils."""
    docutil_settings = {"embed_stylesheet": 0}
    # Register the custom RST directive for output
    directives.register_directive("output", stoutput.StOutput)
    # Convert RST string to HTML using docutils
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
    """Returns a link to the source code on GitHub for a given command."""
    repo_prefix = (
        f"https://github.com/streamlit/streamlit/blob/{streamlit.__version__}/lib"
    )

    # For Streamlit commands (e.g. st.spinner) wrapped by decorator
    while "__wrapped__" in func.__dict__:
        # Continue to unwrap until we get to the original function
        func = func.__wrapped__

    # Tuple with three elements: part before the first occurrence of "/streamlit",
    # the string "/streamlit", and the part after "/streamlit"
    path_parts = func.__code__.co_filename.partition("/streamlit")
    # Get the line number where the function is defined in the source code
    line = func.__code__.co_firstlineno

    return "".join([repo_prefix, path_parts[1], path_parts[2], f"#L{line}"])


def get_function_docstring_dict(func, funcname, signature_prefix):
    """Returns a dictionary containing the docstring information for a given function."""
    # Initialize an empty dictionary to store the function description
    description = {}
    # Get the function's docstring or an empty string if it doesn't have one
    docstring = getattr(func, "__doc__", "")
    # Set the function's name
    description["name"] = funcname
    # Get the function's signature without annotations
    arguments = get_sig_string_without_annots(func)
    # Set the function's signature
    description["signature"] = f"{signature_prefix}.{funcname}({arguments})"

    # Remove _ from the start of static component function names
    if funcname.startswith("_"):
        description["name"] = funcname.lstrip("_")
        description[
            "signature"
        ] = f'{signature_prefix}.{description["name"]}({arguments})'

    # Edge case for .clear() method on st.experimental_memo, st.experimental_singleton, st.cache_data, and st.cache_resource
    # Prepend either "experimental_[memo | singleton]." or "cache_[data | resource]." to the name "clear"
    if any(
        x in signature_prefix for x in ["experimental", "cache_data", "cache_resource"]
    ):
        description["name"] = f"{signature_prefix}.{funcname}".lstrip("st.")

    # If there is a docstring, process it
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

        # Parse the docstring using docstring_parser
        docstring_obj = docstring_parser.parse(docstring)

        # Get the short and long descriptions from the docstring object
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

        # Initialize the list of arguments in the description dictionary
        description["args"] = []
        # Iterate through the parameters from the parsed docstring
        for param in docstring_obj.params:
            arg_obj = {}  # Create an argument object dictionary
            arg_obj["name"] = param.arg_name  ## Store the argument name
            arg_obj["type_name"] = param.type_name  # Store the argument type
            arg_obj["is_optional"] = param.is_optional  # Store the optional flag
            arg_obj["description"] = (
                parse_rst(param.description) if param.description else ""
            )  # Store the argument description (parsed from RST to HTML)
            arg_obj["default"] = param.default  # Store the default value

            # Check if the argument is deprecated
            if docstring_obj.deprecation and param.arg_name in parse_rst(
                docstring_obj.deprecation.description
            ):
                # Add the deprecated flag and the deprecation message to the argument object
                arg_obj["deprecated"] = {
                    "deprecated": True,
                    "deprecatedText": parse_rst(docstring_obj.deprecation.description),
                }
            # Append the argument object to the list of arguments
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
    """Returns a string representation of the function signature without annotations."""
    # Get the signature of the function
    sig = inspect.signature(func)
    # Initialize an empty list to store the arguments
    args = []
    # Initialize a variable to store the previous parameter
    prev = None

    # Iterate through the parameters of the function
    for name, param in sig.parameters.items():
        # If there was a previous parameter, check for certain conditions
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

        # If the parameter has a default value, format it accordingly
        if param.default != inspect._empty:
            if type(param.default) is str:
                def_value = f'"{param.default}"'
            elif type(param.default) is type or callable(param.default):
                def_value = f"special_internal_function"
            else:
                def_value = param.default

            args.append(f"{name}={def_value}")

        # If the parameter is a variable positional argument, format it with '*' in front
        elif param.kind is param.VAR_POSITIONAL:
            args.append(f"*{name}")

        # If the parameter is a variable keyword argument, format it with '**' in front
        elif param.kind is param.VAR_KEYWORD:
            args.append(f"**{name}")

        # Otherwise, just append the parameter name
        else:
            args.append(name)

        # Set the current parameter as the previous one for the next iteration
        prev = param

    # Return the formatted argument string
    return ", ".join(args)


def get_obj_docstring_dict(obj, key_prefix, signature_prefix):
    """Recursively get the docstring dict for an object and its members. Returns a dict of dicts containing the docstring info for each member."""

    # Initialize empty dictionary to store function/method metadata
    obj_docstring_dict = {}

    # Define allowed types for members to be processed
    allowed_types = (
        types.FunctionType,
        types.MethodType,
        streamlit.runtime.caching.cache_data_api.CacheDataAPI,
        streamlit.runtime.caching.cache_resource_api.CacheResourceAPI,
    )

    # Iterate over the names of the members of the object
    for membername in dir(obj):
        # Skip members starting with an underscore
        if membername.startswith("_"):
            continue

        # Get the member object using its name
        member = getattr(obj, membername)

        # Skip members not of the allowed types
        if not isinstance(member, allowed_types):
            continue

        # Skip members that are not callable
        if not callable(member):
            continue

        # memo and singleton are callable objects rather than functions
        # See: https://github.com/streamlit/streamlit/pull/4263
        # Replace the member with its decorator object
        while member in streamlit.runtime.caching.__dict__.values():
            member = member._decorator

        # Create the full name of the member using key_prefix and membername
        fullname = "{}.{}".format(key_prefix, membername)

        # Call get_function_docstring_dict to get metadata of the current member
        member_docstring_dict = get_function_docstring_dict(
            member, membername, signature_prefix
        )

        # Add the extracted metadata to obj_docstring_dict
        obj_docstring_dict[fullname] = member_docstring_dict

    return obj_docstring_dict


def get_streamlit_docstring_dict():
    """Get the docstring dict for the streamlit module and its members. Returns a dict of dicts containing the docstring info for each member."""
    # Get metadata for functions/methods in the streamlit module
    module_docstring_dict = get_obj_docstring_dict(streamlit, "streamlit", "st")
    memo_clear_docstring_dict = get_obj_docstring_dict(
        streamlit.runtime.caching.experimental_memo,
        "streamlit.experimental_memo",
        "st.experimental_memo",
    )
    cache_data_clear_docstring_dict = get_obj_docstring_dict(
        streamlit.runtime.caching.cache_data_api.CacheDataAPI,
        "streamlit.cache_data",
        "st.cache_data",
    )
    singleton_clear_docstring_dict = get_obj_docstring_dict(
        streamlit.runtime.caching.experimental_singleton,
        "streamlit.experimental_singleton",
        "st.experimental_singleton",
    )
    cache_resource_clear_docstring_dict = get_obj_docstring_dict(
        streamlit.runtime.caching.cache_resource_api.CacheResourceAPI,
        "streamlit.cache_resource",
        "st.cache_resource",
    )
    components_docstring_dict = get_obj_docstring_dict(
        components, "streamlit.components.v1", "st.components.v1"
    )
    delta_docstring_dict = get_obj_docstring_dict(
        streamlit._DeltaGenerator, "DeltaGenerator", "element"
    )

    # Update the module_docstring_dict with metadata from each of the above objects
    module_docstring_dict.update(memo_clear_docstring_dict)
    module_docstring_dict.update(cache_data_clear_docstring_dict)
    module_docstring_dict.update(singleton_clear_docstring_dict)
    module_docstring_dict.update(cache_resource_clear_docstring_dict)
    module_docstring_dict.update(components_docstring_dict)
    module_docstring_dict.update(delta_docstring_dict)

    return module_docstring_dict


if __name__ == "__main__":
    data = get_streamlit_docstring_dict()
    utils.write_to_existing_dict(streamlit.__version__, data)
