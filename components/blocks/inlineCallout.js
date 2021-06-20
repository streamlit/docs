export default function InlineCallout({ children, icon, color, bold }) {
    return (
        <section className="block-inline-callout">
            <section className={`icon-box bg-${color}`}>
                <i>{icon}</i>
            </section>
            <article>
                <p><strong className={`color-${color}`}>{bold}</strong> {children}</p>
            </article >
        </section >
    )
}