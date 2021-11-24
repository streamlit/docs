import React, { useState } from "react";
import Link from "next/link";

const Tile = ({
  img,
  dark,
  icon,
  background,
  color,
  rotate,
  size,
  link,
  title,
  text,
  borderColor,
}) => {
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

  let image;
  if (img) {
    image = <img src={img} />;
  } else if (dark) {
    img = (
      <i
        className={`material-icons-sharp bg-${
          dark.background || "l-blue-70"
        } color-${dark.color || "white"}`}
        style={{ transform: `rotate(${rotate || 0}deg)` }}
      >
        {icon || "downloading"}
      </i>
    );
  } else {
    img = (
      <i
        className={`material-icons-sharp bg-${
          background || "l-blue-70"
        } color-${color || "white"}`}
        style={{ transform: `rotate(${rotate || 0}deg)` }}
      >
        {icon || "downloading"}
      </i>
    );
  }

  let block;
  if (dark && theme == "dark-mode") {
    block = (
      <article
        className={`block-tile ${size || "third"} bg-${
          dark.background || "l-blue-70"
        } color-${dark.color || "white"} border-${
          dark.borderColor || "transparent"
        }`}
      >
        <Link href={link || "/"}>
          <a className="not-link">
            {image}
            <section className="content">
              <h4 className="title">{title || "Install Streamlit"}</h4>
              <p className="small">
                {text ||
                  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia."}
              </p>
            </section>
          </a>
        </Link>
      </article>
    );
  } else {
    block = (
      <article
        className={`block-tile ${size || "third"} bg-${
          background || "l-blue-70"
        } color-${color || "white"} border-${borderColor || "transparent"}`}
      >
        <Link href={link || "/"}>
          <a className="not-link">
            {image}
            <section className="content">
              <h4 className="title">{title || "Install Streamlit"}</h4>
              <p className="small">
                {text ||
                  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia."}
              </p>
            </section>
          </a>
        </Link>
      </article>
    );
  }

  return block;
};

export default Tile;
