---
title: Best practices for building Streamlit apps
slug: /develop/concepts/design/best-practices
description: Recommended patterns for writing clean, accessible, performant, and maintainable Streamlit apps, including styling, layout, widget choice, navigation, state, security, and type checking.
keywords: best practices, recommended patterns, anti-patterns, app design, styling, theming, layout, widgets, selection widgets, navigation, session state, widget keys, secrets, security, accessibility, alt text, type checking, third-party components, use_container_width
---

# Best practices for building Streamlit apps

Streamlit gives you many ways to build the same app. This guide collects recommended patterns that keep your app consistent, accessible, fast, and easy to maintain. Each section links to more detailed guides. Treat these as defaults: if your app clearly needs something different, do what works for your users.

## Summary

1. Prefer native Streamlit commands over custom HTML, CSS, and third-party components.
2. Customize your app's appearance with theming instead of CSS.
3. Use sentence casing, Material Symbols icons, and descriptive labels and `alt` text.
4. Use `width` instead of the deprecated `use_container_width`, and prefer horizontal containers for rows of elements.
5. Pick selection widgets by the number of options.
6. Use `st.navigation` and `st.Page` for multipage apps, and move shared logic into modules.
7. Initialize Session State in one place, and give widgets stable keys.
8. Cache expensive work, and don't loop your script for live updates.
9. Keep secrets in `st.secrets`, and use parameterized queries.
10. Type-check your app.

## Prefer native features

Native Streamlit commands follow your app's theme, support light and dark mode, are accessible, and keep working when you upgrade Streamlit. Use custom HTML only when no native command provides the UI you need.

- Use [`st.iframe`](/develop/api-reference/text/st.iframe) to embed a URL or HTML in an iframe. `st.components.v1.html` and `st.components.v1.iframe` are deprecated.
- Use [`st.html`](/develop/api-reference/text/st.html) for static HTML or CSS that renders directly in your app. JavaScript is ignored unless you set `unsafe_allow_javascript=True`. Never enable it for untrusted content.
- To build a new interactive element, use [Components v2](/develop/concepts/custom-components/components-v2).

Many popular community components now have native equivalents. Community components aren't maintained by Streamlit and can break when you upgrade Streamlit, so prefer the native command when it covers your needs:

| Instead of                  | Use                                                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `streamlit-autorefresh`     | [`@st.fragment(run_every=...)`](/develop/api-reference/execution-flow/st.fragment) on the section that should refresh                                                                          |
| `streamlit-aggrid`          | [`st.dataframe`](/develop/api-reference/data/st.dataframe) with `column_config`, or [`st.data_editor`](/develop/api-reference/data/st.data_editor) for editing                                 |
| `streamlit-folium`          | [`st.map`](/develop/api-reference/charts/st.map) for points, or [`st.pydeck_chart`](/develop/api-reference/charts/st.pydeck_chart) for layered maps                                            |
| `streamlit-option-menu`     | [`st.navigation`](/develop/api-reference/navigation/st.navigation) to switch pages, or [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control) to switch views on a page |
| `streamlit-echarts`         | [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart)                                                                                                                           |
| `streamlit-keyup`           | [`st.text_input(..., live=True)`](/develop/api-reference/widgets/st.text_input)                                                                                                                |
| Cookie managers for sign-in | [`st.login`](/develop/api-reference/user/st.login) and [`st.user`](/develop/api-reference/user/st.user)                                                                                        |
| Hand-built pagination       | [`st.pagination`](/develop/api-reference/widgets/st.pagination)                                                                                                                                |

A community component is still the right choice for behavior Streamlit doesn't provide, like pivot tables, per-column filter menus, or JavaScript callbacks in ECharts options. Before adopting one, check that it's actively maintained and compatible with your Streamlit version.

## Style your app with theming

Set colors, fonts, borders, and spacing in your [theme configuration](/develop/concepts/configuration/theming) instead of injecting CSS. Theming applies consistently to every element, while CSS selectors depend on Streamlit's internal HTML structure, which can change between versions.

```python
# Avoid: CSS that targets internal class names
st.html("<style>.stButton button { background: #0969da; }</style>")
```

```toml
# Prefer: theme options in .streamlit/config.toml
[theme]
primaryColor = "#0969da"
baseRadius = "0.5rem"
showWidgetBorder = true
```

