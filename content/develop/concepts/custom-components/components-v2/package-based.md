---
title: Package-based components
slug: /develop/concepts/custom-components/components-v2/package-based
description: Learn how to build complex Custom Components v2 using package-based development with TypeScript, modern build tools, and external dependencies.
keywords: custom components v2, package-based components, TypeScript, build tools, Vite, Webpack, pyproject.toml, npm packages, component distribution
---

# Package-based components

While inline components are perfect for rapid prototyping, package-based components provide the full power of modern frontend development. This approach is ideal for complex components that require TypeScript, external dependencies, build optimization, or distribution as Python packages.

## When to use package-based components

Choose package-based development when you need:

- TypeScript support - Type safety and better developer experience.
- External dependencies - React, D3, Chart.js, or other npm packages.
- Build optimization - Code splitting, minification, and bundling.
- Team development - Proper tooling, testing, and collaboration workflows.
- Distribution - Publishing components as Python packages on PyPI.
- Complex logic - Multi-file projects with organized code structure.

## Project structure

A typical package-based component follows this structure:

```
my-component-package/
├── pyproject.toml              # Top-level package configuration
└── src/
    └── my_component/
        ├── __init__.py         # Python package entry point
        ├── component.py        # Component Python API
        ├── pyproject.toml      # Component-specific configuration
        └── frontend/
            ├── dist/           # Built frontend assets
            │   ├── bundle-<hash>.js
            │   └── styles-<hash>.css
            ├── src/            # Frontend source code
            │   ├── index.ts    # Main TypeScript entry
            │   └── components/
            ├── package.json    # Frontend dependencies
            ├── tsconfig.json   # TypeScript configuration
            └── vite.config.js  # Build tool configuration
```

## Configuration setup

### Top-level `pyproject.toml`

Configure your Python package distribution. This file is located at the root of your project and is used to configure the package distribution. For more information about the `pyproject.toml` for packaging projects, see the [Python Packaging User Guide](https://packaging.python.org/en/latest/tutorials/packaging-projects/).

#### Explicit package configuration (recommended)

This approach explicitly lists packages and their locations. You need to identify each component module and the necessary assets to serve (frontend components and inner `pyproject.toml` file).

```toml
[project]
name = "my_streamlit_component_package"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = ["streamlit>=1.51.0"]

[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

# Explicitly list packages and their source directory
[tool.setuptools]
packages = ["my_component"]                    # List each package by name
package-dir = {"" = "src"}                     # Look for packages in src/ directory
include-package-data = true                    # Include non-Python files

# Specify which files to include in the package
[tool.setuptools.package-data]
my_component = ["frontend/dist/**/*", "pyproject.toml"]
```

#### Alternative: Automatic package discovery

For projects with multiple packages or complex structures, you can use automatic discovery:

```toml
[project]
name = "my_streamlit_component_package"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = ["streamlit>=1.51.0"]

[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

# Automatically find packages matching a pattern
[tool.setuptools.packages.find]
where = ["src"]                                # Look in src/ directory
include = ["my_component*"]                    # Include packages starting with "my_component"

[tool.setuptools]
include-package-data = true

[tool.setuptools.package-data]
my_component = ["frontend/dist/**/*", "pyproject.toml"]
```

### Component-level `pyproject.toml`

Within your component module, you need to register your component and specify the asset directory (`asset_dir`) in the `[tool.streamlit.component.components]` table. The `asset_dir` path is relative to the component's `pyproject.toml` file. All files and subdirectories within this directory will be served by Streamlit.

When you start a Streamlit app, Streamlit scans all installed packages for any Streamlit components. For each installed component, Streamlit serves the contents of its asset directory. This makes it possible to refer to images and other assets within your component's HTML and CSS code. `project.name` should match the name of your package when installed.

```toml
[project]
name = "my_streamlit_component_package"
version = "0.1.0"

# Register your components and the asset directory.
[[tool.streamlit.component.components]]
name = "my_component"
asset_dir = "frontend/dist"
```

<Important>

The `asset_dir` path is relative to the component's `pyproject.toml` file. All files and subdirectories within this directory will be served publicly by Streamlit and won't be protected by any logical restrictions in your app. Don't include sensitive information in your component's asset directory.

</Important>

## Frontend development setup

### `package.json` configuration

Set up your frontend dependencies and build scripts:

```json
{
  "name": "my-component-frontend",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@streamlit/component-v2-lib": "^0.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

### TypeScript configuration

Configure TypeScript for optimal development:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Vite build configuration

Configure Vite for optimized builds with hashed filenames:

```javascript
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      name: "MyComponent",
      fileName: (format) =>
        `bundle-[hash].${format === "es" ? "js" : "umd.js"}`,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "styles-[hash].css";
          }
          return "[name]-[hash].[ext]";
        },
      },
    },
    sourcemap: true,
  },
});
```

## TypeScript component development

### Basic TypeScript component

Create a type-safe component using the official TypeScript library:

```typescript
// src/index.ts
import { Component, ComponentState } from "@streamlit/component-v2-lib";

