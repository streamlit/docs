import React from 'react';
import Header from '../navigation/header'
import Footer from '../navigation/footer'
import Button from '../blocks/button'


// export default class Header extends React.Component
export default class Layout extends React.Component {

    render() {
        const props = this.props;
        return (
            <main id="root" className="layout">
                <Header />
                {props.children}
                <Button link="/style-guide">All elements</Button>
                <Footer revision="84fad262" />
            </main>
        )
    }
}