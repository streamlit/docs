---
title: Validate and edit chat responses
slug: /develop/tutorials/chat-and-llm-apps/validate-and-edit-chat-responses
description: Learn to build a Streamlit chat app that lets users validate, correct, and improve LLM chat responses with multi-stage response editing workflows.
keywords: chat response validation, LLM response editing, chat response correction, response improvement, chat validation workflow, LLM feedback, response editing
---

# Validate and edit chat responses

As you train LLM models, you may want users to correct or improve chat responses. With Streamlit, you can build a chat app that lets users improve chat responses.

This tutorial uses Streamlit's chat commands to build a simple chat app that lets users modify chat responses to improve them.

## Applied concepts

- Use `st.chat_input` and `st.chat_message` to create a chat interface.
- Use Session State to manage stages of a process.

## Prerequisites

- This tutorial requires the following version of Streamlit:

  ```text
  streamlit>=1.24.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of [Session State](/develop/concepts/architecture/session-state).

## Summary

In this example, you'll build a chat interface. To avoid API calls, the app will include a generator function to simulate a chat stream object. When the simulated chat assistant responds, a function validates the response and highlights possible "errors" for the user to review. The user must accept, correct, or rewrite the response before proceeding.

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

```python
import streamlit as st
import lorem
from random import randint
import time

if "stage" not in st.session_state:
    st.session_state.stage = "user"
    st.session_state.history = []
    st.session_state.pending = None
    st.session_state.validation = {}


def chat_stream():
    for i in range(randint(3, 9)):
        yield lorem.sentence() + " "
        time.sleep(0.2)


def validate(response):
    response_sentences = response.split(". ")
    response_sentences = [
        sentence.strip(". ") + "."
        for sentence in response_sentences
        if sentence.strip(". ") != ""
    ]
    validation_list = [
        True if sentence.count(" ") > 4 else False for sentence in response_sentences
    ]
    return response_sentences, validation_list


def add_highlights(response_sentences, validation_list, bg="red", text="red"):
    return [
        f":{text}[:{bg}-background[" + sentence + "]]" if not is_valid else sentence
        for sentence, is_valid in zip(response_sentences, validation_list)
    ]


for message in st.session_state.history:
    with st.chat_message(message["role"]):
        st.write(message["content"])

if st.session_state.stage == "user":
    if user_input := st.chat_input("Enter a prompt"):
        st.session_state.history.append({"role": "user", "content": user_input})
        with st.chat_message("user"):
            st.write(user_input)
        with st.chat_message("assistant"):
            response = st.write_stream(chat_stream())
            st.session_state.pending = response
            st.session_state.stage = "validate"
            st.rerun()

elif st.session_state.stage == "validate":
    st.chat_input("Accept, correct, or rewrite the answer above.", disabled=True)
    response_sentences, validation_list = validate(st.session_state.pending)
    highlighted_sentences = add_highlights(response_sentences, validation_list)
    with st.chat_message("assistant"):
        st.markdown(" ".join(highlighted_sentences))
        st.divider()
        cols = st.columns(3)
        if cols[0].button(
            "Correct errors", type="primary", disabled=all(validation_list)
        ):
            st.session_state.validation = {
                "sentences": response_sentences,
                "valid": validation_list,
            }
            st.session_state.stage = "correct"
            st.rerun()
        if cols[1].button("Accept"):
            st.session_state.history.append(
                {"role": "assistant", "content": st.session_state.pending}
            )
            st.session_state.pending = None
            st.session_state.validation = {}
            st.session_state.stage = "user"
            st.rerun()
        if cols[2].button("Rewrite answer", type="tertiary"):
            st.session_state.stage = "rewrite"
            st.rerun()

