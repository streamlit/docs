---
title: Display progress and status
slug: /develop/api-reference/status
description: Display progress bars, status messages, notifications, and celebratory animations in your Streamlit apps.
keywords: progress, status, progress bar, status messages, notifications, spinner, toast, error messages, success messages, warning messages, balloons, snow, celebratory animations
---

# Display progress and status

Streamlit provides a few methods that allow you to add animation to your
apps. These animations include progress bars, status messages (like
warnings), and celebratory balloons.

## Animated status elements

<TileContainer>
<RefCard href="/develop/api-reference/status/st.progress">

<Image pure alt="screenshot" src="/images/api/progress.jpg" />

<h4>Progress bar</h4>

Display a progress bar.

```python
for i in range(101):
  st.progress(i)
  do_something_slow()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.spinner">

<Image pure alt="screenshot" src="/images/api/spinner.jpg" />

<h4>Spinner</h4>

Temporarily displays a message while executing a block of code.

```python
with st.spinner("Please wait..."):
  do_something_slow()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.status">

<Image pure alt="screenshot" src="/images/api/status.jpg" />

<h4>Status container</h4>

Display output of long-running tasks in a container.

```python
with st.status('Running'):
  do_something_slow()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.skeleton">

<Image pure alt="screenshot" src="/images/api/skeleton.jpg" />

<h4>Skeleton</h4>

Display a skeleton placeholder while loading.

```python
with st.skeleton(height=200):
  do_something_slow()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.toast">

<Image pure alt="screenshot" src="/images/api/toast.jpg" />

<h4>Toast</h4>

Briefly displays a toast message in the bottom-right corner.

```python
st.toast('Butter!', icon='🧈')
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.balloons">

<Image pure alt="screenshot" src="/images/api/balloons.jpg" />

<h4>Balloons</h4>

Display celebratory balloons!

```python
st.balloons()
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.snow">

<Image pure alt="screenshot" src="/images/api/snow.jpg" />

<h4>Snowflakes</h4>

Display celebratory snowflakes!

```python
st.snow()
```

</RefCard>
</TileContainer>

## Simple callout messages

<TileContainer>
<RefCard href="/develop/api-reference/status/st.success">

<Image pure alt="screenshot" src="/images/api/success.jpg" />

<h4>Success box</h4>

Display a success message.

```python
st.success("Match found!")
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.info">

<Image pure alt="screenshot" src="/images/api/info.jpg" />

<h4>Info box</h4>

Display an informational message.

```python
st.info("Dataset is updated every day at midnight.")
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.warning">

<Image pure alt="screenshot" src="/images/api/warning.jpg" />

<h4>Warning box</h4>

Display warning message.

```python
st.warning("Unable to fetch image. Skipping...")
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.error">

<Image pure alt="screenshot" src="/images/api/error.jpg" />

<h4>Error box</h4>

Display error message.

```python
st.error("We encountered an error")
```

</RefCard>
<RefCard href="/develop/api-reference/status/st.exception">

<Image pure alt="screenshot" src="/images/api/exception.jpg" />

<h4>Exception output</h4>

Display an exception.

```python
e = RuntimeError("This is an exception of type RuntimeError")
st.exception(e)
```

</RefCard>
</TileContainer>
