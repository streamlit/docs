---
name: update-docs-for-release
description: Update the streamlit/docs repo for a new Streamlit release. Covers branch setup, release notes, API docstring generation, config.toml, API tiles/pages, and removing or deprecating commands and parameters. Use when the user asks to update docs for a new Streamlit release, add release notes, generate docstrings, or add API tiles for new commands.
disable-model-invocation: true
---

# Streamlit release docs update

Follow these steps in order for each new Streamlit release (`x.y.0`).

## 1. Branch setup

Pull the latest `main` and create a release branch:

```bash
git checkout main && git pull origin main
git checkout -b docs/streamlit-x.y-release
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

## 5. Example apps

New demo apps can be added both for brand-new commands and for existing commands that gained a parameter (a new example is often added to demonstrate it). So check for newly added `<Cloud name="...">` embeds across all commands, not just new ones.

The reliable way to find them is to diff the embedded Cloud names between the previous and new version keys in `python/streamlit.json`. For example:

```bash
cd python
.venv-generate/bin/python -c "
import json, re
d = json.load(open('streamlit.json'))
def cloud_names(ver):
    out = {}
    for k, v in d[ver].items():
        for field in ('example', 'examples'):
            for m in re.findall(r'<Cloud[^>]*name=\"([^\"]+)\"', v.get(field, '') or ''):
                out.setdefault(k, set()).add(m)
    return out
prev, new = cloud_names('x.y-1.0'), cloud_names('x.y.0')
for k, names in new.items():
    added = names - prev.get(k, set())
    if added:
        print(k, sorted(added))
"
```

Every embed printed is a new interactive app that needs to be deployed to Community Cloud.

For each new Cloud embed found:

1. Extract the `name` attribute (e.g. `doc-mermaid-chart`) — this is the required subdomain.
2. Extract the code from the adjacent `<pre>` block (strip HTML tags and unescape HTML entities).
3. Save the code to `python/api-examples-source/<section>.<command_or_variant>.py` following the existing naming convention (e.g. `charts.mermaid_chart.py`, `status.skeleton_standalone.py`).

After adding all files, present a table to the user:

| App             | Deploy link                                                                                                                                                  | GitHub file                                                                                           | Subdomain      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | -------------- |
| `<description>` | [Deploy](https://share.streamlit.io/deploy?repository=streamlit/docs&branch=main&mainModule=python/api-examples-source/<filename>.py&subdomain=<cloud-name>) | [<filename>.py](https://github.com/streamlit/docs/blob/main/python/api-examples-source/<filename>.py) | `<cloud-name>` |

The user will handle deploying the apps to Community Cloud.

## 6. Configuration options

After generating docstrings, compare Streamlit's live config with the docs. The source of truth is `streamlit config show` from the same virtualenv used in step 3:

```bash
cd python
.venv-generate/bin/python -c "import streamlit; print(streamlit.__version__)"
.venv-generate/bin/python -m streamlit config show
```

**Primary file:** `content/develop/api-reference/configuration/config-toml.md`

Diff the option keys and comments from `streamlit config show` against that page:

- **Added options** — copy the CLI description into the matching `[section]` TOML block, using the same comment style as neighboring options.
- **Changed descriptions or defaults** — update the existing comments (for example allowed values, inheritance rules, or default numbers).
- **Removed options** — delete them from `config-toml.md`. If other pages still mention the option (FAQs, theming guides, tutorials), update or remove those references too.

Do not paste every `theme.light.*` / `theme.dark.*` key as its own table. Document those as inheriting from `[theme]` (and `[theme.sidebar]` where applicable), and only list exceptions that cannot be set per light/dark/sidebar.

**Related pages** — if theme or server options changed, check whether these still match the CLI:

- `content/develop/concepts/configuration/theming.md`
- `content/develop/concepts/configuration/theming-fonts.md`
- `content/develop/concepts/configuration/theming-colors-and-borders.md`

Release-note bullets about `client.*`, `server.*`, `runner.*`, or `theme.*` are a useful hint for what moved, but `streamlit config show` is authoritative.

## 7. Removed and deprecated APIs

If this version **removes** or **deprecates** commands or parameters, update the current docs to match. Start from the release notes (removal and deprecation bullets) and confirm against the new `python/streamlit.json` key:

```bash
cd python
.venv-generate/bin/python -c "
import json
d = json.load(open('streamlit.json'))
prev, new = d['x.y-1.0'], d['x.y.0']
print('removed commands:', sorted(set(prev) - set(new)))
for k in sorted(set(prev) & set(new)):
    old_args = {a['name'] for a in (prev[k].get('args') or [])}
    new_args = {a['name'] for a in (new[k].get('args') or [])}
    gone = sorted(old_args - new_args)
    if gone:
        print(f'removed params on {k}:', gone)
"
```

Do not edit historical yearly release-note pages. Search `content/` (skip `content/develop/quick-references/release-notes/` except the current version) plus `python/api-examples-source/`, `python/generate.py`, `content/menu.md`, and `content/develop/quick-references/api-cheat-sheet.md`.

### Deprecated (still in Streamlit)

Keep the API page. Mark it so readers see the replacement:

- On the detail page Autofunction: `deprecated={true}` and a `deprecatedText` that names the version and the replacement, for example:

```markdown
<Autofunction function="streamlit.<command>" deprecated={true} deprecatedText="<code>st.<command></code> was deprecated in version x.y.0 and will be removed in a later version. Use <a href='/develop/api-reference/<section>/st.<replacement>'><code>st.<replacement></code></a> instead."/>
```

- Add `deprecated` to the page `keywords`.
- On the section `_index.md` RefCard: `deprecated={true}`. If the section already groups deprecated APIs (for example **Deprecated classes**), put the tile there.
- Parameter deprecations usually flow from docstrings (`.. deprecated::` is parsed into `streamlit.json`). Still rewrite tutorials, cheat-sheet snippets, and extra examples that recommend the old parameter as current.

### Removed

Clear the command or parameter from anything that presents it as current API:

- **Parameters** — they drop from the new Autofunction after docstring generation. Remove them from extra examples, tutorials, concept pages, cheat-sheet snippets, and `python/api-examples-source/` files. Rewrite those examples to the replacement API.
- **Commands with a dedicated page** — keep the slug so old links work. Strip the live Autofunction body down to a deprecation stub whose `deprecatedText` says the command was deprecated in version A and **removed** in this version, and points to the replacement (see `content/develop/api-reference/charts/bokeh_chart.md`). Keep the `content/menu.md` entry.
- **Commands or methods without a dedicated page** (for example a DeltaGenerator method) — delete Autofunctions, tiles, and cheat-sheet lines, and rewrite tutorials or demo apps that still call them.
- If `generate.py` errors because an object no longer exists, remove that entry from `obj_key` (or related dicts) and re-run, as in step 3.

## 8. Commit and push

Make focused commits per logical unit of work (release notes, docstrings, config, API tiles, deprecations/removals, images, example apps). Push to the branch and open a PR against `main`.
