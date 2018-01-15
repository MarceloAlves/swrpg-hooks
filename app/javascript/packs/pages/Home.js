import React, { Component } from "react";
import Waypoint from "react-waypoint";
import Hook from "../components/Hook";
import LoadingIcon from "../partials/LoadingIcon";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hooks: [],
      isLoading: true,
      pagination: {
        next_page: 1,
        total_pages: null,
        is_last_page: false
      }
    };

    this.getHooks = this.getHooks.bind(this);
  }

  componentDidMount() {
    this.getHooks();
  }

  getHooks(pagesAvailable) {
    if (pagesAvailable) {
      this.startLoader();
      fetch(`/api/hooks?page=${this.state.pagination.next_page}`)
        .then(res => res.json())
        .then(body => {
          this.setState(prevState => ({
            hooks: prevState.hooks.concat(body.hooks),
            pagination: body.pagination
          }));
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  startLoader() {
    this.setState({ isLoading: true });
  }

  render() {
    const hooks = this.state.hooks.map(hook => (
      <Hook key={hook.id} {...hook} />
    ));

    return (
      <div className="d-flex flex-wrap">
        {hooks}
        {
          <Waypoint
            bottomOffset="200px"
            onEnter={() => this.getHooks(!this.state.pagination.is_last_page)}
          />
        }
        {this.state.pagination.is_last_page && (
          <div className="col-12 p-5 m-3 d-flex justify-content-center">
            You've reached the end!
          </div>
        )}
        {this.state.isLoading && <LoadingIcon />}
      </div>
    );
  }
}

export default Home;
