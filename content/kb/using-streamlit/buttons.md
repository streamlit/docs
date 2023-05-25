---
title: Buttons, buttons, buttons!
slug: /knowledge-base/using-streamlit/buttons
---

# Buttons, buttons, buttons!

### TLDR

Buttons do not retain state. They return `True` on the page load resulting from
their click and then immediately go back to `False`. If you nest something
inside a button, then it will go away as soon as the user takes their next
action (because the page reloads and the button becomes `False`).

## Use cases for buttons

When you have code conditioned on a button's value, it will execute once in
response to the button being clicked and then not again (until the button is
clicked again).

### Things to nest inside of a button

1. Transient messages that immediately go away
2. Once-per-click processes that saves data to session state, a file, or
   a database

### Things to not nest inside of a button

1. Displayed items that should persist as the user continues
2. Other widgets
3. Processes that neither modify session state nor write to a file/database\*

\*Exception: This can be appropriate if you want a disposable result. For
example, imagine you have a "Validate" button for the purpose of creating an
alert to say 'Valid' or 'Invalid' and no need to keep that info. That could be
a process conditioned directly on a button.

## Design patterns with buttons

TODO:

1. Show a quick message with a basic button
2. Toggle and stateful buttons with session state
3. Buttons to control "stages" of a process

- Commit buttons

4. Modifying other widgets

- Nest in a button (with rerun or callback)
- Limitations if modifying a widget displayed before a button (containers vs callbacks)

5. Buttons to add other widgets

- "Add rows" vs stages of a process

6. Expensive or file-writing processes (with or without displayed results)

- Caching vs button logic
