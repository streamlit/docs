---
title: config.toml
slug: /develop/api-reference/configuration/config.toml
description: Complete reference guide for Streamlit's config.toml configuration file, including all available sections and options for customizing your Streamlit application settings.
keywords: config.toml, streamlit configuration, toml configuration file, streamlit settings, theme configuration, server configuration, client configuration, logger configuration, browser configuration, mapbox configuration, secrets configuration, sidebar theme, configuration options, streamlit config show
---

## config.toml

`config.toml` is an optional file you can define for your working directory or global development environment. When `config.toml` is defined both globally and in your working directory, Streamlit combines the configuration options and gives precedence to the working-directory configuration. Additionally, you can use environment variables and command-line options to override additional configuration options. For more information, see [Configuration options](/develop/concepts/configuration/options).

### File location

To define your configuration locally or per-project, add `.streamlit/config.toml` to your working directory. Your working directory is wherever you call `streamlit run`. If you haven't previously created the `.streamlit` directory, you will need to add it.

To define your configuration globally, you must first locate your global `.streamlit` directory. Streamlit adds this hidden directory to your OS user profile during installation. For MacOS/Linux, this will be `~/.streamlit/config.toml`. For Windows, this will be `%userprofile%/.streamlit/config.toml`.

### File format

`config.toml` is a [TOML](https://toml.io/en/) file.

#### Example

```toml
[client]
showErrorDetails = "none"

[theme]
primaryColor = "#F63366"
backgroundColor = "black"
```

### Available configuration options

Below are all the sections and options you can have in your `.streamlit/config.toml` file. To see all configurations, use the following command in your terminal or CLI:

```bash
streamlit config show
```

#### Global

```toml
[global]

# By default, Streamlit displays a warning when a user sets both a widget
# default value in the function defining the widget and a widget value via
# the widget's key in `st.session_state`.
#
# If you'd like to turn off this warning, set this to True.
#
# Default: false
disableWidgetStateDuplicationWarning = false

# If True, will show a warning when you run a Streamlit-enabled script
# via "python my_script.py".
#
# Default: true
showWarningOnDirectExecution = true
```

#### Logger

```toml
[logger]

# Level of logging for Streamlit's internal logger: "error", "warning",
# "info", or "debug".
#
# Default: "info"
level = "info"

# String format for logging messages. If logger.datetimeFormat is set,
# logger messages will default to `%(asctime)s.%(msecs)03d %(message)s`.
#
# See Python's documentation for available attributes:
# https://docs.python.org/3/library/logging.html#formatter-objects
#
# Default: "%(asctime)s %(message)s"
messageFormat = "%(asctime)s %(message)s"
```

#### Client

```toml
[client]

# Controls whether uncaught app exceptions and deprecation warnings
# are displayed in the browser. This can be one of the following:
#
# - "full"       : In the browser, Streamlit displays app deprecation
#                  warnings and exceptions, including exception types,
#                  exception messages, and associated tracebacks.
# - "stacktrace" : In the browser, Streamlit displays exceptions,
#                  including exception types, generic exception messages,
#                  and associated tracebacks. Deprecation warnings and
#                  full exception messages will only print to the
#                  console.
# - "type"       : In the browser, Streamlit displays exception types and
#                  generic exception messages. Deprecation warnings, full
#                  exception messages, and associated tracebacks only
#                  print to the console.
# - "none"       : In the browser, Streamlit displays generic exception
#                  messages. Deprecation warnings, full exception
#                  messages, associated tracebacks, and exception types
#                  will only print to the console.
# - True         : This is deprecated. Streamlit displays "full"
#                  error details.
# - False        : This is deprecated. Streamlit displays "stacktrace"
#                  error details.
#
# Default: "full"
showErrorDetails = "full"

# Change the visibility of items in the toolbar, options menu,
# and settings dialog (top right of the app).
#
# Allowed values:
# - "auto"      : Show the developer options if the app is accessed through
#                 localhost or through Streamlit Community Cloud as a developer.
#                 Hide them otherwise.
# - "developer" : Show the developer options.
# - "viewer"    : Hide the developer options.
# - "minimal"   : Show only options set externally (e.g. through
#                 Streamlit Community Cloud) or through st.set_page_config.
#                 If there are no options left, hide the menu.
#
# Default: "auto"
toolbarMode = "auto"

# Controls whether to display the default sidebar page navigation in a
# multi-page app. This only applies when app's pages are defined by the
# `pages/` directory.
#
# Default: true
showSidebarNavigation = true
```

#### Runner

```toml
[runner]

# Allows you to type a variable or string by itself in a single line of
# Python code to write it to the app.
#
# Default: true
magicEnabled = true

# Handle script rerun requests immediately, rather than waiting for
# script execution to reach a yield point.
#
# This makes Streamlit much more responsive to user interaction, but it
# can lead to race conditions in apps that mutate session_state data
# outside of explicit session_state assignment statements.
#
# Default: true
fastReruns = true

# Raise an exception after adding unserializable data to Session State.
#
# Some execution environments may require serializing all data in Session
# State, so it may be useful to detect incompatibility during development,
# or when the execution environment will stop supporting it in the future.
#
# Default: false
enforceSerializableSessionState = false

# Adjust how certain 'options' widgets like radio, selectbox, and
# multiselect coerce Enum members.
#
# This is useful when the Enum class gets re-defined during a script
# re-run. For more information, check out the docs:
# https://docs.streamlit.io/develop/concepts/design/custom-classes#enums
#
# Allowed values:
# - "off"          : Disables Enum coercion.
# - "nameOnly"     : Enum classes can be coerced if their member names match.
# - "nameAndValue" : Enum classes can be coerced if their member names AND
#                    member values match.
#
# Default: "nameOnly"
enumCoercion = "nameOnly"
```

#### Server

```toml
[server]

# List of directories to watch for changes.
#
# By default, Streamlit watches files in the current working directory
# and its subdirectories. Use this option to specify additional
# directories to watch. Paths must be absolute.
#
# Default: []
folderWatchList = []

# List of directories to ignore for changes.
#
# By default, Streamlit watches files in the current working directory
# and its subdirectories. Use this option to specify exceptions within
# watched directories. Paths can be absolute or relative to the current
# working directory.
#
# Example: ['/home/user1/env', 'relative/path/to/folder']
#
# Default: []
folderWatchBlacklist = []

# Change the type of file watcher used by Streamlit, or turn it off
# completely.
#
# Allowed values:
# - "auto"     : Streamlit will attempt to use the watchdog module, and
#                falls back to polling if watchdog isn't available.
# - "watchdog" : Force Streamlit to use the watchdog module.
# - "poll"     : Force Streamlit to always use polling.
# - "none"     : Streamlit will not watch files.
#
# Default: "auto"
fileWatcherType = "auto"

# Symmetric key used to produce signed cookies. If deploying on multiple
# replicas, this should be set to the same value across all replicas to ensure
# they all share the same secret.
#
# Default: randomly generated secret key.
cookieSecret = "a-random-key-appears-here"

# If false, will attempt to open a browser window on start.
#
# Default: false unless (1) we are on a Linux box where DISPLAY is unset, or
# (2) we are running in the Streamlit Atom plugin.
headless = false

# Whether to show a terminal prompt for the user's email address when
# they run Streamlit (locally) for the first time. If you set
# `server.headless=True`, Streamlit will not show this prompt.
#
# Default: true
showEmailPrompt = true

# Automatically rerun script when the file is modified on disk.
#
# Default: false
runOnSave = false

# The address where the server will listen for client and browser
# connections.
#
# Use this if you want to bind the server to a specific address.
# If set, the server will only be accessible from this address, and not from
# any aliases (like localhost).
#
# Default: (unset)
address =

# The port where the server will listen for browser connections.
#
# Default: 8501
port = 8501

# The base path for the URL where Streamlit should be served from.
#
# Default: ""
baseUrlPath = ""

# Enables support for Cross-Origin Resource Sharing (CORS) protection,
# for added security.
#
# If XSRF protection is enabled and CORS protection is disabled at the
# same time, Streamlit will enable them both instead.
#
# Default: true
enableCORS = true

# Allowed list of origins.
#
# If CORS protection is enabled (`server.enableCORS=True`), use this
# option to set a list of allowed origins that the Streamlit server will
# accept traffic from.
#
# This config option does nothing if CORS protection is disabled.
#
# Example: ['http://example.com', 'https://streamlit.io']
#
# Default: []
corsAllowedOrigins = []

# Enables support for Cross-Site Request Forgery (XSRF) protection, for
# added security.
#
# If XSRF protection is enabled and CORS protection is disabled at the
# same time, Streamlit will enable them both instead.
#
# Default: true
enableXsrfProtection = true

# Max size, in megabytes, for files uploaded with the file_uploader.
#
# Default: 200
maxUploadSize = 200

# Max size, in megabytes, of messages that can be sent via the WebSocket
# connection.
#
# Default: 200
maxMessageSize = 200

# Enables support for websocket compression.
#
# Default: false
enableWebsocketCompression = false

# The interval (in seconds) at which the server pings the client to keep
# the websocket connection alive.
#
# The default value should work for most deployments. However, if you're
# experiencing frequent disconnections in certain proxy setups (e.g.,
# "Connection error" messages), you may want to try adjusting this value.
#
# Note: When you set this option, Streamlit automatically sets the ping
# timeout to match this interval. For Tornado >=6.5, a value less than 30
# may cause connection issues.
websocketPingInterval =

# Enable serving files from a `static` directory in the running app's
# directory.
#
# Default: false
enableStaticServing = false

# TTL in seconds for sessions whose websockets have been disconnected.
#
# The server may choose to clean up session state, uploaded files, etc
# for a given session with no active websocket connection at any point
# after this time has passed.
#
# Default: 120
disconnectedSessionTTL = 120

# Server certificate file for connecting via HTTPS.
# Must be set at the same time as "server.sslKeyFile".
#
# ['DO NOT USE THIS OPTION IN A PRODUCTION ENVIRONMENT. It has not gone through
# security audits or performance tests. For the production environment, we
# recommend performing SSL termination by the load balancer or the reverse
# proxy.']
sslCertFile =

# Cryptographic key file for connecting via HTTPS.
# Must be set at the same time as "server.sslCertFile".
#
# ['DO NOT USE THIS OPTION IN A PRODUCTION ENVIRONMENT. It has not gone through
# security audits or performance tests. For the production environment, we
# recommend performing SSL termination by the load balancer or the reverse
# proxy.']
sslKeyFile =
```

#### Browser

```toml
[browser]

# Internet address where users should point their browsers in order to
# connect to the app. Can be IP address or DNS name and path.
#
# This is used to:
# - Set the correct URL for CORS and XSRF protection purposes.
# - Show the URL on the terminal
# - Open the browser
#
# Default: "localhost"
serverAddress = "localhost"

# Whether to send usage statistics to Streamlit.
#
# Default: true
gatherUsageStats = true

# Port where users should point their browsers in order to connect to the
# app.
#
# This is used to:
# - Set the correct URL for XSRF protection purposes.
# - Show the URL on the terminal (part of `streamlit run`).
# - Open the browser automatically (part of `streamlit run`).
#
# This option is for advanced use cases. To change the port of your app, use
# `server.Port` instead.
#
# Default: whatever value is set in server.port.
serverPort = 8501
```

#### Mapbox

```toml
[mapbox]

# If you'd like to show maps using Mapbox rather than Carto, use this
# to pass the Mapbox API token.
#
# THIS IS DEPRECATED.
#
# Instead of this, you should use either the MAPBOX_API_KEY environment
variable or PyDeck's `api_keys` argument.
#
# This option will be removed on or after 2026-05-01.
#
# Default: ""
token = ""
```

#### Theme

```toml
[theme]

# The preset Streamlit theme that your custom theme inherits from.
#
# This can be one of the following: "light" or "dark".
base =

# Primary accent color.
primaryColor =

# Background color of the app.
backgroundColor =

# Background color used for most interactive widgets.
secondaryBackgroundColor =

# Color used for almost all text.
textColor =

# Red color used in the basic color palette.
#
# By default, this is #ff4b4b for the light theme and #ff2b2b for the
# dark theme.
#
# If `redColor` is provided, and `redBackgroundColor` isn't, then
# `redBackgroundColor` will be derived from `redColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
redColor =

# Orange color used in the basic color palette.
#
# By default, this is #ffa421 for the light theme and #ff8700 for the
# dark theme.
#
# If `orangeColor` is provided, and `orangeBackgroundColor` isn't, then
# `orangeBackgroundColor` will be derived from `orangeColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
orangeColor =

# Yellow color used in the basic color palette.
#
# By default, this is #faca2b for the light theme and #ffe312 for the
# dark theme.
#
# If `yellowColor` is provided, and `yellowBackgroundColor` isn't, then
# `yellowBackgroundColor` will be derived from `yellowColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
yellowColor =

# Blue color used in the basic color palette.
#
# By default, this is #1c83e1 for the light theme and #0068c9 for the
# dark theme.
#
# If a `blueColor` is provided, and `blueBackgroundColor` isn't, then
# `blueBackgroundColor` will be derived from `blueColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
blueColor =

# Green color used in the basic color palette.
#
# By default, this is #21c354 for the light theme and #09ab3b for the
# dark theme.
#
# If `greenColor` is provided, and `greenBackgroundColor` isn't, then
# `greenBackgroundColor` will be derived from `greenColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
greenColor =

# Violet color used in the basic color palette.
#
# By default, this is #803df5 for both the light and dark themes.
#
# If a `violetColor` is provided, and `violetBackgroundColor` isn't, then
# `violetBackgroundColor` will be derived from `violetColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
violetColor =

# Gray color used in the basic color palette.
#
# By default, this is #a3a8b8 for the light theme and #555867 for the
# dark theme.
#
# If `grayColor` is provided, and `grayBackgroundColor` isn't, then
# `grayBackgroundColor` will be derived from `grayColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
grayColor =

# Red background color used in the basic color palette.
#
# If `redColor` is provided, this defaults to `redColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #ff2b2b with 10% opacity for light theme and
# #ff6c6c with 20% opacity for dark theme.
redBackgroundColor =

# Orange background color used for the basic color palette.
#
# If `orangeColor` is provided, this defaults to `orangeColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #ffa421 with 10% opacity for the light theme and
# #ff8700 with 20% opacity for the dark theme.
orangeBackgroundColor =

# Yellow background color used for the basic color palette.
#
# If `yellowColor` is provided, this defaults to `yellowColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #ffff12 with 10% opacity for the light theme and
# #ffff12 with 20% opacity for the dark theme.
yellowBackgroundColor =

# Blue background color used for the basic color palette.
#
# If `blueColor` is provided, this defaults to `blueColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #1c83ff with 10% opacity for the light theme and
# #3d9df3 with 20% opacity for the dark theme.
blueBackgroundColor =

# Green background color used for the basic color palette.
#
# If `greenColor` is provided, this defaults to `greenColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #21c354 with 10% opacity for the light theme and
# #3dd56d with 20% opacity for the dark theme.
greenBackgroundColor =

# Violet background color used for the basic color palette.
#
# If `violetColor` is provided, this defaults to `violetColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #9a5dff with 10% opacity for light theme and
# #9a5dff with 20% opacity for dark theme.
violetBackgroundColor =

# Gray background color used for the basic color palette.
#
# If `grayColor` is provided, this defaults to `grayColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #31333f with 10% opacity for the light theme and
# #808495 with 20% opacity for the dark theme.
grayBackgroundColor =

# Red text color used for the basic color palette.
#
# If `redColor` is provided, this defaults to `redColor`, darkened by 15%
# for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #bd4043 for the light theme and #ff6c6c for the dark
# theme.
redTextColor =

# Orange text color used for the basic color palette.
#
# If `orangeColor` is provided, this defaults to `orangeColor`, darkened
# by 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #e2660c for the light theme and #ffbd45 for the dark
# theme.
orangeTextColor =

# Yellow text color used for the basic color palette.
#
# If `yellowColor` is provided, this defaults to `yellowColor`, darkened
# by 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #926c05 for the light theme and #ffffc2 for the dark
# theme.
yellowTextColor =

# Blue text color used for the basic color palette.
#
# If `blueColor` is provided, this defaults to `blueColor`, darkened by
# 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #0054a3 for the light theme and #3d9df3 for the dark
# theme.
blueTextColor =

# Green text color used for the basic color palette.
#
# If `greenColor` is provided, this defaults to `greenColor`, darkened by
# 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #158237 for the light theme and #5ce488 for the dark
# theme.
greenTextColor =

# Violet text color used for the basic color palette.
#
# If `violetColor` is provided, this defaults to `violetColor`, darkened
# by 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #583f84 for the light theme and #b27eff for the dark
# theme.
violetTextColor =

# Gray text color used for the basic color palette.
#
# If `grayColor` is provided, this defaults to `grayColor`, darkened by
# 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #31333f with 60% opacity for the light theme and
# #fafafa with 60% opacity for the dark theme.
grayTextColor =

# Color used for all links.
linkColor =

# Whether or not links should be displayed with an underline.
linkUnderline =

# Background color used for code blocks.
codeBackgroundColor =

# The font family for all text, except code blocks.
#
# This can be one of the following:
# - "sans-serif"
# - "serif"
# - "monospace"
# - The `family` value for a custom font table under [[theme.fontFaces]]
# - A comma-separated list of these (as a single string) to specify
#   fallbacks
#
# For example, you can use the following:
#
# font = "cool-font, fallback-cool-font, sans-serif"
font =

# An array of fonts to use in your app.
#
# Each font in the array is a table (dictionary) that can have the
# following attributes, closely resembling CSS font-face definitions:
# - family
# - url
# - weight (optional)
# - style (optional)
# - unicodeRange (optional)
#
# To host a font with your app, enable static file serving with
# `server.enableStaticServing=true`.
#
# You can define multiple [[theme.fontFaces]] tables, including multiple
# tables with the same family if your font is defined by multiple files.
#
# For example, a font hosted with your app may have a [[theme.fontFaces]]
# table as follows:
#
# [[theme.fontFaces]]
# family = "font_name"
# url = "app/static/font_file.woff"
# weight = "400"
# style = "normal"
fontFaces =

# The root font size (in pixels) for the app.
#
# This determines the overall scale of text and UI elements. This is a
# positive integer.
#
# If this isn't set, the font size will be 16px.
baseFontSize =

# The root font weight for the app.
#
# This determines the overall weight of text and UI elements. This is an
# integer multiple of 100. Values can be between 100 and 600, inclusive.
#
# If this isn't set, the font weight will be set to 400 (normal weight).
baseFontWeight =

# The font family to use for headings.
#
# This can be one of the following:
# - "sans-serif"
# - "serif"
# - "monospace"
# - The `family` value for a custom font table under [[theme.fontFaces]]
# - A comma-separated list of these (as a single string) to specify
# fallbacks
#
# If this isn't set, Streamlit uses `theme.font` for headings.
headingFont =

# One or more font sizes for h1-h6 headings.
#
# If no sizes are set, Streamlit will use the default sizes for h1-h6
# headings. Heading font sizes set in [theme] are not inherited by
# [theme.sidebar]. The following sizes are used by default:
# [
#     "2.75rem", # h1 (1.5rem for sidebar)
#     "2.25rem", # h2 (1.25rem for sidebar)
#     "1.75rem", # h3 (1.125rem for sidebar)
#     "1.5rem", # h4 (1rem for sidebar)
#     "1.25rem", # h5 (0.875rem for sidebar)
#     "1rem", # h6 (0.75rem for sidebar)
# ]
#
# If you specify an array with fewer than six sizes, the unspecified
# heading sizes will be the default values. For example, you can use the
# following array to set the font sizes for h1-h3 headings while keeping
# h4-h6 headings at their default sizes:
# headingFontSizes = ["3rem", "2.875rem", "2.75rem"]
#
# Setting a single value (not in an array) will set the font size for all
# h1-h6 headings to that value:
# headingFontSizes = "2.75rem"
#
# Font sizes can be specified in pixels or rem, but rem is recommended.
headingFontSizes =

# One or more font weights for h1-h6 headings.
#
# If no weights are set, Streamlit will use the default weights for h1-h6
# headings. Heading font weights set in [theme] are not inherited by
# [theme.sidebar]. The following weights are used by default:
# [
#     700, # h1 (bold)
#     600, # h2 (semi-bold)
#     600, # h3 (semi-bold)
#     600, # h4 (semi-bold)
#     600, # h5 (semi-bold)
#     600, # h6 (semi-bold)
# ]
#
# If you specify an array with fewer than six weights, the unspecified
# heading weights will be the default values. For example, you can use
# the following array to set the font weights for h1-h2 headings while
# keeping h3-h6 headings at their default weights:
# headingFontWeights = [800, 700]
#
# Setting a single value (not in an array) will set the font weight for
# all h1-h6 headings to that value:
# headingFontWeights = 500
headingFontWeights =

# The font family to use for code (monospace) in the sidebar.
#
# This can be one of the following:
# - "sans-serif"
# - "serif"
# - "monospace"
# - The `family` value for a custom font table under [[theme.fontFaces]]
# - A comma-separated list of these (as a single string) to specify
#   fallbacks
codeFont =

# The font size (in pixels or rem) for code blocks and code text.
#
# This applies to font in code blocks, `st.json`, and `st.help`. It
# doesn't apply to inline code, which is set by default to 0.75em.
#
# If this isn't set, the code font size will be 0.875rem.
codeFontSize =

# The font weight for code blocks and code text.
#
# This applies to font in inline code, code blocks, `st.json`, and
# `st.help`. This is an integer multiple of 100. Values can be between
# 100 and 900, inclusive.
#
# If this isn't set, the code font weight will be 400 (normal weight).
codeFontWeight =

# The radius used as basis for the corners of most UI elements.
#
# This can be one of the following:
# - "none"
# - "small"
# - "medium"
# - "large"
# - "full"
# - The number in pixels or rem.
#
# For example, you can use "10px", "0.5rem", or "2rem". To follow best
# practices, use rem instead of pixels when specifying a numeric size.
baseRadius =

# The radius used as basis for the corners of buttons.
#
# This can be one of the following:
# - "none"
# - "small"
# - "medium"
# - "large"
# - "full"
# - The number in pixels or rem.
#
# For example, you can use "10px", "0.5rem", or "2rem". To follow best
# practices, use rem instead of pixels when specifying a numeric size.
#
# If this isn't set, Streamlit uses `theme.baseRadius` instead.
buttonRadius =

# The color of the border around elements.
borderColor =

# The color of the border around dataframes and tables.
#
# If this isn't set, Streamlit uses `theme.borderColor` instead.
dataframeBorderColor =

# The background color of the dataframe's header.
#
# This color applies to all non-interior cells of the dataframe. This
# includes the header row, the row-selection column (if present), and
# the bottom row of data editors with a dynamic number of rows. If this
# isn't set, Streamlit uses a mix of `theme.backgroundColor` and
# `theme.secondaryBackgroundColor`.
dataframeHeaderBackgroundColor =

# Whether to show a border around input widgets.
showWidgetBorder =

# Whether to show a vertical separator between the sidebar and the main
# content area.
showSidebarBorder =

# An array of colors to use for categorical chart data.
#
# This is a list of one or more color strings which are applied in order
# to categorical data. These colors apply to Plotly, Altair, and
# Vega-Lite charts.
#
# Invalid colors are skipped, and colors repeat cyclically if there are
# more categories than colors. If no chart categorical colors are set,
# Streamlit uses a default set of colors.
#
# For light themes, the following colors are the default:
# [
#     "#0068c9", # blue80
#     "#83c9ff", # blue40
#     "#ff2b2b", # red80
#     "#ffabab", # red40
#     "#29b09d", # blueGreen80
#     "#7defa1", # green40
#     "#ff8700", # orange80
#     "#ffd16a", # orange50
#     "#6d3fc0", # purple80
#     "#d5dae5", # gray40
# ]
# For dark themes, the following colors are the default:
# [
#     "#83c9ff", # blue40
#     "#0068c9", # blue80
#     "#ffabab", # red40
#     "#ff2b2b", # red80
#     "#7defa1", # green40
#     "#29b09d", # blueGreen80
#     "#ffd16a", # orange50
#     "#ff8700", # orange80
#     "#6d3fc0", # purple80
#     "#d5dae5", # gray40
# ]
chartCategoricalColors =

# An array of ten colors to use for sequential or continuous chart data.
#
# The ten colors create a gradient color scale. These colors apply to
# Plotly, Altair, and Vega-Lite charts.
#
# Invalid color strings are skipped. If there are not exactly ten
# valid colors specified, Streamlit uses a default set of colors.
#
# For light themes, the following colors are the default:
# [
#     "#e4f5ff", #blue10
#     "#c7ebff", #blue20
#     "#a6dcff", #blue30
#     "#83c9ff", #blue40
#     "#60b4ff", #blue50
#     "#3d9df3", #blue60
#     "#1c83e1", #blue70
#     "#0068c9", #blue80
#     "#0054a3", #blue90
#     "#004280", #blue100
# ]
# For dark themes, the following colors are the default:
# [
#     "#004280", #blue100
#     "#0054a3", #blue90
#     "#0068c9", #blue80
#     "#1c83e1", #blue70
#     "#3d9df3", #blue60
#     "#60b4ff", #blue50
#     "#83c9ff", #blue40
#     "#a6dcff", #blue30
#     "#c7ebff", #blue20
#     "#e4f5ff", #blue10
# ]
chartSequentialColors =
```

#### Sidebar theme

```toml
[theme.sidebar]

# Primary accent color.
primaryColor =

# Background color of the app.
backgroundColor =

# Background color used for most interactive widgets.
secondaryBackgroundColor =

# Color used for almost all text.
textColor =

# Red color used in the basic color palette.
#
# By default, this is #ff4b4b for the light theme and #ff2b2b for the
# dark theme.
#
# If `redColor` is provided, and `redBackgroundColor` isn't, then
# `redBackgroundColor` will be derived from `redColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
redColor =

# Orange color used in the basic color palette.
#
# By default, this is #ffa421 for the light theme and #ff8700 for the
# dark theme.
#
# If `orangeColor` is provided, and `orangeBackgroundColor` isn't, then
# `orangeBackgroundColor` will be derived from `orangeColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
orangeColor =

# Yellow color used in the basic color palette.
#
# By default, this is #faca2b for the light theme and #ffe312 for the
# dark theme.
#
# If `yellowColor` is provided, and `yellowBackgroundColor` isn't, then
# `yellowBackgroundColor` will be derived from `yellowColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
yellowColor =

# Blue color used in the basic color palette.
#
# By default, this is #1c83e1 for the light theme and #0068c9 for the
# dark theme.
#
# If a `blueColor` is provided, and `blueBackgroundColor` isn't, then
# `blueBackgroundColor` will be derived from `blueColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
blueColor =

# Green color used in the basic color palette.
#
# By default, this is #21c354 for the light theme and #09ab3b for the
# dark theme.
#
# If `greenColor` is provided, and `greenBackgroundColor` isn't, then
# `greenBackgroundColor` will be derived from `greenColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
greenColor =

# Violet color used in the basic color palette.
#
# By default, this is #803df5 for both the light and dark themes.
#
# If a `violetColor` is provided, and `violetBackgroundColor` isn't, then
# `violetBackgroundColor` will be derived from `violetColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
violetColor =

# Gray color used in the basic color palette.
#
# By default, this is #a3a8b8 for the light theme and #555867 for the
# dark theme.
#
# If `grayColor` is provided, and `grayBackgroundColor` isn't, then
# `grayBackgroundColor` will be derived from `grayColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
grayColor =

# Red background color used in the basic color palette.
#
# If `redColor` is provided, this defaults to `redColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #ff2b2b with 10% opacity for light theme and
# #ff6c6c with 20% opacity for dark theme.
redBackgroundColor =

# Orange background color used for the basic color palette.
#
# If `orangeColor` is provided, this defaults to `orangeColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #ffa421 with 10% opacity for the light theme and
# #ff8700 with 20% opacity for the dark theme.
orangeBackgroundColor =

# Yellow background color used for the basic color palette.
#
# If `yellowColor` is provided, this defaults to `yellowColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #ffff12 with 10% opacity for the light theme and
# #ffff12 with 20% opacity for the dark theme.
yellowBackgroundColor =

# Blue background color used for the basic color palette.
#
# If `blueColor` is provided, this defaults to `blueColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #1c83ff with 10% opacity for the light theme and
# #3d9df3 with 20% opacity for the dark theme.
blueBackgroundColor =

# Green background color used for the basic color palette.
#
# If `greenColor` is provided, this defaults to `greenColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #21c354 with 10% opacity for the light theme and
# #3dd56d with 20% opacity for the dark theme.
greenBackgroundColor =

# Violet background color used for the basic color palette.
#
# If `violetColor` is provided, this defaults to `violetColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #9a5dff with 10% opacity for light theme and
# #9a5dff with 20% opacity for dark theme.
violetBackgroundColor =

# Gray background color used for the basic color palette.
#
# If `grayColor` is provided, this defaults to `grayColor` using 10%
# opacity for the light theme and 20% opacity for the dark theme.
#
# Otherwise, this is #31333f with 10% opacity for the light theme and
# #808495 with 20% opacity for the dark theme.
grayBackgroundColor =

# Red text color used for the basic color palette.
#
# If `redColor` is provided, this defaults to `redColor`, darkened by 15%
# for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #bd4043 for the light theme and #ff6c6c for the dark
# theme.
redTextColor =

# Orange text color used for the basic color palette.
#
# If `orangeColor` is provided, this defaults to `orangeColor`, darkened
# by 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #e2660c for the light theme and #ffbd45 for the dark
# theme.
orangeTextColor =

# Yellow text color used for the basic color palette.
#
# If `yellowColor` is provided, this defaults to `yellowColor`, darkened
# by 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #926c05 for the light theme and #ffffc2 for the dark
# theme.
yellowTextColor =

# Blue text color used for the basic color palette.
#
# If `blueColor` is provided, this defaults to `blueColor`, darkened by
# 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #0054a3 for the light theme and #3d9df3 for the dark
# theme.
blueTextColor =

# Green text color used for the basic color palette.
#
# If `greenColor` is provided, this defaults to `greenColor`, darkened by
# 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #158237 for the light theme and #5ce488 for the dark
# theme.
greenTextColor =

# Violet text color used for the basic color palette.
#
# If `violetColor` is provided, this defaults to `violetColor`, darkened
# by 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #583f84 for the light theme and #b27eff for the dark
# theme.
violetTextColor =

# Gray text color used for the basic color palette.
#
# If `grayColor` is provided, this defaults to `grayColor`, darkened by
# 15% for the light theme and lightened by 15% for the dark theme.
#
# Otherwise, this is #31333f with 60% opacity for the light theme and
# #fafafa with 60% opacity for the dark theme.
grayTextColor =

# Color used for all links.
linkColor =

# Whether or not links should be displayed with an underline.
linkUnderline =

# Background color used for code blocks.
codeBackgroundColor =

# The font family for all text, except code blocks.
#
# This can be one of the following:
# - "sans-serif"
# - "serif"
# - "monospace"
# - The `family` value for a custom font table under [[theme.fontFaces]]
# - A URL to a CSS file in the format of "<font name>:<url>" (like
#   "Nunito:https://fonts.googleapis.com/css2?family=Nunito&display=swap")
# - A comma-separated list of these (as a single string) to specify
# fallbacks
#
# For example, you can use the following:
#
# font = "cool-font, fallback-cool-font, sans-serif"
font =

# The font family to use for headings.
#
# This can be one of the following:
# - "sans-serif"
# - "serif"
# - "monospace"
# - The `family` value for a custom font table under [[theme.fontFaces]]
# - A URL to a CSS file in the format of "<font name>:<url>" (like
#   "Nunito:https://fonts.googleapis.com/css2?family=Nunito&display=swap")
# - A comma-separated list of these (as a single string) to specify
# fallbacks
#
# If this isn't set, Streamlit uses `theme.font` for headings.
headingFont =

# One or more font sizes for h1-h6 headings.
#
# If no sizes are set, Streamlit will use the default sizes for h1-h6
# headings. Heading font sizes set in [theme] are not inherited by
# [theme.sidebar]. The following sizes are used by default:
# [
#     "2.75rem", # h1 (1.5rem for sidebar)
#     "2.25rem", # h2 (1.25rem for sidebar)
#     "1.75rem", # h3 (1.125rem for sidebar)
#     "1.5rem", # h4 (1rem for sidebar)
#     "1.25rem", # h5 (0.875rem for sidebar)
#     "1rem", # h6 (0.75rem for sidebar)
# ]
#
# If you specify an array with fewer than six sizes, the unspecified
# heading sizes will be the default values. For example, you can use the
# following array to set the font sizes for h1-h3 headings while keeping
# h4-h6 headings at their default sizes:
# headingFontSizes = ["3rem", "2.875rem", "2.75rem"]
#
# Setting a single value (not in an array) will set the font size for all
# h1-h6 headings to that value:
# headingFontSizes = "2.75rem"
#
# Font sizes can be specified in pixels or rem, but rem is recommended.
headingFontSizes =

# One or more font weights for h1-h6 headings.
#
# If no weights are set, Streamlit will use the default weights for h1-h6
# headings. Heading font weights set in [theme] are not inherited by
# [theme.sidebar]. The following weights are used by default:
# [
#     700, # h1 (bold)
#     600, # h2 (semi-bold)
#     600, # h3 (semi-bold)
#     600, # h4 (semi-bold)
#     600, # h5 (semi-bold)
#     600, # h6 (semi-bold)
# ]
#
# If you specify an array with fewer than six weights, the unspecified
# heading weights will be the default values. For example, you can use
# the following array to set the font weights for h1-h2 headings while
# keeping h3-h6 headings at their default weights:
# headingFontWeights = [800, 700]
#
# Setting a single value (not in an array) will set the font weight for
# all h1-h6 headings to that value:
# headingFontWeights = 500
headingFontWeights =

# The font family to use for code (monospace) in the sidebar.
#
# This can be one of the following:
# - "sans-serif"
# - "serif"
# - "monospace"
# - The `family` value for a custom font table under [[theme.fontFaces]]
# - A URL to a CSS file in the format of "<font name>:<url>" (like
#   "'Space Mono':https://fonts.googleapis.com/css2?family=Space+Mono&display=swap")
# - A comma-separated list of these (as a single string) to specify
# fallbacks
codeFont =

# The font size (in pixels or rem) for code blocks and code text.
#
# This applies to font in code blocks, `st.json`, and `st.help`. It
# doesn't apply to inline code, which is set by default to 0.75em.
#
# If this isn't set, the code font size will be 0.875rem.
codeFontSize =

# The font weight for code blocks and code text.
#
# This applies to font in inline code, code blocks, `st.json`, and
# `st.help`. This is an integer multiple of 100. Values can be between
# 100 and 600, inclusive.
#
# If this isn't set, the code font weight will be 400 (normal weight).
codeFontWeight =

# The radius used as basis for the corners of most UI elements.
#
# This can be one of the following:
# - "none"
# - "small"
# - "medium"
# - "large"
# - "full"
# - The number in pixels or rem.
#
# For example, you can use "10px", "0.5rem", or "2rem". To follow best
# practices, use rem instead of pixels when specifying a numeric size.
baseRadius =

# The radius used as basis for the corners of buttons.
#
# This can be one of the following:
# - "none"
# - "small"
# - "medium"
# - "large"
# - "full"
# - The number in pixels or rem.
#
# For example, you can use "10px", "0.5rem", or "2rem". To follow best
# practices, use rem instead of pixels when specifying a numeric size.
#
# If this isn't set, Streamlit uses `theme.baseRadius` instead.
buttonRadius =

# The color of the border around elements.
borderColor =

# The color of the border around dataframes and tables.
#
# If this isn't set, Streamlit uses `theme.borderColor` instead.
dataframeBorderColor =

# The background color of the dataframe's header.
#
# This color applies to all non-interior cells of the dataframe. This
# includes the header row, the row-selection column (if present), and
# the bottom row of data editors with a dynamic number of rows. If this
# isn't set, Streamlit uses a mix of `theme.backgroundColor` and
# `theme.secondaryBackgroundColor`.
dataframeHeaderBackgroundColor =

# Whether to show a border around input widgets.
showWidgetBorder =
```

#### Secrets

```toml
[secrets]

# List of locations where secrets are searched.
#
# An entry can be a path to a TOML file or directory path where
# Kubernetes style secrets are saved. Order is important, import is
# first to last, so secrets in later files will take precedence over
# earlier ones.
#
# Default: [ <path to local environment's secrets.toml file>, <path to project's secrets.toml file>,]
files = [ "~/.streamlit/secrets.toml", "~/project directory/.streamlit/secrets.toml",]
```
