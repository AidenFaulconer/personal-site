import React from "react";
import { Link } from "gatsby";

// TODO: introduce new site sections detailing your skills more, (these should be more foucsed since this site advertisies your services)
export default () => (
  <nav className="navigation">
    <Link to="/">home</Link>
    <Link to="/blog">blog</Link>
  </nav>
);
