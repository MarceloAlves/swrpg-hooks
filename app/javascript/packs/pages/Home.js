import React, { Component } from "react";
import Hook from "../components/Hook";
import LoadingIcon from "../partials/LoadingIcon";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hooks: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch("/api/hooks")
      .then(res => res.json())
      .then(hooks => this.setState({ hooks, isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="container d-flex justify-content-center">
          <LoadingIcon />
        </div>
      );
    }

    const hooks = this.state.hooks.map((hook, index) => (
      <Hook key={index} {...hook} />
    ));

    return <div className="d-flex flex-wrap">{hooks}</div>;
  }
}

export default Home;
