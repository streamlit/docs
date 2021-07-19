import Link from 'next/link'

export default function RefCard({ children, size, href }) {
    // TODO(Thiago): Make code block clickable without taking you to the href.
    return (
        <Link href={href}>
            <div className={`not-link reference-card ${size || 'third'}`}>
                {children}
            </div>
        </Link>
    )
}
