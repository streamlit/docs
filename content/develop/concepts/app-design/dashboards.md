---
title: Build advanced dashboards
slug: /develop/concepts/design/dashboards
description: Build fast, interactive dashboards in Python with Streamlit. Lazy-loading tables, background cache refresh, partial and parallel reruns, cross-filtering, drill-down, shareable URLs, and responsive grids are built in. Includes a guide to moving and modernizing Power BI and Tableau dashboards in Streamlit.
keywords: dashboards, advanced dashboards, kpi dashboard, business intelligence, BI, BI migration, modernize dashboards, power bi, power bi to python, power bi to streamlit, tableau, tableau to python, tableau to streamlit, looker, sigma, qlik, dax, migrate dashboards, cross-filtering, drill-down, large data, performance, lazy loading, caching, fragments, query parameters, st.grid, st.metric, semantic views, python dashboard
---

# Build advanced dashboards

Streamlit is built and tuned for demanding dashboards: KPI and operating dashboards with drill-down, cross-filtered views over large tables, live monitoring, and the dashboards a whole company relies on. Features that are hard to rebuild correctly in each app are solved once in the framework, and every release makes them faster.

Because a dashboard is plain Python, it can also do what a report can't: run forecasts and models, call AI, and let people write decisions back. The query, the logic, and the number on screen sit side by side, so your data team can review every number.

