---
title: Buttons, buttons, buttons!
slug: /knowledge-base/using-streamlit/buttons
---

# Buttons, buttons, buttons!

## TLDR

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

## Common logic with buttons

### Show a quick message with a basic button

Suppose you want to give the user a quick button to check if an entry is valid,
but not keep that check displayed as the user continues:

```python
import streamlit as st

animal_shelter = ['cat', 'dog', 'rabbit', 'bird']

animal = st.text_input('Type an animal')

if st.button('Check availability') and animal.lower() in animal_shelter:
    # This goes away if the user clicks the other button or changes the animal
    st.write('We have that animal!')

st.button('OK')
```

### Stateful button

If you want a clicked button to continue to be `True`, create a value in
`st.session_state` and have the button set it to `True` in a callback:

```python
import streamlit as st

if 'clicked' not in st.session_state:
    st.session_state.clicked = False

def click_button():
    st.session_state.clicked = True

st.button('Click me', on_click=click_button)

if st.session_state.clicked:
    # The message and nested widget will remain on the page
    st.write('Button clicked!')
    st.slider('Select a value')
```

### Toggle button

Perhaps you want a button to work like a toggle switch instead. Just set your
callback function to reverse the boolean value you have saved in
`st.session_state`:

```python
import streamlit as st

if 'button' not in st.session_state:
    st.session_state.button = False

def click_button():
    st.session_state.button = not st.session_state.button

st.button('Click me', on_click=click_button)

if st.session_state.button:
    # The message and nested widget will remain on the page
    st.write('Button is on!')
    st.slider('Select a value')
else:
    st.write('Button is off!')
```

### Buttons to continue or control stages of a process

Another alternative to nesting content inside a button is to use the button to
control a value in `st.session_state` to designate the "step" or "stage" of a
process.

```python
import streamlit as st

if 'stage' not in st.session_state:
    st.session_state.stage = 0

def set_state(i):
    st.session_state.stage = i

if st.session_state.stage == 0:
    st.button('Begin', on_click=set_state, args=[1])

if st.session_state.stage >= 1:
    name = st.text_input('Name', on_change=set_state, args=[2])

if st.session_state.stage >= 2:
    st.write(f'Hello {name}!')
    color = st.selectbox(
        'Pick a Color',
        [None, 'red', 'orange', 'green', 'blue', 'violet'],
        on_change=set_state, args=[3]
    )
    if color is None:
        set_state(2)

if st.session_state.stage >= 3:
    st.write(f':{color}[Thank you!]')
    st.session_state.stage = 4

if st.session_state.stage == 4:
    st.button('Start Over', on_click=set_state, args=[0])
```

### Buttons to modify `st.session_state`

#### Logic nested in a button with a rerun

#### Logic used in a callback

### Buttons to modify or reset other widgets

When using a button to modify or reset another widget, it is the same as the
above examples to modify `st.session_state`. However, there is an extra
consideration that is very important: you cannot modify a key-value pair in
`st.session_state` if the widget with that key has already been rendered on the
page for the current page run.

#### Don't do this

```python
import streamlit as st

st.text_input('Name', key='name')

# These buttons will error because they change a key after its widget
if st.button('Clear name'):
    st.session_state.name = ''
if st.button('Streamlit!'):
    set_name('Streamlit')
```

#### 1. Use a key for the button and put the logic before the widget

```python
import streamlit as st

# Use the get method since the keys won't be in session_state
# on the first page load
if st.session_state.get('clear'):
    st.session_state['name'] = ''
if st.session_state.get('streamlit'):
    st.session_state['name'] = 'Streamlit'

st.text_input('Name', key='name')

st.button('Clear name', key='clear')
st.button('Streamlit!', key='streamlit')
```

#### 2. Use a callback

```python
import streamlit as st

st.text_input('Name', key='name')

def set_name(name):
    st.session_state.name = name

st.button('Clear name', on_click=set_name, args=[''])
st.button('Streamlit!', on_click=set_name, args=['Streamlit'])
```

#### 3. Use containers

```python
import streamlit as st

begin = st.container()

if st.button('Clear name'):
    st.session_state.name = ''
if st.button('Streamlit!'):
    st.session_state.name = ('Streamlit')

# The widget is second in logic, but first in display
begin.text_input('Name', key='name')
```

### Buttons to add other widgets dynamically

When dynamically adding widgets to the page, make sure to use an index to keep
the keys unique and avoid a `DuplicateWidgetID` error.

```python
import streamlit as st

def display_input_row(index):
    left, middle, right = st.columns(3)
    left.text_input('First', key=f'first_{index}')
    middle.text_input('Middle', key=f'middle_{index}')
    right.text_input('Last', key=f'last_{index}')

if 'rows' not in st.session_state:
    st.session_state['rows'] = 0

def increase_rows():
    st.session_state['rows'] += 1

st.button('Add person', on_click=increase_rows)

for i in range(st.session_state['rows']):
    display_input_row(i)

st.subheader('People')
for i in range(st.session_state['rows']):
    st.write(
        f'Person {i+1}:',
        st.session_state[f'first_{i}'],
        st.session_state[f'middle_{i}'],
        st.session_state[f'last_{i}']
    )
```

### Buttons to handle expensive or file-writing processes

When you have expensive processes, set them to run upon clicking a button and
save results into `st.session_state`. This allows you to keep accessing the
results of the process without re-executing it unnecessarily. This is especially
helpful for processes that save to disk or write to a database.

```python
import streamlit as st
import pandas as pd
import time

def expensive_process(option, add):
    with st.spinner('Processing...'):
        time.sleep(5)
    df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6], 'C':[7, 8, 9]})+add
    return (df, add)

cols = st.columns(2)
option = cols[0].selectbox('Select a number', options=['1', '2', '3'])
add = cols[1].number_input('Add a number', min_value=0, max_value=10)

if 'processed' not in st.session_state:
    st.session_state.processed = {}

if st.button('Process'):
    result = expensive_process(option, add)
    st.session_state.processed[option] = result

if option in st.session_state.processed:
    st.write(f'Option {option} processed with add {add}')
    st.write(st.session_state.processed[option][0])
```

## Anti-patterns

Here are some simplified examples of how buttons can go wrong. Be on the lookout for these common mistakes.

### Buttons nested inside buttons

```python
import streamlit as st

if st.button('Button 1'):
    st.write('Button 1 was clicked')
    if st.button('Button 2'):
        # This will never be reached!
        st.write('Button 2 was clicked')
```

### Other widgets nested inside buttons

```python
import streamlit as st

if st.button('Sign up'):
    name = st.text_input('Name')

    if name:
        # This will never be reached
        st.success(f'Welcome {name}')
```

### Processing nested inside a button without saving to session state

```python
import streamlit as st
import pandas as pd

file = st.file_uploader("Upload a file", type="csv")

if st.button('Get data'):
    df = pd.read_csv(file)
    # This display will go away with the user's next action
    st.write(df)

if st.button('Save'):
    # This will always error
    df.to_csv('data.csv')
```
