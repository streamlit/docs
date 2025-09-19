---
title: Collect user feedback about LLM responses
slug: /develop/tutorials/chat-and-llm-apps/chat-response-feedback
description: Learn to collect user feedback on LLM responses in Streamlit chat apps using st.feedback widget for sentiment collection and response improvement.
keywords: user feedback, LLM responses, st.feedback, sentiment collection, chat apps, response feedback, user sentiment, chat interface, feedback collection
---

# Collect user feedback about LLM responses

A common task in a chat app is to collect user feedback about an LLM's responses. Streamlit includes `st.feedback` to conveniently collect user sentiment by displaying a group of selectable sentiment icons.

This tutorial uses Streamlit's chat commands and `st.feedback` to build a simple chat app that collects user feedback about each response.

## Applied concepts

- Use `st.chat_input` and `st.chat_message` to create a chat interface.
- Use `st.feedback` to collect user sentiment about chat responses.

## Prerequisites

- This tutorial requires the following version of Streamlit:

  ```text
  streamlit>=1.42.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of [Session State](/develop/concepts/architecture/session-state).

## Summary

In this example, you'll build a chat interface. To avoid API calls, the chat app will echo the user's prompt within a fixed response. Each chat response will be followed by a feedback widget where the user can vote "thumb up" or "thumb down." In the following code, a user can't change their feedback after it's given. If you want to let users change their rating, see the optional instructions at the end of this tutorial.

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

```python
import streamlit as st
import time


def chat_stream(prompt):
    response = f'You said, "{prompt}" ...interesting.'
    for char in response:
        yield char
        time.sleep(0.02)


def save_feedback(index):
    st.session_state.history[index]["feedback"] = st.session_state[f"feedback_{index}"]


if "history" not in st.session_state:
    st.session_state.history = []

for i, message in enumerate(st.session_state.history):
    with st.chat_message(message["role"]):
        st.write(message["content"])
        if message["role"] == "assistant":
            feedback = message.get("feedback", None)
            st.session_state[f"feedback_{i}"] = feedback
            st.feedback(
                "thumbs",
                key=f"feedback_{i}",
                disabled=feedback is not None,
                on_change=save_feedback,
                args=[i],
            )

if prompt := st.chat_input("Say something"):
    with st.chat_message("user"):
        st.write(prompt)
    st.session_state.history.append({"role": "user", "content": prompt})
    with st.chat_message("assistant"):
        response = st.write_stream(chat_stream(prompt))
        st.feedback(
            "thumbs",
            key=f"feedback_{len(st.session_state.history)}",
            on_change=save_feedback,
            args=[len(st.session_state.history)],
        )
    st.session_state.history.append({"role": "assistant", "content": response})
```

</Collapse>

<Cloud name="doc-tutorial-chat-response-feedback" height="600px" />

## Build the example

### Initialize your app

1. In `your_repository`, create a file named `app.py`.
1. In a terminal, change directories to `your_repository`, and start your app:

   ```bash
   streamlit run app.py
   ```

   Your app will be blank because you still need to add code.

1. In `app.py`, write the following:

   ```python
   import streamlit as st
   import time
   ```

   You'll use `time` to build a simulated chat response stream.

1. Save your `app.py` file, and view your running app.
1. In your app, select "**Always rerun**", or press the "**A**" key.

   Your preview will be blank but will automatically update as you save changes to `app.py`.

1. Return to your code.

### Build a function to simulate a chat response stream

To begin, you'll define a function to stream a fixed chat response. You can skip this section if you just want to copy the function.

<Collapse title="Complete function to simulate a chat stream" expanded={false}>

```python
def chat_stream(prompt):
    response = f'You said, "{prompt}" ...interesting.'
    for char in response:
        yield char
        time.sleep(0.02)
