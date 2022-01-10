import Link from "next/link";

import PsaStyle from "./psa.module.css";

const Psa = () => {
  return (
    <section
      className={`
        flex items-center flex-wrap
        py-8 mt-16
        border-t border-b border-t-gray-30 border-b-gray-30 dark:border-b-gray-90 dark:border-t-gray-90
        ${PsaStyle.Container}
      `}
    >
      <i
        className="
          text-5xl
          mr-8
          dark:text-white
        "
      >
        forum
      </i>
      <article>
        <h3
          className="
            my-0
            font-bold text-2xl
            dark:text-white
          "
        >
          Still have questions?
        </h3>
        <p className="text-base tracking-tight dark:text-white">
          Our{" "}
          <a
            href="https://discuss.streamlit.io"
            target="_blank"
            className="
              border-b border-b-gray-90 dark:border-b-white
              hover:opacity-70 border-b-red-70
              dark:text-white
            "
          >
            forums
          </a>{" "}
          are full of helpful information and Streamlit experts.
        </p>
      </article>
    </section>
  );
};

export default Psa;
