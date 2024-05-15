"""RST directive to insert an iframe into a doc.
"""
from docutils import nodes
from docutils.parsers.rst import Directive
import re

class StOutput(Directive):
    """Convert the ".. output" directive into a <Cloud> component.

    The ".. output::" directive looks like this:

    .. output::
       URL
       STYLE

    And it outputs something like:

        <Cloud name="SUBDOMAIN" path="SUBPATH" query="QUERYPARAMS" stylePlaceholder="STYLE" />

    ...where every attribute is guaranteed to be present (even when empty) and there's always
    exactly one space before/after each attribute.

    Parameters
    ----------
        URL
            The full path of the Streamlit app to embed, including protocol.
        STYLE (optional)
            A string of inline styles.

    Examples
    --------

    .. output::
       https://foo.bar.baz

       <Cloud name="foo" path="" query="" stylePlaceholder="" />

    .. output::
       https://foo.bar.baz/bleep/bloop?plim=plom
       height: 5rem; border: 1px solid red;

       <Cloud name="foo" path="bleep/bloop" query="plim=plom" stylePlaceholder="height: 5rem; border: 1px solid red;" />
    """

    has_content = True
    required_arguments = 1
    optional_arguments = 1
    final_argument_whitespace = True

    def run(self):
        src = self.arguments[0]
        if not src.startswith("https://"):
            raise ValueError(
                f"Please use HTTPS in '.. output::' directives\n--> Culprit: {src}"
            )
        if len(self.arguments) > 1:
            additional_styles = self.arguments[1]
        else:
            additional_styles = ""
        name, path, query = re.findall(
            r'https:\/\/([^\/\s]+)\.streamlit\.app\/?([^?\s]+)?\??([\S]+)?', src)[0]

        if name=="":
            raise ValueError(
                f"Custom subdomain was not recognized.\n--> Culprit: {src}"
            )

        component = (
            '<Cloud'
            f' name="{name}"'
            f' path="{path}"'
            f' query="{query}"'
            f' stylePlaceholder="{additional_styles}"'
            ' />')

        node = nodes.raw(
            format="html",
            text=component,
            rawsource=component
        )

        return [node]


def setup(app):
    app.add_directive("output", StOutput)
