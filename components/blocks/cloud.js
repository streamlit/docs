import React, { useEffect, useRef } from "react";
import classNames from "classnames";

// Arguments:
//
// - name: a string with the subdomain of the URL. That's the part between "https://" and
//   ".streamlit.app". This is more future-proof that typing the full domain in case we change
//   the URL scheme at some point.
//
// - path: an optional string with the app's subpath. This is the part after ".streamlit.app/"
//   and before any query params.
//
// - query: an optional string with query params to add. Do not include the "?" at the front.
//
// - height: an optional string with a value CSS height. Must include a unit.
//
//
// Arguments you shouldn't use by hand:
//
// Instead, these are meant to be used in table.js, which needs to handle deprecated arguments
// we used to support in the iframes from our docstrings.
//
// - domain: a string with the app's full domain, like "foo.streamlit.app".
//
// - stylePlaceholder: a string with a regex placeholder like "$1".
//
//
// For example:
//
//   <Cloud name="foo" query="embedOptions=show_padding" height="500px" />
//   -> https://foo.streamlit.app/?embed=true&embed_options=show_padding
//
//   <Cloud name="foo" path="bar" query="embedOptions=show_padding&embedOptions=show_colored_line" />
//   -> https://foo.streamlit.app/bar/?embed=true&embed_options=show_padding&embed_options=show_colored_line
//
const Cloud = ({ name, path, query, height, domain, stylePlaceholder }) => {
  if (!domain) domain = `${name}.streamlit.app`;
  if (domain.endsWith("/")) domain = domain.slice(0, -1);

  if (path) {
    if (!path.startsWith("/")) path = "/" + path;
    if (path.endsWith("/")) path = path.slice(0, -1);
  } else {
    path = "";
  }

  let normalQueryStr = "";
  let embedQueryStr = "";

  // Separate "normal" query params from "embed-related" query params.
  // This way we can include only the "normal" query params in the Fullscreen link.
  // Note that this only applies to iframes rendered via the <Cloud> component
  // in React. For iframes rendered via the ".. output::" directive we **always**
  // include any provided query param in the Fullscreen link.
  if (query) {
    const embedQueryParams = [];
    const normalQueryParams = [];

    query.split("&").forEach((qStr) => {
      if (qStr.startsWith("embed=") || qStr.startsWith("embed_options=")) {
        embedQueryParams.push(qStr);
      } else {
        normalQueryParams.push(qStr);
      }
    });

    embedQueryStr = "&" + embedQueryParams.join("&");
    normalQueryStr = "&" + normalQueryParams.join("&");
  }

  if (!height) height = "10rem";

  const style = stylePlaceholder
    ? // Hack so React lets us put a capture group placeholder in the style tag.
      { ["--ignore-me"]: `42; ${stylePlaceholder}` }
    : height
      ? { height }
      : null;

  // ${domain} is garanteed to never has slashes at the ends.
  // ${path} is either empty or garanteed to be of the form "/something"
  // Note that these guarantees only apply for iframes rendered via the <Cloud> component
  // in React, and don't apply for iframes rendered via the ".. output::" directive.
  const frameSrc = `https://${domain}/~/+${path}/?embed=true${embedQueryStr}${normalQueryStr}`;
  const linkSrc = `https://${domain}${path}/?utm_medium=oembed${normalQueryStr}`;

  return (
    <section className="overflow-hidden rounded-xl border border-gray-40 my-4 flex flex-col">
      <iframe
        src={frameSrc}
        allow="camera;microphone;clipboard-read;clipboard-write;"
        loading="lazy"
        className="w-full"
        style={style}
        key={frameSrc}
      />

      {/* This toolbar imitates the Cloud OEmbed toolbar */}
      <div
        className={classNames(
          "flex flex-row px-3 py-1 bg-gray-20",
          "text-xs tracking-[0.05em] text-gray-80 gap-16",
        )}
      >
        <div className="flex-1">
          <a
            className="text-xs tracking-[0.05em] text-gray-80 hover:text-gray-70"
            href="https://streamlit.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built with Streamlit 🎈
          </a>
        </div>

        <div>
          <a
            href={linkSrc}
            className={classNames(
              "text-xs tracking-[0.05em]",
              "text-gray-80 hover:text-gray-70",
              "flex flex-row gap-1",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Fullscreen <i className="text-xs">open_in_new</i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cloud;
