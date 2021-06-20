import React from "react";
import TransitionGroup from 'react-transition-group';

import Note from './note'

export default class Image extends React.Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            opened: false
        };
    }


    openModal() {
        this.setState({ opened: true })
    }
    closeModal() {
        this.setState({ opened: false })
    }

    render() {
        const props = this.props
        const state = this.state
        let block;
        if (state.opened) {
            block = (
                <section className="block-image">
                    <Note color="unset" background="unset">
                        <section className="image">
                            <img onClick={this.openModal} src={props.src} alt={props.alt} />
                            <p className="italic small" >{props.caption}</p>
                        </section>
                    </Note>

                    <section className="light-box" onClick={this.closeModal}>
                        <button onClick={this.openModal}>close</button>
                        <section className="content">
                            <img src={props.src} alt={props.alt} />
                            <p className="italic small" >{props.caption}</p>
                        </section>
                    </section>
                </section >
            )
        } else if (props.clean) {
            block = (
                <section className="block-image clean" style={{ marginBottom: 0 }}>
                    <section className="image">
                        <img src={props.src} alt={props.alt} />
                        <p className="italic small" >{props.caption}</p>
                    </section>
                </section >
            )
        } else {
            block = (
                <section className="block-image">
                    <Note color="unset" background="unset">
                        <section className="image">
                            <img onClick={this.openModal} src={props.src} alt={props.alt} />
                            <p className="italic small" >{props.caption}</p>
                        </section>
                    </Note>
                </section>
                //     <Note v-if="!clean" className="block-image" color="unset" bg="unset">
                //         <section v-if="opened" className="light-box" @click="lightBox">
                //         <button>close</button>
                //         <section v-if="opened" className="content">
                //             <img :src="src" :alt="alt">
                //             <p className="italic small" v-if="caption">{{ caption }}</p>
                //         </section>
                //         </section>
                // </Note >
            )

        }

        return block
    }
}