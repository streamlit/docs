---
site_menu:
  - category: Get started
    url: /get-started
    description:
    color: orange-70
    icon: rocket_launch
  - category: Get started / Installation
    url: /get-started/installation
    description: It's just `pip install streamlit`. But read for more details and alternatives.
  - category: Get started / Installation / Use command line
    url: /get-started/installation/command-line
    description:
  - category: Get started / Installation / Use Anaconda Distribution
    url: /get-started/installation/anaconda-distribution
    description:
  - category: Get started / Installation / Use GitHub Codespaces
    url: /get-started/installation/community-cloud
    description:
  - category: Get started / Installation / Use Snowflake
    url: /get-started/installation/streamlit-in-snowflake
    description:
  - category: Get started / Fundamentals
    url: /get-started/fundamentals
    description:
  - category: Get started / Fundamentals / Basic concepts
    url: /get-started/fundamentals/main-concepts
    description:
  - category: Get started / Fundamentals / Advanced concepts
    url: /get-started/fundamentals/advanced-concepts
    description:
  - category: Get started / Fundamentals / Additional features
    url: /get-started/fundamentals/additional-features
    description:
  - category: Get started / Fundamentals / Summary
    url: /get-started/fundamentals/summary
    description:
  - category: Get started / First steps
    url: /get-started/tutorials
    description:
  - category: Get started / First steps / Create an app
    url: /get-started/tutorials/create-an-app
    description:
  - category: Get started / First steps / Create a multipage app
    url: /get-started/tutorials/create-a-multipage-app
    description:

  - category: Develop
    url: /develop
    description: All the information you need to build beautiful, performant web apps with Streamlit.
    color: indigo-70
    icon: code

  - category: Develop / Concepts
    url: /develop/concepts
    description:
  - category: Develop / Concepts / CORE
  - category: Develop / Concepts / Architecture and execution
    url: /develop/concepts/architecture
    description: Understand how to start your Streamlit app. Understand Streamlit's client-server architecture and related considerations.
  - category: Develop / Concepts / Architecture and execution / Running your app
    url: /develop/concepts/architecture/run-your-app
    description:
  - category: Develop / Concepts / Architecture and execution / Streamlit's architecture
    url: /develop/concepts/architecture/architecture
    description: Streamlit apps have a client-server structure. The Python backend of your app is the server. The frontend you view through a browser is the client.
  - category: Develop / Concepts / Architecture and execution / The app chrome
    url: /develop/concepts/architecture/app-chrome
    description: Explains the widgets in the top right of your Streamlit app. These widgets help you in development, and also help your viewers as they use your app.
  - category: Develop / Concepts / Architecture and execution / Caching
    url: /develop/concepts/architecture/caching
    description: Use `@st.cache_resource` and `@st.cache_data` to speed up your app.
  - category: Develop / Concepts / Architecture and execution / Session State
    url: /develop/concepts/architecture/session-state
    description: Use session state to store data that persists across app reruns during a user's session. (A session is connected to a browser tab)
  - category: Develop / Concepts / Architecture and execution / Forms
    url: /develop/concepts/architecture/forms
    description: Use `st.form` when you don't want to rerun your script with every input made by a user.
  - category: Develop / Concepts / Architecture and execution / Fragments
    url: /develop/concepts/architecture/fragments
    description: Use `st.fragment` to rerun only a subsection of your app when a user interacts, or on a timer.
  - category: Develop / Concepts / Architecture and execution/ Widget behavior
    url: /develop/concepts/architecture/widget-behavior
    description: Learn about widgets (like `st.button`, `st.selectbox`, and `st.text_input`), which  are at the heart of Streamlit apps.
  - category: Develop / Concepts / Multipage apps
    url: /develop/concepts/multipage-apps
    description:
  - category: Develop / Concepts / Multipage apps / Overview
    url: /develop/concepts/multipage-apps/overview
    description: Streamlit provides two built-in mechanisms for creating multipage apps. `st.navigation` and the `pages/` directory.
  - category: Develop / Concepts / Multipage apps / Page and navigation
    url: /develop/concepts/multipage-apps/page-and-navigation
    description: Describes how to use `st.Page` and `st.navigation` to define multipage apps. This is the preferred method.
  - category: Develop / Concepts / Multipage apps / Pages directory
    url: /develop/concepts/multipage-apps/pages-directory
    description: Describes how to use the `pages/` directory to define multiple pages.
  - category: Develop / Concepts / Multipage apps / Working with widgets
    url: /develop/concepts/multipage-apps/widgets
    description:
  - category: Develop / Concepts / App design
    url: /develop/concepts/design
    description: How to create dynamic, animated content or update elements without rerunning your app.
  - category: Develop / Concepts / App design / Animate and update elements
    url: /develop/concepts/design/animate
    description: Display a chart or dataframe and modify it live as the app runs (for example, in a loop).
  - category: Develop / Concepts / App design / Button behavior and examples
    url: /develop/concepts/design/buttons
    description: Buttons created with `st.button` do not retain state. This comes with some complexity.
  - category: Develop / Concepts / App design / Dataframes
    url: /develop/concepts/design/dataframes
    description: Dataframes are a great way to display and edit data in a tabular format.
  - category: Develop / Concepts / App design / Multithreading
    url: /develop/concepts/design/multithreading
    description: How Streamlit uses multiple threads in its design.
  - category: Develop / Concepts / App design / Using custom classes
    url: /develop/concepts/design/custom-classes
    description: Design patterns for using custom classes in Streamlit. For example, if defining your own custom classes, do it in a separate module.
  - category: Develop / Concepts / App design / Working with timezones
    url: /develop/concepts/design/timezone-handling
    description: Understand how Streamlit handles time zones.
  - category: Develop / Concepts / ADDITIONAL
  - category: Develop / Concepts / Connections, secrets, and authentication
    url: /develop/concepts/connections
    description:
  - category: Develop / Concepts / Connections, secrets, and authentication / Connecting to data
    url: /develop/concepts/connections/connecting-to-data
    description: Connect to data source using plain Python, or use Streamlit's `st.connection` for some nice extras.
  - category: Develop / Concepts / Connections, secrets, and authentication / Secrets management
    url: /develop/concepts/connections/secrets-management
    description: Place secrets at `.streamlit/secrets.toml` and access them with `st.secrets`.
  - category: Develop / Concepts / Connections, secrets, and authentication / User authentication
    url: /develop/concepts/connections/authentication
    description: Simple authentication with OIDC / OAuth2 via `.streamlimt/secrets.toml`, `st.login`, `st.logout`, and `st.user`.
  - category: Develop / Concepts / Connections, secrets, and authentication / Security reminders
    url: /develop/concepts/connections/security-reminders
    description: Best practices to secure your Streamlit app.
  - category: Develop / Concepts / Custom components
    url: /develop/concepts/custom-components
    description: Use custom components (or build your own!) to extend Streamlit.
  - category: Develop / Concepts / Custom components / Intro to custom components
    url: /develop/concepts/custom-components/intro
    description:
  - category: Develop / Concepts / Custom components / Create a Component
    url: /develop/concepts/custom-components/create
    description:
  - category: Develop / Concepts / Custom components / Publish a Component
    url: /develop/concepts/custom-components/publish
    description: Custom components are published in PyPI like any Python package.
  - category: Develop / Concepts / Custom components / Limitations
    url: /develop/concepts/custom-components/limitations
    description:
  - category: Develop / Concepts / Custom components / Component gallery
    url: https://streamlit.io/components
    description:
  - category: Develop / Concepts / Configuration and theming
    url: /develop/concepts/configuration
    description: Configure Streamlit and change its looks with `.streamlit/config.toml`.
  - category: Develop / Concepts / Configuration and theming / Configuration options
    url: /develop/concepts/configuration/options
    description: Learn about every config option. Also available with the command `streamlit config show`.
  - category: Develop / Concepts / Configuration and theming / HTTPS support
    url: /develop/concepts/configuration/https-support
    description:
  - category: Develop / Concepts / Configuration and theming / Serving static files
    url: /develop/concepts/configuration/serving-static-files
    description:
  - category: Develop / Concepts / Configuration and theming / THEMING
  - category: Develop / Concepts / Configuration and theming / Customize your theme
    url: /develop/concepts/configuration/theming
    description: The preferred way to change how a Streamlit app looks is with themes in `.streamlit/config.toml`.
  - category: Develop / Concepts / Configuration and theming / Customize colors and borders
    url: /develop/concepts/configuration/theming-customize-colors-and-borders
    description:
  - category: Develop / Concepts / Configuration and theming / Customize fonts
    url: /develop/concepts/configuration/theming-customize-fonts
    description:
  - category: Develop / Concepts / App testing
    url: /develop/concepts/app-testing
    description:
  - category: Develop / Concepts / App testing / Get started
    url: /develop/concepts/app-testing/get-started
    description:
  - category: Develop / Concepts / App testing / Beyond the basics
    url: /develop/concepts/app-testing/beyond-the-basics
    description:
  - category: Develop / Concepts / App testing / Automate your tests
    url: /develop/concepts/app-testing/automate-tests
    description:
  - category: Develop / Concepts / App testing / Example
    url: /develop/concepts/app-testing/examples
    description:
  - category: Develop / Concepts / App testing / Cheat sheet
    url: /develop/concepts/app-testing/cheat-sheet
    description:

  - category: Develop / API reference
    url: /develop/api-reference
    description:
  - category: Develop / API reference / PAGE ELEMENTS
  - category: Develop / API reference / Write and magic
    url: /develop/api-reference/write-magic
    description:
  - category: Develop / API reference / Write and magic / st.write
    url: /develop/api-reference/write-magic/st.write
    description:
    isVersioned: true
  - category: Develop / API reference / Write and magic / st.write_stream
    url: /develop/api-reference/write-magic/st.write_stream
    description:
    isVersioned: true
  - category: Develop / API reference / Write and magic / magic
    url: /develop/api-reference/write-magic/magic
    description:
  - category: Develop / API reference / Text elements
    url: /develop/api-reference/text
    description:
  - category: Develop / API reference / Text elements / HEADINGS AND BODY
  - category: Develop / API reference / Text elements / st.title
    url: /develop/api-reference/text/st.title
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.header
    url: /develop/api-reference/text/st.header
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.subheader
    url: /develop/api-reference/text/st.subheader
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.markdown
    url: /develop/api-reference/text/st.markdown
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / FORMATTED TEXT
  - category: Develop / API reference / Text elements / st.badge
    url: /develop/api-reference/text/st.badge
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.caption
    url: /develop/api-reference/text/st.caption
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.code
    url: /develop/api-reference/text/st.code
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.divider
    url: /develop/api-reference/text/st.divider
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.echo
    url: /develop/api-reference/text/st.echo
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.latex
    url: /develop/api-reference/text/st.latex
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.text
    url: /develop/api-reference/text/st.text
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / UTILITIES
  - category: Develop / API reference / Text elements / st.help
    url: /develop/api-reference/text/st.help
    description:
    isVersioned: true
  - category: Develop / API reference / Text elements / st.html
    url: /develop/api-reference/text/st.html
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements
    url: /develop/api-reference/data
    description:
  - category: Develop / API reference / Data elements / st.dataframe
    url: /develop/api-reference/data/st.dataframe
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.data_editor
    url: /develop/api-reference/data/st.data_editor
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config
    url: /develop/api-reference/data/st.column_config
    description:
  - category: Develop / API reference / Data elements / st.column_config / Column
    url: /develop/api-reference/data/st.column_config/st.column_config.column
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Text column
    url: /develop/api-reference/data/st.column_config/st.column_config.textcolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Number column
    url: /develop/api-reference/data/st.column_config/st.column_config.numbercolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Checkbox column
    url: /develop/api-reference/data/st.column_config/st.column_config.checkboxcolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Selectbox column
    url: /develop/api-reference/data/st.column_config/st.column_config.selectboxcolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Datetime column
    url: /develop/api-reference/data/st.column_config/st.column_config.datetimecolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Date column
    url: /develop/api-reference/data/st.column_config/st.column_config.datecolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Time column
    url: /develop/api-reference/data/st.column_config/st.column_config.timecolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / JSON column
    url: /develop/api-reference/data/st.column_config/st.column_config.jsoncolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / List column
    url: /develop/api-reference/data/st.column_config/st.column_config.listcolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Link column
    url: /develop/api-reference/data/st.column_config/st.column_config.linkcolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Image column
    url: /develop/api-reference/data/st.column_config/st.column_config.imagecolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Area chart column
    url: /develop/api-reference/data/st.column_config/st.column_config.areachartcolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Line chart column
    url: /develop/api-reference/data/st.column_config/st.column_config.linechartcolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Bar chart column
    url: /develop/api-reference/data/st.column_config/st.column_config.barchartcolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.column_config / Progress column
    url: /develop/api-reference/data/st.column_config/st.column_config.progresscolumn
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.table
    url: /develop/api-reference/data/st.table
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.metric
    url: /develop/api-reference/data/st.metric
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.json
    url: /develop/api-reference/data/st.json
    description:
    isVersioned: true
  - category: Develop / API reference / Data elements / st.experimental_data_editor
    url: /develop/api-reference/data/st.experimental_data_editor
    description:
    isVersioned: true
    isDeprecated: true
    visible: false
  - category: Develop / API reference / Chart elements
    url: /develop/api-reference/charts
    description:
  - category: Develop / API reference / Chart elements / SIMPLE
  - category: Develop / API reference / Chart elements / st.area_chart
    url: /develop/api-reference/charts/st.area_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.bar_chart
    url: /develop/api-reference/charts/st.bar_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.line_chart
    url: /develop/api-reference/charts/st.line_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.map
    url: /develop/api-reference/charts/st.map
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.scatter_chart
    url: /develop/api-reference/charts/st.scatter_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / ADVANCED
  - category: Develop / API reference / Chart elements / st.altair_chart
    url: /develop/api-reference/charts/st.altair_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.bokeh_chart
    url: /develop/api-reference/charts/st.bokeh_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.graphviz_chart
    url: /develop/api-reference/charts/st.graphviz_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.plotly_chart
    url: /develop/api-reference/charts/st.plotly_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.pydeck_chart
    url: /develop/api-reference/charts/st.pydeck_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.pyplot
    url: /develop/api-reference/charts/st.pyplot
    description:
    isVersioned: true
  - category: Develop / API reference / Chart elements / st.vega_lite_chart
    url: /develop/api-reference/charts/st.vega_lite_chart
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets
    url: /develop/api-reference/widgets
    description:
  - category: Develop / API reference / Input widgets / BUTTONS
  - category: Develop / API reference / Input widgets / st.button
    url: /develop/api-reference/widgets/st.button
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.download_button
    url: /develop/api-reference/widgets/st.download_button
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.form_submit_button
    url: https://docs.streamlit.io/develop/api-reference/execution-flow/st.form_submit_button
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.link_button
    url: /develop/api-reference/widgets/st.link_button
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.page_link
    url: /develop/api-reference/widgets/st.page_link
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / SELECTIONS
  - category: Develop / API reference / Input widgets / st.checkbox
    url: /develop/api-reference/widgets/st.checkbox
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.color_picker
    url: /develop/api-reference/widgets/st.color_picker
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.feedback
    url: /develop/api-reference/widgets/st.feedback
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.multiselect
    url: /develop/api-reference/widgets/st.multiselect
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.pills
    url: /develop/api-reference/widgets/st.pills
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.radio
    url: /develop/api-reference/widgets/st.radio
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.segmented_control
    url: /develop/api-reference/widgets/st.segmented_control
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.selectbox
    url: /develop/api-reference/widgets/st.selectbox
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.select_slider
    url: /develop/api-reference/widgets/st.select_slider
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.toggle
    url: /develop/api-reference/widgets/st.toggle
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / NUMERIC
  - category: Develop / API reference / Input widgets / st.number_input
    url: /develop/api-reference/widgets/st.number_input
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.slider
    url: /develop/api-reference/widgets/st.slider
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / DATE AND TIME
  - category: Develop / API reference / Input widgets / st.date_input
    url: /develop/api-reference/widgets/st.date_input
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.time_input
    url: /develop/api-reference/widgets/st.time_input
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / TEXT
  - category: Develop / API reference / Input widgets / st.chat_input
    url: https://docs.streamlit.io/develop/api-reference/chat/st.chat_input
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.text_area
    url: /develop/api-reference/widgets/st.text_area
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.text_input
    url: /develop/api-reference/widgets/st.text_input
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / MEDIA AND FILES
  - category: Develop / API reference / Input widgets / st.audio_input
    url: /develop/api-reference/widgets/st.audio_input
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.camera_input
    url: /develop/api-reference/widgets/st.camera_input
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.data_editor
    url: https://docs.streamlit.io/develop/api-reference/data/st.data_editor
    description:
    isVersioned: true
  - category: Develop / API reference / Input widgets / st.file_uploader
    url: /develop/api-reference/widgets/st.file_uploader
    description:
    isVersioned: true
  - category: Develop / API reference / Media elements
    url: /develop/api-reference/media
    description:
  - category: Develop / API reference / Media elements / st.audio
    url: /develop/api-reference/media/st.audio
    description:
    isVersioned: true
  - category: Develop / API reference / Media elements / st.image
    url: /develop/api-reference/media/st.image
    description:
    isVersioned: true
  - category: Develop / API reference / Media elements / st.logo
    url: /develop/api-reference/media/st.logo
    description:
    isVersioned: true
  - category: Develop / API reference / Media elements / st.pdf
    url: /develop/api-reference/media/st.pdf
    description:
    isVersioned: true
  - category: Develop / API reference / Media elements / st.video
    url: /develop/api-reference/media/st.video
    description:
    isVersioned: true
  - category: Develop / API reference / Layouts and containers
    url: /develop/api-reference/layout
    description:
  - category: Develop / API reference / Layouts and containers / st.columns
    url: /develop/api-reference/layout/st.columns
    description:
    isVersioned: true
  - category: Develop / API reference / Layouts and containers / st.container
    url: /develop/api-reference/layout/st.container
    description:
    isVersioned: true
  - category: Develop / API reference / Layouts and containers / st.dialog
    url: https://docs.streamlit.io/develop/api-reference/execution-flow/st.dialog
    description:
    isVersioned: true
  - category: Develop / API reference / Layouts and containers / st.empty
    url: /develop/api-reference/layout/st.empty
    description:
    isVersioned: true
  - category: Develop / API reference / Layouts and containers / st.expander
    url: /develop/api-reference/layout/st.expander
    description:
    isVersioned: true
  - category: Develop / API reference / Layouts and containers / st.form
    url: https://docs.streamlit.io/develop/api-reference/execution-flow/st.form
    description:
    isVersioned: true
  - category: Develop / API reference / Layouts and containers / st.popover
    url: /develop/api-reference/layout/st.popover
    description:
    isVersioned: true
  - category: Develop / API reference / Layouts and containers / st.sidebar
    url: /develop/api-reference/layout/st.sidebar
    description:
    isVersioned: true
  - category: Develop / API reference / Layouts and containers / st.tabs
    url: /develop/api-reference/layout/st.tabs
    description:
    isVersioned: true
  - category: Develop / API reference / Chat elements
    url: /develop/api-reference/chat
    description:
  - category: Develop / API reference / Chat elements / st.chat_input
    url: /develop/api-reference/chat/st.chat_input
    description:
    isVersioned: true
  - category: Develop / API reference / Chat elements / st.chat_message
    url: /develop/api-reference/chat/st.chat_message
    description:
    isVersioned: true
  - category: Develop / API reference / Chat elements / st.status
    url: https://docs.streamlit.io/develop/api-reference/status/st.status
    description:
    isVersioned: true
  - category: Develop / API reference / Chat elements / st.write_stream
    url: https://docs.streamlit.io/develop/api-reference/write-magic/st.write_stream
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements
    url: /develop/api-reference/status
    description:
  - category: Develop / API reference / Status elements / CALLOUTS
  - category: Develop / API reference / Status elements / st.success
    url: /develop/api-reference/status/st.success
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / st.info
    url: /develop/api-reference/status/st.info
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / st.warning
    url: /develop/api-reference/status/st.warning
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / st.error
    url: /develop/api-reference/status/st.error
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / st.exception
    url: /develop/api-reference/status/st.exception
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / OTHER
  - category: Develop / API reference / Status elements / st.progress
    url: /develop/api-reference/status/st.progress
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / st.spinner
    url: /develop/api-reference/status/st.spinner
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / st.status
    url: /develop/api-reference/status/st.status
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / st.toast
    url: /develop/api-reference/status/st.toast
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / st.balloons
    url: /develop/api-reference/status/st.balloons
    description:
    isVersioned: true
  - category: Develop / API reference / Status elements / st.snow
    url: /develop/api-reference/status/st.snow
    description:
    isVersioned: true
  - category: Develop / API reference / Third-party components
    url: https://streamlit.io/components
    description:
  - category: Develop / API reference / APPLICATION LOGIC
  - category: Develop / API reference / Authentication and user info
    url: /develop/api-reference/user
    description:
  - category: Develop / API reference / Authentication and user info / st.login
    url: /develop/api-reference/user/st.login
    description:
    isVersioned: true
  - category: Develop / API reference / Authentication and user info / st.logout
    url: /develop/api-reference/user/st.logout
    description:
    isVersioned: true
  - category: Develop / API reference / Authentication and user info / st.user
    url: /develop/api-reference/user/st.user
    description:
    isVersioned: true
  - category: Develop / API reference / Navigation and pages
    url: /develop/api-reference/navigation
    description:
  - category: Develop / API reference / Navigation and pages / st.navigation
    url: /develop/api-reference/navigation/st.navigation
    description:
    isVersioned: true
  - category: Develop / API reference / Navigation and pages / st.Page
    url: /develop/api-reference/navigation/st.page
    description:
    isVersioned: true
  - category: Develop / API reference / Navigation and pages / st.page_link
    url: https://docs.streamlit.io/develop/api-reference/widgets/st.page_link
    description:
    isVersioned: true
  - category: Develop / API reference / Navigation and pages / st.switch_page
    url: /develop/api-reference/navigation/st.switch_page
    description:
    isVersioned: true
  - category: Develop / API reference / Execution flow
    url: /develop/api-reference/execution-flow
    description:
  - category: Develop / API reference / Execution flow / st.dialog
    url: /develop/api-reference/execution-flow/st.dialog
    description:
    isVersioned: true
  - category: Develop / API reference / Execution flow / st.form
    url: /develop/api-reference/execution-flow/st.form
    description:
    isVersioned: true
  - category: Develop / API reference / Execution flow / st.form_submit_button
    url: /develop/api-reference/execution-flow/st.form_submit_button
    description:
    isVersioned: true
  - category: Develop / API reference / Execution flow / st.fragment
    url: /develop/api-reference/execution-flow/st.fragment
    description:
    isVersioned: true
  - category: Develop / API reference / Execution flow / st.rerun
    url: /develop/api-reference/execution-flow/st.rerun
    description:
    isVersioned: true
  - category: Develop / API reference / Execution flow / st.stop
    url: /develop/api-reference/execution-flow/st.stop
    description:
    isVersioned: true
  - category: Develop / API reference / Execution flow / st.experimental_rerun
    url: /develop/api-reference/execution-flow/st.experimental_rerun
    description:
    isVersioned: true
    isDeprecated: true
    visible: false
  - category: Develop / API reference / Caching and state
    url: /develop/api-reference/caching-and-state
    description:
  - category: Develop / API reference / Caching and state / SERVER
  - category: Develop / API reference / Caching and state / st.cache_data
    url: /develop/api-reference/caching-and-state/st.cache_data
    description:
    isVersioned: true
  - category: Develop / API reference / Caching and state / st.cache_resource
    url: /develop/api-reference/caching-and-state/st.cache_resource
    description:
    isVersioned: true
  - category: Develop / API reference / Caching and state / st.experimental_memo
    url: /develop/api-reference/caching-and-state/st.experimental_memo
    description:
    isVersioned: true
    isDeprecated: true
    visible: false
  - category: Develop / API reference / Caching and state / st.experimental_singleton
    url: /develop/api-reference/caching-and-state/st.experimental_singleton
    description:
    isVersioned: true
    isDeprecated: true
    visible: false
  - category: Develop / API reference / Caching and state / st.session_state
    url: /develop/api-reference/caching-and-state/st.session_state
    description:
  - category: Develop / API reference / Caching and state / BROWSER
  - category: Develop / API reference / Caching and state / st.context
    url: /develop/api-reference/caching-and-state/st.context
    description:
    isVersioned: true
  - category: Develop / API reference / Caching and state / st.query_params
    url: /develop/api-reference/caching-and-state/st.query_params
    description:
    isVersioned: true
  - category: Develop / API reference / Caching and state / st.experimental_get_query_params
    url: /develop/api-reference/caching-and-state/st.experimental_get_query_params
    description:
    isVersioned: true
    isDeprecated: true
  - category: Develop / API reference / Caching and state / st.experimental_set_query_params
    url: /develop/api-reference/caching-and-state/st.experimental_set_query_params
    description:
    isVersioned: true
    isDeprecated: true
  - category: Develop / API reference / Connections and secrets
    url: /develop/api-reference/connections
    description:
  - category: Develop / API reference / Connections and secrets / SECRETS
  - category: Develop / API reference / Connections and secrets / st.secrets
    url: /develop/api-reference/connections/st.secrets
    description:
  - category: Develop / API reference / Connections and secrets / secrets.toml
    url: /develop/api-reference/connections/secrets.toml
    description:
  - category: Develop / API reference / Connections and secrets / CONNECTIONS
  - category: Develop / API reference / Connections and secrets / st.connection
    url: /develop/api-reference/connections/st.connection
    description:
    isVersioned: true
  - category: Develop / API reference / Connections and secrets / SnowflakeConnection
    url: /develop/api-reference/connections/st.connections.snowflakeconnection
    description:
    isVersioned: true
  - category: Develop / API reference / Connections and secrets / SQLConnection
    url: /develop/api-reference/connections/st.connections.sqlconnection
    description:
    isVersioned: true
  - category: Develop / API reference / Connections and secrets / BaseConnection
    url: /develop/api-reference/connections/st.connections.baseconnection
    description:
    isVersioned: true
  - category: Develop / API reference / Connections and secrets / st.experimental_connection
    url: /develop/api-reference/connections/st.experimental_connection
    description:
    isVersioned: true
    isDeprecated: true
    visible: false
  - category: Develop / API reference / Connections and secrets / SnowparkConnection
    url: /develop/api-reference/connections/st.connections.snowparkconnection
    description:
    isVersioned: true
    isDeprecated: true
  - category: Develop / API reference / Connections and secrets / ExperimentalBaseConnection
    url: /develop/api-reference/connections/st.connections.experimentalbaseconnection
    description:
    isVersioned: true
    isDeprecated: true
    visible: false
  - category: Develop / API reference / Custom components
    url: /develop/api-reference/custom-components
    description:
    isVersioned: false
  - category: Develop / API reference / Custom components / st.components.v1​.declare_component
    url: /develop/api-reference/custom-components/st.components.v1.declare_component
    description:
    isVersioned: true
  - category: Develop / API reference / Custom components / st.components.v1.html
    url: /develop/api-reference/custom-components/st.components.v1.html
    description:
    isVersioned: true
  - category: Develop / API reference / Custom components / st.components.v1.iframe
    url: /develop/api-reference/custom-components/st.components.v1.iframe
    description:
    isVersioned: true
  - category: Develop / API reference / Configuration
    url: /develop/api-reference/configuration
    description:
    isVersioned: false
  - category: Develop / API reference / Configuration / config.toml
    url: /develop/api-reference/configuration/config.toml
    description:
  - category: Develop / API reference / Configuration / st.get_option
    url: /develop/api-reference/configuration/st.get_option
    description:
    isVersioned: true
  - category: Develop / API reference / Configuration / st.set_option
    url: /develop/api-reference/configuration/st.set_option
    description:
    isVersioned: true
  - category: Develop / API reference / Configuration / st.set_page_config
    url: /develop/api-reference/configuration/st.set_page_config
    description:
    isVersioned: true
  - category: Develop / API reference / TOOLS
  - category: Develop / API reference / App testing
    url: /develop/api-reference/app-testing
    description:
  - category: Develop / API reference / App testing / st.testing.v1.AppTest
    url: /develop/api-reference/app-testing/st.testing.v1.apptest
    description:
    isVersioned: true
  - category: Develop / API reference / App testing / Testing element classes
    url: /develop/api-reference/app-testing/testing-element-classes
    description:
    isVersioned: true
  - category: Develop / API reference / Command line
    url: /develop/api-reference/cli
    description:
  - category: Develop / API reference / Command line / streamlit cache
    url: /develop/api-reference/cli/cache
    description:
  - category: Develop / API reference / Command line / streamlit config
    url: /develop/api-reference/cli/config
    description:
  - category: Develop / API reference / Command line / streamlit docs
    url: /develop/api-reference/cli/docs
    description:
  - category: Develop / API reference / Command line / streamlit hello
    url: /develop/api-reference/cli/hello
    description:
  - category: Develop / API reference / Command line / streamlit help
    url: /develop/api-reference/cli/help
    description:
  - category: Develop / API reference / Command line / streamlit init
    url: /develop/api-reference/cli/init
    description:
  - category: Develop / API reference / Command line / streamlit run
    url: /develop/api-reference/cli/run
    description:
  - category: Develop / API reference / Command line / streamlit version
    url: /develop/api-reference/cli/version
    description:

  - category: Develop / Tutorials
    url: /develop/tutorials
    description:
  - category: Develop / Tutorials / Authentication and personalization
    url: /develop/tutorials/authentication
    description:
  - category: Develop / Tutorials / Authentication and personalization / Google Auth Platform
    url: /develop/tutorials/authentication/google
    description:
  - category: Develop / Tutorials / Authentication and personalization / Microsoft Entra
    url: /develop/tutorials/authentication/microsoft
    description:
  - category: Develop / Tutorials / Chat and LLM apps
    url: /develop/tutorials/chat-and-llm-apps
    description:
  - category: Develop / Tutorials / Chat and LLM apps / Build a basic LLM chat app
    url: /develop/tutorials/chat-and-llm-apps/build-conversational-apps
    description:
  - category: Develop / Tutorials / Chat and LLM apps / Build an LLM app using LangChain
    url: /develop/tutorials/chat-and-llm-apps/llm-quickstart
    description:
  - category: Develop / Tutorials / Chat and LLM apps / Get chat response feedback
    url: /develop/tutorials/chat-and-llm-apps/chat-response-feedback
    description:
  - category: Develop / Tutorials / Chat and LLM apps / Validate and edit chat responses
    url: /develop/tutorials/chat-and-llm-apps/validate-and-edit-chat-responses
    description:
  - category: Develop / Tutorials / Configuration and theming
    url: /develop/tutorials/configuration-and-theming
    description:
  - category: Develop / Tutorials / Configuration and theming / Use external font files
    url: /develop/tutorials/configuration-and-theming/external-fonts
    description:
  - category: Develop / Tutorials / Configuration and theming / Use static font files
    url: /develop/tutorials/configuration-and-theming/static-fonts
    description:
  - category: Develop / Tutorials / Configuration and theming / Use variable font files
    url: /develop/tutorials/configuration-and-theming/variable-fonts
    description:
  - category: Develop / Tutorials / Connect to data sources
    url: /develop/tutorials/databases
    description:
  - category: Develop / Tutorials / Connect to data sources / AWS S3
    url: /develop/tutorials/databases/aws-s3
    description:
  - category: Develop / Tutorials / Connect to data sources / BigQuery
    url: /develop/tutorials/databases/bigquery
    description:
  - category: Develop / Tutorials / Connect to data sources / Firestore
    url: https://blog.streamlit.io/streamlit-firestore/
    description:
  - category: Develop / Tutorials / Connect to data sources / Google Cloud Storage
    url: /develop/tutorials/databases/gcs
    description:
  - category: Develop / Tutorials / Connect to data sources / Microsoft SQL Server
    url: /develop/tutorials/databases/mssql
    description:
  - category: Develop / Tutorials / Connect to data sources / MongoDB
    url: /develop/tutorials/databases/mongodb
    description:
  - category: Develop / Tutorials / Connect to data sources / MySQL
    url: /develop/tutorials/databases/mysql
    description:
  - category: Develop / Tutorials / Connect to data sources / Neon
    url: /develop/tutorials/databases/neon
    description:
  - category: Develop / Tutorials / Connect to data sources / PostgreSQL
    url: /develop/tutorials/databases/postgresql
    description:
  - category: Develop / Tutorials / Connect to data sources / Private Google Sheet
    url: /develop/tutorials/databases/private-gsheet
    description:
  - category: Develop / Tutorials / Connect to data sources / Public Google Sheet
    url: /develop/tutorials/databases/public-gsheet
    description:
  - category: Develop / Tutorials / Connect to data sources / Snowflake
    url: /develop/tutorials/databases/snowflake
    description:
  - category: Develop / Tutorials / Connect to data sources / Supabase
    url: /develop/tutorials/databases/supabase
    description:
  - category: Develop / Tutorials / Connect to data sources / Tableau
    url: /develop/tutorials/databases/tableau
    description:
  - category: Develop / Tutorials / Connect to data sources / TiDB
    url: /develop/tutorials/databases/tidb
    description:
  - category: Develop / Tutorials / Connect to data sources / TigerGraph
    url: /develop/tutorials/databases/tigergraph
    description:
  - category: Develop / Tutorials / Elements
    url: /develop/tutorials/elements
    description:
  - category: Develop / Tutorials / Elements / CHARTS
  - category: Develop / Tutorials / Elements / Annotate an Altair chart
    url: /develop/tutorials/elements/annotate-an-altair-chart
    description:
  - category: Develop / Tutorials / Elements / DATAFRAMES
  - category: Develop / Tutorials / Elements / Get dataframe row-selections
    url: /develop/tutorials/elements/dataframe-row-selections
    description:
  - category: Develop / Tutorials / Elements / Get dataframe row-selections (streamlit<1.35.0)
    url: /develop/tutorials/elements/dataframe-row-selections-old
    description:
    visible: false
  - category: Develop / Tutorials / Execution flow
    url: /develop/tutorials/execution-flow
    description:
  - category: Develop / Tutorials / Execution flow / FRAGMENTS
  - category: Develop / Tutorials / Execution flow / Rerun your app from a fragment
    url: /develop/tutorials/execution-flow/trigger-a-full-script-rerun-from-a-fragment
    description:
  - category: Develop / Tutorials / Execution flow / Create a multiple-container fragment
    url: /develop/tutorials/execution-flow/create-a-multiple-container-fragment
    description:
  - category: Develop / Tutorials / Execution flow / Start and stop a streaming fragment
    url: /develop/tutorials/execution-flow/start-and-stop-fragment-auto-reruns
    description:
  - category: Develop / Tutorials / Multipage apps
    url: /develop/tutorials/multipage
    description:
  - category: Develop / Tutorials / Multipage apps / Dynamic navigation
    url: /develop/tutorials/multipage/dynamic-navigation
    description:
  - category: Develop / Tutorials / Multipage apps / Build navigation with st.page_link
    url: /develop/tutorials/multipage/st.page_link-nav
    description:
    visible: false
  - category: Develop / Quick reference
    url: /develop/quick-reference
    description:
  - category: Develop / Quick reference / Cheat sheet
    url: /develop/quick-reference/cheat-sheet
    description:
  - category: Develop / Quick reference / Release notes
    url: /develop/quick-reference/release-notes
    description:
  - category: Develop / Quick reference / Release notes / 2025
    url: /develop/quick-reference/release-notes/2025
    description:
  - category: Develop / Quick reference / Release notes / 2024
    url: /develop/quick-reference/release-notes/2024
    description:
  - category: Develop / Quick reference / Release notes / 2023
    url: /develop/quick-reference/release-notes/2023
    description:
  - category: Develop / Quick reference / Release notes / 2022
    url: /develop/quick-reference/release-notes/2022
    description:
  - category: Develop / Quick reference / Release notes / 2021
    url: /develop/quick-reference/release-notes/2021
    description:
  - category: Develop / Quick reference / Release notes / 2020
    url: /develop/quick-reference/release-notes/2020
    description:
  - category: Develop / Quick reference / Release notes / 2019
    url: /develop/quick-reference/release-notes/2019
    description:
  - category: Develop / Quick reference / Pre-release features
    url: /develop/quick-reference/prerelease
    description:
  - category: Develop / Quick reference/ Roadmap
    url: https://roadmap.streamlit.app
    description:

  - category: Deploy
    url: /deploy
    description:
    color: lightBlue-70
    icon: web_asset
  - category: Deploy / Concepts
    url: /deploy/concepts
    description:
  - category: Deploy / Concepts / Dependencies
    url: /deploy/concepts/dependencies
    description:
  - category: Deploy / Concepts / Secrets
    url: /deploy/concepts/secrets
    description:
  - category: Deploy / Streamlit Community Cloud
    url: /deploy/streamlit-community-cloud
    description:
  - category: Deploy / Streamlit Community Cloud / Get started
    url: /deploy/streamlit-community-cloud/get-started
    description:
  - category: Deploy / Streamlit Community Cloud / Get started / Quickstart
    url: /deploy/streamlit-community-cloud/get-started/quickstart
    description:
  - category: Deploy / Streamlit Community Cloud / Get started / Create your account
    url: /deploy/streamlit-community-cloud/get-started/create-your-account
    description:
  - category: Deploy / Streamlit Community Cloud / Get started / Connect your GitHub account
    url: /deploy/streamlit-community-cloud/get-started/connect-your-github-account
    description:
  - category: Deploy / Streamlit Community Cloud / Get started / Explore your workspace
    url: /deploy/streamlit-community-cloud/get-started/explore-your-workspace
    description:
  - category: Deploy / Streamlit Community Cloud / Get started / Deploy from a template
    url: /deploy/streamlit-community-cloud/get-started/deploy-from-a-template
    description:
  - category: Deploy / Streamlit Community Cloud / Get started / Fork and edit a public app
    url: /deploy/streamlit-community-cloud/get-started/fork-and-edit-a-public-app
    description:
  - category: Deploy / Streamlit Community Cloud / Get started / Trust and security
    url: /deploy/streamlit-community-cloud/get-started/trust-and-security
    description:
  - category: Deploy / Streamlit Community Cloud / Deploy your app
    url: /deploy/streamlit-community-cloud/deploy-your-app
    description:
  - category: Deploy / Streamlit Community Cloud / Deploy your app / File organization
    url: /deploy/streamlit-community-cloud/deploy-your-app/file-organization
    description:
  - category: Deploy / Streamlit Community Cloud / Deploy your app / App dependencies
    url: /deploy/streamlit-community-cloud/deploy-your-app/app-dependencies
    description:
  - category: Deploy / Streamlit Community Cloud / Deploy your app / Secrets management
    url: /deploy/streamlit-community-cloud/deploy-your-app/secrets-management
    description:
  - category: Deploy / Streamlit Community Cloud / Deploy your app / Deploy!
    url: /deploy/streamlit-community-cloud/deploy-your-app/deploy
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app
    url: /deploy/streamlit-community-cloud/manage-your-app
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app / App analytics
    url: /deploy/streamlit-community-cloud/manage-your-app/app-analytics
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app / App settings
    url: /deploy/streamlit-community-cloud/manage-your-app/app-settings
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app / Delete your app
    url: /deploy/streamlit-community-cloud/manage-your-app/delete-your-app
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app / Edit your app
    url: /deploy/streamlit-community-cloud/manage-your-app/edit-your-app
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app / Favorite your app
    url: /deploy/streamlit-community-cloud/manage-your-app/favorite-your-app
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app / Reboot your app
    url: /deploy/streamlit-community-cloud/manage-your-app/reboot-your-app
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app / Rename your app in GitHub
    url: /deploy/streamlit-community-cloud/manage-your-app/rename-your-app
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app / Upgrade Python
    url: /deploy/streamlit-community-cloud/manage-your-app/upgrade-python
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your app / Upgrade Streamlit
    url: /deploy/streamlit-community-cloud/manage-your-app/upgrade-streamlit
    description:
  - category: Deploy / Streamlit Community Cloud / Share your app
    url: /deploy/streamlit-community-cloud/share-your-app
    description:
  - category: Deploy / Streamlit Community Cloud / Share your app / Embed your app
    url: /deploy/streamlit-community-cloud/share-your-app/embed-your-app
    description:
  - category: Deploy / Streamlit Community Cloud / Share your app / Search indexability
    url: /deploy/streamlit-community-cloud/share-your-app/indexability
    description:
  - category: Deploy / Streamlit Community Cloud / Share your app / Share previews
    url: /deploy/streamlit-community-cloud/share-your-app/share-previews
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your account
    url: /deploy/streamlit-community-cloud/manage-your-account
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your account / Sign in and sign out
    url: /deploy/streamlit-community-cloud/manage-your-account/sign-in-sign-out
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your account / Workspace settings
    url: /deploy/streamlit-community-cloud/manage-your-account/workspace-settings
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your account / Manage your GitHub connection
    url: /deploy/streamlit-community-cloud/manage-your-account/manage-your-github-connection
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your account / Update your email
    url: /deploy/streamlit-community-cloud/manage-your-account/update-your-email
    description:
  - category: Deploy / Streamlit Community Cloud / Manage your account / Delete your account
    url: /deploy/streamlit-community-cloud/manage-your-account/delete-your-account
    description:
  - category: Deploy / Streamlit Community Cloud / Status and limitations
    url: /deploy/streamlit-community-cloud/status
    description:
  - category: Deploy / Snowflake
    url: /deploy/snowflake
    description:
  - category: Deploy / Other platforms
    url: /deploy/tutorials
    description:
  - category: Deploy / Other platforms / Docker
    url: /deploy/tutorials/docker
    description:
  - category: Deploy / Other platforms / Kubernetes
    url: /deploy/tutorials/kubernetes
    description:

  - category: Knowledge base
    url: /knowledge-base
    description:
    color: darkBlue-70
    icon: school
  - category: Knowledge base / FAQ
    url: /knowledge-base/using-streamlit
    description:
  - category: Knowledge base / FAQ / How do I create an anchor link?
    url: /knowledge-base/using-streamlit/create-anchor-link
    description:
    visible: false
  - category: Knowledge base / FAQ / Enabling camera access in your browser
    url: /knowledge-base/using-streamlit/enable-camera
    description:
    visible: false
  - category: Knowledge base / FAQ / How to download a file in Streamlit?
    url: /knowledge-base/using-streamlit/how-download-file-streamlit
    description:
    visible: false
  - category: Knowledge base / FAQ / How to download a Pandas DataFrame as a CSV?
    url: /knowledge-base/using-streamlit/how-download-pandas-dataframe-csv
    description:
    visible: false
  - category: Knowledge base / FAQ / How do I upgrade to the latest version of Streamlit?
    url: /knowledge-base/using-streamlit/how-upgrade-latest-version-streamlit
    description:
    visible: false
  - category: Knowledge base / FAQ / How to insert elements out of order?
    url: /knowledge-base/using-streamlit/insert-elements-out-of-order
    description:
    visible: false
  - category: Knowledge base / FAQ / How can I make st.pydeck_chart use custom Mapbox styles?
    url: /knowledge-base/using-streamlit/pydeck-chart-custom-mapbox-styles
    description:
    visible: false
  - category: Knowledge base / FAQ / How to remove "· Streamlit" from the app title?
    url: /knowledge-base/using-streamlit/remove-streamlit-app-title
    description:
    visible: false
  - category: Knowledge base / FAQ / How do you retrieve the filename of a file uploaded with st.file_uploader?
    url: /knowledge-base/using-streamlit/retrieve-filename-uploaded
    description:
    visible: false
  - category: Knowledge base / FAQ / Sanity checks
    url: /knowledge-base/using-streamlit/sanity-checks
    description:
    visible: false
  - category: Knowledge base / FAQ / How can I make Streamlit watch for changes in other modules I'm importing in my app?
    url: /knowledge-base/using-streamlit/streamlit-watch-changes-other-modules-importing-app
    description:
    visible: false
  - category: Knowledge base / FAQ / What browsers does Streamlit support?
    url: /knowledge-base/using-streamlit/supported-browsers
    description:
    visible: false
  - category: Knowledge base / FAQ / Where does st.file_uploader store uploaded files and when do they get deleted?
    url: /knowledge-base/using-streamlit/where-file-uploader-store-when-deleted
    description:
    visible: false
  - category: Knowledge base / FAQ / Widget updating for every second input when using session state
    url: /knowledge-base/using-streamlit/widget-updating-session-state
    description:
    visible: false
  - category: Knowledge base / FAQ / Why does Streamlit restrict nested st.columns?
    url: /knowledge-base/using-streamlit/why-streamlit-restrict-nested-columns
    description:
    visible: false
  - category: Knowledge base / FAQ / What is serializable session state?
    url: /knowledge-base/using-streamlit/serializable-session-state
    description:
    visible: false
  - category: Knowledge base / Installing dependencies
    url: /knowledge-base/dependencies
    description:
  - category: Knowledge base / Installing dependencies / How to install a package not on PyPI or Conda but available on GitHub
    url: /knowledge-base/dependencies/install-package-not-pypi-conda-available-github
    description:
    visible: false
  - category: Knowledge base / Installing dependencies / ImportError libGL.so.1 cannot open shared object file No such file or directory
    url: /knowledge-base/dependencies/libgl
    description:
    visible: false
  - category: Knowledge base / Installing dependencies / ModuleNotFoundError No module named
    url: /knowledge-base/dependencies/module-not-found-error
    description:
    visible: false
  - category: Knowledge base / Installing dependencies / ERROR No matching distribution found for
    url: /knowledge-base/dependencies/no-matching-distribution
    description:
    visible: false
  - category: Knowledge base / Deployment issues
    url: /knowledge-base/deploy
    description:
  - category: Knowledge base / Deployment issues / How can I deploy multiple Streamlit apps on different subdomains?
    url: /knowledge-base/deploy/deploy-multiple-streamlit-apps-different-subdomains
    description:
    visible: false
  - category: Knowledge base / Deployment issues / How do I deploy Streamlit on a domain so it appears to run on a regular port (i.e. port 80)?
    url: /knowledge-base/deploy/deploy-streamlit-domain-port-80
    description:
    visible: false
  - category: Knowledge base / Deployment issues / Does Streamlit support the WSGI Protocol? (aka Can I deploy Streamlit with gunicorn?)
    url: /knowledge-base/deploy/does-streamlit-support-wsgi-protocol
    description:
    visible: false
  - category: Knowledge base / Deployment issues / How do I increase the upload limit of st.file_uploader on Streamlit Community Cloud?
    url: /knowledge-base/deploy/increase-file-uploader-limit-streamlit-cloud
    description:
    visible: false
  - category: Knowledge base / Deployment issues / Invoking a Python subprocess in a deployed Streamlit app
    url: /knowledge-base/deploy/invoking-python-subprocess-deployed-streamlit-app
    description:
    visible: false
  - category: Knowledge base / Deployment issues / App is not loading when running remotely
    url: /knowledge-base/deploy/remote-start
    description:
    visible: false
  - category: Knowledge base / Deployment issues / Argh. This app has gone over its resource limits
    url: /knowledge-base/deploy/resource-limits
    description:
    visible: false
  - category: Knowledge base / Deployment issues / How do I share apps with viewers outside my organization?
    url: /knowledge-base/deploy/share-apps-with-viewers-outside-organization
    description:
    visible: false
  - category: Knowledge base / Deployment issues / Upgrade the Streamlit version of your app on Streamlit Community Cloud
    url: /knowledge-base/deploy/upgrade-streamlit-version-on-streamlit-cloud
    description:
    visible: false
  - category: Knowledge base / Deployment issues / Huh. This is isn't supposed to happen message after trying to log in
    url: /knowledge-base/deploy/huh-this-isnt-supposed-to-happen-message-after-trying-to-log-in
    description:
    visible: false
  - category: Knowledge base / Deployment issues / Login attempt to Streamlit Community Cloud fails with error 403
    url: /knowledge-base/deploy/login-attempt-to-streamlit-community-cloud-fails-with-error-403
    description:
    visible: false
  - category: Knowledge base / Deployment issues / How to submit a support case for Streamlit Community Cloud
    url: /knowledge-base/deploy/how-to-submit-a-support-case-for-streamlit-community-cloud
    description:
    visible: false
---
