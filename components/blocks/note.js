import React from "react";
import classNames from "classnames";

import CalloutStyles from "./callout.module.css";
import NoteStyles from "./note.module.css";

import IconHeader from "./iconHeader";

const Note = ({ children, label, compact }) => {
  return (
    <section
      className={classNames(
        CalloutStyles.Container,
        NoteStyles.Note,
        compact ? NoteStyles.Compact : "",
      )}
    >
      <IconHeader
        icon={"push_pin"}
        rotate="45"
        title={label ?? "Note"}
        background="lightBlue-70"
        color="white"
        compact={compact}
      />
      {children}
    </section>
  );
};

export default Note;
