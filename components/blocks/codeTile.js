// Used in cheatsheet.
export default function CodeTile({ children, size, featured }) {
  return (
    <section
      className={`code-tile ${size || ""} ${featured ? "featured" : ""}`}
    >
      {children}
    </section>
  );
}
