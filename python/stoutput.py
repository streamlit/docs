"""RST directive to insert an iframe into a doc.
"""
from docutils import nodes
from docutils.parsers.rst import Directive
import re

class StOutput(Directive):
    """Insert Streamlit app into HTML doc.

    This converts the RestructuredText directive ".. output::" to an intermediate format that's
    easier to parse in JS. Then in JS, we convert that to an iframe.

    The first argument is a URL to be iframed, and the second argument (optional) is a string of
    inline styles to assign to the iframe. So the directive looks like this:

        .. output::
        URL_GOES_HERE
        STYLE_GOES_HERE

    The intermediate format looks like this:

        [[!URL_GOES_HERE||STYLE_GOES_HERE!]]

    The reason we're using the intermediate format instead of just outputting an <iframe> here
    is that we'd like that iframe to be wrapped in a bunch of fancy HTML. And we'd like to be
    able to change that HTML without having to rebuild the JSON file that this script ultimately
    produces.

    The code that parses this intermediate format is at /components/blocks/table.js

    Examples
    --------

    This directive...

        .. output::
        https://foo.bar.baz

    ...becomes:

        [[!https://foo.bar.baz||!]]

    And this directive...

        .. output::
        https://foo.bar.baz/bleep/bloop?plim=plom
        height: 5rem; border: 1px solid red;

    ...becomes:

        [[!https://foo.bar.baz/bleep/bloop?plim=plom||height: 5rem; border: 1px solid red;!]]
    """

    has_content = True
    required_arguments = 1
    optional_arguments = 1
    final_argument_whitespace = True

    def run(self):
        src = self.arguments[0]

        if not src.startswith("https://"):
            raise ValueError(
                "Iframed URLs in docs should be HTTPS!\n" "--> Culprit: %s" % src
            )

        if len(self.arguments) > 1:
            additional_styles = self.arguments[1]
        else:
            additional_styles = "height: 10rem;"

        node = nodes.raw(
            rawsource="",
            format="html",
            text=f"[[!{src}||{additional_styles}!]]",
        )
        return [node]


def setup(app):
    app.add_directive("output", StOutput)
