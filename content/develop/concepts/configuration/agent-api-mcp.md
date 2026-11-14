---
title: Agent API and MCP server
slug: /develop/concepts/configuration/agent-api-mcp
description: Let AI agents and other programs use your Streamlit app without a browser through the experimental agent API over HTTP or as a remote MCP server.
keywords: agent api, mcp, model context protocol, mcp server, ai agents, enableAgentApi, agent interaction, headless, automation, claude, cursor, vs code, chatgpt, openapi, interact, get_data, snapshot
---

# Agent API and MCP server

The agent API lets AI agents and other programs use your Streamlit app without a browser. A client sends widget values as JSON, Streamlit runs your app as it would for a browser user, and the client gets back the finished page as a JSON snapshot. The same API is also available as a remote [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server, so you can connect your app to AI applications like Claude, ChatGPT, Cursor, and VS Code.

Existing apps work with the agent API without code changes once you turn it on.

<Important>

The agent API is experimental. The API and its configuration options might change in future releases.

</Important>

## Summary

1. The agent API is off by default. Turn it on with the `server.enableAgentApi` configuration option.
2. Send `POST` requests to `/_stcore/agent/interact`, or connect an MCP client to `/_stcore/agent/mcp`.
3. The running app describes its own protocol at `/_stcore/agent/openapi.json`.
4. A client gets no more access than a browser user, but every request runs your app, including callbacks and side effects.

## Why use the agent API

A good Streamlit app already does a lot of work for its users. It connects to the right data, applies the right calculations and filters, and explains the results with titles, labels, captions, `help` text, and number formats. It also controls who can see what. Without the agent API, an AI agent can't easily use any of this. It has to drive a browser, which is slow and reads charts and tables as pixels, or work around your app by querying your data directly or calling a separate API. Both alternatives bypass your app's logic and rebuild it somewhere else, where it can drift from what your users see.

The agent API lets agents use your app the way your users do:

- **Your app's logic applies.** Agent input goes through the same reruns and callbacks as browser input, so your calculations, validation, and access controls apply to agents too. Answers come from the same numbers your users see.
- **Your app explains itself.** A snapshot includes the labels, captions, `help` text, and formatted values that you wrote for your users, so agents can understand what a filter selects or what units a metric uses.
- **Agents already know the vocabulary.** Elements in a snapshot are named after `st.*` commands, and their properties are named after the commands' parameters. AI models already know Streamlit's API, so they understand a snapshot without learning a new schema.
- **The available actions are always current.** Each snapshot lists the widgets that a client can use right now. When your app shows different widgets based on earlier choices, the snapshot shows exactly those widgets.
- **Results are data.** Metrics, tables, and charts come back as values, columns, and rows, not as pixels.

### Use cases

- **Check an app after editing it.** A coding agent starts the app it just wrote, changes the filters, and checks that the output is correct, using the real Streamlit runtime.
- **Ask a dashboard a question.** An assistant answers a question like "What was Q3 revenue in Japan?" by setting your app's filters and reading the result, using your app's definitions and calculations.
- **Operate an internal tool.** An agent fills in a form in your app on a user's behalf, like filing a ticket or running a forecast, and reuses your app's callbacks and validation.
- **Publish an app as a tool.** Make a deployed app available to an AI assistant without writing and maintaining a separate API.
- **Add an assistant to your app.** Use `st.chat_input` to hand a user's question to an agent that reads your app through the agent API, so the answer comes from your app's own numbers.

<Tip>

Agents can only use the context you put in your app. Descriptive labels, `help` text, captions that explain definitions and units, and number formats make your app easier for agents to use, just like they do for people. Give widgets a `key` so agents can refer to them reliably.

</Tip>

## Endpoints

When the agent API is on, Streamlit serves these endpoints next to your app. If your app uses `server.baseUrlPath`, the endpoints include that path.

| Endpoint                      | Method | Description                                                                                                                     |
| ----------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `/_stcore/agent/interact`     | `POST` | Runs the app with the request's widget values and returns a snapshot.                                                           |
| `/_stcore/agent/mcp`          | `POST` | The same protocol as a remote MCP server.                                                                                       |
| `/_stcore/agent/openapi.json` | `GET`  | An OpenAPI document that describes every request field, response field, and error code for your installed version of Streamlit. |

The OpenAPI document is always available. When the agent API is off, it only reports that the API is disabled.

Agents can discover the agent API from your app's URL. The HTML page that Streamlit serves includes a short explanation of the agent API for clients that don't run JavaScript, and a `<link rel="service-desc">` tag that points to the OpenAPI document. URLs in responses, like a table's `data.url`, are relative to the request URL, so they work behind proxies and URL prefixes.

## Turn on the agent API

Set `server.enableAgentApi` to `true`. To use the agent API only while you develop, pass it on the command line instead of adding it to your configuration file, so your deployed app doesn't serve it:

```bash
streamlit run streamlit_app.py --server.enableAgentApi=true
```

To serve the agent API from a deployed app, add it to `.streamlit/config.toml`:

```toml
[server]
enableAgentApi = true
```

Before you turn on the agent API in a deployed app, read [Security considerations](#security-considerations).

## Use the HTTP API

The following examples use this app, saved as `streamlit_app.py`:

```python
import pandas as pd
import streamlit as st

st.title("Orders")

df = pd.DataFrame(
    {
        "order": ["A-1", "A-2", "A-3"],
        "status": ["Shipped", "Pending", "Shipped"],
        "amount": [120, 80, 45],
    }
)

status = st.selectbox("Status", ["All", "Shipped", "Pending"], key="status")
if status != "All":
    df = df[df["status"] == status]

st.metric("Total", f"${df['amount'].sum()}")
st.dataframe(df, hide_index=True, key="orders")

if st.button("Export", key="export"):
    st.success("Exported!")
```

### Start a session

Send an empty JSON object to create a session. Streamlit runs your app and returns its snapshot:

```bash
curl -s -X POST http://localhost:8501/_stcore/agent/interact \
  -H "Content-Type: application/json" \
  -d '{}'
```

The response looks like this (abridged):

```json
{
  "schema_version": 1,
  "session_id": "s_fbe0b7bf...",
  "status": "ready",
  "page": { "url_path": "", "title": "streamlit_app" },
  "pages": [{ "url_path": "", "title": "streamlit_app" }],
  "query_params": {},
  "tree": {
    "type": "root",
    "children": [
      {
        "type": "main",
        "children": [
          { "type": "title", "props": { "body": "Orders" } },
          {
            "type": "selectbox",
            "key": "status",
            "props": {
              "label": "Status",
              "options": ["All", "Shipped", "Pending"],
              "disabled": false
            },
            "value_schema": { "type": "string" },
            "value": "All"
          },
          {
            "type": "metric",
            "props": { "label": "Total", "value": "$245" }
          },
          {
            "type": "dataframe",
            "key": "orders",
            "data": {
              "columns": [
                { "name": "order", "type": "large_string" },
                { "name": "status", "type": "large_string" },
                { "name": "amount", "type": "int64" }
              ],
              "row_count": 3,
              "complete": true,
              "preview": {
                "rows": [
                  ["A-1", "Shipped", 120],
                  ["A-2", "Pending", 80],
                  ["A-3", "Shipped", 45]
                ]
              },
              "url": "../../media/f5608ad4..."
            }
          },
          {
            "type": "button",
            "key": "export",
            "props": { "label": "Export", "disabled": false }
          }
        ]
      },
      { "type": "sidebar", "children": [] },
      { "type": "event", "children": [] },
      { "type": "bottom", "children": [] }
    ]
  },
  "actions": [
    {
      "key": "status",
      "kind": "value",
      "type": "selectbox",
      "label": "Status"
    },
    { "key": "export", "kind": "trigger", "type": "button", "label": "Export" }
  ]
}
```

The snapshot uses Streamlit's own vocabulary. Each element's `type` is the name of the `st.*` command that created it, and its `props` are that command's parameters, so the [API reference](/develop/api-reference) documents them.

### Set widget values and click buttons

Pass the `session_id` from the previous response with every later request. To change widgets, send `widget_state`, which maps widget keys to values like `st.session_state` does:

```bash
curl -s -X POST http://localhost:8501/_stcore/agent/interact \
  -H "Content-Type: application/json" \
  -d '{"session_id": "s_fbe0b7bf...", "widget_state": {"status": "Shipped"}}'
```

In the new snapshot, the metric's value is `$165` and the dataframe's `row_count` is `2`.

To click a button, send its key in `trigger`:

```bash
curl -s -X POST http://localhost:8501/_stcore/agent/interact \
  -H "Content-Type: application/json" \
  -d '{"session_id": "s_fbe0b7bf...", "trigger": {"key": "export"}}'
```

The new snapshot includes the `success` element.

<Tip>

Give widgets a `key` if you want clients to use them. Widgets without a key get a generated key that starts with `$$ID-` and changes when your code changes.

</Tip>

### Request fields

| Field          | Description                                                                                                                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `session_id`   | The session to continue. Omit it to create a session. A request with only `session_id` reruns the app.                                                                                                                                                                                |
| `widget_state` | Widget keys mapped to new values. Widgets you don't mention keep their values. Each element's `value_schema` describes the shape of its value, and its `props`, like `options`, describe the legal values.                                                                            |
| `trigger`      | One element to fire, like `{"key": "export"}`. For `st.chat_input`, include the message as `"value"`. For `st.menu_button`, include the chosen option as `"value"`. To submit an `st.form`, send its fields in `widget_state` and its submit button in `trigger` in the same request. |
| `page`         | The `url_path` of a page from the snapshot's `pages`, to switch pages in a multipage app.                                                                                                                                                                                             |
| `query_params` | Replaces the URL's query parameters, like `{"region": ["Europe"]}`. Widgets bound with `bind="query-params"` take their values from these parameters.                                                                                                                                 |
| `context`      | What a browser would report about itself: `timezone` (an IANA name like `"Europe/Berlin"`) and `locale` (a language tag like `"de-DE"`). Your app reads these from `st.context`.                                                                                                      |

You can send `page` and `query_params` when you create a session, but `widget_state` and `trigger` require a `session_id`. You can't combine `page` or `query_params` with `widget_state` or `trigger` in one request.

### Read the snapshot

| Field           | Description                                                                                                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `session_id`    | Pass this back to continue the session.                                                                                                                                                                                                             |
| `status`        | `"ready"` when the app finished running, or `"error"` when it raised an exception. When the app raised an exception, the tree includes an `exception` element with its type, message, and stack trace, unless `client.showErrorDetails` hides them. |
| `page`, `pages` | The current page and every page in the app.                                                                                                                                                                                                         |
| `query_params`  | The app's current query parameters.                                                                                                                                                                                                                 |
| `tree`          | The page's elements, grouped into the `main`, `sidebar`, `event` (dialogs and toasts), and `bottom` containers, with each container's children in order.                                                                                            |
| `actions`       | The widgets the client can use now. `kind` is `"value"` for widgets that you set in `widget_state` and `"trigger"` for elements that you fire in `trigger`. Disabled widgets aren't listed.                                                         |

Tables and Vega-based charts include a `data` field with their columns, row count, and a preview of the first rows. When an element has more rows than `server.agentPreviewRows`, `data.complete` is `false` and the client can fetch the full data from `data.url`. If the full data isn't available, `data.unavailable` explains why and there's no `data.url`.

Some elements report a `support` field when a client can't fully use them:

- `browser_required`: The element needs JavaScript to render, like custom components and `st.html` with `unsafe_allow_javascript=True`.
- `action_unsupported`: A browser user can interact with the element, but the agent API can't, like file uploads, data editor edits, and chart selections.

### Errors

When Streamlit refuses a request, it usually doesn't run your app. The response has an HTTP error status and a body like this:

```json
{
  "error": {
    "code": "invalid_value",
    "message": "'Lost' is not one of the options for 'status': 'All', 'Shipped', 'Pending'."
  }
}
```

These are the most common error codes:

| Code                  | Status | Meaning                                                                                                                                                                                                           |
| --------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invalid_request`     | 400    | The request is malformed, like an unknown field or a `widget_state` without a `session_id`.                                                                                                                       |
| `invalid_value`       | 400    | The value doesn't fit the widget, like an option that doesn't exist. The message lists the legal options.                                                                                                         |
| `not_a_value`         | 400    | The element is a button or other trigger. Fire it with `trigger` instead of `widget_state`.                                                                                                                       |
| `not_a_trigger`       | 400    | The element holds a value. Set it with `widget_state` instead of `trigger`.                                                                                                                                       |
| `unsupported_element` | 400    | The agent API can't set or fire this element, like a file uploader. Its `support` field explains why.                                                                                                             |
| `missing_form_submit` | 400    | The request sets fields in a form without triggering its submit button.                                                                                                                                           |
| `unknown_key`         | 404    | No element has this key. Use keys from the latest snapshot.                                                                                                                                                       |
| `unknown_session`     | 404    | The session expired or the server restarted. Send `{}` to create a new session.                                                                                                                                   |
| `unknown_page`        | 404    | No page has this `url_path`. The error lists the available pages.                                                                                                                                                 |
| `not_on_page`         | 409    | The element exists but can't be used now. For example, it's on another page or in a closed dialog.                                                                                                                |
| `disabled_widget`     | 409    | The widget is disabled.                                                                                                                                                                                           |
| `session_busy`        | 409    | Another request for this session is still running.                                                                                                                                                                |
| `wait_timed_out`      | 202    | Not a failure. The app is still running after `server.agentWaitTimeout` seconds. Send only the `session_id` to keep waiting. If you resend `{}` instead, Streamlit creates a new session and runs your app again. |
| `not_available`       | 403    | The agent API is off.                                                                                                                                                                                             |
| `host_not_allowed`    | 403    | The request's `Host` header isn't in `server.allowedHosts`.                                                                                                                                                       |
| `origin_not_allowed`  | 403    | The request came from a web page whose origin isn't in `server.corsAllowedOrigins`.                                                                                                                               |
| `too_many_sessions`   | 429    | The server already holds `server.agentMaxSessions` sessions.                                                                                                                                                      |

For every error code, see the OpenAPI document at `/_stcore/agent/openapi.json`.

## Use the MCP server

The MCP endpoint at `/_stcore/agent/mcp` serves the agent API through MCP's Streamable HTTP transport. Add its URL to your AI application as a remote MCP server. It provides two tools:

- `interact`: The same operation as the HTTP API. It takes the same fields and returns the same snapshot as JSON text.
- `get_data`: Reads a file that a snapshot points to, like the full rows of a table from its `data.url`, or an image or audio file. It returns tables in pages of up to 500 rows by default, or fewer for wide tables, and the client can set a different `limit`. It's read-only and doesn't run your app.

The server also sends instructions that explain the protocol to the model, so you don't need to explain it in your prompt.

### Connect an AI application

For an app running locally on port 8501, the MCP server URL is `http://localhost:8501/_stcore/agent/mcp`. Here's how to add it to some common AI applications:

**Claude Code:**

```bash
claude mcp add --transport http my-streamlit-app http://localhost:8501/_stcore/agent/mcp
```

**Cursor:** In `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "my-streamlit-app": {
      "url": "http://localhost:8501/_stcore/agent/mcp"
    }
  }
}
```

**VS Code:** In `.vscode/mcp.json`:

```json
{
  "servers": {
    "my-streamlit-app": {
      "type": "http",
      "url": "http://localhost:8501/_stcore/agent/mcp"
    }
  }
}
```

AI applications that run in the cloud, like Claude and ChatGPT on the web, can't reach `localhost`. To connect them, deploy your app with the agent API turned on and add the deployed app's URL with `/_stcore/agent/mcp` appended, like `https://my-app.example.com/_stcore/agent/mcp`, as a custom connector. If your hosting platform serves your app under a URL prefix, include the prefix in the URL.

## Configuration options

Set these options in the `[server]` section of your configuration. For more information, see [`config.toml`](/develop/api-reference/configuration/config.toml#server).

| Option                    | Default | Description                                                                                                                                                              |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `server.enableAgentApi`   | `false` | Whether to serve the agent API and MCP server.                                                                                                                           |
| `server.agentWaitTimeout` | `30`    | How many seconds a request waits for the app to finish running before it returns `wait_timed_out`. The app keeps running. Keep this below your clients' request timeout. |
| `server.agentSessionTTL`  | `900`   | How many seconds an idle agent session lasts before Streamlit closes it.                                                                                                 |
| `server.agentMaxSessions` | `100`   | The maximum number of agent sessions the server holds at once. At the limit, Streamlit closes expired sessions, and then refuses new sessions with `too_many_sessions`.  |
| `server.agentPreviewRows` | `100`   | The maximum number of rows a snapshot includes in a table's or chart's `data.preview`. Clients can fetch the remaining rows from `data.url`.                             |

## Security considerations

When the agent API is on, anyone who can reach your app can use it through the agent API. A client gets the same access as a browser user, so your app's own validation and access controls apply. Before you turn on the agent API in a deployed app, consider the following:

- **Every request runs your app.** Creating a session runs your script, and any widget change or trigger can run callbacks, write to databases, send emails, or call paid APIs. The agent API doesn't label any action as safe.
- **Agent sessions share caches with browser sessions.** Values in `st.cache_data` and `st.cache_resource` are shared, just like they are between browser users.
- **Agent sessions are anonymous by default.** The agent API doesn't read cookies or `Authorization` headers, so `st.login` doesn't identify the caller. To identify callers, use a proxy or hosting platform that authenticates requests and sets identity headers, and map those headers into `st.user` with the experimental [`server.trustedUserHeaders`](/develop/api-reference/configuration/config.toml#server) option. Each key is a header name, and each value is the `st.user` attribute to store it under. On the command line or in an environment variable, pass the mapping as a JSON object. The agent API and browser sessions use the same mapping. Your proxy must strip these headers from client requests to `/_stcore/agent/`, not only from WebSocket connections, or callers can impersonate other users.

  ```toml
  [server]
  trustedUserHeaders = { "X-Forwarded-Email" = "email", "X-Forwarded-User" = "name" }
  ```

  A session only accepts requests that carry the same identity as the request that created it. A request with a different identity gets `unknown_session`.

- **Requests from web pages are refused.** Streamlit refuses requests with an `Origin` header unless the origin is in `server.corsAllowedOrigins`. Programs like `curl` and most MCP clients don't send this header. MCP clients that run in a web browser do, so they can't connect.
- **Host checks apply.** If you set `server.allowedHosts`, the agent API only answers requests for those hosts, just like the app's WebSocket.
- **A session ID grants access to that session.** Unless you use `server.trustedUserHeaders`, anyone with a session ID can continue that session. Treat session IDs like credentials, and don't share them.
- **App content is untrusted input for agents.** Labels, captions, and data in a snapshot come from your app and its data. An AI agent should treat them as data, not as instructions.

## Limitations

- The agent API doesn't render your app. It can't check layout, themes, or CSS, and it reports elements that need JavaScript, like custom components, without running them.
- Clients can't upload files, edit data editors, or make chart and dataframe selections.
- Fragments with `run_every` don't rerun on their own. A request with only `session_id` refreshes them.
- The agent API isn't a test framework. To write automated tests for your app, use [app testing](/develop/concepts/app-testing).
