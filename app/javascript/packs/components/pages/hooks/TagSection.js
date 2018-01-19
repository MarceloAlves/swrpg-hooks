import React from "react";
import PropTypes from "prop-types";
import Tag from "../../partials/tags/Tag";

const TagSection = ({ tags }) => {
  const tagList = tags.map((tag, index) => <Tag key={index} tag={tag} />);

  return (
    <div className="ul list-group list-group-flush">
      <li className="list-group-item">
        <i className="fas fa-tags mr-1" />
        {tagList}
      </li>
    </div>
  );
};

TagSection.propTypes = {
  tags: PropTypes.array.isRequired
};

export default TagSection;
