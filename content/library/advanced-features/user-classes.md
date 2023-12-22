---
title: User Classes
slug: /library/advanced-features/user-classes
---

# User classes

Users building larger or more complex applications, or who are porting existing application code over to streamlit may, eventually, want to utilize user-defined classes within their script. Common reasons for this include:

1. Defining a custom `@dataclass` to store data within your app
2. Defining an `Enum` class to represent a fixed set of options.
3. Defining custom interfaces to external services or databases not covered by Streamlit's `experimental_connection` [API](/library/api-reference/connections/st.experimental_connection).

Because streamlit runs your main script from top to bottom at every user interaction or code change, care must be taken when defining custom user classes. By following the guidelines on this page, you will be less likely to encounter common pitfalls of using User-defined clases in your app.

<Collapse title="Table of contents" expanded={true}>

1. [Basic guildelines](#basic-guidelines)
2. [Enums](#enums)

</Collapse>

## Basic Guidelines

**For all classes:**

- If possible, move class definitions into their own module file. This keeps them from getting re-defined when Streamlit re-runs your page.
  In other words

  ```python
  # In Main.py
    import streamlit as st

    # MyClass gets re-defined every time Main.py re-runs
    class MyClass:
      def __init__(self, var1, var2):
          ...

    st.write(MyClass("foo", "bar"))
  ```

  becomes

  ```python
  # In my_class.py
    class MyClass:
      def __init__(self, var1, var2):
          ...

  # In Main.py
    import streamlit as st
    from my_class import MyClass

    # MyClass doesn't change identity when Main.py re-runs

    st.write(MyClass("foo", "bar"))
  ```

**For classes that store data (like [dataclasses](https://docs.python.org/3/library/dataclasses.html)):**

- Consider defining a custom `__eq__` method based on the data _in_ the class. The default python `__eq__` implementations for both regular
  classes as well as `@dataclasses` depend on the in-memory ID of the class or class instance. This can cause comparison problems when a class gets redefined by Streamlit as it re-runs your code, so avoid it alltogether by defining `__eq__` in a way that depends only on the data encapsulated by the class and not the object identity.

  ```python
  import streamlit as st
  from dataclasses import dataclass

  @dataclass
  class MyDataclass:
    var1: int
    var2: float

    def __eq__(self, other):
      return (self.var1, self.var2) == (other.var1, other.var2)

  st.write(MyDataclass(1, 5.5) == MyDataclass(1, 5.5))
  ```

- Consider defining serialization and deserialization methods like `to_str` and `from_str` for your class, and use these to store class instance data in `st.session_state` rather than storing the class instance itself.

**For classes that are used as resources (database connections, state managers, APIs):**

- Consider using the cached singleton pattern: Place a `st.cache_resource` decorator on a `staticmethod` of the class to generate a single
  instance of the class and cache it for future script re-runs. For example:

  ```python
  import streamlit as st

  class MyResource:
    def __init__(self, api_url: str):
        self._url = api_url

    @st.cache_resource(ttl=500)
    @staticmethod
    def get_resource_manager(api_url: str):
        return MyResource(api_url)

  # This resource_manager is cached until session_state is cleared.
  resource_manager = MyResource.get_resource_manager("http://my.resource.io/api/")
  ```

## Enums

The [Enum](https://docs.python.org/3/library/enum.html) Python module is a powerful way to define custom symbolic names that can be used as options in an
`st.multiselect` or `st.selectbox` in place of `str` values. For example, you
might add the following to your streamlit page:

```python
from enum import Enum
import streamlit as st

# class syntax
class Color(Enum):
  RED = 1
  GREEN = 2
  BLUE = 3

selected_colors = set(st.multiselect("Pick the colors to use", options=Color))

if selected_colors == {Color.RED, Color.GREEN}:
  st.write("Hooray you found the color YELLOW!")
```

There is a hidden problem with this code: the Enum class gets re-defined every
time this script is run, and this causes the `if` condition to evaluate `False`
always.

> **The technical details**
>
> In Python, Enum classes with the same class name, members, and values for those members are still considered unique from each other. Due to how Streamlit stores widget values in session state across script re-runs, the enum instances returned by `st.multiselect` in this code example are always members of the class `Color` _defined during the previous script execution_, and thus the `if` statement will _always_ evaluate to `False`.

In order to avoid this, Streamlit tries to recognize when you are using
an element like `st.multiselect` or `st.selectbox` with a set of Enum members as
options. If it detects this, it will then convert the Enum values returned by the
widget to members of the class defined in the latest script execution. This is something we call automatic Enum coercion.

This behavior is [configurable](https://docs.streamlit.io/library/advanced-features/configuration) via the `enumCoercion` setting in your Streamlit
`config.toml` file. It is enabled by default, and may be disabled or set to a stricter set of matching criteria.

If, with Enum coercion enabled, you find that you still encounter issues, consider following some of the other [basic guildelines](#basic-guidelines), such as moving your Enum class definition to a separate module file.
