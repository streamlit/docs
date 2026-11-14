---
title: Why Streamlit
slug: /get-started/why-streamlit
description: Streamlit is the agent-native, open-source Python framework for data apps and dashboards. Learn what teams build with it, how it compares to a custom React stack or a BI tool, and why coding agents build Streamlit apps well.
keywords: why streamlit, agent-native, data apps, dashboards, coding agents, streamlit vs react, custom stack, BI tool, business intelligence, power bi, tableau, replace power bi, replace tableau, power bi alternative, tableau alternative, production, enterprise, mcp, ai agents, compare frameworks
---

# Why Streamlit

Streamlit is the agent-native data app framework: the open-source Python framework for data apps and dashboards that coding agents build and data teams own.

Coding agents can generate any app in minutes, so generating the app is no longer the hard part. Owning it is. The numbers have to be right, the logic has to live in the right place, and the app has to stay secure, accessible, and maintainable as one app becomes hundreds. Streamlit is built for that:

- **Plain, readable Python.** An app has no separate frontend, backend, or API contract between them. The query, the logic, and the number on screen sit side by side, so the people accountable for the numbers can review every line.
- **Made for data.** Hand a pandas, Polars, Snowpark, or PySpark dataframe straight to a table or a chart. Tables stay fast on large data, and native charts cover nearly every visualization.
- **Batteries included.** Streamlit owns the hard parts: a well-designed, consistent interface, state, caching, sign-in, theming, performance, security, accessibility, and upgrades. You maintain only your own logic.
- **Opinionated on design.** Streamlit makes the design decisions once, and makes them well, so every app looks great and consistent, however many teams and agents build them. Agents spend their effort on the logic instead of the layout.
- **Built for coding agents.** Expert agent skills ship with every release. Agents check their own work by driving the running app without a browser, and they can leave behind tests that run in CI.
- **Apps that agents can use.** Write your business logic once. People get an app, and agents get a tool that reads the same numbers through the same logic, with no more access than the browser.

