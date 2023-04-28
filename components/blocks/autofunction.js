import React, { useEffect, useState, useRef } from "react";
import reverse from "lodash/reverse";
import classNames from "classnames";
import Table from "./table";
import { H2 } from "./headers";
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

import styles from "./autofunction.module.css";
import { name } from "file-loader";

const cleanHref = (name) => {
  return String(name).replace(".", "").replace(" ", "-");
};

const Autofunction = ({
  version,
  versions,
  streamlitFunction,
  streamlit,
  slug,
  hideHeader,
  deprecated,
  deprecatedText,
}) => {
  const blockRef = useRef();
  const router = useRouter();
  const maxVersion = versions[versions.length - 1];
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(
    version ? version : versions[versions.length - 1]
  );

  useEffect(() => {
    highlightWithPrism();
    regenerateIframes();
  }, [streamlitFunction]);

  // Code to destroy and regenerate iframes on each new autofunction render.
  const regenerateIframes = () => {
    const iframes = Array.prototype.slice.call(
      blockRef.current.getElementsByTagName("iframe")
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
      blockRef.current.getElementsByTagName("pre")
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

  const handleSelectVersion = (event) => {
    const functionObject = streamlit[streamlitFunction];
    const name = cleanHref(`st.${functionObject.name}`);
    const slicedSlug = slug.slice();

    if (event.target.value !== currentVersion) {
      setCurrentVersion(event.target.value);
      if (event.target.value !== maxVersion) {
        let isnum = /^[\d\.]+$/.test(slicedSlug[0]);
        if (isnum) {
          slicedSlug[0] = event.target.value;
        } else {
          slicedSlug.unshift(event.target.value);
        }
        slug.unshift(event.target.value);
      }
    }

    router.push(`/${slicedSlug.join("/")}#${name} `);
  };

  const footers = [];
  const args = [];
  const returns = [];
  const versionList = reverse(versions.slice());
  let functionObject;
  let functionDescription;
  let header;
  let body;
  let isClass;
  let methods = [];
  let properties = [];

  if (streamlitFunction in streamlit) {
    functionObject = streamlit[streamlitFunction];
    isClass = functionObject.is_class;
    if (
      functionObject.description !== undefined &&
      functionObject.description
    ) {
      functionDescription = { __html: functionObject.description };
    }
  } else {
    return (
      <div className={styles.Container} ref={blockRef} key={slug}>
        <div className="code-header">
          <H2>{streamlitFunction}</H2>
        </div>
        <Warning>
          <p>
            This method did not exist in version <code>{currentVersion}</code>{" "}
            of Streamlit.
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
    const functionName = functionObject.signature
      ? `${functionObject.signature}`.split("(")[0].replace("streamlit", "st")
      : "";
    const name =
      String(functionObject.name).startsWith("html") ||
      String(functionObject.name).startsWith("iframe")
        ? `st.components.v1.${functionObject.name}`
        : functionName;
    const selectClass =
      currentVersion !== versionList[0]
        ? "version-select old-version"
        : "version-select";
    header = (
      <div className={styles.HeaderContainer}>
        <div className={styles.TitleContainer}>
          <H2 className={styles.Title}>{name}</H2>
          <form className={classNames(selectClass, styles.Form)}>
            <label>
              <span className="sr-only">Streamlit Version</span>
              <select
                value={currentVersion}
                onChange={handleSelectVersion}
                className={styles.Select}
              >
                {versionList.map((version, index) => {
                  return (
                    <option value={version} key={version}>
                      v{version}
                    </option>
                  );
                })}
              </select>
            </label>
          </form>
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

  for (const index in functionObject.args) {
    const row = {};
    const param = functionObject.args[index];
    const isDeprecated =
      param.deprecated && param.deprecated.deprecated === true;
    const deprecatedMarkup = isDeprecated
      ? `
      <div class="${styles.DeprecatedContent}">
        <i class="material-icons-sharp">
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
          <p class="${isDeprecated ? "deprecated" : ""}">
            ${param.name}
            <span class='italic code'>(${param.type_name})</span>
          </p> `;
      row["body"] = `
        ${deprecatedMarkup}
        ${description}
      `;
    } else {
      row["title"] = `
          <p class="${isDeprecated ? "deprecated" : ""}">
            <span class='bold'>${param.name}</span>
            <span class='italic code'>(${param.type_name})</span>
          </p>`;
      row["body"] = `
        ${deprecatedMarkup}
        ${description}
      `;
    }

    args.push(row);
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
      ? method.signature.match(/\(([^)]*)\)/)[1]
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

  let propertiesRows = [];

  for (const index in properties) {
    const row = {};
    const property = properties[index];
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

    row[
      "title"
    ] = `<p><span class='italic code'>(${param.type_name})</span></p> `;
    row["body"] = `${description} `;

    returns.push(row);
  }

  const footTitles = [];
  const footRowsContent = [];

  if (methods.length) {
    footTitles.push({ title: "Methods" });
    footRowsContent.push(methodRows);
  }

  if (returns.length) {
    footTitles.push({ title: "Returns" });
    footRowsContent.push(returns);
  }

  if (properties.length) {
    footTitles.push({ title: "Properties" });
    footRowsContent.push(propertiesRows);
  }

  body = (
    <Table
      head={{
        title: (
          <>
            {isClass ? "Class description" : "Function signature"}
            <a
              className={styles.Title.a}
              href={functionObject.source}
              target="_blank"
              rel="noopener noreferrer"
              title={
                "View st." + functionObject.name + " source code on GitHub"
              }
            >
              [source]
            </a>
          </>
        ),
        content: `<p class='code'> ${functionObject.signature}</p> `,
      }}
      body={args.length ? { title: "Parameters" } : null}
      bodyRows={args.length ? args : null}
      foot={[
        methods.length ? { title: "Methods" } : null,
        returns.length ? { title: "Returns" } : null,
        properties.length ? { title: "Attributes" } : null,
      ].filter((section) => section !== null)}
      footRows={[
        methods.length ? methodRows : null,
        returns.length ? returns : null,
        properties.length ? propertiesRows : null,
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
