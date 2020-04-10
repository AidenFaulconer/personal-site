import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostLink from '../components/post-link';
import HeroHeader from '../components/heroHeader';
import { threeCanvas } from '../components/threejs/app';

//loading wrapper to handle three.js assets
const LoadWrapper = ({}) => (
  <div className="loader" id="loader">
    <div className="lds-ring" id="lds-ring">
      <img alt='logo' loading="lazy" id="lds-ring__logo" src="./static/img/logoalt.svg" viewBox="0 0 10 10" id="logo" />
      <label id="lds-ring__text">loading</label>
      {/* ring segments */}
      <div />
      <div />
      <div />
      <div />
      {/* ring segments */}
    </div>
    <div id="loader-bar" data="test" />
  </div>
);

class ThreeComponent extends React.Component {
  componentDidMount(){
        threeCanvas()
  }
  render() {
    return (
     <>
       <div id='canvas'/>
     </>
    );
  }
}

const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
        {!site.siteMetadata.w3l_dom_key ? null : <meta name="w3l-domain-verification" content={site.siteMetadata.w3l_dom_key} />}
      </Helmet>
      {/** spawns in threejs canvas*/}
      <ThreeComponent/>
      {/** loadwrapper handled by threejs custom component */}
      <LoadWrapper />
      {/**page content */}
      <HeroHeader />
      <h2>Blog Posts &darr;</h2>
      <div className="grids">
        {Posts}
      </div>
    </Layout>
  );
};
export default IndexPage;

export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
        w3l_dom_key
      }
    }
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