elif st.session_state.stage == "correct":
    st.chat_input("Accept, correct, or rewrite the answer above.", disabled=True)
    response_sentences = st.session_state.validation["sentences"]
    validation_list = st.session_state.validation["valid"]
    highlighted_sentences = add_highlights(
        response_sentences, validation_list, "gray", "gray"
    )
    if not all(validation_list):
        focus = validation_list.index(False)
        highlighted_sentences[focus] = ":red[:red" + highlighted_sentences[focus][11:]
    else:
        focus = None
    with st.chat_message("assistant"):
        st.markdown(" ".join(highlighted_sentences))
        st.divider()
        if focus is not None:
            new_sentence = st.text_input(
                "Replacement text:", value=response_sentences[focus]
            )
            cols = st.columns(2)
            if cols[0].button(
                "Update", type="primary", disabled=len(new_sentence.strip()) < 1
            ):
                st.session_state.validation["sentences"][focus] = (
                    new_sentence.strip(". ") + "."
                )
                st.session_state.validation["valid"][focus] = True
                st.session_state.pending = " ".join(
                    st.session_state.validation["sentences"]
                )
                st.rerun()
            if cols[1].button("Remove"):
                st.session_state.validation["sentences"].pop(focus)
                st.session_state.validation["valid"].pop(focus)
                st.session_state.pending = " ".join(
                    st.session_state.validation["sentences"]
                )
                st.rerun()
        else:
            cols = st.columns(2)
            if cols[0].button("Accept", type="primary"):
                st.session_state.history.append(
                    {"role": "assistant", "content": st.session_state.pending}
                )
                st.session_state.pending = None
                st.session_state.validation = {}
                st.session_state.stage = "user"
                st.rerun()
            if cols[1].button("Re-validate"):
                st.session_state.validation = {}
                st.session_state.stage = "validate"
                st.rerun()

elif st.session_state.stage == "rewrite":
    st.chat_input("Accept, correct, or rewrite the answer above.", disabled=True)
    with st.chat_message("assistant"):
        new = st.text_area("Rewrite the answer", value=st.session_state.pending)
        if st.button(
            "Update", type="primary", disabled=new is None or new.strip(". ") == ""
        ):
            st.session_state.history.append({"role": "assistant", "content": new})
            st.session_state.pending = None
            st.session_state.validation = {}
            st.session_state.stage = "user"
            st.rerun()
```

</Collapse>

<Cloud name="doc-tutorial-chat-response-revision" height="600px" />

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
   import lorem
   from random import randint
   import time
   ```

   You'll use `lorem`, `random`, and `time` to build a simulated chat response stream.

1. Save your `app.py` file, and view your running app.
1. In your app, select "**Always rerun**", or press the "**A**" key.

   Your preview will be blank but will automatically update as you save changes to `app.py`.

1. Return to your code.

### Build a function to simulate a chat response stream

To begin, you'll define a function to stream a random chat response. The simulated chat stream will use `lorem` to generate three to nine random sentences. You can skip this section if you just want to copy the function.

<Collapse title="Complete function to simulate a chat stream" expanded={false}>

```python
def chat_stream():
    for i in range(randint(3, 9)):
        yield lorem.sentence() + " "
        time.sleep(0.2)
```

</Collapse>

1. Define a function for your simulated chat stream:

   ```python
   def chat_stream():
   ```

   For this example, the chat stream does not have any arguments. The streamed response will be random and independent of the user's prompt.

1. Create a loop that executes three to nine times:

   ```python
       for i in range(randint(3, 9)):
   ```

1. Within the loop, yield a random sentence from `lorem` with a space at the end:

   ```python
           yield lorem.sentence() + " "
   ```

1. To create a streaming effect, add a small delay with `time.sleep(0.2)` between yields:

   ```python
           time.sleep(0.2)
   ```

You now have a complete generator function to simulate a chat stream object.

### Create a validation function

The app will validate the streamed responses to assist users in identifying possible errors. To validate a response, you'll first create a list of its sentences. Any sentence with fewer than six words will be marked as a potential error. This is an arbitrary standard for the sake of illustration.

<Collapse title="Complete function to validate a response" expanded={false}>

```python
def validate(response):
    response_sentences = response.split(". ")
    response_sentences = [
        sentence.strip(". ") + "."
        for sentence in response_sentences
        if sentence.strip(". ") != ""
    ]
    validation_list = [
        True if sentence.count(" ") > 4 else False for sentence in response_sentences
    ]
    return response_sentences, validation_list
```

</Collapse>

1. Define a function that accepts a string response and breaks it into sentences:

   ```python
   def validate(response):
       response_sentences = response.split(". ")
   ```

