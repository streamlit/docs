import React from "react";

export default class Note extends React.Component {
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
        let block;
        if (props.dark && state.theme == 'dark-mode') {
            block = (
                <section className={`block-note bg-${props.dark.background} color-${props.dark.color}`}>
                    {props.children}
                </section>
            )
        } else {
            block = (
                <section className={`block-note bg-${props.background} color-${props.color}`}>
                    {props.children}
                </section>
            )

        }

        return block
    }
}