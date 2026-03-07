---
title: Create a component with React + TypeScript
slug: /develop/tutorials/custom-components/template-react
description: Build a package-based Streamlit custom component using the official template with React, TypeScript, and Vite.
keywords: custom components v2, tutorial, React, TypeScript, template, cookiecutter, package-based, Vite, component development
---

# Create a component with React + TypeScript

In this tutorial, you'll use the official [component template](https://github.com/streamlit/component-template) to generate a React-based custom component. You'll learn how React integrates with Streamlit's component lifecycle, how to manage the React root, and how to extend the template with React hooks and JSX.

## Prerequisites

- The following versions are required:

  ```text
  python>=3.10
  node>=24
  streamlit>=1.51.0
  ```

- [uv](https://docs.astral.sh/uv/) (recommended Python package manager)
- npm (included with Node.js)
- Familiarity with [React](https://react.dev/) basics (components, hooks, JSX)
- Familiarity with [inline custom components](/develop/concepts/custom-components/components-v2/examples)

## Summary

The template generates a working "Hello, World!" component with a click counter built using React. You'll walk through the generated code, then extend it to render a dynamic list of items from Python data.

Here's a look at what you'll build:

<Collapse title="Complete modified files" expanded={false}>

Directory structure:

```none
my-react-counter/
├── pyproject.toml
├── example.py
└── my_react_counter/
    ├── __init__.py
    ├── pyproject.toml
    └── frontend/
        ├── package.json
        ├── tsconfig.json
        ├── vite.config.ts
        └── src/
            ├── index.tsx
            └── MyComponent.tsx
```

`my_react_counter/__init__.py`:

```python
import streamlit as st

out = st.components.v2.component(
    "my-react-counter.my_react_counter",
    js="index-*.js",
    html='<div class="react-root"></div>',
)


def my_component(name, items=None, key=None, on_item_clicked=lambda: None):
    component_value = out(
        key=key,
        default={"num_clicks": 0, "selected_item": None},
        data={"name": name, "items": items or []},
        on_num_clicks_change=lambda: None,
        on_selected_item_change=lambda: None,
        on_item_clicked_change=on_item_clicked,
    )
    return component_value
```

`my_react_counter/frontend/src/index.tsx`:

```typescript
import {
  FrontendRenderer,
  FrontendRendererArgs,
} from "@streamlit/component-v2-lib";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";

import MyComponent, {
  MyComponentDataShape,
  MyComponentStateShape,
} from "./MyComponent";

const reactRoots: WeakMap<
  FrontendRendererArgs["parentElement"],
  Root
> = new WeakMap();

const MyComponentRoot: FrontendRenderer<
  MyComponentStateShape,
  MyComponentDataShape
> = (args) => {
  const { data, parentElement, setStateValue, setTriggerValue } = args;

  const rootElement = parentElement.querySelector(".react-root");
  if (!rootElement) {
    throw new Error("Unexpected: React root element not found");
  }

  let reactRoot = reactRoots.get(parentElement);
  if (!reactRoot) {
    reactRoot = createRoot(rootElement);
    reactRoots.set(parentElement, reactRoot);
  }

  const { name, items } = data;

  reactRoot.render(
    <StrictMode>
      <MyComponent
        name={name}
        items={items}
        setStateValue={setStateValue}
        setTriggerValue={setTriggerValue}
      />
    </StrictMode>,
  );

  return () => {
    const reactRoot = reactRoots.get(parentElement);
    if (reactRoot) {
      reactRoot.unmount();
      reactRoots.delete(parentElement);
    }
  };
};

export default MyComponentRoot;
```

`my_react_counter/frontend/src/MyComponent.tsx`:

```typescript
import { FrontendRendererArgs } from "@streamlit/component-v2-lib";
import { FC, ReactElement, useCallback, useState } from "react";

export type MyComponentStateShape = {
  num_clicks: number;
  selected_item: string | null;
};

export type MyComponentDataShape = {
  name: string;
  items: string[];
};

export type MyComponentProps = Pick<
  FrontendRendererArgs<MyComponentStateShape, MyComponentDataShape>,
  "setStateValue" | "setTriggerValue"
> &
  MyComponentDataShape;

const MyComponent: FC<MyComponentProps> = ({
  name,
  items,
  setStateValue,
  setTriggerValue,
}): ReactElement => {
  const [numClicks, setNumClicks] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const onClicked = useCallback((): void => {
    const newNumClicks = numClicks + 1;
    setNumClicks(newNumClicks);
    setStateValue("num_clicks", newNumClicks);
  }, [numClicks, setStateValue]);

  const onItemSelected = useCallback(
    (item: string): void => {
      setSelectedItem(item);
      setStateValue("selected_item", item);
      setTriggerValue("item_clicked", item);
    },
    [setStateValue, setTriggerValue],
  );

  return (
    <div style={{ fontFamily: "var(--st-font)", color: "var(--st-text-color)" }}>
      <h2>Hello, {name}!</h2>
      <button
        onClick={onClicked}
        style={{
          background: "var(--st-primary-color)",
          color: "white",
          border: "none",
          borderRadius: "var(--st-button-radius)",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Clicked {numClicks} times
      </button>
      {items && items.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {items.map((item) => (
            <li
              key={item}
              onClick={() => onItemSelected(item)}
              style={{
                padding: "0.5rem 1rem",
                margin: "0.25rem 0",
                background:
                  selectedItem === item
                    ? "var(--st-primary-color)"
                    : "var(--st-secondary-background-color)",
                color: selectedItem === item ? "white" : "inherit",
                borderRadius: "var(--st-base-radius)",
                cursor: "pointer",
                border: `1px solid var(--st-border-color)`,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyComponent;
```

`example.py`:

```python
import streamlit as st
from my_react_counter import my_component

st.title("My React Counter")

result = my_component(
    "Streamlit",
    items=["Python", "TypeScript", "React", "Vite"],
    key="counter",
)

st.write(f"Click count: {result.num_clicks}")
if result.selected_item:
    st.write(f"Selected: {result.selected_item}")
if result.item_clicked:
    st.write(f"Just clicked: {result.item_clicked}")
```

</Collapse>

## Generate the project

1. Navigate to the directory where you want to create your project and run the cookiecutter generator. The generator will create a new subdirectory for your project.

   ```bash
   uvx --from cookiecutter cookiecutter gh:streamlit/component-template --directory cookiecutter/v2
   ```

1. Follow the interactive prompts. When asked for the framework, choose **React + Typescript**:

   ```
   author_name [John Smith]: Your Name
   author_email [john@example.com]: you@example.com
   project_name [Streamlit Component X]: My React Counter
   package_name [my-react-counter]:
   import_name [my_react_counter]:
   description [Streamlit component that allows you to do X]: A React-based counter component
   Select open_source_license:
     ...
   Select framework:
   1 - React + Typescript
   2 - Pure Typescript
   Choose from 1, 2 [1]: 1
   ```

   This creates a `my-react-counter/` directory with the following structure:

   ```
   my-react-counter/
   ├── pyproject.toml
   ├── LICENSE
   ├── README.md
   ├── example.py
   └── my_react_counter/
       ├── __init__.py
       ├── pyproject.toml
       └── frontend/
           ├── package.json
           ├── tsconfig.json
           ├── vite.config.ts
           └── src/
               ├── index.tsx
               └── MyComponent.tsx
   ```

   Notice the React template has two frontend source files instead of one: `index.tsx` handles integration with Streamlit's lifecycle, and `MyComponent.tsx` contains the React component.

## Run the template

You need two terminals running in parallel for development.

1. In the first terminal, navigate into your new project directory and install the Python package in editable mode:

   ```bash
   cd my-react-counter
   uv pip install -e .
   ```

1. In the same terminal, navigate to the frontend directory, install dependencies, and start the dev build watcher:

   ```bash
   cd my_react_counter/frontend
   npm install
   npm run dev
   ```

1. In a second terminal, navigate to the project root and run the example app:

   ```bash
   cd my-react-counter
   streamlit run example.py
   ```

1. View your running app.

   You should see a "Hello, World!" heading with a "Click Me!" button. Clicking the button increments a counter that's sent back to Python.

## Understand the generated code

The Python side (`__init__.py` and `pyproject.toml` files) is identical to the Pure TypeScript template. See [Package-based components](/develop/concepts/custom-components/components-v2/package-based#understanding-the-project-structure) for details on those files. This section focuses on the React-specific frontend code.

1. Open `my_react_counter/frontend/src/index.tsx`:

   ```typescript
   import {
     FrontendRenderer,
     FrontendRendererArgs,
   } from "@streamlit/component-v2-lib";
   import { StrictMode } from "react";
   import { createRoot, Root } from "react-dom/client";

   import MyComponent, {
     MyComponentDataShape,
     MyComponentStateShape,
   } from "./MyComponent";

   const reactRoots: WeakMap<
     FrontendRendererArgs["parentElement"],
     Root
   > = new WeakMap();

   const MyComponentRoot: FrontendRenderer<
     MyComponentStateShape,
     MyComponentDataShape
   > = (args) => {
     const { data, parentElement, setStateValue } = args;

     const rootElement = parentElement.querySelector(".react-root");
     if (!rootElement) {
       throw new Error("Unexpected: React root element not found");
     }

     let reactRoot = reactRoots.get(parentElement);
     if (!reactRoot) {
       reactRoot = createRoot(rootElement);
       reactRoots.set(parentElement, reactRoot);
     }

     const { name } = data;

     reactRoot.render(
       <StrictMode>
         <MyComponent name={name} setStateValue={setStateValue} />
       </StrictMode>,
     );

     return () => {
       const reactRoot = reactRoots.get(parentElement);
       if (reactRoot) {
         reactRoot.unmount();
         reactRoots.delete(parentElement);
       }
     };
   };

   export default MyComponentRoot;
   ```

   This file is the bridge between Streamlit's component lifecycle and React. The pattern is different from a typical React app:
   - **React root management**: Streamlit calls your `FrontendRenderer` function on every re-render (whenever `data` changes). You can't create a new React root each time; instead, the `WeakMap` stores one root per component instance (keyed by `parentElement`). On the first call, it creates the root. On subsequent calls, it re-renders into the existing root.
   - **Passing props**: The bridge extracts `data` and `setStateValue` from Streamlit's args and passes them as React props to `MyComponent`. This is where you decide which Streamlit args your React component needs.
   - **Cleanup**: The returned function unmounts the React root when Streamlit removes the component from the page.

1. Open `my_react_counter/frontend/src/MyComponent.tsx`:

   ```typescript
   import { FrontendRendererArgs } from "@streamlit/component-v2-lib";
   import {
     CSSProperties,
     FC,
     ReactElement,
     useCallback,
     useMemo,
     useState,
   } from "react";

   export type MyComponentStateShape = {
     num_clicks: number;
   };

   export type MyComponentDataShape = {
     name: string;
   };

   export type MyComponentProps = Pick<
     FrontendRendererArgs<MyComponentStateShape, MyComponentDataShape>,
     "setStateValue"
   > &
     MyComponentDataShape;

   const MyComponent: FC<MyComponentProps> = ({
     name,
     setStateValue,
   }): ReactElement => {
     const [isFocused, setIsFocused] = useState(false);
     const [numClicks, setNumClicks] = useState(0);

     const style = useMemo<CSSProperties>(() => {
       const colorToUse = isFocused
         ? "var(--st-primary-color)"
         : "var(--st-gray-color)";
       return {
         border: `1px solid ${colorToUse}`,
         outline: `1px solid ${colorToUse}`,
       };
     }, [isFocused]);

     const onClicked = useCallback((): void => {
       const newNumClicks = numClicks + 1;
       setNumClicks(newNumClicks);
       setStateValue("num_clicks", newNumClicks);
     }, [numClicks, setStateValue]);

     return (
       <span>
         <h1>Hello, {name}!</h1>
         <button
           style={style}
           onClick={onClicked}
           onFocus={() => setIsFocused(true)}
           onBlur={() => setIsFocused(false)}
         >
           Click Me!
         </button>
       </span>
     );
   };

   export default MyComponent;
   ```

   This is a standard React functional component. Note the following:
   - **Type-safe props**: `MyComponentProps` is constructed from `FrontendRendererArgs` using TypeScript's `Pick` utility type. This ensures the `setStateValue` prop is correctly typed for the component's state shape.
   - **React state management**: Local UI state (like `isFocused`) is managed with React's `useState` hook. This state is purely for the frontend and doesn't need to go back to Python.
   - **Communicating with Python**: When the button is clicked, `setStateValue("num_clicks", newNumClicks)` sends the count back to Streamlit. This triggers a Python rerun, just like in non-React components.
   - **Streamlit theming**: The component uses CSS custom properties like `var(--st-primary-color)` directly in inline styles. These properties are provided by Streamlit's theme system and work inside the component's shadow DOM.

## Modify the component

Now extend the template to render a dynamic list of items from Python data. This showcases something React does well: declaratively rendering lists with state.

1. In `my_react_counter/frontend/src/MyComponent.tsx`, replace the file contents with the following:

   ```typescript
   import { FrontendRendererArgs } from "@streamlit/component-v2-lib";
   import { FC, ReactElement, useCallback, useState } from "react";

   export type MyComponentStateShape = {
     num_clicks: number;
     selected_item: string | null;
   };

   export type MyComponentDataShape = {
     name: string;
     items: string[];
   };

   export type MyComponentProps = Pick<
     FrontendRendererArgs<MyComponentStateShape, MyComponentDataShape>,
     "setStateValue" | "setTriggerValue"
   > &
     MyComponentDataShape;

   const MyComponent: FC<MyComponentProps> = ({
     name,
     items,
     setStateValue,
     setTriggerValue,
   }): ReactElement => {
     const [numClicks, setNumClicks] = useState(0);
     const [selectedItem, setSelectedItem] = useState<string | null>(null);

     const onClicked = useCallback((): void => {
       const newNumClicks = numClicks + 1;
       setNumClicks(newNumClicks);
       setStateValue("num_clicks", newNumClicks);
     }, [numClicks, setStateValue]);

     const onItemSelected = useCallback(
       (item: string): void => {
         setSelectedItem(item);
         setStateValue("selected_item", item);
         setTriggerValue("item_clicked", item);
       },
       [setStateValue, setTriggerValue],
     );

     return (
       <div style={{ fontFamily: "var(--st-font)", color: "var(--st-text-color)" }}>
         <h2>Hello, {name}!</h2>
         <button
           onClick={onClicked}
           style={{
             background: "var(--st-primary-color)",
             color: "white",
             border: "none",
             borderRadius: "var(--st-button-radius)",
             padding: "0.5rem 1rem",
             cursor: "pointer",
           }}
         >
           Clicked {numClicks} times
         </button>
         {items && items.length > 0 && (
           <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
             {items.map((item) => (
               <li
                 key={item}
                 onClick={() => onItemSelected(item)}
                 style={{
                   padding: "0.5rem 1rem",
                   margin: "0.25rem 0",
                   background:
                     selectedItem === item
                       ? "var(--st-primary-color)"
                       : "var(--st-secondary-background-color)",
                   color: selectedItem === item ? "white" : "inherit",
                   borderRadius: "var(--st-base-radius)",
                   cursor: "pointer",
                   border: `1px solid var(--st-border-color)`,
                 }}
               >
                 {item}
               </li>
             ))}
           </ul>
         )}
       </div>
     );
   };

   export default MyComponent;
   ```

1. In `my_react_counter/frontend/src/index.tsx`, replace the file contents with the following to pass the new props:

   ```typescript
   import {
     FrontendRenderer,
     FrontendRendererArgs,
   } from "@streamlit/component-v2-lib";
   import { StrictMode } from "react";
   import { createRoot, Root } from "react-dom/client";

   import MyComponent, {
     MyComponentDataShape,
     MyComponentStateShape,
   } from "./MyComponent";

   const reactRoots: WeakMap<
     FrontendRendererArgs["parentElement"],
     Root
   > = new WeakMap();

   const MyComponentRoot: FrontendRenderer<
     MyComponentStateShape,
     MyComponentDataShape
   > = (args) => {
     const { data, parentElement, setStateValue, setTriggerValue } = args;

     const rootElement = parentElement.querySelector(".react-root");
     if (!rootElement) {
       throw new Error("Unexpected: React root element not found");
     }

     let reactRoot = reactRoots.get(parentElement);
     if (!reactRoot) {
       reactRoot = createRoot(rootElement);
       reactRoots.set(parentElement, reactRoot);
     }

     const { name, items } = data;

     reactRoot.render(
       <StrictMode>
         <MyComponent
           name={name}
           items={items}
           setStateValue={setStateValue}
           setTriggerValue={setTriggerValue}
         />
       </StrictMode>,
     );

     return () => {
       const reactRoot = reactRoots.get(parentElement);
       if (reactRoot) {
         reactRoot.unmount();
         reactRoots.delete(parentElement);
       }
     };
   };

   export default MyComponentRoot;
   ```

1. In `my_react_counter/__init__.py`, replace the file contents with the following to pass items and handle the new callbacks:

   ```python
   import streamlit as st

   out = st.components.v2.component(
       "my-react-counter.my_react_counter",
       js="index-*.js",
       html='<div class="react-root"></div>',
   )


   def my_component(name, items=None, key=None, on_item_clicked=lambda: None):
       component_value = out(
           key=key,
           default={"num_clicks": 0, "selected_item": None},
           data={"name": name, "items": items or []},
           on_num_clicks_change=lambda: None,
           on_selected_item_change=lambda: None,
           on_item_clicked_change=on_item_clicked,
       )
       return component_value
   ```

1. To exercise the new list feature, replace the contents of `example.py` with the following:

   ```python
   import streamlit as st
   from my_react_counter import my_component

   st.title("My React Counter")

   result = my_component(
       "Streamlit",
       items=["Python", "TypeScript", "React", "Vite"],
       key="counter",
   )

   st.write(f"Click count: {result.num_clicks}")
   if result.selected_item:
       st.write(f"Selected: {result.selected_item}")
   if result.item_clicked:
       st.write(f"Just clicked: {result.item_clicked}")
   ```

1. If `npm run dev` is still running, the frontend rebuilds automatically. Save your files, refresh your Streamlit app, and view the updated component with a clickable list.

## Build for production

When you're ready to share your component, create a production build.

1. In a terminal, navigate to the frontend directory and build the frontend:

   ```bash
   cd my-react-counter/my_react_counter/frontend
   npm run build
   ```

1. Navigate to the project root and build the Python wheel:

   ```bash
   cd ../../..
   uv build
   ```

   This creates a `.whl` file in the `dist/` directory that you can distribute or upload to PyPI. For publishing instructions, see [Publish a Component](/develop/concepts/custom-components/publish).

## What's next?

- Learn more about the project structure in [Package-based components](/develop/concepts/custom-components/components-v2/package-based).
- Understand [State vs trigger values](/develop/concepts/custom-components/components-v2/state-and-triggers) for interactive components.
- Explore [Theming and styling](/develop/concepts/custom-components/components-v2/theming) to use Streamlit's CSS custom properties.
- Try the [Pure TypeScript tutorial](/develop/tutorials/custom-components/template-typescript) if you want a lighter-weight approach without React.
