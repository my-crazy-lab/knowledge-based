#!/bin/bash

# Usage: ./generate_markdown_catalog.sh path/to/file.md
# chmod +x generate_markdown_catalog.sh

if [ -z "$1" ]; then
  echo "Usage: $0 path/to/markdown_file.md"
  exit 1
fi

FILE="$1"

if [ ! -f "$FILE" ]; then
  echo "Error: File not found: $FILE"
  exit 1
fi

echo "**Catalog**"
echo

counter=1

# This function transforms header titles into GitHub-style anchor links
slugify() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9 ]//g' | sed -E 's/ /-/g'
}

# Read headers and generate Markdown catalog
while read -r line; do
  if [[ "$line" =~ ^# ]]; then
    header_level=$(echo "$line" | grep -o '^#\+' | wc -c)
    header_level=$((header_level - 1)) # `#` is level 1

    title=$(echo "$line" | sed -E 's/^#+ //')
    anchor=$(slugify "$title")

    indent=""
    if [ "$header_level" -eq 1 ]; then
      echo "$counter. [$title](#$anchor)  "
      ((counter++))
    elif [ "$header_level" -eq 2 ]; then
      echo "    - [$title](#$anchor)"
    fi
  fi
done < "$FILE"

# Append separator
echo
echo "---"
