---
title: Agent-accessible apps
slug: /develop/concepts/ai-agents/agent-access
description: Let AI agents use your Streamlit app as a tool over MCP or HTTP. Connect an app to Claude, ChatGPT, Claude Code, Cursor, VS Code, or Snowflake CoCo, and agents read its tables and charts as data, set its filters, and submit its forms through the app's own logic, with no more access than the browser.
keywords: mcp, model context protocol, mcp server, agent api, ai agents, agent access, claude, chatgpt, custom connector, cursor, vs code, claude code, snowflake coco, ai tools, llm tools, enableAgentApi, agent-accessible apps
---

# Agent-accessible apps

Write your business logic once. People get an app, and agents get a tool.

When you turn on the agent API, AI agents and other programs can use your Streamlit app without a browser, over HTTP or as a remote [MCP](https://modelcontextprotocol.io/) server. Agents read the app's tables, charts, and metrics as data, set its widgets, follow multi-step flows, and submit its forms. Everything goes through the same script and the same calculations as a person in the browser, and an agent gets no more access than the browser does. For example, you can ask Claude what your forecast app predicts at a 5% price increase, or let an agent fill in an approval form for your review.

There's no second API to build, secure, and maintain, and existing apps need no code changes.

This page explains what agent access gives you and how to connect your app. For the full protocol, request fields, errors, and configuration options, see [Agent API and MCP server](/develop/concepts/configuration/agent-api-mcp).

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

## Connect an MCP client

Add your app's URL plus `/_stcore/agent/mcp` to your client. Each app is its own MCP server, so give each one a name that tells you which app it is. For example, in Claude Code:

```bash
claude mcp add --transport http revenue http://localhost:8501/_stcore/agent/mcp
```

In the Snowflake CoCo CLI:

```bash
cortex mcp add revenue http://localhost:8501/_stcore/agent/mcp --type http
```

For Cursor, VS Code, and other clients, see [Connect an AI application](/develop/concepts/configuration/agent-api-mcp#connect-an-ai-application). In the Claude and ChatGPT apps, add the deployed app's URL as a custom connector.

Which clients can reach your app depends on where it runs:

| App                            | Reachable from                                                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Running locally                | Clients that run on your machine, such as Claude Code, Cursor, VS Code, and the Snowflake CoCo CLI. This is the usual setup while an agent builds and checks an app.            |
| Deployed and public            | Any client, including custom connectors in the Claude and ChatGPT apps, which connect from their provider's servers. These need a publicly reachable URL, typically over HTTPS. |
| Behind an authenticating proxy | Clients that can send the proxy's credentials as headers, which most desktop clients let you configure. Hosted connectors can't, because they expect MCP's OAuth flow.          |
| Behind `st.login`              | Any client that can reach the app, but agents are signed out.                                                                                                                   |

## What agents see

Each response is a snapshot of the finished page: a tree of elements named after the `st.*` commands that produced them, with their parameters, plus the actions the agent can take now, such as which widgets it can set and to which values.

- **Data, not pixels.** Tables and charts come back as data. [`st.dataframe`](/develop/api-reference/data/st.dataframe), [`st.data_editor`](/develop/api-reference/data/st.data_editor), Vega-Lite charts such as [`st.line_chart`](/develop/api-reference/charts/st.line_chart), and an [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart) built from one dataframe include a preview of their rows and usually a link to the full data. [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart), [`st.pydeck_chart`](/develop/api-reference/charts/st.pydeck_chart), and an `st.echarts_chart` with inline data come back as their chart spec, which includes the data. An `st.echarts_chart` with several datasets doesn't include its data.
- **Labels and help text.** Each widget's `label`, `help`, and options tell the agent what it means and what values are legal. Clear labels and captions make your app easier for agents to use, just as they do for people.
- **Stable keys.** Agents can drive a widget without a key through a generated ID, but that ID changes when the code or the widget's parameters change, such as a slider's bounds. Give `key=` to every widget so agents can address it reliably.
- **Errors.** When the app raises an exception, the snapshot shows it, so an agent can report or fix it.

Agents run through the app's own caches, connections, and partial reruns. Data that's already cached isn't queried again, and changing a filter inside a [fragment](/develop/concepts/architecture/fragments) reruns only that fragment. So an agent's question often needs no new query, and it gets the same numbers people see.

## Security

An agent gets no more access than the app gives a browser, but every request runs your app. Before you turn on the API for an app that writes data, sends messages, or calls paid services, remember that an agent can trigger those actions just as a person can. Browser-side checks, such as `required` and `validate` on inputs, don't run for agents, so validate in Python everything an agent can submit. Agent sessions are anonymous unless your proxy sets trusted identity headers. For details, see [Security considerations](/develop/concepts/configuration/agent-api-mcp#security-considerations).

## Limitations

- Agents can't yet drive every element. They can't edit `st.data_editor` tables, upload files or use camera and audio inputs, make dataframe or chart selections, click `ButtonColumn` buttons, or download files whose data comes from a function.
- Custom components, `st.components.v1.html`, and `st.html` with JavaScript aren't rendered for agents.
- Fragments with `run_every` don't refresh on their own for agents.
- Each agent session handles one request at a time. A second request to the same session while one is running gets a `409` error.
- Snowflake's AI Gateway, Snowflake CoWork, and Cortex Agents require OAuth for MCP servers, which the agent API doesn't support yet, so they can't use a Streamlit app yet. Add the app to the CoCo CLI directly with `cortex mcp add` instead.
- Very large snapshots, such as a page with many large charts or a selectbox with thousands of options, can exceed what a chat client accepts in one tool result.

For more, see [Limitations](/develop/concepts/configuration/agent-api-mcp#limitations) in the agent API reference.
