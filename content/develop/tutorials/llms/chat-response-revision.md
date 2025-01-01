---
title: Validate and edit chat responses
slug: /develop/tutorials/chat-and-llm-apps/validate-and-edit-chat-responses
---

# Validate and edit chat responses

As you train LLM models, you may want users to correct or improve chat responses. With Streamlit, you can build a chat app that lets users improve chat responses.

This tutorial uses Streamlit's chat commands to build a simple chat app that lets users modify chat responses to improve them.

## Applied concepts

- Use `st.chat_input` and `st.chat_message` to create a chat interface.
- Use Session State to manage stages of a process.

## Prerequisites

- The following must be installed in your Python environment:

  ```text
  streamlit>=1.24.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of Session State.

## Summary

In this example, you'll build a chat interface. To avoid API calls, the app will include a generator function to simulate a chat stream object. When the chat assistant "responds," a validation function evaluates the response and highlights possible "errors" for the user to review. The user must accept, correct, or rewrite the response before proceeding.

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

```python

```

</Collapse>

<Cloud name="doc-tutorial-chat-response-feedback" height="600px" />

## Build the example

### Initialize your app

1. In `your_repository`, create a file named `app.py`.
1. In a terminal, change directories to `your_repository` and start your app.

   ```bash
   streamlit run app.py
   ```

   Your app will be blank since you still need to add code.

1. In `app.py`, write the following:

   ```python
   import streamlit as st
   import lorem
   from random import randint
   import time
   ```

   You'll use `lorem`, `random`, and `time` to build a simulated chat response stream.

1. Save your `app.py` file and view your running app.
1. In your browser, view your app, and click "**Always rerun**" or hit your "**A**" key.

   Your running preview will automatically update as you save changes to `app.py`. Your preview will still be blank. Return to your code.

### Build a function to simulate a chat response stream

To begin with, you'll define a function to stream a random chat response. The simulated chat stream will use `lorem` to generate four to ten random "sentences."

<Collapse title="Complete function to simulate a chat stream" expanded={false}>

```python
def chat_stream():
    for i in range(randint(3, 9)):
        yield lorem.sentence() + " "
        time.sleep(0.2)
