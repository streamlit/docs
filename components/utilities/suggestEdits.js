import suggestEditsStyle from "./suggestEdits.module.css";

const SuggestEdits = ({ sourcefile }) => {
  return (
    <section
      className={`
        ${suggestEditsStyle.Container}
      `}
    >
      <section
        className="
          flex items-center cursor-pointer
        "
      >
        <i className="mr-2">edit</i>
        <a
          className="group-hover:opacity-70 group-hover:border-b-red-70"
          href={sourcefile}
          target="_blank"
          rel="noopener noreferrer"
        >
          Suggest edits
        </a>
      </section>
    </section>
  );
};

export default SuggestEdits;
