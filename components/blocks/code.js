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

// Map language identifiers to display-friendly names
const languageDisplayNames = {
  python: "Python",
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  bash: "Bash",
  sh: "Bash",
  shell: "Shell",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  html: "HTML",
  css: "CSS",
  sql: "SQL",
  toml: "TOML",
  markdown: "Markdown",
  md: "Markdown",
  jsx: "JSX",
  tsx: "TSX",
  go: "Go",
  rust: "Rust",
  ruby: "Ruby",
  java: "Java",
  c: "C",
  cpp: "C++",
  csharp: "C#",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  scala: "Scala",
  r: "R",
  docker: "Docker",
  dockerfile: "Dockerfile",
  none: "",
};

const Code = ({
  code,
  children,
  language,
  img,
  lines,
  hideCopyButton = false,
  filename,
}) => {
  // Create a ref for the code element.
  const codeRef = useRef(null);

  useEffect(() => {
    // Get the language from the className, if it exists.
    // Classname usually is `language-python`, `language-javascript`, `language-bash`, etc.
    let importLanguage = children?.props?.className?.substring(9);

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
              `Prism doesn't support this language: ${importLanguage}`,
            );
          }
        }
        // Highlight the code block and conditionally enable toolbar plugins (including copy button)
        if (codeRef.current) {
          // First highlight the element
          Prism.highlightElement(codeRef.current);
          // Then activate toolbar plugins on the parent container if copy button is not hidden
          if (!hideCopyButton) {
            const container = codeRef.current.closest(`.${styles.Container}`);
            if (container) {
              Prism.highlightAllUnder(container);
            }
          }
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

  // Extract language identifier for display
  const langId = languageClass?.substring(9) || language || "python";
  const displayLanguage = languageDisplayNames[langId] || langId;
  const showLanguage =
    langId.toLowerCase() !== "none" && !(filenameOnly && filename);

  const Header = (
    <div className={classNames(styles.Header, "code-block-header")}>
      {showLanguage && (
        <span className={styles.Language}>{displayLanguage}</span>
      )}
      {filename && <span className={styles.Filename}>{filename}</span>}
    </div>
  );

  if (img) {
    ConditionalRendering = (
      <section
        className={classNames(styles.Container, {
          [styles.NoCopyButton]: hideCopyButton,
        })}
      >
        {Header}
        <Image src={img} clean={true} />
        <pre className={classNames(styles.Pre, styles.HasHeader)}>
          <code ref={codeRef} className={languageClass}>
            {customCode}
          </code>
        </pre>
      </section>
    );
  } else if (lines) {
    ConditionalRendering = (
      <section
        className={classNames(styles.Container, styles.LineHighlight, {
          [styles.NoCopyButton]: hideCopyButton,
        })}
      >
        {Header}
        <pre className={styles.HasHeader} data-line={lines}>
          <code ref={codeRef} className={languageClass}>
            {customCode}
          </code>
        </pre>
      </section>
    );
  } else {
    ConditionalRendering = (
      <section
        className={classNames(styles.Container, {
          [styles.NoCopyButton]: hideCopyButton,
        })}
      >
        {Header}
        <pre className={classNames(styles.Pre, styles.HasHeader)}>
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
