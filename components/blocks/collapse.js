import React, { useState } from "react";
import styles from "./collapse.module.css";
import classNames from "classnames";

const Collapse = ({ title, children }) => {
  const [show, setShow] = useState(false);

  return (
    <section className="py-2">
      <div className="collapse_container border rounded">
        <div className="py-2 cursor-pointer" onClick={() => setShow(!show)}>
          <summary className="flex text-[18px] pl-2 font-abold hover:opacity-60 py-2">
            {show ? (
              <i className="rotate-90 duration-100 text-xxl fill-gray-90 self-center pr-[0.2rem]">
                chevron_right
              </i>
            ) : (
              <i className="fill-gray-90 self-center">chevron_right</i>
            )}
            {title}
          </summary>
        </div>
        {show && (
          <div className="pl-6 pb-2 flex">
            <section
              className={classNames(
                styles.Container,
                styles.collapse_Container
              )}
            >
              {children}
            </section>
          </div>
        )}
      </div>
    </section>
  );
};
export default Collapse;