1. Use list comprehension to clean the list of sentences. For each sentence, strip any leading and trailing spaces and periods, and then restore a period to the end:

   ```python
       response_sentences = [
           sentence.strip(". ") + "."
           for sentence in response_sentences
           if sentence.strip(". ") != ""
       ]
   ```

   Because the user will be modifying responses, whitespaces and punctuation may vary. The code `sentence.strip(". ") + "."` removes leading and trailing spaces and periods. It also ensures that each sentence ends with a single period. Furthermore, the code `if sentence.strip(". ") != ""` discards any empty sentences. This simple example doesn't address other punctuation that may terminate a sentence.

1. Create a Boolean list of sentence validations, using `True` for an approved sentence and `False` for an unapproved sentence:

   ```python
       validation_list = [
           True if sentence.count(" ") > 4 else False for sentence in response_sentences
       ]
   ```

   As stated previously, a "good" sentence has at least six words (i.e., at least five spaces). This code uses list comprehension to count the spaces in each sentence and saves a Boolean value.

1. Return the sentence and validation lists as a tuple:

   ```python
       return response_sentences, validation_list
   ```

### Create a helper function to highlight text

To show your validation results to your user, you can highlight sentences that are marked as errors. Create a helper function to add text and background color to the detected errors.

<Collapse title="Complete function to highlight errors" expanded={false}>

```python
def add_highlights(response_sentences, validation_list, bg="red", text="red"):
    return [
        f":{text}[:{bg}-background[" + sentence + "]]" if not is_valid else sentence
        for sentence, is_valid in zip(response_sentences, validation_list)
    ]
```

</Collapse>

1. Define a function that accepts the lists of sentences and their validations. Include parameters for the text and background colors of the highlight:

   ```python
   def add_highlights(response_sentences, validation_list, bg="red", text="red"):
   ```

   For convenience, use a default of `"red"` for the highlight colors. You'll use this function to highlight all errors in red when summarizing the validation. If the user chooses to step through the errors individually, you'll highlight all the errors in gray (except the one in focus).

1. Use list comprehension to return a modified list of sentences that include the Markdown highlights where errors were detected:

   ```python
       return [
           f":{text}[:{bg}-background[" + sentence + "]]" if not is_valid else sentence
           for sentence, is_valid in zip(response_sentences, validation_list)
       ]
   ```

### Initialize and display your chat history

Your app will use Session State to track the stages of the validation and correction process.

1. Initialize Session State:

   ```python
   if "stage" not in st.session_state:
       st.session_state.stage = "user"
       st.session_state.history = []
       st.session_state.pending = None
       st.session_state.validation = {}
   ```
   - `st.session_state.stage` tracks where the user is in the multistage process. `"user"` means that the app is waiting for the user to enter a new prompt. The other values are `"validate"`, `"correct"`, and `"rewrite"`, which will be defined later.
   - `st.session_state.history` stores the conversation history as a list of messages. Each message is a dictionary of message attributes (`"role"` and `"content"`).
   - `st.session_state.pending` stores the next response before it is approved.
   - `st.session_state.validation` stores the validation information for the pending response. This is a dictionary with the keys `"sentences"` and `"valid"` to store the lists of sentences and their validations, respectively.

1. Iterate through the messages in your chat history and display their contents in chat message containers:

   ```python
   for message in st.session_state.history:
       with st.chat_message(message["role"]):
           st.write(message["content"])
   ```

### Define the `"user"` stage

When `st.session_state.stage` is `"user"`, the app is waiting for a new prompt.

1. Start a conditional block for the `"user"` stage:

   ```python
   if st.session_state.stage == "user":
   ```

1. Display a chat input widget, and start a nested conditional block from its output:

   ```python
       if user_input := st.chat_input("Enter a prompt"):
   ```

   This nested block won't be executed until a user submits a prompt. When the app first loads (or returns to the `"user"` stage after finalizing a response), this is effectively the end of the script.

   The `:=` notation is shorthand to assign a variable within an expression.

1. Append the user prompt to the chat history and display it in a chat message container:

   ```python
           st.session_state.history.append({"role": "user", "content": user_input})
           with st.chat_message("user"):
               st.write(user_input)
   ```

