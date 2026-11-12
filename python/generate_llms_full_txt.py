# /// script
# dependencies = [
#   "python-frontmatter>=1.0.0",
#   "semver>=3.0.0",
#   "pyyaml>=6.0.0",
# ]
# ///
#
# This file generates the machine-readable copies of the docs:
#
# - public/llms-full.txt: the markdown contents of every page in one file.
# - public/<slug>.md: one markdown file per page, so agents can fetch any
#   page as markdown by appending ".md" to its URL.
#
# MDX components are rewritten as plain markdown (see mdx_to_markdown.py).
#
# llms-full.txt is used in the RAG pipeline for st-assistant.streamlit.app.
#
# Usage:
#   uv run generate_llms_full_txt.py

import json
import re
from typing import List, Dict, Optional, Tuple, Any
import frontmatter
from pathlib import Path
import semver
import yaml

from mdx_to_markdown import (
    BASE_URL,
    leftover_components,
    markdown_path,
    mdx_to_markdown,
)


def parse_menu_ordering(menu_file_path: Path) -> List[str]:
    """
    Parse menu.md file to extract the URL ordering.

    Args:
        menu_file_path: Path to the menu.md file

    Returns:
        List of URLs in the order they appear in menu.md
    """
    try:
        # Read the menu.md file
        with open(menu_file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Parse the frontmatter
        post = frontmatter.loads(content)
        site_menu = post.metadata.get("site_menu", [])

        # Extract URLs in order
        urls = []
        for item in site_menu:
            if "url" in item and item["url"]:
                url = item["url"]
                # Normalize URL by removing leading slash if present
                if url.startswith("/"):
                    url = url[1:]
                urls.append(url)

        return urls

    except (FileNotFoundError, yaml.YAMLError, frontmatter.FrontmatterError) as e:
        print(f"Error parsing menu.md: {str(e)}")
        return []


def create_url_ordering_map(menu_urls: List[str]) -> Dict[str, int]:
    """
    Create a mapping from URL to its position in the menu ordering.

    Args:
        menu_urls: List of URLs in menu order

    Returns:
        Dictionary mapping URL to its position (lower numbers come first)
    """
    return {url: idx for idx, url in enumerate(menu_urls)}


def sort_content_by_menu_order(
    content_catalog: List[Dict[str, Optional[str]]], url_ordering: Dict[str, int]
) -> List[Dict[str, Optional[str]]]:
    """
    Sort content catalog based on menu ordering.

    Args:
        content_catalog: List of content entries with 'url' and 'content' keys
        url_ordering: Dictionary mapping URLs to their order positions

    Returns:
        Sorted content catalog
    """

    def get_sort_key(entry: Dict[str, Optional[str]]) -> Tuple[int, str]:
        """
        Get sort key for an entry. Returns (order_position, url) tuple.
        Items not in menu get a high order position to appear at the end.
        """
        url = entry.get("url", "")
        if url:
            # Remove the base URL part to match with menu URLs
            # e.g., "https://docs.streamlit.io/develop" -> "develop"
            url_path = url.replace(f"{BASE_URL}/", "")
            order_pos = url_ordering.get(url_path, len(url_ordering))
            return (order_pos, url_path)
        return (len(url_ordering), "")

    return sorted(content_catalog, key=get_sort_key)


def get_latest_streamlit_functions() -> Dict[str, Any]:
    """
    Read streamlit.json and get the function information from the latest version.

    Returns:
        Dict mapping function names to their information
    """
    try:
        # Read the streamlit.json file
        streamlit_json_path = Path(__file__).parent / "streamlit.json"
        with open(streamlit_json_path, "r") as f:
            streamlit_data = json.load(f)

        # Find the latest version using semver
        latest_version = None
        for version in streamlit_data.keys():
            try:
                if (
                    latest_version is None
                    or semver.compare(version, latest_version) > 0
                ):
                    latest_version = version
            except ValueError:
                # Skip non-semver versions
                continue

        if latest_version is None:
            print("No valid version found in streamlit.json")
            return {}

        print(f"Using latest version: {latest_version}")

        # Return the function information for the latest version
        version_data = streamlit_data[latest_version]

        return version_data

    except (FileNotFoundError, json.JSONDecodeError, KeyError) as e:
        print(f"Error reading streamlit.json: {str(e)}")
        return {}


def format_function_info(func_info: Dict[str, Any]) -> str:
    """
    Format function information as structured markdown.

    Args:
        func_info: Dictionary containing function information from streamlit.json

    Returns:
        Formatted markdown string
    """
    import html
    import re

    # Extract basic info
    signature = func_info.get("signature", "")
    args = func_info.get("args", [])
    returns = func_info.get("returns", [])

    # Start building the markdown
    markdown_parts = []

    # Function signature
    if signature:
        markdown_parts.append(
            f"* Function signature:\n\n   ```python\n   {html.unescape(signature)}\n   ```\n"
        )

    # Parameters table
    if args:
        markdown_parts.append("* Parameters:\n")
        markdown_parts.append("   | name | type | default | description |")
        markdown_parts.append("   |---|---|---|---|")

        for arg in args:
            name = arg.get("name", "")
            type_name = arg.get("type_name", "")
            default = arg.get("default", "")
            if default is None:
                default = ""
            description = arg.get("description", "")

            # Clean up HTML entities in description
            description = html.unescape(description) if description else ""
            # Remove HTML tags for cleaner output
            description = re.sub(r"<[^>]+>", "", description)
            # Replace newlines with spaces for table format
            description = description.replace("\n", " ").strip()

            markdown_parts.append(
                f"   | {name} | {type_name} | {default} | {description} |"
            )

        markdown_parts.append("")  # Empty line after table

    # Returns section
    if returns and len(returns) > 0:
        return_info = returns[0]
        return_type = return_info.get("type_name", "")
        return_description = return_info.get("description", "")

        # Clean up HTML entities and tags in return description
        return_description = (
            html.unescape(return_description) if return_description else ""
        )
        return_description = re.sub(r"<[^>]+>", "", return_description)
        return_description = return_description.strip()

        markdown_parts.append(f"* Returns: {return_type}\n")
        if return_description:
            markdown_parts.append(f"    {return_description}\n")

    return "\n".join(markdown_parts)


def process_markdown_files(content_dir: Path) -> List[Dict[str, Optional[str]]]:
    """
    Process all markdown files in the content directory and its subdirectories.

    Args:
        content_dir: Path to the content directory containing markdown files.

    Returns:
        List of dictionaries containing 'url' (from frontmatter slug) and 'content'
        for each markdown file.
    """
    content_catalog: List[Dict[str, Optional[str]]] = []

    # Walk through all directories and files
    for file_path in content_dir.rglob("*.md"):
        try:
            # Read the content of the markdown file with frontmatter
            post = frontmatter.load(file_path)

            # Get the URL from frontmatter slug if it exists, otherwise set to null
            url = post.get("slug")

            if not url:
                continue

            url = f"{BASE_URL}{url}"

            # Add to catalog
            content_catalog.append(
                {
                    "url": url,
                    "slug": post.get("slug"),
                    "title": post.get("title"),
                    "content": post.content,
                }
            )
        except frontmatter.FrontmatterError as e:
            print(f"Error parsing frontmatter in {file_path}: {str(e)}")
        except Exception as e:
            print(f"Error processing {file_path}: {str(e)}")

    return content_catalog


def main() -> None:
    """Generate a single markdown file from all content in the content directory."""
    # Get the content directory path (sibling to the python directory)
    content_dir = Path(__file__).parent.parent / "content"

    # Get the latest Streamlit function information
    streamlit_functions = get_latest_streamlit_functions()
    print(
        f"Loaded information for {len(streamlit_functions)} functions from "
        "streamlit.json"
    )

    # Process all markdown files
    content_catalog = process_markdown_files(content_dir)

    # Get menu ordering
    menu_file_path = content_dir / "menu.md"
    menu_urls = parse_menu_ordering(menu_file_path)
    url_ordering = create_url_ordering_map(menu_urls)

    # Sort content by menu order
    sorted_content_catalog = sort_content_by_menu_order(content_catalog, url_ordering)

    public_dir = Path(__file__).parent.parent / "public"
    pages = [
        (entry, render_page(entry, streamlit_functions))
        for entry in sorted_content_catalog
    ]

    leftovers = sorted(
        {name for _, page in pages for name in leftover_components(page)}
    )
    if leftovers:
        # Fail the build: a new component needs a rule in mdx_to_markdown.py,
        # or its raw JSX ships to every agent reading the docs.
        raise SystemExit(
            f"MDX components left unconverted: {', '.join(leftovers)}. "
            "Handle them in python/mdx_to_markdown.py."
        )

    write_page_files(pages, public_dir)

    output_file = public_dir / "llms-full.txt"
    full_content = "".join(f"{page.strip()}\n\n---\n\n" for _, page in pages)
    output_file.write_text(full_content, encoding="utf-8")
    print(f"Successfully generated {output_file} with content from {len(pages)} pages")


def render_page(entry: Dict[str, Optional[str]], functions: Dict[str, Any]) -> str:
    """Return one page as standalone markdown: title, source URL, body."""

    def render_function(name: str) -> Optional[str]:
        info = functions.get(name)
        return None if info is None else format_function_info(info)

    content = mdx_to_markdown(entry["content"].strip(), render_function)
    url = entry["url"]

    if not content.startswith("# ") and entry.get("title"):
        content = f"# {entry['title']}\n\n{content}"

    if content.startswith("# "):
        title_line, _, rest = content.partition("\n")
        return f"{title_line}\n\nSource: {url}\n\n{rest.strip()}\n"
    return f"Source: {url}\n\n{content}"


def page_file_path(slug: str, public_dir: Path) -> Path:
    """Map a page slug to the .md file that serves it, e.g. /develop -> develop.md."""
    path = (public_dir / markdown_path(slug)).resolve()
    if public_dir.resolve() not in path.parents:
        raise ValueError(f"Slug {slug!r} resolves outside {public_dir}")
    return path


def write_page_files(
    pages: List[Tuple[Dict[str, Optional[str]], str]], public_dir: Path
) -> None:
    """Write each page to public/<slug>.md so <url>.md serves its markdown."""
    for entry, page in pages:
        path = page_file_path(entry["slug"], public_dir)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(page, encoding="utf-8")
    print(f"Successfully generated {len(pages)} per-page .md files in {public_dir}")


if __name__ == "__main__":
    main()
