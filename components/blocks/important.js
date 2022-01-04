import React, { useState, useLayoutEffect } from "react";

import IconHeader from "../blocks/iconHeader";

const Important = ({ children }) => {
  const [theme, setTheme] = useState("light-mode");

  useLayoutEffect(() => {
    window.addEventListener("ChangeTheme", handleTheme);

    return () => {
      window.removeEventListener("ChangeTheme", handleTheme);
    };
  }, []);

  const handleTheme = () => {
    setTheme(document.body.dataset.theme);
  };

  let block;
  if (theme == "dark-mode") {
    block = (
      <section className={`block-note bg-dark-orange color-white`}>
        <IconHeader
          icon="priority_high"
          rotate="0"
          title="Important"
          background="orange-70"
          color="white"
        />
        {children}
      </section>
    );
  } else {
    block = (
      <section className={`block-note bg-orange-10 color-gray-90`}>
        <IconHeader
          icon="priority_high"
          rotate="0"
          title="Important"
          background="orange-70"
          color="white"
        />
        {children}
      </section>
    );
  }

  return block;
};

export default Important;
