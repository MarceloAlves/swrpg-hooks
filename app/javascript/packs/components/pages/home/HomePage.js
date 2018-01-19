import React, { Component } from "react";
import Waypoint from "react-waypoint";
import { Link } from "react-router-dom";
import HookCard from "../hooks/HookCard";
import LoadingIcon from "../../partials/LoadingIcon";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hooks: [],
      isLoading: false,
      pagination: {
        next_page: 1,
        total_pages: null,
        is_last_page: false
      }
    };

    this.getHooks = this.getHooks.bind(this);
  }

  componentWillMount() {
    this.getHooks(true);
  }

  getHooks(pagesAvailable) {
    if (pagesAvailable) {
      this.toggleLoader();
      fetch(`/api/hooks?page=${this.state.pagination.next_page}`)
        .then(res => res.json())
        .then(body => {
          this.setState(
            prevState => ({
              hooks: prevState.hooks.concat(body.hooks),
              pagination: body.pagination
            }),
            this.toggleLoader
          );
        });
    }
  }

  toggleLoader() {
    this.setState(prevState => ({ isLoading: !prevState.isLoading }));
  }

  render() {
    const hooks = this.state.hooks.map(hook => (
      <HookCard key={hook.id} {...hook} />
    ));

    return (
      <div className="d-flex flex-wrap">
        {hooks}
        {!this.state.isLoading && (
          <Waypoint
            bottomOffset="200px"
            onEnter={() => this.getHooks(!this.state.pagination.is_last_page)}
          />
        )}
        {this.state.pagination.is_last_page &&
          !this.state.isLoading && (
            <div className="col-12 my-5 text-center">
              <p>You've reached the end!</p>
              <p>
                <Link to="/hooks/new">Add one?</Link>
              </p>
            </div>
          )}
        {this.state.isLoading && <LoadingIcon />}
      </div>
    );
  }
}

export default HomePage;
