import React from "react"
import Table from "./table"

export default class Autofunction extends React.Component {
    constructor(props) {
        super(props)
    }

    Heading(props) {

    }

    render() {
        const props = this.props
        let func_obj
        let func_description
        let header

        const rows = []

        if (props.function in props.streamlit) {
            func_obj = props.streamlit[props.function]
            if ( func_obj.description !== undefined && func_obj.description ) {
                func_description = { __html: func_obj.description }
            }
        } else {
            return ``;
        }

        for (const index in func_obj.args) {
            const row = {}
            const param = func_obj.args[ index ]
            const description = param.description

            if ( param.is_optional ) {
                row['title'] = `<p>${param.name} <span class='italic code'>(${param.type_name})</span></p>`
                row['body']  = `${description}`
            } else {
                row['title'] = `<p><span class='bold'>${param.name}</span> <span class='italic code'>(${param.type_name})</span></p>`
                row['body']  = `${description}`
            }

            rows.push(row)
        }

        if ( props.hide_header !== undefined && props.hide_header ) {
            header = ''
        } else {
            header = (
                <div className='code-header'>
                    <h3>streamlit.{func_obj.name}</h3>
                    <div className="code-desc" dangerouslySetInnerHTML={func_description} />
                </div>
            )
        }

        return (
            <div className='autofunction'>
                {header}
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
                />
            </div>
        )
    }
}
