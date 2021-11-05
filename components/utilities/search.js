import React, { useState, useEffect } from "react";
import FocusTrap from "focus-trap-react";
import { withRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Snippet,
  Configure,
} from "react-instantsearch-dom";

const Search = () => {
  const [state, setState] = useState({
    modal: false,
    hotKey: "",
    windowWidth: null,
    indexFocus: 0,
    results: [],
  });

  const toggleModal = (e) => {
    if (e && e.currentTarget !== e.target) {
      return;
    }

    setState({ ...state, indexFocus: 0 });
    setState({ ...state, modal: !state.modal });

    if (document.body.style.overflow == "hidden") {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const focus = () => {
    setTimeout(function () {
      let input = document.getElementsByClassName("ais-SearchBox-input")[0];
      input.focus();
    }, 100);
  };

  const searchClicked = () => {
    setState({ ...state, modal: true });
    document.body.style.overflow = "hidden";
    focus();
  };

  const handleKey = (e) => {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault(); // present "Save Page" from getting triggered.
      setState({ ...state, modal: true });
      document.body.style.overflow = "hidden";
      focus();
    }
    if (e.key === "Escape") {
      setState({ ...state, modal: false });
      document.body.style.overflow = "unset";
    }
    if (state.modal === true) {
      const resultCount = document.querySelectorAll(".ais-Hits-item").length;
      let currentFocus = state.indexFocus;
      if (e.key === "Enter") {
        goToResult();
      }
      if (e.key === "ArrowUp") {
        currentFocus = currentFocus > 1 ? currentFocus - 1 : 1;
        setState({ ...state, indexFocus: currentFocus });
        highlightResult();
      } else if (e.key === "ArrowDown") {
        currentFocus =
          currentFocus < resultCount ? currentFocus + 1 : resultCount;
        setState({ ...state, indexFocus: currentFocus });
        highlightResult();
      } else {
        currentFocus = 0;
        setState({ ...state, indexFocus: currentFocus });
      }
    }
  };

  const highlightResult = () => {
    const index = state.indexFocus;
    const results = document.querySelectorAll(".ais-Hits-item article");
    if (results.length > 0) {
      for (let i; i < results.length - 1; i++) {
        results[i].classList.remove("focused");
      }
      if (results.length >= index) {
        const result = results[index - 1];
        result.classList.add("focused");
        result.scrollIntoView(false);
      }
    }
  };

  const goToResult = () => {
    let index = state.indexFocus;

    if (index <= 0) {
      index = 1;
    }

    const results = document.querySelectorAll(".ais-Hits-item article");

    if (results.length > 0) {
      if (results.length >= index) {
        const result = results[index - 1];
        const a = result.querySelector("a").getAttribute("href");
        toggleModal();
        router.push(a);
      }
    }
  };

  useEffect(() => {
    setState({ ...state, windowWidth: window.innerWidth });

    if (window.innerWidth > 1024) {
      if (window.navigator.platform.indexOf("Mac") != -1) {
        setState({ ...state, hotKey: "⌘K" });
      } else if (window.navigator.platform.indexOf("Win") != -1) {
        setState({ ...state, hotKey: "Ctrl-K" });
      } else if (window.navigator.platform.indexOf("Linux") != -1) {
        setState({ ...state, hotKey: "Ctrl-K" });
      }
    }
    document.addEventListener("keydown", handleKey);
  }, []);

  const searchClient = algoliasearch(
    "XNXFGO6BQ1",
    "d3ac8363577a863bcbe50f15846459cd"
  );

  function Hit(props) {
    const icon = props.hit.icon ? props.hit.icon : "text_snippet";
    const category = props.hit.category ? props.hit.category : "Page";
    let snippet;
    if (
      props.hit._snippetResult &&
      props.hit._snippetResult.content.matchLevel !== "none"
    ) {
      snippet = <Snippet attribute="content" hit={props.hit} />;
    }
    return (
      <article className="item" tabIndex="-1">
        <a className="not-link" href={props.hit.url}>
          <section className="image_container bg-yellow-90">
            <div className={`icon-${icon}`}>
              <i>{icon}</i>
            </div>
          </section>
          <section className="copy">
            <p className="tiny">{category}</p>
            <h5>
              <Highlight hit={props.hit} attribute="title"></Highlight>
            </h5>
            {snippet}
          </section>
        </a>
      </article>
    );
  }

  let modal;

  if (state.modal) {
    modal = (
      <AnimatePresence>
        {state.modal && (
          <motion.section
            initial={{
              opacity: 0,
              // left: '-40em'
            }}
            animate={{
              opacity: 1,
              // left: 0,
              transition: {
                ease: "easeInOut",
                duration: 0.01,
              },
            }}
            exit={{
              opacity: 0,
              // left: '-40em'
            }}
            className="algolia"
          >
            <FocusTrap>
              <div className="modalContainer" onClick={toggleModal}>
                <section className="content" tabIndex="-1">
                  <div className="ais-InstantSearch">
                    <InstantSearch
                      indexName="documentation"
                      searchClient={searchClient}
                    >
                      <div className="right-panel">
                        <Configure
                          facets={["*", "version"]}
                          facetFilters={["version:latest"]}
                          hitsPerPage={10}
                        />
                        <SearchBox id="search-box small" />
                        <Hits hitComponent={Hit} />
                      </div>
                    </InstantSearch>
                  </div>
                </section>
              </div>
            </FocusTrap>
          </motion.section>
        )}
      </AnimatePresence>
    );
  }

  let hotKey;
  if (state.windowWidth > 1024) {
    hotKey = <p className="command">{state.hotKey}</p>;
  }
  let searchBar = (
    <section className="block-search">
      <section className="hot-key small" onClick={searchClicked}>
        <i>search</i>
        <p className="search-text">Search</p>
        {hotKey}
      </section>
      {modal}
      {/* <SearchBox /> */}
    </section>
  );
  return searchBar;
};

export default withRouter(Search);
