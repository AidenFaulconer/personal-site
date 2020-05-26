import React, { useEffect, useState, useCallback } from "react";
import { StaticQuery, Link, graphql } from "gatsby";
import { CSSTransition } from "react-transition-group";
import { blogSvgs } from "../../static/svg/hardcoded-svgs";
import clickDragUtil from "./util/click-drag";
import sideWaysScrollUtil from "./util/sideways-scroll";

export const postContainer = "blog__wrapper";

// TODO: add a contentID that refs a blog article, or find a better workaround here
// TODO: dont dangerously set inner html to avoid injeciton vunerabilities, write a script to pre-process it in nodejs rather than in react
export default React.memo(() => {
  const enableSidewayScrolling = useCallback(sideWaysScrollUtil);

  const clickDrag = useCallback(clickDragUtil);

  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    // enableSidewayScrolling(postContainer); // enable sideways scrolling
    clickDrag(postContainer);
    setInProp(true);
    return () => setInProp(false); // called on component unmount
  }, []);

  return (
    <StaticQuery
      query={graphql`
        query BlogQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
          ) {
            edges {
              node {
                id
                excerpt(pruneLength: 250)
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  path
                  title
                  thumbnail
                  metaDescription
                }
              }
            }
          }
        }
      `}
      render={data => {
        const catagoryMappings = {}; // holds all the catagories as per the PATH mappings in each blog post fetched

        (() =>
          data.allMarkdownRemark.edges.map(edge => {
            const thisCatagory = edge.node.frontmatter.path.split("/")[2];
            if (catagoryMappings[thisCatagory])
              // push edge to array
              catagoryMappings[thisCatagory].push(edge);
            else catagoryMappings[thisCatagory] = []; // empty arrwy
          }))();
        console.log(catagoryMappings);
        // get catagories from path of blog, use those catagoreis to correspond to a component to handle it, iterate on all the posts of that catagory passing it to that component
        return Object.keys(catagoryMappings).map((catagory, i) => {
          // get posts
          const SectionComponent = sections[catagory]; // get tangible reference for react to dynamically generate a component from
          return (
            <section
              id={catagory}
              key={catagory + i}
              style={sectionStyles[catagory]} // customize styling locally for each catagory oficially mapped out
            >
              <div className="blog__header">
                {/**    <button
                  onClick={() => ""}
                  key="left nav button"
                  dangerouslySetInnerHTML={{ __html: svgIcons.left }}
                  description="navigation icon, click me to navigate to a new section"
                />
                <button
                  onClick={() => ""}
                  key="right nav button"
                  dangerouslySetInnerHTML={{ __html: svgIcons.right }}
                  description="navigation icon, click me to navigate to a new section"
                /> */}
                {catagory.toUpperCase()}
              </div>
              <div className="blog__wrapper" id="blog__wrapper">
                {/** You can filter your posts based on some criteria */}
                {catagoryMappings[catagory]
                  .filter(edge => !!edge.node.frontmatter.date)
                  .map(edge => (
                    <CSSTransition
                      in={inProp}
                      timeout={1000}
                      classNames="left-transition"
                    >
                      <SectionComponent key={edge.node.id} post={edge.node} />
                    </CSSTransition>
                  ))}
              </div>
            </section>
          );
        });
      }}
    />
  );
});

export const UXUI = ({ post }) => (
  <article className="blog__post" key={Math.random()}>
    <Link to={post.frontmatter.path}>
      {!!post.frontmatter.thumbnail && (
        <img
          loading="lazy"
          key={post.frontmatter.thumbnail}
          src={post.frontmatter.thumbnail}
          alt={`${post.frontmatter.title}- Featured Shot`}
        />
      )}
    </Link>

    <header>
      <Link to={post.frontmatter.path} className="post__title">
        {post.frontmatter.title}
      </Link>
      <div className="post__meta">{post.frontmatter.date}</div>
    </header>
  </article>
);

export const ThreeD = ({ post }) => (
  <article className="blog__post">
    <Link to={post.frontmatter.path}>
      {!!post.frontmatter.thumbnail && (
        <img
          loading="lazy"
          src={post.frontmatter.thumbnail}
          alt={`${post.frontmatter.title}- Featured Shot`}
        />
      )}
    </Link>

    <header>
      <Link to={post.frontmatter.path} className="post__title">
        {post.frontmatter.title}
      </Link>
      <div className="post__meta">{post.frontmatter.date}</div>
    </header>
  </article>
);

export const sectionStyles = {
  uiux: { fill: "white", color: "#F28C8C", background: "#F28C8C" },
  "3d": { fill: "white", color: "#8CF2D9", background: "#8CF2D9" },
  workflow: { fill: "white", color: "#A68CF2", background: "#A68CF2" },
  "data ": { fill: "white", color: "#F2D08C", background: "#F2D08C" },
  "": {}
};
// #080515

// ref components
export const sections = {
  uiux: UXUI,
  "3d": ThreeD,
  workflow: ThreeD, // no special changes required, use the same component solution for now
  data: ThreeD, // no special changes required, use the same component solution for now
  "": ""
  //   "Software Development": SoftwareDevelopment,
  // "Artificial Intelligence": AI,
  // "3D": ThreeD,
  // "Data Science": DataScience
};
