import Link from 'next/link'

export default function Psa() {
    return (
        <section className="block-forum-psa">
            <i>forum</i>
            <article className="content">
                <h3>Still have questions?</h3>
                <p>Our <Link href="/"><a>forums</a></Link> are full of helpful information and Streamlit experts.</p>
            </article>
        </section>
    )
}