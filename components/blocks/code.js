import React, { useEffect } from "react";
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

const Code = ({ code, children, language, img, lines }) => {
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
    }

    // After we have the values, let's import just the necessary languages
    async function highlight() {
      if (typeof window !== "undefined") {
        await import(`prismjs/components/prism-${importLanguage}`);
        Prism.highlightAll();
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
          <code className={languageClass}>{customCode}</code>
        </pre>
      </section>
    );
  } else if (lines) {
    ConditionalRendering = (
      <section className={classNames(styles.Container, styles.LineHighlight)}>
        <pre data-line={lines}>
          <code className={languageClass}>{customCode}</code>
        </pre>
      </section>
    );
  } else {
    ConditionalRendering = (
      <section className={styles.Container}>
        <pre>
          <code className={languageClass}>{customCode}</code>
        </pre>
      </section>
    );
  }

  return ConditionalRendering;
};

export default Code;
