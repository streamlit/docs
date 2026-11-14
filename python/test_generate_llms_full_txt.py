# Usage:
#   uv run --with pytest --with python-frontmatter --with markdown-it-py \
#     --with semver --with pyyaml pytest python/

from collections import Counter
from functools import lru_cache
from pathlib import Path

from markdown_it import MarkdownIt

from generate_llms_full_txt import (
    get_latest_streamlit_functions,
    process_markdown_files,
    render_page,
)
from generate_llms_txt import markdown_url

CONTENT_DIR = Path(__file__).parent.parent / "content"


# Fences are block tokens, so skip inline parsing.
_BLOCK_PARSER = MarkdownIt().disable("inline")


def _fences(markdown: str) -> Counter:
    tokens = _BLOCK_PARSER.parse(markdown)
    return Counter((t.info, t.content) for t in tokens if t.type == "fence")


@lru_cache(maxsize=None)
def _functions():
    return get_latest_streamlit_functions()


@lru_cache(maxsize=None)
def _entries():
    return tuple(process_markdown_files(CONTENT_DIR))


def _rendered_pages():
    for entry in _entries():
        yield entry, render_page(entry, _functions())


def test_every_code_block_in_content_is_preserved_exactly():
    altered = {}
    for entry, page in _rendered_pages():
        missing = _fences(entry["content"]) - _fences(page)
        if missing:
            altered[entry["url"]] = list(missing)[:1]
    assert altered == {}


def test_long_page_is_not_truncated():
    # Regression: an XML round-trip used to cut this page to 1.3 KB of 49 KB.
    entry = next(
        e
        for e in _entries()
        if e["slug"] == "/develop/concepts/architecture/caching"
    )
    page = render_page(entry, _functions())
    last_heading = [
        line for line in entry["content"].split("\n") if line.startswith("## ")
    ][-1]
    assert last_heading in page
    assert len(page) > 0.9 * len(entry["content"])


def test_page_gets_title_and_source():
    entry = {
        "url": "https://docs.streamlit.io/x",
        "slug": "/x",
        "title": "X page",
        "content": "Body.",
    }
    assert render_page(entry, {}) == (
        "# X page\n\nSource: https://docs.streamlit.io/x\n\nBody.\n"
    )


def test_markdown_url():
    slugs = {"/develop", "/develop/api-reference"}
    assert (
        markdown_url("/develop", slugs)
        == "https://docs.streamlit.io/develop.md"
    )
    assert (
        markdown_url("https://docs.streamlit.io/develop/api-reference", slugs)
        == "https://docs.streamlit.io/develop/api-reference.md"
    )
    assert (
        markdown_url("/not-a-page", slugs)
        == "https://docs.streamlit.io/not-a-page"
    )
    assert (
        markdown_url("https://streamlit.io/x", slugs)
        == "https://streamlit.io/x"
    )
