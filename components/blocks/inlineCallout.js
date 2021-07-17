import Link from "next/link";

export default function InlineCallout({ children, icon, color, bold, href }) {
    return (
        <section className="block-inline-callout">
            <Link href={href}>
                <a className={`icon-box bg-${color}`}>
                    <i>{icon}</i>
                </a>
            </Link>
            <article>
                <p>
                    <Link href={href}>
                        <a className={`color-${color}`}>{bold}</a>
                    </Link>
                    {" "}
                    {children}
                </p>
            </article >
        </section >
    )
}
