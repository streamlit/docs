import React, { useState, useEffect } from "react";
import FocusTrap from "focus-trap-react";
import { useRouter, withRouter } from "next/router";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hotkey, setHotkey] = useState("");
  const [windowWidth, setWindowWidth] = useState(null);
  const [indexFocus, setIndexFocus] = useState(0);

  const router = useRouter();

  const toggleModal = (e) => {
    if (e && e.currentTarget !== e.target) {
      return;
    }

    setIsModalOpen(!isModalOpen);

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
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    focus();
  };

  const handleKey = (e) => {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault(); // prevent "Save Page" from getting triggered.
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
      focus();
    }
    if (e.key === "Escape") {
      setIsModalOpen(false);
      document.body.style.overflow = "unset";
    }
    if (isModalOpen === true) {
      const resultCount = document.querySelectorAll(".ais-Hits-item").length;
      let currentFocus = indexFocus;
      if (e.key === "Enter") {
        goToResult();
      }
      if (e.key === "ArrowUp") {
        currentFocus = currentFocus > 1 ? currentFocus - 1 : 1;
        setIndexFocus(currentFocus);
        highlightResult();
      } else if (e.key === "ArrowDown") {
        currentFocus =
          currentFocus < resultCount ? currentFocus + 1 : resultCount;
        setIndexFocus(currentFocus);
        highlightResult();
      } else {
        currentFocus = 0;
        setIndexFocus(currentFocus);
      }
    }
  };

  const highlightResult = () => {
    let index = indexFocus;

    if (index <= 0) {
      index = 1;
      setIndexFocus(1);
    }

    const results = document.querySelectorAll(".ais-Hits-item article");
    if (results.length > 0) {
      if (results.length >= index) {
        const result = results[index - 1];
        result.scrollIntoView(false);
      }
    }
  };

  const goToResult = () => {
    let index = indexFocus;

    if (index <= 0) {
      index = 1;
      setIndexFocus(1);
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
    setWindowWidth(window.innerWidth);

    if (window.innerWidth > 1024) {
      if (window.navigator.platform.indexOf("Mac") != -1) {
        setHotkey("⌘K");
      } else if (window.navigator.platform.indexOf("Win") != -1) {
        setHotkey("Ctrl-K");
      } else if (window.navigator.platform.indexOf("Linux") != -1) {
        setHotkey("Ctrl-K");
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
      <article
        className={`item ${
          props.hit.__position === indexFocus ? "focused" : ""
        }`}
        tabIndex="-1"
      >
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

  if (isModalOpen) {
    modal = (
      <AnimatePresence>
        {isModalOpen && (
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
              <div
                className="modalContainer"
                onClick={toggleModal}
                onKeyDown={handleKey}
              >
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

  let searchBar = (
    <section className="block-search">
      <section className="hot-key small" onClick={searchClicked}>
        <i>search</i>
        <p className="search-text">Search</p>
        {windowWidth > 1024 && <p className="command">{hotkey}</p>}
      </section>
      {modal}
      {/* <SearchBox /> */}
    </section>
  );
  return searchBar;
};

export default withRouter(Search);
