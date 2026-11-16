---
title: Build LLM apps
slug: /develop/tutorials/chat-and-llm-apps
description: Learn to build LLM applications with Streamlit including conversational apps, chat interfaces, response feedback, and response revision features.
keywords: LLM apps, conversational apps, chat applications, chat interfaces, response feedback, response revision, AI applications, LLM tutorials
---

# Build LLM apps

Build AI assistants right into your data apps, answering questions over your data. Streamlit has chat with [`st.chat_input`](/develop/api-reference/chat/st.chat_input) and [`st.chat_message`](/develop/api-reference/chat/st.chat_message), streaming responses with [`st.write_stream`](/develop/api-reference/write-magic/st.write_stream), step-by-step progress with [`st.status`](/develop/api-reference/status/st.status) and [`st.expander`](/develop/api-reference/layout/st.expander) (`type="step"` or `type="compact"`), and feedback on answers with [`st.feedback`](/develop/api-reference/widgets/st.feedback). Connect them to any model or agent framework, or to Cortex AI in Snowflake. Your apps can also serve other AI agents as tools over MCP. For details, see [Agent-accessible apps](/develop/concepts/ai-agents/agent-access).

<TileContainer layout="list">

<RefCard href="/develop/tutorials/llms/build-conversational-apps">

<h5>Build a basic chat app</h5>

Build a simple OpenAI chat app to get started with Streamlit's chat elements.

</RefCard>

<RefCard href="/develop/tutorials/llms/llm-quickstart">

<h5>Build an LLM app using LangChain</h5>

Build a chat app using the LangChain framework with OpenAI.

</RefCard>

<RefCard href="/develop/tutorials/chat-and-llm-apps/chat-response-feedback">

<h5>Get chat response feedback</h5>

Buid a chat app and let users rate the responses.
(<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>thumb_up</i>
<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>thumb_down</i>)

</RefCard>

<RefCard href="/develop/tutorials/chat-and-llm-apps/validate-and-edit-chat-responses">

<h5>Validate and edit chat responses</h5>

Build a chat app with response validation. Let users correct or edit the responses.

</RefCard>

</TileContainer>
