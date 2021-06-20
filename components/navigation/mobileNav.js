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
                <AnimatePresence>
                    {this.state.nav &&
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
                            <button className="toggle-mobile" onClick={this.toggleMobileNav}>
                                <i>close</i>
                            </button>
                            <SideBar mobile={true} />
                        </motion.section >
                    }
                </AnimatePresence>
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