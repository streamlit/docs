---
title: Configuration
slug: /library/advanced-features/configuration
---

# Configuration

Streamlit provides four different ways to set configuration options. This list is in reverse order of precedence, i.e. command line flags take precedence over environment variables when the same configuration option is provided multiple times.

<Note>

If changes to `.streamlit/config.toml` are made _while_ the app is running, the server needs to be restarted for changes to be reflected in the app.

</Note>

1. In a **global config file** at `~/.streamlit/config.toml` for macOS/Linux or `%userprofile%/.streamlit/config.toml` for Windows:

   ```toml
   [server]
   port = 80
   ```

2. In a **per-project config file** at `$CWD/.streamlit/config.toml`, where
   `$CWD` is the folder you're running Streamlit from.

3. Through `STREAMLIT_*` **environment variables**, such as:

   ```bash
   export STREAMLIT_SERVER_PORT=80
   export STREAMLIT_SERVER_COOKIE_SECRET=dontforgottochangeme
   ```

4. As **flags on the command line** when running `streamlit run`:

   ```bash
   streamlit run your_script.py --server.port 80
   ```


## Telemetry

As mentioned during the installation process, Streamlit collects usage statistics. You can find out
more by reading our [Privacy Notice](https://streamlit.io/privacy-policy), but the high-level
summary is that although we collect telemetry data we cannot see and do not store information
contained in Streamlit apps.

If you'd like to opt out of usage statistics, add the following to your config file:

```toml
[browser]
gatherUsageStats = false
```

## Theming

You can change the base colors of your app using the `[theme]` section of the configuration system.
To learn more, see [Theming.](/library/advanced-features/theming)

## View all configuration options

As described in [Command-line options](/library/advanced-features/cli), you can
view all available configuration option using:

```bash
streamlit config show
```

Below are all the sections and options you can have in your `.streamlit/config.toml` file:

### Global

```toml
[global]

# By default, Streamlit checks if the Python watchdog module is available
# and, if not, prints a warning asking for you to install it. The watchdog
# module is not required, but highly recommended. It improves Streamlit's
# ability to detect changes to files in your filesystem.

# If you'd like to turn off this warning, set this to True.

# Default: false
disableWatchdogWarning = false

# By default, Streamlit displays a warning when a user sets both a widget
# default value in the function defining the widget and a widget value via
# the widget's key in `st.session_state`.

# If you'd like to turn off this warning, set this to True.

# Default: false
disableWidgetStateDuplicationWarning = false

# If True, will show a warning when you run a Streamlit-enabled script
# via "python my_script.py".

# Default: true
showWarningOnDirectExecution = true

# DataFrame serialization.

# Acceptable values:
# - 'legacy' : Serialize DataFrames using Streamlit's custom format. Slow
#              but battle-tested.
# - 'arrow'  : Serialize DataFrames using Apache Arrow. Much faster and
#              versatile.

# Default: "arrow"
dataFrameSerialization = "arrow"
```

### Logger

```toml
[logger]

# Level of logging: 'error', 'warning', 'info', or 'debug'.

# Default: 'info'
level = "info"

# String format for logging messages. If logger.datetimeFormat is set,
# logger messages will default to `%(asctime)s.%(msecs)03d %(message)s`. See
# Python's documentation for available attributes:
# https://docs.python.org/2.6/library/logging.html#formatter-objects

# Default: "%(asctime)s %(message)s"
messageFormat = "%(asctime)s %(message)s"
```

### Client

```toml
[client]

# Whether to enable st.cache. This does not affect st.cache_data or
# st.cache_resource.

# Default: true
caching = true

# If false, makes your Streamlit script not draw to a
# Streamlit app.

# Default: true
displayEnabled = true

# Controls whether uncaught app exceptions and deprecation warnings
# are displayed in the browser. By default, this is set to True and
# Streamlit displays app exceptions and associated tracebacks, and
# deprecation warnings, in the browser.

# If set to False, deprecation warnings and full exception messages
# will print to the console only. Exceptions will still display in the
# browser with a generic error message. For now, the exception type and
# traceback show in the browser also, but they will be removed in the
# future.

# Default: true
showErrorDetails = true

# Change the visibility of items in the toolbar, options menu,
# and settings dialog (top right of the app).

# Allowed values:
# * "auto"      : Show the developer options if the app is accessed through
#                 localhost or through Streamlit Community Cloud as a developer.
#                 Hide them otherwise.
# * "developer" : Show the developer options.
# * "viewer"    : Hide the developer options.
# * "minimal"   : Show only options set externally (e.g. through
#                 Streamlit Community Cloud) or through st.set_page_config.
#                 If there are no options left, hide the menu.

# Default: "auto"
toolbarMode = "auto"
```

### Runner

```toml
[runner]

# Allows you to type a variable or string by itself in a single line of
# Python code to write it to the app.

# Default: true
magicEnabled = true

# Install a Python tracer to allow you to stop or pause your script at
# any point and introspect it. As a side-effect, this slows down your
# script's execution.

# Default: false
installTracer = false

# Sets the MPLBACKEND environment variable to Agg inside Streamlit to
# prevent Python crashing.

# Default: true
fixMatplotlib = true

# Run the Python Garbage Collector after each script execution. This
# can help avoid excess memory use in Streamlit apps, but could
# introduce delay in rerunning the app script for high-memory-use
# applications.

# Default: true
postScriptGC = true

# Handle script rerun requests immediately, rather than waiting for script
# execution to reach a yield point. This makes Streamlit much more
# responsive to user interaction, but it can lead to race conditions in
# apps that mutate session_state data outside of explicit session_state
# assignment statements.

# Default: true
fastReruns = true

# Raise an exception after adding unserializable data to Session State.
# Some execution environments may require serializing all data in Session
# State, so it may be useful to detect incompatibility during development,
# or when the execution environment will stop supporting it in the future.

# Default: false
enforceSerializableSessionState = false
```

### Server

```toml
[server]

# List of folders that should not be watched for changes. This
# impacts both "Run on Save" and @st.cache.

# Relative paths will be taken as relative to the current working directory.

# Example: ['/home/user1/env', 'relative/path/to/folder']

# Default: []
folderWatchBlacklist = []

# Change the type of file watcher used by Streamlit, or turn it off
# completely.

# Allowed values:
# * "auto"     : Streamlit will attempt to use the watchdog module, and
#                falls back to polling if watchdog is not available.
# * "watchdog" : Force Streamlit to use the watchdog module.
# * "poll"     : Force Streamlit to always use polling.
# * "none"     : Streamlit will not watch files.

# Default: "auto"
fileWatcherType = "auto"

# Symmetric key used to produce signed cookies. If deploying on multiple
# replicas, this should be set to the same value across all replicas to ensure
# they all share the same secret.

# Default: randomly generated secret key.
cookieSecret = "a-random-key-appears-here"

# If false, will attempt to open a browser window on start.

# Default: false unless (1) we are on a Linux box where DISPLAY is unset, or
# (2) we are running in the Streamlit Atom plugin.
# headless = false

# Automatically rerun script when the file is modified on disk.

# Default: false
runOnSave = false

# The address where the server will listen for client and browser
# connections. Use this if you want to bind the server to a specific address.
# If set, the server will only be accessible from this address, and not from
# any aliases (like localhost).

# Default: (unset)
# address =

# The port where the server will listen for browser connections.

# Default: 8501
port = 8501

# The base path for the URL where Streamlit should be served from.

# Default: ""
baseUrlPath = ""

# Enables support for Cross-Origin Resource Sharing (CORS) protection, for
# added security.

# Due to conflicts between CORS and XSRF, if `server.enableXsrfProtection` is
# on and `server.enableCORS` is off at the same time, we will prioritize
# `server.enableXsrfProtection`.

# Default: true
enableCORS = true

# Enables support for Cross-Site Request Forgery (XSRF) protection, for added
# security.

# Due to conflicts between CORS and XSRF, if `server.enableXsrfProtection` is
# on and `server.enableCORS` is off at the same time, we will prioritize
# `server.enableXsrfProtection`.

# Default: true
enableXsrfProtection = true

# Max size, in megabytes, for files uploaded with the file_uploader.

# Default: 200
maxUploadSize = 200

# Max size, in megabytes, of messages that can be sent via the WebSocket
# connection.

# Default: 200
maxMessageSize = 200

# Enables support for websocket compression.

# Default: false
enableWebsocketCompression = false

# Enable serving files from a `static` directory in the running app's
# directory.

# Default: false
enableStaticServing = false

# Server certificate file for connecting via HTTPS.
# Must be set at the same time as "server.sslKeyFile".

# ['DO NOT USE THIS OPTION IN A PRODUCTION ENVIRONMENT. It has not gone through
# security audits or performance tests. For the production environment, we
# recommend performing SSL termination by the load balancer or the reverse
# proxy.']
# sslCertFile =

# Cryptographic key file for connecting via HTTPS.
# Must be set at the same time as "server.sslCertFile".

# ['DO NOT USE THIS OPTION IN A PRODUCTION ENVIRONMENT. It has not gone through
# security audits or performance tests. For the production environment, we
# recommend performing SSL termination by the load balancer or the reverse
# proxy.']
# sslKeyFile =
```

### Browser

```toml
[browser]

# Internet address where users should point their browsers in order to
# connect to the app. Can be IP address or DNS name and path.

# This is used to:
# - Set the correct URL for CORS and XSRF protection purposes.
# - Show the URL on the terminal
# - Open the browser

# Default: "localhost"
serverAddress = "localhost"

# Whether to send usage statistics to Streamlit.

# Default: true
gatherUsageStats = true

# Port where users should point their browsers in order to connect to the
# app.

# This is used to:
# - Set the correct URL for CORS and XSRF protection purposes.
# - Show the URL on the terminal
# - Open the browser

# Default: whatever value is set in server.port.
serverPort = 8501
```

### Mapbox

```toml
[mapbox]

# Configure Streamlit to use a custom Mapbox
# token for elements like st.pydeck_chart and st.map.
# To get a token for yourself, create an account at
# https://mapbox.com. It's free (for moderate usage levels)!

# Default: ""
token = ""
```

### Deprecation

```toml
[deprecation]

# Set to false to disable the deprecation warning for the file uploader
# encoding.

# Default: true
showfileUploaderEncoding = true

# Set to false to disable the deprecation warning for using the global pyplot
# instance.

# Default: true
showPyplotGlobalUse = true
```

### Theme

```toml
[theme]

# The preset Streamlit theme that your custom theme inherits from.
# One of "light" or "dark".
# base =

# Primary accent color for interactive elements.
# primaryColor =

# Background color for the main content area.
# backgroundColor =

# Background color used for the sidebar and most interactive widgets.
# secondaryBackgroundColor =

# Color used for almost all text.
# textColor =

# Font family for all text in the app, except code blocks. One of "sans serif",
# "serif", or "monospace".
# font =
```

<Collapse title="View entire file" expanded={false} >

This is the entire `config.toml` file with all the options for version 1.25.0:

```toml
[global]

# By default, Streamlit checks if the Python watchdog module is available
# and, if not, prints a warning asking for you to install it. The watchdog
# module is not required, but highly recommended. It improves Streamlit's
# ability to detect changes to files in your filesystem.

# If you'd like to turn off this warning, set this to True.

# Default: false
disableWatchdogWarning = false

# By default, Streamlit displays a warning when a user sets both a widget
# default value in the function defining the widget and a widget value via
# the widget's key in `st.session_state`.

# If you'd like to turn off this warning, set this to True.

# Default: false
disableWidgetStateDuplicationWarning = false

# If True, will show a warning when you run a Streamlit-enabled script
# via "python my_script.py".

# Default: true
showWarningOnDirectExecution = true

# DataFrame serialization.

# Acceptable values:
# - 'legacy' : Serialize DataFrames using Streamlit's custom format. Slow
#              but battle-tested.
# - 'arrow'  : Serialize DataFrames using Apache Arrow. Much faster and
#              versatile.

# Default: "arrow"
dataFrameSerialization = "arrow"

[logger]

# Level of logging: 'error', 'warning', 'info', or 'debug'.

# Default: 'info'
level = "info"

# String format for logging messages. If logger.datetimeFormat is set,
# logger messages will default to `%(asctime)s.%(msecs)03d %(message)s`. See
# Python's documentation for available attributes:
# https://docs.python.org/2.6/library/logging.html#formatter-objects

# Default: "%(asctime)s %(message)s"
messageFormat = "%(asctime)s %(message)s"

[client]

# Whether to enable st.cache. This does not affect st.cache_data or
# st.cache_resource.

# Default: true
caching = true

# If false, makes your Streamlit script not draw to a
# Streamlit app.

# Default: true
displayEnabled = true

# Controls whether uncaught app exceptions and deprecation warnings
# are displayed in the browser. By default, this is set to True and
# Streamlit displays app exceptions and associated tracebacks, and
# deprecation warnings, in the browser.

# If set to False, deprecation warnings and full exception messages
# will print to the console only. Exceptions will still display in the
# browser with a generic error message. For now, the exception type and
# traceback show in the browser also, but they will be removed in the
# future.

# Default: true
showErrorDetails = true

# Change the visibility of items in the toolbar, options menu,
# and settings dialog (top right of the app).

# Allowed values:
# * "auto"      : Show the developer options if the app is accessed through
#                 localhost or through Streamlit Community Cloud as a developer.
#                 Hide them otherwise.
# * "developer" : Show the developer options.
# * "viewer"    : Hide the developer options.
# * "minimal"   : Show only options set externally (e.g. through
#                 Streamlit Community Cloud) or through st.set_page_config.
#                 If there are no options left, hide the menu.

# Default: "auto"
toolbarMode = "auto"

[runner]

# Allows you to type a variable or string by itself in a single line of
# Python code to write it to the app.

# Default: true
magicEnabled = true

# Install a Python tracer to allow you to stop or pause your script at
# any point and introspect it. As a side-effect, this slows down your
# script's execution.

# Default: false
installTracer = false

# Sets the MPLBACKEND environment variable to Agg inside Streamlit to
# prevent Python crashing.

# Default: true
fixMatplotlib = true

# Run the Python Garbage Collector after each script execution. This
# can help avoid excess memory use in Streamlit apps, but could
# introduce delay in rerunning the app script for high-memory-use
# applications.

# Default: true
postScriptGC = true

# Handle script rerun requests immediately, rather than waiting for script
# execution to reach a yield point. This makes Streamlit much more
# responsive to user interaction, but it can lead to race conditions in
# apps that mutate session_state data outside of explicit session_state
# assignment statements.

# Default: true
fastReruns = true

# Raise an exception after adding unserializable data to Session State.
# Some execution environments may require serializing all data in Session
# State, so it may be useful to detect incompatibility during development,
# or when the execution environment will stop supporting it in the future.

# Default: false
enforceSerializableSessionState = false

[server]

# List of folders that should not be watched for changes. This
# impacts both "Run on Save" and @st.cache.

# Relative paths will be taken as relative to the current working directory.

# Example: ['/home/user1/env', 'relative/path/to/folder']

# Default: []
folderWatchBlacklist = []

# Change the type of file watcher used by Streamlit, or turn it off
# completely.

# Allowed values:
# * "auto"     : Streamlit will attempt to use the watchdog module, and
#                falls back to polling if watchdog is not available.
# * "watchdog" : Force Streamlit to use the watchdog module.
# * "poll"     : Force Streamlit to always use polling.
# * "none"     : Streamlit will not watch files.

# Default: "auto"
fileWatcherType = "auto"

# Symmetric key used to produce signed cookies. If deploying on multiple
# replicas, this should be set to the same value across all replicas to ensure
# they all share the same secret.

# Default: randomly generated secret key.
cookieSecret = "a-random-key-appears-here"

# If false, will attempt to open a browser window on start.

# Default: false unless (1) we are on a Linux box where DISPLAY is unset, or
# (2) we are running in the Streamlit Atom plugin.
# headless = false

# Automatically rerun script when the file is modified on disk.

# Default: false
runOnSave = false

# The address where the server will listen for client and browser
# connections. Use this if you want to bind the server to a specific address.
# If set, the server will only be accessible from this address, and not from
# any aliases (like localhost).

# Default: (unset)
# address =

# The port where the server will listen for browser connections.

# Default: 8501
port = 8501

# The base path for the URL where Streamlit should be served from.

# Default: ""
baseUrlPath = ""

# Enables support for Cross-Origin Resource Sharing (CORS) protection, for
# added security.

# Due to conflicts between CORS and XSRF, if `server.enableXsrfProtection` is
# on and `server.enableCORS` is off at the same time, we will prioritize
# `server.enableXsrfProtection`.

# Default: true
enableCORS = true

# Enables support for Cross-Site Request Forgery (XSRF) protection, for added
# security.

# Due to conflicts between CORS and XSRF, if `server.enableXsrfProtection` is
# on and `server.enableCORS` is off at the same time, we will prioritize
# `server.enableXsrfProtection`.

# Default: true
enableXsrfProtection = true

# Max size, in megabytes, for files uploaded with the file_uploader.

# Default: 200
maxUploadSize = 200

# Max size, in megabytes, of messages that can be sent via the WebSocket
# connection.

# Default: 200
maxMessageSize = 200

# Enables support for websocket compression.

# Default: false
enableWebsocketCompression = false

# Enable serving files from a `static` directory in the running app's
# directory.

# Default: false
enableStaticServing = false

# Server certificate file for connecting via HTTPS.
# Must be set at the same time as "server.sslKeyFile".

# ['DO NOT USE THIS OPTION IN A PRODUCTION ENVIRONMENT. It has not gone through
# security audits or performance tests. For the production environment, we
# recommend performing SSL termination by the load balancer or the reverse
# proxy.']
# sslCertFile =

# Cryptographic key file for connecting via HTTPS.
# Must be set at the same time as "server.sslCertFile".

# ['DO NOT USE THIS OPTION IN A PRODUCTION ENVIRONMENT. It has not gone through
# security audits or performance tests. For the production environment, we
# recommend performing SSL termination by the load balancer or the reverse
# proxy.']
# sslKeyFile =

[browser]

# Internet address where users should point their browsers in order to
# connect to the app. Can be IP address or DNS name and path.

# This is used to:
# - Set the correct URL for CORS and XSRF protection purposes.
# - Show the URL on the terminal
# - Open the browser

# Default: "localhost"
serverAddress = "localhost"

# Whether to send usage statistics to Streamlit.

# Default: true
gatherUsageStats = true

# Port where users should point their browsers in order to connect to the
# app.

# This is used to:
# - Set the correct URL for CORS and XSRF protection purposes.
# - Show the URL on the terminal
# - Open the browser

# Default: whatever value is set in server.port.
serverPort = 8501

[mapbox]

# Configure Streamlit to use a custom Mapbox
# token for elements like st.pydeck_chart and st.map.
# To get a token for yourself, create an account at
# https://mapbox.com. It's free (for moderate usage levels)!

# Default: ""
token = ""

[deprecation]

# Set to false to disable the deprecation warning for the file uploader
# encoding.

# Default: true
showfileUploaderEncoding = true

# Set to false to disable the deprecation warning for using the global pyplot
# instance.

# Default: true
showPyplotGlobalUse = true

[theme]

# The preset Streamlit theme that your custom theme inherits from.
# One of "light" or "dark".
# base =

# Primary accent color for interactive elements.
# primaryColor =

# Background color for the main content area.
# backgroundColor =

# Background color used for the sidebar and most interactive widgets.
# secondaryBackgroundColor =

# Color used for almost all text.
# textColor =

# Font family for all text in the app, except code blocks. One of "sans serif",
# "serif", or "monospace".
# font =
```

</Collapse>
