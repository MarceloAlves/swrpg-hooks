import React, { Component } from "react";
import PropTypes from "prop-types";
import TagsInput from "react-tagsinput";
import FormError from "../../partials/FormError";

class AddHookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      tags: [],
      popular_tags: [],
      isValid: true,
      errors: [],
      redirect: false
    };
    this.onInputUpdate = this.onInputUpdate.bind(this);
    this.handleTagInput = this.handleTagInput.bind(this);
    this.addPopularTag = this.addPopularTag.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.checkRedirect = this.checkRedirect.bind(this);
  }

  componentWillMount() {
    fetch("/api/tags")
      .then(res => res.json())
      .then(tags => this.setState({ ...tags }));
  }

  onInputUpdate(field, event) {
    this.setState({ [field]: event.target.value }, this.validateForm);
  }

  handleTagInput(tags) {
    this.setState({ tags });
  }

  addPopularTag(event, tag) {
    this.tagInput.addTag(tag);
    event.target.remove();
  }

  validateForm() {
    if (this.state.body.length > 500) {
      return this.setState({ isValid: false });
    }

    this.setState({ isValid: true });
  }

  checkRedirect() {
    if (this.state.redirect) {
      this.props.history.push("/");
    }
  }

  submitForm() {
    const { title, body, tags } = this.state;
    const data = { hook: { title, body, tags } };

    fetch("/api/hooks", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(result => this.setState({ ...result }, this.checkRedirect))
      .catch(error => console.error("Error:", error));
  }

  render() {
    const popularTags = this.state.popular_tags.map((tag, index) => (
      <span
        key={index}
        onClick={e => this.addPopularTag(e, tag)}
        className="badge badge-info badge-pill p-2 m-1"
      >
        {tag}
      </span>
    ));

    return (
      <div className="d-flex justify-content-center">
        <div className="col-md-10">
          <div className="form-group">
            <label htmlFor="hook_title">Title</label>
            <input
              type="text"
              name="hook[title]"
              id="hook_title"
              value={this.state.title}
              className={`form-control ${this.state.errors.title &&
                "is-invalid"}`}
              onChange={e => this.onInputUpdate("title", e)}
            />

            {this.state.errors.title && (
              <FormError field="Title" errors={this.state.errors.title} />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="hook_body">Hook Text</label>
            <textarea
              value={this.state.body}
              name="hook[body]"
              id="hook_body"
              cols="30"
              rows="10"
              className="form-control"
              onChange={e => this.onInputUpdate("body", e)}
            />
            <small
              className={`form-text ${
                this.state.body.length > 500 ? "text-danger" : "text-muted"
              }`}
            >
              {this.state.body.length}/500
            </small>

            {this.state.errors.body && (
              <FormError field="Body" errors={this.state.errors.body} />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="hook_tags">
              Tags <small>(comma-separated tags)</small>
            </label>
            <TagsInput
              name="hook[tags]"
              id="hook_tags"
              ref={tagInput => {
                this.tagInput = tagInput;
              }}
              value={this.state.tags}
              onChange={this.handleTagInput}
              addKeys={[188]}
            />
            <p className="form-text">{popularTags}</p>

            {this.state.errors.tags && (
              <FormError field="Tags" errors={this.state.errors.tags} />
            )}
          </div>
          <button
            className="btn btn-primary"
            disabled={!this.state.isValid}
            type="submit"
            onClick={this.submitForm}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

AddHookPage.propTypes = {
  history: PropTypes.any.isRequired
};

export default AddHookPage;
