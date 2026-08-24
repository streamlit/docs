---
title: Create a component with Pure TypeScript
slug: /develop/tutorials/custom-components/template-typescript
description: Build a package-based Streamlit custom component using the official template with Pure TypeScript and Vite.
keywords: custom components v2, tutorial, TypeScript, template, cookiecutter, package-based, Vite, component development
---

# Create a component with Pure TypeScript

In this tutorial, you'll use the official [component template](https://github.com/streamlit/component-template) to generate a package-based custom component, understand how each piece works, and modify the component to make it your own.

## Prerequisites

- The following packages must be installed in your Python environment:
  ```text hideHeader
  streamlit>=1.51.0
  uv
  ```
- Node.js 24 or later must be installed. This includes npm, the package manager for JavaScript.
- Familiarity with [inline custom components](/develop/concepts/custom-components/components-v2/examples) is recommended.

## Summary

The template generates a working "Hello, World!" component with a click counter. You'll walk through the generated code, then extend it to add a reset button with a trigger value.

Here's a look at what you'll build:

<Collapse title="Complete modified files" expanded={false}>

```none filename="Directory structure" hideCopyButton
my-click-counter/
├── pyproject.toml
├── example.py
└── my_click_counter/
    ├── __init__.py
    ├── pyproject.toml
    └── frontend/
        ├── package.json
        ├── tsconfig.json
        ├── vite.config.ts
        └── src/
            └── index.ts
```

```python filename="my_click_counter/__init__.py"
import streamlit as st

out = st.components.v2.component(
    "my-click-counter.my_click_counter",
    js="index-*.js",
    html="""
        <div class="component-root">
            <span>
                <h1></h1>
                <div class="buttons">
                    <button id="increment">Click me!</button>
                    <button id="reset">Reset</button>
                </div>
                <p id="count"></p>
            </span>
        </div>
    """,
)


def my_click_counter(name, key=None, on_reset=lambda: None):
    component_value = out(
        name=name,
        key=key,
        default={"num_clicks": 0},
        data={"name": name},
        on_num_clicks_change=lambda: None,
        on_was_reset_change=on_reset,
    )
    return component_value
```

```typescript filename="my_click_counter/frontend/src/index.ts"
import {
  FrontendRenderer,
  FrontendRendererArgs,
} from "@streamlit/component-v2-lib";

export type FrontendState = {
  num_clicks: number;
  was_reset: boolean;
};

export type ComponentData = {
  name: string;
};

const instances: WeakMap<
  FrontendRendererArgs["parentElement"],
  { numClicks: number }
> = new WeakMap();

const MyComponent: FrontendRenderer<FrontendState, ComponentData> = (args) => {
  const { parentElement, data, setStateValue, setTriggerValue } = args;

  const rootElement = parentElement.querySelector(".component-root");
  if (!rootElement) {
    throw new Error("Unexpected: root element not found");
  }

  const heading = rootElement.querySelector("h1");
  if (heading) {
    heading.textContent = `Hello, ${data.name}!`;
  }

  const incrementBtn =
    rootElement.querySelector<HTMLButtonElement>("#increment");
  const resetBtn = rootElement.querySelector<HTMLButtonElement>("#reset");
  const countDisplay = rootElement.querySelector("#count");

  if (!incrementBtn || !resetBtn || !countDisplay) {
    throw new Error("Unexpected: required elements not found");
  }

  const currentCount = instances.get(parentElement)?.numClicks || 0;
  countDisplay.textContent = `Clicks: ${currentCount}`;
  const handleIncrement = () => {
    const numClicks = (instances.get(parentElement)?.numClicks || 0) + 1;
    instances.set(parentElement, { numClicks });
    countDisplay.textContent = `Clicks: ${numClicks}`;
    setStateValue("num_clicks", numClicks);
  };

  const handleReset = () => {
    instances.set(parentElement, { numClicks: 0 });
    countDisplay.textContent = `Clicks: 0`;
    setStateValue("num_clicks", 0);
    setTriggerValue("was_reset", true);
  };

  if (!instances.has(parentElement)) {
    incrementBtn.addEventListener("click", handleIncrement);
    resetBtn.addEventListener("click", handleReset);
    instances.set(parentElement, { numClicks: 0 });
  }

  return () => {
    incrementBtn.removeEventListener("click", handleIncrement);
    resetBtn.removeEventListener("click", handleReset);
    instances.delete(parentElement);
  };
};

export default MyComponent;
```

