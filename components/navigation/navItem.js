import React from "react";

import Link from 'next/link'

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

        if (props.page.children && props.page.children.length > 0) {
            subNav = (
                <ul className="sub-nav">
                    {props.page.children.map((child, index) => (
                        <NavChild
                            key={child.menu_key}
                            page={child}
                            depth={child.depth + 1}
                        />
                    ))}
                </ul>
            )
        }

        let navItem;

        let navBox;
        
        navBox = (
            <section className="head" >
                <div className={`icon-box bg-${props.page.color}`}>
                    <i>{props.page.icon}</i>
                </div>
                <p className={`bold large color-${props.page.color}`}>{props.page.name}</p>
            </section >
        )

        if ( props.page.url.startsWith('/') ) {
            navItem = (
                <li className="nav-item small" id={props.page.menu_key}>
                    <Link href={props.page.url}>
                        <a className="not-link">
                            {navBox}
                        </a>
                    </Link>
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