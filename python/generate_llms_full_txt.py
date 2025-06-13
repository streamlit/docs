#!/usr/bin/env -S uv run --script
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

"""
This script generates llms-full.txt, which contains the markdown contents for every page
of Streamlit's documentation in a single file.

The script processes all markdown files in the content directory, extracts their content
and frontmatter, and combines them into a single file while preserving the menu ordering.
The output is used in the RAG pipeline for st-assistant.streamlit.app.

Usage:
    uv run generate_llms_full_txt.py

The script expects:
    - A content directory with markdown files
    - A menu.md file defining the ordering
    - streamlit_api.json for function documentation
"""

import json
import re
from typing import List, Dict, Optional, Tuple, Any, cast
import logging
import sys
from pathlib import Path

import frontmatter
from markdown_it import MarkdownIt
import semver
from bs4 import BeautifulSoup, Tag
import yaml
import utils

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    stream=sys.stdout,
)
logger = logging.getLogger(__name__)

# Type aliases for better readability
ContentEntry = Dict[str, Optional[str]]
ContentCatalog = List[ContentEntry]
URLOrderMap = Dict[str, int]
FunctionInfo = Dict[str, Any]


class DocumentationError(Exception):
    """Base exception class for documentation generation errors."""

    pass


class MenuParsingError(DocumentationError):
    """Raised when there's an error parsing the menu file."""

    pass


class ContentProcessingError(DocumentationError):
    """Raised when there's an error processing content files."""

    pass