/** The state/trigger values this component maintains */
interface MyComponentState extends ComponentState {
  count: number;
  lastAction: string;
}

/** The shape of the data passed from Python */
interface MyComponentData {
  initialCount: number;
  label: string;
  theme: "light" | "dark";
}

const MyComponent: Component<MyComponentState, MyComponentData> = (
  component,
) => {
  const { data, setStateValue, setTriggerValue, parentElement } = component;

  let count = data.initialCount || 0;

  // Create UI elements
  const container = document.createElement("div");
  container.className = "component-container";

  const display = document.createElement("div");
  display.className = "count-display";
  display.textContent = `Count: ${count}`;

  const incrementBtn = document.createElement("button");
  incrementBtn.textContent = `${data.label || "Increment"}`;
  incrementBtn.className = "increment-btn";

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.className = "reset-btn";

  // Assemble UI
  container.appendChild(display);
  container.appendChild(incrementBtn);
  container.appendChild(resetBtn);
  parentElement.appendChild(container);

  // Apply theme
  container.setAttribute("data-theme", data.theme || "light");

  // Event handlers with type safety
  const handleIncrement = (): void => {
    count++;
    display.textContent = `Count: ${count}`;
    setStateValue("count", count);
    setTriggerValue("lastAction", "increment");
  };

  const handleReset = (): void => {
    count = 0;
    display.textContent = `Count: ${count}`;
    setStateValue("count", count);
    setTriggerValue("lastAction", "reset");
  };

  // Attach event listeners
  incrementBtn.addEventListener("click", handleIncrement);
  resetBtn.addEventListener("click", handleReset);

  // Initialize state
  setStateValue("count", count);

  // Return cleanup function
  return () => {
    incrementBtn.removeEventListener("click", handleIncrement);
    resetBtn.removeEventListener("click", handleReset);
  };
};

export default MyComponent;
```

### Advanced component with external dependencies

Here's an example using Chart.js for data visualization:

```typescript
// src/chart-component.ts
import { Component, ComponentState } from "@streamlit/component-v2-lib";
import { Chart, ChartConfiguration, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

interface ChartComponentState extends ComponentState {
  selectedDataPoint: number | null;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }>;
}

interface ChartComponentData {
  chartData: ChartData;
  chartType: "line" | "bar" | "pie";
  title?: string;
}

const ChartComponent: Component<ChartComponentState, ChartComponentData> = (
  component,
) => {
  const { data, setStateValue, setTriggerValue, parentElement } = component;

  // Create canvas element
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 300;
  parentElement.appendChild(canvas);

  // Chart configuration
  const config: ChartConfiguration = {
    type: data.chartType || "line",
    data: data.chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: !!data.title,
          text: data.title,
        },
        legend: {
          position: "top",
        },
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const dataIndex = elements[0].index;
          setStateValue("selectedDataPoint", dataIndex);
          setTriggerValue("dataPointClicked", {
            index: dataIndex,
            label: data.chartData.labels[dataIndex],
            value: data.chartData.datasets[0].data[dataIndex],
          });
        }
      },
    },
  };

  // Create chart instance
  const chart = new Chart(canvas, config);

  // Cleanup function
  return () => {
    chart.destroy();
  };
};

