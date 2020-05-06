import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { CSSTransition } from "react-transition-group";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import HeroHeader from "../components/heroHeader";
import SectionBuilder from "../components/section-builder";
import ThreeComponent from "../components/threejs/three-component";
// when ssr, wrap components using window with this to avoid undefined windowerrors
// TODO: add google analytics

export default ({
  // data is a global populated from our query
  data: {
    site,
    allMarkdownRemark: { edges }
  }
}) => {
  // get posts
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    setInProp(true);

    return () => setInProp(false); // called on component unmount
  }, []); // transition on component load

  return (
    <>
      <Layout Posts={Posts}>
        <Helmet>
          <title>{site.siteMetadata.title}</title>
          <meta name="description" content={site.siteMetadata.description} />
          {!site.siteMetadata.w3l_dom_key ? null : (
            <meta
              name="w3l-domain-verification"
              content={site.siteMetadata.w3l_dom_key}
            />
          )}
        </Helmet>
        <CSSTransition in={inProp} timeout={10000} classNames="home-transition">
          {/** page content */}
          <div style={{ position: "relative" }}>
            <HeroHeader />
            <SectionBuilder Posts={Posts} />
          </div>
        </CSSTransition>
      </Layout>

      {/** spawns in threejs canvas (last item so content spawns in first) */}
      <CSSTransition in={inProp} timeout={10000} classNames="blog-transition">
        <ThreeComponent />
      </CSSTransition>
    </>
  );
};
// gatsy develop -H 192.168.0.1 -p 8000

export const pageQuery = graphql`
  query indexPageQuery {
    # here is the query we can call upon in our code by its name
    site {
      siteMetadata {
        title
        description
        w3l_dom_key
      }
    }
    # here is the query we can call upon in our code by its name
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`;