```python filename="example.py"
import streamlit as st
from my_click_counter import my_click_counter

st.title("My Click Counter")

def handle_reset():
    st.toast("Counter was reset!")

result = my_click_counter("Streamlit", key="counter", on_reset=handle_reset)

st.write(f"Click count: {result.num_clicks}")
if result.was_reset:
    st.write("The counter was just reset.")
```

</Collapse>

## Generate the project

1. Navigate to the directory where you want to create your project and run the cookiecutter generator. The generator will create a new subdirectory for your project.

   ```bash
   uvx --from cookiecutter cookiecutter gh:streamlit/component-template --directory cookiecutter/v2
   ```

1. Follow the interactive prompts. When asked for the framework, select **Pure Typescript**:

   ```shell
   [1/8] author_name (John Smith): Your Name
   [2/8] author_email (john@example.com): you@example.com
   [3/8] project_name (Streamlit Component X): My Click Counter
   [4/8] package_name (streamlit-component-x): my-click-counter
   [5/8] import_name (streamlit_component_x): my_click_counter
   [6/8] description (Streamlit component that allows you to do X): A click counter component
   [7/8] Select open_source_license
     ...
     Choose from [1/2/3/4/5/6](1): 1
   [8/8] Select framework
     1 - React + Typescript
     2 - Pure Typescript
     Choose from [1/2] (1): 2
   ```

   This creates a `my-click-counter/` directory with the following structure:

   ```none hideHeader
   my-click-counter/
   ├── example.py
   ├── LICENSE
   ├── MANIFEST.in
   ├── pyproject.toml
   ├── README.md
   └── my_click_counter/
       ├── __init__.py
       ├── pyproject.toml
       └── frontend/
           ├── package.json
           ├── tsconfig.json
           ├── vite.config.ts
           └── src/
               ├── index.ts
               └── vite-env.d.ts
   ```

## Run the template

You need two terminals running in parallel for development. The following steps use `uv run` to run commands inside the project's virtual environment. If a `.venv` doesn't exist yet, `uv run` creates one automatically.

1. In the first terminal, navigate to the frontend directory, install dependencies, and start the dev build watcher:

   ```bash
   cd my-click-counter/my_click_counter/frontend
   npm install
   npm run dev
   ```

1. In a second terminal, navigate to the project root and run the example app:

   ```bash
   cd my-click-counter
   uv run streamlit run example.py
   ```

1. View your running app.

   You should see a "Hello, World!" heading with a "Click Me!" button. Clicking the button increments a counter that's sent back to Python. An `st.text_input` lets you specify a name which is passed to a second instance of the component.

## Understand the generated code

Now that the component is running, walk through each file to understand how it works.

1. Open `my_click_counter/__init__.py`:

   ```python
   import streamlit as st

   out = st.components.v2.component(
       "my-click-counter.my_click_counter",
       js="index-*.js",
       html="""
           <div class="component-root">
               <span>
                   <h1></h1>
                   <button>Click me!</button>
               </span>
           </div>
       """,
   )


   def on_num_clicks_change():
       pass


   def my_click_counter(name, key=None):
       component_value = out(
           name=name,
           key=key,
           default={"num_clicks": 0},
           data={"name": name},
           on_num_clicks_change=on_num_clicks_change,
       )

       return component_value
   ```

   This file does two things:
   - **Registers the component** with `st.components.v2.component()`. The first argument is a qualified name (`"<package-name>.<component-name>"`) where `<package-name>` matches the `name` field in the project-level `pyproject.toml` and `<component-name>` matches the `name` field in the component-level `pyproject.toml`. The other two arguments point to the frontend assets: `js` is a glob pattern that matches the JavaScript bundle produced by Vite. `html` provides the initial markup that's rendered before the JavaScript loads.

   - **Defines a wrapper function** (`my_click_counter`) that provides a clean API. The wrapper calls the raw component with `data`, `default`, and callback parameters. This pattern is optional but recommended. For more about these parameters, see [Component mounting](/develop/concepts/custom-components/components-v2/mount).