1. Following the user's chat message container, display the chat response in another chat message container. Save the complete streamed response as a pending message in Session State:

   ```python
           with st.chat_message("assistant"):
               response = st.write_stream(chat_stream())
               st.session_state.pending = response
   ```

1. Update the stage to `"validate"`, and rerun the app:

   ```python
               st.session_state.stage = "validate"
               st.rerun()
   ```

   When a user submits a new prompt, the app will rerun and execute this conditional block. At the end of this block, the app will rerun again and continue in the `"validate"` stage.

### Define the `"validate"` stage

When `st.session_state.stage` is `"validate"`, the app will validate the pending response and display the results to the user. The user will then choose how to proceed (accept, correct, or rewrite the response).

1. Start a conditional block for the `"validate"` stage:

   ```python
   elif st.session_state.stage == "validate":
   ```

   You can use `if` or `elif` for each of the stages. Everywhere you update the stage in Session State, you will immediately rerun the app. Therefore, you'll never execute two different stages in the same script run.

1. For visual consistency, display a disabled chat input:

   ```python
       st.chat_input("Accept, correct, or rewrite the answer above.", disabled=True)
   ```

   For the user's clarity, use placeholder text to direct them to review the pending response.

1. Parse the response and highlight any errors using your helper functions:

   ```python
       response_sentences, validation_list = validate(st.session_state.pending)
       highlighted_sentences = add_highlights(response_sentences, validation_list)
   ```

1. Join the highlighted sentences into a single string, and display them in a chat message container. To separate the response from the buttons that follow, add a divider:

   ```python
       with st.chat_message("assistant"):
           st.markdown(" ".join(highlighted_sentences))
           st.divider()
   ```

1. To display buttons in a row, create three columns:

   ```python
           cols = st.columns(3)
   ```

1. In the first column, start a conditional block, and display a primary-type button labeled "Correct errors." Disable the button if there are no detected errors:

   ```python
           if cols[0].button(
               "Correct errors", type="primary", disabled=all(validation_list)
           ):
   ```

1. Within the conditional block, save the validation information into Session State, update the stage, and then rerun the app:

   ```python
               st.session_state.validation = {
                   "sentences": response_sentences,
                   "valid": validation_list,
               }
               st.session_state.stage = "correct"
               st.rerun()
   ```

   If the user clicks the "**Correct errors**" button, the app will rerun and execute this block. At the end of this block, the app will rerun again and enter the `"correct"` stage.

1. In the second column, start a conditional block, and display a button labeled "Accept:"

   ```python
           if cols[1].button("Accept"):
   ```

1. Within the conditional block, save the pending message into the chat history, and clear the pending and validation information from Session State:

   ```python
               st.session_state.history.append(
                   {"role": "assistant", "content": st.session_state.pending}
               )
               st.session_state.pending = None
               st.session_state.validation = {}
   ```

1. Update the stage to `"user"`, and rerun the app:

   ```python
               st.session_state.stage = "user"
               st.rerun()
   ```

   If the user clicks the "**Accept**" button, the app will rerun and execute this block. At the end of this block, the app will rerun again and return to the `"user"` stage.

1. In the third column, start a conditional block, and display a tertiary-type button labeled "Rewrite answer:"

   ```python
           if cols[2].button("Rewrite answer", type="tertiary"):
   ```

1. Within the conditional block, update the stage to `"rewrite"` and rerun the app:

   ```python
               st.session_state.stage = "rewrite"
               st.rerun()
   ```

   If the user clicks the "**Rewrite answer**" button, the app will rerun and execute this conditional block. At the end of this block, the app will rerun again and enter the `"rewrite"` stage.

   You don't need to save any information into `st.session_state.validation` because the `"rewrite"` stage does not use this information.

### Define the `"correct"` stage

When `st.session_state.stage` is `"correct"`, the user can correct or accept the errors identified in `st.session_state.validation`. With each script run, the app focuses the user on the first error in the list. When the user addresses an error, the error is removed from the list, and the next error is highlighted in the next script run. This continues until all errors are removed. Then, the user can accept the result, return to the `"validate"` stage, or go to the `"rewrite"` stage.

1. Start a conditional block for the `"correct"` stage:

   ```python
   elif st.session_state.stage == "correct":
   ```