export default ChartComponent;
```

## Python component API

### Component definition

Create a clean Python API for your component:

```python
# src/my_component/component.py
import streamlit as st
from typing import Dict, Any, Optional, Callable, Union, List

def advanced_counter(
    initial_value: int = 0,
    label: str = "Increment",
    theme: str = "light",
    key: Optional[str] = None,
    on_count_change: Optional[Callable] = None,
    on_lastAction_change: Optional[Callable] = None
):
    """
    Create an advanced counter component with TypeScript frontend.

    Parameters
    ----------
    initial_value : int
        The starting count value (default: 0)
    label : str
        The text to display on the increment button (default: "Increment")
    theme : str
        The component theme, either "light" or "dark" (default: "light")
    key : str, optional
        A unique key for the component instance
    on_count_change : callable, optional
        Callback function called when count changes
    on_lastAction_change : callable, optional
        Callback function called when an action is triggered

    Returns
    -------
    ComponentResult
        Object with count and lastAction properties
    """

    # Create the component using glob pattern for hashed builds
    component = st.components.v2.component(
        name="advanced_counter",
        js="bundle-*.js",  # Glob pattern matches hashed filename
        css="styles-*.css",  # Glob pattern matches hashed CSS
        data={
            "initialCount": initial_value,
            "label": label,
            "theme": theme
        }
    )

    # Mount the component
    result = component(
        key=key,
        default={"count": initial_value, "lastAction": None},
        on_count_change=on_count_change,
        on_lastAction_change=on_lastAction_change
    )

    return result

def chart_component(
    chart_data: Dict[str, Any],
    chart_type: str = "line",
    title: Optional[str] = None,
    key: Optional[str] = None,
    on_selectedDataPoint_change: Optional[Callable] = None,
    on_dataPointClicked_change: Optional[Callable] = None
):
    """
    Create an interactive chart component using Chart.js.

    Parameters
    ----------
    chart_data : dict
        Chart data in Chart.js format with labels and datasets
    chart_type : str
        Type of chart: "line", "bar", or "pie" (default: "line")
    title : str, optional
        Chart title to display
    key : str, optional
        A unique key for the component instance
    on_selectedDataPoint_change : callable, optional
        Callback when a data point is selected
    on_dataPointClicked_change : callable, optional
        Callback when a data point is clicked

    Returns
    -------
    ComponentResult
        Object with selectedDataPoint and dataPointClicked properties
    """

    component = st.components.v2.component(
        name="chart_component",
        js="chart-bundle-*.js",
        css="chart-styles-*.css",
        data={
            "chartData": chart_data,
            "chartType": chart_type,
            "title": title
        }
    )

    result = component(
        key=key,
        default={"selectedDataPoint": None},
        on_selectedDataPoint_change=on_selectedDataPoint_change,
        on_dataPointClicked_change=on_dataPointClicked_change
    )

    return result
```

### Package entry point

Create a clean package interface:

```python
# src/my_component/__init__.py
"""
My Streamlit Component Package

A collection of advanced custom components built with TypeScript and modern tooling.
"""

from .component import advanced_counter, chart_component

__version__ = "0.1.0"
__all__ = ["advanced_counter", "chart_component"]
```

## Glob pattern support

Package-based components support glob patterns for referencing build outputs with hashed filenames:

### Why use glob patterns?

Modern build tools like Vite and Webpack generate hashed filenames for cache busting:

```
frontend/dist/
├── bundle-a1b2c3d4.js    # Hashed JavaScript bundle
├── styles-e5f6g7h8.css   # Hashed CSS file
└── assets/
    └── logo-i9j0k1l2.png # Hashed assets
