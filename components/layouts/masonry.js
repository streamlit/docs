import React from "react";

export default class Masonry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 2000
        };
    }

    componentDidMount() {
        const childrenDOMElements = document.querySelectorAll(".masonry > *");
        let columnHeights = [0, 0, 0];

        for (let index = 0; index < childrenDOMElements.length; index++) {
            let row = index % 3;
            columnHeights[row] = columnHeights[row] + childrenDOMElements[index].offsetHeight;
            if (index == 0) {
                childrenDOMElements[index].classList.add('top-left');
            } else if (index == 2) {
                childrenDOMElements[index].classList.add('top-right');

            }
        }
        let maxHeight = Math.max(...columnHeights);
        this.setState({ height: maxHeight });
    }

    render() {
        let props = this.props;
        return (
            <section className="masonry" style={{ "--max-height": this.state.height + 'px' }}>
                {props.children}
            </section >
        )
    }
}