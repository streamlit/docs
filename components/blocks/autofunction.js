import React, { useEffect, useState, useRef } from "react";
import reverse from "lodash/reverse";
import classNames from "classnames";
import Table from "./table";
import { H2 } from "./headers";
import Warning from "./warning";
import { withRouter, useRouter } from "next/router";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

import useSourceFile from "../../lib/useSourceFile";

import styles from "./autofunction.module.css";

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
  }, []);

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

  if (streamlitFunction in streamlit) {
    functionObject = streamlit[streamlitFunction];
    const sourceFile = useSourceFile(functionObject.source);

    if (
      functionObject.description !== undefined &&
      functionObject.description
    ) {
      functionDescription = { __html: functionObject.description };
    }
  } else {
    return (
      <div className={styles.Container} ref={blockRef}>
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

  if (hideHeader !== undefined && hideHeader) {
    header = "";
  } else {
    const name =
      String(functionObject.name).startsWith("html") ||
      String(functionObject.name).startsWith("iframe")
        ? `st.components.v1.${functionObject.name}`
        : `st.${functionObject.name}`;
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
    const description = param.description
      ? param.description
      : `<p>No description</p> `;

    if (param.is_optional) {
      row[
        "title"
      ] = `<p> ${param.name} <span class='italic code'>(${param.type_name})</span></p> `;
      row["body"] = `${description} `;
    } else {
      row[
        "title"
      ] = `<p><span class='bold'>${param.name}</span> <span class='italic code'>(${param.type_name})</span></p> `;
      row["body"] = `${description} `;
    }

    args.push(row);
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

  body = (
    <Table
      head={{
        title: "Function signature",
        content: `<p class='code'> ${functionObject.signature}</p> `,
      }}
      body={
        args.length
          ? {
              title: "Parameters",
            }
          : null
      }
      bodyRows={args.length ? args : null}
      foot={
        returns.length
          ? {
              title: "Returns",
            }
          : null
      }
      footRows={returns.length ? returns : null}
      additionalClass="full-width"
      footers={footers}
    />
  );

  return (
    <section className={styles.Container} ref={blockRef}>
      {header}
      {body}
    </section>
  );
};

export default withRouter(Autofunction);