```

### Glob resolution rules

1. Pattern matching: `bundle-*.js` matches `bundle-a1b2c3d4.js`
2. Single file requirement: Pattern must resolve to exactly one file
3. Security: Matched files must be within the `asset_dir`
4. Relative paths: Patterns are resolved relative to `asset_dir`

### Example usage

```python
# These glob patterns work with hashed build outputs
component = st.components.v2.component(
    name="my_component",
    js="bundle-*.js",        # Matches bundle-<hash>.js
    css="styles-*.css",      # Matches styles-<hash>.css
    data={"message": "Hello"}
)
```

<Note>

**Error Handling**: If a glob pattern matches zero files or multiple files, Streamlit will raise a clear error message to help you debug the issue.

</Note>

## Development workflow

### Development mode

During development, use Vite's dev server for hot reloading:

```bash
# Terminal 1: Start frontend dev server
cd src/my_component/frontend
npm run dev

# Terminal 2: Run Streamlit app
streamlit run app.py
```

For development, temporarily use the dev server URL:

```python
# Development mode (temporary)
component = st.components.v2.component(
    name="my_component",
    js="http://localhost:5173/src/index.ts",  # Dev server URL
    data={"message": "Hello"}
)
```

### Build for production

Build optimized assets for production:

```bash
cd src/my_component/frontend
npm run build
```

This generates hashed files in the `dist/` directory that your glob patterns will match.

### Testing the package

Test your component locally before publishing:

```python
# app.py - Test your component
import streamlit as st
from my_component import advanced_counter, chart_component

st.title("Component Testing")

# Test the counter
counter_result = advanced_counter(
    initial_value=5,
    label="Click me!",
    theme="dark",
    key="test_counter"
)

st.write(f"Count: {counter_result.count}")
if counter_result.lastAction:
    st.write(f"Last action: {counter_result.lastAction}")

# Test the chart
chart_data = {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
    "datasets": [{
        "label": "Sales",
        "data": [12, 19, 3, 5, 2],
        "backgroundColor": "rgba(54, 162, 235, 0.2)",
        "borderColor": "rgba(54, 162, 235, 1)"
    }]
}

chart_result = chart_component(
    chart_data=chart_data,
    chart_type="bar",
    title="Monthly Sales",
    key="test_chart"
)

if chart_result.selectedDataPoint is not None:
    st.write(f"Selected data point: {chart_result.selectedDataPoint}")
```

## Publishing your package

### Build the distribution

```bash
# Install build tools
pip install build twine

# Build the package
python -m build
```

### Upload to PyPI

```bash
# Upload to Test PyPI first
python -m twine upload --repository testpypi dist/*

# After testing, upload to PyPI
python -m twine upload dist/*
```

### Installation and usage

Users can then install and use your component:

```bash
pip install my-streamlit-component-package
```

```python
import streamlit as st
from my_streamlit_component_package import advanced_counter

result = advanced_counter(
    initial_value=10,
    label="Increment Counter",
    theme="dark"
)

st.write(f"Current count: {result.count}")
```

## Best practices

### Type safety

Always use TypeScript interfaces for better development experience:

```typescript
interface ComponentProps {
  data: MyComponentData;
  setStateValue: (key: string, value: any) => void;
  setTriggerValue: (key: string, value: any) => void;
  parentElement: HTMLElement;
}
```

### Error handling

Implement robust error handling in both TypeScript and Python:

```typescript
// TypeScript error handling
export default function (component) {
  try {
    // Component logic here
    return () => {
      // Cleanup logic
    };
  } catch (error) {
    console.error("Component error:", error);
    component.parentElement.innerHTML = `<div class="error">Component failed to load</div>`;
  }
}
```

### Performance optimization

- Use code splitting for large dependencies
- Implement lazy loading for heavy components
- Optimize bundle sizes with tree shaking

### Documentation

Provide comprehensive documentation:

- TypeScript interfaces for all data shapes
- Python docstrings with parameter descriptions
- Usage examples and tutorials
- Migration guides for updates

## What's next?

Now that you understand package-based components:

- Learn about [State vs triggers](/develop/concepts/custom-components/v2/state-and-triggers) for interactive functionality.
- Explore [Theming and styling](/develop/concepts/custom-components/v2/theming) for beautiful components.
- Check out [Publishing components](/develop/concepts/custom-components/publish) for distribution strategies.
