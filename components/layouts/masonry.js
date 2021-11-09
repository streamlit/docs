import React from "react";

export default class Masonry extends React.Component {
  constructor(props) {
    super(props);
    this.updateMaxheight = this.updateMaxheight.bind(this);
    this.state = {
      height: 2000,
    };
  }
  maxColumnHeight() {
    const childrenDOMElements = document.querySelectorAll(".masonry > *");
    let columnHeights = [0, 0, 0];

    for (let index = 0; index < childrenDOMElements.length; index++) {
      let row = index % 3;
      columnHeights[row] =
        columnHeights[row] + childrenDOMElements[index].offsetHeight;
      if (index == 0) {
        childrenDOMElements[index].classList.add("top-left");
      } else if (index == 2) {
        childrenDOMElements[index].classList.add("top-right");
      }
    }
    return Math.max(...columnHeights) + 5;
  }

  updateMaxheight() {
    this.setState({ height: this.maxColumnHeight() });
  }

  componentDidMount() {
    this.updateMaxheight();
    window.addEventListener("resize", this.updateMaxheight);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMaxheight());
  }

  render() {
    let props = this.props;
    return (
      <section
        className="masonry"
        style={{ "--max-height": this.state.height + "px" }}
      >
        {props.children}
      </section>
    );
  }
}
