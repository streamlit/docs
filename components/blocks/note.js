import React from "react";

const Note = ({ dark, background, color, children }) => {
  return (
    <section className={`block-note bg-${background} color-${color}`}>
      {children}
    </section>
  );
};

export default Note;
