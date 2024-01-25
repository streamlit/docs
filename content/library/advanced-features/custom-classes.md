---
title: Custom Classes
slug: /library/advanced-features/custom-classes
---

# Custom classes

If you are building a more complex Streamlit app or working with existing code, you may have custom Python classes defined in your script. Common use-cases for custom Python classes include:

1. Defining a `@dataclass` to store related data within your app.
2. Defining an `Enum` class to represent a fixed set of options or values.
3. Defining custom interfaces to external services or databases not covered by [`st.connection`](/library/api-reference/connections/st.connection).

Streamlit reruns your script after every user interaction, custom classes may be redefined multiple times within the same Streamlit session, and this may result in unwanted effects. By following the guidelines on this page, you will be less likely to encounter common pitfalls.

We begin by covering some general-purpose guidelines that can be followed for all types of custom classes. Later on, we go into more detail about [Using `Enum` classes](#enums) specifically, and a configuration option which can make working with them more convenient.

## General Guidelines

**Option 1 - For all classes:**

- If possible, move class definitions into their own module file.

  For example:

  ```python
  # In Main.py ---------------------------------------
  import streamlit as st

  # MyClass gets redefined every time Main.py reruns
  class MyClass:
    def __init__(self, var1, var2):
        ...

  st.write(MyClass("foo", "bar"))
  ```

  becomes:

  ```python
  # In my_class.py ---------------------------------------
  class MyClass:
    def __init__(self, var1, var2):
        ...

  # In Main.py -------------------------------------------
  import streamlit as st
  from my_class import MyClass

  # MyClass doesn't change identity when Main.py reruns

  st.write(MyClass("foo", "bar"))
  ```

  Streamlit only reloads code in imported modules when it detects the code has changed. Thus, each time your page script reruns it is using the exact same `MyClass` as on the previous execution, rather than re-defining it.

**Option 2 - For classes that store data (like [dataclasses](https://docs.python.org/3/library/dataclasses.html)):**

- Consider defining a custom `__eq__` method based on the data _in_ the class.

  ```python
  import streamlit as st
  from dataclasses import dataclass

  @dataclass
  class MyDataclass:
    var1: int
    var2: float

    def __eq__(self, other):
      # Two instances of MyDataclass are equal if both of their
      # fields match -- their type() doesn't matter.
      return (self.var1, self.var2) == (other.var1, other.var2)

  st.write(MyDataclass(1, 5.5) == MyDataclass(1, 5.5))
  ```

  The default python `__eq__` implementations for both regular
  classes as well as `@dataclasses` depend on the in-memory ID of the class or class instance. To avoid problems in Streamlit, your custom
  `__eq__` method should not depend the `type()` of `self` and `other`.

- Alternatively, if you are storing data in `st.session_state`,
  consider defining serialization and deserialization methods like `to_str` and `from_str` for your class, and use these to store class instance data in `st.session_state` rather than storing the class instance itself.

**Option 3 - For classes that are used as resources (database connections, state managers, APIs):**

- Consider using the cached singleton pattern: Place a `st.cache_resource` decorator on a `staticmethod` of the class to generate a single
  instance of the class and cache it for future script reruns. For example:

  ```python
  import streamlit as st

  class MyResource:
    def __init__(self, api_url: str):
        self._url = api_url

    @st.cache_resource(ttl=500)
    @staticmethod
    def get_resource_manager(api_url: str):
        return MyResource(api_url)

  # This resource_manager is cached until session_state is cleared or 5 minutes has elapsed.
  resource_manager = MyResource.get_resource_manager("http://my.resource.io/api/")
  ```

## Explaining the problem with custom classes in Streamlit

So, what kind of pitfalls do these guidlines avoid? To explain that, we need to go into a little technical detail about how Streamlit stores data between each
page execution.

![A diagram showing the reason custom dataclasses can have problems when defined in a streamlit script](/img/custom_class_redefinition_flowchart.png)

<!-- TODO A diagram explaining how the internal widget session_state saves the set of values from previous script executions and then returns as the return-value, the user-selected item from among those values on the next script execution. -->

## Enums

The [Enum](https://docs.python.org/3/library/enum.html#enum.Enum) class from the Python standard library is a powerful way to define custom symbolic names
that can be used as options in an `st.multiselect` or `st.selectbox` in place of `str` values.
For example, you might add the following to your streamlit page:

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

By default, this Streamlit page will work as it appears it should -- the `Enum` values `Color.RED` and `Color.GREEN` appear in the `st.multiselect` widget,
and when the user picks both `Color.RED` and `Color.GREEN` they are shown the special message.

However, if you've read the rest of this page you might notice something tricky going on. There is a hidden problem with this code!
Specifically, the `Enum` class `Color` gets redefined every time this script is run. In Python if you define `Enum` classes with the same class name,
members, and values for those members, the classes and their members are still considered unique from each other, and cannot be compared.
This _should_ cause `if` condition to always evaluate `False`, since the `Color` values returned by `st.multiselect` would be of a different class
than the `Color` defined in each script execution.

To solve this, we have to have some way of making sure the `Color` values returned by `st.multiselect` are of the same `type()`.
While this is easily accomplished if you follow the general guidelines above and put your `Color` Enum in a separate python file, sometimes you may not
want to do all that just to store one small class that represents a few values. That's where the enabled-by-default `enumCoercion` configuration option comes in.

### Understanding the `enumCoercion` configuration option

When enabled (the default configuration) Streamlit tries to recognize when you are using
an element like `st.multiselect` or `st.selectbox` with a set of Enum members as
options. If it detects this, it will then convert the Enum values returned by the
widget to members of the class defined in the latest script execution. This is something we call automatic Enum coercion.

> TODO: Diagram similar to the one above but showing the EnumCoercion process.

This behavior is [configurable](https://docs.streamlit.io/library/advanced-features/configuration) via the `enumCoercion` setting in your Streamlit
`config.toml` file. It is enabled by default, and may be disabled or set to a stricter set of matching criteria.

If, with Enum coercion enabled, you find that you still encounter issues, consider following some of the other [general guildelines](#general-guidelines), such as moving your Enum class definition to a separate module file.
