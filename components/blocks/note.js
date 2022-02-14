import React from "react";
import classNames from "classnames";

import CalloutStyles from "./callout.module.css";
import NoteStyles from "./note.module.css";

import IconHeader from "./iconHeader";

const Note = ({ children }) => {
  return (
    <section className={classNames(CalloutStyles.Container, NoteStyles.Note)}>
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
};

export default Note;
