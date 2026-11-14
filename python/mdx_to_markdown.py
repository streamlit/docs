# Converts the MDX used in content/ into plain Markdown for machine readers.
#
# The docs site renders custom React components (<RefCard>, <Note>, <Cloud>,
# <Autofunction>, ...) and JSX attributes (style={{ ... }}). LLMs and coding
# agents that read llms-full.txt or the per-page .md files can't render those,
# so each component is rewritten into the Markdown it stands for. Code blocks
# and inline code are masked first so examples are never touched.

import html
import re
import textwrap
from typing import Callable, Dict, List, Optional, Tuple

BASE_URL = "https://docs.streamlit.io"

# A fenced code block, possibly indented (in a list) or quoted ("> "). As in
# CommonMark, a backtick fence's info string can't contain backticks (so a
# line starting with ```code``` isn't a fence), and the closing fence may be
# longer than the opening one.
_FENCE_RE = re.compile(
    r"^(?P<prefix>[ \t>]*)(?P<fence>(?P<bt>`{3,})|~{3,})"
    r"(?(bt)[^`\n]*|[^\n]*)\n"  # Info string.
    r"(?:.*?\n)*?"  # Body.
    r"[ \t>]*(?P=fence)(?(bt)`*|~*)[ \t]*$",  # Closing fence.
    re.MULTILINE,
)
_INLINE_CODE_RE = re.compile(r"(`+)[^`\n]+?\1")
_TOKEN_RE = re.compile("\x00(\\d+)\x00")

# The inside of {{ ... }}, with at most one level of nested braces. Brace-
# balanced so a failed match can't run on to a later "}}" and swallow the
# text in between.
_BRACES_BODY = r"[^{}]*(?:\{[^{}]*\}[^{}]*)*"
_DOUBLE_BRACES = rf"\{{\{{{_BRACES_BODY}\}}\}}"
# One attribute: name="v", name='v', name={{ v }}, name={v}, or a bare name.
_ATTR_RE = re.compile(
    r"([A-Za-z_][\w-]*)"
    rf"""(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|\{{\{{({_BRACES_BODY})\}}\}}"""
    r"|\{([^{}]*)\}))?",
)
# A tag's attribute list: anything up to the closing ">" that isn't inside a
# quoted string or a {...} expression.
_ATTRS = (
    rf"""(?:[^<>"'{{}}]|"[^"]*"|'[^']*'|{_DOUBLE_BRACES}|\{{[^{{}}]*\}})*?"""
)

# Callout component -> label shown at the top of its blockquote.
CALLOUTS = {
    "Note": "Note",
    "Tip": "Tip",
    "Important": "Important",
    "Warning": "Warning",
    "Deprecation": "Deprecation notice",
}
UNWRAP = [
    "TileContainer",
    "Flex",
    "Masonry",
    "ComponentSlider",
    "InlineCalloutContainer",
    "DataSourcesContainer",
    "CodeTile",
    "div",
    "section",
    "span",
]
CARDS = ["RefCard", "DataSourcesCard", "ComponentCard"]
DROP_SELF_CLOSING = ["GitHubIssuesHint", "br"]


def parse_attrs(attr_str: str) -> Dict[str, str]:
    attrs: Dict[str, str] = {}
    for m in _ATTR_RE.finditer(attr_str):
        name = m.group(1)
        value = next((g for g in m.groups()[1:] if g is not None), "true")
        attrs[name] = value.strip()
    return attrs


def absolute_url(url: str) -> str:
    if url.startswith("/") and not url.startswith("//"):
        return BASE_URL + url
    return url


def markdown_path(slug: str) -> str:
    """Path of a page's Markdown copy, relative to the site root.

    /develop/api-reference -> develop/api-reference.md, / -> index.md
    """
    return f"{slug.strip('/') or 'index'}.md"


