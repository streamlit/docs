import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import Table from "./table";
import { H2, H3 } from "./headers";
import Warning from "./warning";
import Deprecation from "./deprecation";
import { withRouter, useRouter } from "next/router";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import styles from "./autofunction.module.css";
import { looksLikeVersionAndPlatformString } from "../../lib/next/utils";

const LATEST_VERSION = publicRuntimeConfig.LATEST_VERSION;
const DEFAULT_VERSION = publicRuntimeConfig.DEFAULT_VERSION;
const VERSIONS_LIST = publicRuntimeConfig.VERSIONS_LIST;

const cleanHref = (name) => {
  return String(name).replace(/\./g, "").replace(/\s+/g, "-");
};

const Autofunction = ({
  version,
  streamlitFunction,
  docstrings,
  slug,
  hideHeader,
  deprecated,
  deprecatedText,
  oldStreamlitFunction,
  goToLatest,
}) => {
  const blockRef = useRef();
  const router = useRouter();
  const [isHighlighted, setIsHighlighted] = useState(false);
  const currentNumericVersion =
    version == DEFAULT_VERSION ? LATEST_VERSION : version;

  useEffect(() => {
    highlightWithPrism();
    regenerateIframes();
  }, [streamlitFunction]);

  // Code to destroy and regenerate iframes on each new autofunction render.
  const regenerateIframes = () => {
    const iframes = Array.prototype.slice.call(
      blockRef.current.getElementsByTagName("iframe"),
    );
    if (!iframes) return;

    iframes.forEach((iframe) => {
      const parent = iframe.parentElement;
      const newFrame = iframe.cloneNode();

      newFrame.src = "";
      newFrame.classList.add("new");
      newFrame.src = iframe.src;

      parent.replaceChild(newFrame, iframe);
    });
  };

  const highlightWithPrism = () => {
    if (isHighlighted) {
      return;
    }
    if (!blockRef.current) {
      return;
    }

    const pres = Array.prototype.slice.call(
      blockRef.current.getElementsByTagName("pre"),
    );

    pres.forEach((ele) => {
      const codeText = ele.innerHTML;
      const preTag = ele.cloneNode(true);
      const codeWrap = document.createElement("div");
      codeWrap.setAttribute("class", styles.CodeBlockContainer);
      const codeTag = document.createElement("code");
      codeTag.setAttribute("class", "language-python");
      preTag.classList.add("line-numbers");
      codeTag.innerHTML = codeText;
      preTag.textContent = null;
      preTag.appendChild(codeTag);
      codeWrap.appendChild(preTag);
      ele.replaceWith(codeWrap);
    });

    Prism.highlightAllUnder(blockRef.current);

    setIsHighlighted(true);
  };

  const VersionSelector = ({ currentNumericVersion, handleSelectVersion }) => {
    const selectClass =
      currentNumericVersion != LATEST_VERSION
        ? "version-select old-version"
        : "version-select";

    return (
      <form className={classNames(selectClass, styles.Form)}>
        <label>
          <span className="sr-only">Streamlit Version</span>
          <select
            value={currentNumericVersion}
            onChange={handleSelectVersion}
            className={styles.Select}
          >
            {VERSIONS_LIST.map((version, index) => (
              <option value={version} key={version}>
                {"Version " + version}
              </option>
            ))}
          </select>
        </label>
      </form>
    );
  };

  const handleSelectVersion = (event) => {
    const functionObject =
      docstrings[streamlitFunction] ?? docstrings[oldStreamlitFunction];
    const slicedSlug = slug.slice();

    if (event.target.value !== currentNumericVersion) {
      if (looksLikeVersionAndPlatformString(slicedSlug[0])) {
        slicedSlug.shift();
      }
      if (event.target.value !== LATEST_VERSION) {
        slicedSlug.unshift(event.target.value);
      } else {
        goToLatest();
      }
    }

    if (!functionObject) {
      router.push(`/${slicedSlug.join("/")}`);
    } else {
      const name = cleanHref(`st.${functionObject.name}`);
      router.push(`/${slicedSlug.join("/")}#${name} `);
    }
  };

  const footers = [];
  const args = [];
  const returns = [];
  let functionObject;
  let functionDescription;
  let header;
  let headerTitle;
  let body;
  let isClass;
  let isAttributeDict;
  let methods = [];
  let properties = [];

  if (streamlitFunction in docstrings || oldStreamlitFunction in docstrings) {
    functionObject =
      docstrings[streamlitFunction] ?? docstrings[oldStreamlitFunction];
    isClass = functionObject.is_class;
    isAttributeDict = functionObject.is_attribute_dict ?? false;
    if (
      functionObject.description !== undefined &&
      functionObject.description
    ) {
      functionDescription = { __html: functionObject.description };
    }
  } else {
    return (
      <div className={styles.HeaderContainer}>
        <div className={styles.TitleContainer} ref={blockRef} key={slug}>
          <H2
            className={`
              ${styles.Title}
              relative
            `}
          >
            <a
              aria-hidden="true"
              tabIndex="-1"
              href={`#${cleanHref(
                streamlitFunction.replace("streamlit", "st"),
              )}`.toLowerCase()}
              className="absolute"
            >
              <span className="icon icon-link"></span>
            </a>
            {streamlitFunction.replace("streamlit", "st")}
          </H2>
          <VersionSelector
            currentNumericVersion={currentNumericVersion}
            handleSelectVersion={handleSelectVersion}
          />
        </div>
        <Warning>
          <p>
            This method did not exist in version{" "}
            <code>{currentNumericVersion}</code> of Streamlit.
          </p>
        </Warning>
      </div>
    );
  }

  if ("methods" in functionObject) {
    methods = functionObject.methods;
  }

  if ("properties" in functionObject) {
    properties = functionObject.properties;
  }

  if (hideHeader !== undefined && hideHeader) {
    header = "";
  } else {
    const name = functionObject.signature
      ? `${functionObject.signature}`.split("(")[0].replace("streamlit", "st")
      : "";
    headerTitle = isAttributeDict ? (
      <H3 className={styles.Title}>
        <a
          aria-hidden="true"
          tabIndex="-1"
          href={`#${cleanHref(name)}`.toLowerCase()}
          className="absolute"
        >
          <span className="icon icon-link"></span>
        </a>
        {name}
      </H3>
    ) : (
      <H2 className={styles.Title}>
        <a
          aria-hidden="true"
          tabIndex="-1"
          href={`#${cleanHref(name)}`.toLowerCase()}
          className="absolute"
        >
          <span className="icon icon-link"></span>
        </a>
        {name}
      </H2>
    );
    header = (
      <div className={styles.HeaderContainer}>
        <div
          className={`
            ${styles.TitleContainer}
            relative
          `}
        >
          {headerTitle}
          <VersionSelector
            currentNumericVersion={currentNumericVersion}
            handleSelectVersion={handleSelectVersion}
          />
        </div>
        {deprecated === true ? (
          <Deprecation>
            <p dangerouslySetInnerHTML={{ __html: deprecatedText }} />
          </Deprecation>
        ) : (
          ""
        )}
        <div
          className="code-desc"
          dangerouslySetInnerHTML={functionDescription}
        />
      </div>
    );
  }

  if ("example" in functionObject) {
    footers.push({ title: "Example", body: functionObject.example });
  }

  if ("examples" in functionObject) {
    footers.push({ title: "Examples", body: functionObject.examples });
  }

  if ("notes" in functionObject) {
    footers.push({ title: "Notes", body: functionObject.notes });
  }

  if ("warning" in functionObject) {
    footers.push({ title: "Warning", body: functionObject.warning });
  }

  // propertiesRows is initialized early to allow Attributes (recorded as args)
  // in any class docstring to be diverted to the properties section.
  let propertiesRows = [];
  let docstringProperties = []; // Used to avoid duplicates with @property

  for (const index in functionObject.args) {
    const row = {};
    const param = functionObject.args[index];
    docstringProperties.push(param.name);
    const isDeprecated =
      param.deprecated && param.deprecated.deprecated === true;
    const deprecatedMarkup = isDeprecated
      ? `
      <div class="${styles.DeprecatedContent}">
        <i class="material-icons-sharp ${styles.DeprecatedIcon}">
          delete
        </i>
        ${param.deprecated.deprecatedText}
      </div>`
      : "";
    const description = param.description
      ? param.description
      : `<p>No description</p> `;

    if (param.is_optional) {
      row["title"] = `
        <p class="
          ${isDeprecated ? "deprecated" : ""}
          ${param.is_kwarg_only ? styles.Keyword : ""}
        ">
          ${param.name}
          <span class='italic code'>(${param.type_name})</span>
        </p> 
      `;
      row["body"] = `
        ${deprecatedMarkup}
        ${description}
      `;
    } else {
      row["title"] = `
        <p class="
          ${isDeprecated ? "deprecated" : ""}
          ${param.is_kwarg_only ? styles.Keyword : ""}
        ">
          <span class='bold'>${param.name}</span>
          <span class='italic code'>(${param.type_name})</span>
        </p>
      `;
      row["body"] = `
        ${deprecatedMarkup}
        ${description}
      `;
    }
    // When "Parameters" are included in a class docstring, they are actually
    // "Properties." Using "Properties" in the docstring does not result in
    // individually parsed properties; using "Parameters" is a workaround.
    if (isClass) {
      propertiesRows.push(row);
    } else {
      args.push(row);
    }
  }

  let methodRows = [];

  for (const index in methods) {
    const row = {};
    const method = methods[index];
    const slicedSlug = slug.slice().join("/");
    const hrefName = `${functionObject.name}.${method.name}`
      .toLowerCase()
      .replace("streamlit", "st")
      .replace(/[.,\/#!$%\^&\*;:{}=\-`~()]/g, "");
    const type_name = method.signature
      ? method.signature.match(/\((.*)\)/)[1]
      : "";
    const isDeprecated =
      method.deprecated && method.deprecated.deprecated === true;
    const deprecatedMarkup = isDeprecated
      ? `
      <div class="${styles.DeprecatedContent}">
        <i class="material-icons-sharp">
          delete
        </i>
        ${method.deprecated.deprecatedText}
      </div>`
      : "";
    const description = method.description
      ? method.description
      : `<p>No description</p> `;
    // Add a link to the method by appending the method name to the current URL using slug.slice();
    row["title"] = `
      <p class="${isDeprecated ? "deprecated" : ""}">
        <a href="/${slicedSlug}#${hrefName}"><span class='bold'>${
          method.name
        }</span></a><span class='italic code'>(${type_name})</span>
      </p>`;
    row["body"] = `
      ${deprecatedMarkup}
      ${description}
    `;

    methodRows.push(row);
  }

  for (const index in properties) {
    const row = {};
    const property = properties[index];
    // If attribute is in class docstring don't also show the same @property.
    if (docstringProperties.includes(property.name)) {
      continue;
    }
    const slicedSlug = slug.slice().join("/");
    const hrefName = `${functionObject.name}.${property.name}`
      .toLowerCase()
      .replace("streamlit", "st")
      .replace(/[.,\/#!$%\^&\*;:{}=\-`~()]/g, "");
    const isDeprecated =
      property.deprecated && property.deprecated.deprecated === true;
    const deprecatedMarkup = isDeprecated
      ? `
    <div class="${styles.DeprecatedContent}">
      <i class="material-icons-sharp">
        delete
      </i>
      ${property.deprecated.deprecatedText}
    </div>`
      : "";
    const description = property.description
      ? property.description
      : `<p>No description</p> `;
    // Add a link to the method by appending the method name to the current URL using slug.slice();
    row["title"] = `
      <p class="${isDeprecated ? "deprecated" : ""}">
        <a href="/${slicedSlug}#${hrefName}"><span class='bold'>${
          property.name
        }</span>
      </p>`;
    row["body"] = `
      ${deprecatedMarkup}
      ${description}
    `;
    propertiesRows.push(row);
  }

  for (const index in functionObject.returns) {
    const row = {};
    const param = functionObject.returns[index];
    const description = param.description
      ? param.description
      : `<p>No description</p> `;

    row["title"] =
      `<p><span class='italic code'>(${param.type_name})</span></p> `;
    row["body"] = `${description} `;

    returns.push(row);
  }

  body = (
    <Table
      head={
        isAttributeDict
          ? ""
          : {
              title: (
                <>
                  {isClass ? "Class description" : "Function signature"}
                  <a
                    className={styles.Title.a}
                    href={functionObject.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={
                      "View st." +
                      functionObject.name +
                      " source code on GitHub"
                    }
                  >
                    [source]
                  </a>
                </>
              ),
              content: `<p class='code'> ${functionObject.signature}</p> `,
            }
      }
      body={args.length ? { title: "Parameters" } : null}
      bodyRows={args.length ? args : null}
      foot={[
        methods.length ? { title: "Methods" } : null,
        returns.length ? { title: "Returns" } : null,
        propertiesRows.length ? { title: "Attributes" } : null,
      ].filter((section) => section !== null)}
      footRows={[
        methods.length ? methodRows : null,
        returns.length ? returns : null,
        propertiesRows.length ? propertiesRows : null,
      ].filter((rows) => rows !== null)}
      additionalClass="full-width"
      footers={footers}
    />
  );

  return (
    <section className={styles.Container} ref={blockRef} key={slug}>
      {header}
      {body}
    </section>
  );
};

export default withRouter(Autofunction);
