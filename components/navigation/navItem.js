import React from "react";

import Link from 'next/link'

import NavChild from './navChild'


export default class NavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: null
        };
    }

    componentDidMount() {
        let childrenRoutes = this.props.routes.filter(route => (route.meta.navigation.depth == this.props.depth && route.meta.navigation.parent == this.trueName()))
        this.setState({ children: childrenRoutes })
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
        const state = this.state;
        const props = this.props;

        let subNav;
        if (state.children && state.children.length > 0) {
            subNav = (
                <ul className="sub-nav">
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

        let navItem;
        if (props.offScreenNav) {
            navItem = (
                <li className="nav-item small" id={`off-screen-${props.page.name}`}>
                    <Link href={props.page.path}>
                        <a className="not-link">
                            <section className="head" >
                                <div className={`icon-box bg-${props.page.meta.style.color}`}>
                                    <i>{props.page.meta.style.icon}</i>
                                </div>
                                <p className={`bold large color-${props.page.meta.style.color}`}>{this.cleanName()}</p>
                            </section >
                        </a>
                    </Link >
                    {subNav}
                </li >
            )
        } else {
            navItem = (
                <li className="nav-item small" id={props.page.name}>
                    <Link href={props.page.path}>
                        <a className="not-link">
                            <section className="head" >
                                {/* @mouseenter="openSideBar($event, page.name)" */}
                                <div className={`icon-box bg-${props.page.meta.style.color}`}>
                                    <i>{props.page.meta.style.icon}</i>
                                </div>
                                <p className={`bold large color-${props.page.meta.style.color}`}>{this.cleanName()}</p>
                            </section >
                        </a>
                    </Link >
                    {subNav}
                </li >
            )

        }

        return navItem
    }
}