1. For visual consistency, display a disabled chat input:

   ```python
       st.chat_input("Accept, correct, or rewrite the answer above.", disabled=True)
   ```

1. For coding convenience, retrieve the validation information from Session State and save it into variables:

   ```python
       response_sentences = st.session_state.validation["sentences"]
       validation_list = st.session_state.validation["valid"]
   ```

1. Use your helper function to highlight the sentences with errors. Use gray for the highlight:

   ```python
       highlighted_sentences = add_highlights(
           response_sentences, validation_list, "gray", "gray"
       )
   ```

   In a following step, to focus the user on one error, you'll change the highlight color for one sentence.

1. Check whether there are any errors in `validation_list`. If there are errors, get the index of the first one, and replace the Markdown highlight for the associated sentence:

   ```python
       if not all(validation_list):
           focus = validation_list.index(False)
           highlighted_sentences[focus] = ":red[:red" + highlighted_sentences[focus][11:]
   ```

   `highlighted_sentences[focus]` begins with `":gray[:gray-background["`. Therefore, `highlighted_sentences[focus][11:]` removes the first eleven characters so you can prepend `":red[:red"` instead.

1. Set a fallback value for `focus` for when there are no errors:

   ```python
       else:
           focus = None
   ```

1. In a chat message container, display the highlighted response. To separate the response from the buttons that follow, add a divider:

   ```python
       with st.chat_message("assistant"):
           st.markdown(" ".join(highlighted_sentences))
           st.divider()
   ```

1. Start a conditional block: if there are errors, display a text input prefilled with the first error. This is the error you highlighted in red:

   ```python
           if focus is not None:
               new_sentence = st.text_input(
                   "Replacement text:", value=response_sentences[focus]
               )
   ```

   `value=response_sentences[focus]` prefills the text input with the sentence associated to `focus`. The user can edit it or replace the text entirely. You'll also add a button so they can choose to remove it instead.

1. To display buttons in a row, create two columns:

   ```python
               cols = st.columns(2)
   ```

1. In the first column, start a conditional block, and display a primary-type button labeled "Update." Disable the button if the text input is empty:

   ```python
               if cols[0].button(
                   "Update", type="primary", disabled=len(new_sentence.strip()) < 1
               ):
   ```

1. Within the conditional block, update the sentence and its validation:

   ```python
                   st.session_state.validation["sentences"][focus] = (
                       new_sentence.strip(". ") + "."
                   )
                   st.session_state.validation["valid"][focus] = True
   ```

1. Update the complete response in `st.session_state.pending` with the new, resultant response, and rerun the app:

   ```python
                   st.session_state.pending = " ".join(
                       st.session_state.validation["sentences"]
                   )
                   st.rerun()
   ```

   If the user clicks the "**Update**" button, the app will rerun and execute this conditional block. At the end of this block, the app will rerun again and continue in the `"correct"` stage with the next error highlighted.

1. In the second column, start a conditional block, and display a button labeled "Remove." Within the conditional block, pop the sentence and validation information out of their lists in Session State:

   ```python
               if cols[1].button("Remove"):
                   st.session_state.validation["sentences"].pop(focus)
                   st.session_state.validation["valid"].pop(focus)
   ```

1. Update the complete response in `st.session_state.pending` with the new, resultant response, and rerun the app:

   ```python
                   st.session_state.pending = " ".join(
                       st.session_state.validation["sentences"]
                   )
                   st.rerun()
   ```

   If the user clicks the "**Remove**" button, the app will rerun and execute this conditional block. At the end of this block, the app will rerun again and continue in the `"correct"` stage with the next error highlighted.

1. Start an `else` block for when there are no errors. To display buttons in a row, create two columns:

   ```python
           else:
               cols = st.columns(2)
   ```

   After a user has resolved all the errors, they need to confirm the final result. Instead of "**Update**" and "**Remove**" buttons, you'll display "**Accept**" and "**Re-validate**" buttons.

1. In the first column, start a conditional block, and display a primary-type button labeled "Accept." Within the conditional block, save the pending message into the chat history, and clear the pending and validation information from Session State:

   ```python
               if cols[0].button("Accept", type="primary"):
                   st.session_state.history.append(
                       {"role": "assistant", "content": st.session_state.pending}
                   )
                   st.session_state.pending = None
                   st.session_state.validation = {}
   ```

