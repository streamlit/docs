import React from 'react'
import Layout from '../../components/layouts/globalTemplate'

import SideBar from '../../components/navigation/sideNav'

import BreadCrumbs from '../../components/utilities/breadCrumbs'
import FloatingNav from '../../components/utilities/floatingNav'
import QuickLink from '../../components/utilities/quickLink'

export default class ReferenceGuides extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({ location: window.location.pathname })
        this.setState({ loading: false })
    }
    render() {
        let breadCrumbsOnLoad;
        if (!this.state.loading) {
            breadCrumbsOnLoad = <BreadCrumbs location={this.state.location} />
        }

        return (
            <Layout>
                <section className="page container template-standard">
                    <SideBar />
                    <section className="content wide">
                        {breadCrumbsOnLoad}
                        <QuickLink><h1>Reference Guides</h1></QuickLink>
                        <p>The easiest way to learn how to use Streamlit is to try things out yourself. As you read through this guide, test each method. As long as your app is running, every time you add a new element to your script and save, Streamlit’s UI will ask if you’d like to rerun the app and view the changes. This allows you to work in a fast interactive loop: you write some code, save it, review the output, write some more, and so on, until you’re happy with the results. The goal is to use Streamlit to create an interactive app for your data or model and along the way to use Streamlit to review, debug, perfect, and share your code.</p>
                    </section>
                    <FloatingNav />
                </section>
            </Layout >
        )
    }
}
