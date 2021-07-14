// import Navigation from 
import React from 'react';

import Link from 'next/link'
import dynamic from "next/dynamic";

import MobileNav from './mobileNav';


const ThemeToggle = dynamic(() => import("../utilities/themeToggle"), { ssr: false, });

import Search from '../utilities/search';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            sticky: false,
        };
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }

    handleResize() {
        this.setState({ windowWidth: window.innerWidth })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('resize', this.handleResize)
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
            <header className={`${this.state.sticky ? "sticky" : ""}`}>
                <nav className="container" id="main-header">
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
                    </section>
                </nav>
                <h1>{this.state.sticky}</h1>
            </header>
        )
    }
}