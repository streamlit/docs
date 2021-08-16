import reverse from 'lodash/reverse'
import React from "react"
import Table from "./table"
import { H2 } from './headers'
import Warning from "./warning"

import { withRouter } from 'next/router'

import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'

function cleanHref(name) {
    return String(name).replace('.', '').replace(' ', '-')
}

class Autofunction extends React.Component {

    constructor(props) {
        super(props)
        this.highlighted = false
        this.blockRef = React.createRef()
        this.handleSelectVersion = this.handleSelectVersion.bind(this)
        const versions = props.versions
        const current_version = props.version ? props.version : versions[versions.length - 1]
        this.state = { current_version: current_version, max_version: versions[versions.length - 1], function: props.function };
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

    handleSelectVersion(event) {
        const props = this.props
        
        const func_obj = props.streamlit[props.function]
        const name = cleanHref(`st.${func_obj.name}`)
        const slug = props.slug.slice()
        
        if ( event.target.value  !== this.state.current_version) {
            this.setState( { current_version: event.target.value } );
            if (event.target.value !== this.state.max_version) {
                let isnum = /^[\d\.]+$/.test(slug[0])
                if (isnum) {
                    slug[0] = event.target.value
                } else {
                    slug.unshift( event.target.value )
                }
            }
        }

        props.router.push(`/${slug.join('/')}#${name}`)
    }

    render() {

        const props = this.props

        const footers = []
        const rows = []
        const versions = props.versions
        const current_version = props.version ? props.version : versions[versions.length - 1]
        const version_list = reverse(props.versions.slice())

        let func_obj
        let func_description
        let header
        let body

        if (props.function in props.streamlit) {
            func_obj = props.streamlit[props.function]
            if (func_obj.description !== undefined && func_obj.description) {
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


        if (props.hide_header !== undefined && props.hide_header) {
            header = ''
        } else {
            let name = `st.${func_obj.name}`
            let selectClass = current_version !== version_list[0] ? 'version-select old-version' : 'version-select'
            header = (
                <div className='code-header'>
                    <div className='title-with-select'>
                        <H2>{name}</H2>
                        <form className={selectClass}>
                            <label>
                                <span className='sr-only'>Streamlit Version</span>
                                <select value={this.state.current_version} onChange={this.handleSelectVersion}>
                                    {version_list.map((version, index) => {
                                        return ( <option value={version} key={version}>v{version}</option> )
                                    })}
                                </select>
                            </label>
                        </form>
                    </div>
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
            const param = func_obj.args[index]
            const description = param.description ? param.description : `<p>No description</p>`

            if (param.is_optional) {
                row['title'] = `<p>${param.name} <span class='italic code'>(${param.type_name})</span></p>`
                row['body'] = `${description}`
            } else {
                row['title'] = `<p><span class='bold'>${param.name}</span> <span class='italic code'>(${param.type_name})</span></p>`
                row['body'] = `${description}`
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
            <section className='autofunction' ref={this.blockRef}>
                {header}
                {body}
            </section>
        )
    }
}

export default withRouter(Autofunction)