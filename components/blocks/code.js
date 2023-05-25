import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

import Image from "./image";

import styles from "./code.module.css";

// Initialize the cache for imported languages.
const languageImports = new Map();

const Code = ({ code, children, language, img, lines }) => {
  // Create a ref for the code element.
  const codeRef = useRef(null);

  useEffect(() => {
    // Get the language from the className, if it exists.
    // Classname usually is `language-python`, `language-javascript`, `language-bash`, etc.
    let importLanguage = children.props.className?.substring(9);

    // If no language, default to Phython
    if (importLanguage === undefined || importLanguage === "undefined") {
      importLanguage = "python";
    }
    // Default `sh` language to `bash` for Prism import, since we use `sh` throughout our codebase but it's not a proper Prism import
    else if (importLanguage === "sh") {
      importLanguage = "bash";
    } else if (importLanguage === "js") {
      importLanguage = "javascript";
    }

    // After we have the values, let's import just the necessary languages
    async function highlight() {
      if (typeof window !== "undefined") {
        // Only import the language if it hasn't been imported before.
        if (!languageImports.has(importLanguage)) {
          try {
            await import(`prismjs/components/prism-${importLanguage}`);
            languageImports.set(importLanguage, true);
          } catch (error) {
            console.error(
              `Prism doesn't support this language: ${importLanguage}`
            );
          }
        }
        // Only highlight the current code block.
        if (codeRef.current) {
          Prism.highlightElement(codeRef.current);
        }
      }
    }

    highlight();
  }, [children]);

  let ConditionalRendering;
  let customCode = code !== undefined ? code : children;
  let languageClass = `language-${language}`;

  if (children !== undefined && children.props !== undefined) {
    customCode = children.props.children;
    languageClass = children.props.className;
  }

  if (img) {
    ConditionalRendering = (
      <section className={styles.Container}>
        <Image src={img} clean={true} />
        <pre>
          <code ref={codeRef} className={languageClass}>
            {customCode}
          </code>
        </pre>
      </section>
    );
  } else if (lines) {
    ConditionalRendering = (
      <section className={classNames(styles.Container, styles.LineHighlight)}>
        <pre data-line={lines}>
          <code ref={codeRef} className={languageClass}>
            {customCode}
          </code>
        </pre>
      </section>
    );
  } else {
    ConditionalRendering = (
      <section className={styles.Container}>
        <pre>
          <code ref={codeRef} className={languageClass}>
            {customCode}
          </code>
        </pre>
      </section>
    );
  }

  return ConditionalRendering;
};

export default Code;
