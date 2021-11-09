import React from "react";

import IconHeader from "../blocks/iconHeader";

export default class Important extends React.Component {
  constructor(props) {
    super(props);
    this.handleTheme = this.handleTheme.bind(this);
    this.state = {
      theme: "light-mode",
    };
  }

  async componentDidMount() {
    window.addEventListener("ChangeTheme", this.handleTheme);
  }

  componentWillUnmount() {
    window.removeEventListener("ChangeTheme", this.handleTheme);
  }

  handleTheme() {
    this.setState({ theme: document.body.dataset.theme });
  }

  render() {
    const props = this.props;
    const state = this.state;
    let block;
    if (state.theme == "dark-mode") {
      block = (
        <section className={`block-note bg-dark-orange color-white`}>
          <IconHeader
            icon="priority_high"
            rotate="0"
            title="Important"
            background="orange-70"
            color="white"
          />
          {props.children}
        </section>
      );
    } else {
      block = (
        <section className={`block-note bg-orange-10 color-gray-90`}>
          <IconHeader
            icon="priority_high"
            rotate="0"
            title="Important"
            background="orange-70"
            color="white"
          />
          {props.children}
        </section>
      );
    }

    return block;
  }
}
