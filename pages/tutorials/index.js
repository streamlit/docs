// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import Layout from '../../components/layouts/globalTemplate'

export default function Home() {
    return (
        <Layout>
            <h1>We're doing this.</h1>
            <Link href="/style-guide">
                <a>
                    All components.
                </a>
            </Link>
        </Layout>
    )
}
