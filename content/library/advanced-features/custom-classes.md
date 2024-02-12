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

We begin by covering some general-purpose guidelines that can be followed for all types of custom classes. Then we explain in more techncial detail the reason behind why these problems, which we call generally [Class-Redefinition Problems](#the-class-redefinition-problem), occur. Finally, we go into more detail about [Using `Enum` classes](#enums) specifically, and a configuration option which can make working with them more convenient.

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

## The Class-Redefinition Problem

So, what kind of problems do these guidlines avoid? To answer this, we need to understand a few technical details about how Streamlit runs your page. If you're not interested or you find this section difficult to understand, don't worry; follow the guidelines above and you should avoid 99% of the issues.

The core problem of using custom classes in a Streamlit page script is something we'll call the "Class-Redefinition Problem": the fact that in Python, two classes
with the same name and contents are still two different types. This is actually a problem you can encounter in Python code that isn't being run inside Streamlit, as demonstrated in this first example below.

### Example Problem 1: Same class defined in two different modules

```python
# Directory structure
# / my_python_program
#   |- Main.py
#   |- a.py
#   |- b.py

# a.py
from dataclasses import dataclass

@dataclass
class Student:
  student_id: int
  name: str


# b.py
from dataclasses import dataclass

@dataclass
class Student:
  student_id: int
  name: str


# Main.py
import a
import b

print("Marshall is Marshall (a<->a):", a.Student(1, "Marshall") == a.Student(1, "Marshall"))
# > Marshall is Marshall (a<->a): True
print("Marshall is Marshall (a<->b):", a.Student(1, "Marshall") == b.Student(1, "Marshall"))
# > Marshall is Marshall (a<->b): False
```

In this example, the class `Student` is defined twice, once in module `a.py` and once in module `b.py`. By default, instances of `dataclass`es in Python check class identity when being compared to each other. Thus, `a.Student(1, "Marshall") == b.Student(1, "Marshall")` is false, even though both classes have the same name (`Student`) and the same fields (`student_id` and `name`).

### Example Problem 2: Same class redefined upon reloading a module (PROBABLY DELETE THIS SECTION)

If you thought it was fairly obvious that this example wouldn't work, let's remove one of the modules. This time, we'll use the [`importlib.reload()`](https://docs.python.org/3/library/importlib.html#importlib.reload) standard-library function to
force a single module `page.py` to reload mid-script.

```python
# Directory structure
# / my_python_program
#   |- Main.py
#   |- page.py

# page.py
from dataclasses import dataclass

@dataclass
class Student:
  student_id: int
  name: str


# Main.py
import page
from importlib import reload

marshall_pre_reload = page.Student(1, "Marshall")
reload(page)
marshall_post_reload = page.Student(1, "Marshall")

print("Marshall is Marshall (pre<->pre):", marshall_pre_reload == marshall_pre_reload)
# > Marshall is Marshall (pre<->pre): True
print("Marshall is Marshall (post<->post):", marshall_post_reload == marshall_post_reload)
# > Marshall is Marshall (post<->post): True
print("Marshall is Marshall (pre<->post):", marshall_pre_reload == marshall_post_reload)
# > Marshall is Marshall (pre<->post): False
```

This time, the `page` module gets reloaded in the middle of `Main.py`, at which point the `Student` class is _redefined_. `page.Student` before the reload is not the same class
as `page.Student` after the reload, and because they are `dataclass`es, the pre- and post- instances of "Marshall" are not considered equal to each other.

### The Class-Redefinition Problem in Streamlit

The call to `reload(page)` in the example above is _very_ similar to how Streamlit [actually executes](/get-started/fundamentals/main-concepts#data-flow) your Streamlit page code from top to bottom each time a user interacts with a widget in your app. Each time, any custom classes that you have defined in your Streamlit page code get redefined.

However, class redefinition by itself is not sufficient to cause the Class-Redefinition Problems that we saw in the above examples. There must also be some place where two instances of the "same" redefined class are compared, as was the case with `marshall_pre_reload == marshall_post_reload`.

To understand where this happens in your Streamlit page, it is necessary to expose a few more details of what goes on when you call a Streamlit widget function like `st.selectbox` or `st.radio`. This is an advanced topic, and involves discussion of [Session State](/get-started/fundamentals/advanced-concepts#session-state), so if you are unfamiliar with that concept consider reading about it first before returning here.

### How Streamlit widgets store options

Several Streamlit UI elements, such as `st.selectbox` or `st.radio`, accept multiple-choice options via an `options=` argument. The user of your application can typically select one or more of these options, and the value(s) selected is/are returned as the value of the Streamlit function call. For example:

```python
number = st.selectbox("Pick a number, any number", options=[1, 2, 3])
# number == whatever value the user has selected from the UI.
```

When you call a function like `st.selectbox`, the items in the `list`/`tuple`/`Iterable` that you pass to `options=` are saved into a hidden portion of [Session State](/get-started/fundamentals/advanced-concepts#session-state) called the Widget Metadata, along with the currently selected option.

When the user of your application interacts with the `selectbox` (or other) widget in their web browser, the Streamlit Javascript code running in their browser sends back the new index(s) of the option(s) they selected. These index(s) are then used to determine which values from the original `options=` list, _saved in the Widget Metadata from the previous page execution_, are returned to your application.

The key detail to note here is that the value(s) returned by the `st.selectbox` or `st.radio` widget function are the ones saved in Session State during the _previous_ execution of the page (except on the very first execution, where this is not the case), NOT the values passed to `options=` on the _current_ execution. There are a number of architectural
why Streamlit is designed this way, which we won't go into here. Suffice to say that **this** is how we end up in a situation where it is possible to compare instances of the same custom class pre- and post- definition.

### Example 3: Same class redefined each page execution

```python
import streamlit as st
from dataclasses import dataclass

@dataclass
class Student:
  student_id: int
  name: str

student_list = [
  Student(1, "Marlene"),
  Student(2, "Waldo"),
  Student(3, "Emma"),
]

# Here, the type() of selected_student is the class `Student`
# from the _last_ time Streamlit ran this page,
# not the class `Student` defined just a couple of lines above.
selected_student = st.selectbox(student_list)
st.write("The current Student class ID is", id(Student))
st.write("The selected Student's class ID is", id(selected_student.__class__))

# So, selected_student can _never_ == Student(1, "Marlene"),
# because it is always a different Class.
if selected_student == student_list[0]:
  st.success("You Found Marlene!")
elif selected_student == student_list[1]:
  st.success("You Found Waldo!")
```

![A diagram showing the reason custom dataclasses can have problems when defined in a streamlit script](/images/custom_classes.png)

As a final note, we've been using `dataclass`es in all of the examples in this section to illustrate a point, but in fact it is possible to encounter these same problems in
non-`dataclass` classes. Any class which checks class identity inside of a comparison operator such as `__eq__`, `__gt__`, etc. can exhibit these issues.

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

### Understanding the "enumCoercion" configuration option

When enabled (the default configuration) Streamlit tries to recognize when you are using
an element like `st.multiselect` or `st.selectbox` with a set of Enum members as
options.

If it detects this, it will then convert the Enum values returned by the
widget to members of the class defined in the latest script execution. This is something we call automatic Enum coercion.

This behavior is [configurable](https://docs.streamlit.io/library/advanced-features/configuration) via the `enumCoercion` setting in your Streamlit
`config.toml` file. It is enabled by default, and may be disabled or set to a stricter set of matching criteria.

If, with Enum coercion enabled, you find that you still encounter issues, consider following some of the other [general guildelines](#general-guidelines), such as moving your Enum class definition to a separate module file.
