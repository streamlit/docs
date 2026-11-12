# Usage:
#   uv run --with pytest --with python-frontmatter --with markdown-it-py \
#     --with semver --with pyyaml pytest python/test_mdx_to_markdown.py

from pathlib import Path

from generate_llms_full_txt import page_file_path
from mdx_to_markdown import (
    HANDLED_COMPONENTS,
    leftover_components,
    mdx_to_markdown,
)

import pytest
from markdown_it import MarkdownIt


def test_content_after_jsx_attributes_is_kept():
    # The previous XML round-trip dropped everything after the first JSX
    # attribute: 47 pages of llms-full.txt shipped less than half their text.
    src = (
        '<Collapse title="Table of contents" expanded={true}>\n\n'
        "1. [Basic usage](#basic-usage)\n\n</Collapse>\n\n"
        "<div style={{ maxWidth: '50%', margin: 'auto' }}>\n"
        '<Image src="/images/x.png" alt="Diagram" />\n</div>\n\n'
        '<Autofunction function="streamlit.cache_data" />\n\n'
        "## Basic usage\n\nThe rest of the page."
    )
    out = mdx_to_markdown(src, {"streamlit.cache_data": "SIGNATURE"}.get)
    assert "**Table of contents**" in out
    assert "![Diagram](https://docs.streamlit.io/images/x.png)" in out
    assert "SIGNATURE" in out
    assert out.rstrip().endswith("The rest of the page.")
    assert "{{" not in out and "&gt;" not in out


def test_code_is_left_untouched():
    src = (
        "<Note>\n\nUse `<Note>` in MDX.\n\n</Note>\n\n"
        "```tsx\nconst App = () => <StrictMode><Tip /></StrictMode>;\n"
        "if (a < b && c > d) {}\n```\n"
    )
    out = mdx_to_markdown(src)
    assert "const App = () => <StrictMode><Tip /></StrictMode>;" in out
    assert "if (a < b && c > d) {}" in out
    assert "Use `<Note>` in MDX." in out
    assert leftover_components(out) == []


def test_callout_quotes_every_line_of_nested_code():
    src = "<Tip>\n\nInstall it:\n\n```bash\npip install streamlit\nstreamlit hello\n```\n\n</Tip>"
    out = mdx_to_markdown(src)
    assert out == (
        "> **Tip**\n>\n> Install it:\n>\n"
        "> ```bash\n> pip install streamlit\n> streamlit hello\n> ```\n"
    )


def test_ref_card_becomes_link_description_and_code():
    src = (
        '<TileContainer>\n<RefCard href="/develop/api-reference/write-magic/st.write">\n\n'
        '<Image pure alt="screenshot" src="/images/api/write.jpg" />\n\n'
        "<h4>st.write</h4>\n\nWrite arguments to the app.\n\n"
        '```python\nst.write("Hello")\n```\n\n</RefCard>\n</TileContainer>'
    )
    out = mdx_to_markdown(src)
    assert out == (
        "**[st.write](https://docs.streamlit.io/develop/api-reference/write-magic/st.write)**"
        ': Write arguments to the app.\n\n```python\nst.write("Hello")\n```\n'
    )


def test_embeds_become_links():
    out = mdx_to_markdown(
        '<Cloud name="doc-chart" height="500px" />\n\n<YouTube videoId="abc123" />\n\n'
        '<GitHubIssuesHint label="feature:st.x" name="st.x" />\n\n'
        "See [caching](/develop/concepts/architecture/caching)."
    )
    assert "[Example app: doc-chart](https://doc-chart.streamlit.app/)" in out
    assert "[Watch on YouTube](https://www.youtube.com/watch?v=abc123)" in out
    assert "GitHubIssuesHint" not in out
    assert (
        "(https://docs.streamlit.io/develop/concepts/architecture/caching)"
        in out
    )


def test_unknown_components_are_reported():
    assert leftover_components("Text <NewWidget foo='bar' /> more") == [
        "NewWidget"
    ]


def test_page_file_path(tmp_path: Path):
    assert (
        page_file_path("/develop/api-reference", tmp_path)
        == (tmp_path / "develop" / "api-reference.md").resolve()
    )
    assert page_file_path("/", tmp_path) == (tmp_path / "index.md").resolve()
    with pytest.raises(ValueError):
        page_file_path("/../../etc/passwd", tmp_path)


