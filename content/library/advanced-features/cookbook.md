---
title: Cookbook
slug: /library/advanced-features/cookbook
---

# Cookbook

Now that you've mastered Streamlit's main concepts, let's take a look at some
advanced functionality like styling data, adjusting the order of elements in a
report, and adding animations.

<Note>

Have something to add? Please let us know what's important to you!
Ping us in the [community forum](https://discuss.streamlit.io).

</Note>

## Batch elements and input widgets

In Streamlit, every widget interaction causes a rerun of the app. However,
there are times when you might want to interact with a couple of widgets and
submit those interactions while triggering a single re-run of the app.

Using `st.form` you can batch input widgets together and along with
`st.form_submit_button` submit the state inside these widgets with the click
of a single button.

```python
# Forms can be declared using the 'with' syntax
with st.form(key='my_form'):
    text_input = st.text_input(label='Enter your name')
    submit_button = st.form_submit_button(label='Submit')
```

```python
# Alternative syntax, declare a form and use the returned object
form = st.form(key='my_form')
form.text_input(label='Enter some text')
submit_button = form.form_submit_button(label='Submit')
```

```python
# st.form_submit_button returns True upon form submit
if submit_button:
    st.write(f'hello {name}')
```

Forms can appear anywhere in your app (sidebar, columns etc), but there are
some **constraints**:

- A form cannot have interdependent widgets, i.e. the _output_ of `widget1` cannot
  be the _input_ to `widget2` inside a form.
- By design, interacting with widgets inside `st.form` does not trigger
  a re-run. Because of this reason, `st.button` cannot be declared inside `st.form`.
- `st.form` cannot be embedded inside another `st.form`.
- Forms must have an associated `st.form_submit_button`. Clicking this button
  triggers a re-run. Streamlit throws an error if a form does not have an
  associated `st.form_submit_button`.

## Insert elements out of order

You can use the [`st.empty`](/library/api-reference/layout/st.empty) method as a placeholder,
to "save" a slot in your app that you can use later.

```python
st.text('This will appear first')
# Appends some text to the app.

my_slot1 = st.empty()
# Appends an empty slot to the app. We'll use this later.

my_slot2 = st.empty()
# Appends another empty slot.

st.text('This will appear last')
# Appends some more text to the app.

my_slot1.text('This will appear second')
# Replaces the first empty slot with a text string.

my_slot2.line_chart(np.random.randn(20, 2))
# Replaces the second empty slot with a chart.
```

## Animate elements

Let's combine some of the things you've learned to create compelling
animations in your app.

```python
progress_bar = st.progress(0)
status_text = st.empty()
chart = st.line_chart(np.random.randn(10, 2))

for i in range(100):
    # Update progress bar.
    progress_bar.progress(i + 1)

    new_rows = np.random.randn(10, 2)

    # Update status text.
    status_text.text(
        'The latest random number is: %s' % new_rows[-1, 1])

    # Append data to the chart.
    chart.add_rows(new_rows)

    # Pretend we're doing some computation that takes time.
    time.sleep(0.1)

status_text.text('Done!')
st.balloons()
```

## Append data to a table or chart

In Streamlit, you can not only replace entire elements in your app, but also
modify the data behind those elements. Here is how:

```python
import numpy as np
import time

# Get some data.
data = np.random.randn(10, 2)

# Show the data as a chart.
chart = st.line_chart(data)

# Wait 1 second, so the change is clearer.
time.sleep(1)

# Grab some more data.
data2 = np.random.randn(10, 2)

# Append the new data to the existing chart.
chart.add_rows(data2)
```

## Record a screencast

After you've built a Streamlit app, you may want to discuss some of it with co-workers over email or Slack, or share it with the world on Twitter. A great way to do that is with Streamlit's built-in screencast recorder. With it, you can record, narrate, stop, save, and share with a few clicks.

To start a screencast, locate the menu in the upper right corner of your app (**☰**), select **Record a screencast**, and follow the prompts. Before the recording starts, you'll see a countdown — this means it's showtime.

To stop your screencast, go back to the menu (**☰**) and select **Stop recording** (or hit the **ESC** key). Follow the prompts to preview your recording and save it to disk. That's it, you're ready to share your Streamlit app.

![GIF animation showing how to screencast](/images/screenshare.gif)

