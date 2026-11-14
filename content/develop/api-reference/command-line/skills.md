---
title: streamlit skills
slug: /develop/api-reference/cli/skills
description: streamlit skills installs Streamlit's bundled, version-matched expert skills for AI coding agents such as Claude Code, Cursor, Codex, and Snowflake CoCo, so they build Streamlit apps with current APIs and best practices.
keywords: streamlit skills, cli, command line, ai agent, coding agent, skills, install skills, agent skills, claude code, cursor, codex, .agents, .claude
---

## `$ streamlit skills`

This command installs Streamlit's expert skills for AI coding agents. The skills are written by the team that builds Streamlit and ship with every release. They cover building, styling, speeding up, and testing apps, including layouts and theming, dashboards, caching, editable tables, chat interfaces, custom components, and Snowflake connections, and they include app templates and themes.

After you install the skills, invoke the `developing-with-streamlit` skill explicitly to make sure your agent uses it, such as with `/developing-with-streamlit` in Claude Code. Agents also load the skill when your request mentions Streamlit, but less reliably. To bring an older app up to date, ask your coding agent: `/developing-with-streamlit Modernize my app`. For a full guide, see [Build with coding agents](/develop/concepts/ai-agents/coding-agents).

### Syntax

```
streamlit skills [OPTIONS]
```

### Options

| Option           | Description                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ |
| `-g`, `--global` | Install globally in the user directory, making skills available across all projects. |
| `-y`, `--yes`    | Skip confirmation prompts (non-interactive install).                                 |

### Description

By default, `streamlit skills` runs in **project mode**: it creates symlinks from `.agents/skills/` and `.claude/skills/` to the bundled skills in your Streamlit installation. Skills stay in sync automatically when Streamlit is upgraded.

With `--global`, it installs a meta skill to the user directory that is available across all projects.

### Examples

- Install skills for your current project (interactive):

  ```bash
  streamlit skills
  ```

- Install skills globally across all projects (interactive):

  ```bash
  streamlit skills --global
  ```

- Install skills for your current project without confirmation prompts:

  ```bash
  streamlit skills --yes
  ```

- Install skills globally without confirmation prompts:

  ```bash
  streamlit skills -g -y
  ```
