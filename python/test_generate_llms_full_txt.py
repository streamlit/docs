# Usage:
#   uv run --with pytest --with python-frontmatter --with markdown-it-py \
#     --with semver --with pyyaml pytest python/test_generate_llms_full_txt.py

from generate_llms_full_txt import replace_autofunction_tags

FUNCTIONS = {"streamlit.cache_data": {"signature": "st.cache_data(func=None)"}}


def test_content_after_jsx_attributes_is_kept():
    # Regression: an XML round-trip dropped everything after the first JSX
    # attribute, truncating ~50 pages of llms-full.txt.
    page = (
        "Intro.\n\n"
        '<Collapse title="Table of contents" expanded={true}>\n\n'
        "1. [Basic usage](#basic-usage)\n\n</Collapse>\n\n"
        "<div style={{ maxWidth: '50%', margin: 'auto' }}>\n</div>\n\n"
        '<Autofunction function="streamlit.cache_data" />\n\n'
        "## Basic usage\n\nUse `a < b && c > d` freely.\n"
    )
    out = replace_autofunction_tags(page, FUNCTIONS)
    assert "st.cache_data(func=None)" in out
    assert "<Autofunction" not in out
    before, _, after = page.partition(
        '<Autofunction function="streamlit.cache_data" />'
    )
    assert out.startswith(before)
    assert out.endswith(after)


def test_quoted_attributes_may_contain_angle_brackets():
    page = (
        '<Autofunction function="streamlit.cache_data" deprecated={true} '
        'deprecatedText="<code>st.cache</code> was removed." />\nAfter.'
    )
    out = replace_autofunction_tags(page, FUNCTIONS)
    assert "st.cache_data(func=None)" in out
    assert "deprecatedText" not in out
    assert out.endswith("\nAfter.")


def test_unknown_function_leaves_placeholder():
    out = replace_autofunction_tags(
        '<Autofunction function="streamlit.gone" />', FUNCTIONS
    )
    assert out == "[Function 'streamlit.gone' not found]"
