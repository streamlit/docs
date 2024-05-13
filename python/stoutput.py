"""RST directive to insert an iframe into a doc.
"""
from docutils import nodes
from docutils.parsers.rst import Directive
import re

class StOutput(Directive):
    """This is a do-nothing directive that allows ".. output::" to pass through.

    The ".. output::" directive used to be handled here by converting it into an <iframe>. The
    directive looks like this:

    .. output::
       URL_GOES_HERE
       STYLE_GOES_HERE

    However, to make it easier to change the exact appearance of the <iframe>, we decided to stop
    parsing the directive here and instead just parse it in JS. See /components/block/table.js.

    "But wait", you say, "if we don't parse the directive here, then why do we need this class at
    all???" Ah yes, young one. I see you have not learned the ways of RestructuredText. You see,
    if something looks like a directive but doesn't have a class to go with it, ResT complains.
    So this class is here to tell ResT: take this directive and just shove it right back in the
    string exactly as it was.

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

        node = nodes.raw(
            rawsource="",
            format="html",
            text=self.block_text,
        )

        return [node]


def setup(app):
    app.add_directive("output", StOutput)
