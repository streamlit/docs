export default function IconHeader({
  children,
  icon,
  rotate,
  title,
  background,
  color,
}) {
  return (
    <section className={`block-icon-header color-${background}`}>
      <i
        className={`material-icons-sharp bg-${background} color-${color}`}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      >
        {icon}
      </i>
      <h4>{title}</h4>
    </section>
  );
}
