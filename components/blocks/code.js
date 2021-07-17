import React, { Children, useEffect } from "react"

import Prism from 'prismjs'
import "prismjs/components/prism-jsx"
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-toml'
import 'prismjs/components/prism-bash'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'

import Image from "./image";

export default class Code extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sticky: false,
        };
    }

    componentDidMount() {
        if (!window.initial.prism) {
            window.initial.prism = true;
            Prism.highlightAll();
        }
    }
    componentWillUnmount() {
        window.initial.prism = false;
    }

    render() {

        const props = this.props

        let ConditionalRendering
        let code = props.code !== undefined ? props.code : props.children
        let languageClass = `language-${props.language}`

        if (props.children !== undefined && props.children.props !== undefined) {
            code = props.children.props.children
            languageClass = props.children.props.className
        }

        if (props.img) {
            ConditionalRendering = (
                <section className="block-code">
                    <Image src={props.img} clean={true} />
                    <pre><code className={`${languageClass} line-numbers`}>{code}</code></pre>
                </section>
            )
        }
        else if (props.lines) {
            ConditionalRendering = (
                <section className="block-code line-highlight">
                    <pre data-line={props.lines}><code className={`${languageClass} line-numbers`}>{code}</code></pre>
                </section>
            )
        }
        else {
            ConditionalRendering = (
                <section className="block-code">
                    <pre><code className={`${languageClass} line-numbers`}>{code}</code></pre>
                </section>
            )
        }

        return ConditionalRendering
    }
}