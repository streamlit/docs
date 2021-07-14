import React from "react";

import Link from 'next/link'

// import NavChild from './navChild'

import { AnimatePresence, motion } from 'framer-motion';

export default class NavChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: null,
            accordion: false
        };
        this.toggleAccordion = this.toggleAccordion.bind(this);
    }
    componentDidMount() {
        let childrenRoutes = this.props.routes.filter(route => (route.meta.navigation.depth == this.props.depth && route.meta.navigation.parent == this.trueName()))
        this.setState({ children: childrenRoutes })
    }

    trueName() {
        return this.props.child.path.split('/').pop();
    }
    cleanName() {
        return this.trueName().replaceAll('-', ' ');
    }
    shouldHaveID() {
        return (this.offScreen ? this.child.name : false)
    }
    toggleAccordion() {
        this.setState({ accordion: !this.state.accordion })
    }

    render() {
        const state = this.state;
        const props = this.props;

        let subNav;

        if (state.children && state.children.length > 0 && state.accordion) {
            subNav = (
                <ul className="child-sub-nav">
                    {state.children.map((child, index) => (
                        <NavChild
                            key={child.name}
                            child={child}
                            routes={props.routes}
                            depth={props.depth + 1}
                        // openSideBar={openSideBar}
                        />
                    ))}
                </ul>
            )
        }

        let accordion;

        if (state.children && state.children.length > 0 && !state.accordion) {
            accordion = <i className="accordion open" onClick={this.toggleAccordion}>add</i>
        } else if (state.children && state.children.length > 0 && state.accordion) {
            accordion = <i className="accordion close" onClick={this.toggleAccordion}>remove</i>
        }

        let link;
        if (props.child.meta.external) {
            link = (
                <span className="child-item">
                    <a className="not-link" href={props.child.meta.external} target="_blank">
                        <span>{this.cleanName()}</span> <i className="external">open_in_new</i>
                    </a>
                </span>
            )
        } else {
            link = (
                <span className="child-item">
                    <Link href={props.child.path}>
                        <a className="not-link">
                            <span>{this.cleanName()}</span>
                        </a>
                    </Link>
                    {accordion}
                </span>
            )

        }

        let navItem = (
            <li className="child">
                {link}
                {subNav}
            </li >
        )
        return navItem
    }
}