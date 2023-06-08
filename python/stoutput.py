"""RST directive to insert an iframe into a doc.
"""
from docutils import nodes
from docutils.parsers.rst import Directive


class StOutput(Directive):
    """Insert Streamlit app into HTML doc.

    The first argument is a URL to be iframed, and the second argument
    (optional) is a string of inline styles to assign to the iframe.

    Examples
    --------

        .. output::
        https://static.streamlit.io/0.25.0-2EdmD/index.html?id=jD8gaXYmw8WZeSNQbko9p

        .. output::
        https://static.streamlit.io/0.25.0-2EdmD/index.html?id=jD8gaXYmw8WZeSNQbko9p
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
                "Iframed URLs in docs should be HTTPS!\n" "--> Culprit: %s" % src
            )

        if len(self.arguments) > 1:
            additional_styles = self.arguments[1]
        else:
            additional_styles = "height: 10rem;"

        node = nodes.raw(
            rawsource="",
            format="html",
            text="""
                <iframe
                    loading="lazy"
                    src="%(src)s?embed=true"
                    style="
                        width: 100%%;
                        border: none;
                        margin-bottom: 1rem;
                        %(additional_styles)s
                    "
                    allow="camera;clipboard-read;clipboard-write;"
                ></iframe>
            """
            % {"src": src, "additional_styles": additional_styles},
        )
        return [node]


def setup(app):
    app.add_directive("output", StOutput)
