import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/partials/navigation/Navigation";
import HomePage from "./components/pages/home/HomePage";
import AddHookPage from "./components/pages/hooks/AddHookPage";
import SingleHookPage from "./components/pages/hooks/SingleHookPage";
import Footer from "./components/partials/footer/Footer";

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
            <Route exact path="/" component={HomePage} />
            <Route path="/hooks/new" component={AddHookPage} />
            <Route path="/hooks/:slug" component={SingleHookPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"));
});
