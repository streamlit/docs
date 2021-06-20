import React, { Children, useEffect } from "react"

import Prism from 'prismjs'
import "prismjs/components/prism-jsx";
// import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

import Image from "./image";

export default class Code extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sticky: false
        };
    }
    componentDidMount() {
        Prism.highlightAll();
    }


    render() {
        const props = this.props;
        let ConditionalRendering;
        if (props.img) {
            ConditionalRendering = (
                <section className="block-code">
                    <Image src={props.img} clean={true} />
                    <pre><code className={`language-${props.language} line-numbers`}>{props.code}</code></pre>
                </section>
            )
        } else if (props.lines) {
            ConditionalRendering = (
                <section className="block-code line-highlight">
                    <pre data-line={props.lines}><code className={`language-${props.language} line-numbers`}>{props.code}</code></pre>
                </section>
            )
        } else {
            ConditionalRendering = (
                <section className="block-code">
                    <pre><code className={`language-${props.language} line-numbers`}>{props.code}</code></pre>
                </section>
            )
        }

        return ConditionalRendering
    }
}