import sortBy from "lodash/sortBy"
import orderBy from "lodash/orderBy"
import React from "react"
import Table from "./table"
import { H2 } from './headers'
import Warning from "./warning"

import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import { version } from "nprogress"

export default class Autofunction extends React.Component {
    
    constructor(props) {
        super(props)
        this.highlighted = false
        this.blockRef = React.createRef()
    }

    Heading(props) {

    }

    componentDidMount() {
        this.highlightWithPrism()
    }

    highlightWithPrism() {
        if (this.highlighted) { return }
        if (!this.blockRef.current) { return }
            
        const pres = Array.prototype.slice.call(this.blockRef.current.getElementsByTagName('pre'))

        pres.forEach((ele) => {
            const codeText = ele.innerHTML
            const preTag = ele.cloneNode(true)
            const codeWrap = document.createElement('div')
            codeWrap.setAttribute('class', 'block-code')
            const codeTag = document.createElement('code')
            codeTag.setAttribute('class', 'language-python')
            preTag.classList.add('line-numbers')
            codeTag.innerHTML = codeText
            preTag.textContent = null
            preTag.appendChild(codeTag)
            codeWrap.appendChild(preTag)
            ele.replaceWith(codeWrap)
        })

        Prism.highlightAllUnder(this.blockRef.current)

        this.highlighted = true
    }

    render() {
        
        const props = this.props
                
        const footers = []
        const rows = []
        const versions = props.versions
        const current_version = props.version ? props.version : versions[versions.length-1]
        const version_list = props.versions

        let func_obj
        let func_description
        let header
        let body

        if (props.function in props.streamlit) {
            func_obj = props.streamlit[props.function]
            if ( func_obj.description !== undefined && func_obj.description ) {
                func_description = { __html: func_obj.description }
            }
        } else {
            return (
                <div className='autofunction' ref={this.blockRef}>
                    <div className='code-header'>
                        <H2>{props.function}</H2>
                    </div>
                    <Warning>
                        <p>This method did not exist in version <code>{current_version}</code> of Streamlit.</p>
                    </Warning>
                </div>
            )
        }


        if ( props.hide_header !== undefined && props.hide_header ) {
            header = ''
        } else {
            header = (
                <div className='code-header'>
                    <H2>st.{func_obj.name}</H2>
                    <div className='code-desc' dangerouslySetInnerHTML={func_description} />
                </div>
            )
        }

        if ('example' in func_obj) {
            footers.push({ 'title': 'Example', 'body': func_obj.example })
        }

        if ('examples' in func_obj) {
            footers.push({ 'title': 'Examples', 'body': func_obj.examples })
        }

        if ('notes' in func_obj) {
            footers.push({ 'title': 'Notes', 'body': func_obj.notes })
        }

        if ('warning' in func_obj) {
            footers.push({ 'title': 'Warning', 'body': func_obj.warning })
        }

        for (const index in func_obj.args) {
            const row = {}
            const param = func_obj.args[ index ]
            const description = param.description ? param.description : `<p>No description</p>`

            if ( param.is_optional ) {
                row['title'] = `<p>${param.name} <span class='italic code'>(${param.type_name})</span></p>`
                row['body']  = `${description}`
            } else {
                row['title'] = `<p><span class='bold'>${param.name}</span> <span class='italic code'>(${param.type_name})</span></p>`
                row['body']  = `${description}`
            }

            rows.push(row)
        }

        if (rows.length) {
            body = (
                <Table
                    head={{
                        title: 'Function signature',
                        content: `<p class='code'>${func_obj.signature}</p>`
                    }}
                    body={{
                        title: 'Parameters'
                    }}
                    rows={rows}
                    addtionalClass='full-width'
                    footers={footers}
                />
            )
        } else {
            body = (
                <Table
                    head={{
                        title: 'Function signature',
                        content: `<p class='code'>${func_obj.signature}</p>`
                    }}
                    addtionalClass='full-width'
                    footers={footers}
                />
            )
        }

        return (            
            <div className='autofunction' ref={this.blockRef}>
                {header}
                {body}
            </div>
        )
    }
}
