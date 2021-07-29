import React from "react";

export default class FloatingNav extends React.Component {
    
    constructor(props) {
        super(props)
        this.handleTheme = this.handleTheme.bind(this)
        this.state = {
            target: false
        }
    }
    
    handleTheme() {
        this.setState({ theme: document.body.dataset.theme })
    }

    render() {
        const props = this.props

        return (
            <div className='toc'>
                <ol className='toc-level'>
                    {props.menu.map((item, index) => (
                        <li className='level-1'><a>{item.title}</a></li>
                    ))}
                </ol>
            </div>
        )
    }
}