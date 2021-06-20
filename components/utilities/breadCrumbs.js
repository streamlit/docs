import React from "react";

import Link from "next/link";
import { Breadcrumb } from "react-instantsearch-dom";

export default class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            breadcrumbs: [],
            loading: true
        }
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        let updateBreadcrumbs = new Array;
        let split = window.location.pathname.split('/')
        // console.log(split)
        split.forEach((item, index) => {
            // console.log(item)
            // console.log(index)
            if (index == 0) {
                let docs = {
                    link: window.location.origin,
                    title: 'Docs'
                }
                // this.setState({ breadcrumbs: [...this.state.breadcrumbs, docs] })
                updateBreadcrumbs.push(docs)
            } else if (index == split.length - 1) {
                let end = {
                    link: window.location.href,
                    title: this.formatedTitle(item)
                }
                // this.setState({ breadcrumbs: [...this.state.breadcrumbs, end] })
                updateBreadcrumbs.push(end)
            } else {
                let page = {
                    link: this.createLink(index, split),
                    title: this.formatedTitle(item)
                }
                // this.setState({ breadcrumbs: [...this.state.breadcrumbs, page] })
                updateBreadcrumbs.push(page)
            }
        });
        // this.updateState(updateBreadcrumbs);
        // console.log(this.state.breadcrumbs);
        this.setState({ breadcrumbs: updateBreadcrumbs });
        // this.setState({ breadcrumbs: 'test' });
        this.setState({ loading: false })
        // console.log(this.state.breadcrumbs)
    }

    updateState(updateBreadcrumbs) {
        // this.updateState(updateBreadcrumbs);
        console.log(updateBreadcrumbs)
        if (this.state.breadcrumbs != updateBreadcrumbs) {
            this.setState({ breadcrumbs: updateBreadcrumbs });
        }
        console.log(this.state.breadcrumbs)
        this.setState({ loading: false })
    }

    formatedTitle(title) {
        return title.replaceAll('-', ' ');
    };

    createLink(index, split) {
        let pathName = split.slice(0, index + 1).join('/')
        return window.location.origin + pathName;
    };

    createCrumb(crumb, index) {
        let formatedCrumb;
        if (index == this.state.breadcrumbs.length - 1) {
            formatedCrumb = (
                <Link href={crumb.link}>
                    <a className="not-link bold">{crumb.title}</a>
                </Link>
            )
        } else {
            formatedCrumb = (
                <Link href={crumb.link}>
                    <a className="not-link">{crumb.title} <span aria-hidden="true"> / </span></a>
                </Link>
            )
        }
        return formatedCrumb;
    }


    render() {
        let test;
        // console.log(this.state.breadcrumbs)
        if (!this.state.loading) {
            console.log(this.state.breadcrumbs)
            test = <h6>Testing</h6>
        }
        return (
            <nav className="breadcrumbs">
                {this.state.breadcrumbs.map((crumb, index) => (
                    <li key={`${crumb}-${index}`} className="small">
                        {this.createCrumb(crumb, index)}
                    </li>
                ))}
            </nav>
        )
    }
}