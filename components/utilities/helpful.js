import React from "react";
import pull from "lodash/pull";

import SuggestEdits from "./suggestEdits";

import router, { withRouter } from 'next/router';

export default class Helpful extends React.Component {
    
    constructor(props) {
        super(props)
        this.formRef = React.createRef()

        this.handleStep = this.handleStep.bind(this)
        this.handleOther = this.handleOther.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.handleRouteChange = this.handleRouteChange.bind(this)
        this.handleImprovement = this.handleImprovement.bind(this)
        this.handleNoteChange = this.handleNoteChange.bind(this)

        this.state = {
            step: 0,
            other: false,
            helpful: true,
            improvements: [],
            notes: '',
            improvementsString: '',
            moreExamples: false,
            clearerSteps: false,
            moreInformation: false,
            other: false
        }
    }

    handleStep(newStep) {
        this.setState({ step: newStep })
        if (newStep == 1) {
            this.setState({ helpful: false })
        }
        if (newStep == 2) {
            this.submitForm()
        }
    }

    submitForm() {
        if (this.formRef && this.formRef.current) {
            const data = new FormData(this.formRef.current)
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(data).toString()
            })
        }
    }

    handleOther() {
        this.setState({ other: !this.state.other })
    }

    handleImprovement(event) {
        const improvements = this.state.improvements.slice()
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (value && !improvements.includes(name)) {
            improvements.push(name)
        }

        if (!value && improvements.includes(name)) {
            pull(improvements, name)
        }
    
        this.setState({ [name]: value });
        this.setState({ improvements: improvements });
        this.setState({ improvementsString: improvements.join(',') });
    }

    handleNoteChange(event) {
        this.setState({ notes: event.target.value });
    }
    
    handleRouteChange() {
        this.setState({ step: 0, helpful: true, improvements: [], improvementsString: '' })
    }
    
    componentDidMount() {
        router.events.on('routeChangeComplete', this.handleRouteChange)
    }

    render() {
        let slug = '/'
        const state = this.state
        const props = this.props
        if (props.slug) {
            slug = `/${props.slug.join('/')}`
        }

        let otherText;
        if (state.other) {
            otherText = <textarea name="other-text" onChange={this.handleNoteChange} value={this.state.notes} placeholder="Please let us know how we can improve this page (optional)" rows="4" />
        }

        let block;
        if (state.step == 0) {
            block = (
                <section className="helpful">
                    <p className="bold large">Was this page helpful?</p>
                    <section className="buttons">
                        <button onClick={() => this.handleStep(2)}><i>thumb_up</i> Yes</button>
                        <button onClick={() => this.handleStep(1)}> <i>thumb_down</i> No</button>
                    </section>
                </section >
            )
        }
        if (state.step == 1) {
            block = (
                <section className="improve">
                    <h4>How can we improve this page?</h4>
                    <p className="tiny italic">Select all that apply</p>
                    <div className="input-container">
                        <input onChange={this.handleImprovement} type="checkbox" id="moreExamples" name="moreExamples" checked={this.state.moreExamples} />
                        <label htmlFor="more-examples">More examples</label><br />
                    </div>
                    <div className="input-container">
                        <input onChange={this.handleImprovement} type="checkbox" id="clearerSteps" name="clearerSteps" checked={this.state.clearerSteps} />
                        <label htmlFor="clearerSteps">Clearer steps</label><br />
                    </div>
                    <div className="input-container">
                        <input onChange={this.handleImprovement} type="checkbox" id="moreInformation" name="moreInformation" checked={this.state.moreInformation} /> 
                        <label htmlFor="moreInformation">More information</label><br />
                    </div>
                    <div className="input-container">
                        <input onChange={this.handleImprovement} type="checkbox" id="other" name="other" checked={this.state.other} />
                        <label htmlFor="other">Other</label><br />
                    </div>
                    {otherText}
                    <button onClick={() => this.handleStep(2)}>Submit</button>
                </section >
            )
        }
        if (state.step == 2) {
            block = (
                <section>
                    <p className="bold large">Thank you for your feedback!</p>
                </section>
            )
        }

        return (
            <section className="block-helpful">
                <form name="helpful" method="POST" data-netlify="true" ref={this.formRef}  data-netlify-honeypot="bot-field">
                    <input type="hidden" name="form-name" value="helpful" />
                    <input type="hidden" name="url" value={slug} />
                    <input type="hidden" name="was_helpful" value={this.state.helpful} />
                    <input type="hidden" name="improvements" value={this.state.improvementsString} />
                    <input type="hidden" name="notes" value={this.state.notes} />
                    {block}
                </form>
                <SuggestEdits sourcefile={this.props.sourcefile} />
            </section>
        )
    }
}