// import Navigation from 
import React from 'react';

import Link from 'next/link'
import dynamic from "next/dynamic";

import MobileNav from './mobileNav';


const ThemeToggle = dynamic(() => import("../utilities/themeToggle"), {
    ssr: false,
});
import Search from '../utilities/search';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            sticky: false,
            // window: 
        };
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({ windowWidth: window.innerWidth })
        // this.setState({ window: useWindowSize() })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let top = window.scrollY;
        (top > 20 ? this.setState({ sticky: true }) : this.setState({ sticky: false }))
    }

    render() {

        let mobileNav;
        if (this.state.windowWidth < 1024) {
            mobileNav = <MobileNav />
        }

        return (
            <header>
                <nav className={`container ${this.state.sticky ? "sticky" : ""}`} id="main-header">
                    {/* :class="{sticky: top > 20}"  */}
                    <Link href="/">
                        <a className="brand not-link">
                            <img src="/logo.svg" alt="" />
                            <h4>Documentation</h4>
                        </a>
                    </Link>
                    <section className="options">
                        <Search />
                        <ThemeToggle />
                        {mobileNav}
                        {/* <block-search />
                        <block-theme-toggle /> */}
                    </section>
                </nav>
                <h1>{this.state.sticky}</h1>
            </header>
        )
    }
}