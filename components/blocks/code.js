import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";
import "prismjs/plugins/diff-highlight/prism-diff-highlight";
import "prismjs/plugins/diff-highlight/prism-diff-highlight.css";

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

import languageDisplayNames, {
  getPrismLanguage,
} from "../../lib/languageDisplayNames";

// Initialize the cache for imported languages.
const languageImports = new Map();

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

    // If no language, default to Python
    if (importLanguage === undefined || importLanguage === "undefined") {
      importLanguage = "python";
    }

    // Map to Prism component name (some differ, e.g., sh -> bash)
    importLanguage = getPrismLanguage(importLanguage);

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
  const diffMatch = langId.match(/^diff-([\w-]+)$/);
  const displayLanguage = diffMatch
    ? languageDisplayNames[diffMatch[1]] || diffMatch[1]
    : languageDisplayNames[langId] || langId;
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

function getCleanDiffText(textContent) {
  return textContent
    .split(/\r?\n/)
    .filter((line) => !line.startsWith("-"))
    .map((line) =>
      line.startsWith("+") || line.startsWith(" ") ? line.substring(1) : line,
    )
    .join("\n");
}

function overrideDiffCopyButton(container, codeElement) {
  const copyButton = container.querySelector(".copy-to-clipboard-button");
  if (!copyButton) return;

  const timeout =
    parseInt(codeElement.getAttribute("data-prismjs-copy-timeout")) || 5000;

  const newButton = copyButton.cloneNode(true);
  copyButton.parentNode.replaceChild(newButton, copyButton);

  newButton.addEventListener("click", async () => {
    const cleanText = getCleanDiffText(codeElement.textContent);
    const span = newButton.querySelector("span");

    try {
      await navigator.clipboard.writeText(cleanText);
      if (span) {
        span.textContent = "Copied!";
        newButton.setAttribute("data-copy-state", "copy-success");
      }
    } catch {
      if (span) {
        span.textContent = "Press Ctrl+C to copy";
        newButton.setAttribute("data-copy-state", "copy-error");
      }
    }

    if (span) {
      setTimeout(() => {
        span.textContent = "Copy";
        newButton.setAttribute("data-copy-state", "copy");
      }, timeout);
    }
  });
}

async function highlightElement(
  importLanguage,
  languageImports,
  codeElement,
  hideCopyButton,
) {
  if (typeof window !== "undefined") {
    const isDiff = importLanguage.startsWith("diff-");
    if (isDiff) {
      const baseLang = importLanguage.substring(5);
      for (const lang of ["diff", baseLang]) {
        if (!languageImports.has(lang)) {
          try {
            await import(`prismjs/components/prism-${lang}`);
            languageImports.set(lang, true);
          } catch (error) {
            console.error(`Prism doesn't support this language: ${lang}`);
          }
        }
      }
      languageImports.set(importLanguage, true);
    } else if (!languageImports.has(importLanguage)) {
      try {
        await import(`prismjs/components/prism-${importLanguage}`);
        languageImports.set(importLanguage, true);
      } catch (error) {
        console.error(`Prism doesn't support this language: ${importLanguage}`);
      }
    }

    if (codeElement) {
      Prism.highlightElement(codeElement);

      if (!hideCopyButton) {
        const container = codeElement.closest(`.${styles.Container}`);
        if (container) {
          Prism.highlightAllUnder(container);

          if (isDiff) {
            overrideDiffCopyButton(container, codeElement);
          }
        }
      }
    }
  }
}

export default Code;
