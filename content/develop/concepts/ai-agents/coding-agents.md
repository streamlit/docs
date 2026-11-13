---
title: Build with coding agents
slug: /develop/concepts/ai-agents/coding-agents
description: Set up Claude Code, Cursor, Codex, Snowflake CoCo, and other coding agents to build Streamlit apps. Install Streamlit's bundled, version-matched agent skills with one command, write prompts that load them, and let agents check the running app and leave tests behind.
keywords: coding agents, ai coding, claude code, cursor, codex, copilot, agent skills, streamlit skills, AGENTS.md, prompts, vibe coding, ai generated apps, app testing, agent api, verify app
---

# Build with coding agents

Coding agents write a growing share of data apps. Streamlit gives them a compact API they already know, expert skills that ship with every release, and a way to check the running app without a browser. This guide shows how to set up your agent and get the most out of it.

## Install the agent skills

Streamlit ships expert skills for coding agents, written by the team that builds Streamlit. They cover building, styling, speeding up, and testing apps: layouts and theming, dashboards, caching and performance, editable tables, chat interfaces, custom components, and Snowflake connections. They also include ready-made app templates and themes.

Run this command once in your project:

```bash
streamlit skills
```

It links the skills into your project's `.agents/skills/` folder, which Cursor, Codex, and other agents read. If Claude Code is installed on your machine, it also links them into `.claude/skills/`. The links point into your Streamlit installation, so the skills always match the version you have installed. When you upgrade Streamlit, your agent gets the updated skills too. Because the links point into your local installation, don't commit them to git. The command prints a `.gitignore` snippet for them.

If you use Snowflake CoCo, you don't need to run the command: CoCo includes the `developing-with-streamlit` skill among its [bundled skills](https://docs.snowflake.com/en/user-guide/cortex-code/bundled-skills).

- **When your agent runs the command.** An agent's shell isn't an interactive terminal, so it needs `streamlit skills --yes` to skip the confirmation prompt.
- **On Windows.** Creating links in your project requires Developer Mode. Without it, the command installs the skills globally instead.
- **For every project.** To install the skills once for every project on your machine, use `streamlit skills --global`.

For all options, see [`streamlit skills`](/develop/api-reference/cli/skills).

<Tip>

When you run an app locally and a coding agent is installed on your machine, Streamlit can suggest installing the skills.

</Tip>

## Invoke the skill

To make sure your agent uses the skills, invoke the `developing-with-streamlit` skill explicitly. In Claude Code, start your request with `/developing-with-streamlit`:

```text
/developing-with-streamlit Build a dashboard that shows weekly revenue by region, with a date filter and a drill-down table.
```

Other agents have their own syntax for invoking a skill, or you can name it in your request, such as "Use the developing-with-streamlit skill to make this app faster."

Agents also load the skills when your request mentions Streamlit, but less reliably. For example:

- "Build a Streamlit dashboard that shows weekly revenue by region, with a date filter and a drill-down table."
- "Turn this notebook into a Streamlit app with what-if sliders for price and demand."
- "Add a Streamlit page where reviewers can edit flagged rows and approve them."

The skills teach agents Streamlit's best practices, such as native elements instead of custom HTML, Material icons instead of emoji, caching for slow queries, fragments for parts of the page that update on their own, and checking each change in the running app.

## Modernize an existing app

Apps written for older Streamlit versions keep running, and a coding agent can also bring them up to date, so they load faster and look more modern. Upgrade Streamlit, run `streamlit skills`, and ask your agent:

```text
/developing-with-streamlit Modernize my app
```

The agent first analyzes the whole app and shows you a short plan that names the riskiest changes, such as moving to `st.navigation`. After you confirm, it:

- **Applies current best practices.** It replaces deprecated APIs, and custom HTML and third-party components that native commands now cover, and fixes copy and accessibility, such as sentence casing, Material icons, and missing labels.
- **Speeds up the app.** It adds caching with background refresh, loading skeletons, parallel fragments, and forms where they help.
- **Adopts newer features where they fit.** For example, `st.navigation`, `st.segmented_control` and `st.pills`, `st.menu_button`, side-drawer dialogs, `ButtonColumn`, and `bind="query-params"` for shareable views.
- **Refreshes the layout and look.** It uses bordered containers, `st.grid`, and aligned rows, and keeps your brand theme or adds one that fits the app.
- **Organizes the code.** It splits a large single-file app into modules where that helps.

The agent keeps your features, widget keys, query parameters, page URLs, and data logic intact, and checks every page in the running app with the agent API. Review the changes like any other code.

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

For checks that should outlive the session, ask your agent to write tests with [`AppTest`](/develop/concepts/app-testing), Streamlit's headless testing framework. `AppTest` runs your app script in process, sets widget values, and inspects the output, so the tests run quickly with `pytest` and in CI:

```python
from streamlit.testing.v1 import AppTest

def test_region_filter():
    at = AppTest.from_file("app.py").run()
    at.selectbox(key="region").select("EMEA").run()
    assert not at.exception
    assert at.metric[0].value == "€1.2M"
```

A typical loop is to edit the app, check it with the agent API, and then keep the checks that matter as `AppTest` tests.

## Keep apps healthy over time

Generating an app is cheap. Owning it isn't. Streamlit keeps the cost of owning many agent-built apps low:

- **The reviewer is the new primary user.** Agents write the code, and you answer for it. A Streamlit app keeps the query, the logic, and the number on screen side by side in plain Python, so the people accountable for it can actually read it.
- **Upgrades, not migrations.** Breaking changes are extremely rare. Bump one version, and every app gets new features, performance improvements, and security fixes, without per-app framework migrations.
- **One experience everywhere.** Share one [theme](/develop/concepts/configuration/theming) across all your apps, and filtering, sorting, editing, and navigating work the same way in every app.
- **Always-current guidance.** The skills improve with every release, so every app that agents build or change afterward improves too.
