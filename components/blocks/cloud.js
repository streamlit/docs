import React from "react";

const Cloud = ({ src, height }) => {
  let CloudBlock;

  if (height) {
    CloudBlock = (
      <section className="block-cloud">
        <section className="cloud-app">
          <iframe
            loading="lazy"
            src={`${src}&embed=true`}
            height={height}
            width={`100%`}
          ></iframe>
        </section>
        <section>
          <sup>
            <a href={src} target="_blank">
              (view standalone Streamlit app)
            </a>
          </sup>
        </section>
      </section>
    );
  } else {
    CloudBlock = (
      <section className="block-cloud">
        <section className="cloud-app">
          <iframe
            loading="lazy"
            src={`${src}&embed=true`}
            height={`200rem`}
            width={`100%`}
          ></iframe>
        </section>
        <section>
          <sup>
            <a href={src} target="_blank">
              (view standalone Streamlit app)
            </a>
          </sup>
        </section>
      </section>
    );
  }
  return CloudBlock;
};

export default Cloud;
