import React from "react";

import Note from "./note";
import Button from './button'
import Image from "./image";

export default class NoteSplit extends React.Component {
    constructor(props) {
        super(props);
        this.handleTheme = this.handleTheme.bind(this);
        this.state = {
            theme: 'light-mode'
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
        let block = (
            <section className="block-note-split">
                <Note background={props.background}>
                    <section className="content">
                        <h2>{props.title}</h2>
                        <p>{props.copy}</p>
                        <Button link={props.button.link}>{props.button.text}</Button>
                    </section>
                    <Image src="/join.png" clean={true} />
                </Note>
            </section >
        );

        return block
    }
}