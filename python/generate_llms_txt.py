# /// script
# dependencies = [
#   "python-frontmatter>=1.0.0",
# ]
# ///
#
# This file is used to generate llms.txt, which describes the structure
# of Streamlit's documentation, with links for more info.
#
# Usage:
#   uv run generate_llms_txt.py

from typing import Dict, Any, Optional, cast
import frontmatter
from pathlib import Path

CATEGORY_SEP = " / "

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
        List of dictionaries containing menu items and their metadata
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
    """Generate the llms.txt file from the documentation structure."""
    # Get the content directory path (sibling to the python directory)
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

    for menu_item in menu_dict:
        menu_item = cast(Dict, menu_item)
        try:
            if "visible_to_llms" in menu_item:
                if not menu_item["visible_to_llms"]:
                    continue
            else:
                if not menu_item.get("visible", True):
                    continue
            if "category" not in menu_item:
                continue
            if "url" not in menu_item:
                continue

            category_list = menu_item["category"].split(CATEGORY_SEP)
            url: str = menu_item["url"]

            description: Optional[str] = url_to_descriptions_dict.get(url, None)

            if not description:
                description = menu_item.get("description", None)

            # This assumes menu.md is in order.
            category_label: str = category_list[-1]

            indentation = ""

            if len(category_list) == 1:
                output.append("")
                output.append(f"## {category_label}")
                output.append(f"({url})")
                if description:
                    output.append("")
                    output.append(description)
                prev_output_is_paragraph = True

            elif len(category_list) == 2:
                output.append("")
                output.append(f"### {category_label}")
                output.append(f"({url})")
                if description:
                    output.append("")
                    output.append(description)
                prev_output_is_paragraph = True

            else:
                if prev_output_is_paragraph:
                    output.append("")

                num_indents = len(category_list) - 3
                indentation = num_indents * "  "
                output.append(f"{indentation}- [{category_label}]({url})")
                if description:
                    output.append(f"{indentation}  {description}")
                prev_output_is_paragraph = False
        except Exception as e:
            print(f"--------------------\nError parsing {menu_item['category']}\n")
            raise e

    # Write all content to a single markdown file
    output_file = Path(__file__).parent.parent / "public" / "llms.txt"

    # Write to file
    output_file.write_text("\n".join(output), encoding="utf-8")
    print(f"Successfully generated {output_file}")


if __name__ == "__main__":
    main()
