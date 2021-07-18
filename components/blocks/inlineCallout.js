import Link from "next/link";

export default function InlineCallout({ children, icon, color, bold, href }) {
    return (
        <section className="block-inline-callout">
            <Link href={href}>
                <a className={`icon-box not-link bg-${color}`}>
                    <i>{icon}</i>
                </a>
            </Link>
            <article>
                <p>
                    <Link href={href}>
                        <a className={`not-link color-${color}`}>{bold}</a>
                    </Link>
                    {" "}
                    {children}
                </p>
            </article >
        </section >
    )
}
