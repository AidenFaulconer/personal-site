import React, { useEffect, useState, useCallback } from "react";
import { StaticQuery, Link, graphql } from "gatsby";
import { CSSTransition } from "react-transition-group";
import PostLink from "./post-link";
// import ContentViewer from "./content-viewer";

const svgIcons = {
  left: `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
<g style="mix-blend-mode:color-dodge">
<path d="M50 25C50 20.0555 48.5338 15.222 45.7867 11.1107C43.0397 6.99951 39.1352 3.7952 34.5671 1.903C29.9989 0.0108147 24.9723 -0.484268 20.1227 0.480362C15.2732 1.44499 10.8186 3.82601 7.32233 7.32233C3.82602 10.8186 1.445 15.2732 0.48037 20.1227C-0.484261 24.9723 0.0108223 29.9989 1.90302 34.5671C3.7952 39.1352 6.99952 43.0397 11.1107 45.7867C15.222 48.5338 20.0555 50 25 50C28.283 50 31.5339 49.3534 34.5671 48.097C37.6002 46.8406 40.3562 44.9991 42.6777 42.6777C47.3661 37.9893 50 31.6304 50 25ZM20.35 34.225L13.2 26.725C13.0942 26.6165 13.0094 26.4894 12.95 26.35C12.8438 26.2324 12.7592 26.097 12.7 25.95C12.5677 25.6507 12.4994 25.3272 12.4994 25C12.4994 24.6728 12.5677 24.3492 12.7 24.05C12.819 23.7431 12.9974 23.4628 13.225 23.225L20.725 15.725C21.1958 15.2542 21.8342 14.9898 22.5 14.9898C23.1658 14.9898 23.8042 15.2542 24.275 15.725C24.7458 16.1958 25.0102 16.8342 25.0102 17.5C25.0102 18.1658 24.7458 18.8042 24.275 19.275L21.025 22.5H35C35.663 22.5 36.2989 22.7634 36.7678 23.2322C37.2366 23.7011 37.5 24.337 37.5 25C37.5 25.663 37.2366 26.2989 36.7678 26.7678C36.2989 27.2366 35.663 27.5 35 27.5H20.85L23.975 30.775C24.4325 31.2557 24.6803 31.8985 24.6639 32.5619C24.6475 33.2253 24.3682 33.855 23.8875 34.3125C23.4068 34.77 22.764 35.0178 22.1006 35.0014C21.4372 34.985 20.8075 34.7057 20.35 34.225Z""/>
</g>
</svg>
`,
  right: `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
<g style="mix-blend-mode:color-dodge">
<path d="M0 25C0 29.9445 1.46622 34.778 4.21326 38.8893C6.96029 43.0005 10.8648 46.2048 15.4329 48.097C20.0011 49.9892 25.0277 50.4843 29.8773 49.5196C34.7268 48.555 39.1814 46.174 42.6777 42.6777C46.174 39.1814 48.555 34.7268 49.5196 29.8773C50.4843 25.0277 49.9892 20.0011 48.097 15.4329C46.2048 10.8648 43.0005 6.9603 38.8893 4.21326C34.778 1.46622 29.9445 0 25 0C21.717 0 18.4661 0.646644 15.4329 1.90301C12.3998 3.15938 9.64379 5.00087 7.32233 7.32233C2.63392 12.0107 0 18.3696 0 25ZM29.65 15.775L36.8 23.275C36.9058 23.3835 36.9906 23.5106 37.05 23.65C37.1562 23.7676 37.2408 23.903 37.3 24.05C37.4323 24.3493 37.5006 24.6728 37.5006 25C37.5006 25.3272 37.4323 25.6508 37.3 25.95C37.181 26.2569 37.0026 26.5372 36.775 26.775L29.275 34.275C28.8042 34.7458 28.1658 35.0102 27.5 35.0102C26.8342 35.0102 26.1958 34.7458 25.725 34.275C25.2542 33.8042 24.9898 33.1658 24.9898 32.5C24.9898 31.8342 25.2542 31.1958 25.725 30.725L28.975 27.5H15C14.337 27.5 13.7011 27.2366 13.2322 26.7678C12.7634 26.2989 12.5 25.663 12.5 25C12.5 24.337 12.7634 23.7011 13.2322 23.2322C13.7011 22.7634 14.337 22.5 15 22.5H29.15L26.025 19.225C25.5675 18.7443 25.3197 18.1015 25.3361 17.4381C25.3525 16.7747 25.6318 16.145 26.1125 15.6875C26.5932 15.23 27.236 14.9822 27.8994 14.9986C28.5628 15.015 29.1925 15.2943 29.65 15.775Z"/>
</g>
</svg>
`,
  arrow: ``
};
export const postContainer = "blog__wrapper";

