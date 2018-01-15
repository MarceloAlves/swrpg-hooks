import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark justify-content-between sticky-top">
    <Link to="/" className="navbar-brand">
      SWRPG Hooks
    </Link>
    <Link to="/hooks/new" className="btn btn-sm btn-primary m-1">
      Submit
    </Link>
  </nav>
);

export default Navigation;
