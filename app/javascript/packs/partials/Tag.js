import React from "react";
import PropTypes from "prop-types";

const Tag = ({ tag }) => (
  <span className="badge badge-pill badge-light mx-1">{tag}</span>
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired
};

export default Tag;
