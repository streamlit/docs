import React, { useState, useEffect, useRef } from "react";
import pull from "lodash/pull";
import router, { withRouter } from "next/router";

import helpfulStyles from "./helpful.module.css";

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
        className="
          resize-none
          block
          p-4
          rounded-md
          font-sans
          w-full max-w-md
        "
      />
    );
  }

  let block;
  if (step == 0) {
    block = (
      <section
        className="
          flex flex-col md:flex-row
          items-start md:items-center
        "
      >
        <p
          className="
            font-bold text-lg mb-0 tracking-tight
          "
        >
          Was this page helpful?
        </p>
        <section
          className="
            flex flex-row
            items-center
            pt-4 md:pt-0
          "
        >
          <button
            onClick={() => handleStep(2)}
            className="
              ml-0 md:ml-6 mb-0 py-2 px-3
              flex items-center
              bg-gray-10 dark:bg-gray-80
              text-gray-90 dark:text-white
              font-bold
              rounded-md
              border-none
              cursor-pointer
              hover:opacity-90 hover:scale-105 hover:shadow-lg
            "
          >
            <i className="text-base mr-2 dark:text-gray-90">thumb_up</i>
            Yes
          </button>
          <button
            onClick={() => handleStep(1)}
            className="
              ml-6 mb-0 py-2 px-3
              flex items-center
              bg-gray-10 dark:bg-gray-80
              text-gray-90 dark:text-white
              font-bold
              rounded-md
              border-none
              cursor-pointer
              hover:opacity-90 hover:scale-105 hover:shadow-lg
            "
          >
            {" "}
            <i className="text-base mr-2 dark:text-gray-90">thumb_down</i>
            No
          </button>
        </section>
      </section>
    );
  }
  if (step == 1) {
    block = (
      <section className="">
        <h4
          className="
            font-bold text-lg tracking-tight
            my-0
            text-gray-90
          "
        >
          How can we improve this page?
        </h4>
        <p
          className="
            text-xs tracking-tight italic
            mb-4
            text-gray-90
          "
        >
          Select all that apply
        </p>
        <div
          className="
            flex items-center
            mb-2
          "
        >
          <input
            className="
              w-4 h-4
              mr-2
              checked:bg-gray-90 dark:checked:bg-white
              appearance-none
              border border-gray-90 dark:border-white
              rounded-sm
              outline-0 bg-transparent
              cursor-pointer
            "
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="moreExamples"
            name="moreExamples"
            checked={feedback.moreExamples}
          />
          <label
            htmlFor="more-examples"
            className="
              font-sans 
              text-gray-90 dark:text-white
            "
          >
            More examples
          </label>
          <br />
        </div>
        <div
          className="
            flex items-center
            mb-2
          "
        >
          <input
            className="
              w-4 h-4
              mr-2
              checked:bg-gray-90 dark:checked:bg-white
              appearance-none
              border border-gray-90 dark:border-white
              rounded-sm
              outline-0 bg-transparent
              cursor-pointer
            "
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="clearerSteps"
            name="clearerSteps"
            checked={feedback.clearerSteps}
          />
          <label
            htmlFor="clearerSteps"
            className="
              font-sans 
              text-gray-90 dark:text-white
            "
          >
            Clearer steps
          </label>
          <br />
        </div>
        <div
          className="
            flex items-center
            mb-2
          "
        >
          <input
            className="
              w-4 h-4
              mr-2
              checked:bg-gray-90 dark:checked:bg-white
              appearance-none
              border border-gray-90 dark:border-white
              rounded-sm
              outline-0 bg-transparent
              cursor-pointer
            "
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="moreInformation"
            name="moreInformation"
            checked={feedback.moreInformation}
          />
          <label
            htmlFor="moreInformation"
            className="
              font-sans 
              text-gray-90 dark:text-white
            "
          >
            More information
          </label>
          <br />
        </div>
        <div
          className="
            flex items-center
            mb-2
          "
        >
          <input
            className="
              w-4 h-4
              mr-2
              checked:bg-gray-90 dark:checked:bg-white
              appearance-none
              border border-gray-90 dark:border-white
              rounded-sm
              outline-0 bg-transparent
              cursor-pointer
            "
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="other"
            name="other"
            checked={feedback.other}
          />
          <label
            htmlFor="other"
            className="
              font-sans 
              text-gray-90 dark:text-white
            "
          >
            Other
          </label>
          <br />
        </div>
        {otherText}
        <button
          onClick={() => handleStep(2)}
          className="
            inline-block
            mt-4 p-4
            hover:opacity-90 hover:scale-105 hover:shadow-lg
            bg-red-70 text-white
            font-bold
            cursor-pointer
            border-none
            rounded-md
          "
        >
          Submit
        </button>
      </section>
    );
  }
  if (step == 2) {
    block = (
      <section>
        <p className="font-bold text-lg mb-0 tracking-tight">
          Thank you for your feedback!
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        flex flex-col md:flex-row
        items-start md:items-center
        mt-16
      "
    >
      <form
        name="helpful"
        method="POST"
        data-netlify="true"
        ref={formRef}
        data-netlify-honeypot="bot-field"
        className={`
          flex-1
          ${helpfulStyles.Container}
        `}
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
