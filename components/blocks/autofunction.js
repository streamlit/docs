import React from "react"
import MarkdownIt from "markdown-it"
import Table from "./table"

export default class Autofunction extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const props = this.props
        let func_obj
        let func_description
        let Markdown = new MarkdownIt()
        
        const rows = []

        if (props.function in props.streamlit) {
            func_obj = props.streamlit[props.function]
            if ( func_obj.description !== undefined && func_obj.description ) {
                func_description = Markdown.render( func_obj.description )   
            }
        } else {
            return ``;
        }

        for (const index in func_obj.args) {
            const row = {}
            const param = func_obj.args[ index ]
            const description = Markdown.render( param.description )

            if ( param.is_optional ) {
                row['title'] = `<p>${param.name} <span class='italic code'>(${param.type_name})</span></p>`
                row['body']  = `${description}`
            } else {
                row['title'] = `<p><span class='bold'>${param.name}</span> <span class='italic code'>(${param.type_name})</span></p>`
                row['body']  = `${description}`
            }
            
            rows.push(row)
        }

        return (
            <div class='code-function'>
                <p>streamlit.{func_obj.name}</p>
                {func_description}
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