def test_nested_callouts_become_nested_blockquotes():
    out = mdx_to_markdown(
        "<Tip>\n\nA\n\n<Warning>\n\nB\n\n</Warning>\n\nC\n\n</Tip>"
    )
    assert out == (
        "> **Tip**\n>\n> A\n>\n> > **Warning**\n> >\n> > B\n>\n> C\n"
    )


def test_blank_lines_and_trailing_spaces_in_code_survive():
    src = "<Note>\n\n```python\ndef a():   \n    pass\n\n\nclass B:\n    pass\n```\n\n</Note>"
    out = mdx_to_markdown(src)
    assert "> def a():   \n>     pass\n>\n>\n> class B:" in out


def test_autofunction_attributes_with_angle_brackets():
    out = mdx_to_markdown(
        '<Autofunction function="streamlit.x" deprecated={true} '
        'deprecatedText="<code>st.x</code> was removed." />\n\nAfter.',
        {"streamlit.x": "SIGNATURE"}.get,
    )
    assert out == (
        "> **Deprecation notice**\n>\n> <code>st.x</code> was removed.\n\nSIGNATURE\n\nAfter.\n"
    )


def test_unknown_autofunction_leaves_placeholder():
    out = mdx_to_markdown('<Autofunction function="streamlit.gone" />', {}.get)
    assert out == "[Function 'streamlit.gone' not found]\n"


def test_every_site_component_is_handled():
    # The site registers its MDX components in pages/[...slug].js. A new one
    # needs a rule here too, or its raw JSX leaks into the .md copies.
    import re

    js = (Path(__file__).parent.parent / "pages" / "[...slug].js").read_text()
    registry = js[js.index("const components = {") :]
    registry = registry[: registry.index("\n  };")]
    site_components = set(re.findall(r"^    ([A-Z]\w*)[,:]", registry, re.M))
    # Code renders fenced code blocks; it's never written as a tag in content/.
    assert site_components - {"Code"} <= HANDLED_COMPONENTS


@pytest.mark.parametrize(
    "src, expected",
    [
        (
            '<a href="/develop">Develop</a>',
            '<a href="https://docs.streamlit.io/develop">Develop</a>\n',
        ),
        (
            'Click <i style={{ verticalAlign: "-.25em" }} '
            'className={{ class: "material-icons-sharp" }}>looks_3</i>.',
            "Click `looks_3`.\n",
        ),
        ("<td style={{ fontSize: '1em' }}>x</td>", "<td>x</td>\n"),
        (
            '<Image alt="A" src="/images/a.png" caption="Fig 1" />',
            "![A](https://docs.streamlit.io/images/a.png) *Fig 1*\n",
        ),
        (
            '<Cloud name="doc-x" path="page2" height="400px" />',
            "[Example app: doc-x](https://doc-x.streamlit.app/page2/)\n",
        ),
        (
            '<Tile title="Quickstart" text="Deploy   fast." link="/deploy" />',
            "- **[Quickstart](https://docs.streamlit.io/deploy)**: Deploy fast.\n",
        ),
        ('<h1 style={{display: "none"}}></h1>\n\n# Real', "# Real\n"),
        (
            '<Download href="/images/f.csv">f.csv</Download>',
            "[f.csv](https://docs.streamlit.io/images/f.csv)\n",
        ),
        ("<h3>Sub</h3>", "### Sub\n"),
        (
            "<Note>\n    Indented [link](/x).\n</Note>",
            "> **Note**\n>\n> Indented [link](https://docs.streamlit.io/x).\n",
        ),
        # A failed match on the outer {{ }} must not swallow text up to a
        # later "}}".
        (
            "<div style={{ a: 1 }}>\nLost paragraph one.\n\n<div>\nX\n</div>\n"
            "See <i style={{ v: 1 }}>menu</i>.\n</div>",
            "Lost paragraph one.\n\nX\n\nSee <i>menu</i>.\n",
        ),
        ("A {/** TODO: later **/} B", "A  B\n"),
    ],
)
def test_component_output(src, expected):
    assert mdx_to_markdown(src) == expected


def test_callout_in_list_keeps_the_list_together():
    out = mdx_to_markdown(
        "1. One\n\n   <Note>\n\n   Careful.\n\n   </Note>\n\n2. Two"
    )
    assert out == ("1. One\n\n   > **Note**\n   >\n   > Careful.\n\n2. Two\n")
    tokens = MarkdownIt().parse(out)
    assert sum(t.type == "ordered_list_open" for t in tokens) == 1


