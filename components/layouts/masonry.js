import { debounce } from "lodash";
import React, { useState, useEffect } from "react";

import styles from "./masonry.module.css";

const Masonry = ({ children }) => {
  const [height, setHeight] = useState(2000);

  const maxColumnHeight = () => {
    const childrenDOMElements = document.querySelectorAll(".masonry > *");
    let columnHeights = [0, 0, 0];

    for (let index = 0; index < childrenDOMElements.length; index++) {
      let row = index % 3;
      columnHeights[row] =
        columnHeights[row] + childrenDOMElements[index].offsetHeight;
      if (index == 0) {
        childrenDOMElements[index].classList.add("top-left");
      } else if (index == 2) {
        childrenDOMElements[index].classList.add("top-right");
      }
    }
    return Math.max(...columnHeights) + 5;
  };

  const updateMaxheight = () => {
    setHeight(maxColumnHeight());
  };

  const debouncedUpdateMaxheight = debounce(updateMaxheight, 200);

  useEffect(() => {
    updateMaxheight();
    window.addEventListener("resize", debouncedUpdateMaxheight);

    return () => {
      window.removeEventListener("resize", debouncedUpdateMaxheight);
    };
  }, []);

  return <section className={styles.Container}>{children}</section>;
};

export default Masonry;