```

</Collapse>

1. Start a function for your simulated chat stream.

   ```python
   def chat_stream():
   ```

1. Create a loop that executes four to ten times.

   ```python
   for i in range(randint(3, 9)):
   ```

1. Within the loop, yield a random sentence from `lorem` with a space at the end.

   ```python
       yield lorem.sentence() + " "
       time.sleep(0.2)
   ```

   In order to create a streaming effect, use `time.sleep` to create a small delay between yields.

You now have a complete generator function to simulate a chat stream object.

### Create a validation function

The app will "validate" the streamed responses to assist users in identifying possible errors. To evaluate a response, you'll create a list of its sentences. Any sentence with fewer than five words will be marked as a potential error. This is an arbitrary standard applied for the sake of illustration.

1. Define a function that accepts a string response and breaks it apart into segments.

   ```python
   def validate(response):
       response_segments = response.split(". ")
   ```

1. Strip the segments of leading and trailing spaces and periods, and then restore a period to the end.

   ```python
       response_segments = [
           segment.strip(". ") + "."
           for segment in response_segments
           if segment.strip(". ") != ""
       ]
   ```

   Since the user will be modifying responses, `segment.strip(". ") + "."` removes leading and trailing spaces and periods. It also ensures each sentence ends with a single period. As added protection, `if segment.strip(". ") != ""` discards any empty sentences. This simple example doesn't address other punctuation that may terminate a sentence.

1. Create a boolean list of corresponding evaluations for the sentences. Use `True` for an approved sentence, and `False` for an unapproved sentence.

   ```python
       validation_list = [
           True if sentence.count(" ") > 4 else False for sentence in response_segments
       ]
   ```

   As stated before, a "good" sentence has at least five words. Use list comprehension to count the spaces in the sentence.

1. Finally, return the segment and validation lists as a tuple.

   ```python
       return response_segments, validation_list
   ```

### Create a helper function to highlight text

To show your validation results to your user, you can highlight sentences that are flagged for review. Create a helper function to add text and background color to the "errors."

1. Define a function that accepts the list of sentences and list of evaluations.

   ```python
   def add_highlights(response_segments, validation_list, bg="red", text="red"):
   ```

   For convenience, add parameters to set the text and background color, using a default of `"red"`. You'll use the function to highlight all errors in red immediately after validation. If the user chooses to step through the errors one by one, you'll highlight the errors in gray and show only one error in red.

1. Use list comprehension to return a modified list of sentences that include the Markdown highlights.

   ```python
       return [
           f":{text}[:{bg}-background[" + segment + "]]" if not is_valid else segment
           for segment, is_valid in zip(response_segments, validation_list)
       ]
   ```

### Initialize and render your chat history

Your app will use Session State to track the stages of the evaluation and correction process.

1. Initialize Session State.

   ```python
   if "stage" not in st.session_state:
       st.session_state.stage = "user"
       st.session_state.history = []
       st.session_state.pending = None
       st.session_state.validation = {}
   ```

   - `st.session_state.stage` tracks where the user is in the multistage process. `"user"` means that the app is waiting for the user to enter a new prompt. Other values are `"validate"`, `"correct"`, and `"rewrite"`, which will be defined later.
   - `st.session_state.history` stores the conversation history as a list of messages. Each message is a dictionary of message attributes (`"role"` and `"content"`).
   - `st.session_state.pending` stores the next response before it is approved.
   - `st.session_state.validation` stores the evaluation information for the pending response. This is dictionary with keys `"segments"` and `"valid"` to store the lists of sentences and their evaluation, respectively.

1. Iterate through the messages in your chat history and render their contents in chat message containers.

   ```python
   for message in st.session_state.history:
       with st.chat_message(message["role"]):
           st.write(message["content"])
   ```

### Define the `"user"` stage

When `st.session_state.stage` is `"user"`, the app is waiting for a new prompt.

1. Start a conditional block for the `"user"` stage.

   ```python
   if st.session_state.stage == "user":
   ```

1. Render a chat input widget and start a nested conditional block for its output.

   ```python
       if user_input := st.chat_input("Enter a prompt"):
   ```

   This nested block won't execute until a user submits a prompt so this is effectively the end of the script before the user enters a prompt.

   The `:=` notation is shorthand to assign a variable within an expression.

1. Append the user prompt to the chat history and render it in a chat message container.

   ```python
           st.session_state.history.append({"role": "user", "content": user_input})
           with st.chat_message("user"):
               st.write(user_input)
   ```

1. After the user's chat message container, render the chat response in another chat message container. After the message is done streaming, save the pending message in Session State.

   ```python
           with st.chat_message("assistant"):
               response = st.write_stream(chat_stream())
               st.session_state.pending = response
   ```

1. Update the stage to `"validate"` and rerun the app.

   ```python
               st.session_state.stage = "validate"
               st.rerun()
   ```

   When a user submits a new prompt, the script run will end here and a new one will begin. The next script run will use the `"validate"` stage which you'll build in the next section.

### Define the `"validate"` stage

When `st.session_state.stage` is `"validate"`, the app will validate the pending response and dispaly the results to the user. The user will then choose how to proceed (accept, correct, or rewrite the response).

1. Start a conditional block for the `"validate"` stage.

   ```python
   elif st.session_state.stage == "validate":
   ```

1. Display a disabled chat input for visual consistency.

   ```python
       st.chat_input("Accept, correct, or rewrite the answer above.", disabled=True)
   ```

   For the user's clarify, use placeholder to inform the user to review the pending response.

1. Parse the response and highlight any errors using your helper functions.

   ```python
       response_segments, validation_list = validate(st.session_state.pending)
       highlighted_segments = add_highlights(response_segments, validation_list)
   ```

1. Join the highlighted response segments and display them in a chat message container. To separate the response from the buttons that will follow, add a divider.

   ```python
       with st.chat_message("assistant"):
           st.markdown(" ".join(highlighted_segments))
           st.divider()
   ```

1. To display the buttons in a row, create three columns.

   ```python
           cols = st.columns(3)
   ```

1. In the first column, start a conditional block and display a primary-type button to correct any errors. Disable the button if there are no detected errors.

   ```python
           if cols[0].button(
               "Correct errors", type="primary", disabled=all(validation_list)
           ):
   ```

1. Within the conditional block, save the validation information into Session State, update the stage, and then rerun the app.

   ```python
               st.session_state.validation = {
                   "segments": response_segments,
                   "valid": validation_list,
               }
               st.session_state.stage = "correct"
               st.rerun()
   ```

   If the user clicks the "**Correct**" button, the app will rerun and execute this block. At the end of this block, the app will rerun again and enter the `"correct"` stage.

1. In the second column, start a conditional block and display a button to accept the response as-is.

   ```python
           if cols[1].button("Accept"):
   ```

1. Within the conditional block, save the pending message into the chat history, and clear the pending and validation information from Session State.

   ```python
               st.session_state.history.append(
                   {"role": "assistant", "content": st.session_state.pending}
               )
               st.session_state.pending = None
               st.session_state.validation = {}
   ```

1. Update the stage to `"user"`, and rerun the app.

   ```python
               st.session_state.stage = "user"
               st.rerun()
   ```

   If the user clicks the "**Accept**" button, the app will rerun and execute this block. At the end of this block, the app will rerun again and return to the `"user"` stage.

1. In the third column, start a conditional block and display a tertiary-type button to rewrite the response.

   ```python
           if cols[2].button("Rewrite answer", type="tertiary"):
   ```

1. Within the conditional block, update the stage to `"rewrite"` and rerun the app.

   ```python
               st.session_state.stage = "rewrite"
               st.rerun()
   ```

   If the user clicks the "**Rewrite answer**" button, the app will rerun and execute this conditional block. At the end of this block, the app will rerun again and enter the `"rewrite"` stage.

   You don't need to save any information into `st.session_state.validation` since the `"rewrite"` stage does not use this information.

### Define the `"correct"` stage

When `st.session_state.stage` is `"correct"`, the user can correct or accept the errors identified in `st.session_state.validation`. With each script run, the app highlights only the first error in the list. When a user addresses an error, it's removed from the list, and the next error becomes the first error for the next script run. This continues until all errors are cleared at which point the user can accept the result, return to the `"validate"` stage, or go to the `"rewrite"` stage.

1. Start a conditional block for the `"correct"` stage.

   ```python
   elif st.session_state.stage == "correct":
   ```

1. Display a disabled chat input for visual consistency.

   ```python
       st.chat_input("Accept, correct, or rewrite the answer above.", disabled=True)
   ```

1. For convenience, retrieve the validation information from Session State and save it into variables.

   ```python
       response_segments = st.session_state.validation["segments"]
       validation_list = st.session_state.validation["valid"]
   ```

1. Use your helper function to highlight the response segments with errors. Use gray for the highlight.

   ```python
       highlighted_segments = add_highlights(
           response_segments, validation_list, "gray", "gray"
       )
   ```

   In a following step, you'll change the highlight color for a single error for the user to address.

1. Check if there are any errors in `validation_list`. If there are errors, get the index of the first one, and replace the Markdown highlight for the associated response segment.

   ```python
       if not all(validation_list):
           focus = validation_list.index(False)
           highlighted_segments[focus] = ":red[:red" + highlighted_segments[focus][11:]
   ```

1. Set a fallback value for `focus` if there are no errors.

   ```python
       else:
           focus = None
   ```

1. In a chat message container, display the highlighted response. To separate the response from the buttons that will follow, add a divider.

   ```python
       with st.chat_message("assistant"):
           st.markdown(" ".join(highlighted_segments))
           st.divider()
   ```

1. Start a conditional block: if there are errors, display a text input for the user to edit the first one (which you highlighted in red in a preceding step).

   ```python
           if focus is not None:
               new_segment = st.text_input(
                   "Replacement text:", value=response_segments[focus]
               )
   ```

   `value=response_segments[focus]` prefills the text input with the response segment associated to `focus`. The user can edit it or replace the text entirely. You'll also add a button so they can choose to remove it.

1. To display buttons in a row, create two columns.

   ```python
               cols = st.columns(2)
   ```

1. In the first column, start a conditional block and display a primary-type button to update the response segment with the user's edits. Disable the button if text input is empty.

   ```python
               if cols[0].button(
                   "Update", type="primary", disabled=len(new_segment.strip()) < 1
               ):
   ```

1. Within the conditional block, update the response segment and mark it as valid in Session State.

   ```python
                   st.session_state.validation["segments"][focus] = (
                       new_segment.strip(". ") + "."
                   )
                   st.session_state.validation["valid"][focus] = True
   ```

1. Update the complete response in `st.session_state.pending` with the new, resultant response, and rerun the app.

   ```python
                   st.session_state.pending = " ".join(
                       st.session_state.validation["segments"]
                   )
                   st.rerun()
   ```

   If the user clicks the "**Update**" button, the app will rerun and execute this conditional block. At the end of this block, the app will rerun again and continue in the `"correct"` stage with the next error highlighted.

1. In the second column, start a conditional block and display a button to remove the response segment. Within the conditional block, pop response segment and validation information out of their lists in Session State, and rerun the app.

   ```python
               if cols[1].button("Remove"):
                   st.session_state.validation["segments"].pop(focus)
                   st.session_state.validation["valid"].pop(focus)
                   st.rerun()
   ```

   If the user clicks the "**Remove**" button, the app will rerun and execute this conditional block. At the end of this block, the app will rerun again and continue in the `"correct"` stage with the next error highlighted.

1. Define `else` for when there are no errors. To display buttons in a row, create two columns.

   ```python
           else:
               cols = st.columns(2)
   ```

   After a user has resolved all the errors, they need to confirm the final result.

1. In the first column, start a conditional block and display a primary-type button to accept the current response. Within the conditional block, save the pending message into the chat history, and clear the pending and validation information from Session State.

   ```python
               if cols[0].button("Accept", type="primary"):
                   st.session_state.history.append(
                       {"role": "assistant", "content": st.session_state.pending}
                   )
                   st.session_state.pending = None
                   st.session_state.validation = {}
   ```

1. Update the stage to `"user"`, and rerun the app.

   ```python
                   st.session_state.stage = "user"
                   st.rerun()
   ```

   If the user clicks the "**Accept**" button, the app will rerun and execute this block. At the end of this block, the app will rerun again and return to the `"user"` stage.

1. In the second column, start a conditional block and display a button to rewrite the response.

   ```python
               if cols[1].button("Re-validate"):
   ```

1. Within the conditional block, clear the validation information from Session State, update the stage to `"validate"`, and rerun the app.

   ```python
                   st.session_state.validation = {}
                   st.session_state.stage = "validate"
                   st.rerun()
   ```

   If the user clicks the "**Rewrite answer**" button, the app will rerun and execute this conditional block. At the end of this block, the app will rerun again and enter the `"rewrite"` stage.

### Define the `"rewrite"` stage

When `st.session_state.stage` is `"rewrite"`, the user can freely edit the response in a text area.

1. Start a conditional block for the `"rewrite"` stage.

   ```python
   elif st.session_state.stage == "rewrite":
   ```

1. Display a disabled chat input for visual consistency.

   ```python
       st.chat_input("Accept, correct, or rewrite the answer above.", disabled=True)
   ```

1. In a chat message container, display a text area input for the user to edit the pending response.

   ```python
       with st.chat_message("assistant"):
           new = st.text_area("Rewrite the answer", value=st.session_state.pending)
   ```

   `value=st.session_state.pending` prefills the text area input with the pending response. The user can edit it or replace the text entirely.

1. In the first column, start a conditional block and display a primary-type button to update the response with the user's edits. Disable the button if text area input is empty.

   ```python
           if st.button(
               "Update", type="primary", disabled=new is None or new.strip(". ") == ""
           ):
   ```

1. Within the conditional block, add the new response to the chat history, and clear the pending and validation information from Session State..

   ```python
               st.session_state.history.append({"role": "assistant", "content": new})
               st.session_state.pending = None
               st.session_state.validation = {}
   ```

1. Update the stage to `"user"`, and rerun the app.

   ```python
               st.session_state.stage = "user"
               st.rerun()
   ```

   If the user clicks the "**Update**" button, the app will rerun and execute this block. At the end of this block, the app will rerun again and return to the `"user"` stage.
