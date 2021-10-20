import Link from 'next/link'

export default function SuggestEdits({ sourcefile }) {
    return (
        <section className="suggestEdits">
            <section className="buttons">
                <Link href={sourcefile} target={sourcefile}>
                    <button><i>code</i> Suggest edits</button>
                </Link>
            </section>
        </section >
    )
}