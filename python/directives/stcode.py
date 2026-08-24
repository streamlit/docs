"""Custom code-block directive that passes filename via CSS class.

Docutils doesn't preserve arbitrary node attributes as HTML data attributes,
so we encode the filename in a CSS class using base64. The autofunction.js
script can then decode it.
"""
import base64
from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst.directives.body import CodeBlock


class StCode(CodeBlock):
    """Extended code-block directive that supports :filename: option.

    Example RST:
        .. code-block:: toml
            :filename: .streamlit/secrets.toml

            [connections.snowflake]
            account = "xxx"

    The filename is base64-encoded and added as a CSS class with prefix
    'stfilename-'. autofunction.js decodes this and displays the filename
    in the code block header.
    """

    option_spec = CodeBlock.option_spec.copy()
    option_spec["filename"] = directives.unchanged

    def run(self):
        # Let the parent CodeBlock do the heavy lifting
        result = super().run()

        # If filename option is provided, encode it in a CSS class
        if "filename" in self.options:
            filename = self.options["filename"]
            # Base64 encode the filename (URL-safe, no padding)
            encoded = base64.urlsafe_b64encode(filename.encode()).decode().rstrip("=")
            # Walk through result nodes and add the encoded filename as a class
            for node in result:
                if isinstance(node, nodes.literal_block):
                    node["classes"].append(f"stfilename-{encoded}")

        return result


def setup(app):
    app.add_directive("code-block", StCode)
