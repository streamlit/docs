---
title: Package-based components
slug: /develop/concepts/custom-components/components-v2/package-based
description: Learn how to build complex Custom Components v2 using package-based development with TypeScript, modern build tools, and external dependencies.
keywords: custom components v2, package-based components, TypeScript, build tools, Vite, pyproject.toml, npm packages, component distribution, component template
---

# Package-based components

While inline components are perfect for rapid prototyping, package-based components provide the full power of modern frontend development. This approach is ideal for complex components that require TypeScript, external dependencies, build optimization, or distribution as Python packages.

Choose package-based components when you need one of the following features:

- **TypeScript support**: Type safety and better developer experience
- **External dependencies**: React, D3, Chart.js, or other npm packages
- **Build optimization**: Code splitting, minification, and bundling
- **Team development**: Proper tooling, testing, and collaboration workflows
- **Distribution**: Publishing components as Python packages on PyPI
- **Complex logic**: Multi-file projects with organized code structure

## Get started with the template

The fastest way to create a package-based component is with the official [component template](https://github.com/streamlit/component-template). It generates a complete project with all the configuration, build tooling, and boilerplate you need.

<Tip>

For step-by-step walkthroughs of using the template, see the tutorials:

- [Create a component with Pure TypeScript](/develop/tutorials/custom-components/template-typescript)
- [Create a component with React + TypeScript](/develop/tutorials/custom-components/template-react)

</Tip>

### Prerequisites

- Python >= 3.10
- [Node.js](https://nodejs.org/) >= 24 (LTS)
- [uv](https://docs.astral.sh/uv/) (recommended Python package manager)

### Generate a project

1. Navigate to the directory where you want to create your project, then run the following command:

   ```bash
   uvx --from cookiecutter cookiecutter gh:streamlit/component-template --directory cookiecutter/v2
   ```

   The generator will create a new subdirectory for your project.

2. Answer the generator's questions (project name, author, license) and choose between two frontend frameworks:
   - React + TypeScript is best for components with complex, state-driven UIs.
   - Pure TypeScript is best for lightweight components without framework overhead.

### Run in development mode

To run your component in development mode, you need to install dependencies and start two simultaneous processes from separate terminals.

3. Navigate to the project root directory (e.g. `my-component/`) and install the Python package in editable mode:

   ```bash filename="TERMINAL A"
   cd my-component
   uv pip install -e .
   ```

4. Navigate to the frontend directory and start the dev build watcher:

   ```bash filename="TERMINAL A"
   cd my-component/my_component/frontend
   npm install
   npm run dev
   ```

5. In a second terminal, navigate to the project root and run your Streamlit app:

   ```bash filename="TERMINAL B"
   cd my-component
   streamlit run example.py
   ```

The `npm run dev` command watches for changes to your frontend code and rebuilds automatically. When you make changes, refresh your Streamlit app to see them.

## Understanding the project structure

Whether you use the template or create a project manually, a package-based component follows this structure:

```none hideHeader
my-component/
├── pyproject.toml              # Python package configuration
├── example.py                  # Example Streamlit app
└── my_component/
    ├── __init__.py             # Python API and component registration
    ├── pyproject.toml          # Streamlit component metadata
    └── frontend/
        ├── build/              # Built frontend assets (generated)
        │   └── index-<hash>.js
        ├── src/                # Frontend source code
        │   └── index.ts        # Main TypeScript entry point
        ├── package.json        # Frontend dependencies and scripts
        ├── tsconfig.json       # TypeScript configuration
        └── vite.config.ts      # Build tool configuration
```

The rest of this page explains each piece of this structure. If you generated your project from the template, this will help you understand what the template created and how to customize it.

### Top-level `pyproject.toml`

The root `pyproject.toml` configures your Python package for distribution. For more information, see the [Python Packaging User Guide](https://packaging.python.org/en/latest/tutorials/packaging-projects/).

```toml
[build-system]
requires = ["setuptools>=77.0.3", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "streamlit-custom-component"
version = "0.0.1"
description = "Streamlit component that allows you to do X"
requires-python = ">=3.10"
dependencies = ["streamlit >= 1.51"]

[tool.setuptools.packages.find]
include = ["my_component*"]

[tool.setuptools]
include-package-data = true

[tool.setuptools.package-data]
my_component = ["frontend/build/**/*", "pyproject.toml"]
```

The key sections are:

- `[project]`: Package metadata. The `name` field is what users pass to `pip install`.
- `[tool.setuptools.packages.find]`: Tells setuptools to automatically find your component package by matching the `my_component*` pattern.
- `[tool.setuptools.package-data]`: Ensures the built frontend assets (`frontend/build/**/*`) and the inner `pyproject.toml` are included when the package is built into a wheel.

### Component-level `pyproject.toml`

Inside your component module, a second `pyproject.toml` registers your component with Streamlit and specifies where the frontend assets live:

```toml
[project]
name = "streamlit-custom-component"
version = "0.0.1"

[[tool.streamlit.component.components]]
name = "my_component"
asset_dir = "frontend/build"
```

When you start a Streamlit app, Streamlit scans all installed packages for component metadata like this. For each component it finds, Streamlit serves the contents of the `asset_dir` directory. This makes it possible to refer to JavaScript bundles, images, and other assets within your component.

The `project.name` should match the name of your package as installed.

<Important>

The `asset_dir` path is relative to the component-level `pyproject.toml` file. All files and subdirectories within the asset directory will be served publicly by Streamlit and won't be protected by any logical restrictions in your app. Don't include sensitive information in your component's asset directory.

</Important>

### Frontend configuration

The `frontend/` directory contains all frontend source code and configuration:

- `package.json` defines your frontend dependencies and build scripts.
- `tsconfig.json` configures the TypeScript compiler.
- `vite.config.ts` configures [Vite](https://vite.dev/) to build your component as an ES module library with hashed filenames.
- `src/index.ts` is the main TypeScript entry point for your component.

For clarity, the following subsections highlight the most important settings and patterns for Streamlit.

```json filename="package.json"
{
  ...
  "scripts": {
    "build": "npm run clean && npm run typecheck && npm run build:frontend:production",
    "build:frontend:production": "cross-env NODE_ENV=production vite build",
    "clean": "rimraf build",
    "dev": "cross-env NODE_ENV=development vite build --watch",
    "typecheck": "tsc --noEmit"
  },
  ...
  "dependencies": {
    "@streamlit/component-v2-lib": "^0.2.0"
  },
  ...
}
```

`package.json` includes the two most important scripts you will use during development and production:

- `npm run dev` watches for changes and rebuilds during development.
- `npm run build` creates an optimized production build with hashed filenames.

The [`@streamlit/component-v2-lib`](/develop/api-reference/custom-components/component-v2-lib) package provides the TypeScript type definitions for the component API. Your `src/index.ts` entry point imports types like [`FrontendRenderer`](/develop/api-reference/custom-components/component-v2-lib-frontendrenderer) and [`FrontendRendererArgs`](/develop/api-reference/custom-components/component-v2-lib-frontendrendererargs) from this package:

```typescript filename="src/index.ts"
import {
  FrontendRenderer,
  FrontendRendererArgs,
} from "@streamlit/component-v2-lib";

export type FrontendState = {
  num_clicks: number;
};

const MyComponent: FrontendRenderer<FrontendState> = (args) => {
  const { parentElement, data, setStateValue } = args;
  // ...
};

export default MyComponent;
```

<Tip>

Use `FrontendRenderer` and `FrontendRendererArgs` directly, and extend them with your own generic type parameters for `FrontendState` and data shapes. This keeps your component's type signatures consistent with the Streamlit runtime and ensures you benefit from any upstream type improvements.

</Tip>

```typescript filename="vite.config.ts"
{
  base: "./",
  build: {
    outDir: "build",
    lib: {
      entry: "./src/index.ts",
      formats: ["es"],
      fileName: "index-[hash]",
    },
    ...
  },
}
```

The following Vite settings are particularly significant for Streamlit:

- `base: "./"` tells Vite to use relative paths so assets resolve correctly when served by Streamlit.
- `outDir: "build"` outputs built files to `frontend/build/`. This must match the `asset_dir` in your component-level `pyproject.toml`.
- `formats: ["es"]` configures Vite to output an ES module, which is the format Streamlit expects when loading your component.
- `fileName: "index-[hash]"` tells Vite to include a content hash in the output filename (e.g. `index-a1b2c3d4.js`) for cache busting. You reference these with glob patterns in the Python API.

### The Python API

The `__init__.py` file registers your component and optionally provides a wrapper function:

```python
import streamlit as st

out = st.components.v2.component(
    "streamlit-custom-component.my_component",
    js="index-*.js",
    html=' ',
)

def on_num_clicks_change():
    pass

def my_component(name, key=None):
    component_value = out(
        key=key,
        default={"num_clicks": 0},
        data={"name": name},
        on_num_clicks_change=on_num_clicks_change,
    )
    return component_value
```

A few things to note:

- The first argument to `st.components.v2.component()` is a qualified name: `"<package-name>.<component-name>"`. This matches the `project.name` in your top-level `pyproject.toml` and the `name` in your component-level `pyproject.toml`.
- The `js` parameter uses a glob pattern (`"index-*.js"`) to match the hashed build output.
- The wrapper function (`my_component`) provides a clean API for users of your component. It's optional but recommended.

For more about registration and mounting, see [Component registration](/develop/concepts/custom-components/components-v2/register) and [Component mounting](/develop/concepts/custom-components/components-v2/mount).

## Glob pattern support

A [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>) is a string with wildcards that matches filenames. For example, `index-*.js` matches any file whose name starts with `index-` and ends with `.js`. Package-based components use glob patterns to reference build outputs with hashed filenames.

### Why use glob patterns?

Modern build tools like Vite include a content hash in output filenames. The hash changes whenever the file content changes, which ensures browsers load the latest version instead of serving a stale cached copy:

```
frontend/build/
├── index-a1b2c3d4.js     # Hashed JavaScript bundle
└── styles-e5f6g7h8.css   # Hashed CSS file (if applicable)
```

### Glob resolution rules

1. **Pattern matching**: `index-*.js` matches `index-a1b2c3d4.js`
2. **Single file requirement**: A pattern must resolve to exactly one file.
3. **Security**: Matched files must be within the `asset_dir`.
4. **Relative paths**: Patterns are resolved relative to `asset_dir`.

### Example usage

```python
component = st.components.v2.component(
    name="my_component",
    js="index-*.js",         # Matches index-<hash>.js
    css="styles-*.css",      # Matches styles-<hash>.css
)
```

<Note>

If a glob pattern matches zero files or multiple files, Streamlit raises a clear error message to help you debug the issue.

</Note>

## Development workflow

### Development mode

During development, the `npm run dev` command watches your source files and rebuilds on changes. You need two terminals:

```bash
# Terminal 1: Watch and rebuild frontend
cd my_component/frontend
npm run dev

# Terminal 2: Run your Streamlit app
streamlit run example.py
```

After the frontend rebuilds, refresh your Streamlit app to see the changes.

### Build for production

When you're ready to distribute your component, create an optimized production build:

```bash
cd my_component/frontend
npm install
npm run build
```

This generates hashed files in the `build/` directory that your glob patterns will match.

### Build a Python wheel

Package your component for distribution:

```bash
uv build
```

This creates a wheel in the `dist/` directory that includes your compiled frontend assets.

## Publishing your package

For detailed instructions on publishing your component to PyPI, see [Publish a Component](/develop/concepts/custom-components/publish).

The basic steps are:

1. Build the frontend: `npm run build` (from the `frontend/` directory)
2. Build the wheel: `uv build` (from the project root)
3. Upload to PyPI: `uv publish` or `python -m twine upload dist/*`

After publishing, users can install your component with:

```bash
pip install streamlit-custom-component
```

## Best practices

### Error handling

Implement error handling in your frontend code to provide a good experience when something goes wrong:

```typescript
export default function (component) {
  try {
    // Component logic
    return () => {
      // Cleanup
    };
  } catch (error) {
    console.error("Component error:", error);
    component.parentElement.textContent = "Component failed to load";
  }
}
```

### Performance

- Use code splitting for large dependencies.
- Implement lazy loading for heavy components.
- Optimize bundle sizes with tree shaking (Vite does this by default in production builds).

### Documentation

Provide comprehensive documentation for your component:

- Python docstrings with parameter descriptions
- TypeScript interfaces for data shapes
- Usage examples
- A `README.md` in your project root

## What's next?

- Follow the tutorials to build your first package-based component:
  - [Create a component with Pure TypeScript](/develop/tutorials/custom-components/template-typescript)
  - [Create a component with React + TypeScript](/develop/tutorials/custom-components/template-react)
- Learn about [State vs triggers](/develop/concepts/custom-components/components-v2/state-and-triggers) for interactive functionality.
- Explore [Theming and styling](/develop/concepts/custom-components/components-v2/theming) for beautiful components.
- Check out [Publishing components](/develop/concepts/custom-components/publish) for distribution strategies.
