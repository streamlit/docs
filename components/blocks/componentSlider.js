import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./componentSlider.module.css";

const Arrow = ({ onClick, type }) => {
  return (
    <button className={styles.Arrow} onClick={onClick}>
      {type === "next" ? "->" : "<-"}
    </button>
  );
};

const ComponentSlider = ({ children }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [shouldArrowsBeVisible, setShouldArrowsBeVisible] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    sliderRef.current?.props.children.length > 3
      ? setShouldArrowsBeVisible(true)
      : setShouldArrowsBeVisible(false);
  }, [sliderRef]);

  const sliderSettings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className={styles.SectionContainer}>
      <div className={styles.TitleContainer}>
        <div className={styles.Title}>
          <p className={styles.Text}>Third-party components</p>
          <button
            className={styles.TooltipIcon}
            onClick={() => setTooltipOpen(!tooltipOpen)}
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.14563 12.4906H8.85437V7.71594H7.14563V12.4906ZM8 6.24157C8.24872 6.24157 8.4572 6.15744 8.62545 5.9892C8.79369 5.82095 8.87782 5.61247 8.87782 5.36375C8.87782 5.11503 8.79369 4.90655 8.62545 4.73831C8.4572 4.57006 8.24872 4.48594 8 4.48594C7.75128 4.48594 7.5428 4.57006 7.37455 4.73831C7.20631 4.90655 7.12218 5.11503 7.12218 5.36375C7.12218 5.61247 7.20631 5.82095 7.37455 5.9892C7.5428 6.15744 7.75128 6.24157 8 6.24157ZM8 16.5C6.89038 16.5 5.84925 16.2901 4.87659 15.8704C3.90394 15.4507 3.05786 14.8811 2.33837 14.1616C1.61887 13.4421 1.04927 12.5961 0.629562 11.6234C0.209854 10.6508 0 9.60962 0 8.5C0 7.39038 0.209854 6.34925 0.629562 5.37659C1.04927 4.40394 1.61887 3.55786 2.33837 2.83837C3.05786 2.11887 3.90394 1.54927 4.87659 1.12956C5.84925 0.709854 6.89038 0.5 8 0.5C9.10962 0.5 10.1508 0.709854 11.1234 1.12956C12.0961 1.54927 12.9421 2.11887 13.6616 2.83837C14.3811 3.55786 14.9507 4.40394 15.3704 5.37659C15.7901 6.34925 16 7.39038 16 8.5C16 9.60962 15.7901 10.6508 15.3704 11.6234C14.9507 12.5961 14.3811 13.4421 13.6616 14.1616C12.9421 14.8811 12.0961 15.4507 11.1234 15.8704C10.1508 16.2901 9.10962 16.5 8 16.5ZM8 14.7162C9.73857 14.7162 11.2093 14.1148 12.4121 12.9121C13.6148 11.7093 14.2162 10.2386 14.2162 8.5C14.2162 6.76143 13.6148 5.29075 12.4121 4.08795C11.2093 2.88516 9.73857 2.28376 8 2.28376C6.26143 2.28376 4.79075 2.88516 3.58795 4.08795C2.38516 5.29075 1.78376 6.76143 1.78376 8.5C1.78376 10.2386 2.38516 11.7093 3.58795 12.9121C4.79075 14.1148 6.26143 14.7162 8 14.7162Z" />
            </svg>
          </button>
          <div
            className={classNames(styles.Tooltip, tooltipOpen && styles.Open)}
          >
            <p className={styles.TooltipText}>
              These are featured components created by our lovely community. If
              you don't see what you're looking for, check out our{" "}
              <a
                href="https://components.streamlit.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Components Hub app
              </a>{" "}
              and{" "}
              <a
                href="https://extras.streamlit.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Streamlit Extras
              </a>{" "}
              for more examples and inspiration!
            </p>
            <span
              className={classNames(
                "transform rotate-45",
                styles.TooltipArrow,
                tooltipOpen && styles.Open
              )}
            />
          </div>
        </div>
        {shouldArrowsBeVisible && (
          <ul className={styles.ArrowsContainer}>
            <li>
              <Arrow
                type="prev"
                onClick={() => sliderRef.current.slickPrev()}
              />
            </li>
            <li>
              <Arrow
                type="next"
                onClick={() => sliderRef.current.slickNext()}
              />
            </li>
          </ul>
        )}
      </div>
      <Slider ref={sliderRef} {...sliderSettings} className={styles.Container}>
        {children}
      </Slider>
    </section>
  );
};

export default ComponentSlider;