If you need CSS for a single widget, give it a `key` and target its `st-key-<key>` class instead of internal class names or `data-testid` attributes. For an element without a `key` parameter, like `st.markdown` or `st.metric`, wrap it in `st.container(key=...)` and target the container. This is more robust, but the exact HTML structure still isn't guaranteed to stay the same between versions.

## Write clear labels and text

Small details in your copy make your app feel polished and accessible.

- **Use sentence casing** for titles, headers, labels, and buttons. For example, use "Upload your data" instead of "Upload Your Data."
- **Prefer Material Symbols icons over emojis** for buttons, navigation, and labels. Use the `icon` parameter or the `:material/icon_name:` Markdown syntax. Browse icons at [Google Fonts](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.style=Rounded).

  ```python
  st.button("Refresh data", icon=":material/refresh:")
  ```

- **Never use an empty label.** Screen readers use labels to describe widgets. To hide a label, set `label_visibility="collapsed"`.

  ```python
  query = st.text_input("Search", label_visibility="collapsed", placeholder="Search")
  ```

- **Use `alt` on visual elements.** Images, charts, maps, media, iframes, PDFs, and dataframes accept a keyword-only `alt` parameter that names the element for assistive technologies. Keep it short and describe what the user should take away.

  ```python
  st.line_chart(df, x="month", y="revenue", alt="Monthly revenue, up 8% since January")
  ```

- **Use the lightest element that fits.** Use `st.caption` for metadata like timestamps, and reserve `st.info`, `st.warning`, `st.error`, and `st.success` for messages that need attention. Use `st.toast` for confirmations that should disappear on their own. To give an alert a headline, use its `title` parameter instead of bolding the first line.
- **Use dividers sparingly.** Streamlit's default spacing usually separates sections well. Use `st.space` when you need a little more room.

## Lay out elements

- **Use `width` instead of `use_container_width`.** The `use_container_width` parameter is deprecated. Use `width="stretch"` or `width="content"` instead. Dataframes and most charts stretch to fill their container by default. Buttons fit their content by default.

  ```python
  st.dataframe(df)  # Stretches by default
  st.download_button("Download CSV", csv, "orders.csv", width="stretch")
  ```

- **Prefer horizontal containers for rows of elements.** `st.container(horizontal=True)` keeps each element at its own width (buttons fit their content) and wraps elements on narrow screens. Use `st.columns` when you need fixed proportions, and use `st.grid` for tiles that should line up in columns across rows.

  ```python
  with st.container(horizontal=True, horizontal_alignment="right"):
      st.button("Cancel")
      st.button("Save", type="primary")
  ```

- **Align elements side by side.** When a row mixes labeled inputs with buttons, checkboxes, or toggles, set `vertical_alignment="bottom"` so they line up with the input field. For a row of cards, give the cards consistent content (for example, every metric has a `delta` or none does), or set `height="stretch"` so they share a height.

  ```python
  with st.container(horizontal=True, vertical_alignment="bottom"):
      st.text_input("Customer")
      st.toggle("Active only")
      st.button("Search")
  ```

- **Use borders for grouping.** Use `border=True` on `st.container` or `st.metric` to draw a card. On `st.columns` and `st.grid`, `border=True` draws a border around each cell. Forms have a border by default.
- **Use a wide layout for dashboards.** Call `st.set_page_config(layout="wide")` when your app shows a lot of data side by side.

For more information, see [Using layouts and containers](/develop/concepts/design/layouts-and-containers).

## Choose the right widget

For selection widgets, consider how many options there are and whether users should see them all at once:

| Options           | Single selection                                                              | Multiple selections                                                                 |
| ----------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| About two to five | [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control) | [`st.pills`](/develop/api-reference/widgets/st.pills) with `selection_mode="multi"` |
| More than five    | [`st.selectbox`](/develop/api-reference/widgets/st.selectbox)                 | [`st.multiselect`](/develop/api-reference/widgets/st.multiselect)                   |