1. Update the stage to `"user"`, and rerun the app:

   ```python
                   st.session_state.stage = "user"
                   st.rerun()
   ```

   If the user clicks the "**Accept**" button, the app will rerun and execute this block. At the end of this block, the app will rerun again and return to the `"user"` stage.

1. In the second column, start a conditional block, and display a button labeled "Re-validate:"

   ```python
               if cols[1].button("Re-validate"):
   ```

1. Within the conditional block, clear the validation information from Session State, update the stage to `"validate"`, and rerun the app:

   ```python
                   st.session_state.validation = {}
                   st.session_state.stage = "validate"
                   st.rerun()
   ```

   If the user clicks the "**Re-validate**" button, the app will rerun and execute this conditional block. At the end of this block, the app will rerun again and enter the `"validate"` stage.

### Define the `"rewrite"` stage

When `st.session_state.stage` is `"rewrite"`, the user can freely edit the response in a text area.

1. Start a conditional block for the `"rewrite"` stage:

   ```python
   elif st.session_state.stage == "rewrite":
   ```

1. For visual consistency, display a disabled chat input:

   ```python
       st.chat_input("Accept, correct, or rewrite the answer above.", disabled=True)
   ```

1. To let the user edit the pending response, in a chat message container, display a text area input:

   ```python
       with st.chat_message("assistant"):
           new = st.text_area("Rewrite the answer", value=st.session_state.pending)
   ```

   `value=st.session_state.pending` prefills the text area input with the pending response. The user can edit it or replace the text entirely.

1. Start a conditional block, and display a primary-type button labeled "Update." Disable the button if text area input is empty:

   ```python
           if st.button(
               "Update", type="primary", disabled=new is None or new.strip(". ") == ""
           ):
   ```

1. Within the conditional block, add the new response to the chat history, and clear the pending and validation information from Session State:

   ```python
               st.session_state.history.append({"role": "assistant", "content": new})
               st.session_state.pending = None
               st.session_state.validation = {}
   ```

1. Update the stage to `"user"`, and rerun the app:

   ```python
               st.session_state.stage = "user"
               st.rerun()
   ```

   If the user clicks the "**Update**" button, the app will rerun and execute this block. At the end of this block, the app will rerun again and return to the `"user"` stage.

1. Save your file and go to your browser to try your new app.

## Improve the example

Now that you have a working app, you can iteratively improve it. Because there are some common elements between stages, you might want to introduce additional functions to reduce duplicate code. You can use callbacks with the buttons so the app doesn't rerun twice in a row. Alternatively, you can handle more edge cases.

The example includes some protection against saving an empty response, but it isn't comprehensive. If every sentence in a response is marked as an error, a user can remove each of them in the `"correct"` stage and accept the empty result. If the response is empty in the `"correct"` stage, consider disabling the "**Accept**" button or changing it to "**Rewrite**."

To see another edge case, try this in the running example:

1. Submit a prompt.
1. Select "**Rewrite answer**."
1. In the text area, highlight all text, and press `Delete`. Do not click or tab outside of the text area.
1. Immediately click the "**Update**" button.

When you click a button with an unsubmitted value in another widget, Streamlit will update that widget's value and the button's value in succession before triggering the rerun. Because there isn't a rerun between updating the text area and updating the button, the "**Update**" button doesn't get disabled as expected. To correct this, you can add an extra check for an empty text area within the `"rewrite"` stage:

```diff
-       if st.button(
-           "Update", type="primary", disabled=new is None or new.strip(". ") == ""
-       ):
+       is_empty = new is None or new.strip(". ") == ""
+       if st.button("Update", type="primary", disabled=is_empty) and not is_empty:
            st.session_state.history.append({"role": "assistant", "content": new})
            st.session_state.pending = None
            st.session_state.validation = {}
            st.session_state.stage = "user"
            st.rerun()
```

Now, if you repeat the listed steps, when the app reruns, the conditional block won't be executed even though the button triggered the rerun. The button will be disabled and the user can proceed as if they had just clicked or tabbed out of the text area.