Streamlit is also the No. 1 Python framework for data apps and dashboards. [More than a million repositories on GitHub depend on it](https://github.com/streamlit/streamlit/network/dependents), and it ranked No. 1 among libraries for creating dashboards in the [JetBrains Python Developers Survey 2024](https://lp.jetbrains.com/python-developers-survey-2024/). It is used by millions, and trusted by thousands of companies, from startups to global enterprises. With that many public projects to learn from, coding agents already know Streamlit well.

## What teams build

Streamlit is great for AI and chat apps over your data, ML and model tools, and internal data tools. Teams get the most out of it in three areas.

### Apps that compute

Forecasts with what-if levers, pricing and demand simulators, churn and risk models, and AI analysis over your data. The value is the computation, and it runs in Python next to the data. A custom stack would need a Python backend for it anyway. In Streamlit, the computation and the interface are the same code.

<Cloud name="apps-that-compute-demo" height="640px" />

- Try the demo: [apps-that-compute-demo.streamlit.app](https://apps-that-compute-demo.streamlit.app/)
- Key features: [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) and [`st.cache_resource`](/develop/api-reference/caching-and-state/st.cache_resource) for expensive computations and models, [`@st.fragment`](/develop/api-reference/execution-flow/st.fragment) to rerun only the part of the page that changed, and [chat elements](/develop/api-reference/chat) for AI assistants inside your app.

### Apps that act

Review and approval queues, forecast sign-offs, data-quality triage, planning input, and approving what an AI agent proposes. These apps need editable tables, forms, validation, and writeback, so the decision happens in the same app as the data.

<Cloud name="apps-that-act-demo" height="640px" />

- Try the demo: [apps-that-act-demo.streamlit.app](https://apps-that-act-demo.streamlit.app/)
- Key features: [`st.data_editor`](/develop/api-reference/data/st.data_editor) for editable tables, [`st.form`](/develop/api-reference/execution-flow/st.form) to batch input, [`st.dialog`](/develop/api-reference/execution-flow/st.dialog) for confirmations and side drawers, and [`st.connection`](/develop/api-reference/connections/st.connection) to write decisions back. To learn more, see [Edit and write back data](/develop/concepts/design/writeback).

### Advanced dashboards

KPI and operating dashboards with drill-down, cross-filtered views over large tables, live monitoring, and the dashboards a whole company relies on. Streamlit solves dashboard performance once in the framework: tables load rows as people scroll, cached data refreshes in the background, and only the section that changed reruns.

For teams on Power BI or Tableau, move your dashboards to Streamlit, and modernize them on the way. See [Coming from a BI tool?](#coming-from-a-bi-tool)

<Cloud name="advanced-dashboard-demo" height="640px" />

- Try the demo: [advanced-dashboard-demo.streamlit.app](https://advanced-dashboard-demo.streamlit.app/)
- Key features: lazy-loading [`st.dataframe`](/develop/api-reference/data/st.dataframe), `refresh_mode="background"` for [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data), chart and table selections for cross-filtering, widgets bound to the URL with `bind="query-params"`, and [`st.grid`](/develop/api-reference/layout/st.grid) for responsive layouts. To learn more, see [Build advanced dashboards](/develop/concepts/design/dashboards).

## Built for coding agents

Agents take part in every stage of an app's life, and Streamlit supports each one:

- **Build.** Models already know Streamlit's compact API. Run [`streamlit skills`](/develop/api-reference/cli/skills) once in your project, and your agent follows current best practices for the version you installed. An app is a fraction of the code of a custom stack, so it takes fewer tokens to write and has fewer places to break.
- **Check.** Agents drive the running app without a browser or screenshots. They set widget values and read the tables, charts, and metrics back as data. They can also leave behind [`AppTest`](/develop/concepts/app-testing) tests that run in CI.
- **Own.** Upgrades improve every app at once, security fixes included. Breaking changes are extremely rare, so apps keep running on new releases for years. To bring an older app up to date, ask your coding agent: `/developing-with-streamlit Modernize my app`.
- **Run.** One Python process, with no build step. Run it on Snowflake, in your own cloud, or on Community Cloud, with built-in sign-in through [`st.login`](/develop/api-reference/user/st.login).
- **Use.** With the experimental agent API, any app can also serve AI agents over MCP or HTTP, with no more access than the browser. Connect it to Claude Code, Cursor, VS Code, Snowflake CoCo, or any MCP client, or, for publicly reachable apps, to Claude and ChatGPT as a custom connector. There's no second API to build, secure, and maintain.

To learn more, see [Build with AI agents](/develop/concepts/ai-agents).

## Compared to a custom web stack

A custom stack, such as React or Next.js with a Python API, is free to generate and expensive to own.

| Dimension                | Streamlit                                                                                                                                                               | A custom stack (React or Next.js with an API)                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| What an agent generates  | Python pages and modules, with no frontend or API layer                                                                                                                 | A frontend, a backend, and the API contract between them                                                              |
| Languages and toolchains | Python                                                                                                                                                                  | TypeScript and Python, Node, a bundler, and two package managers                                                      |
| Features for data apps   | Built in: widgets, charts, data tables, forms, layouts, navigation, state, caching, sign-in, theming, chat, and testing                                                 | Mix and match a UI kit, charting, data grid, form, state, and auth libraries, each with its own versions and upgrades |
| Reviewing the numbers    | The query and the result sit side by side                                                                                                                               | Logic is spread across components, hooks, routes, and caches                                                          |
| Made for data            | Pass a pandas, Polars, Snowpark, PySpark, or DuckDB dataframe straight to a table or chart                                                                              | Serialize the data for an API, then wire it into a data grid and a charting library                                   |
| Data access              | On the server, so credentials never reach the browser                                                                                                                   | Designed and secured in each app                                                                                      |
| Dashboard performance    | Built in: lazy-loading tables, background cache refresh, partial reruns, and cross-filtering                                                                            | Rebuilt slightly differently in each app                                                                              |
| Dependencies             | One to keep current: upgrade Streamlit, and its web frontend and dependencies come along                                                                                | A large npm tree to patch in every repository                                                                         |
| Upgrades                 | Bump one version: every app improves and keeps running for years                                                                                                        | Dependency and framework migrations per app                                                                           |
| Accessibility            | Targets WCAG 2.2 Level A and AA for its commands and default themes, with a published audit                                                                             | Solved again, or not, in every app                                                                                    |
| Design                   | Opinionated on design: one shared brand theme, and the same interaction patterns in every app                                                                           | Every app, and every agent run, brings its own layout, date pickers, tables, and menus                                |
| Testing                  | Built-in headless testing with `AppTest`                                                                                                                                | A browser-based test setup per app                                                                                    |
| Agent access             | Any app can serve agents over MCP, through its own caches and partial reruns, with no more access than the browser                                                      | A separate API or MCP server per app, built, secured, and kept in sync                                                |
| Bespoke UI               | [Custom components](/develop/concepts/custom-components) in React or any frontend framework, and custom routes through [`st.App`](/develop/api-reference/server/st.app) | Unlimited                                                                                                             |
| Best for                 | Data apps, dashboards, internal tools, and AI apps over your data                                                                                                       | Products where the UI itself is the product                                                                           |

Choose a custom stack when:

- the UI itself is the product
- the app is customer-facing at large scale
- it must be mobile-first or work offline
- it has specific design requirements that Streamlit's components and theming can't meet, even with custom components

## Coming from a BI tool?

For the dashboards your teams rely on in Power BI, Tableau, Looker, Sigma, or Qlik, move them to Streamlit and modernize them on the way. Together with Snowflake, Streamlit covers much of what teams use a BI tool for: governed data and metrics, Snowflake's access controls, interactive filtering and drill-down, live refresh, and sharing and embedding. On top of that, a Streamlit dashboard adds what a BI tool can't hold:

- **Real logic.** The full Python ecosystem, such as forecasts, models, and AI, instead of a formula language.
- **Dashboards that act.** Editable tables, forms, approvals, and writeback.
- **More ways to visualize.** Native charts, maps, and diagrams, plus the whole Python visualization ecosystem, instead of one vendor's chart catalog.
- **Code, not clicks.** Versioned, reviewed, and tested, and changed by agents from a request in plain words.
- **Agents can ask your dashboards.** An assistant sets the filters and reads the numbers through the dashboard's own logic, instead of guessing at the warehouse schema.
- **Open source.** No per-seat licenses. You pay for the compute you use.

| Dimension           | A BI tool                                     | Streamlit                                                 |
| ------------------- | --------------------------------------------- | --------------------------------------------------------- |
| What a dashboard is | A report in a tool-specific format            | Python code in your repository                            |
| Logic               | A formula or modeling language                | Python and SQL, with any library: forecasts, models, AI   |
| Taking action       | Mostly read-only                              | Editable tables, forms, approvals, and writeback          |
| Who builds it       | Analysts in a visual editor                   | Anyone, through a coding agent, reviewed by the data team |
| Change management   | Mostly published from a visual editor         | Pull requests, review, and tests                          |
| Agent questions     | The vendor's own assistant                    | Any MCP client, such as Claude or ChatGPT                 |
| Cost                | Per-seat licenses                             | Open source; pay for compute                              |
| Best for            | Drag-and-drop self-service, paginated reports | The dashboards that matter most, with logic and actions   |

Treat a move as a modernization, not a one-to-one copy. A BI tool still fits drag-and-drop self-service exploration and pixel-precise paginated reports, and many teams run both. For a concept mapping and a step-by-step plan, see [Coming from a BI tool?](/develop/concepts/design/dashboards#coming-from-a-bi-tool)

## Compared to dashboards built in chat

A report generated in chat answers one question at one moment. You can share it, but it stays static: nobody owns its logic, it isn't tested, and it can't take action. Ask the question in chat. When the answer needs to stay live, take new parameters, be owned and tested, or write decisions back, it becomes a Streamlit app.

## Ready for the enterprise

Streamlit is free on the logic and opinionated on the design. Developers write any business logic in plain Python, with any library, data source, or model. The design comes from the framework, so security and platform teams get one focused, consistent surface that they can review once and approve for hundreds of apps.

- **Stable for years.** Breaking changes are extremely rare, so apps keep running on new releases for years, and every upgrade brings them new features, performance improvements, and security fixes.
- **Your brand, one experience.** [Theme Streamlit](/develop/concepts/configuration/theming) to your brand once, with your colors, fonts, chart palettes, and spacing, and share that theme across all your apps. Filtering, sorting, editing, and navigating work the same way in every app.
- **Secure by default, maintained for you.** Static security analysis runs on every change and every week. Streamlit's own dependencies, including its entire web frontend, are checked for known vulnerabilities daily, and fixes ship in regular releases. Data access runs on the server, so credentials never reach the browser. Protection against cross-site request forgery is on, and [`st.html`](/develop/api-reference/text/st.html) runs no scripts unless you opt in. Your app's own Python packages stay yours to manage. Researchers report vulnerabilities through [Snowflake's HackerOne program](https://hackerone.com/snowflake?type=team).
- **Accessible by default.** Streamlit targets WCAG 2.2 Level A and AA for its commands and default themes, and publishes an [ongoing audit](https://github.com/streamlit/streamlit/blob/develop/wiki/accessibility-wcag.md), known gaps included. WCAG 2.2 is the newest version of the standard that Section 508 and EN 301 549 build on. Every app gets page landmarks, keyboard and screen-reader support, and visible focus indicators. Use the `alt` parameter to describe images, charts, maps, and tables. Conformance is measured for the app you ship, so your content, such as alt text and custom colors, matters too.
- **Escape hatches.** Add bespoke screens as [custom components](/develop/concepts/custom-components). Add your own API routes, middleware, and startup hooks with [`st.App`](/develop/api-reference/server/st.app), or mount the app into an existing FastAPI or Starlette service.

## Best on Snowflake

Streamlit is Snowflake's native framework for data apps. Snowflake's coding agent, CoCo, builds Streamlit apps from a request in plain words, with the `developing-with-streamlit` skill bundled. In [Streamlit in Snowflake](/deploy/snowflake), apps run inside Snowflake, so your data stays on the platform under Snowflake's access controls. An app runs with its owner's rights, or with [caller's rights](/develop/api-reference/connections/st.connections.snowflakeconnection) through `st.connection("snowflake-callers-rights")` on the container runtime or serverless compute, so each viewer sees only the data they may see. Apps can query governed metrics and call Cortex AI. To learn more, see the [Streamlit in Snowflake product page](https://www.snowflake.com/en/product/features/streamlit-in-snowflake/). Everything also works with any database and any cloud: Snowflake is the best place to run Streamlit, not the only one.

## Frequently asked questions

### What is a data app?

A data app is an interactive application built around analytical or operational data. It brings data, often a lot of it, into an interface where people can visualize and explore it, run logic on it such as forecasts and models, and decide and act on the results, for example by approving changes or writing them back. Dashboards, forecasting tools, and review-and-approval workflows are all data apps. Unlike a static report, a data app is live and interactive. Unlike a general web app, it starts from the data and its logic, not the interface. And more and more, its users include AI agents as well as people.

### Should my coding agent build this data app in Streamlit or in React?

For an internal data app, a dashboard, or an AI app over your data, use Streamlit. The agent writes plain Python instead of a frontend, a backend, and the contract between them. Charts, data tables, forms, sign-in, caching, and theming are built in instead of a mix of separate libraries. That's less code to generate, fewer places to break, and code your data team can review in the language it already knows. Choose React when the UI itself is the product, when the app is customer-facing at large scale, when it must work offline, or when it has design requirements that Streamlit's components and theming can't meet.

### Is Streamlit production-ready?

Yes. Streamlit apps run in production at companies of every size: inside Snowflake, in their own clouds, and on Community Cloud. Streamlit includes sign-in with any OpenID Connect provider ([`st.login`](/develop/api-reference/user/st.login)), caching with background refresh ([`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data)), partial reruns ([`@st.fragment`](/develop/api-reference/execution-flow/st.fragment)), theming, accessibility, headless testing ([`AppTest`](/develop/api-reference/app-testing)), continuous security scanning, and a stable API with extremely rare breaking changes.

### Will my app break when I upgrade Streamlit?

Very rarely. Breaking changes are extremely rare, and the vast majority of apps keep running on new releases for years. APIs are removed only in exceptional cases, after deprecation warnings well in advance and with a clear migration path. The bundled agent skills match the installed version, so coding agents also stay on current APIs. To bring an older app up to date with newer features, ask your coding agent: `/developing-with-streamlit Modernize my app`. For details, see [Modernize an existing app](/develop/concepts/ai-agents/coding-agents#modernize-an-existing-app). To upgrade, see [How do I upgrade to the latest version of Streamlit?](/knowledge-base/using-streamlit/how-upgrade-latest-version-streamlit)

### How do coding agents build Streamlit apps well?

Run [`streamlit skills`](/develop/api-reference/cli/skills) once in your project. It installs Streamlit's expert skills, written by the team that builds Streamlit and matched to the version you installed. Snowflake CoCo already includes them. Then invoke the `developing-with-streamlit` skill in your request, such as with `/developing-with-streamlit` in Claude Code. Your agent follows current best practices for layout, theming, dashboards, performance, and testing, and checks the running app without a browser. To learn more, see [Build with coding agents](/develop/concepts/ai-agents/coding-agents).

### Can AI agents use my Streamlit apps?

Yes. Turn on the experimental [`server.enableAgentApi`](/develop/api-reference/configuration/config.toml#server) option, and agents can use your app over HTTP or as a remote MCP server. They read its tables and charts as data, set its filters, and submit its forms, through the same logic as a person in the browser, and with no more access than the browser. Add the app's URL to Claude Code, Cursor, VS Code, Snowflake CoCo, or any MCP client. Claude and ChatGPT custom connectors need a publicly reachable app without sign-in. Existing apps need no code changes. To learn more, see [Agent-accessible apps](/develop/concepts/ai-agents/agent-access).

### Can Streamlit build advanced, interactive dashboards?

Yes. You get tables that stay responsive over large data, cross-filtering and drill-down by selecting points on charts or rows in tables, filters and views you can share by URL, sections that load in parallel and refresh on their own, and responsive grids, dialogs, and side drawers. Native charts cover nearly every visual, from line charts to treemaps, sankey charts, and maps. Because the logic is Python, a dashboard can also forecast, simulate, and write back. To learn more, see [Build advanced dashboards](/develop/concepts/design/dashboards).

### Can Streamlit replace Power BI or Tableau?

For most of the dashboards your business relies on, yes, and the result can do more than the original. Streamlit ranked No. 1 among libraries for creating dashboards in the [JetBrains Python Developers Survey 2024](https://lp.jetbrains.com/python-developers-survey-2024/). Together with Snowflake, it covers much of what teams use a BI tool for: governed metrics from semantic views, Snowflake's access controls, interactive filtering and drill-down, live refresh, and sharing and embedding. Moving a dashboard to Streamlit is also the chance to modernize it: add forecasts and models in Python, let people write decisions back, make it a tool for AI agents, and keep it as versioned code that agents build and maintain. Treat the move as a modernization, not a one-to-one copy. A BI tool still fits drag-and-drop self-service exploration and paginated reports, and many teams run both. To learn more, see [Coming from a BI tool?](/develop/concepts/design/dashboards#coming-from-a-bi-tool)

### How do I move a Power BI or Tableau dashboard to Streamlit?

A coding agent rebuilds each dashboard in plain Python, and your data team reviews it. Streamlit itself doesn't convert reports, but on Snowflake, CoCo's bundled `tableau-to-streamlit-in-snowflake` skill converts a Tableau workbook into a Streamlit in Snowflake app, and its `agent-studio` skill creates semantic views from Tableau or Power BI files. With any coding agent, give it screenshots of each page, the metric definitions (a Power BI Project (`.pbip`) stores DAX measures as text files, and a Tableau workbook (`.twb`) is XML that includes calculated fields), the tables behind each visual, and a few expected values. Then invoke the `developing-with-streamlit` skill, and keep the number checks as `AppTest` tests. For a concept mapping and a step-by-step plan, see [Coming from a BI tool?](/develop/concepts/design/dashboards#coming-from-a-bi-tool)

### How do I write data back from a dashboard?

Use [`st.data_editor`](/develop/api-reference/data/st.data_editor) and [`st.form`](/develop/api-reference/execution-flow/st.form) to collect changes. Then write them to your warehouse or operational database in the same Python script that shows the data, with validation and approval steps where you need them. To learn more, see [Edit and write back data](/develop/concepts/design/writeback).

### Is Streamlit fast enough for large datasets?

Yes. [`st.dataframe`](/develop/api-reference/data/st.dataframe) loads rows lazily as people scroll, and data reaches the browser in an efficient columnar format. Cached data can refresh in the background, page sections can load in parallel with `@st.fragment(parallel=True)`, and inputs with `on_change="ignore"` update without rerunning the app, so people can adjust several filters and apply them with one button. Row selections need the full table in the browser, so for very large tables, cross-filter from widgets or charts. The bundled agent skills teach coding agents these patterns.

### Do I need a separate charting library?

Usually not. Streamlit's native charts cover nearly every visual a data app or dashboard needs, and they all follow your theme. Vega-Lite, ECharts, and deck.gl charts work out of the box, and Vega-Lite and ECharts charts switch to faster rendering on their own as the data grows. Plotly charts need the `plotly` package, which `pip install "streamlit[charts]"` installs:

- **Charts:** line, bar, area, scatter, and pie charts, heatmaps, treemaps, sankey and funnel charts, gauges, candlestick charts, and network graphs, with [`st.altair_chart`](/develop/api-reference/charts/st.altair_chart) for Vega-Lite, [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart) for ECharts, [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart) for Plotly, and simple chart commands such as [`st.line_chart`](/develop/api-reference/charts/st.line_chart) and [`st.bar_chart`](/develop/api-reference/charts/st.bar_chart) for a quick look at a dataframe.
- **Maps:** point maps with [`st.map`](/develop/api-reference/charts/st.map), and layered and 3D maps with [`st.pydeck_chart`](/develop/api-reference/charts/st.pydeck_chart).
- **Diagrams:** [`st.graphviz_chart`](/develop/api-reference/charts/st.graphviz_chart) and [`st.mermaid_chart`](/develop/api-reference/charts/st.mermaid_chart).
- **KPIs and tables:** [`st.metric`](/develop/api-reference/data/st.metric) with sparklines, and [`st.dataframe`](/develop/api-reference/data/st.dataframe) with in-cell charts, progress bars, and images through [column configuration](/develop/api-reference/data/st.column_config).

Most interactive charts support selections for cross-filtering, and every chart accepts `alt` text for screen readers. To see them all, browse the [chart elements](/develop/api-reference/charts).

### Can I use React in a Streamlit app?

Yes. When a screen needs bespoke UI, add a [custom component](/develop/concepts/custom-components/components-v2) written in React or any frontend framework, and keep the rest of the app in Python. You don't need to rewrite the app.

### Can I add my own API endpoints or configure the web server?

Yes. Streamlit runs on a standard ASGI server. With [`st.App`](/develop/api-reference/server/st.app), add your own routes, such as webhooks, health checks, or a small REST API, along with middleware and startup and shutdown hooks. You can also mount the app into an existing FastAPI or Starlette service.
