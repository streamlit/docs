// Used in cheatsheet.
const CodeTile = ({ children, size, featured }) => {
  return (
    <section
      className={`code-tile ${size || ""} ${featured ? "featured" : ""}`}
    >
      {children}
    </section>
  );
};

export default CodeTile;
