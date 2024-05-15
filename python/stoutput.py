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

    .. output::
       https://foo.bar.baz/bleep/bloop?plim=plom
       height: 5rem; border: 1px solid red;
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
        name, path, query = re.findall(r'https:\/\/([^\/\s]+)\.streamlit\.app\/?([^?\s]+)?\??([\S]+)?', src)[0]

        if name=="":
            raise ValueError(
                f"Custom subdomain was not recognized.\n--> Culprit: {src}"
            )

        component = f"""<Cloud name="{name}" path="{path}" query="{query}" stylePlaceholder="{additional_styles}" />"""

        node = nodes.raw(
            format="html",
            text=component,
            rawsource=component
        )

        return [node]


def setup(app):
    app.add_directive("output", StOutput)