1. Open `my_click_counter/frontend/src/index.ts`:

   ```typescript
   import {
     FrontendRenderer,
     FrontendRendererArgs,
   } from "@streamlit/component-v2-lib";

   export type FrontendState = {
     num_clicks: number;
   };

   export type ComponentData = {
     name: string;
   };

   const instances: WeakMap<
     FrontendRendererArgs["parentElement"],
     { numClicks: number }
   > = new WeakMap();

   const MyComponent: FrontendRenderer<FrontendState, ComponentData> = (
     args,
   ) => {
     const { parentElement, data, setStateValue } = args;

     const rootElement = parentElement.querySelector(".component-root");
     if (!rootElement) {
       throw new Error("Unexpected: root element not found");
     }

     const heading = rootElement.querySelector("h1");
     if (heading) {
       heading.textContent = `Hello, ${data.name}!`;
     }

     const button = rootElement.querySelector<HTMLButtonElement>("button");
     if (!button) {
       throw new Error("Unexpected: button element not found");
     }

     const handleClick = () => {
       const numClicks = (instances.get(parentElement)?.numClicks || 0) + 1;
       instances.set(parentElement, { numClicks });
       setStateValue("num_clicks", numClicks);
     };

     if (!instances.has(parentElement)) {
       button.addEventListener("click", handleClick);
       instances.set(parentElement, { numClicks: 0 });
     }

     return () => {
       button.removeEventListener("click", handleClick);
       instances.delete(parentElement);
     };
   };

   export default MyComponent;
   ```

   This follows the same pattern as inline components, but with TypeScript types. Here are the key pieces:
   - **Type definitions**: `FrontendState` and `ComponentData` define the shape of the component's state and the data it receives from Python. These are used as generic parameters on `FrontendRenderer` for type safety.
   - **Instance tracking**: The `WeakMap` tracks per-instance state (the click count) across re-renders. Since Streamlit calls your function on every re-render, you need a way to persist state between calls without re-adding event listeners.
   - **`setStateValue`**: Sends the updated click count back to Python. This triggers a rerun, just like in inline components.
   - **Cleanup function**: The returned function removes event listeners when the component is unmounted.

