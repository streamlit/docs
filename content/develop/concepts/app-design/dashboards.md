---
title: Build advanced dashboards
slug: /develop/concepts/design/dashboards
description: Build fast, interactive dashboards in Python with Streamlit. Lazy-loading tables, background cache refresh, partial and parallel reruns, cross-filtering, drill-down, shareable URLs, and responsive grids are built in. Includes a guide to moving BI dashboards to Streamlit.
keywords: dashboards, advanced dashboards, kpi dashboard, business intelligence, BI, BI migration, modernize dashboards, cross-filtering, drill-down, large data, performance, lazy loading, caching, fragments, query parameters, st.grid, st.metric, semantic views, python dashboard
---

# Build advanced dashboards

Streamlit is built and tuned for demanding dashboards: KPI and operating dashboards with drill-down, cross-filtered views over large tables, live monitoring, and the dashboards a whole company relies on. Features that are hard to rebuild correctly in each app are solved once in the framework, and every release makes them faster.

Because a dashboard is plain Python, it can also do what a report can't: run forecasts and models, call AI, and let people write decisions back. The query, the logic, and the number on screen sit side by side, so your data team can review every number.

To see these features together, try the [advanced dashboard demo](https://advanced-dashboard-demo.streamlit.app/).

<Tip>

If you build with a coding agent, run [`streamlit skills`](/develop/api-reference/cli/skills) in your project and mention Streamlit in your request. The bundled skills include dashboard templates and teach your agent the patterns on this page.

</Tip>

## Large data, fast

- **Tables that load as people scroll.** [`st.dataframe`](/develop/api-reference/data/st.dataframe) sends only the rows people are viewing and fetches more as they scroll or sort. Large dataframes load lazily automatically, and the `lazy` parameter lets you choose.
- **Efficient data transfer.** Tables and charts reach the browser in the columnar Apache Arrow format.
- **Caching with background refresh.** With `refresh_mode="background"`, [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) returns the cached value right away when its `ttl` expires and refreshes it in the background, so people don't wait for the slow query on every expiry. By default, an expired value is served for at most one extra `ttl`; after that, the next call waits for fresh data. Caching also works with async functions, with the default foreground refresh.
- **Sections that load in parallel.** With `@st.fragment(parallel=True)`, independent sections of a page run concurrently, so the page finishes in about the time of its slowest query. [`st.skeleton`](/develop/api-reference/status/st.skeleton) shows the layout right away while each section loads.

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
- **Inputs that wait for people to finish.** With `on_change="ignore"`, a widget updates in the browser without rerunning the app, and your script receives the value on the next rerun, such as when people click "Apply". Use [`st.form`](/develop/api-reference/execution-flow/st.form) to batch several inputs into one rerun. Either way, heavy queries run once.
- **Live data.** Use `@st.fragment(run_every="30s")` to refresh one section of a page on a schedule, without rerunning the rest.

## Rich interactions

- **Cross-filtering and drill-down.** Select rows in [`st.dataframe`](/develop/api-reference/data/st.dataframe), or points in [`st.altair_chart`](/develop/api-reference/charts/st.altair_chart), [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart), [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart), and other charts, with `on_select="rerun"`. Your script receives the selection and filters the rest of the page.
- **Details on demand.** Open details in a [dialog](/develop/api-reference/execution-flow/st.dialog), or in a full-height side drawer with `position="right"`.
- **Views that can be shared.** With `bind="query-params"`, a widget's value lives in the page URL, so every filtered view can be bookmarked and shared.

```python
import streamlit as st

@st.cache_data(ttl="15m")
def load_orders(region):
    ...  # Query the orders for a region

def clear_selection():
    st.session_state.orders = {"selection": {"rows": []}}

@st.dialog("Order details", position="right", on_dismiss=clear_selection)
def show_order(order):
    st.write(order)

region = st.sidebar.selectbox(
    "Region",
    ["All", "Americas", "EMEA", "APAC"],
    key="region",
    bind="query-params",
    on_change=clear_selection,  # Row numbers change when the filter does
)
orders = load_orders(region)

event = st.dataframe(
    orders, on_select="rerun", selection_mode="single-row", key="orders"
)
if event.selection.rows:
    show_order(orders.iloc[event.selection.rows[0]])
```

Clearing the selection when the drawer closes keeps it from reopening on the next rerun, and clearing it when the filter changes keeps a stale row number from pointing at the wrong order.

## Layout and polish

- **Responsive grids.** [`st.grid`](/develop/api-reference/layout/st.grid) lays out metric cards and dashboard panels that reflow with the available width.
- **KPI cards.** [`st.metric`](/develop/api-reference/data/st.metric) shows a value, a delta, and an optional sparkline, with a border for a card look.
- **Navigation and actions.** Use [tabs](/develop/api-reference/layout/st.tabs), [pagination](/develop/api-reference/widgets/st.pagination), and [multipage navigation](/develop/concepts/multipage-apps) for larger dashboards, and [`st.menu_button`](/develop/api-reference/widgets/st.menu_button) for a short list of actions.
- **Native charts.** Streamlit renders Vega-Lite, Plotly, and ECharts charts natively, styled by your theme.
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

Turn on the [agent API](/develop/concepts/ai-agents/agent-access), and an AI assistant can set your dashboard's filters and read its metrics, tables, and charts through the dashboard's own logic, instead of guessing at the warehouse schema. Agents use the same caches and partial reruns as people, so they get the same numbers people see. Agents set widgets such as select boxes, date inputs, and sliders; they can't make chart or table selections yet, so keep every filter an agent needs available as a widget.

## Coming from a BI tool?

For the dashboards your teams rely on, move them to Streamlit and modernize them on the way. Together with Snowflake, Streamlit covers much of what teams use a BI tool for: governed data and metrics, Snowflake's access controls, interactive filtering and drill-down, live refresh, and sharing and embedding. A move is a modernization, not a one-to-one copy.

### Map BI concepts to Streamlit

| In a BI tool                   | In Streamlit                                                                                                                                                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Filters and slicers            | Widgets such as [`st.selectbox`](/develop/api-reference/widgets/st.selectbox), [`st.multiselect`](/develop/api-reference/widgets/st.multiselect), and [`st.date_input`](/develop/api-reference/widgets/st.date_input)      |
| Calculated fields and measures | Python or SQL functions, cached with [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data)                                                                                                             |
| Governed metrics               | Snowflake semantic views and tables, queried with SQL through [`st.connection`](/develop/api-reference/connections/st.connection)                                                                                          |
| Scheduled refresh              | A cache `ttl`, with `refresh_mode="background"`                                                                                                                                                                            |
| Live tiles                     | `@st.fragment(run_every=...)`                                                                                                                                                                                              |
| Cross-filtering                | Chart and table selections with `on_select="rerun"`                                                                                                                                                                        |
| Drill-down and drill-through   | Selections that open a [dialog](/develop/api-reference/execution-flow/st.dialog) or side drawer, or link to another [page](/develop/concepts/multipage-apps) with query parameters                                         |
| Bookmarks and shared views     | Widgets with `bind="query-params"`                                                                                                                                                                                         |
| KPI tiles and report layout    | [`st.metric`](/develop/api-reference/data/st.metric), [`st.grid`](/develop/api-reference/layout/st.grid), [`st.columns`](/develop/api-reference/layout/st.columns), and [`st.tabs`](/develop/api-reference/layout/st.tabs) |
| Row-level security             | Snowflake's access controls with [caller's rights](/develop/api-reference/connections/st.connections.snowflakeconnection), or logic based on [`st.user`](/develop/api-reference/user/st.user)                              |
| Export                         | The built-in CSV export of `st.dataframe` for tables that are sent to the browser in full, or [`st.download_button`](/develop/api-reference/widgets/st.download_button) for large or lazy-loaded tables                    |
| Sharing and embedding          | [Deployment](/deploy) on Snowflake, your own cloud, or Community Cloud, with [`st.login`](/develop/api-reference/user/st.login) for sign-in                                                                                |

On top of that, a Streamlit dashboard can hold what a BI tool can't: forecasts and models in Python, editable tables and [writeback](/develop/concepts/design/writeback), AI features, and access for AI agents.

### Modernize, step by step

1. **Rebuild the dashboards that matter.** Start with the dashboards people open every week. Build them on the same governed data and metrics. A coding agent with the bundled skills can do most of the work from a description or a screenshot of the original.
2. **Check the numbers.** Compare each figure against the original dashboard before you switch people over. Keep those checks as [`AppTest`](/develop/concepts/app-testing) tests.
3. **Add what the BI tool couldn't hold.** Add Python logic, writeback, AI, and access for agents where they help people decide and act.
4. **Retire what nobody uses.** Retire the reports nobody opens, and leave one-off questions to chat.

A BI tool still fits drag-and-drop self-service exploration by people who don't want code, and pixel-precise paginated reports.
