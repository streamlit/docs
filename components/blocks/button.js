import Link from 'next/link'

export default function IconHeader({ children, link }) {
    return (
        <Link href={link}><button>{children}</button></Link>
    )
}