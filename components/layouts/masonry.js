import React from "react";

export default class Masonry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 2000
        };
    }

    async componentDidMount() {
        const childrenDOMElements = document.querySelectorAll(".masonry > *");
        const itemsPerColumn = childrenDOMElements.length / 3;

        let columnHeights = [0, 0, 0];

        for (let index = 0; index < childrenDOMElements.length; index++) {
            let row = index % itemsPerColumn;
            columnHeights[row] = columnHeights[row] + childrenDOMElements[index].offsetHeight;
        }
        let maxHeight = Math.max(...columnHeights);

        this.setState({ height: maxHeight + 20 });
    }

    render() {
        let props = this.props;
        return (
            <section className="masonry" style={{ height: this.state.height + 'px' }}>
                {props.children}
            </section >
        )
    }
}