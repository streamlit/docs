---
title: Component theming and styling
slug: /develop/concepts/custom-components/components-v2/theming
description: Learn how to style Custom Components v2 with Streamlit's theme integration, CSS custom properties, and responsive design patterns.
keywords: custom components v2, theming, CSS custom properties, styling, theme integration, responsive design, dark mode, light mode, component styling
---

# Component theming and styling

Custom components v2 provides seamless integration with Streamlit's theming system, allowing your components to automatically adapt to different themes, including dark and light modes. This integration is achieved through [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) that expose Streamlit's theme values directly to your component styles.

## Accessing theme values

Streamlit automatically injects CSS Custom Properties into a wrapper element around your component instance. These properties are derived from the current Streamlit theme and are prefixed with `--st-` for easy identification.

## Using CSS custom properties

Reference Streamlit theme values in your component styles using the [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var) CSS function. If your component has an HTML element with the class `my-component`, the following CSS will use the following theme values:

- `--st-text-color` for `theme.textColor`
- `--st-background-color` for `theme.backgroundColor`
- `--st-border-color` for `theme.borderColor`
- `--st-font` for `theme.font`

```css
.my-component {
  color: var(--st-text-color);
  background: var(--st-background-color);
  border: 1px solid var(--st-border-color);
  font-family: var(--st-font);
}
```

If you component in mounted in the sidebar, these values will correctly inherit from `theme.sidebar`.

## Convert theme configuration option names to CSS custom property names

In general, for any theme configuration option, use the CSS custom property `--st-<option-name>` to reference the value. `<option-name>` is the name of the option in the theme configuration in dash-case, also known as kebab-case.

