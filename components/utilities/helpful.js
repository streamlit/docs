import React, { useState, useEffect, useRef } from "react";
import pull from "lodash/pull";
import router, { withRouter } from "next/router";

import styles from "./helpful.module.css";

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

  // Perform the route change cleanup function for the Helpful component inside a useEffect call,
  // instead of using router.events.on("routeChangeComplete", handleRouteChange), because that
  // adds new events progressively as you keep browsing the website, thus eventually leading to a memory leak.
  useEffect(() => {
    return () => {
      handleRouteChange();
    };
  }, [sourcefile]);

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
        className={styles.Textarea}
      />
    );
  }

  let block;
  if (step == 0) {
    block = (
      <section className={styles.Container}>
        <p className={styles.Title}>Was this page helpful?</p>
        <section className={styles.CtaContainer}>
          <button onClick={() => handleStep(2)} className={styles.Button}>
            <i className={styles.Icon}>thumb_up</i>
            Yes
          </button>
          <button onClick={() => handleStep(1)} className={styles.Button}>
            {" "}
            <i className={styles.Icon}>thumb_down</i>
            No
          </button>
        </section>
      </section>
    );
  }
  if (step == 1) {
    block = (
      <section>
        <h4 className={styles.ImproveTitle}>How can we improve this page?</h4>
        <p className={styles.ImproveText}>Select all that apply</p>
        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="moreExamples"
            name="moreExamples"
            checked={feedback.moreExamples}
          />
          <label htmlFor="more-examples" className={styles.Label}>
            More examples
          </label>
          <br />
        </div>
        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="clearerSteps"
            name="clearerSteps"
            checked={feedback.clearerSteps}
          />
          <label htmlFor="clearerSteps" className={styles.Label}>
            Clearer steps
          </label>
          <br />
        </div>
        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="moreInformation"
            name="moreInformation"
            checked={feedback.moreInformation}
          />
          <label htmlFor="moreInformation" className={styles.Label}>
            More information
          </label>
          <br />
        </div>
        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="other"
            name="other"
            checked={feedback.other}
          />
          <label htmlFor="other" className={styles.Label}>
            Other
          </label>
          <br />
        </div>
        {otherText}
        <button onClick={() => handleStep(2)} className={styles.SubmitCTA}>
          Submit
        </button>
      </section>
    );
  }
  if (step == 2) {
    block = (
      <section>
        <p className={styles.Title}>Thank you for your feedback!</p>
      </section>
    );
  }

  return (
    <section className={styles.FormContainer}>
      <form
        name="helpful"
        method="POST"
        data-netlify="true"
        ref={formRef}
        data-netlify-honeypot="bot-field"
        className={styles.Form}
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
