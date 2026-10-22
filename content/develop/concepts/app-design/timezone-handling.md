---
title: Working with timezones
slug: /develop/concepts/design/timezone-handling
description: Learn how Streamlit handles timezones, including best practices for displaying datetime information across different user timezones.
keywords: timezones, timezone handling, datetime, timezone aware, naive datetime, timezone conversion, time display, international users, timezone best practices
---

# Working with timezones

In general, working with timezones can be tricky. Your Streamlit app users are not necessarily in the same timezone as the server running your app. It is especially true of public apps, where anyone in the world (in any timezone) can access your app. As such, it is crucial to understand how Streamlit handles timezones, so you can avoid unexpected behavior when displaying `datetime` information.

## How Streamlit handles timezones

Streamlit always shows `datetime` information on the frontend with the same information as its corresponding `datetime` instance in the backend. I.e., date or time information does not automatically adjust to the users' timezone. We distinguish between the following two cases:

### **`datetime` instance without a timezone (naive)**

When you provide a `datetime` instance _without specifying a timezone_, the frontend shows the `datetime` instance without timezone information. For example (this also applies to other widgets like [`st.dataframe`](/develop/api-reference/data/st.dataframe)):

```python
import streamlit as st
from datetime import datetime

st.write(datetime(2020, 1, 10, 10, 30))
# Outputs: 2020-01-10 10:30:00
```

Users of the above app always see the output as `2020-01-10 10:30:00`.

### **`datetime` instance with a timezone**

When you provide a `datetime` instance _and specify a timezone_, the frontend shows the `datetime` instance in that same timezone. For example (this also applies to other widgets like [`st.dataframe`](/develop/api-reference/data/st.dataframe)):

```python
import streamlit as st
from datetime import datetime
import pytz

st.write(datetime(2020, 1, 10, 10, 30, tzinfo=pytz.timezone("EST")))
# Outputs: 2020-01-10 10:30:00-05:00
```

Users of the above app always see the output as `2020-01-10 10:30:00-05:00`.

In both cases, neither the date nor time information automatically adjusts to the users' timezone on the frontend. What users see is identical to the corresponding `datetime` instance in the backend. To show date or time information in the timezone of the user viewing the app, use [`st.context.timezone`](/develop/api-reference/caching-and-state/st.context#contexttimezone) or [`st.context.timezone_offset`](/develop/api-reference/caching-and-state/st.context#contexttimezone_offset) to get the timezone of the user's browser. Then, convert your `datetime` instances to that timezone before displaying them.