def parse_menu_ordering(menu_file_path: Path) -> List[str]:
    """Parse menu.md file to extract the URL ordering.

    The menu file contains frontmatter with a site_menu list that defines
    the ordering of documentation pages.

    Args:
        menu_file_path: Path to the menu.md file

    Returns:
        List of URLs in the order they appear in menu.md

    Raises:
        MenuParsingError: If there's an error reading or parsing the menu file
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

    except FileNotFoundError:
        raise MenuParsingError(f"Menu file not found at {menu_file_path}")
    except (yaml.YAMLError, frontmatter.FrontmatterError) as e:
        raise MenuParsingError(f"Error parsing menu.md: {str(e)}")
    except Exception as e:
        raise MenuParsingError(f"Unexpected error parsing menu.md: {str(e)}")


def create_url_ordering_map(menu_urls: List[str]) -> URLOrderMap:
    """Create a mapping from URL to its position in the menu ordering.

    Args:
        menu_urls: List of URLs in menu order

    Returns:
        Dictionary mapping URL to its position (lower numbers come first)
    """
    return {url: idx for idx, url in enumerate(menu_urls)}


def sort_content_by_menu_order(
    content_catalog: ContentCatalog, url_ordering: URLOrderMap
) -> ContentCatalog:
    """Sort content catalog based on menu ordering.

    Args:
        content_catalog: List of content entries with 'url' and 'content' keys
        url_ordering: Dictionary mapping URLs to their order positions

    Returns:
        Sorted content catalog with root URL first, followed by menu order,
        and unordered content at the end
    """

    def get_sort_key(entry: ContentEntry) -> Tuple[int, str]:
        """Get sort key for an entry as (order_position, url) tuple.

        Special cases:
        - Root URL (/) gets position -1 to always appear first
        - Items not in menu get high order position to appear at end
        """
        url = entry.get("url", "")
        if not url:
            return (len(url_ordering), "")

        # Remove the base URL part to match with menu URLs
        url_path = url.replace("https://docs.streamlit.io/", "")

        # Special case: root URL should come first
        if not url_path:
            return (-1, "")

        order_pos = url_ordering.get(url_path, len(url_ordering))
        return (order_pos, url_path)

    return sorted(content_catalog, key=get_sort_key)


def has_markdown_title(content: str) -> Tuple[bool, Optional[str]]:
    """Check if markdown content has a title (# heading) at the beginning.

    Args:
        content: Markdown content to check

    Returns:
        Tuple containing:
            - Boolean indicating if content has a title
            - The title text if found, None otherwise
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


def get_latest_streamlit_functions() -> FunctionInfo:
    """Read streamlit_api.json and get the function information from the latest version.

    Returns:
        Dictionary mapping function names to their information

    Raises:
        DocumentationError: If there's an error reading or parsing the JSON file
    """
    try:
        streamlit_json_path = Path(__file__).parent / "streamlit_api.json"
        return utils.get_latest_data(str(streamlit_json_path))
    except Exception as e:
        raise DocumentationError(f"Failed to load streamlit_api.json: {str(e)}")


def format_function_info(func_info: FunctionInfo) -> str:
    """Format function information as structured markdown.

    Args:
        func_info: Dictionary containing function information from streamlit_api.json

    Returns:
        Formatted markdown string with function signature, parameters, and return info
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
            f"* Function signature:\n\n   ```python\n   {signature}\n   ```\n"
        )

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


def replace_autofunction_tags(content: str, function_info: FunctionInfo) -> str:
    """Replace <Autofunction /> tags with actual function information.

    Args:
        content: The markdown content
        function_info: Dictionary mapping function names to their information

    Returns:
        Modified content with Autofunction tags replaced with formatted function docs

    Raises:
        DocumentationError: If there's an error processing the content
    """
    try:
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
                formatted_info = format_function_info(
                    streamlit_functions[function_name]
                )
                tag.replace_with(f"\n{formatted_info}\n")
            else:
                if function_name:
                    logger.warning(
                        f"Function '{function_name}' not found in streamlit_api.json"
                    )
                # If function not found, remove the tag but leave a placeholder
                tag.replace_with(f"[Function '{function_name}' not found]")

        # Extract the content back, but skip the container tags
        result = str(soup.container)
        # Remove the container tags
        if result.startswith("<container>") and result.endswith("</container>"):
            result = result[11:-12]  # Remove <container> and </container>

        return result

    except Exception as e:
        raise DocumentationError(f"Failed to process Autofunction tags: {str(e)}")


def process_markdown_files(content_dir: Path) -> ContentCatalog:
    """Process all markdown files in the content directory and its subdirectories.

    Args:
        content_dir: Path to the content directory containing markdown files.

    Returns:
        List of dictionaries containing 'url' (from frontmatter slug) and 'content'
        for each markdown file.

    Raises:
        ContentProcessingError: If there's an error processing the markdown files
    """
    content_catalog: ContentCatalog = []

    try:
        # First process index.md specially to ensure it's first
        index_path = content_dir / "index.md"
        if index_path.exists():
            try:
                post = frontmatter.load(index_path)
                # For index.md, we use the root URL
                url = "https://docs.streamlit.io/"
                # Add title from frontmatter if it exists
                title = post.get("title")
                content = post.content
                if title:
                    content = f"# {title}\n\n{content}"
                content_catalog.append({"url": url, "content": content})
            except frontmatter.FrontmatterError as e:
                logger.error(f"Error parsing frontmatter in {index_path}: {str(e)}")
            except Exception as e:
                logger.error(f"Error processing {index_path}: {str(e)}")

        # Walk through all directories and files
        for file_path in content_dir.rglob("*.md"):
            # Skip index.md since we already processed it
            if file_path == index_path:
                continue

            try:
                # Read the content of the markdown file with frontmatter
                post = frontmatter.load(file_path)

                # Get the URL from frontmatter slug if it exists
                url = post.get("slug")
                if not url:
                    logger.warning(f"Skipping {file_path} - no slug in frontmatter")
                    continue

                url = f"https://docs.streamlit.io{url}"
                content = post.content
                if not content:
                    logger.warning(f"Skipping {file_path} - empty content")
                    continue

                # Add to catalog
                content_catalog.append({"url": url, "content": content})
            except frontmatter.FrontmatterError as e:
                logger.error(f"Error parsing frontmatter in {file_path}: {str(e)}")
            except Exception as e:
                logger.error(f"Error processing {file_path}: {str(e)}")

        return content_catalog

    except Exception as e:
        raise ContentProcessingError(f"Failed to process markdown files: {str(e)}")


def main() -> None:
    """Generate a single markdown file from all content in the content directory.

    The function:
    1. Loads Streamlit function information from streamlit_api.json
    2. Processes all markdown files in the content directory
    3. Orders content according to menu.md
    4. Combines everything into a single markdown file

    Raises:
        DocumentationError: If there's an error during documentation generation
    """
    try:
        # Get the content directory path (sibling to the python directory)
        content_dir = Path(__file__).parent.parent / "content"
        if not content_dir.exists():
            raise DocumentationError(f"Content directory not found at {content_dir}")

        # Get the latest Streamlit function information
        logger.info("Loading Streamlit function information...")
        streamlit_functions = get_latest_streamlit_functions()
        logger.info(
            f"Loaded information for {len(streamlit_functions)} functions from "
            "streamlit_api.json"
        )

        # Process all markdown files
        logger.info("Processing markdown files...")
        content_catalog = process_markdown_files(content_dir)
        logger.info(f"Processed {len(content_catalog)} markdown files")

        # Get menu ordering
        logger.info("Parsing menu ordering...")
        menu_file_path = content_dir / "menu.md"
        menu_urls = parse_menu_ordering(menu_file_path)
        url_ordering = create_url_ordering_map(menu_urls)
        logger.info(f"Found {len(menu_urls)} URLs in menu ordering")

        # Sort content by menu order
        logger.info("Sorting content by menu order...")
        sorted_content_catalog = sort_content_by_menu_order(
            content_catalog, url_ordering
        )

        # Write all content to a single markdown file
        output_file = Path(__file__).parent.parent / "public" / "llms-full.txt"
        logger.info(f"Writing combined content to {output_file}...")

        try:
            # Combine all content into a single string
            full_content = ""
            for entry in sorted_content_catalog:
                content = entry.get("content", "")
                url = entry.get("url", "")

                if not content or not url:
                    logger.warning("Skipping entry with missing content or URL")
                    continue

                # Type check and clean content
                if not isinstance(content, str):
                    logger.warning(f"Skipping non-string content for URL {url}")
                    continue

                content = content.strip()

                # Replace Autofunction tags with actual function information
                content = replace_autofunction_tags(content, streamlit_functions)

                # Check if content has a markdown title
                has_title, _ = has_markdown_title(content)

                # Format content with source URL
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
            logger.info(
                f"Successfully generated {output_file} with content from "
                f"{len(sorted_content_catalog)} pages"
            )

        except Exception as e:
            raise DocumentationError(f"Failed to write output file: {str(e)}")

    except DocumentationError as e:
        logger.error(str(e))
        sys.exit(1)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
