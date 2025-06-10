# /// script
# dependencies = [
#   "python-frontmatter>=1.0.0",
# ]
# ///
#
# This file is used to generate content_catalog.json, which contains
# the markdown contents for every page of Streamlit's documentation in
# the format [{url: "the_url", content: "the_content"}, ...]
#
# content_catalog.json is used in the RAG pipeline for st-assistant.streamlit.app.
#
# In the future, we may also want to use this file to generate llms.txt
# and llms-full.txt, since they serve a very similar purpose to content_catalog.json.
#
# Usage:
#   uv run generate_content_catalog.py

import json
from typing import List, Dict, Optional
import frontmatter
from pathlib import Path


def process_markdown_files(content_dir: Path) -> List[Dict[str, Optional[str]]]:
    """Process all markdown files in the content directory and its subdirectories.

    Args:
        content_dir: Path to the content directory containing markdown files.

    Returns:
        List of dictionaries containing 'url' (from frontmatter slug) and 'content' for each markdown file.
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
    """Generate a content catalog JSON file from markdown files in the content directory."""
    # Get the content directory path (sibling to the python directory)
    content_dir = Path(__file__).parent.parent / "content"

    # Process all markdown files
    content_catalog = process_markdown_files(content_dir)

    # Write the catalog to a JSON file in the python directory
    output_file = Path(__file__).parent / "content_catalog.json"
    try:
        output_file.write_text(
            json.dumps(content_catalog, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(
            f"Successfully generated {output_file} with {len(content_catalog)} entries"
        )
    except json.JSONEncodeError as e:
        print(f"Error encoding JSON for {output_file}: {str(e)}")
    except Exception as e:
        print(f"Error writing {output_file}: {str(e)}")


if __name__ == "__main__":
    main()
