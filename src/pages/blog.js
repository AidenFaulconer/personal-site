import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { CSSTransition } from "react-transition-group";
import Layout from "../components/layout";
import BlogBuilder from "../components/blog-builder";

export default () => {
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    setInProp(true);

    return () => setInProp(false); // called on component unmount
  }, []); // transition on component load

  return (
    <Layout pageState="blog">
      <Helmet />
      <CSSTransition in={inProp} timeout={1000} classNames="right-transition">
        <div className="blog-main">
          {/** page content   */}
          <BlogBuilder />
        </div>
      </CSSTransition>
    </Layout>
  );
};
// gatsy develop -H 192.168.0.1 -p 8000

// <title>{site.siteMetadata.title}</title>
// <meta name="description" content={site.siteMetadata.description} />
// {!site.siteMetadata.w3l_dom_key ? null : (
//   <meta
//     name="w3l-domain-verification"
//     content={site.siteMetadata.w3l_dom_key}
//   />
// )}
