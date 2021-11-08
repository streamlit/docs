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

<Image pure alt="screenshot" src="/images/api/progress.jpg" />

#### Progress bar

Display a progress bar.

```python
for i in range(101):
  st.progress(i)
  do_something_slow()
```

</RefCard>
<RefCard href="/library/api-reference/status/st.spinner">

<Image pure alt="screenshot" src="/images/api/spinner.jpg" />

#### Spinner

Temporarily displays a message while executing a block of code.

```python
with st.spinner("Please wait..."):
  do_something_slow()
```

</RefCard>
<RefCard href="/library/api-reference/status/st.balloons">

<Image pure alt="screenshot" src="/images/api/balloons.jpg" />

#### Balloons

Display celebratory balloons!

```python
do_something()

# Celebrate when all done!
st.balloons()
```

</RefCard>
<RefCard href="/library/api-reference/status/st.error">

<Image pure alt="screenshot" src="/images/api/error.jpg" />

#### Error box

Display error message.

```python
st.error("We encountered an error")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.warning">

<Image pure alt="screenshot" src="/images/api/warning.jpg" />

#### Warning box

Display warning message.

```python
st.warning("Unable to fetch image. Skipping...")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.info">

<Image pure alt="screenshot" src="/images/api/info.jpg" />

#### Info box

Display an informational message.

```python
st.info("Dataset is updated every day at midnight.")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.success">

<Image pure alt="screenshot" src="/images/api/success.jpg" />

#### Success box

Display a success message.

```python
st.success("Match found!")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.exception">

<Image pure alt="screenshot" src="/images/api/exception.jpg" />

#### Exception output

Display an exception.

```python
e = RuntimeError("This is an exception of type RuntimeError")
st.exception(e)
```

</RefCard>
</TileContainer>
