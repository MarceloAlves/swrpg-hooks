import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import AddHook from "./pages/hooks/AddHook";
import SingleHook from "./pages/hooks/SingleHook";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/hooks/new" component={AddHook} />
            <Route path="/hooks/:slug" component={SingleHook} />
          </Switch>
        </div>
      </Router>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"));
});
