from pathlib import Path
from urllib.parse import urlparse
import argparse
import os
import re
import sys

from PIL import Image
from markdown_it import MarkdownIt

def is_remote_url(url):
    """Check if the URL is remote (starts with http:// or https://)."""
    parsed = urlparse(url)
    return bool(parsed.scheme and parsed.scheme in ['http', 'https'])

def is_svg_file(url):
    """Check if the URL points to an SVG file."""
    return url.lower().endswith('.svg')

def get_image_dimensions(image_path):
    """Get the width and height of an image file."""
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            return width, height
    except Exception as e:
        print(f"Error getting dimensions for {image_path}: {e}")
        return None, None

def extract_image_attributes(html_content):
    """Extract all attributes from an Image component."""
    # First, extract just the Image tag
    image_tag_pattern = r'<Image[^>]+>'
    image_tag_match = re.search(image_tag_pattern, html_content)
    if not image_tag_match:
        return {}
    
    image_tag = image_tag_match.group(0)
    
    # Match all attributes: name="value" or name={value} or just name
    attr_pattern = r'(\w+)(?:=(?:{([^}]+)}|"([^"]+)")|(?:\s|>))'
    matches = re.finditer(attr_pattern, image_tag)
    
    attributes = {}
    for match in matches:
        name = match.group(1)
        if name not in ['Image', '/']: # Skip the tag name and closing slash
            # Value is either in group 2 (JSX) or group 3 (string) or None (flag attribute)
            value = match.group(2) if match.group(2) is not None else match.group(3)
            is_jsx = match.group(2) is not None
            if value is None:  # Handle flag attributes like 'clean'
                attributes[name] = (True, False)
            else:
                attributes[name] = (value, is_jsx)
    
    # If there's a parent div with style, extract it
    div_style_pattern = r'<div\s+style=({[^}]+})[^>]*>\s*<Image'
    div_style_match = re.search(div_style_pattern, html_content)
    if div_style_match:
        attributes['style'] = (div_style_match.group(1).strip(), True)
    
    return attributes

def process_image(src, alt, file_path, content_dir, project_root, existing_attrs=None):
    """Process an image and return an Image component with dimensions."""
    # Initialize attributes with existing ones or empty dict
    existing_attrs = existing_attrs or {}
    
    # Skip remote images
    if is_remote_url(src):
        print(f"Skipping remote image in {file_path}: {src}")
        return build_image_tag(src, alt, None, None, existing_attrs)
    
    # Skip SVG files
    if is_svg_file(src):
        print(f"Skipping SVG file in {file_path}: {src}")
        return build_image_tag(src, alt, None, None, existing_attrs)
    
    # Handle paths starting with / (convert to public directory)
    if src.startswith('/'):
        src_path = 'public' + src
        image_path = os.path.join(project_root, src_path)
    else:
        # Handle relative paths
        file_dir = os.path.dirname(file_path)
        image_path = os.path.join(file_dir, src)
    
    # Get image dimensions
    width, height = get_image_dimensions(image_path)
    if width is None or height is None:
        return build_image_tag(src, alt, None, None, existing_attrs)
    
    return build_image_tag(src, alt, width, height, existing_attrs)

def build_image_tag(src, alt, width, height, existing_attrs):
    """Build an Image component tag with all attributes."""
    # Start with src and alt
    attrs = [f'src="{src}"']
    if alt:
        attrs.append(f'alt="{alt}"')
    
    # Add width and height
    attrs.extend([
        f'width={{{width}}}',
        f'height={{{height}}}'
    ])
    
    # Add all other existing attributes
    for name, (value, is_jsx) in existing_attrs.items():
        if name not in ['src', 'alt', 'width', 'height', 'style']:  # Skip attributes we handle specially
            if value is True:  # Handle flag attributes
                attrs.append(name)
            elif is_jsx:
                attrs.append(f'{name}={{{value}}}')
            else:
                attrs.append(f'{name}="{value}"')
    
    return f'<Image {" ".join(attrs)} />'

def process_file(file_path, content_dir, project_root):
    """Process a single file and add dimensions to Image tags."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"\nProcessing {file_path}")
        
        md = MarkdownIt()
        tokens = md.parse(content)
        
        # Track the original content and replacements
        modified_content = content
        made_changes = False
        
        # Process all tokens
        for token in tokens:
            # Handle Markdown image tokens
            if token.type == 'image':
                src = token.attrs.get('src', '')
                alt = token.attrs.get('alt', '')
                old_content = f'![{alt}]({src})'
                new_content = process_image(src, alt, file_path, content_dir, project_root)
                if old_content in modified_content and old_content != new_content:
                    modified_content = modified_content.replace(old_content, new_content)
                    made_changes = True
            
            # Handle HTML Image components
            elif token.type in ['html_inline', 'html_block']:
                content_part = token.content
                if '<Image' in content_part:
                    # Find just the Image tag using regex
                    image_pattern = r'<Image[^>]+>'
                    for match in re.finditer(image_pattern, content_part):
                        image_tag = match.group(0)
                        # Extract all existing attributes
                        attrs = extract_image_attributes(image_tag)
                        
                        # Get src and alt from attributes
                        src = attrs.get('src', ('', False))[0]
                        alt = attrs.get('alt', ('', False))[0]
                        
                        if src:
                            # Skip if width and height are already present
                            if 'width' not in attrs and 'height' not in attrs:
                                new_content = process_image(src, alt, file_path, content_dir, project_root, attrs)
                                if image_tag in modified_content and image_tag != new_content:
                                    modified_content = modified_content.replace(image_tag, new_content)
                                    made_changes = True
        
        # Write back to file if changes were made
        if made_changes:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(modified_content)
            print(f"Updated image dimensions in {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    # Set up argument parser with a more detailed description
    parser = argparse.ArgumentParser(
        description=(
            'Add width and height attributes to Image components in Markdown/MDX files.\n\n'
            'This script will:\n'
            '- Process all .md and .mdx files in the specified directory recursively\n'
            '- Convert Markdown image syntax to Image components\n'
            '- Add width and height attributes based on the actual image dimensions\n'
            '- Skip remote images and SVG files\n'
            '- Preserve all other attributes and surrounding HTML'
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter  # This preserves the newlines in the description
    )
    parser.add_argument(
        'content_dir',
        help='Directory containing Markdown/MDX files to process (e.g., "content" or "docs/content")'
    )

    # If no arguments are provided, print help and exit
    if len(sys.argv) == 1:
        parser.print_help()
        print("\nExample usage:")
        print("  python add_image_dimensions.py content")
        print("  python add_image_dimensions.py docs/content")
        sys.exit(1)

    args = parser.parse_args()
    
    # Check if directory exists
    if not os.path.isdir(args.content_dir):
        print(f"Error: Directory '{args.content_dir}' does not exist")
        print("\nPlease provide a valid directory path. Example usage:")
        print("  python add_image_dimensions.py content")
        print("  python add_image_dimensions.py docs/content")
        sys.exit(1)
    
    # Convert content_dir to absolute path and get project root
    content_dir = os.path.abspath(args.content_dir)
    project_root = os.path.dirname(content_dir)
    
    # Walk through all files in the content directory
    for root, _, files in os.walk(content_dir):
        for file in files:
            if file.endswith(('.md', '.mdx')):  # Process markdown files
                file_path = os.path.join(root, file)
                process_file(file_path, content_dir, project_root)

if __name__ == "__main__":
    main()
