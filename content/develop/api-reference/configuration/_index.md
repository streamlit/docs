---
title: Configuration
slug: /develop/api-reference/configuration
description: Configure Streamlit apps with config.toml files, page settings, and runtime configuration management for customized app behavior and appearance.
keywords: configuration, config, config.toml, set_page_config, get_option, set_option, settings, theme, page config
---

# Configuration

<TileContainer>
<RefCard href="/develop/api-reference/configuration/config.toml">

<h4>Configuration file</h4>

Configures the default settings for your app.

```
your-project/
├── .streamlit/
│   └── config.toml
└── your_app.py
```

</RefCard>
<RefCard href="/develop/api-reference/configuration/st.get_option">

<h4>Get config option</h4>

Retrieve a single configuration option.

```python
st.get_option("theme.primaryColor")
```

</RefCard>
<RefCard href="/develop/api-reference/configuration/st.set_option">

<h4>Set config option</h4>

Set a single configuration option. (This is very limited.)

```python
st.set_option("deprecation.showPyplotGlobalUse", False)
```

</RefCard>
<RefCard href="/develop/api-reference/configuration/st.set_page_config">

<h4>Set page title, favicon, and more</h4>

Configures the default settings of the page.

```python
st.set_page_config(
  page_title="My app",
  page_icon=":shark:",
)
```

</RefCard>
</TileContainer>
