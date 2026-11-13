---
title: Agent-accessible apps
slug: /develop/concepts/ai-agents/agent-access
description: Let AI agents use your Streamlit app as a tool over MCP or HTTP. Connect an app to Claude, ChatGPT, Cursor, VS Code, or Claude Code, and agents read its tables and charts as data, set its filters, and submit its forms through the app's own logic, with no more access than the browser.
keywords: mcp, model context protocol, mcp server, agent api, ai agents, agent access, claude, chatgpt, custom connector, cursor, vs code, claude code, ai tools, llm tools, enableAgentApi, agent-accessible apps
---

# Agent-accessible apps

Write your business logic once. People get an app, and agents get a tool.

When you turn on the agent API, AI agents and other programs can use your Streamlit app without a browser, over HTTP or as a remote [MCP](https://modelcontextprotocol.io/) server. Agents read the app's tables, charts, and metrics as data, set its widgets, follow multi-step flows, and submit its forms. Everything goes through the same script and the same calculations as a person in the browser, and an agent gets no more access than the browser does. For example, you can ask your forecast app what happens at a 5% price increase from Claude, or let an agent fill in an approval form for your review.

There's no second API to build, secure, and maintain, and existing apps need no code changes.

<Important>

The agent API is experimental. The API and its options are subject to change.

</Important>

## Turn on the agent API

The agent API is off by default. Turn it on with the [`server.enableAgentApi`](/develop/api-reference/configuration/config.toml#server) option. Streamlit reads it at startup, so restart the app after you change it.

To check an app locally, such as while a coding agent works on it, pass the option on the command line. This leaves the deployed app's configuration unchanged:

```bash
streamlit run app.py --server.enableAgentApi=true
```

To open a deployed app to agents, set the option in the app's configuration file. This turns on the API wherever the app runs with that file, so add it only when you want agents to use the deployed app:

```toml
# .streamlit/config.toml
[server]
enableAgentApi = true
```

The agent API uses these routes next to the app itself:

| Route                         | Purpose                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `/_stcore/agent/mcp`          | A remote MCP server for Claude, ChatGPT, Cursor, VS Code, Claude Code, and other MCP clients |
| `/_stcore/agent/interact`     | The same operation over plain HTTP `POST`, for scripts and coding agents with a shell        |
| `/_stcore/agent/openapi.json` | A description of the protocol for the running Streamlit version, and whether the API is on   |

The routes respect `server.baseUrlPath`. They answer even while the API is off, so a client can check whether it's on, but they only run the app while it's on.

## Connect an MCP client

Add your app's URL plus `/_stcore/agent/mcp` to your client. Each app is its own MCP server, so give each one a name that tells you which app it is.

For example, in Claude Code:

```bash
claude mcp add --transport http revenue http://localhost:8501/_stcore/agent/mcp
```

In Cursor's `mcp.json`:

```json
{
  "mcpServers": {
    "revenue": { "url": "https://revenue.example.com/_stcore/agent/mcp" }
  }
}
```

In the Claude and ChatGPT apps, add the URL as a custom connector.

Which clients can reach your app depends on where it runs:

| App                            | Reachable from                                                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Running locally                | Clients that run on your machine, such as Claude Code, Cursor, and VS Code. This is the usual setup while an agent builds and checks an app.                                    |
| Deployed and public            | Any client, including custom connectors in the Claude and ChatGPT apps, which connect from their provider's servers. These need a publicly reachable URL, typically over HTTPS. |
| Behind an authenticating proxy | Clients that can send the proxy's credentials as headers, which most desktop clients let you configure.                                                                         |

The MCP server has two tools:

- **`interact`** runs the app, optionally with new widget values, a button click, a page, or query parameters, and returns a snapshot of the page.
- **`get_data`** reads the rows of a table or chart beyond the preview in a snapshot, as JSON that a chat assistant can read without running code.

## What agents see

A snapshot is the finished page as a tree of elements, named after the `st.*` commands that produced them, with their parameters. It also lists the actions the agent can take now, such as which widgets it can set and to which values.

- **Data, not pixels.** Tables and charts, including [`st.dataframe`](/develop/api-reference/data/st.dataframe), [`st.data_editor`](/develop/api-reference/data/st.data_editor), and Vega-Lite charts such as [`st.line_chart`](/develop/api-reference/charts/st.line_chart), include a preview of their rows. Larger results usually link to the full data. Use [`server.agentPreviewRows`](/develop/api-reference/configuration/config.toml#server) to change the preview size.
- **Labels and help text.** Each widget's `label`, `help`, and options tell the agent what it means and what values are legal. Clear labels and captions make your app easier for agents to use, just as they do for people.
- **Stable keys.** Agents can drive a widget without a key through a generated ID, but that ID changes when the code or the widget's parameters change, such as a slider's bounds. Give `key=` to every widget so agents can address it reliably.
- **Errors.** When the app raises an exception, the snapshot shows it, so an agent can report or fix it.

Agents run through the app's own caches, connections, and partial reruns. Data that's already cached isn't queried again, and changing a filter inside a [fragment](/develop/concepts/architecture/fragments) reruns only that fragment. So an agent's question often needs no new query, and it gets the same numbers people see.

## Security and access

An agent gets no more access than the app gives a browser:

- The API serves only when `server.enableAgentApi` is on.
- It uses the same Host allow-list ([`server.allowedHosts`](/develop/api-reference/configuration/config.toml#server)) as the app's WebSocket.
- Requests from web pages are refused unless their origin is in [`server.corsAllowedOrigins`](/develop/api-reference/configuration/config.toml#server). MCP clients outside a browser send no origin and aren't affected.
- An agent can do only what the app's widgets allow. The snapshot's actions list the legal moves.
- Browser-side checks, such as `required` and `validate` on inputs, don't run for agents. Validate in Python everything an agent can submit.
- Clients that ask before running a tool that can make changes keep asking, because the `interact` tool is never marked read-only.

Before you turn on the API for an app that writes data, sends messages, or calls paid services, remember that an agent can trigger those actions just as a person can.

### Identity

Agent sessions are anonymous unless your deployment's proxy sets trusted identity headers. Map those headers into `st.user` with the experimental `server.trustedUserHeaders` option. Each key is an HTTP header name, and each value is the `st.user` key to store it under:

```toml
# .streamlit/config.toml
[server]
trustedUserHeaders = { "X-Forwarded-Email" = "email" }
```

On the command line or in an environment variable, pass the same mapping as a JSON object, such as `'{"X-Forwarded-Email": "email"}'`. If your proxy strips client-supplied identity headers, make sure it also strips them from requests to `/_stcore/agent/`, not only from the WebSocket.

## Limitations

- An app that uses [`st.login`](/develop/api-reference/user/st.login) treats agents as signed out for now.
- Agents can't yet drive every element. They can't edit `st.data_editor` tables, upload files or use camera and audio inputs, make dataframe or chart selections, click `ButtonColumn` buttons, or download files whose data comes from a function.
- Custom components, `st.components.v1.html`, and `st.html` with JavaScript aren't rendered for agents.
- Fragments with `run_every` don't refresh on their own for agents.
- Each agent session handles one request at a time. A second request to the same session while one is running gets a `409` error.
- Hosted clients, such as custom connectors in the Claude and ChatGPT apps, can't send credentials for an app behind an authenticating proxy. They expect MCP's OAuth flow, which the agent API doesn't support yet.
- Very large snapshots, such as a page with many large charts or a selectbox with thousands of options, can exceed what a chat client accepts in one tool result.

## Configuration

These options control the agent API. For details, see [`config.toml`](/develop/api-reference/configuration/config.toml#server).

| Option                    | Default | Description                                                              |
| ------------------------- | ------- | ------------------------------------------------------------------------ |
| `server.enableAgentApi`   | `false` | Turns on the agent API and its MCP endpoint.                             |
| `server.agentWaitTimeout` | `30`    | Seconds a request waits for the app to finish running before it returns. |
| `server.agentSessionTTL`  | `900`   | Seconds before an idle agent session closes.                             |
| `server.agentMaxSessions` | `100`   | Maximum number of agent sessions the server holds at once.               |
| `server.agentPreviewRows` | `100`   | Maximum number of rows a table or chart includes inline in a snapshot.   |
