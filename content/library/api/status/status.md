---
title: Display progress and status
slug: /library/api-reference/status
---

# Display progress and status

Streamlit provides a few methods that allow you to add animation to your
apps. These animations include progress bars, status messages (like
warnings), and celebratory balloons.

<TileContainer>
<RefCard href="/library/api-reference/status/st.progress">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Progress bar

Display a progress bar.

```python
for i in range(101):
  do_something()
  st.progress(i)
```

</RefCard>
<RefCard href="/library/api-reference/status/st.spinner">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Spinner

Temporarily displays a message while executing a block of code.

```python
st.spinner("Please wait...")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.balloons">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Balloons

Draw celebratory balloons.

```python
do_something()

# Celebrate when all done!
st.balloons()
```

</RefCard>
<RefCard href="/library/api-reference/status/st.error">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Error box

Display error message.

```python
st.error("We encountered an error")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.warning">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Warning box

Display warning message.

```python
st.warning("Unable to fetch image. Skipping...")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.info">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Info box

Display an informational message.

```python
st.info("Dataset is updated every day at midnight.")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.success">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Success box

Display a success message.

```python
st.success("Match found!")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.exception">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Exception output

Display an exception.

```python
e = RuntimeError("This is an exception of type RuntimeError")
st.exception(e)
```

</RefCard>
</TileContainer>
