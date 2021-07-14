import React from "react";

import SideBar from "./sideNav";

import { AnimatePresence, motion } from 'framer-motion';

export default class MobileNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: false
        };
        this.toggleMobileNav = this.toggleMobileNav.bind(this);
    }

    toggleMobileNav() {
        this.setState({ nav: !this.state.nav });
        if (document.body.style.overflow == 'hidden') {
            document.body.style.overflow = 'unset'
        } else {
            document.body.style.overflow = 'hidden'
        }
    }

    render() {
        let mobileNav;
        if (this.state.nav) {
            mobileNav = (
                <SideBar mobile={true} />
            )
        } else {
            mobileNav = (
                <button className="toggle-mobile" onClick={this.toggleMobileNav}>
                    <i>menu</i>
                </button>
            )
        }

        return mobileNav;
    }
}