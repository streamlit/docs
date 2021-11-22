import React, { useState, useEffect, useRef } from "react";
import pull from "lodash/pull";
import router, { withRouter } from "next/router";

import SuggestEdits from "./suggestEdits";

const Helpful = ({ slug, sourcefile }) => {
  const formRef = useRef();
  const [state, setState] = useState({
    step: 0,
    other: false,
    helpful: true,
    improvements: [],
    notes: "",
    improvementsString: "",
    moreExamples: false,
    clearerSteps: false,
    moreInformation: false,
    other: false,
  });

  const handleStep = (newStep) => {
    setState({ ...state, step: newStep });
    if (newStep == 1) {
      setState({ ...state, step: 1, helpful: false });
    }
    if (newStep == 2) {
      submitForm();
    }
  };

  const submitForm = () => {
    if (formRef && formRef.current) {
      const data = new FormData(formRef.current);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
    }
  };

  const handleOther = () => {
    setState({ ...state, other: !state.other });
  };

  const handleImprovement = (e) => {
    const improvements = state.improvements.slice();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (value && !improvements.includes(name)) {
      improvements.push(name);
    }

    if (!value && improvements.includes(name)) {
      pull(improvements, name);
    }

    setState({
      ...state,
      [name]: value,
      improvements,
      improvementsString: improvements.join(","),
    });
  };

  const handleNoteChange = (event) => {
    setState({ ...state, notes: event.target.value });
  };

  const handleRouteChange = () => {
    setState({
      ...state,
      step: 0,
      helpful: true,
      improvements: [],
      improvementsString: "",
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
  });

  let joinedSlug = "/";
  if (slug) {
    joinedSlug = `/${slug.join("/")}`;
  }

  let otherText;
  if (state.other) {
    otherText = (
      <textarea
        name="other-text"
        onChange={handleNoteChange}
        value={state.notes}
        placeholder="Please let us know how we can improve this page (optional)"
        rows="4"
      />
    );
  }

  let block;
  if (state.step == 0) {
    block = (
      <section className="helpful">
        <p className="bold large">Was this page helpful?</p>
        <section className="buttons">
          <button onClick={() => handleStep(2)}>
            <i>thumb_up</i> Yes
          </button>
          <button onClick={() => handleStep(1)}>
            {" "}
            <i>thumb_down</i> No
          </button>
        </section>
      </section>
    );
  }
  if (state.step == 1) {
    block = (
      <section className="improve">
        <h4>How can we improve this page?</h4>
        <p className="tiny italic">Select all that apply</p>
        <div className="input-container">
          <input
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="moreExamples"
            name="moreExamples"
            checked={state.moreExamples}
          />
          <label htmlFor="more-examples">More examples</label>
          <br />
        </div>
        <div className="input-container">
          <input
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="clearerSteps"
            name="clearerSteps"
            checked={state.clearerSteps}
          />
          <label htmlFor="clearerSteps">Clearer steps</label>
          <br />
        </div>
        <div className="input-container">
          <input
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="moreInformation"
            name="moreInformation"
            checked={state.moreInformation}
          />
          <label htmlFor="moreInformation">More information</label>
          <br />
        </div>
        <div className="input-container">
          <input
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="other"
            name="other"
            checked={state.other}
          />
          <label htmlFor="other">Other</label>
          <br />
        </div>
        {otherText}
        <button onClick={() => handleStep(2)}>Submit</button>
      </section>
    );
  }
  if (state.step == 2) {
    block = (
      <section>
        <p className="bold large">Thank you for your feedback!</p>
      </section>
    );
  }

  return (
    <section className="block-helpful">
      <form
        name="helpful"
        method="POST"
        data-netlify="true"
        ref={formRef}
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="helpful" />
        <input type="hidden" name="url" value={joinedSlug} />
        <input type="hidden" name="was_helpful" value={state.helpful} />
        <input
          type="hidden"
          name="improvements"
          value={state.improvementsString}
        />
        <input type="hidden" name="notes" value={state.notes} />
        {block}
      </form>
      <SuggestEdits sourcefile={sourcefile ? sourcefile : ""} />
    </section>
  );
};

export default Helpful;
