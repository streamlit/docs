import React from "react";
import bus from '../../lib/bus'

import NavItem from '../navigation/navItem'

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            condensed: false,
            loading: true,
            depth: 1,
            sticky: false,
            over: false,
            open: false,
            theme: 'light-mode',
            menu: props.menu
        };

        this.checkExpanded = this.checkExpanded.bind(this)
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleTheme = this.handleTheme.bind(this)
    }

    handleTheme() {
        this.setState({ theme: document.body.dataset.theme })
    }

    handleScroll() {
        let top = window.scrollY;
        (top > 20 ? this.setState({ sticky: true }) : this.setState({ sticky: false }))
    }

    handleMouseEnter() {
        if (window.innerWidth < 1250 && window.innerWidth > 1024) {
            this.setState({ condensed: false })
            this.setState({ over: true })
        }
    }

    handleMouseLeave() {
        if (window.innerWidth < 1250 && window.innerWidth > 1024) {
            this.setState({ condensed: true })
            this.setState({ over: false })
        }
    }

    checkExpanded() {
        if (window.innerWidth < 1250 && window.innerWidth > 1024) {
            this.setState({ condensed: true })
        } else {
            this.setState({ condensed: false })
        }
    }

    componentDidMount() {

        window.addEventListener('resize', this.checkExpanded)
        window.addEventListener('ChangeTheme', this.handleTheme)

        bus.on('streamlit_nav_open', () => this.setState({ open: true }) )
        bus.on('streamlit_nav_closed', () => this.setState({ open: false }) )

        this.checkExpanded()
    }

    componentWillUnmount() {
        window.removeEventListener('ChangeTheme', this.handleTheme);
    }

    render() {
        const props = this.props
        const state = this.state
        let navItems

        navItems = props.menu.map((page, index) => (
            <NavItem
                key={page.name}
                page={page}
                depth={page.depth + 1}
            />
        ))

        let sideNav = (
            <section className={`block-side-nav ${state.open ? 'open' : ''} ${state.over ? 'over' : ''} ${state.theme}`}>
                <nav className={`side-nav ${state.condensed ? 'condensed' : 'expanded'}`} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    {navItems}
                </nav>
            </section>
        )

        return sideNav
    }
}
