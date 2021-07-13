import React from "react";
import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion';

import NavItem from '../navigation/navItem'

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            condensed: false,
            routes: [{ "path": "/app-gallery", "meta": { "navigation": { "order": 5, "depth": 1 }, "style": { "icon": "grid_view", "color": "blue-70" } }, "name": "app-gallery" }, { "path": "/components", "meta": { "navigation": { "order": 4, "depth": 1 }, "style": { "icon": "subtitles", "color": "b-g-70" } }, "name": "components" }, { "path": "/reference-guides", "meta": { "navigation": { "order": 3, "depth": 1 }, "style": { "icon": "menu_book", "color": "orange-70" } }, "name": "reference-guides" }, { "path": "/support", "meta": { "navigation": { "order": 6, "depth": 1 }, "style": { "icon": "question_answer", "color": "red-70" } }, "name": "support" }, { "path": "/topic-guides", "meta": { "navigation": { "order": 2, "depth": 1 }, "style": { "icon": "description", "color": "l-blue-70" } }, "name": "topic-guides" }, { "path": "/tutorials", "meta": { "navigation": { "order": 1, "depth": 1 }, "style": { "icon": "school", "color": "violet-70" } }, "name": "tutorials" }, { "path": "/updates", "meta": { "navigation": { "order": 7, "depth": 1 }, "style": { "icon": "campaign", "color": "green-70" } }, "name": "updates" }, { "path": "/reference-guides/api-reference", "meta": { "navigation": { "depth": 2, "parent": "reference-guides", "accordion": true } }, "name": "reference-guides-api-reference" }, { "path": "/tutorials/get-started", "meta": { "navigation": { "depth": 2, "parent": "tutorials" } }, "name": "tutorials-get-started" }, { "path": "/tutorials/self-driving-car-image-browser", "meta": { "navigation": { "depth": 2, "parent": "tutorials" }, "external": "https://github.com/streamlit/demo-self-driving" }, "name": "tutorials-self-driving-car-image-browser" }, { "path": "/reference-guides/api-reference/magic-commands", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands" }, { "path": "/reference-guides/api-reference/magic-commands%20copy", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%2010", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 10" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%2011", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 11" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%202", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 2" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%203", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 3" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%204", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 4" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%205", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 5" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%206", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 6" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%207", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 7" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%208", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 8" }, { "path": "/reference-guides/api-reference/magic-commands%20copy%209", "meta": { "navigation": { "depth": 3, "parent": "api-reference" } }, "name": "reference-guides-api-reference-magic-commands copy 9" }],
            topLevelPages: null,
            loading: true,
            depth: 1,
            offScreenNav: false,
        };

        this.checkExpanded = this.checkExpanded.bind(this);
        this.openOffScreenNav = this.openOffScreenNav.bind(this);
        this.closeOffScreenNav = this.closeOffScreenNav.bind(this);
        this.scrollToElement = this.scrollToElement.bind(this);
    }

    checkExpanded() {
        if (window.innerWidth < 1250 && window.innerWidth > 1024) {
            this.setState({ condensed: true })
        } else {
            this.setState({ condensed: false })
        }
    }

    openOffScreenNav() {
        if (this.state.condensed) {
            this.setState({ offScreenNav: true });
        }
    }

    scrollToElement(id) {
        if (this.state.condensed) {
            setTimeout(() => {
                const trigger = document.getElementById(`${id}`);
                const navItem = document.getElementById(`off-screen-${id}`);
                const header = document.getElementById('main-header');
                const topPos = navItem.offsetTop - trigger.offsetTop - header.offsetHeight;

                document.getElementById('off-screen-nav-container').scroll({
                    top: topPos,
                    behavior: 'smooth'
                })
            }, 500);
        }
    }

    closeOffScreenNav() {
        this.setState({ offScreenNav: false });
    }

    UNSAFE_componentWillMount() {
        this.setState({ routes: this.state.routes.filter(route => (route.name != 'index' && route.name != 'style-guide')) })
        this.setState({ topLevelPages: this.state.routes.filter(route => route.meta.navigation.depth == 1) })
    }

    componentDidMount() {
        window.addEventListener('resize', this.checkExpanded);
        this.checkExpanded();

        let sorted = this.state.topLevelPages.sort(function (a, b) {
            return a.meta.navigation.order - b.meta.navigation.order;
        })
        this.setState({ topLevelPages: sorted })

        this.setState({ loading: false })
    }

    render() {
        const state = this.state;

        let navItems;

        if (!state.loading) {
            navItems = state.topLevelPages.map((page, index) => (
                <NavItem
                    key={page.name}
                    page={page}
                    routes={state.routes}
                    depth={state.depth + 1}
                    scrollToElement={this.scrollToElement}
                />
            ))
        }

        let offScreenNavItems;

        if (!state.loading) {
            offScreenNavItems = state.topLevelPages.map((page, index) => (
                <NavItem
                    key={page.name}
                    page={page}
                    routes={state.routes}
                    depth={state.depth + 1}
                    offScreenNav={true}
                />
            ))
        }

        let offScreenNav = (
            <AnimatePresence>
                {state.offScreenNav &&
                    <motion.section
                        initial={{
                            opacity: 0,
                            left: '-40em'
                        }}
                        animate={{
                            opacity: 1,
                            left: 0,
                            transition: {
                                ease: "easeInOut",
                                duration: .01
                            }
                        }}
                        exit={{
                            opacity: 0,
                            left: '-40em'
                        }}
                        id="off-screen-nav"
                        onMouseLeave={this.closeOffScreenNav}
                    >
                        <Link href="/" >
                            <a className="brand not-link">
                                <img src="/logo.svg" alt="" />
                                <h4>Documentation</h4>
                            </a>
                        </Link>
                        <nav className="side-nav" id="off-screen-nav-container">
                            {offScreenNavItems}
                        </nav>
                    </motion.section >
                }
            </AnimatePresence>
        )

        let sideNav = (
            <section className="block-side-nav">
                <nav className={`side-nav ${state.condensed ? 'condensed' : 'expanded'}`} onMouseEnter={this.openOffScreenNav}>
                    {navItems}
                </nav>
                {offScreenNav}

            </section>
        )

        if (this.props.mobile) {
            sideNav = (
                <section className="block-side-nav mobile">
                    <nav className={`side-nav ${state.condensed ? 'condensed' : 'expanded'}`} onMouseEnter={this.openOffScreenNav}>
                        {navItems}
                    </nav>
                    {offScreenNav}

                </section>
            )
        }
        return sideNav
    }
}