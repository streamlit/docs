import React from "react";

import Link from 'next/link'

// import NavChild from './navChild'

import { AnimatePresence, motion } from 'framer-motion';

export default class NavChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accordion: false
        };
        this.toggleAccordion = this.toggleAccordion.bind(this);
    }
    toggleAccordion() {
        this.setState({ accordion: !this.state.accordion })
    }
    render() {
        const state = this.state;
        const props = this.props;

        let subNav;

        if (props.page.children && props.page.children.length > 0 && state.accordion) {
            subNav = (
                <ul className="child-sub-nav">
                    {props.page.children.map((child, index) => (
                        <NavChild
                            slug={props.slug}
                            key={child.menu_key}
                            page={child}
                            depth={child.depth + 1}
                        />
                    ))}
                </ul>
            )
        }

        let accordion;

        let active = props.slug.includes(props.page.menu_key) ? true : false

        if (props.page.children && props.page.children.length > 0) {
            accordion = <i className={`accordion ${state.accordion ? 'close' : 'open' }`} onClick={this.toggleAccordion}>{state.accordion ? 'remove' : 'add'}</i>
        }

        let link;
        let icon;
        let target;

        if (!props.page.url.startsWith('/')) {
            icon = (
                <i className="external">open_in_new</i>                
            )
            target = '_blank'
        }

        link = (
            <span className={`child-item ${active ? 'active' : ''}`}>
                <Link href={props.page.url}>
                    <a className="not-link" target={target}>
                        <span>{props.page.name}</span> {icon}
                    </a>
                </Link>
                {accordion}
            </span>
        )

        let navItem = (
            <li className="child">
                {link}
                {subNav}
            </li >
        )

        return navItem
    }
}