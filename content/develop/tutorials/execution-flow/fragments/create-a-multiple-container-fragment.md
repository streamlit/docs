---
title: Create a fragment across multiple containers
slug: /develop/tutorials/execution-flow/create-a-multiple-container-fragment
description: Learn how to create a Streamlit fragment that writes to multiple containers outside of its main body and redraws them in place with each fragment rerun.
keywords: fragments, multiple containers, outside containers, fragment reruns, container management, execution flow, st.fragment, st.sidebar
---

# Create a fragment across multiple containers

Streamlit lets you turn functions into [fragments](/develop/concepts/architecture/fragments), which can rerun independently from the full script. A fragment can also write elements and widgets into containers created outside of it. During a fragment rerun, Streamlit clears and redraws everything your fragment draws, both in its main body and in those outside containers, while the rest of your app stays the same. This lets you spread a single fragment across multiple containers in your app.

## Applied concepts

- Use fragments to run two independent processes separately.
- Distribute a fragment across multiple containers.

## Prerequisites

- This tutorial requires the following version of Streamlit:

  ```text
  streamlit>=1.59.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of fragments and containers.

## Summary

In this toy example, you'll build an app with six containers. Three containers will have orange cats. The other three containers will have black cats. You'll have three buttons in the sidebar: "**Herd the black cats**," "**Herd the orange cats**," and "**Herd all the cats**." Since herding cats is slow, you'll use fragments to help Streamlit run the associated processes efficiently. You'll create two fragments, one for the black cats and one for the orange cats. Each fragment will draw its button in the sidebar and write its cats to three containers in the main body. When you herd one color of cats, Streamlit will only redraw the three cards that belong to that fragment. 😻

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

```python
import streamlit as st
import time

st.title("Cats!")

row1 = st.columns(3)
row2 = st.columns(3)

grid = [col.container(height=200) for col in row1 + row2]


def black_cats():
    time.sleep(1)
    st.title("🐈‍⬛ 🐈‍⬛")
    st.markdown("🐾 🐾 🐾 🐾")


def orange_cats():
    time.sleep(1)
    st.title("🐈 🐈")
    st.markdown("🐾 🐾 🐾 🐾")


@st.fragment
def herd_black_cats(card_a, card_b, card_c):
    st.button("Herd the black cats")
    with card_a:
        black_cats()
    with card_b:
        black_cats()
    with card_c:
        black_cats()


@st.fragment
def herd_orange_cats(card_a, card_b, card_c):
    st.button("Herd the orange cats")
    with card_a:
        orange_cats()
    with card_b:
        orange_cats()
    with card_c:
        orange_cats()


with st.sidebar:
    herd_black_cats(grid[0], grid[2], grid[4])
    herd_orange_cats(grid[1], grid[3], grid[5])
    st.button("Herd all the cats")
```

</Collapse>

<Cloud name="doc-tutorial-fragment-multiple-container" height="650px" />

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

   You'll use `time.sleep()` to slow things down and see the fragments working.

1. Save your `app.py` file, and view your running app.
1. In your app, select "**Always rerun**", or press the "**A**" key.

   Your preview will be blank but will automatically update as you save changes to `app.py`.

1. Return to your code.

### Frame out your app's containers

1. Add a title to your app and two rows of three containers.

   ```python
   st.title("Cats!")

   row1 = st.columns(3)
   row2 = st.columns(3)

   grid = [col.container(height=200) for col in row1 + row2]
   ```

   Save your file to see your updated preview.

1. Define a helper function to draw two black cats.

   ```python
   def black_cats():
       time.sleep(1)
       st.title("🐈‍⬛ 🐈‍⬛")
       st.markdown("🐾 🐾 🐾 🐾")
   ```

   This function represents "herding two cats" and uses `time.sleep()` to simulate a slower process. You will use this to draw two cats in one of your grid cards later on.

1. Define another helper function to draw two orange cats.

   ```python
   def orange_cats():
       time.sleep(1)
       st.title("🐈 🐈")
       st.markdown("🐾 🐾 🐾 🐾")
   ```

1. Optional: Test out your functions by calling each one within a grid card.

   ```python
   with grid[0]:
       black_cats()
   with grid[1]:
       orange_cats()
   ```

   Save your `app.py` file to see the preview. Delete these four lines when finished.

### Define your fragments

Since each fragment will span across the sidebar and three additional containers, you'll use the sidebar to hold the main body of the fragment and pass the three containers as function arguments.

1. Use an [`@st.fragment`](/develop/api-reference/execution-flow/st.fragment) decorator and start your black-cat fragment definition.

   ```python
   @st.fragment
   def herd_black_cats(card_a, card_b, card_c):
   ```

1. Add a button for rerunning this fragment.

   ```python
       st.button("Herd the black cats")
   ```

1. Write to each container using your helper function.

   ```python
       with card_a:
           black_cats()
       with card_b:
           black_cats()
       with card_c:
           black_cats()
   ```

   `card_a`, `card_b`, and `card_c` are containers created outside of your fragment. During a fragment rerun, Streamlit clears what your fragment wrote to each card and redraws it in place, so the cats don't pile up with each click.

1. Similarly define your orange-cat fragment function.

   ```python
   @st.fragment
   def herd_orange_cats(card_a, card_b, card_c):
       st.button("Herd the orange cats")
       with card_a:
           orange_cats()
       with card_b:
           orange_cats()
       with card_c:
           orange_cats()
   ```

### Put the functions together to create an app

1. Call both of your fragments in the sidebar.

   ```python
   with st.sidebar:
       herd_black_cats(grid[0], grid[2], grid[4])
       herd_orange_cats(grid[1], grid[3], grid[5])
   ```

   Each fragment writes to its three cards during every full-script run. This reserves the fragment's position in each card, so the fragment can redraw its cards during fragment reruns. If a fragment only wrote to an outside container conditionally, such as after a button click, Streamlit would raise an error during the fragment rerun. For more information, see [Write to containers outside a fragment](/develop/concepts/architecture/fragments#write-to-containers-outside-a-fragment).

1. Include a button outside of your fragments. When clicked, the button will trigger a full-script rerun since you're calling its widget function outside of any fragment.

   ```python
       st.button("Herd all the cats")
   ```

1. Save your file and try out the app! When you click "**Herd the black cats**" or "**Herd the orange cats**," Streamlit will only redraw the three related cards. When you click "**Herd all the cats**," Streamlit redraws all six cards.
