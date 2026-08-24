---
title: streamlit skills
slug: /develop/api-reference/cli/skills
description: streamlit skills installs bundled Streamlit AI-agent skills to help AI agents build better Streamlit apps.
keywords: streamlit skills, cli, command line, ai agent, skills, install skills, agent skills
---

## `$ streamlit skills`

This command installs Streamlit AI-agent skills to help AI agents build better Streamlit apps.

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
