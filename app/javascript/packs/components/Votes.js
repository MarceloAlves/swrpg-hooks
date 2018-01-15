import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class Votes extends Component {
  static errorMessage(ttl) {
    return (
      <React.Fragment>
        Please wait and vote again&nbsp;
        <Moment add={{ seconds: ttl }} from={Date()} />
      </React.Fragment>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
      error: null,
      ttl: 0
    };

    this.handleUpvote = this.handleUpvote.bind(this);
  }

  componentWillMount() {
    this.setState({ votes: this.props.votes });
  }

  handleUpvote() {
    fetch(`/api/hooks/${this.props.hook_id}/votes`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ ...result });
      });
  }

  render() {
    return (
      <li className="list-group-item text-center">
        <h5>
          <a onClick={() => this.handleUpvote()}>
            <i className="fas fa-thumbs-up mr-2 upvote" />
          </a>
          {this.state.votes}
        </h5>
        <small className="text-warning">
          {this.state.error && Votes.errorMessage(this.state.ttl)}
        </small>
      </li>
    );
  }
}

Votes.propTypes = {
  hook_id: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired
};

export default Votes;
