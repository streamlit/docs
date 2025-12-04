---
title: Overview of custom components
slug: /develop/concepts/custom-components/overview
description: Understand what Streamlit custom components are, when to use them, and compare the v1 and v2 approaches for building interactive extensions.
keywords: custom components overview, component comparison, v1 vs v2, component capabilities, when to use components, component architecture
---

# Overview of custom components

Custom components are like plugins for Streamlit that unlock capabilities beyond the built-in features. They let you integrate any web technology directly into your Streamlit app. You can create single-use custom components in your app, or package a custom component to share.

Custom components can help you in the following situations:

- **Built-in widgets don't meet your needs** - You need functionality that Streamlit's standard widgets can't provide.
- **You want to integrate existing web tools** - You have JavaScript libraries or web components you want to use.
- **You need complex interactions** - Your use case requires bidirectional communication or complex state management.
- **You're building reusable functionality** - You want to package and share functionality across multiple apps or with the community.

## Components v2 (recommended)

Custom components v2 is the modern, recommended approach for building custom components in Streamlit. It represents a complete reimagining of how components work. It's designed to unlock new capabilities and dramatically simplify development.

Custom components v2 include the following benefits:

- **No iframe isolation** - Components are part of the Streamlit page, not isolated sandboxes.
- **Multiple callback support** - You can pass multiple callbacks to a component for rich interactions.
- **Stateful and event-based values** - Components have both state and event-based trigger values.
- **Rich data exchange** - Components automatically handle JSON and dataframe (Apache Arrow) serialization.
- **Simpler development and rapid prototyping** - You can provide HTML, CSS, and JavaScript directly from Python or build a package with TypeScript.
- **Bidirectional communication** - Convenient utilities make bidirectional communication easy.
- **Seamless Theme Integration** - Components automatically inherit Streamlit's theme through CSS custom properties.

## Components v1 (legacy)

Components v1 is the original framework that has been stable and widely used since 2020. While components v2 is now the recommended approach, components v1 remains supported for existing components.

V1 components have the following key differences from v2 components:

- **Iframe isolation** - Components run in isolated iframes for security.
- **Primarily unidirectional communication** - The API is less optimatized for bidirectional communication.
- **Mature ecosystem** - Many existing components and templates use the v1 architecture.

## Comparing components v1 and v2

| Feature              | Components v2 **Recommended**              | Components v1            |
| -------------------- | ------------------------------------------ | ------------------------ |
| **Communication**    | Full bidirectional with multiple callbacks | Primarily unidirectional |
| **Isolation**        | Integrated with page                       | Iframe-based             |
| **Data exchange**    | Rich formats (JSON, Arrow, bytes)          | Basic JSON               |
| **Development**      | Inline or package-based                    | Template-based           |
| **State management** | Full state and trigger support             | Limited                  |
| **Prototyping**      | Immediate with inline approach             | Requires setup           |
| **Best for**         | New projects and modern features           | Existing components      |
