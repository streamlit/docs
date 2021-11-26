import React, { useState, useEffect } from "react";

import Note from "./note";
import Button from "./button";
import Image from "./image";

const NoteSplit = ({ background, title, copy, button }) => {
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

  let block = (
    <section className="block-note-split">
      <Note background={background}>
        <section className="content">
          <h2>{title}</h2>
          <p>{copy}</p>
          <Button link={button.link}>{button.text}</Button>
        </section>
        <Image src="/join.png" clean={true} />
      </Note>
    </section>
  );

  return block;
};

export default NoteSplit;
