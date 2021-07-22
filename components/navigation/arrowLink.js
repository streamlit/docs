import Link from 'next/link'

export default function ArrowLink({ children, link, type, content, clean }) {
    function ArrowType() {
        if (type == 'back' && !clean) {
            return (
                <Link href={link}>
                    <a className={`not-link arrow_link block-arrow-link ${type}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22017 13.7159L8.70312 12.2393L4.81037 8.35298H13.9318V6.19247H4.81037L8.70312 2.29972L7.22017 0.829545L0.776989 7.27273L7.22017 13.7159Z" fill="none" /></svg>
                        <span v-if="type == 'back' && !clean" className="bold">Previous: </span>
                        {content}
                    </a>
                </Link>
            )
        } else if (type == 'next' && !clean) {
            return (
                <Link href={link}>
                    <a className={`not-link arrow_link block-arrow-link ${type}`}>
                        <span className="bold">Next: </span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.96165 13.7159L13.4048 7.27273L6.96165 0.829545L5.47869 2.30611L9.37145 6.19247H0.25V8.35298H9.37145L5.47869 12.2457L6.96165 13.7159Z" fill="none" /></svg>
                        {content}
                    </a>
                </Link>
            )
        } else if (type == 'back' && clean) {
            return (
                <Link href={link}>
                    <a className={`not-link arrow_link block-arrow-link ${type}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22017 13.7159L8.70312 12.2393L4.81037 8.35298H13.9318V6.19247H4.81037L8.70312 2.29972L7.22017 0.829545L0.776989 7.27273L7.22017 13.7159Z" fill="none" /></svg>
                        <span v-if="type == 'back' && !clean" className="bold">Previous: </span>
                        {content}
                    </a>
                </Link>
            )
        } else if (type == 'next' && clean) {
            return (
                <Link href={link}>
                    <a className={`not-link arrow_link block-arrow-link ${type}`}>
                        {content}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.96165 13.7159L13.4048 7.27273L6.96165 0.829545L5.47869 2.30611L9.37145 6.19247H0.25V8.35298H9.37145L5.47869 12.2457L6.96165 13.7159Z" fill="none" /></svg>
                    </a>
                </Link>
            )
        }
    }
    return (
        <ArrowType />
    )
}