- Prefer `st.segmented_control` over `st.radio(..., horizontal=True)`. A vertical `st.radio` is still a good choice for longer labels.
- Use `st.toggle` for settings that change the app immediately, and `st.checkbox` for choices in a form, like agreeing to terms.
- Use [`st.feedback`](/develop/api-reference/widgets/st.feedback) for thumbs, faces, or star ratings. A rating can be `0`, so check `rating is not None` instead of `if rating`.
- Use [`st.menu_button`](/develop/api-reference/widgets/st.menu_button) for a button that opens a short list of actions, instead of a popover full of buttons.
- To trigger a one-time action from a dataframe row, like opening a dialog with its details, use [`st.column_config.ButtonColumn`](/develop/api-reference/data/st.column_config/st.column_config.buttoncolumn). Use dataframe selections when the result should persist while the row is selected.

## Structure your app

- Name your entrypoint file `streamlit_app.py`.
- For multipage apps, use [`st.navigation` and `st.Page`](/develop/concepts/multipage-apps/page-and-navigation) instead of the legacy `pages/` directory. They give you more control over your navigation. Put your page files in a folder like `app_pages/`, and give each page a Material Symbols icon.

  ```python
  page = st.navigation(
      [
          st.Page("app_pages/home.py", title="Home", icon=":material/home:"),
          st.Page("app_pages/sales.py", title="Sales", icon=":material/analytics:"),
      ]
  )
  page.run()
  ```

- Move shared logic, like data loading and helpers, into modules that your pages import.

## Manage state and keys

- **Initialize Session State in one place**, near the top of your script, so it's easy to see what state your app uses.

  ```python
  st.session_state.setdefault("filters", {})
  st.session_state.setdefault("selected_account", None)
  ```

- **Don't use module-level mutable variables for per-user data.** Imported modules are shared by every user of your app. Use Session State instead.
- **Give widgets a `key`** when you create widgets in a loop, when their parameters change, or when you need to read or set their value from code. Without a key, changing a widget's label or options can reset its value.
- **Keep keys unique.** In a loop, derive each key from a stable ID, like `key=f"done_{item.id}"`. In a multipage app, keys must be unique across the entrypoint and the current page.
- **Sync widgets to the URL with `bind="query-params"`** instead of reading and writing `st.query_params` by hand. Don't bind sensitive values because URLs appear in browser history and shared links.

  ```python
  sort = st.selectbox("Sort", ["Newest", "Oldest"], key="sort", bind="query-params")
  ```

For more information, see [Session State](/develop/concepts/architecture/session-state) and [Widget behavior](/develop/concepts/architecture/widget-behavior).

## Keep your app fast

- Cache data loading and expensive computation with `st.cache_data`, and shared resources like clients and models with `st.cache_resource`.
- Render titles, filters, and other fast UI before slow work, and use `st.skeleton` to reserve space for slow elements.
- Use `@st.fragment(run_every=...)` for live updates instead of `while True` loops or `time.sleep()` with `st.rerun()`.
- Use forms to batch inputs that feed expensive work.
- Don't run expensive code inside hidden tabs or collapsed expanders.

For explanations and examples, see [Optimizing app performance](/develop/concepts/design/performance). For guidance on charts, see [Choosing and using charts](/develop/concepts/design/charts).

## Keep your app secure

- Store credentials in [`st.secrets`](/develop/concepts/connections/secrets-management), and add `.streamlit/secrets.toml` to your `.gitignore` file.
- Use parameterized queries for user-provided values instead of formatting them into SQL strings.

  ```python
  df = conn.query(
      "SELECT * FROM orders WHERE region = :region",
      params={"region": region},
  )
  ```

- Remove sensitive columns before you display data. Hiding a column with `column_config` only hides it visually; the data is still sent to the browser.

  ```python
  st.dataframe(df.drop(columns=["api_token"]))
  ```

- Treat widget limits like `max_chars` and `max_value` as a convenience, not a security boundary. Validate input in Python before you use it for anything sensitive.

For more information, see [Security reminders](/develop/concepts/connections/security-reminders).

## Type-check your app

Streamlit's public API has type annotations. Run a type checker like [ty](https://docs.astral.sh/ty/) or [mypy](https://mypy-lang.org/) on your app to catch mistakes, like misspelled parameters, before you run it.

```python
st.slider("Count", min_value=0, maximum=10)  # A type checker flags this call
```

To annotate values that Streamlit returns, like chart selection events or data editor state, import types from `streamlit.typing`.
