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
    async function highlight() {
      if (typeof window !== "undefined" || !language) {
        await import(
          `prismjs/components/prism-${language ? language : "python"}`
        );
        Prism.highlightAll();
      }
    }

    highlight();
  }, [language]);

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
