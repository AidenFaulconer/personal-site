import React from "react";
import { Link } from "gatsby";

// TODO: introduce new site sections detailing your skills more, (these should be more foucsed since this site advertisies your services)
export default () => (
  <nav className="navigation">
    <Link to="/contact">Contact</Link>
    <Link to="/blog">blog</Link>
    <Link to="/blog">programming</Link>
    <Link to="/blog">ai</Link>
    <Link to="/blog">3d</Link>
    <Link to="/blog">ux</Link>
  </nav>
);
