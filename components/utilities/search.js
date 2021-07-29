import React from "react";

import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure,
} from 'react-instantsearch-dom';

import { AnimatePresence, motion } from 'framer-motion';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            hotKey: '',
            windowWidth: null
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.searchClicked = this.searchClicked.bind(this);
    }

    toggleModal() {
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

        this._keyListener = function (e) {
            if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault(); // present "Save Page" from getting triggered.
                this.setState({ modal: true });
                document.body.style.overflow = 'hidden'
                this.focus();
                // this.focus();

                // document.getElementsByClassName("ais-SearchBox-input")[0].focus();

            }
            if (e.key === "Escape") {
                this.setState({ modal: false })
                document.body.style.overflow = 'unset'
            }
        };
        document.addEventListener('keydown', this._keyListener.bind(this));
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

            return (
                <article className="item">
                    <a className="not-link" href={props.hit.url}>
                        <section className="image_container bg-gray-50">
                            <div className={`icon-${icon}`}><i>{icon}</i></div>
                        </section> 
                        <section className="copy">
                            <p className="tiny">{category}</p>
                            <h5><Highlight hit={props.hit} attribute="title"></Highlight></h5>
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
                            <span className="background" onClick={this.toggleModal} />
                            <button onClick={this.toggleModal}>close</button>
                            <section className="content">
                                <div className="ais-InstantSearch">
                                    <InstantSearch indexName="documentation" searchClient={searchClient}>
                                        <div className="left-panel">
                                            <RefinementList attribute="brand" />
                                            <Configure hitsPerPage={20} />
                                        </div>
                                        <div className="right-panel">
                                            <SearchBox id="search-box small" />
                                            <Hits hitComponent={Hit} />
                                        </div>
                                    </InstantSearch>
                                </div>
                            </section>
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