To see these features together, try the [advanced dashboard demo](https://advanced-dashboard-demo.streamlit.app/):

<Cloud name="advanced-dashboard-demo" height="640px" />

<Tip>

If you build with a coding agent, run [`streamlit skills`](/develop/api-reference/cli/skills) in your project and invoke the `developing-with-streamlit` skill in your request. The bundled skills include dashboard templates and teach your agent the patterns on this page.

</Tip>

## Large data, fast

- **Tables that load as people scroll.** [`st.dataframe`](/develop/api-reference/data/st.dataframe) sends only the rows people are viewing and fetches more as they scroll or sort. Large dataframes load lazily automatically, and the `lazy` parameter lets you choose. Row selections need the full table in the browser, so tables with `on_select` don't load lazily. For very large tables, cross-filter from widgets or charts.
- **Your dataframes, as they are.** Pass a pandas, Polars, PyArrow, Snowpark, PySpark, DuckDB, Dask, or Modin dataframe straight to a table or chart. Tables and charts reach the browser in the columnar Apache Arrow format.
- **Caching with background refresh.** With `refresh_mode="background"`, [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) returns the cached value right away when its `ttl` expires and refreshes it in the background, so people don't wait for the slow query on every expiry. An expired value is served for at most one extra `ttl` by default. Background refresh doesn't support async functions, but foreground caching does.
- **Sections that load in parallel.** With `@st.fragment(parallel=True)`, independent sections of a page run concurrently, so the page finishes in about the time of its slowest query. [`st.skeleton`](/develop/api-reference/status/st.skeleton) shows the layout right away while each section loads.
- **More performance patterns.** For caching, fragments, forms, and other ways to keep an app fast, see [Performance](/develop/concepts/design/performance).

```python
import streamlit as st

@st.cache_data(ttl="15m", refresh_mode="background")
def load_revenue():
    ...  # Slow query

@st.cache_data(ttl="15m", refresh_mode="background")
def load_orders():
    ...  # Another slow query

@st.fragment(parallel=True)
def revenue_card():
    with st.container(border=True):
        st.subheader("Revenue by region")
        with st.skeleton(height=260):
            st.bar_chart(load_revenue(), x="region", y="revenue", alt="Revenue by region")

@st.fragment(parallel=True)
def orders_card():
    with st.container(border=True):
        st.subheader("Recent orders")
        with st.skeleton(height=260):
            st.dataframe(load_orders(), hide_index=True, alt="Recent orders")

left, right = st.columns(2)
with left:
    revenue_card()
with right:
    orders_card()
```

## Fast to use

- **Partial reruns.** When people interact with a widget inside a [fragment](/develop/concepts/architecture/fragments), only that fragment reruns. A widget callback can also rerun one named fragment.
- **Apply several filters at once.** With `on_change="ignore"`, a widget updates in the browser without rerunning the app, so people can adjust several filters and apply them with one button. Your script receives the values on that rerun. Use [`st.form`](/develop/api-reference/execution-flow/st.form) to batch several inputs into one rerun. Either way, heavy queries run once.
- **Live data.** Use `@st.fragment(run_every="30s")` to refresh one section of a page on a schedule, without rerunning the rest.

## Rich interactions

- **Cross-filtering and drill-down.** Select rows in [`st.dataframe`](/develop/api-reference/data/st.dataframe), or points in [`st.altair_chart`](/develop/api-reference/charts/st.altair_chart), [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart), [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart), and other charts, with `on_select="rerun"`. Your script receives the selection and filters the rest of the page.
- **Details on demand.** Add a [`ButtonColumn`](/develop/api-reference/data/st.column_config/st.column_config.buttoncolumn) to a table, and open a row's details in a [dialog](/develop/api-reference/execution-flow/st.dialog), or in a full-height side drawer with `position="right"`.
- **Views that can be shared.** With `bind="query-params"`, a widget's value lives in the page URL, so every filtered view can be bookmarked and shared.

```python
import streamlit as st

@st.cache_data(ttl="15m")
def load_orders(region):
    ...  # Query the orders for a region

@st.dialog("Order details", position="right")
def show_order(order):
    st.write(order)

region = st.sidebar.selectbox(
    "Region", ["All", "Americas", "EMEA", "APAC"], key="region", bind="query-params"
)
orders = load_orders(region)

st.dataframe(
    orders.assign(details=":material/open_in_new: Details"),
    column_config={
        "details": st.column_config.ButtonColumn("", type="tertiary", key="details_click"),
    },
    hide_index=True,
)

if click := st.session_state.details_click:
    show_order(orders.iloc[click.row])
```

A button click is only set for the rerun it triggers, so the drawer opens once per click and doesn't reopen on later reruns. Use selections for state that should persist, such as cross-filtering, and button columns for one-off actions, such as opening details.

## Layout and polish

- **Responsive grids.** [`st.grid`](/develop/api-reference/layout/st.grid) lays out metric cards and dashboard panels that reflow with the available width.
- **KPI cards.** [`st.metric`](/develop/api-reference/data/st.metric) shows a value, a delta, and an optional sparkline, with a border for a card look.
- **Navigation and actions.** Use [tabs](/develop/api-reference/layout/st.tabs), [pagination](/develop/api-reference/widgets/st.pagination), and [multipage navigation](/develop/concepts/multipage-apps) for larger dashboards, and [`st.menu_button`](/develop/api-reference/widgets/st.menu_button) for a short list of actions.
- **Native charts for nearly every visual.** Line, bar, area, and scatter charts, treemaps, sankey and funnel charts, gauges, heatmaps, candlestick charts, network graphs, maps, and diagrams render natively with Vega-Lite, ECharts, Plotly, and deck.gl, styled by your theme. Vega-Lite and ECharts charts switch to faster rendering on their own as the data grows. To choose a command, see [Choosing and using charts](/develop/concepts/design/charts). Tables can show in-cell sparklines, bar charts, and progress bars. For the full list, see [chart elements](/develop/api-reference/charts).
- **Your brand everywhere.** [Theme](/develop/concepts/configuration/theming) Streamlit with your colors, fonts, chart palettes, and spacing, and share that theme across all your dashboards.

```python
import streamlit as st

grid = st.grid(2)
grid.metric("Revenue", "$1.2M", "+8%", border=True)
grid.metric("Pipeline", "$4.8M", "+12%", border=True)
grid.metric("Conversion", "12.4%", "+1.1%", border=True)
grid.metric("Retention", "96%", "-0.4%", border=True)
```

## Dashboards that agents can use

Turn on the [agent API](/develop/concepts/ai-agents/agent-access), and an AI assistant can set your dashboard's filters and read its metrics, tables, and charts through the dashboard's own logic, instead of guessing at the warehouse schema. Agents use the same caches and partial reruns as people, so they get the same numbers people see. Agents set widgets such as select boxes, date inputs, and sliders; they can't make chart or table selections or click buttons in table cells yet, so keep every filter an agent needs available as a widget.

## Coming from a BI tool?

For the dashboards your teams rely on in Power BI, Tableau, Looker, Sigma, or Qlik, move them to Streamlit and modernize them on the way. Together with Snowflake, Streamlit covers much of what teams use a BI tool for: governed data and metrics, Snowflake's access controls, interactive filtering and drill-down, live refresh, and sharing and embedding. A move is a modernization, not a one-to-one copy.

On top of that, a Streamlit dashboard can hold what a BI tool can't: forecasts and models in Python, editable tables and [writeback](/develop/concepts/design/writeback), AI features, and [access for AI agents](/develop/concepts/ai-agents/agent-access). It's Python code in your repository, so changes go through pull requests, review, and tests, and coding agents can make them from a request in plain words.

### Map Power BI and Tableau concepts to Streamlit

| Power BI                               | Tableau                                       | Streamlit                                                                                                                                                                                                                                        |
| -------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Slicers and filters                    | Filters and parameters                        | Widgets such as [`st.selectbox`](/develop/api-reference/widgets/st.selectbox), [`st.multiselect`](/develop/api-reference/widgets/st.multiselect), [`st.date_input`](/develop/api-reference/widgets/st.date_input), and `st.slider`               |
| DAX measures and calculated columns    | Calculated fields and LOD expressions         | Python or SQL functions, cached with [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data)                                                                                                                                   |
| Power Query transformations            | Data source transformations                   | Python or SQL in cached loader functions                                                                                                                                                                                                         |
| Semantic model                         | Published data sources                        | Snowflake semantic views, queried with SQL through [`st.connection("snowflake")`](/develop/api-reference/connections/st.connections.snowflakeconnection), or a shared Python module with your metric definitions                                 |
| Report pages                           | Dashboards, sheets, and stories               | Pages with [`st.navigation`](/develop/api-reference/navigation/st.navigation), and [`st.tabs`](/develop/api-reference/layout/st.tabs)                                                                                                            |
| Cards and KPI visuals                  | KPI tiles                                     | [`st.metric`](/develop/api-reference/data/st.metric) with optional sparklines, laid out with [`st.grid`](/develop/api-reference/layout/st.grid)                                                                                                  |
| Visuals                                | Worksheets                                    | Native charts and maps, such as [`st.altair_chart`](/develop/api-reference/charts/st.altair_chart), [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart), and [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart) |
| Table and matrix visuals               | Text tables                                   | [`st.dataframe`](/develop/api-reference/data/st.dataframe) with [column configuration](/develop/api-reference/data/st.column_config)                                                                                                             |
| Cross-filtering and cross-highlighting | Filter and highlight actions                  | Chart and table selections with `on_select="rerun"`                                                                                                                                                                                              |
| Drillthrough                           | Go to sheet and URL actions                   | Button columns that open a [dialog](/develop/api-reference/execution-flow/st.dialog) or side drawer, or links to another [page](/develop/concepts/multipage-apps) with query parameters                                                          |
| Bookmarks                              | Custom views                                  | Widgets with `bind="query-params"`, so every view has a shareable URL                                                                                                                                                                            |
| Scheduled refresh                      | Extract refresh schedules                     | A cache `ttl`, with `refresh_mode="background"`                                                                                                                                                                                                  |
| Automatic page refresh                 | Live connections                              | Queries that run on each rerun, or `@st.fragment(run_every=...)` to refresh a section on a schedule                                                                                                                                              |
| Row-level security                     | User filters and row-level security           | Snowflake's access controls with [caller's rights](/develop/api-reference/connections/st.connections.snowflakeconnection), or logic based on [`st.user`](/develop/api-reference/user/st.user)                                                    |
| Report themes                          | Workbook formatting                           | A shared [theme](/develop/concepts/configuration/theming) in `.streamlit/config.toml`                                                                                                                                                            |
| Export data                            | Download data                                 | The built-in CSV export of `st.dataframe` for tables that are sent to the browser in full, or [`st.download_button`](/develop/api-reference/widgets/st.download_button)                                                                          |
| Publishing to workspaces               | Publishing to Tableau Server or Tableau Cloud | [Deployment](/deploy) on Snowflake, your own cloud, or Community Cloud, with [`st.login`](/develop/api-reference/user/st.login) for sign-in                                                                                                      |
| Limited data entry                     | Limited data entry                            | [`st.data_editor`](/develop/api-reference/data/st.data_editor) and [`st.form`](/develop/api-reference/execution-flow/st.form), with [writeback](/develop/concepts/design/writeback) to your database                                             |
| Natural-language questions             | Natural-language questions                    | Any MCP client, such as Claude or ChatGPT, through the [agent API](/develop/concepts/ai-agents/agent-access)                                                                                                                                     |