def _collapse(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


class _Masker:
    """Swap code blocks and inline code for tokens, then put them back."""

    def __init__(self) -> None:
        # (prefix the block was written with, block text without that prefix)
        self.chunks: List[Tuple[str, str]] = []

    def _store(self, prefix: str, text: str) -> str:
        self.chunks.append((prefix, text))
        return f"{prefix}\x00{len(self.chunks) - 1}\x00"

    def mask(self, text: str) -> str:
        # A fence's leading indentation or "> " stays outside the token, so
        # conversions can dedent, indent or quote it like any other line.
        text = _FENCE_RE.sub(
            lambda m: self._store(
                m.group("prefix"), m.group(0)[len(m.group("prefix")) :]
            ),
            text,
        )
        return _INLINE_CODE_RE.sub(lambda m: self._store("", m.group(0)), text)

    def restore(self, text: str) -> str:
        def restore_token(match: re.Match) -> str:
            old_prefix, chunk = self.chunks[int(match.group(1))]
            line_start = match.string.rfind("\n", 0, match.start()) + 1
            prefix = match.string[line_start : match.start()]
            if "\n" not in chunk or not re.fullmatch(r"[ \t>]*", prefix):
                return chunk
            # Re-base the block's other lines from its old prefix to the
            # prefix its first line has now.
            first, *rest = chunk.split("\n")
            lines = [first]
            for line in rest:
                line = line[_common_prefix_len(line, old_prefix) :]
                lines.append(prefix + line if line else prefix.rstrip())
            return "\n".join(lines)

        return _TOKEN_RE.sub(restore_token, text)


def _common_prefix_len(a: str, b: str) -> int:
    n = 0
    while n < len(a) and n < len(b) and a[n] == b[n]:
        n += 1
    return n


def _paired(name: str) -> re.Pattern:
    """Match <name ...>body</name>. `name` may be an alternation like "A|B".

    The body can't contain another opening tag from `name`, so each match is
    an innermost one and repeated substitution unwraps nested components.
    """
    return re.compile(
        rf"<(?P<name>{name})(?P<attrs>(?:\s{_ATTRS})?)\s*>"
        rf"(?P<body>(?:(?!<(?:{name})[\s>/]).)*?)"
        r"</(?P=name)\s*>",
        re.DOTALL,
    )


def _self_closing(name: str) -> re.Pattern:
    return re.compile(rf"<{name}(?P<attrs>(?:\s{_ATTRS})?)\s*/>", re.DOTALL)


def _sub_until_stable(
    pattern: re.Pattern, repl: Callable[[re.Match], str], text: str
) -> str:
    while True:
        new_text = pattern.sub(repl, text)
        if new_text == text:
            return text
        text = new_text


def _indent_of(match: re.Match) -> str:
    """Whitespace before the match on its line, e.g. inside a list item."""
    line_start = match.string.rfind("\n", 0, match.start()) + 1
    before = match.string[line_start : match.start()]
    return before if not before.strip() else ""


def _block(lines: List[str], indent: str) -> str:
    """Lay out converted lines as a block at `indent`, so lists continue."""
    return (
        "\n\n"
        + "\n".join(f"{indent}{line}".rstrip() for line in lines)
        + "\n\n"
    )


def _blockquote(label: str, body: str, indent: str = "") -> str:
    # Code is still masked here, so collapsing blank lines is safe.
    body = textwrap.dedent(body).strip("\n")
    body = re.sub(r"\n[ \t]*(?:\n[ \t]*)+\n", "\n\n", body)
    lines = [f"**{label}**", ""] + body.split("\n")
    return _block([f"> {line}" for line in lines], indent)


def _image(attrs: Dict[str, str]) -> str:
    src = attrs.get("src", "")
    if not src:
        return ""
    alt = attrs.get("alt", "") or attrs.get("caption", "")
    out = f"![{_collapse(alt)}]({absolute_url(src)})"
    if attrs.get("caption"):
        # Same line, so the image stays inside a list item or table cell.
        out += f" *{_collapse(attrs['caption'])}*"
    return out


def _card(match: re.Match) -> str:
    attrs = parse_attrs(match.group("attrs"))
    body = match.group("body")
    body = _self_closing("Image").sub("", body)  # Card thumbnails add nothing.
    href = absolute_url(attrs.get("href", ""))

    title = None
    heading = re.search(
        r"<h[1-6][^>]*>(.*?)</h[1-6]>|^#{1,6}[ \t]+([^\n]+)$",
        body,
        re.M | re.S,
    )
    if heading:
        title = _collapse(heading.group(1) or heading.group(2))
        body = body[: heading.start()] + body[heading.end() :]

    body = body.strip()
    if title and href:
        head = f"**[{title}]({href})**"
    elif title:
        head = f"**{title}**"
    else:
        head = f"[{href}]({href})" if href else ""

    # Keep the first paragraph next to the title; anything after it (code
    # examples, more prose) follows as its own block.
    first, sep, rest = body.partition("\n\n")
    is_prose = not re.match(r"[>|#*+-]|\d+[.)]\s|\x00", first.lstrip())
    if first and is_prose:
        head = f"{head}: {_collapse(first)}" if head else _collapse(first)
        body = rest if sep else ""
    return f"\n\n{head}\n\n{body.strip()}\n\n"


def _autofunction(render: Callable[[str], Optional[str]]):
    def repl(match: re.Match) -> str:
        attrs = parse_attrs(match.group("attrs"))
        name = attrs.get("function", "")
        rendered = render(name)
        if rendered is None:
            if name:
                print(
                    f"Warning: Function '{name}' not found in streamlit.json"
                )
            out = f"[Function '{name}' not found]"
        else:
            out = f"\n{rendered}\n"
        if attrs.get("deprecated") and attrs.get("deprecatedText"):
            notice = html.unescape(attrs["deprecatedText"])
            out = _blockquote(CALLOUTS["Deprecation"], notice) + out
        return out

    return repl


def _note_split(match: re.Match) -> str:
    attrs = parse_attrs(match.group("attrs"))
    parts = [f"**{attrs['title']}**"] if attrs.get("title") else []
    if attrs.get("copy"):
        parts.append(attrs["copy"])
    button = attrs.get("button", "")
    text = re.search(r"""text:\s*["']([^"']*)["']""", button)
    link = re.search(r"""link:\s*["']([^"']*)["']""", button)
    if text and link:
        parts.append(f"[{text.group(1)}]({absolute_url(link.group(1))})")
    return "\n\n" + "\n\n".join(parts) + "\n\n"


def _cloud_url(attrs: Dict[str, str]) -> str:
    domain = attrs.get("domain") or f"{attrs.get('name', '')}.streamlit.app"
    path = attrs.get("path", "").strip("/")
    return f"https://{domain.rstrip('/')}/" + (f"{path}/" if path else "")


def _cloud(a: Dict[str, str]) -> str:
    label = a.get("name") or a.get("domain", "")
    return f"[Example app: {label}]({_cloud_url(a)})"


def _youtube(a: Dict[str, str]) -> str:
    video_id = a.get("videoId", "")
    return f"[Watch on YouTube](https://www.youtube.com/watch?v={video_id})"


def _icon_link(a: Dict[str, str]) -> str:
    return f"[{a.get('label', '')}]({absolute_url(a.get('href', ''))})"


def _tile(a: Dict[str, str]) -> str:
    link = absolute_url(a.get("link", ""))
    return (
        f"- **[{a.get('title', '')}]({link})**: {_collapse(a.get('text', ''))}"
    )


def _snowflake_trial(a: Dict[str, str]) -> str:
    text = a.get("text") or "signup.snowflake.com"
    return f"[{text}](https://signup.snowflake.com/)"


# Self-closing components rendered from their attributes alone.
SELF_CLOSING = {
    "Cloud": _cloud,
    "YouTube": _youtube,
    "IconLink": _icon_link,
    "Tile": _tile,
    "SnowflakeTrial": _snowflake_trial,
}


def _download(m: re.Match) -> str:
    href = absolute_url(parse_attrs(m.group("attrs")).get("href", ""))
    return f"[{_collapse(m.group('body'))}]({href})"


def _inline_callout(m: re.Match) -> str:
    a = parse_attrs(m.group("attrs"))
    bold = a.get("bold", "").strip()
    href = absolute_url(a.get("href", ""))
    return f"- **[{bold}]({href})** {_collapse(m.group('body'))}"


def _collapse_block(m: re.Match) -> str:
    title = parse_attrs(m.group("attrs")).get("title", "")
    body = textwrap.dedent(m.group("body")).strip("\n").split("\n")
    return _block([f"**{title}**", ""] + body, _indent_of(m))


def _callout_or_collapse(m: re.Match) -> str:
    if m.group("name") == "Collapse":
        return _collapse_block(m)
    label = CALLOUTS[m.group("name")]
    return _blockquote(label, m.group("body"), _indent_of(m))


def _unwrap(m: re.Match) -> str:
    body = textwrap.dedent(m.group("body")).strip("\n").split("\n")
    return _block(body, _indent_of(m))


def _html_heading(m: re.Match) -> str:
    return f"\n\n{'#' * int(m.group(1))} {_collapse(m.group(2))}\n\n"


def _material_icon(m: re.Match) -> str:
    return f"`{m.group(1)}`" if "material" in m.group(0) else m.group(0)


def mdx_to_markdown(
    content: str,
    autofunction: Optional[Callable[[str], Optional[str]]] = None,
) -> str:
    """Rewrite MDX components and JSX-only syntax in `content` as Markdown.

    `autofunction` maps a function name from <Autofunction function="..." />
    to its rendered Markdown, or None if the function is unknown.
    """
    masker = _Masker()
    content = content.replace("\r\n", "\n").replace("\x00", "")
    text = masker.mask(content)

    # JSX comments: {/* ... */}.
    text = re.sub(r"\{/\*.*?\*/\}", "", text, flags=re.DOTALL)

    if autofunction is not None:
        text = _self_closing("Autofunction").sub(
            _autofunction(autofunction), text
        )

    for name in DROP_SELF_CLOSING:
        text = _self_closing(name).sub("", text)

    for name, render in SELF_CLOSING.items():
        text = _self_closing(name).sub(
            lambda m, render=render: render(parse_attrs(m.group("attrs"))),
            text,
        )
    text = _self_closing("NoteSplit").sub(_note_split, text)

    # Cards strip their own thumbnails, so they run before standalone images.
    text = _sub_until_stable(_paired("|".join(CARDS)), _card, text)

    text = re.sub(
        r"<(?:Image|img)(?P<attrs>(?:\s" + _ATTRS + r")?)\s*/?>",
        lambda m: _image(parse_attrs(m.group("attrs"))),
        text,
    )

    text = _paired("Download").sub(_download, text)
    text = _paired("InlineCallout").sub(_inline_callout, text)

    # Callouts and Collapse in one pass, innermost first, so any of them
    # nested in another ends up inside it (a callout in a Note becomes a
    # nested blockquote).
    text = _sub_until_stable(
        _paired("|".join([*CALLOUTS, "Collapse"])), _callout_or_collapse, text
    )

    # Material icons: <i className={{ class: "material-icons-sharp" }}>x</i>.
    text = re.sub(
        r"<i(?:\s" + _ATTRS + r")?>\s*([a-z0-9_]+)\s*</i>",
        _material_icon,
        text,
    )

    # Hidden headings exist only for the page layout.
    text = re.sub(
        r"<h[1-6]\s+style=\{\{[^}]*display:\s*[\"']none[\"'][^}]*\}\}\s*>"
        r"\s*</h[1-6]>",
        "",
        text,
    )
    text = re.sub(
        r"<h([1-6])(?:\s" + _ATTRS + r")?>(.*?)</h\1>",
        _html_heading,
        text,
        flags=re.DOTALL,
    )

    text = _sub_until_stable(_paired("|".join(UNWRAP)), _unwrap, text)

    # JSX-only attributes on remaining HTML (style={{...}}, className={...}).
    text = re.sub(
        rf"\s(?:style|className)=(?:{_DOUBLE_BRACES}|\{{[^{{}}]*\}})", "", text
    )

    # Root-relative links become absolute so the text stands alone.
    text = re.sub(
        r"\]\((/[^)\s]*)\)", lambda m: f"]({absolute_url(m.group(1))})", text
    )
    text = re.sub(
        r"""href=(["'])(/[^"']*)\1""",
        lambda m: f'href="{absolute_url(m.group(2))}"',
        text,
    )

    # Tidy whitespace while code is still masked, so code is never touched.
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return masker.restore(text).strip() + "\n"


# Every component this module converts or drops; see test_mdx_to_markdown.py.
HANDLED_COMPONENTS = (
    set(CALLOUTS)
    | set(UNWRAP)
    | set(CARDS)
    | set(DROP_SELF_CLOSING)
    | set(SELF_CLOSING)
    | {
        "Autofunction",
        "Collapse",
        "Download",
        "Image",
        "InlineCallout",
        "NoteSplit",
    }
)


def leftover_components(markdown: str) -> List[str]:
    """Names of capitalized (JSX) tags still present outside code."""
    masker = _Masker()
    masked = masker.mask(markdown)
    return sorted(set(re.findall(r"</?([A-Z][\w.]*)(?=[\s>/])", masked)))