For example, to reference the primary color (`theme.primaryColor`), use `--st-primary-color`. To reference the background color (`theme.backgroundColor`), use `--st-background-color`. For a desciption of all theme configuration options, see the [`config.toml` API reference](/develop/api-reference/configuration/config.toml#theme).

If a theme value is not configured, the CSS Custom Properties will have a valid value inherited from the current base theme.

### Computed CSS Custom Properties

There are a few computed CSS Custom Properties that don't come directly from a theme configuration option. The following CSS Custom Properties are computed:

| CSS Custom Property        | Used for                                                 |
| :------------------------- | :------------------------------------------------------- |
| `--st-heading-color`       | Heading font color (placeholder); same as text color     |
| `--st-border-color-light`  | Lighter border color for stale or deactivated elements   |
| `--st-widget-border-color` | Widget borders (when `theme.showWidgetBorder` is `true`) |

### CSS Custom Property arrays

Some theme properties are arrays. These are exposed as comma-separated strings. You can parse these in JavaScript if needed for dynamic styling.

| CSS Custom Property             | Used for                       |
| :------------------------------ | :----------------------------- |
| `--st-heading-font-sizes`       | `theme.headingFontSizes`       |
| `--st-heading-font-weights`     | `theme.headingFontWeights`     |
| `--st-chart-categorical-colors` | `theme.chartCategoricalColors` |
| `--st-chart-sequential-colors`  | `theme.chartSequentialColors`  |

### Directly mapped CSS custom properties

The rest of the CSS Custom Properties are directly mapped to theme configuration options and are usable without parsing or modification:

| CSS Custom Property                      | `config.toml` theme option             |
| :--------------------------------------- | :------------------------------------- |
| `--st-primary-color`                     | `theme.primaryColor`                   |
| `--st-background-color`                  | `theme.backgroundColor`                |
| `--st-secondary-background-color`        | `theme.secondaryBackgroundColor`       |
| `--st-text-color`                        | `theme.textColor`                      |
| `--st-link-color`                        | `theme.linkColor`                      |
| `--st-link-underline`                    | `theme.linkUnderline`                  |
| `--st-heading-font`                      | `theme.headingFont`                    |
| `--st-code-font`                         | `theme.codeFont`                       |
| `--st-base-radius`                       | `theme.baseRadius`                     |
| `--st-button-radius`                     | `theme.buttonRadius`                   |
| `--st-base-font-size`                    | `theme.baseFontSize`                   |
| `--st-base-font-weight`                  | `theme.baseFontWeight`                 |
| `--st-code-font-weight`                  | `theme.codeFontWeight`                 |
| `--st-code-font-size`                    | `theme.codeFontSize`                   |
| `--st-code-text-color`                   | `theme.codeTextColor`                  |
| `--st-border-color`                      | `theme.borderColor`                    |
| `--st-dataframe-border-color`            | `theme.dataframeBorderColor`           |
| `--st-dataframe-header-background-color` | `theme.dataframeHeaderBackgroundColor` |
| `--st-code-background-color`             | `theme.codeBackgroundColor`            |
| `--st-font`                              | `theme.font`                           |
| `--st-red-color`                         | `theme.redColor`                       |
| `--st-orange-color`                      | `theme.orangeColor`                    |
| `--st-yellow-color`                      | `theme.yellowColor`                    |
| `--st-blue-color`                        | `theme.blueColor`                      |
| `--st-green-color`                       | `theme.greenColor`                     |
| `--st-violet-color`                      | `theme.violetColor`                    |
| `--st-gray-color`                        | `theme.grayColor`                      |
| `--st-red-background-color`              | `theme.redBackgroundColor`             |
| `--st-orange-background-color`           | `theme.orangeBackgroundColor`          |
| `--st-yellow-background-color`           | `theme.yellowBackgroundColor`          |
| `--st-blue-background-color`             | `theme.blueBackgroundColor`            |
| `--st-green-background-color`            | `theme.greenBackgroundColor`           |
| `--st-violet-background-color`           | `theme.violetBackgroundColor`          |
| `--st-gray-background-color`             | `theme.grayBackgroundColor`            |
| `--st-red-text-color`                    | `theme.redTextColor`                   |
| `--st-orange-text-color`                 | `theme.orangeTextColor`                |
| `--st-yellow-text-color`                 | `theme.yellowTextColor`                |
| `--st-blue-text-color`                   | `theme.blueTextColor`                  |
| `--st-green-text-color`                  | `theme.greenTextColor`                 |
| `--st-violet-text-color`                 | `theme.violetTextColor`                |
| `--st-gray-text-color`                   | `theme.grayTextColor`                  |

## Practical theming examples

### Basic themed component

Here's a simple component that uses Streamlit's theming. Instead of using pixels for spacing, the component uses rem values. This ensures that the component will adjust to different font sizes. The font family and size are set on the parent container so they can be inherited by other elements. Execeptions like headers are styled in later lines. In genral, set colors, borders, border radii, and fonts from CSS Custom Properties.

```python
import streamlit as st

themed_card = st.components.v2.component(
    name="themed_card",
    html="""
    <div class="card">
        <h3 class="card-title">Themed Card</h3>
        <p class="card-content">
            This card automatically adapts to Streamlit's current theme.
        </p>
        <button class="card-button">Action</button>
    </div>
    """,
    css="""
    .card {
        background: var(--st-secondary-background-color);
        border: 1px solid var(--st-border-color);
        border-radius: var(--st-base-radius);
        padding: 1.25rem;
        margin: 0.625rem 0;
        font-family: var(--st-font);
        font-family: var(--st-font);
        font-size: var(--st-base-font-size);
    }

    .card-title {
        color: var(--st-heading-color);
        font-family: var(--st-heading-font);
        font-size: 1.2em;
        margin: 0 0 0.625rem 0;
        font-weight: 600;
    }

    .card-content {
        color: var(--st-text-color);
        line-height: 1.5;
        margin: 0 0 15px 0;
    }

    .card-button {
        background: var(--st-primary-color);
        color: white;
        border: none;
        border-radius: var(--st-button-radius);
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: opacity 0.2s;
    }

    .card-button:hover {
        opacity: 0.8;
    }
    """,
    js="""
    export default function({ parentElement, setTriggerValue }) {
        const cardButton = parentElement.querySelector('.card-button');
        cardButton.onclick = () => {
            setTriggerValue('button_click', 'clicked');
        };
    }
    """
)

result = themed_card(key="themed_example", on_button_click_change=lambda: None)
if result.button_click:
    st.write("Card button clicked!")
```

### Status message component

The following example demonstrates using Streamlit's basic color palette to set semantic colors. This is a component that creates color-coded alert banners:

```python
import streamlit as st

status_component = st.components.v2.component(
    name="status_message",
    html="""
    <div class="status" id="status-container">
        <span class="icon" id="icon"></span>
        <span class="message" id="message"></span>
    </div>
    """,
    css="""
    .status {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        margin: 0.5rem 0;
        border-radius: var(--st-base-radius);
        border-left: 0.25rem solid;
        font-family: var(--st-font);
    }

    .status.success {
        background: var(--st-green-background-color);
        border-left-color: var(--st-green-color);
        color: var(--st-text-color);
    }

    .status.warning {
        background: var(--st-yellow-background-color);
        border-left-color: var(--st-yellow-color);
        color: var(--st-text-color);
    }

    .status.error {
        background: var(--st-red-background-color);
        border-left-color: var(--st-red-color);
        color: var(--st-text-color);
    }

    .status.info {
        background: var(--st-blue-background-color);
        border-left-color: var(--st-blue-color);
        color: var(--st-text-color);
    }

    .icon {
        margin-right: 0.625rem;
        font-size: 1rem;
    }

    .message {
        flex: 1;
        font-size: var(--st-base-font-size);
    }
    """,
    js="""
    export default function({ parentElement, data }) {
        const container = parentElement.querySelector('#status-container');
        const icon = parentElement.querySelector('#icon');
        const message = parentElement.querySelector('#message');

        // Set the status type class
        container.className = `status ${data.type}`;

        // Set the icon based on type
        const icons = {
            success: '✅',
            warning: '⚠️',
            error: '❌',
            info: 'ℹ️'
        };

        icon.textContent = icons[data.type] || '•';
        message.textContent = data.message;
    }
    """
)

# Mount the component four times with different status types
status_component(
    data={"type": "success", "message": "Operation completed successfully"},
    key="status_success"
)

status_component(
    data={"type": "warning", "message": "Please review your settings"},
    key="status_warning"
)

status_component(
    data={"type": "error", "message": "An error occurred during processing"},
    key="status_error"
)

status_component(
    data={"type": "info", "message": "Additional information available"},
    key="status_info"
)
```

### Data table component

You can use CSS Custom Properties to style a data table to match Streamlit's dataframe styling.

```python
import streamlit as st

data_table = st.components.v2.component(
    name="custom_table",
    html="""
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Item 1</td>
                    <td>100</td>
                    <td><span class="status-badge success">Active</span></td>
                </tr>
                <tr>
                    <td>Item 2</td>
                    <td>250</td>
                    <td><span class="status-badge warning">Pending</span></td>
                </tr>
                <tr>
                    <td>Item 3</td>
                    <td>75</td>
                    <td><span class="status-badge error">Inactive</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    """,
    css="""
    .table-container {
        font-family: var(--st-font);
        overflow-x: auto;
    }

    .data-table {
        width: 100%;
        border-collapse: collapse;
        background: var(--st-background-color);
        border: 1px solid var(--st-dataframe-border-color);
        border-radius: var(--st-base-radius);
        overflow: hidden;
    }

    .data-table th {
        background: var(--st-dataframe-header-background-color);
        color: var(--st-text-color);
        font-weight: 600;
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid var(--st-dataframe-border-color);
        font-size: var(--st-base-font-size);
    }

    .data-table td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--st-dataframe-border-color);
        color: var(--st-text-color);
        font-size: var(--st-base-font-size);
    }

    .data-table tr:last-child td {
        border-bottom: none;
    }

    .data-table tr:hover {
        background: var(--st-secondary-background-color);
    }

    .status-badge {
        padding: 0.25rem 0.5rem;
        border-radius: calc(var(--st-base-radius) / 2);
        font-size: 0.75rem;
        font-weight: 500;
    }

    .status-badge.success {
        background: var(--st-green-background-color);
        color: var(--st-green-color);
    }

    .status-badge.warning {
        background: var(--st-yellow-background-color);
        color: var(--st-yellow-color);
    }

    .status-badge.error {
        background: var(--st-red-background-color);
        color: var(--st-red-color);
    }
    """
)

result = data_table(key="table_example")
```

## Style isolation

Custom components v2 provides style isolation options to control how your component styles interact with the rest of the page.

### Isolated styles (default)

By default, Streamlit sets `isolate_styles=True`, which wraps your component in a Shadow DOM:

```python
# Styles are isolated (default behavior)
isolated_component = st.components.v2.component(
    name="isolated",
    html="<div class='my-style'>Isolated content</div>",
    css=".my-style { color: red; }",  # Won't affect other elements
    isolate_styles=True  # Default
)
```

Benefits of isolation:

- Component styles won't leak to the rest of the page.
- Page styles won't interfere with your component.
- Safer for third-party components.

### Non-isolated styles

If you want your component's style to affect the rest of the page, you can set `isolate_styles=False`. This is uncommon.

```python
# Styles can affect the page
non_isolated_component = st.components.v2.component(
    name="non_isolated",
    html="<div class='inherits-styles'>Content with inheritance</div>",
    css=".inherits-styles { font-family: inherit; }",  # Inherits page fonts
    isolate_styles=False
)
```

## Responsive design

Create components that work well across different screen sizes. This makes your component more accessible and compatible with the Streamlit layout system. The following example uses `@media (max-width: 768px)` to create a responsive grid layout that adapts when the screen width is less than 768px.

```python
import streamlit as st

responsive_component = st.components.v2.component(
    name="responsive_layout",
    html="""
    <div class="responsive-grid">
        <div class="grid-item">Item 1</div>
        <div class="grid-item">Item 2</div>
        <div class="grid-item">Item 3</div>
        <div class="grid-item">Item 4</div>
    </div>
    """,
    css="""
    .responsive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem;
        font-family: var(--st-font);
    }

    .grid-item {
        background: var(--st-secondary-background-color);
        border: 1px solid var(--st-border-color);
        border-radius: var(--st-base-radius);
        padding: 1.25rem;
        text-align: center;
        color: var(--st-text-color);
        transition: transform 0.2s;
    }

    .grid-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    }

    /* Mobile-specific styles */
    @media (max-width: 768px) {
        .responsive-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            padding: 0.75rem;
        }

        .grid-item {
            padding: 1rem;
        }
    }
    """
)

responsive_component(key="responsive_example")
```

## Best practices

### Always use theme variables

Instead of hardcoding colors, always use Streamlit's theme variables:

```css
/* Don't do this */
.my-component {
  color: #262730;
  background: #ffffff;
}

/* Do this instead */
.my-component {
  color: var(--st-text-color);
  background: var(--st-background-color);
}
```

### Test in different themes

Always test your components in both light and dark base themes. Preferably, test your component with a custom theme as well, especially using different font sizes.

### Use semantic color names

Choose colors from the basic color palette based on their semantic meaning. Each color in the basic color palette has a text and background variation, in addition to its base color.

```css
/* Good - semantic usage */
.error-message {
  color: var(--st-red-text-color);
  background: var(--st-red-background-color);
}

.success-indicator {
  color: var(--st-green-color);
}
```

### Respect accessibility

Streamlit's theme colors are designed with accessibility in mind. Maintain proper contrast ratios when creating custom color combinations.

## What's next?

Now that you understand theming and styling:

- Explore [Package-based components](/develop/concepts/custom-components/components-v2/package-based) for advanced development workflows.
- Learn about [State vs triggers](/develop/concepts/custom-components/components-v2/state-and-triggers) for interactive components.
- Check out the [Create components](/develop/concepts/custom-components/components-v2/create) guide for more examples.
