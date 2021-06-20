import React from "react";

export default class YouTube extends React.Component {
    render() {
        const props = this.props
        let YouTubeBlock = (
            <h1>Test</h1>
        )
        if (props.caption) {
            YouTubeBlock = (
                <section className="block-youtube">
                    <section className="iFrame-parent">
                        <iframe src={`https://www.youtube-nocookie.com/embed/${props.video_id}?rel=0`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </section>
                    <section className="caption" v-if="caption"><p className="small italic">{props.caption}</p></section>
                </section>
            )
        } else {
            YouTubeBlock = (
                <section className="block-youtube">
                    <section className="iFrame-parent">
                        <iframe src={`https://www.youtube-nocookie.com/embed/${props.video_id}?rel=0`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </section>
                </section>
            )
        }
        return YouTubeBlock
    }
}