def test_unknown_deprecated_function_keeps_its_notice():
    out = mdx_to_markdown(
        '<Autofunction function="st.gone" deprecated={true} '
        'deprecatedText="Removed in 1.0." />',
        {}.get,
    )
    assert out == (
        "> **Deprecation notice**\n>\n> Removed in 1.0.\n\n"
        "[Function 'st.gone' not found]\n"
    )


def test_leftover_check_skips_quoted_code_and_catches_any_name():
    assert leftover_components("> ```jsx\n> <MyComp />\n> ```\n") == []
    assert leftover_components("<Tabs.Tab> <X /> <H2O />") == [
        "H2O",
        "Tabs.Tab",
        "X",
    ]


def test_unwrapped_container_children_are_not_nested():
    out = mdx_to_markdown(
        "<InlineCalloutContainer>\n"
        '    <InlineCallout bold="A." href="/a">First.</InlineCallout>\n'
        '    <InlineCallout bold="B." href="/b">Second.</InlineCallout>\n'
        "</InlineCalloutContainer>"
    )
    assert out == (
        "- **[A.](https://docs.streamlit.io/a)** First.\n"
        "- **[B.](https://docs.streamlit.io/b)** Second.\n"
    )


@pytest.mark.parametrize(
    "src, expected",
    [
        # Wrappers and captions inside a list item stay in the list.
        (
            '1. One\n\n   <Flex>\n   <Image alt="A" src="/a.png" '
            'caption="Cap" />\n   </Flex>\n\n2. Two',
            "1. One\n\n   ![A](https://docs.streamlit.io/a.png) *Cap*\n\n2. Two\n",
        ),
        (
            '1. One\n\n   <Collapse title="More">\n\n   Body.\n\n'
            "   </Collapse>\n\n2. Two",
            "1. One\n\n   **More**\n\n   Body.\n\n2. Two\n",
        ),
    ],
)
def test_blocks_inside_lists_keep_the_list_together(src, expected):
    out = mdx_to_markdown(src)
    assert out == expected
    tokens = MarkdownIt().parse(out)
    assert sum(t.type == "ordered_list_open" for t in tokens) == 1


def test_collapse_inside_callout_stays_inside_the_quote():
    out = mdx_to_markdown(
        '<Note>\n\nA\n\n<Collapse title="C">\n\nB\n\n</Collapse>\n\n</Note>'
    )
    assert out == "> **Note**\n>\n> A\n>\n> **C**\n>\n> B\n"


def test_card_keeps_a_leading_quote_as_its_own_block():
    out = mdx_to_markdown(
        '<RefCard href="/x">\n\n<h4>X</h4>\n\n> Deprecated.\n\n</RefCard>'
    )
    assert out == "**[X](https://docs.streamlit.io/x)**\n\n> Deprecated.\n"


def test_single_quoted_attributes():
    out = mdx_to_markdown("<IconLink href='/a' label='Go' />")
    assert out == "[Go](https://docs.streamlit.io/a)\n"


def test_protocol_relative_links_are_left_alone():
    assert mdx_to_markdown("[a](//cdn.example.com/x)") == (
        "[a](//cdn.example.com/x)\n"
    )


@pytest.mark.parametrize(
    "src",
    [
        # A longer closing fence still closes the block.
        "<Note>\n\n```\n<Tip>x</Tip>\n````\n\n</Note>",
        # CRLF line endings.
        "<Note>\r\n\r\n```\r\n<Tip>x</Tip>  \r\n```\r\n\r\n</Note>",
    ],
)
def test_fence_variants_are_masked(src):
    out = mdx_to_markdown(src)
    assert "<Tip>x</Tip>" in out
    assert "> **Tip**" not in out


def test_inline_code_at_line_start_is_not_a_fence():
    # If this opened a fence, it would run to the real fence below and hide
    # the Note from conversion.
    out = mdx_to_markdown(
        "```st.write``` renders.\n\n<Note>\n\nN\n\n</Note>\n\n```\ncode\n```"
    )
    assert out == (
        "```st.write``` renders.\n\n> **Note**\n>\n> N\n\n```\ncode\n```\n"
    )


def test_nul_bytes_in_source_are_ignored():
    assert mdx_to_markdown("a\x000\x00b `c`") == "a0b `c`\n"
