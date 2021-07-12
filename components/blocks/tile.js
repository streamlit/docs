import React from "react";

import Link from 'next/link';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.handleTheme = this.handleTheme.bind(this);
        this.state = {
            theme: 'dark-mode'
        };
    }

    async componentDidMount() {
        window.addEventListener('ChangeTheme', this.handleTheme);
    }

    componentWillUnmount() {
        window.removeEventListener('ChangeTheme', this.handleTheme);
    }

    handleTheme() {
        this.setState({ theme: document.body.dataset.theme })
    }
    render() {
        const props = this.props
        const state = this.state
        let img;
        if (props.img) {
            img = (
                <img src={props.img} />
            )
        } else if (props.dark) {
            img = (
                <i className={`material-icons-sharp bg-${props.dark.background || 'l-blue-70'} color-${props.dark.color || "white"}`} style={{ transform: `rotate(${props.rotate || 0}deg)` }}>{props.icon || "downloading"}</i>
            )
        } else {
            img = (
                <i className={`material-icons-sharp bg-${props.background || 'l-blue-70'} color-${props.color || "white"}`} style={{ transform: `rotate(${props.rotate || 0}deg)` }}>{props.icon || "downloading"}</i>
            )
        }
        let block;
        if (props.dark && state.theme == 'dark-mode') {
            block = (
                <article className={`block-tile ${props.size || 'third'} bg-${props.dark.background || 'l-blue-70'} color-${props.dark.color || 'white'} border-${props.dark.border_color || 'transparent'}`}>
                    <Link href={props.link || "/"}>
                        <a className="not-link">
                            {img}
                            <section className="content">
                                <h4 className="title">{props.title || "Install Streamlit"}</h4>
                                <p className="small">{props.text || "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia."}</p>
                            </section>
                        </a>
                    </Link>
                </article >
            )
        } else {
            block = (
                <article className={`block-tile ${props.size || 'third'} bg-${props.background || 'l-blue-70'} color-${props.color || 'white'} border-${props.border_color || 'transparent'}`}>
                    {/* :className="dark && $colorMode.preference == 'dark' ? `${size} bg-${dark.background} color-${dark.color} border-${dark.border_color}` : `${size} bg-${background} color-${color} border-${border_color}`" */}
                    <Link href={props.link || "/"}>
                        <a className="not-link">
                            {img}
                            <section className="content">
                                <h4 className="title">{props.title || "Install Streamlit"}</h4>
                                <p className="small">{props.text || "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia."}</p>
                            </section>
                        </a>
                    </Link>
                </article >
            )

        }

        return block
    }
}