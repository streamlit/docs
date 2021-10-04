import React from "react";
import FocusTrap from "focus-trap-react";
import { withRouter } from 'next/router'

import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Highlight,
    Snippet,
    RefinementList,
    Configure,
} from 'react-instantsearch-dom';

import { AnimatePresence, motion } from 'framer-motion';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            hotKey: '',
            windowWidth: null,
            indexFocus: 0,
            results: []
        };

        this.toggleModal = this.toggleModal.bind(this)
        this.searchClicked = this.searchClicked.bind(this)
        this.handleKey = this.handleKey.bind(this)
        this.highlightResult = this.highlightResult.bind(this)
        this.goToResult = this.goToResult.bind(this)
    }

    toggleModal(e) {
        if (e && e.currentTarget !== e.target) {
            return;
        }

        this.setState({ indexFocus: 0 })
        this.setState({ modal: !this.state.modal })

        if (document.body.style.overflow == 'hidden') {
            document.body.style.overflow = 'unset'
        } else {
            document.body.style.overflow = 'hidden'
        }
    }

    focus() {
        setTimeout(function () {
            let input = document.getElementsByClassName("ais-SearchBox-input")[0];
            input.focus();
        }, 100);
    }

    searchClicked() {
        this.setState({ modal: true });
        document.body.style.overflow = 'hidden'
        this.focus();
    }

    handleKey(e) {
        if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault(); // present "Save Page" from getting triggered.
            this.setState({ modal: true });
            document.body.style.overflow = 'hidden'
            this.focus();
        }
        if (e.key === "Escape") {
            this.setState({ modal: false })
            document.body.style.overflow = 'unset'
        }
        if (this.state.modal === true) {
            const resultCount = document.querySelectorAll('.ais-Hits-item').length
            let currentFocus = this.state.indexFocus
            if (e.key === 'Enter') {
                this.goToResult()
            }
            if (e.key === 'ArrowUp') {
                currentFocus = (currentFocus > 1) ? currentFocus - 1 : 1
                this.setState({ indexFocus: currentFocus })
                this.highlightResult()
            } else if (e.key === 'ArrowDown') {
                currentFocus = (currentFocus < resultCount) ? currentFocus + 1 : resultCount
                this.setState({ indexFocus: currentFocus })
                this.highlightResult()
            } else {
                currentFocus = 0
                this.setState({ indexFocus: currentFocus })
            }
        }
    }

    highlightResult() {
        const index = this.state.indexFocus
        const results = document.querySelectorAll('.ais-Hits-item article')
        if (results.length > 0) {
            for (let i; i < results.length - 1; i++) {
                results[i].classList.remove('focused')
            }
            if (results.length >= index) {
                const result = results[index - 1]
                result.classList.add('focused')
                result.scrollIntoView(false)
            }
        }
    }

    goToResult() {
        let index = this.state.indexFocus

        if (index <= 0) {
            index = 1
        }

        const results = document.querySelectorAll('.ais-Hits-item article')

        if (results.length > 0) {
            if (results.length >= index) {
                const result = results[index - 1]
                const a = result.querySelector('a').getAttribute('href')
                this.toggleModal()
                this.props.router.push(a)
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKey);
    }

    componentDidMount() {
        this.setState({ windowWidth: window.innerWidth })
        if (window.innerWidth > 1024) {
            if (window.navigator.platform.indexOf("Mac") != -1) {
                this.setState({ hotKey: '⌘K' })
            } else if (window.navigator.platform.indexOf("Win") != -1) {
                this.setState({ hotKey: 'Ctrl-K' })
            } else if (window.navigator.platform.indexOf("Linux") != -1) {
                this.setState({ hotKey: 'Ctrl-K' })
            }
        }
        document.addEventListener('keydown', this.handleKey);
    }

    render() {
        const state = this.state;

        const searchClient = algoliasearch(
            'XNXFGO6BQ1',
            'd3ac8363577a863bcbe50f15846459cd'
        )

        function Hit(props) {
            const icon = props.hit.icon ? props.hit.icon : 'text_snippet'
            const category = props.hit.category ? props.hit.category : 'Page'
            let snippet;
            if (props.hit._snippetResult && props.hit._snippetResult.content.matchLevel !== 'none') {
                snippet = (
                    <Snippet attribute="content" hit={props.hit} />
                )
            }
            return (
                <article className="item" tabindex='-1'>
                    <a className="not-link" href={props.hit.url}>
                        <section className="image_container bg-yellow-90">
                            <div className={`icon-${icon}`}><i>{icon}</i></div>
                        </section>
                        <section className="copy">
                            <p className="tiny">{category}</p>
                            <h5><Highlight hit={props.hit} attribute="title"></Highlight></h5>
                            {snippet}
                        </section>
                    </a>
                </article >
            );
        }

        let modal;

        if (state.modal) {
            modal = (
                <AnimatePresence>
                    {state.modal &&
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
                                    duration: .01
                                }
                            }}
                            exit={{
                                opacity: 0,
                                // left: '-40em'
                            }} className="algolia">
                            <FocusTrap>
                                <div>
                                    <span className="background" onClick={this.toggleModal} />
                                    <button className="closeModal" onClick={this.toggleModal}>close modal</button>
                                    <section className="content" tabindex='-1'>
                                        <div className="ais-InstantSearch">
                                            <InstantSearch indexName="documentation" searchClient={searchClient}>
                                                <div className="right-panel">
                                                    <Configure hitsPerPage={10} filters="version:latest" />
                                                    <SearchBox id="search-box small" />
                                                    <Hits hitComponent={Hit} />
                                                </div>
                                            </InstantSearch>
                                        </div>
                                    </section>
                                </div>
                            </FocusTrap>
                        </motion.section>
                    }
                </AnimatePresence>
            )
        }

        let hotKey;
        if (this.state.windowWidth > 1024) {
            hotKey = <p className="command">{this.state.hotKey}</p>
        }
        let searchBar = (
            <section className="block-search">
                <section className="hot-key small" onClick={this.searchClicked}>
                    <i>search</i>
                    <p className="search-text">Search</p>
                    {hotKey}
                </section>
                {modal}
                {/* <SearchBox /> */}
            </section >
        )
        return searchBar
    }
}

export default withRouter(Search)
