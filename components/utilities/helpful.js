import React, { useState, useEffect, useRef } from "react";
import pull from "lodash/pull";
import router, { withRouter } from "next/router";

import SuggestEdits from "./suggestEdits";

const Helpful = ({ slug, sourcefile }) => {
  const formRef = useRef();
  const [step, setStep] = useState(0);
  const [isHelpful, setIsHelpful] = useState(true);
  const [feedback, setFeedback] = useState({
    other: false,
    improvements: [],
    notes: "",
    improvementsString: "",
    moreExamples: false,
    clearerSteps: false,
    moreInformation: false,
    other: false,
  });

  const handleStep = (newStep) => {
    setStep(newStep);
    if (newStep == 1) {
      setStep(1);
      setIsHelpful(false);
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
    setFeedback({ ...feedback, other: !feedback.other });
  };

  const handleImprovement = (e) => {
    const improvements = feedback.improvements.slice();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (value && !improvements.includes(name)) {
      improvements.push(name);
    }

    if (!value && improvements.includes(name)) {
      pull(improvements, name);
    }

    setFeedback({
      ...feedback,
      [name]: value,
      improvements,
      improvementsString: improvements.join(","),
    });
  };

  const handleNoteChange = (event) => {
    setFeedback({ ...feedback, notes: event.target.value });
  };

  const handleRouteChange = () => {
    setFeedback({
      ...feedback,
      improvements: [],
      improvementsString: "",
    });
    setStep(0);
    setIsHelpful(true);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
  });

  let joinedSlug = "/";
  if (slug) {
    joinedSlug = `/${slug.join("/")}`;
  }

  let otherText;
  if (feedback.other) {
    otherText = (
      <textarea
        name="other-text"
        onChange={handleNoteChange}
        value={feedback.notes}
        placeholder="Please let us know how we can improve this page (optional)"
        rows="4"
      />
    );
  }

  let block;
  if (step == 0) {
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
  if (step == 1) {
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
            checked={feedback.moreExamples}
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
            checked={feedback.clearerSteps}
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
            checked={feedback.moreInformation}
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
            checked={feedback.other}
          />
          <label htmlFor="other">Other</label>
          <br />
        </div>
        {otherText}
        <button onClick={() => handleStep(2)}>Submit</button>
      </section>
    );
  }
  if (step == 2) {
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
        <input type="hidden" name="was_helpful" value={isHelpful} />
        <input
          type="hidden"
          name="improvements"
          value={feedback.improvementsString}
        />
        <input type="hidden" name="notes" value={feedback.notes} />
        {block}
      </form>
      <SuggestEdits sourcefile={sourcefile ? sourcefile : ""} />
    </section>
  );
};

export default Helpful;
