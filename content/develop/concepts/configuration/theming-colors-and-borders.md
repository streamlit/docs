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

Streamlit comes with two preconfigured themes: light and dark.

## Color and border configuration options

Most theme configuration options can be set for your whole app, with the option to override it with a different value for the sidebar. For example, your app's primary color (`primaryColor`) is used to highlight interactive elements and show focus. If you set `theme.primaryColor`, this will change the primary color for your whole app. However, if you set `theme.sidebar.primaryColor`, this will override `theme.primaryColor` in the sidebar, allowing you to use two different primary colors.

The following two configuration options can only be applied to the whole app:

- `theme.base` sets the default colors for your app's theme to match one of Streamlit's two default themes (`"light"` or `"dark"`).
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

### `backgroundColor`, `secondaryBackgroundColor`, and `codeBackgroundColor`

`backgroundColor` defines the background color of your app. `secondaryBackgroundColor` defines the background color where contrast is needed.

`secondaryBackgroundColor` is used in the following places:

- The background of input or selection regions for widgets.
- Headers within elements like `st.dataframe` and `st.help`.
- Code blocks and inline code (if `codeBackgroundColor` is not set).

`codeBackgroundColor` sets the background for code blocks and line code. If `codeBackgroundColor` is not set, Streamlit uses `secondaryBackgroundColor` instead.

<Note>

If you do not define background colors for the sidebar, Streamlit will will swap `backgroundColor` and `secondaryBackgroundColor` in the sidebar:

- If `theme.sidebar.backgroundColor` is not defined, Streamlit uses `theme.secondaryBackgroundColor`.
- If `theme.sidebar.secondaryBackgroundColor` is not defined, Streamlit uses `theme.backgroundColor`.

</Note>

### `textColor` and `linkColor`

You can configure color of body text and links.

- `textColor` sets the default text color for all text in the app except language-highlighting in code blocks, inline code, and links.
- `linkColor` sets the default font color for all Markdown links in the app.

`st.page_link` and `st.link_button` use `textColor`, not `linkColor`. Also, as noted previously, Streamlit changes the text color to white when text is displayed on a background of your primary color.

### `baseRadius`

`borderRadius` defines the border radius on a varient elements. Some of these elements do not have a visible border but are still affected by this configuration options because they do have a background color. The following elements are impacted by `baseRadius`:

- Buttons and input areas on widgets.
- Code blocks and inline code.
- Dataframes (exterior).
- Badges and Markdown text backgrounds.
- Containers with borders, inlcuding expanders, forms, dialogs, popovers, and toasts.
- Tooltips, including toolips within charts.
- Status and exception message blocks.
- Images, including `st.graphviz` and `st.pyplot` which display as static images.

A few elements are notably not impacted by `borderRadius` (except for sub-elements like tooltips). Interactive charts and videos, which have a more complex underlying HTML, will always have square corners. This includes `st.video`, `st.map`, and `st.pydeck_chart`. Conversely, `st.chat_input` and `st.audio_input` will always be fully rounded.

### `borderColor` and `showWidgetBorder`

Streamlit does not display widget borders by default (except for buttons). When a user focuses on a widget, the border of the input area is dispalyed in your `primaryColor`. If you set `showWidgetBorder=true`, Streamlit will display these borders when the widget is not in focus.

For unfocused widgets, the border color is set by `borderColor`. If `borderColor` is not set, Streamlit infers a color by adding transparency to your `textColor`.

The following elements have borders that you can modify:

- Containers with borders, inlcuding expanders, forms, dialogs, popovers, and toasts.
- The sidebar, including the right edge and the boundary below the navigation menu.
- Dataframes and tables.
- `st.tabs` (bottom border).
- Buttons, including `st.button`, `st.pills`, and `st.segmented_control`.
- Borders on input regions (if `showWidgetBorder` is true).
