#!/usr/bin/python

import inspect
import json
import logging
import os
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

VERSION = streamlit.__version__

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
        f"https://github.com/streamlit/streamlit/blob/{VERSION}/lib/"
    )

    if hasattr(func, "__dict__"):
        # For Streamlit commands (e.g. st.spinner) wrapped by decorator
        while "__wrapped__" in func.__dict__:
            # Continue to unwrap until we get to the original function
            func = func.__wrapped__

    # Tuple with three elements: part before the first occurrence of "/streamlit",
    # the string "/streamlit", and the part after "/streamlit"
    # path_parts = func.__code__.co_filename.partition("/streamlit")
    # # Get the line number where the function is defined in the source code
    # line = func.__code__.co_firstlineno

    # return "".join([repo_prefix, path_parts[1], path_parts[2], f"#L{line}"])
    try:
        source_file = inspect.getsourcefile(func)
    except TypeError:
        try:
            source_file = inspect.getsourcefile(func.fget)
        except AttributeError:
            source_file = inspect.getsourcefile(func.__call__)

    try:
        line = inspect.getsourcelines(func)[1]
    except TypeError:
        try:
            line = inspect.getsourcelines(func.fget)[1]
        except AttributeError:
            line = inspect.getsourcelines(func.__call__)[1]

    # Get the relative path after the "streamlit" directory
    rel_path = os.path.relpath(
        source_file, start=os.path.join(streamlit.__path__[0], "..")
    )

    return "".join([repo_prefix, rel_path, f"#L{line}"])


def get_property_docstring_dict(
    prop, propname, signature_prefix, is_class_method, is_property
):
    """Returns a dictionary containing the docstring information for a given property."""
    docstring_dict = get_docstring_dict(
        prop,
        propname,
        signature_prefix,
        is_class=False,
        is_class_method=is_class_method,
        is_property=is_property,
    )
    docstring_dict["description"] = docstring_dict["description"].split("\n")[0]

    return docstring_dict


def get_docstring_dict(
    obj, objname, signature_prefix, is_class, is_class_method, is_property
):
    """Returns a dictionary containing the docstring information for a given object (function or class)."""
    # Initialize an empty dictionary to store the object description
    description = {}
    # Get the object's docstring or an empty string if it doesn't have one
    docstring = getattr(obj, "__doc__", "")
    # Set the object's name
    description["name"] = objname
    # If the object is a class, store its methods and their signatures
    if is_class:
        # Get the class's signature without annotations
        arguments = get_sig_string_without_annots(obj)
        if arguments is None:
            arguments = ""
        description["signature"] = f"{signature_prefix}.{objname}({arguments})"
        description["is_class"] = True
        # Get the class's methods
        methods = inspect.getmembers(obj, inspect.isfunction)
        # Check if methods is empty
        if not methods:
            # assign the objects functions to methods
            methods = inspect.getmembers(obj, inspect.ismethod)
        # Initialize an empty dictionary to store the methods and their signatures
        description["methods"] = []
        # Iterate through the class's methods
        for method_name, method in methods:
            # Skip methods that start with an underscore
            if method_name.startswith("_"):
                continue
            meth_obj = {}
            meth_obj = get_function_docstring_dict(
                method,
                method_name,
                f"{signature_prefix}.{method_name}",
                is_class_method=True,
            )
            description["methods"].append(meth_obj)

        # Get the class's properties
        properties = [
            (name, prop)
            for name, prop in inspect.getmembers(obj, lambda x: isinstance(x, property))
        ]
        # Initialize an empty dictionary to store the properties and their signatures
        description["properties"] = []
        # Iterate through the class's properties
        for prop_name, prop in properties:
            # Skip properties that start with an underscore
            if prop_name.startswith("_"):
                continue
            prop_obj = {}
            prop_obj = get_property_docstring_dict(
                prop,
                prop_name,
                f"{signature_prefix}.{prop_name}",
                is_class_method=False,
                is_property=True,
            )
            description["properties"].append(prop_obj)

        description["source"] = get_github_source(obj)

    else:
        # Get the function's signature without annotations
        arguments = get_sig_string_without_annots(obj)
        # Set the function's signature. If obj is a property, no need to add parentheses
        description["signature"] = (
            f"{signature_prefix}.{objname}({arguments})"
            if not is_property
            else f"{signature_prefix}.{objname}"
        )

        # Remove _ from the start of static component function names
        if objname.startswith("_"):
            description["name"] = objname.lstrip("_")
            description[
                "signature"
            ] = f'{signature_prefix}.{description["name"]}({arguments})'

        # Edge case for .clear() method on st.experimental_memo, st.experimental_singleton, st.cache_data, and st.cache_resource
        # Prepend either "experimental_[memo | singleton]." or "cache_[data | resource]." to the name "clear"
        if any(
            x in signature_prefix
            for x in ["experimental", "cache_data", "cache_resource"]
        ):
            description["name"] = f"{signature_prefix}.{objname}".lstrip("st.")

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

        if is_property and is_class_method:
            description["description"] = parse_rst(short_description)
        else:
            description["description"] = parse_rst(
                "\n\n".join([short_description, long_description])
            )

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

        description["source"] = get_github_source(obj)

    return description


