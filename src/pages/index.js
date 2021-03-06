import React, { useEffect, useState, useCallback, Suspense } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { CSSTransition } from "react-transition-group";
import Layout from "../components/layout";
import HeroHeader from "../components/heroHeader";
import SectionBuilder from "../components/section-builder";
import ThreeComponent from "../components/threejs/three-component";
import MainThreeJs from "../components/threejs/main-page";
// import LastListened from "../components/last-listened";
import Loading from "../components/loading";

// when ssr, wrap components using window with this to avoid undefined windowerrors
// TODO: add google analytics

export default ({
  // data is a global populated from our query
  data: { site }
}) => {
  const [inProp, setInProp] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // allow use of state outside react DOM
  const loadManager = useCallback(amnt => setLoadProgress(amnt));

  useEffect(() => {
    setInProp(true); // transition on component load

    if (typeof window !== "undefined") {
      if (window.localStorage.length >= 1) loadManager(1); // we have likley already cached the website on a previous visit
      window.onload = loadManager(1); // let DOM interact with React DOM
    }

    return () => {
      window.removeEventListener(onload, loadManager);
      setInProp(false);
    }; // called on component unmount
  }, []);

  return (
    <>
      <Loading loadProgress={loadProgress} />

      <Layout
        LeftPanelContent={() => <></>}
        RightPanelContent={() =>
          typeof window !== "undefined" && ( // suspense makes use of window, and accessing window isnt possible in nodejs enviornment
            <Suspense fallback={<audio id="audio" controls src="" />}>
              <audio id="audio" controls src="./sounds/Whippin.mp3" />
            </Suspense>
          )}
      >
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
        <CSSTransition in={inProp} timeout={10000} classNames="fade-transition">
          {/** page content */}
          <div style={{ position: "relative" }}>
            <HeroHeader />
            <SectionBuilder />
          </div>
        </CSSTransition>
      </Layout>

      {/** spawns in threejs canvas (last item so content spawns in first) */}
      <CSSTransition in={inProp} timeout={10000} classNames="right-transition">
        <ThreeComponent threeJsCanvas={MainThreeJs} />
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