```

</Collapse>

1. Define a function which accepts a prompt and formulates a response:

   ```python
   def chat_stream(prompt):
       response = f'You said, "{prompt}" ...interesting.'
   ```

1. Loop through the characters and yield each one at 0.02-second intervals:

   ```python
       for char in response:
           yield char
           time.sleep(.02)
   ```

You now have a complete generator function to simulate a chat stream object.

### Initialize and render your chat history

To make your chat app stateful, you'll save the conversation history into Session State as a list of messages. Each message is a dictionary of message attributes. The dictionary keys include the following:

- `"role"`: Indicates the source of the message (either `"user"` or `"assistant"`).
- `"content"`: The body of the message as a string.
- `"feedback"`: An integer that indicates a user's feedback. This is only included when the message role is `"assistant"` because users do not leave feedback on their own prompts.

1. Initialize the chat history in Session State:

   ```python
   if "history" not in st.session_state:
       st.session_state.history = []
   ```

1. Iterate through the messages in your chat history and render their contents in chat message containers:

   ```python
   for i, message in enumerate(st.session_state.history):
       with st.chat_message(message["role"]):
           st.write(message["content"])
   ```

   In a later step, you'll need a unique key for each assistant message. You can use the index of the message in your chat history to create a unique key. Therefore, use `enumerate()` to get an index along with each message dictionary.

1. For each assistant message, check whether feedback has been saved:

   ```python
           if message["role"] == "assistant":
               feedback = message.get("feedback", None)
   ```

   If no feedback is saved for the current message, the `.get()` method will return the specified default of `None`.

1. Save the feedback value into Session State under a unique key for that message:

   ```python
               st.session_state[f"feedback_{i}"] = feedback
   ```

   Because the message index within the ordered chat history is unique, you can use the index as the key. For readability, you can add a prefix, "feedback\_", to the index. In the next step, to make the feedback widget show this value, you'll assign the same key to the widget.

1. Add a feedback widget to the chat message container:

   ```python
               st.feedback(
                   "thumbs",
                   key=f"feedback_{i}",
                   disabled=feedback is not None,
               )
   ```

   The code you've written so far will show the chat history. If a user has already rated a message in the chat history, the feedback widget will show the rating and be disabled. The user won't be able to change their rating.

   All unrated messages include an enabled feedback widget. However, if a user interacts with one of those widgets, there is no code to save that information into the chat history yet. To solve this, use a callback as shown in the following steps.

1. At the top of your app, after the definition of `chat_stream()` and before you initialize your chat history, define a function to use as a callback:

   ```python
   def save_feedback(index):
       st.session_state.history[index]["feedback"] = st.session_state[f"feedback_{index}"]
   ```

   The `save_feedback()` function accepts an index and uses the index to get the associated widget value from Session State. Then, this value is saved into chat history.

1. Add the callback and index argument to your `st.feedback` widget:

   ```diff
               st.feedback(
                   "thumbs",
                   key=f"feedback_{i}",
                   disabled=feedback is not None,
   +               on_change=save_feedback,
   +               args=[i],
               )
   ```

   When a user interacts with the feedback widget, the callback will update the chat history before the app reruns.

### Add chat input

1. Accept the user's prompt from an `st.chat_input` widget, display it in a chat message container, and then save it to the chat history:

   ```python
   if prompt := st.chat_input("Say something"):
       with st.chat_message("user"):
           st.write(prompt)
       st.session_state.history.append({"role": "user", "content": prompt})
   ```

   The `st.chat_input` widget acts like a button. When a user enters a prompt and clicks the send icon, it triggers a rerun. During the rerun, the previous code displays the chat history. When this conditional block is executed, the user's new prompt is displayed and then added to the history. On the next rerun, this prompt will be displayed as part of the history.

   The `:=` notation is shorthand to assign a variable within an expression. The following code is equivalent to the previous code in this step:

   ```python
   prompt = st.chat_input("Say something")
   if prompt:
       with st.chat_message("user"):
           st.write(prompt)
       st.session_state.history.append({"role": "user", "content": prompt})
   ```

1. In another chat message container, process the prompt, display the response, add a feedback widget, and append the response to the chat history:

   ```python
      with st.chat_message("assistant"):
          response = st.write_stream(chat_stream(prompt))
          st.feedback(
              "thumbs",
              key=f"feedback_{len(st.session_state.history)}",
              on_change=save_feedback,
              args=[len(st.session_state.history)],
          )
      st.session_state.history.append({"role": "assistant", "content": response})
   ```

   This is the same pattern used for the user's prompt. Within the body of the conditional block, the response is displayed and then added to the history. On the next rerun, this response will be displayed as a part of the chat history.

   When Streamlit executes the `st.feedback` command, the response is not yet added to the chat history. Use an index equal to the length of the chat history because that is the index that the response will have when it's added to the chat history on the next line.

1. Save your file and go to your browser to try your new app.

### Optional: Change the feedback behavior

Your app currently allows users to rate any response once. They can submit their rating at any time, but can't change it.

If you want users to rate only the _most recent_ response, you can remove the widgets from the chat history:

```diff
  for i, message in enumerate(st.session_state.history):
      with st.chat_message(message["role"]):
          st.write(message["content"])
-         if message["role"] == "assistant":
-             feedback = message.get("feedback", None)
-             st.session_state[f"feedback_{i}"] = feedback
-             st.feedback(
-                 "thumbs",
-                 key=f"feedback_{i}",
-                 disabled=feedback is not None,
-                 on_change=save_feedback,
-                 args=[i],
-             )
```

Or, if you want to allow users to change their responses, you can just remove the `disabled` parameter:

```diff
  for i, message in enumerate(st.session_state.history):
      with st.chat_message(message["role"]):
          st.write(message["content"])
          if message["role"] == "assistant":
              feedback = message.get("feedback", None)
              st.session_state[f"feedback_{i}"] = feedback
              st.feedback(
                  "thumbs",
                  key=f"feedback_{i}",
-                 disabled=feedback is not None,
                  on_change=save_feedback,
                  args=[i],
              )
```