def get_function_docstring_dict(
    func, funcname, signature_prefix, is_class_method=False
):
    """Returns a dictionary containing the docstring information for a given function."""
    if is_class_method:
        docstring_dict = get_docstring_dict(
            func,
            funcname,
            signature_prefix,
            is_class=False,
            is_class_method=True,
            is_property=False,
        )
        docstring_dict["description"] = docstring_dict["description"].split("\n")[0]
        return docstring_dict

    return get_docstring_dict(func, funcname, signature_prefix, is_class=False)


def get_sig_string_without_annots(func):
    """Returns a string representation of the function signature without annotations."""
    if not callable(func):
        return ""
    # Check if the function is a bound method
    if isinstance(func, types.MethodType):
        # Get the signature of the function object being bound
        sig = inspect.signature(func.__func__)
    else:
        # Get the signature of the function
        sig = inspect.signature(func)
    # Initialize an empty list to store the arguments
    args = []
    # Initialize a variable to store the previous parameter
    prev = None

    # Iterate through the parameters of the function
    for name, param in sig.parameters.items():
        # Skip the "self" parameter for class methods
        if name == "self":
            prev = param
            continue

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

    # Initialize empty dictionary to store function/method/property metadata
    obj_docstring_dict = {}

    # Iterate over the names of the members of the object
    for membername in dir(obj):
        # Skip members starting with an underscore
        if membername.startswith("_"):
            continue

        # if membername == "column_config":
        #     continue

        # Get the member object using its name
        member = getattr(obj, membername)

        # Check if the member is a property
        is_property = isinstance(member, property)
        if is_property:
            member_docstring_dict = get_docstring_dict(
                member,
                membername,
                signature_prefix,
                is_class=False,
                is_class_method=False,
                is_property=True,
            )
            fullname = "{}.{}".format(key_prefix, membername)
            obj_docstring_dict[fullname] = member_docstring_dict
        else:
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
            is_class = inspect.isclass(
                member
            )  # or isinstance(member, streamlit.elements.lib.column_types.ColumnConfigAPI)
            is_property = isinstance(member, property)
            if is_class:
                is_class_method = False
            else:
                is_class_method = (
                    inspect.ismethod(member) and member.__self__ is not None
                )

            member_docstring_dict = get_docstring_dict(
                member,
                membername,
                signature_prefix,
                is_class,
                is_class_method,
                is_property,
            )

        # Add the extracted metadata to obj_docstring_dict
        obj_docstring_dict[fullname] = member_docstring_dict

    return obj_docstring_dict


def get_streamlit_docstring_dict():
    """Get the docstring dict for the streamlit module and its members. Returns a dict of dicts containing the docstring info for each member."""

    obj_key = {
        streamlit: ["streamlit", "st"],
        streamlit.runtime.caching.experimental_memo: [
            "streamlit.experimental_memo",
            "st.experimental_memo",
        ],
        streamlit.runtime.caching.cache_data_api.CacheDataAPI: [
            "streamlit.cache_data",
            "st.cache_data",
        ],
        streamlit.runtime.caching.experimental_singleton: [
            "streamlit.experimental_singleton",
            "st.experimental_singleton",
        ],
        streamlit.runtime.caching.cache_resource_api.CacheResourceAPI: [
            "streamlit.cache_resource",
            "st.cache_resource",
        ],
        streamlit.connections: ["streamlit.connections", "st.connections"],
        streamlit.connections.SQLConnection: [
            "streamlit.connections.SQLConnection",
            "SQLConnection",
        ],
        streamlit.connections.SnowparkConnection: [
            "streamlit.connections.SnowparkConnection",
            "SnowparkConnection",
        ],
        streamlit.connections.ExperimentalBaseConnection: [
            "streamlit.connections.ExperimentalBaseConnection",
            "ExperimentalBaseConnection",
        ],
        streamlit.column_config: [
            "streamlit.column_config",
            "st.column_config",
        ],
        components: ["streamlit.components.v1", "st.components.v1"],
        streamlit._DeltaGenerator: ["DeltaGenerator", "element"],
    }

    module_docstring_dict = {}
    for obj, key in obj_key.items():
        module_docstring_dict.update(get_obj_docstring_dict(obj, key[0], key[1]))

    return module_docstring_dict


if __name__ == "__main__":
    if len(sys.argv) > 1:
        VERSION = sys.argv[1]
    data = get_streamlit_docstring_dict()
    utils.write_to_existing_dict(VERSION, data)
