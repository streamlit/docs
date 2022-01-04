import React, { useState, useEffect } from "react";

import IconHeader from "../blocks/iconHeader";

const Tip = ({ children }) => {
  const [theme, setTheme] = useState("light-mode");

  useEffect(() => {
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
      <section className={`block-note bg-dark-violet color-white`}>
        <IconHeader
          icon="star"
          rotate="0"
          title="Tip"
          background="violet-70"
          color="white"
        />
        {children}
      </section>
    );
  } else {
    block = (
      <section className={`block-note bg-violet-10 color-gray-90`}>
        <IconHeader
          icon="star"
          rotate="0"
          title="Tip"
          background="violet-70"
          color="white"
        />
        {children}
      </section>
    );
  }

  return block;
};

export default Tip;
