import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Hook from "../../components/Hook";
import LoadingIcon from "../../partials/LoadingIcon";

class SingleHook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hook: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`/api/hooks/${this.props.match.params.slug}`)
      .then(res => res.json())
      .then(hook => {
        this.setState({ hook, isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIcon />;
    }

    if (!this.state.hook) {
      return (
        <div className="d-flex justify-content-center">
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 my-1">
            <div className="card">
              <div className="card-header d-flex">Hook Not Found</div>
              <div className="card-body">
                <p className="card-text text-center">
                  Hook could not be found. <br />
                  <Link to="/hooks/new" className="btn btn-primary m-3">
                    Create New Hook
                  </Link>
                  <Link to="/" className="btn btn-primary m-3">
                    Go Home
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="d-flex justify-content-center">
        <Hook {...this.state.hook} />
      </div>
    );
  }
}

SingleHook.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string
    })
  }).isRequired
};

export default SingleHook;
