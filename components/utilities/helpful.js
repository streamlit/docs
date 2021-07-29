import React from "react";

export default class Helpful extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef()
        this.handleStep = this.handleStep.bind(this)
        this.handleOther = this.handleOther.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.state = {
            step: 0,
            other: false
        }
    }

    handleStep(newStep) {
        this.setState({ step: newStep })
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

    render() {
        const state = this.state
        const props = this.props
        const slug = `/${props.slug.join('/')}`

        let otherText;
        if (state.other) {
            otherText = <textarea name="other-text" placeholder="Please let us know how we can improve this page (optional)" rows="4" />
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
                        <input type="checkbox" id="more-examples" name="more-examples" value="more-examples" />
                        <label htmlFor="more-examples">More examples</label><br />
                    </div>
                    <div className="input-container">
                        <input type="checkbox" id="clearer-steps" name="clearer-steps" value="clearer-steps" />
                        <label htmlFor="clearer-steps">Clearer steps</label><br />
                    </div>
                    <div className="input-container">
                        <input type="checkbox" id="more-information" name="more-information" value="more-information" />
                        <label htmlFor="more-information">More information</label><br />
                    </div>
                    <div className="input-container">
                        <input onClick={this.handleOther} type="checkbox" id="other" name="other" value="other" />
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
                <form name="helpful" method="POST" ref={this.formRef}>
                    <input type="hidden" name="form-name" value="wasThisPageHelpful" />
                    <input type="hidden" name="url" value={slug} />
                    {block}
                </form>
            </section>
        )
    }
}