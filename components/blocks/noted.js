import React from "react";

import IconHeader from "./iconHeader";

export default class Note extends React.Component {
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
        <section className={`block-note bg-dark-black color-white`}>
          <IconHeader
            icon="push_pin"
            rotate="45"
            title="Note"
            background="l-blue-70"
            color="white"
          />
          {props.children}
        </section>
      );
    } else {
      block = (
        <section className={`block-note bg-l-blue-10 color-gray-90`}>
          <IconHeader
            icon="push_pin"
            rotate="45"
            title="Note"
            background="l-blue-70"
            color="white"
          />
          {props.children}
        </section>
      );
    }

    return block;
  }
}