Looker, Sigma, and Qlik use similar concepts: filters become widgets, measures and calculations become cached Python or SQL functions, and governed models map to Snowflake semantic views or shared Python modules.

### Modernize, step by step

1. **Triage.** List the dashboards people depend on every week, and the reports nobody opens. Move the ones that matter, and leave one-off questions to chat.
2. **Rebuild on governed metrics.** Build each dashboard on the same governed data and metric definitions as the original, such as Snowflake semantic views, so the numbers match the rest of the business.
3. **Check the numbers.** Compare every figure against the original before you switch people over, and keep those checks as [`AppTest`](/develop/concepts/app-testing) tests.
4. **Add what the BI tool couldn't hold.** Add forecasts, models, writeback, AI, and access for agents where they help people decide and act.
5. **Retire the old report.** Turn off the original once its viewers have signed off on the new dashboard.

### Rebuild a dashboard with a coding agent

Streamlit itself doesn't convert BI reports. A coding agent rebuilds each dashboard as plain Python, and your data team reviews it. On Snowflake, CoCo has [bundled skills](https://docs.snowflake.com/en/user-guide/cortex-code/bundled-skills) for this:

- `tableau-to-streamlit-in-snowflake` converts a Tableau workbook or data source file (`.twb`, `.twbx`, `.tds`, or `.tdsx`) into a [Streamlit in Snowflake](https://www.snowflake.com/en/product/features/streamlit-in-snowflake/) app. It translates the workbook's calculations into Snowflake SQL, and maps its filters, parameters, and actions to widgets and chart selections.
- `agent-studio` creates Snowflake semantic views from Tableau or Power BI files, so the rebuilt dashboard can use governed metrics.

With any coding agent, including Claude Code, Cursor, Codex, and CoCo, give the agent what defines the original:

- **Screenshots** of each page, so the agent can match the layout and visuals.
- **Metric definitions.** In Power BI, save the report as a Power BI Project (`.pbip`), which stores the report and semantic model, including DAX measures, as text files. In Tableau, use the workbook (`.twb`), which is an XML file that includes calculated fields and filters. A packaged workbook (`.twbx`) is a zip archive that contains the `.twb`.
- **The data.** The tables, views, or SQL behind each visual, and connection details in [`secrets.toml`](/develop/concepts/connections/secrets-management).
- **Expected values.** A few figures from the original, such as last quarter's totals per region, to check the rebuild against.

Then run [`streamlit skills`](/develop/api-reference/cli/skills) in your project and invoke the skill. For example, in Claude Code:

```text
/developing-with-streamlit Rebuild the "Sales overview" Power BI report as a Streamlit dashboard. The screenshots and the .pbip project are in ./powerbi. Translate the DAX measures to SQL on the same Snowflake tables, keep the slicers as sidebar filters bound to the URL, and add AppTest tests that compare each KPI with the values in ./powerbi/expected.csv.
```

Review the result like any other code: the query, the calculation, and the number on screen sit side by side, so your data team can check every metric.

### When to keep a BI tool

A BI tool still fits drag-and-drop self-service exploration by people who don't want code, and pixel-precise paginated reports. Many teams run both: Streamlit for the dashboards that compute and act, and a BI tool for ad hoc exploration.
