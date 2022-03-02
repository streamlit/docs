---
title: Working with timezones
slug: /library/advanced-features/timezone-handling
---

# Working with timezones

If you deploy a Streamlit app, many users will have different timezones compared to the timezone of the server your Streamlit app is running on. Streamlit always shows `datetime` information on the frontend with the exact same information as its corresponding `datetime` instance in the backend. We distinguish between:

1) **`datetime` instance without timezone (naive)**: The frontend will show the `datetime` instance without timezone. Date or time information will not be automatically adjusted. For example (this also applyes to other components like `st.dataframe`):

    ```python
    import streamlit as st
    from datetime import datetime

    st.write(datetime(2020, 1, 10, 10, 30))
    # Outputs: 2020-01-10 10:30:00
    ```

2) **`datetime` instance with a timezone**: The frontend will show the `datetime` instance in that exact timezone. Date or time information will not be automatically adjusted. For example (this also applyes to other components like `st.dataframe`):

    ```python
    import streamlit as st
    from datetime import datetime
    import pytz

    st.write(datetime(2020, 1, 10, 10, 30), tzinfo=pytz.timezone("EST")))
    # Outputs: 2020-01-10 10:30:00-05:00
    ```

It is currently not possible to automatically adjust datetime information to the user’s timezone.

<Note>

The legacy version of the `st.dataframe` has issues with timezones. We do not plan to roll out additional fixes or enhancements for the legacy dataframe. If you need stable timezone support, please consider switching to the arrow serialization. 

</Note>
