# Streamlit Docs

We use Next.js and Netlify to build our [documentation site](https://streamlit-docs.netlify.app).

## Building

To build the docs, clone this repo, install the NPM dependencies, and start the development server.

1. Clone this repo:

```bash
git clone https://github.com/streamlit/docs.git
cd docs/
```

2. Install the NPM dependencies

```bash
make
```

3. Start the development server:

```bash
make up
```

The docs will be viewable at [http://localhost:3000](http://localhost:3000). Note that any time you modify the source files in the `content/` folder, you'll need to refresh your browser tab to view the changes. You **do not** need to restart the development server.

## File and folder structure

This repo follows a typical Next.js project structure. To contribute, you'll only edit Markdown files within the `content/` folder.

- `components/` Contains JS and MDX files.
- `content/` This is where all the Markdown files live. This is the only folder you'll edit.
- `lib/` Contains JS files.
- `pages/` You'll never have to edit this folder. It contains JSX files that handle the complex index page, mapping of URL slugs, and rendering of Markdown pages in `content/`.
- `public/` Contains all the images used in our docs.
- `python/` Contains Python code to generate the docstrings for the API Reference.
- `scripts/` Contains JS files.
- `styles/` Contains CSS files for styling and layout.

## Contributing

To add, edit, or delete content in our documentation, you have to modify Markdown (`.md`) files within folders and sub-folders in `content/` :

- `kb/` Contains `.md` files that populate the Knowledge Base.
- `library/` Contains `.md` files that populate the Streamlit Library section.
- `streamlit-cloud/`Contains `.md` files that populate the Streamlit Cloud section.
- `gdpr-banner.md` You'll never have to edit this file.
- `index.md` Contains text that populates the index page.
- `menu.md` This is a special file containing only front matter that defines the docs Menu. You will need to edit this file whenever you want a page to appear in the docs Menu.

The directory structure of `content/` does not matter as the files will be recursively read and will ignore the directories. However, we recommend following the directory structure to organize the files, mirroring the structure on the documentation website.

### Add a new page

Do you want to add a new page to the docs? 

1. First, decide which section the page should live in (Streamlit Library, Streamlit Cloud, or Knowledge Base).

2. Next, navigate to the relevant folder and subfolder within `content/` and create a `.md` file whose filename mirrors the title of the page. E.g. For a page titled "Create a component", navigate to `content/library/components/` and create a file named `create-component.md`.

### Structure of the `.md` file

Now that you've decided where the file should live and have named the file, it's time to add your content!

**File format**:

Every `.md` file has front matter at the very top that defines the page title which appears in the browser tab bar, and the URL slug which appears after the slash in `streamlit-docs.netlify.app/` and `localhost:3000/`. 

E.g. For a page titled "Create a component" that should exist at `streamlit-docs.netlify.app/library/components/create`, the front matter at the top of `create-component.md` is:

```markdown
---
title: Create a Component
slug: /library/components/create
---
```

**Headings:**

Use standard Markdown for headings (#, ##, ###)

**Callouts:**

To add a callout (Note, Tip, Warning, Important), enter your Markdown text within the appropriate tags (MDX functions), making sure to add a blank line after the opening tag and another before the closing tag. E.g.

```markdown
<Note>

This is a **note** that links to our [website](https://docs.streamlit.io/).

</Note>
```

**Embed code:**

Enclose code within \` \` to embed it inline. E.g. 

```markdown
Create a header with `st.header`.
```

Embed code blocks like so:

```markdown
    ```python
    import streamlit as st

    st.text("Hello world")
    ```
```

We support syntax highlighting for Python, Bash, TOML, SQL, and JSX.

**Link to other pages in docs:**

Use standard Markdown to link to other pages in the docs. E.g. Add an inline link to the "Create an app" page by including the slug defined in the front matter of the "Create an app" `.md` file:

```markdown
Learn how to [Create an app](/library/get-started/create-an-app).
```

 

**Add images:**

Store images you want to display in `/public/images/`. There are two ways to display images.

1. To display a single image, use regular Markdown. Make sure to start the path of your images from `/images/` instead of `/public/images/`. E.g.:

    ```markdown
    ![Secrets manager screenshot](/images/databases/edit-secrets.png)
    ```

2. To display multiple images on the same line, add an `<Image />` tag containing the alt text and path to the image, for each image, and enclose all of them within `<Flex>` `</Flex>` tags. E.g. To display 3 images stored in `/public/images/databases/` :

    ```markdown
    <Flex>
    <Image alt="Bigquery screenshot 7" src="/images/databases/big-query-7.png" />
    <Image alt="Bigquery screenshot 8" src="/images/databases/big-query-8.png" />
    <Image alt="Bigquery screenshot 9" src="/images/databases/big-query-9.png" />
    </Flex>
    ```

**Discoverability:**

All it takes for a new page to be available at a URL is to create a Markdown file in the format described above, containing the title and slug in the front matter.

However, a user has to know the URL to visit the page. The page is therefore *reachable but not discoverable*. The next section describes how to add pages to the docs Menu so that users can find your page.

### Add pages to the Menu

How do you make the page you created appear in the Menu? Edit the special markdown file `content/menu.md`. All it has is front matter in YAML.

Suppose you have created an "Installation" page that is available at `streamlit-docs.netlify.app/library/get-started/installation`. You want to it to appear in the Menu within the "Streamlit Library" section, nested under the "Get Started" page. 

To do so, find the lines that define the `category` and `url` for "Get Started" in `menu.md` and add two new lines below it, containing:

```YAML
- category: Streamlit Library / Get Started / Installation
  url: /library/get-started/installation
```

### Edit an existing page

To edit an existing page:

1. Locate the `.md` file for the page
2. Edit the Markdown and save the file

To preview your changes, refresh your browser tab and visit the edited page!

### Add a new docstring to the API Reference

Any time a new version of Streamlit is released, the docstrings stored in `python/streamlit.json` have to be updated by running `make docstrings` . This will build the nesscary Docker image, and update the file with the documentation for the latest release on PyPi.

If you need to regenerate all function signatrues, across all versions, delete the content in `python/streamlit.json`, leaving the file in place, and run `make docstrings`. This will systematically install each version of streamlit, and generate the necessary function signatures in `streamlit.json`.

Suppose a new Streamlit release includes a `st.my_chart` function that you want to include in the "Chart elements" section of the API Reference:

1. Run `make docstrings`
2. Create Markdown file (`my_chart.md`) in `content/library/api/charts/`
3. Add the following to `my_chart.md`:

    ```markdown
    ---
    title: st.my_chart
    slug: /library/api-reference/charts/st.my_chart
    ---

    <Autofunction function="streamlit.my_chart" />
    ```

4. Add the following under the "Chart elements" heading in `content/library/api/api-reference.md`:
    1. A RefCard MDX function containing the URL slug defined in `my_chart.md` . This is the card that will appear on the API Reference landing page.
    2. An Image MDX function containing alt text and the location of the image to be displayed on the card. 
    3. A bold heading that will appear on the card (`#### Heading`). It appears below the card image.
    4. A brief description of the `st.my_chart` . It appears below the card heading.
    5. A code block illustrating how to use `st.my_chart`. It appears below the card description and has a Copy icon that when clicked copies the code block to the users' clipboard.

```markdown
    <RefCard href="/library/api-reference/charts/st.my_chart">
    <Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

    #### My charts

    Display a chart using the MyChart library.

    ```python
    st.my_chart(my_data_frame)
    ```

    </RefCard>
```

5. Add the following 2 new lines to `menu.md` so that `st.my_chart` appears in the Menu:

    ```YAML
    - category: Streamlit Library / API Reference / Chart elements / st.my_chart
      url: /library/api-reference/charts/st.my_chart
    ```

6. Save your changes and refresh the browser tab. If all went well, you should see a new entry in the Menu, a new card in the API Reference, and a new page for `st.my_chart`.

### Add to the Knowledge Base

The Knowledge Base (KB) is divided into five sections:

1. **Tutorials:** Step-by-step examples of building different types of apps in Streamlit
2. **Using Streamlit:** Frequently asked questions about using Streamlit Library
3. **Deployment Issues:** Articles about deploying Streamlit apps
4. **Streamlit Components:** Articles about Streamlit components
5. **Installing Dependencies:** System and Python dependency issues while using or deploying Streamlit apps

If you know the answer to a Streamlit user's pain point and want to add it to the KB:

1. Decide which of the above sections your article belongs to
2. Navigate to the relevant section's folder in `kb/` and
3. Create a `.md` file in the above specified format containing your article
    - Make sure the title in the front matter and the file header in Markdown are identical. E.g.

        ```markdown
        ---
        title: How do I add a Component to the sidebar?
        slug: /kb/components/add-component-sidebar
        ---

        # How do I add a Component to the sidebar?
        ```
4. Add a line to the existing `index.md` file in the same folder as your article. It should contain the title and URL slug specified in your article's front matter. This step ensures that users are able to discover your article in the index page of the relevant KB section. E.g.

    ```markdown
    - [How do I add a Component to the sidebar?](/kb/components/add-component-sidebar)
    ```

## Publishing

To publish your changes to the docs site:

1. Create a new branch containing your changes.
2. Create a Pull Request and mark Snehan and Randy as reviewers.
3. Once the checks have completed, checkout the Preview build.
4. Snehan and Randy will review your changes and merge your changes into the `main` branch.
5. Once merged, your changes will be live at [https://streamlit-docs.netlify.app](https://streamlit-docs.netlify.app).