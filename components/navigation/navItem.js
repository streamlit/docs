import React from "react";

import Link from 'next/link'
import { urlInChildren } from '../../lib/utils.cjs'

import NavChild from './navChild'


export default class NavItem extends React.Component {
    constructor(props) {
        super(props);
    }

    trueName() {
        return this.props.page.path.split('/').pop();
    }
    cleanName() {
        return this.trueName().replaceAll('-', ' ');
    }
    shouldHaveID() {
        return (this.offScreen ? this.page.name : false)
    }

    render() {
        const props = this.props;

        let subNav;
        let url_in_child = false

        let navItem;

        let navBox;
        let active = urlInChildren(props.page, `/${props.slug.join('/')}`)
        let condensed = props.condensed ? props.condensed : false

        // We only want the color to show when we're either active, or the menu is condensed.
        let color = props.page.color ? `color-${props.page.color}` : ''
        color = condensed || active ? color : ''

        navBox = (
            <section className={`head ${active ? 'active' : ''}`}>
                <div className={`icon-box bg-${props.page.color}`}>
                    <i>{props.page.icon}</i>
                </div>
                <p className={`bold large ${color}`}>{props.page.name}</p>
            </section >
        )

        if (props.page.children && props.page.children.length > 0) {
            subNav = (
                <ul className="sub-nav">
                    {props.page.children.map((child, index) => (
                        <NavChild
                            slug={props.slug}
                            page={child}
                            color={props.page.color}
                            key={child.menu_key}
                            depth={child.depth + 1}
                            paths={props.paths}
                            version={props.version}
                            maxVersion={props.maxVersion}
                        />
                    ))}
                </ul>
            )
        }

        if (props.page.url.startsWith('/')) {
            navItem = (
                <li className="nav-item small" id={props.page.menu_key}>
                    {/* TBD: Removed the <Link> component for now on the `/library` URL, to trigger a page refresh and redirect to `/library/get-started` until we have the `/library` page populated */}
                    {props.page.url === '/library' ?
                        <a className="not-link" href={props.page.url}>
                            {navBox}
                        </a>
                        :
                        <Link href={props.page.url}>
                            <a className="not-link">
                                {navBox}
                            </a>
                        </Link>
                    }
                    {subNav}
                </li>
            )
        } else {
            navItem = (
                <li className="nav-item small" id={props.page.menu_key}>
                    <a className="not-link" href={props.page.url} target="_blank">
                        {navBox}
                    </a>
                    {subNav}
                </li>
            )
        }

        return navItem
    }
}
