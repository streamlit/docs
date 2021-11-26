import React, { useState, useEffect } from "react";

import IconHeader from "./iconHeader";

const Note = ({ children }) => {
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
      <section className={`block-note bg-dark-black color-white`}>
        <IconHeader
          icon="push_pin"
          rotate="45"
          title="Note"
          background="l-blue-70"
          color="white"
        />
        {children}
      </section>
    );
  } else {
    block = (
      <section className={`block-note bg-l-blue-10 color-gray-90`}>
        <IconHeader
          icon="push_pin"
          rotate="45"
          title="Note"
          background="l-blue-70"
          color="white"
        />
        {children}
      </section>
    );
  }

  return block;
};

export default Note;