The `vite.config.ts` builds your TypeScript into an ES module with a hashed filename (like `index-a1b2c3d4.js`). The `pyproject.toml` files tell setuptools to include these build artifacts in the Python package, and tell Streamlit where to find and serve them. For a detailed explanation of each configuration file, see [Package-based components](/develop/concepts/custom-components/components-v2/package-based#understanding-the-project-structure).

## Modify the component

You can extend the template to add a reset button and a trigger value that fires when the counter is reset.

1. In `my_click_counter/__init__.py`, make the following changes to the `html` parameter to add a reset button and a count display:

   ```diff-python
   =    html="""
   =        <div class="component-root">
   =            <span>
   =                <h1></h1>
   -                <button>Click me!</button>
   +                <div class="buttons">
   +                    <button id="increment">Click me!</button>
   +                    <button id="reset">Reset</button>
   +                </div>
   +                <p id="count"></p>
   =            </span>
   =        </div>
   =    """,
   ```

   <Tip>

   The copy button on the diff code blocks only copy the lines in the final result, not the deleted lines.

   </Tip>

1. In `my_click_counter/frontend/src/index.ts`, make the following changes to handle both buttons:

   ```diff-typescript
   =import {
   =  FrontendRenderer,
   =  FrontendRendererArgs,
   =} from "@streamlit/component-v2-lib";
   =
   =export type FrontendState = {
   =  num_clicks: number;
   +  was_reset: boolean;
   =};
   =
   =export type ComponentData = {
   =  name: string;
   =};
   =
   =const instances: WeakMap<
   =  FrontendRendererArgs["parentElement"],
   =  { numClicks: number }
   => = new WeakMap();
   =
   =const MyComponent: FrontendRenderer<FrontendState, ComponentData> = (
   =  args,
   =) => {
   -  const { parentElement, data, setStateValue } = args;
   +  const { parentElement, data, setStateValue, setTriggerValue } = args;
   =
   =  const rootElement = parentElement.querySelector(".component-root");
   =  if (!rootElement) {
   =    throw new Error("Unexpected: root element not found");
   =  }
   =
   =  const heading = rootElement.querySelector("h1");
   =  if (heading) {
   =    heading.textContent = `Hello, ${data.name}!`;
   =  }
   =
   -  const button = rootElement.querySelector<HTMLButtonElement>("button");
   -  if (!button) {
   -    throw new Error("Unexpected: button element not found");
   -  }
   +  const incrementBtn =
   +    rootElement.querySelector<HTMLButtonElement>("#increment");
   +  const resetBtn = rootElement.querySelector<HTMLButtonElement>("#reset");
   +  const countDisplay = rootElement.querySelector("#count");
   +
   +  if (!incrementBtn || !resetBtn || !countDisplay) {
   +    throw new Error("Unexpected: required elements not found");
   +  }
   +
   +  const currentCount = instances.get(parentElement)?.numClicks || 0;
   +  countDisplay.textContent = `Clicks: ${currentCount}`;
   -
   -  const handleClick = () => {
   +  const handleIncrement = () => {
   =    const numClicks = (instances.get(parentElement)?.numClicks || 0) + 1;
   =    instances.set(parentElement, { numClicks });
   +    countDisplay.textContent = `Clicks: ${numClicks}`;
   =    setStateValue("num_clicks", numClicks);
   =  };
   +
   +  const handleReset = () => {
   +    instances.set(parentElement, { numClicks: 0 });
   +    countDisplay.textContent = `Clicks: 0`;
   +    setStateValue("num_clicks", 0);
   +    setTriggerValue("was_reset", true);
   +  };
   =
   =  if (!instances.has(parentElement)) {
   -    button.addEventListener("click", handleClick);
   +    incrementBtn.addEventListener("click", handleIncrement);
   +    resetBtn.addEventListener("click", handleReset);
   =    instances.set(parentElement, { numClicks: 0 });
   =  }
   =
   =  return () => {
   -    button.removeEventListener("click", handleClick);
   +    incrementBtn.removeEventListener("click", handleIncrement);
   +    resetBtn.removeEventListener("click", handleReset);
   =    instances.delete(parentElement);
   =  };
   =};
   =
   =export default MyComponent;
   ```

   The key changes are:
   - Added `was_reset` to the `FrontendState` type.
   - Added `setTriggerValue` to the destructured args. Unlike `setStateValue`, trigger values are transient and reset to `None` after each rerun.
   - Renamed the button to `incrementBtn` and the click handler to `handleIncrement`.
   - Named the new button `resetBtn`.
   - Added a reset handler, `handleReset`, that sets the count back to zero and fires a `"was_reset"` trigger.
   - Added a count display that updates on each click.

1. In `my_click_counter/__init__.py`, make the following changes to the wrapper function to handle the new trigger:

   ```diff-python
   -def on_num_clicks_change():
   -    pass
   -
   -
   -def my_click_counter(name, key=None):
   +def my_click_counter(name, key=None, on_reset=lambda: None):
   =   component_value = out(
   =       name=name,
   =       key=key,
   =       default={"num_clicks": 0},
   =       data={"name": name},
   -       on_num_clicks_change=on_num_clicks_change,
   +       on_num_clicks_change=lambda: None,
   +       on_was_reset_change=on_reset,
   =   )
   =   return component_value
   ```

   The wrapper now accepts an `on_reset` callback that defaults to `lambda: None`. Inside, `on_num_clicks_change` uses an inline lambda since nothing needs to happen when the count changes. `on_was_reset_change` passes through the caller's `on_reset` callback so the app can react when the counter is reset.

1. If `npm run dev` is still running, the frontend rebuilds automatically. Refresh your Streamlit app to see the changes.

1. To try the new functionality in a clean example, replace the contents of `example.py` with the following code:

   ```python
   import streamlit as st
   from my_click_counter import my_click_counter

   st.title("My Click Counter")

   def handle_reset():
       st.toast("Counter was reset!")

   result = my_click_counter("Streamlit", key="counter", on_reset=handle_reset)

   st.write(f"Click count: {result.num_clicks}")
   if result.was_reset:
       st.write("The counter was just reset.")
   ```

1. Save your file and view your running app.

## Build for production

When you're ready to share your component, create a production build.

1. Stop the `npm run dev` watcher and the `streamlit run` process by pressing `Ctrl+C` in each terminal.

1. In either terminal, navigate to the frontend directory and build the frontend:

   ```bash
   cd my-click-counter/my_click_counter/frontend
   npm run build
   ```

1. Navigate to the project root and build the Python wheel:

   ```bash
   cd ../..
   uv build
   ```

   This creates a `.whl` file in the `dist/` directory that you can distribute or upload to PyPI. For publishing instructions, see [Publish a Component](/develop/concepts/custom-components/publish).

## What's next?

- Learn more about the project structure in [Package-based components](/develop/concepts/custom-components/components-v2/package-based).
- Understand [State vs trigger values](/develop/concepts/custom-components/components-v2/state-and-triggers) for interactive components.
- Explore [Theming and styling](/develop/concepts/custom-components/components-v2/theming) to use Streamlit's CSS custom properties.
- Try the [React + TypeScript tutorial](/develop/tutorials/custom-components/template-react) if you want to use React.
