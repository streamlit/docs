import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    updateMaxheight();
    window.addEventListener("resize", updateMaxheight);

    return () => {
      window.removeEventListener("resize", updateMaxheight);
    };
  }, []);

  return (
    <section className="masonry" style={{ "--max-height": height + "px" }}>
      {children}
    </section>
  );
};

export default Masonry;
