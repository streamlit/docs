# /// script
# dependencies = [
#   "python-frontmatter>=1.0.0",
#   "markdown-it-py>=3.0.0",
#   "semver>=3.0.0",
#   "beautifulsoup4>=4.12.0",
#   "lxml>=4.9.0",
#   "pyyaml>=6.0.0",
# ]
# ///
#
# This file is used to generate llms-full.txt, which contains
# the markdown contents for every page of Streamlit's documentation in
# a single file.
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
from markdown_it import MarkdownIt
import semver
from bs4 import BeautifulSoup, Tag
import yaml


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
            url_path = url.replace("https://docs.streamlit.io/", "")
            order_pos = url_ordering.get(url_path, len(url_ordering))
            return (order_pos, url_path)
        return (len(url_ordering), "")

    return sorted(content_catalog, key=get_sort_key)


def has_markdown_title(content: str) -> Tuple[bool, Optional[str]]:
    """
    Check if markdown content has a title (# heading) at the beginning.

    Args:
        content: Markdown content to check

    Returns:
        Tuple[bool, Optional[str]]: (has_title, title_text if found)
    """
    # Parse the markdown content
    md = MarkdownIt()
    tokens = md.parse(content.strip())

    # Check if the first token is a heading level 1
    if tokens and tokens[0].type == "heading_open" and tokens[0].tag == "h1":
        # Get the title text from the inline content token
        if len(tokens) > 1 and tokens[1].type == "inline":
            return True, tokens[1].content
        return True, None

    return False, None


def get_latest_streamlit_functions() -> Dict[str, Any]:
    """
    Read streamlit_api.json and get the function information from the latest version.

    Returns:
        Dict mapping function names to their information
    """
    try:
        # Read the streamlit_api.json file
        streamlit_json_path = Path(__file__).parent / "streamlit_api.json"
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
            print("No valid version found in streamlit_api.json")
            return {}

        print(f"Using latest version: {latest_version}")

        # Return the function information for the latest version
        version_data = streamlit_data[latest_version]

        return version_data

    except (FileNotFoundError, json.JSONDecodeError, KeyError) as e:
        print(f"Error reading streamlit_api.json: {str(e)}")
        return {}


def format_function_info(func_info: Dict[str, Any]) -> str:
    """
    Format function information as structured markdown.

    Args:
        func_info: Dictionary containing function information from streamlit_api.json

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
        markdown_parts.append(f"* Function signature:\n\n   {signature}\n")

    # Parameters table
    if args:
        markdown_parts.append("* Parameters:\n")
        markdown_parts.append("   | name | type | description |")
        markdown_parts.append("   |---|---|---|")

        for arg in args:
            name = arg.get("name", "")
            type_name = arg.get("type_name", "")
            description = arg.get("description", "")

            # Clean up HTML entities in description
            description = html.unescape(description) if description else ""
            # Remove HTML tags for cleaner output
            description = re.sub(r"<[^>]+>", "", description)
            # Replace newlines with spaces for table format
            description = description.replace("\n", " ").strip()

            markdown_parts.append(f"   | {name} | {type_name} | {description} |")

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


def replace_autofunction_tags(content: str, function_info: Dict[str, Any]) -> str:
    """
    Replace <Autofunction /> tags with actual function information.

    Args:
        content: The markdown content
        function_info: Dictionary mapping function names to their information

    Returns:
        Modified content with Autofunction tags replaced
    """
    # The function_info is the version data directly, functions are stored at the
    # top level
    streamlit_functions = function_info

    # Find all Autofunction tags in the content
    # We need to create valid HTML to parse, so we'll wrap the content in a
    # container
    soup = BeautifulSoup(f"<container>{content}</container>", "xml")

    # Find all Autofunction tags (case-sensitive)
    autofunction_tags = soup.find_all("Autofunction")

    # Replace each tag with the function information
    for tag in autofunction_tags:
        function_name = tag.get("function")
        if function_name and function_name in streamlit_functions:
            # Format the function info as structured markdown
            formatted_info = format_function_info(streamlit_functions[function_name])
            tag.replace_with(f"\n{formatted_info}\n")
        else:
            if function_name:
                print(
                    f"Warning: Function '{function_name}' not found in "
                    "streamlit_api.json"
                )
            # If function not found, remove the tag but leave a placeholder
            tag.replace_with(f"[Function '{function_name}' not found]")

    # Extract the content back, but skip the container tags
    result = str(soup.container)
    # Remove the container tags
    if result.startswith("<container>") and result.endswith("</container>"):
        result = result[11:-12]  # Remove <container> and </container>

    return result


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

            url = f"https://docs.streamlit.io{url}"

            # Add to catalog
            content_catalog.append({"url": url, "content": post.content})
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
        "streamlit_api.json"
    )

    # Process all markdown files
    content_catalog = process_markdown_files(content_dir)

    # Get menu ordering
    menu_file_path = content_dir / "menu.md"
    menu_urls = parse_menu_ordering(menu_file_path)
    url_ordering = create_url_ordering_map(menu_urls)

    # Sort content by menu order
    sorted_content_catalog = sort_content_by_menu_order(content_catalog, url_ordering)

    # Write all content to a single markdown file
    output_file = Path(__file__).parent.parent / "public" / "llms-full.txt"
    try:
        # Combine all content into a single string
        full_content = ""
        for entry in sorted_content_catalog:
            content = entry["content"].strip()
            url = entry["url"]

            # Replace Autofunction tags with actual function information
            content = replace_autofunction_tags(content, streamlit_functions)

            # Check if content has a markdown title
            has_title, _ = has_markdown_title(content)

            if has_title:
                # Content has a title, find the first line end to insert source after it
                lines = content.split("\n", 1)
                if len(lines) > 1:
                    title_line, rest = lines
                    content = f"{title_line}\n\nSource: {url}\n\n{rest}"
                else:
                    # Title is the only content
                    content = f"{content}\n\nSource: {url}"
            else:
                # No title, add source at the beginning
                content = f"Source: {url}\n\n{content}"

            # Add to full content with separator
            full_content += f"{content}\n\n---\n\n"

        # Write to file
        output_file.write_text(full_content, encoding="utf-8")
        print(
            f"Successfully generated {output_file} with content from "
            f"{len(sorted_content_catalog)} pages"
        )
    except Exception as e:
        print(f"Error writing {output_file}: {str(e)}")


if __name__ == "__main__":
    main()