// TODO: add a contentID that refs a blog article, or find a better workaround here
// TODO: dont dangerously set inner html to avoid injeciton vunerabilities, write a script to pre-process it in nodejs rather than in react
export default React.memo(() => {
  const enableSidewayScrolling = useCallback(container => {
    const scrollHorizontally = e => {
      e = window.event || e;
      const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)) * 2;
      Object.keys(document.getElementsByClassName(container)).map(
        elem => (elements[elem].scrollLeft -= delta * 40)
      ); // Multiplied by 40
      e.preventDefault();
    };
    let elements = document.getElementsByClassName(container);
    if (elements.length > 0) {
      // IE9, Chrome, Safari, Opera
      Object.keys(elements).map(elem =>
        elements[elem].addEventListener("mousewheel", scrollHorizontally, false)
      );
      // Firefox
      Object.keys(elements).map(elem =>
        elements[elem].addEventListener(
          "DOMMouseScroll",
          scrollHorizontally,
          false
        )
      );
    } else {
      // IE 6/7/8
      Object.keys(elements).map(elem =>
        elements[elem]
          .getElementsByClassName(container)
          .attachEvent("onmousewheel", scrollHorizontally)
      );
    }
  });

  const clickDrag = useCallback(container => {
    const slider = document.getElementsByClassName(container);
    let isDown = false;
    let startX;
    let scrollLeft;
    Object.keys(slider).map(elem => {
      elem = slider[elem];

      elem.addEventListener("mousedown", e => {
        isDown = true;
        elem.classList.add("click-active");
        startX = e.pageX - elem.offsetLeft;
        scrollLeft = elem.scrollLeft;
      });
      elem.addEventListener("mouseleave", () => {
        isDown = false;
        elem.classList.remove("click-active");
      });
      elem.addEventListener("mouseup", () => {
        isDown = false;
        elem.classList.remove("click-active");
      });
      elem.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - elem.offsetLeft;
        const walk = (x - startX) * 3; // scroll-fast
        elem.scrollLeft = scrollLeft - walk;
      });
    });
  });

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
          site {
            siteMetadata {
              mainPageContent {
                projects {
                  model
                  title
                  mediaUrl
                  catagory
                  description
                  blog {
                    about
                    objectives
                    results
                  }
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
            const thisCatagory = edge.node.frontmatter.path.split("/")[1];
            if (catagoryMappings[thisCatagory])
              // push edge to array
              catagoryMappings[thisCatagory].push(edge);
            else catagoryMappings[thisCatagory] = []; // empty arrwy

            console.log(catagoryMappings);
          }))();

        console.log(catagoryMappings);
        // get catagories from path of blog, use those catagoreis to correspond to a component to handle it, iterate on all the posts of that catagory passing it to that component
        return Object.keys(catagoryMappings).map((catagory, i) => {
          // get posts
          const SectionComponent = sections[catagory]; // get tangible reference for react to dynamically generate a component from
          console.log(sections[catagory]);
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
                      timeout={2000}
                      classNames="home-transition"
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
  uiux: { fill: "white", color: "white", background: "#F28C8C" },
  "3d": { fill: "white", color: "white", background: "#8CF2D9" },
  workflow: { fill: "white", color: "white", background: "#A68CF2" },
  "data ": { fill: "white", color: "white", background: "#F2D08C" },
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
