import React, { useState, useEffect } from "react";
import slugify from "slugify";
import classNames from "classnames";

import styles from "./headerLink.module.css";

const HeaderLink = ({ name, level, className, children }) => {
  const hash = name
    ? slugify(name, { remove: /[^A-Za-z0-9_\s]/g, lower: true })
    : "";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (window.location.hash !== `#${hash}`) {
      return;
    }

    const el = document.querySelector(`[name=${hash}]`);
    if (el) {
      el.scrollIntoView(true);
    }
  }, []);

  const copyLinkUnbound = async () => {
    const link = `${window.location.host}${window.location.pathname}#${hash}`;
    await navigator.clipboard.writeText(link);
    window.location.hash = hash;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  // Check if there's a <code> tag in the heading, so we can style it properly.
  // If we're getting something back, that means there is one, so we will wrap
  // the header contents in <span> to prevent it from flexing
  const withInlineCode = Array.from(children).find(
    (child) => child?.type === "code",
  );

  const Header = `h${level}`;
  return (
    <>
      <a name={hash} className={styles.HashLink} />

      <Header
        className={classNames(styles.HeaderContainer, "group", className)}
      >
        {withInlineCode ? <span>{children}</span> : children}

        {copied ? (
          <div className={styles.CopiedMessage}>
            <i className={styles.CopiedIcon}>done</i>
            Copied
          </div>
        ) : (
          <div className={styles.CopyLink} onClick={copyLinkUnbound}>
            <svg
              width="14"
              height="17"
              viewBox="0 0 14 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7548 0.0313721C10.7051 0.0194702 10.6571 0.00793457 10.609 0H9.87278C9.83686 0.0178223 9.81891 0.0356445 9.783 0.0356445C9.20842 0.124878 8.70565 0.374573 8.29268 0.784851L4.14488 4.90521C3.57029 5.47601 3.283 6.18951 3.31892 7.01001C3.33686 7.38464 3.42665 7.74133 3.60621 8.09808L4.43217 7.27759C4.46809 7.25977 4.46809 7.18842 4.46809 7.15271C4.41421 6.59979 4.57582 6.11816 4.97085 5.72577L8.54405 2.17615L9.13659 1.58752C9.76504 0.998901 10.7167 0.998901 11.3452 1.58752C12.0095 2.21179 12.0095 3.2464 11.3452 3.90637L7.25123 7.97327C6.8562 8.36566 6.38936 8.54401 5.83273 8.49054C5.77885 8.47266 5.72499 8.47272 5.68908 8.50836L4.86311 9.32886C4.95289 9.36456 5.00676 9.40021 5.06062 9.41803C6.15593 9.81049 7.17941 9.66779 8.02333 8.84729C9.45979 7.45599 10.8783 6.06464 12.2609 4.6377C13.7333 3.12152 12.9971 0.606445 10.9501 0.0713501C10.8805 0.0614624 10.8164 0.0461426 10.7548 0.0313721ZM7.34082 7.47388C7.62811 7.2063 7.9154 6.9209 8.20269 6.6355C8.18016 6.62988 8.16114 6.62427 8.14401 6.6192C8.10655 6.60822 8.07805 6.59985 8.04109 6.59985C7.03556 6.15393 5.83253 6.3501 5.04246 7.11713C3.606 8.52625 2.1875 9.93542 0.768994 11.3624C0.14053 11.9867 -0.0928837 12.7715 0.032803 13.6277C0.194409 14.7515 0.840817 15.5184 1.9002 15.8752C2.97755 16.2319 3.94717 16.0001 4.75517 15.2152C5.6766 14.3118 6.59005 13.4004 7.50616 12.4864C7.96467 12.0289 8.42384 11.5708 8.88501 11.1127C9.56733 10.4348 9.81871 9.61432 9.67506 8.66895C9.63916 8.41925 9.56733 8.16949 9.42369 7.9198C9.13639 8.2052 8.8491 8.47272 8.57975 8.75812C8.54385 8.776 8.54385 8.84735 8.54385 8.90082C8.61567 9.41809 8.47203 9.8819 8.09495 10.2565C6.71235 11.6478 5.31181 13.0391 3.91125 14.4125C3.51623 14.8228 2.99551 14.9655 2.43889 14.8406C1.81042 14.6979 1.4154 14.3234 1.23584 13.7347C1.05629 13.1282 1.19993 12.5753 1.64882 12.1294C2.34011 11.4337 3.03141 10.747 3.72271 10.0603C4.41401 9.37354 5.10531 8.68677 5.79661 7.99115C6.17369 7.59869 6.65849 7.45599 7.19717 7.50952C7.25103 7.50952 7.3049 7.50952 7.34082 7.47388Z"
                fill="#808495"
              />
            </svg>
          </div>
        )}
      </Header>
    </>
  );
};

export default HeaderLink;
