# /// script
# dependencies = [
#   "python-frontmatter>=1.0.0",
# ]
# ///
#
# This file is used to generate llms.txt, which describes the structure
# of Streamlit's documentation, with links for more info.
#
# The llms.txt file is a standardized format for describing a project's
# structure for Language Learning Models (LLMs), making it easier for
# AI assistants to understand and navigate the documentation.
#
# Usage:
#   uv run generate_llms_txt.py

from typing import Dict, Any, Optional, cast
import frontmatter
from pathlib import Path

# Separator used in menu categories to create hierarchical navigation
# e.g., "Get started / Installation" becomes ["Get started", "Installation"]
CATEGORY_SEP = " / "

# Header text that appears at the top of the generated llms.txt file
INITIAL_TEXT = """\
# Streamlit documentation website

> Streamlit is a powerful open-source Python framework that allows data
scientists and AI/ML engineers to build interactive apps (i.e. data apps)
with only a few lines of code."""


def read_menu_file(menu_file_path: Path) -> Dict[str, Any]:
    """Read and parse the menu file containing the documentation structure.

    Args:
        menu_file_path: Path to the menu.md file

    Returns:
        Dictionary containing the parsed menu structure from the frontmatter
    """
    # Read the menu.md file
    with open(menu_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Parse the frontmatter
    post = frontmatter.loads(content)
    return cast(Dict[str, Any], post.metadata.get("site_menu", {}))


def get_url_to_descriptions_dict(content_dir: Path) -> Dict[str, Optional[str]]:
    """Get a mapping of URLs to their descriptions from markdown files.

    Args:
        content_dir: Directory containing markdown files to process

    Returns:
        Dictionary mapping URLs to their descriptions (None if no description)
    """
    url_to_descriptions_dict: Dict[str, Optional[str]] = {}

    # Walk through all directories and files
    for file_path in content_dir.rglob("*.md"):
        try:
            # Read the content of the markdown file with frontmatter
            post = frontmatter.load(str(file_path))

            url = cast(Optional[str], post.get("slug"))

            if not url:
                continue

            url_to_descriptions_dict[url] = cast(Optional[str], post.get("description"))

        except Exception as e:
            print(f"Error processing {file_path}: {str(e)}")

    return url_to_descriptions_dict


def main() -> None:
    """Generate the llms.txt file from the documentation structure.
    
    This is the main function that orchestrates the entire process:
    1. Reads the menu structure from menu.md
    2. Extracts descriptions from individual markdown files  
    3. Processes menu items to create a hierarchical structure
    4. Generates the final llms.txt file with proper formatting
    """
    # Construct paths relative to this script's location
    # The content directory is a sibling to the python directory
    content_dir = Path(__file__).parent.parent / "content"
    menu_file_path = content_dir / "menu.md"

    try:
        menu_dict = read_menu_file(menu_file_path)
    except Exception as e:
        print("Error reading menu file\n")
        raise e

    url_to_descriptions_dict = get_url_to_descriptions_dict(content_dir)

    output = [INITIAL_TEXT]
    prev_output_is_paragraph = True

    # Process each menu item from the parsed menu structure
    for menu_item in menu_dict:
        menu_item = cast(Dict, menu_item)
        try:
            # Check visibility settings for LLMs
            # Some pages may be hidden from LLMs specifically using 'visible_to_llms'
            if "visible_to_llms" in menu_item:
                if not menu_item["visible_to_llms"]:
                    continue
            else:
                # Fall back to general 'visible' flag if 'visible_to_llms' not specified
                if not menu_item.get("visible", True):
                    continue
                    
            # Skip items without required fields
            if "category" not in menu_item:
                continue
            if "url" not in menu_item:
                continue

            # Parse the hierarchical category structure
            # e.g., "Get started / Installation / Command line" -> ["Get started", "Installation", "Command line"]
            category_list = menu_item["category"].split(CATEGORY_SEP)
            url: str = menu_item["url"]

            # Try to get description from the markdown files first (more detailed)
            # Fall back to description in menu if not found
            description: Optional[str] = url_to_descriptions_dict.get(url, None)
            if not description:
                description = menu_item.get("description", None)

            # The label to display is the last part of the category hierarchy
            # This assumes menu.md is ordered hierarchically
            category_label: str = category_list[-1]

            # Format output based on the hierarchy level
            indentation = ""

            # Level 1: Top-level sections (## headers)
            # e.g., "Get started", "Develop", "Deploy"
            if len(category_list) == 1:
                output.append("")  # Add blank line for separation
                output.append(f"## [{category_label}]({url})")
                if description:
                    output.append("")
                    output.append(description)
                prev_output_is_paragraph = True

            # Level 2: Subsections (### headers)  
            # e.g., "Installation", "Fundamentals", "First steps"
            elif len(category_list) == 2:
                output.append("")  # Add blank line for separation
                output.append(f"### [{category_label}]({url})")
                if description:
                    output.append("")
                    output.append(description)
                prev_output_is_paragraph = True

            # Level 3+: List items with proper indentation
            # e.g., individual tutorial pages, API references
            else:
                if prev_output_is_paragraph:
                    output.append("")

                # Calculate indentation: each level beyond 3 gets 2 spaces
                num_indents = len(category_list) - 3
                indentation = num_indents * "  "
                
                # Format as markdown list item with link
                output.append(f"{indentation}- [{category_label}]({url})")
                if description:
                    output.append(f"{indentation}  {description}")
                prev_output_is_paragraph = False
                
        except Exception as e:
            print(f"--------------------\nError parsing {menu_item['category']}\n")
            raise e

    # Generate the final output file
    # The llms.txt file is placed in the public directory for web serving
    output_file = Path(__file__).parent.parent / "public" / "llms.txt"

    # Join all output lines with newlines and write to file
    output_file.write_text("\n".join(output), encoding="utf-8")
    print(f"Successfully generated {output_file}")


if __name__ == "__main__":
    main()
