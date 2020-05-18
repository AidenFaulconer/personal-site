import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { CSSTransition } from "react-transition-group";
import Layout from "./layout";
import ThreeComponent from "./threejs/three-component";
import coronaVisualization from "./threejs/corona-visualization";

export const relative = path => `../components/threejs/${path}`;

export default React.memo(
  ({
    data // data is a global populated from our query
  }) => {
    const {
      site: {
        siteMetadata: { contentConfig: visualizations } // go down the data hierarchy and get vislualizations
      }
    } = data;
    const [inProp, setInProp] = useState(false);
    const [enlargePost, setEnlargedPost] = useState(null);

    useEffect(() => {
      setInProp(true);
      setEnlargedPost(true);

      return () => setInProp(false); // called on component unmount
    }, []); // transition on component load

    return (
      <>
        <Layout
          LeftPanelContent={() => <></>}
          RightPanelContent={() => <></>}
          pageState="blog"
        >
          <Helmet />
          <CSSTransition
            in={inProp}
            timeout={1000}
            classNames="right-transition"
          >
            <div className="blog-main">{/** page content   */}</div>
          </CSSTransition>
        </Layout>

        {visualizations.visualizations.forEach(visualization => (
          <>
            <ThreeComponent threeJsCanvas={coronaVisualization} />
          </>
        ))}
      </>
    );
  }
);
// gatsy develop -H 192.168.0.1 -p 8000

// <title>{site.siteMetadata.title}</title>
// <meta name="description" content={site.siteMetadata.description} />
// {!site.siteMetadata.w3l_dom_key ? null : (
//   <meta
//     name="w3l-domain-verification"
//     content={site.siteMetadata.w3l_dom_key}
//   />
// )}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        contentConfig {
          visualizations {
            name
            about
            objectives
            results
          }
        }
      }
    }
  }
`;
