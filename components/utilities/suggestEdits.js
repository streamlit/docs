import Link from "next/link";

const SuggestEdits = ({ sourcefile }) => {
  return (
    <section className="suggestEdits">
      <section className="buttons">
        <i>edit</i>
        <Link href={sourcefile} target={sourcefile}>
          <a>Suggest edits</a>
        </Link>
      </section>
    </section>
  );
};

export default SuggestEdits;
