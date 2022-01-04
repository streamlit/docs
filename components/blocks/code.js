import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

import Image from "./image";

const Code = ({ code, children, language, img, lines }) => {
  const [windowWidth, setWindowWidth] = useState();

  const handleHighlight = () => {
    if (
      windowWidth === undefined ||
      (windowWidth !== undefined && windowWidth !== window.innerWidth)
    ) {
      Prism.highlightAll();
      setWindowWidth(window.innerWidth);
    } else {
      return;
    }
  };

  const debouncedHandleHighlight = debounce(handleHighlight, 200);

  useEffect(() => {
    handleHighlight();
    window.addEventListener("resize", debouncedHandleHighlight);

    return () => {
      window.removeEventListener("resize", debouncedHandleHighlight);
    };
  }, [windowWidth]);

  let ConditionalRendering;
  let customCode = code !== undefined ? code : children;
  let languageClass = `language-${language}`;

  if (children !== undefined && children.props !== undefined) {
    customCode = children.props.children;
    languageClass = children.props.className;
  }

  if (img) {
    ConditionalRendering = (
      <section className="block-code">
        <Image src={img} clean={true} />
        <pre>
          <code className={`${languageClass} line-numbers`}>{customCode}</code>
        </pre>
      </section>
    );
  } else if (lines) {
    ConditionalRendering = (
      <section className="block-code line-highlight">
        <pre data-line={lines}>
          <code className={`${languageClass} line-numbers`}>{customCode}</code>
        </pre>
      </section>
    );
  } else {
    ConditionalRendering = (
      <section className="block-code">
        <pre>
          <code className={`${languageClass} line-numbers`}>{customCode}</code>
        </pre>
      </section>
    );
  }

  return ConditionalRendering;
};

export default Code;
