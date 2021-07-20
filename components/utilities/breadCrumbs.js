import React from "react"
import { breadcrumbsForSlug } from '../../lib/api'
import Link from "next/link"

export default class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props)
    }

    formatedTitle(title) {
        return `${title}`
            .replace(/\-/g, ' ')
            .replace(/\bapi\b/, 'API')
    }

    createCrumb(crumb, index, slug) {
        let formatedCrumb
        if (index == slug.length) {
            formatedCrumb = (
                <Link href={crumb.link}>
                    <a className="not-link bold">{crumb.title}</a>
                </Link>
            )
        } else {
            formatedCrumb = (
                <>
                    <Link href={crumb.link}>
                        <a className="not-link">{crumb.title}</a>
                    </Link>
                    /
                </>
            )
        }
        return formatedCrumb
    }


    render() {
        const props = this.props
        const breadcrumbs = []

        if ( props.slug === undefined ) { return '' }

        // Find the menu with the current slug
        const paths = props.slug.join('/')
        const location = `/${paths}`
        const path = breadcrumbsForSlug(props.menu, location, [])

        breadcrumbs.push({
            link: '/',
            title: 'Home'
        })

        path.forEach(obj => {
            if (obj.url === location) {
                breadcrumbs.push({
                    link: location,
                    title: this.formatedTitle(obj.name)
                })
            } else {
                breadcrumbs.push({
                    link: obj.url,
                    title: this.formatedTitle(obj.name)
                })
            }
        });

        if ( breadcrumbs.length === 1 ) {
            breadcrumbs.push({
                link: location,
                title: paths
            })
        }

        return (
            <nav className="breadcrumbs">
                {breadcrumbs.map((crumb, index) => (
                    <li key={`${crumb}-${index}`} className="small">
                        {this.createCrumb(crumb, index, props.slug)}
                    </li>
                ))}
            </nav>
        )
    }
}
