import findIndex from "lodash/findIndex"
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
    componentDidMount() {
        if ('/' + this.props.slug.slice(0, 2).join('/') === this.props.page.url) {
            this.setState({ accordion: true })
        }
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
                            color={props.color}
                            depth={child.depth + 1}
                            paths={props.paths}
                            version={props.version}
                            maxVersion={props.maxVersion}
                        />
                    ))}
                </ul>
            )
        }

        let accordion;

        let active = ('/' + props.slug.join('/') === props.page.url) ? true : false

        if (props.page.children && props.page.children.length > 0) {
            accordion = <i className={`accordion ${state.accordion ? 'close' : 'open'}`} onClick={this.toggleAccordion}>{state.accordion ? 'remove' : 'add'}</i>
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
        
        let coloredBall;
        
        if (active) {
            coloredBall = <span className={`colored-ball bg-${props.color}`}></span>
        }

        let url = props.page.url;

        if (props.version && props.version !== props.maxVersion && props.page.url.startsWith('/')) {
            // We need to version this URL, Check if the URL has a version for this version
            const newSlug = props.page.url.split('/')
            newSlug[0] = props.version
            const newUrl = `/${newSlug.join('/')}`
            const index = findIndex(props.paths.paths, (path) => path.params.location === newUrl)
            if (index >= 0) {
                url = props.paths.paths[index].params.location
            }
        }

        link = (
            <span className={`child-item ${active ? 'active' : ''}`}>
                <Link href={url}>
                    <a className="not-link" target={target}>
                        {coloredBall}
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