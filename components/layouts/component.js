import HeaderLink from '../utilities/headerLink'

export default function Component({ children, label }) {
    return (
        <article className="block-component-container">
            <section className="label">
                <HeaderLink>
                    <h1 className="bold">{label}</h1>
                </HeaderLink>
            </section>
            <section className="comp">{children}</section>
        </article>
    )
}

// export default Component
