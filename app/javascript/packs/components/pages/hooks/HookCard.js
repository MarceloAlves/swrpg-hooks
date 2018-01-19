import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import TagSection from "./TagSection";
import FeaturedTag from "../../partials/tags/FeaturedTag";
import TrendingTag from "../../partials/tags/TrendingTag";
import Votes from "./Votes";

const HookCard = ({
  id,
  title,
  body,
  votes,
  tags,
  is_featured,
  is_trending,
  created_at,
  slug_id
}) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-4 my-1">
    <div className="card hook-card">
      <div className="card-header d-flex">{title}</div>
      <div className="card-body">
        {is_featured && <FeaturedTag />}
        {is_trending && <TrendingTag />}
        <p className="card-text">{body}</p>
      </div>
      <TagSection tags={tags} />
      <Votes hook_id={id} votes={votes} />
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

HookCard.propTypes = {
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

export default HookCard;
