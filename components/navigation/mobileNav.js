import React from "react"
import bus from '../../lib/bus'
import router, { withRouter } from 'next/router'


export default class MobileNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: false
        };
        this.toggleMobileNav = this.toggleMobileNav.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    toggleMobileNav() {
        bus.emit( this.state.nav ? 'streamlit_nav_closed'  : 'streamlit_nav_open')
        if ( this.state.nav ) {
            document.documentElement.classList.remove( 'nav-open' )
        } else {
            document.documentElement.classList.add( 'nav-open' )
        }
        this.setState({ nav: !this.state.nav })
    }
    
    handleRouteChange() {
        if (this.state.nav) {
            bus.emit( this.state.nav ? 'streamlit_nav_closed'  : 'streamlit_nav_open')
            if ( this.state.nav ) {
                document.documentElement.classList.remove( 'nav-open' )
            } else {
                document.documentElement.classList.add( 'nav-open' )
            }
            this.setState({ nav: false })
        }
    }

    componentDidMount() {
        router.events.on('routeChangeComplete', this.handleRouteChange)
    }

    render() {
        let mobileNav;
        
        mobileNav = (
            <button className="toggle-mobile" onClick={this.toggleMobileNav}>
                <i>menu</i>
            </button>
        )
        
        return mobileNav;
    }
}