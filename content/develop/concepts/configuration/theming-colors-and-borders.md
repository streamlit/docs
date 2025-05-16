---
title: Colors and borders
slug: /develop/concepts/configuration/theming-customize-colors-and-borders
---

# Customize colors and borders in your Streamlit app

## Color values

For all configuration options that accept a color, you can specify the value with one of the following strings:

- A CSS [`<named-color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color) like `"darkblue"` or `"maroon"`.
- A HEX string like `"#483d8b"` or `"#6A5ACD"`.
- An RGB string like `"rgb(106, 90, 205)"` or `"RGB(70, 130, 180)"`.
- An HSL string like `"hsl(248, 53%, 58%)"` or `"HSL(147, 50%, 47%)"`.

<Tip>

While it is possible for you to specify an alpha value for your colors, this isn't recommended. Streamlit adjusts the alpha value of colors to ensure contextually appropriate shading between background and foreground.

</Tip>

## Default Streamlit colors

Streamlit comes with two preconfigured themes: light and dark. If you don't specify any theme configuration options, then for each user, Streamlit will attempt to use the preconfigured theme that best matches their browser settings.

## Color and border configuration options

Most theme configuration options can be set for your whole app, with the option to override it with a different value for the sidebar. For example, your app's primary color (`primaryColor`) is used to highlight interactive elements and show focus. If you set `theme.primaryColor`, this will change the primary color for your whole app. However, if you set `theme.sidebar.primaryColor`, this will override `theme.primaryColor` in the sidebar, allowing you to use two different primary colors.

The following two configuration options can only be applied to the whole app:

- `theme.base` sets the default colors for your app's theme to match one of Streamlit's two default themes (`"light"` or `"dark"`). If any theme configuation option is used and `theme.base` is not set, then Streamlit will use `"light"`.
- `theme.showSidebarBorder` sets the visibility of the border between the sidebar and the main body of your app.

The following configuration options can be set separately for the sidebar by using the `[theme.sidebar]` table instead of the `[theme]` table in `config.toml`:

- `theme.primaryColor`
- `theme.backgroundColor`
- `theme.secondaryBackgroundColor`
- `theme.textColor`
- `theme.linkColor`
- `theme.codeBackgroundColor`
- `theme.baseRadius`
- `theme.borderColor`
- `theme.showWidgetBorder`

For brevity, on the rest of this page, theming configuration options will not include the `theme.` or `theme.sidebar.` prefix.

### `primaryColor`

`primaryColor` defines the accent color most often used throughout your Streamlit
app. The following features and effects use your primary color:

- Button hover effects.
- Elements in focus.
- Selected elements.

<Tip>

When your primary color is used as a background, Streamlit changes the text color to white. For example, this happens for `type="primary"` buttons and for selected items in `st.multiselect`.

For legibility, always choose a primary color that is dark enough to contrast well with white text.

</Tip>

#### Example 1: Primary color

The following configuration example has a `"forestGreen"` primary color. In the sidebar, the configuration overrides the primary color to `"darkGoldenrod"`. If you click inside a widget, Streamlit displays a border around the widget to show that it's in focus. Additionally, if you hover over the secondary and tertirary buttons, the hover color matches the primary color.

```toml
[theme]
base="dark"
primaryColor="forestGreen"

[theme.sidebar]
primaryColor="darkGoldrod"
```

<Cloud name="doc-theming-color-primarycolor" height="350px" />

### `backgroundColor`, `secondaryBackgroundColor`, and `codeBackgroundColor`

`backgroundColor` defines the background color of your app.

`secondaryBackgroundColor` is used for contrast in the following places:

- The background of input or selection regions for widgets.
- Headers within elements like `st.dataframe` and `st.help`.
- Code blocks and inline code (if `codeBackgroundColor` is not set).

`codeBackgroundColor` sets the background for code blocks and line code. If `codeBackgroundColor` is not set, Streamlit uses `secondaryBackgroundColor` instead.

<Note>

If you do not define background colors for the sidebar, Streamlit will will swap `backgroundColor` and `secondaryBackgroundColor` in the sidebar:

- If `theme.sidebar.backgroundColor` is not defined, Streamlit uses `theme.secondaryBackgroundColor`.
- If `theme.sidebar.secondaryBackgroundColor` is not defined, Streamlit uses `theme.backgroundColor`.

</Note>

#### Example 2: Background colors

The following configuration example has a dark background, with the main body a shade darker than the sidebar. These dark backgrounds have a hint of blue-green to coordinate with the `"darkSlateGray"` used for code backgrounds everywhere in the app. In the main body of the app, the secondary background color is `"indigo"`. In the sidebar, the secondary background is `"darkGoldenrod"`. To see the secondary color used for a hover effect, hover over each of the dataframe cells.

```toml
[theme]
base="dark"
backgroundColor="#162025"
secondaryBackgroundColor="indigo"
codeBackgroundColor="darkSlateGray"

[theme.sidebar]
backgroundColor="#253137"
secondaryBackgroundColor="darkGoldenrod"
```

<Cloud name="doc-theming-color-backgroundcolor" height="450px" />

### `textColor` and `linkColor`

You can configure the color of body text and links.

`textColor` sets the default text color for all text in the app except language-highlighting in code blocks, inline code, and links. `linkColor` sets the default font color for all Markdown links in the app.

The following element are impacted by `textColor`:

- Markdown text, except links.
- Text in code blocks that's not colored otherwise from language highlighting.
- App-chrome and sidebar menu icons.
- Widget labels, icons, option text, and placeholder text.
- Dataframe and table text.
- Non-Markdown links, like `st.page_link`, `st.link_button`, and the navigation menu.

As noted previously, Streamlit changes the text color to white when text is displayed against your primary color.

#### Example 3: Text colors

The following configuration example has `"darkGoldenrod"` text and `"darkOrchid"` links on a `"dark"` base. Buttons (including `st.link_button`) use the `"darkGoldenrod"` text color. In the multiselect widget, the placehoder text, drop-down menu, and tooltip all have `"darkGoldenrod"` text. If you hover over the sidebar, the scrollbar and collapse icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>chevron_left</i>) are `"darkGoldenrod"`.

```toml
[theme]
base="dark"
textColor="darkGoldenrod"
linkColor="darkOrchid"
```

<Cloud name="doc-theming-color-textcolor" height="400px" />

### `baseRadius`

`baseRadius` defines the radius of borders and backgrounds for various of elements. The following elements are impacted by `baseRadius`:

- Buttons and input areas on widgets.
- Selected items, including items in `st.multiselect` and the navigation menu.
- Code blocks and inline code.
- Dataframes (exterior).
- Badges and Markdown-text backgrounds.
- Containers with borders, inlcuding expanders, forms, dialogs, popovers, and toasts.
- Tooltips, including toolips within charts.
- Status and exception message blocks.
- Images, including `st.graphviz` and `st.pyplot` which display as static images.

A few elements are notably not impacted by `baseRadius` (except for sub-elements like tooltips). Interactive charts and videos, which have a more complex underlying HTML, will always have square corners. This includes `st.video`, `st.map`, and `st.pydeck_chart`. Conversely, `st.chat_input` and `st.audio_input` will always be fully rounded.

#### Example 4: Border radius

```toml
[theme]
base="light"
primaryColor="slateBlue"
backgroundColor="mintCream"
secondaryBackgroundColor="darkSeaGreen"
baseRadius="full"

[theme.sidebar]
backgroundColor="aliceBlue"
secondaryBackgroundColor="skyBlue"
baseRadius="none"
```

<Cloud name="doc-theming-color-baseradius" height="400px" />

### `borderColor` and `showWidgetBorder`

Streamlit does not display borders for unfocused widgets by default (except for buttons). When a user focuses on a widget, Streamlit displays a border around the input area in your `primaryColor`. When the user removes focus, Streamlit hides the border.

If you set `showWidgetBorder=true`, Streamlit will display widget borders when the widget is not in focus. For unfocused widgets, the border color is set by `borderColor`. If `borderColor` is not set, Streamlit infers a color by adding transparency to your `textColor`.

The following elements have borders that you can modify:

- Containers with borders, inlcuding expanders, forms, dialogs, popovers, and toasts.
- The sidebar, including the right edge and the boundary below the navigation menu.
- Dataframes and tables.
- `st.tabs` (bottom border).
- Buttons, including `st.button`, `st.pills`, and `st.segmented_control`.
- Borders on input regions.

#### Example 5: Border color and visibility

<Cloud name="doc-theming-color-bordercolor" height="400px" />
