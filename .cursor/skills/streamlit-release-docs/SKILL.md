---
name: streamlit-release-docs
description: Update the streamlit/docs repo for a new Streamlit release. Covers branch setup, release notes, API docstring generation, and API tiles/pages. Use when the user asks to update docs for a new Streamlit release, add release notes, generate docstrings, or add API tiles for new commands.
disable-model-invocation: true
---

# Streamlit release docs update

Follow these steps in order for each new Streamlit release (`x.y.0`).

## 1. Branch setup

Pull the latest `main` and create a release branch:

```bash
git checkout main && git pull origin main
git checkout -b docs/streamlit-x.y-release-notes
```

## 2. Release notes

You need the release notes text. If the user hasn't provided them, ask them to run the `generating-changelog` skill in the `streamlit/streamlit` repo and paste the output here.

**Two files to update:**

**`content/develop/quick-references/release-notes/_index.md`**

- Replace the current `## **Version x.x.0 (latest)**` section with the new release
- Keep the "Older versions" links section at the bottom unchanged

**`content/develop/quick-references/release-notes/<year>.md`**

- Prepend the new version section above the previous latest release

Format each section as:

```markdown
## **Version x.y.0**

_Release date: Month D, YYYY_

**Highlights**
...

**Notable Changes**
...

**Other Changes**
...
```

Remove any duplicate bullets from the provided notes before adding them.

## 3. Docstring generation

Run `python/generate.py` in a clean virtualenv with the correct Streamlit version.

```bash
cd python
python3 -m venv .venv-generate
.venv-generate/bin/pip install -q streamlit docstring-parser docutils numpydoc
.venv-generate/bin/python -c "import streamlit; print(streamlit.__version__)"
.venv-generate/bin/python generate.py
```

**Important:**

- Always target the `x.y.0` release key in `streamlit.json`, not patch releases (e.g. `1.59.0` not `1.59.2`). After running, rename the key if pip installed a patch release: `sed -i '' 's/"x.y.z":/"x.y.0":/' python/streamlit.json` and do the same for GitHub source URLs in the blob links.
- If the script errors on a removed API (e.g. a deleted connection type), remove that entry from the `obj_key` dict in `generate.py` and re-run.
- Format `streamlit.json` with Prettier after generating: `npx prettier --write python/streamlit.json`
- Verify the diff: only a new `"x.y.0"` top-level key should appear — no existing version keys should be modified or removed. Check with: `git diff python/streamlit.json | grep "^@@"`— there should be exactly one hunk at the end of the file.

## 4. API tiles and pages

For each **new command** introduced in the release (not new parameters on existing commands), add a tile and detail page.

**Detail page** — create `content/develop/api-reference/<section>/st.<command>.md`:

```markdown
---
title: st.<command>
slug: /develop/api-reference/<section>/st.<command>
description: <one-line description>
keywords: st.<command>, ...
---

<Autofunction function="streamlit.<command>" />
```

For column config types, use `content/develop/api-reference/data/column_config/<name>.md` with:

```markdown
<Autofunction function="streamlit.column_config.<TypeName>" />
```

**Tile** — add to both:

1. The section's `_index.md` (e.g. `content/develop/api-reference/status/_index.md`)
2. The main `content/develop/api-reference/_index.md`

Tile format:

````markdown
<RefCard href="/develop/api-reference/<section>/st.<command>">

<Image pure alt="screenshot" src="/images/api/<command>.jpg" />

<h4>Title</h4>

One-line description.

```python
st.<command>(...)
```
````

</RefCard>
```

**Menu** — add an entry in `content/menu.md` in the correct position.

**Images** — do not generate images. Ask the user to provide one, and point them to the Figma template file for reference:
https://www.figma.com/design/MOGYWhaoD7OON4HsnbAT1z/API-illustrations?node-id=0-1&t=bs0XekxOUD8pO0to-1

Tell them the required format:

- **Format:** JPG
- **Size:** 862×862px for data/widget elements, 862×816px for status/layout elements (match the dimensions of a similar existing image in `public/images/api/`)
- They can also provide a PNG and you will convert it with: `sips -s format jpeg input.png --out public/images/api/<name>.jpg`

Place images at `public/images/api/<name>.jpg`.

## 5. Commit and push

Make focused commits per logical unit of work (release notes, docstrings, API tiles, images). Push to the branch and open a PR against `main`.
