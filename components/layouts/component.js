import QuickLink from '../utilities/quickLink'

export default function Component({ children, label }) {
    return (
        <article className="block-component-container">
            <section className="label">
                <QuickLink>
                    <h1 className="bold">{label}</h1>
                </QuickLink>
            </section>
            <section className="comp">{children}</section>
        </article>
    )
}

// export default Component