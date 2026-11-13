---
title: Build with coding agents
slug: /develop/concepts/ai-agents/coding-agents
description: Set up Claude Code, Cursor, Codex, and other coding agents to build Streamlit apps. Install Streamlit's bundled, version-matched agent skills with one command, write prompts that load them, and let agents check the running app and leave tests behind.
keywords: coding agents, ai coding, claude code, cursor, codex, copilot, agent skills, streamlit skills, AGENTS.md, prompts, vibe coding, ai generated apps, app testing, agent api, verify app
---

# Build with coding agents

Coding agents now write most data apps. Streamlit gives them a compact API they already know, expert skills that ship with every release, and a way to check the running app without a browser. This guide shows how to set up your agent and get the most out of it.

## Install the agent skills

Streamlit ships expert skills for coding agents, written by the team that builds Streamlit. They cover building, styling, speeding up, testing, and deploying apps: layouts and theming, dashboards, caching and performance, editable tables, chat interfaces, custom components, and Snowflake. They also include ready-made app templates and themes.

Run this command once in your project:

```bash
streamlit skills
```

It links the skills into your project's `.agents/skills/` and `.claude/skills/` folders, so Claude Code and agents that read the shared `.agents` skills folder find them. The links point into your Streamlit installation, so the skills always match the version you have installed. When you upgrade Streamlit, your agent gets the updated skills too.

To install the skills once for every project on your machine, use `streamlit skills --global`. For all options, see [`streamlit skills`](/develop/api-reference/cli/skills).

<Tip>

When an app hits an error, Streamlit itself offers to install the skills for you.

</Tip>

## Ask for Streamlit

Agents load the skills reliably when your request mentions Streamlit, or when you invoke the skill directly. For example:

- "Build a Streamlit dashboard that shows weekly revenue by region, with a date filter and a drill-down table."
- "Turn this notebook into a Streamlit app with what-if sliders for price and demand."
- "Add a Streamlit page where reviewers can edit flagged rows and approve them."
- "Use the developing-with-streamlit skill to make this app faster."

With the skills, agents apply Streamlit's best practices by default: the modern theme, Material icons, native elements instead of custom HTML, compact layouts, caching for slow queries, and fragments for parts of the page that update on their own.

## Let agents check their own work

An agent should confirm that a change works before it reports the change as done. Streamlit gives agents two ways to check an app without a browser or screenshots.

### Check the running app

The experimental agent API lets an agent drive the running app over HTTP. The agent sends widget values as JSON and gets back the finished page as a tree of elements named after the `st.*` commands that produced them. Tables, charts, and metrics come back as data, so the agent can confirm that the numbers changed after an edit.

Start the app with the agent API turned on, bound to your local machine:

```bash
streamlit run app.py --server.headless=true --server.address=127.0.0.1 --server.enableAgentApi=true
```

The bundled skills teach agents the rest of the workflow. To connect an IDE agent through MCP instead of HTTP, see [Agent-accessible apps](/develop/concepts/ai-agents/agent-access).

### Leave tests behind

For checks that should outlive the session, agents write tests with [`AppTest`](/develop/concepts/app-testing), Streamlit's headless testing framework. `AppTest` runs your app script in process, sets widget values, and inspects the output, so the tests run quickly with `pytest` and in CI:

```python
from streamlit.testing.v1 import AppTest

def test_region_filter():
    at = AppTest.from_file("app.py").run()
    at.selectbox(key="region").select("Europe").run()
    assert not at.exception
    assert at.metric[0].value == "€1.2M"
```

A typical loop is to edit the app, check it with the agent API, and then keep the checks that matter as `AppTest` tests.

## Keep apps healthy over time

Generating an app is cheap. Owning it isn't. Streamlit keeps the cost of owning many agent-built apps low:

- **The reviewer is the new primary user.** Agents write the code, and you answer for it. A Streamlit app keeps the query, the logic, and the number on screen side by side in plain Python, so the people accountable for it can actually read it.
- **Upgrades, not migrations.** Breaking changes are extremely rare. Bump one version, and every app gets new features, performance improvements, and security fixes, without per-app framework migrations.
- **One experience everywhere.** Agents style every app with the same [theme](/develop/concepts/configuration/theming), and filtering, sorting, editing, and navigating work the same way in every app.
- **Always-current guidance.** The skills improve with every release, so every app that agents build or change afterward improves too.
