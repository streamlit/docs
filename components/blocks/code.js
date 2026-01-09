import React, { useCallback, useEffect, useRef, useState } from "react";
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

// Compress code with gzip and encode as base64 for Streamlit Playground
async function compressCodeForPlayground(code) {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);

  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  writer.write(data);
  writer.close();

  const compressedChunks = [];
  const reader = cs.readable.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    compressedChunks.push(value);
  }

  // Combine all chunks into a single Uint8Array
  const totalLength = compressedChunks.reduce(
    (acc, chunk) => acc + chunk.length,
    0,
  );
  const compressed = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of compressedChunks) {
    compressed.set(chunk, offset);
    offset += chunk.length;
  }

  // Convert to URL-safe base64 (uses - and _ instead of + and /)
  let binary = "";
  for (let i = 0; i < compressed.length; i++) {
    binary += String.fromCharCode(compressed[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_");
}

const TryMeButton = ({ code }) => {
  const onClick = useCallback(async () => {
    const encoded = await compressCodeForPlayground(code.trim());
    const url = `https://streamlit.io/playground?example=blank&code=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [code]);

  return (
    <button onClick={onClick} className={styles.TryMeButton}>
      <span className={styles.TryMeLabel}>Try it</span>
      <i className={`material-icons-sharp ${styles.TryMeIcon}`}>
        arrow_outward
      </i>
    </button>
  );
};

// Initialize the cache for imported languages.
const languageImports = new Map();

// Map language identifiers to display-friendly names
const languageDisplayNames = {
  python: "Python",
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  // Rename Bash to Terminal since Windows doesn't use Bash, and most of the commands we
  // mark as Bash here would actually work in any terminal.
  bash: "Terminal",
  sh: "Sh",
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
  // Lines to highlight. For example: "1, 5-7, 9"
  lines,
  hideCopyButton = false,
  hideHeader = false,
  filename,
  showAll = false,
  try: tryIt = false,
}) => {
  // Create a ref for the code element.
  const codeRef = useRef(null);
  hideCopyButton |= hideHeader;

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

    highlightElement(
      importLanguage,
      languageImports,
      codeRef.current,
      hideCopyButton,
    );
  }, [children]);

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
    langId.toLowerCase() !== "none" && (showAll || !filename);

  // Important: keep this in sync with components/block/autofunction.js
  return (
    <section
      className={classNames(styles.Container, {
        [lines]: styles.LineHighlight,
        [styles.NoCopyButton]: hideCopyButton,
      })}
    >
      {!hideHeader && (
        <div className={classNames(styles.Header, "code-block-header")}>
          {showLanguage && (
            <span className={styles.Language}>{displayLanguage}</span>
          )}
          {filename && <span className={styles.Filename}>{filename}</span>}
          {tryIt && <TryMeButton code={customCode} />}
        </div>
      )}

      {img && <Image src={img} clean={true} />}

      {/*
      The copy-to-clipboard feature requires <pre><code>, but this leads to
      hydration errors because sometimes there's already a <pre> around this
      entire component.
      */}
      <pre
        className={classNames(styles.Pre)}
        {...(lines && { "data-line": lines })}
      >
        <code
          ref={codeRef}
          className={languageClass}
          data-prismjs-copy-timeout="1000"
        >
          {customCode}
        </code>
      </pre>
    </section>
  );
};

async function highlightElement(
  importLanguage,
  languageImports,
  codeElement,
  hideCopyButton,
) {
  if (typeof window !== "undefined") {
    // Only import the language if it hasn't been imported before.
    if (!languageImports.has(importLanguage)) {
      try {
        await import(`prismjs/components/prism-${importLanguage}`);
        languageImports.set(importLanguage, true);
      } catch (error) {
        console.error(`Prism doesn't support this language: ${importLanguage}`);
      }
    }

    // Highlight the code block and conditionally enable toolbar plugins (including copy button)
    if (codeElement) {
      // First highlight the element
      Prism.highlightElement(codeElement);

      // Then activate toolbar plugins on the parent container if copy button is not hidden
      if (!hideCopyButton) {
        const container = codeElement.closest(`.${styles.Container}`);
        if (container) {
          Prism.highlightAllUnder(container);
        }
      }
    }
  }
}

export default Code;
