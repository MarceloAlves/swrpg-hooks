import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Tag from "../partials/Tag";
import FeaturedTag from "../partials/FeaturedTag";
import TrendingTag from "../partials/TrendingTag";
import { Votes } from "./Votes";

const Hook = ({
  id,
  title,
  body,
  votes,
  tags,
  is_featured,
  is_trending,
  created_at,
  slug_id
}) => {
  const tagList = tags.map((tag, index) => <Tag key={index} tag={tag} />);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-4 my-1">
      <div className="card hook-card">
        <div className="card-header d-flex">{title}</div>
        <div className="card-body">
          {is_featured && <FeaturedTag />}
          {is_trending && <TrendingTag />}
          <p className="card-text">{body}</p>
        </div>
        <div className="ul list-group list-group-flush">
          <li className="list-group-item">
            <i className="fas fa-tags mr-1" />
            {tagList}
          </li>
        </div>
        <div className="ul list-group list-group-flush">
          <Votes hook_id={id} votes={votes} />
        </div>
        <div className="card-footer text-muted d-flex justify-content-between m-0 p-2">
          <small>
            <i className="fas fa-clock mr-1" />
            Added{" "}
            <Moment fromNow parse="YYYY-MM-DD HH:mm:ss.SSSZ">
              {created_at}
            </Moment>
          </small>
          <small>
            <Link to={`/hooks/${slug_id}`}>Permalink</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

Hook.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired,
  is_featured: PropTypes.bool.isRequired,
  is_trending: PropTypes.bool.isRequired,
  created_at: PropTypes.string.isRequired,
  slug_id: PropTypes.string.isRequired
};

export default Hook;
