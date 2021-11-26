import React, { useState, useEffect } from "react";

const Note = ({ dark, background, color, children }) => {
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

  if (dark && theme == "dark-mode") {
    block = (
      <section
        className={`block-note bg-${dark.background} color-${dark.color}`}
      >
        {children}
      </section>
    );
  } else {
    block = (
      <section className={`block-note bg-${background} color-${color}`}>
        {children}
      </section>
    );
  }

  return block;
};

export default Note;
