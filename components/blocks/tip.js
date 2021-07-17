import React from "react"

import IconHeader from '../blocks/iconHeader'

export default class Tip extends React.Component {
    constructor(props) {
        super(props);
        this.handleTheme = this.handleTheme.bind(this)
        this.state = {
            theme: 'light-mode'
        }
    }

    async componentDidMount() {
        window.addEventListener('ChangeTheme', this.handleTheme)
    }

    componentWillUnmount() {
        window.removeEventListener('ChangeTheme', this.handleTheme)
    }

    handleTheme() {
        this.setState({ theme: document.body.dataset.theme })
    }

    render() {
        const props = this.props
        const state = this.state

        let block;

        if (state.theme == 'dark-mode') {
            block = (
                <section className={`block-note bg-dark-violet color-white`}>
                    <IconHeader icon="star" rotate="0" title="Tip" background="violet-70" color="white" />
                    {props.children}
                </section>
            )
        } else {
            block = (
                <section className={`block-note bg-violet-10 color-gray-90`}>
                    <IconHeader icon="star" rotate="0" title="Tip" background="violet-70" color="white" />
                    {props.children}
                </section>
            )

        }

        return block
    }
}
