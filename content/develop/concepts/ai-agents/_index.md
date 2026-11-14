---
title: Build with AI agents
slug: /develop/concepts/ai-agents
description: Streamlit is the agent-native data app framework. Learn how coding agents build, check, and maintain Streamlit apps with the bundled agent skills, and how AI agents use your apps as tools over MCP.
keywords: ai agents, coding agents, agent-native, agent skills, streamlit skills, claude code, cursor, codex, mcp, model context protocol, agent api, ai tools, llm
---

# Build with AI agents

Streamlit is the agent-native data app framework. Agents build each app in plain, readable Python, and the people accountable for the numbers can review every line. Agents also take part in the rest of the app's life: they check their own work, keep the app running as requirements change, and use the finished app as a tool.

<InlineCalloutContainer>
    <InlineCallout
        color="indigo-70"
        icon="smart_toy"
        bold="Build with coding agents"
        href="/develop/concepts/ai-agents/coding-agents"
    >explains how to set up Claude Code, Cursor, Codex, Snowflake CoCo, and other coding agents with Streamlit's bundled expert skills, how to prompt them, and how they check their work without a browser.</InlineCallout>
    <InlineCallout
        color="indigo-70"
        icon="hub"
        bold="Agent-accessible apps"
        href="/develop/concepts/ai-agents/agent-access"
    >explains how AI agents use your Streamlit app as a tool over MCP or HTTP, through the same logic as the browser and with no more access. Connect your app to Claude, ChatGPT, Cursor, VS Code, Snowflake CoCo, or any MCP client.</InlineCallout>
</InlineCalloutContainer>

## Why agents build Streamlit apps well

- **A compact API that models already know.** More than a million public repositories depend on Streamlit, so models have seen many Streamlit apps and know its API well.
- **Expert skills in every release.** The bundled agent skills are written by the team that builds Streamlit and match the version you installed, so agents write for the version you actually run.
- **One layer instead of three.** An app is plain Python, with no frontend, backend, or API contract between them. That's a fraction of the code a custom stack needs, so it takes fewer tokens to write and has fewer places to break.
- **Batteries included.** Widgets, charts, data tables, forms, layouts, navigation, state, caching, sign-in, theming, chat, and testing are built in and work together. Agents don't pick a different combination of libraries on every run.
- **Checks without a browser.** Agents drive the running app over HTTP and read tables, charts, and metrics back as data. They can also leave behind [`AppTest`](/develop/concepts/app-testing) tests that run in CI.
- **Stable for years.** Breaking changes are extremely rare, so the apps agents build keep running on new releases, and every upgrade makes them better.

## Write your business logic once

A Streamlit app packages the queries, the calculations, the definitions, and the rules about who may see what. People use it in the browser. Agents use it as a tool, with the same numbers, and with no more access than the browser. A custom stack needs a UI and a separate API for the same result, both built, secured, and kept in sync. With Streamlit, you can ask your forecast app what happens at a 5% price increase, or let an agent fill in an approval form for your review.
