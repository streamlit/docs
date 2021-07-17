import React from "react"

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

    createLink(index, split) {
        const pathName = split.slice(0, index + 1).join('/')
        return `/${pathName}`
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

        const paths = props.slug.join('/')
        const location = `/${paths}`
        const slugSoFar = []

        for ( const i in props.slug )
        {
            const item = String( props.slug[i] )
            slugSoFar.push(item)

            if ( i == 0)
            {
                breadcrumbs.push({
                    link: '/',
                    title: 'Home'
                })
            }

            if ( i < props.slug.length )
            {
                breadcrumbs.push({
                    link: this.createLink(i, slugSoFar),
                    title: this.formatedTitle(item)
                })
            }
            else
            {
                breadcrumbs.push({
                    link: location,
                    title: this.formatedTitle(item)
                })
            }
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
