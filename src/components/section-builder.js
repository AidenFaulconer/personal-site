import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createRef
} from "react";
import { StaticQuery, Link, graphql } from "gatsby";
// import ProjectViewer from "./project-viewer";

export const postContainer = "section__grid";

// TODO: add a contentID that refs a blog article, or find a better workaround here
// TODO: dont dangerously set inner html to avoid injeciton vunerabilities, write a script to pre-process it in nodejs rather than in react
export default React.memo(() => {
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
        // e.preventDefault()
        e.stopPropagation();
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
        query ProjectsQuery {
          site {
            siteMetadata {
              contentConfig {
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
                skills {
                  title
                  description
                  summaryPoints
                }
                about {
                  title
                  description
                  mediaUrl
                }
                services {
                  title
                  description
                }
                contact {
                  title
                  value
                }
              }
            }
          }
        }
      `}
      render={data =>
        Object.keys(sections).map((sectionName, i) => {
          const SectionComponent = sections[sectionName]; // get tangible reference for react to dynamically generate a component from
          return (
            <>
              <section
                id={sectionName}
                key={sectionName + i}
                style={{ background: i % 2 !== 0 ? "#201E2B" : "" }}
              >
                <div className="section__header" key={`${sectionName}-header`}>
                  <h1 data-aos="fade-up" key={`${sectionName}-h1`}>
                    {sectionName.toUpperCase()}
                  </h1>
                </div>
                <div
                  className="section__wrapper"
                  key={`${sectionName}-wrapper`}
                >
                  <SectionComponent
                    key={sectionName + i}
                    data={data.site.siteMetadata.contentConfig[sectionName]}
                  />
                </div>
                {/** i === Object.keys(sections).length && console.error('sections loaded') */}
              </section>
            </>
          );
        })
      }
    />
  );
});

export const Projects = ({ data }) => {
  const [viewProject, toggleProjectViewer] = useState(false);

  return (
    <div className="section__grid">
      {/** build cards from data */}
      {(viewProject && <></>) ||
        /** <SectionBuilder data={projectData} toggleProjectViewer={toggleProjectViewer} */
        data.map(card => {
          const { title, description, model, catagory, mediaUrl, post } = card;
          return (
            <article className="section__grid__projects" key={`${title}-grid`}>
              <div
                className="projects__card"
                key={`${title}-card`}
                // onClick={() => toggleProjectViewer(true)}
              >
                <p className="title" attribute="title" key={`${title}-title`}>
                  {title}
                </p>
                <h3
                  className="description"
                  attribute="description"
                  key={`${title}-description`}
                >
                  {description}
                </h3>
                <h3 className="catagory" key={`${title}-catabory`}>
                  {catagory}
                </h3>

                <div className="preview" key={`${title}-preview`}>
                  {(model && <></>) || (
                    <video
                      className="video-fluid"
                      autoPlay
                      loop
                      muted
                      playsInline
                      key={`${title}-video`}
                    >
                      <source loading="lazy" src={mediaUrl} type="video/mp4" />
                    </video>
                  )}
                </div>
              </div>
            </article>
          );
        })}
    </div>
  );
};

export const Skills = ({ data }) => (
  <div className="section__grid">
    {/** build cards from data */}
    {data.map(card => {
      const { title, description, summaryPoints } = card;
      return (
        <article className="section__grid__card">
          <div className="card">
            <p className="title" attribute="title">
              {title}
            </p>
            <h3
              className="description"
              attribute="description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <ul>
              {summaryPoints.map((point, i) => (
                <li className="summary__point" key={i}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </article>
      );
    })}
  </div>
);

export const About = ({ data }) => {
  return (
    <div className="section__grid">
      {/** build cards from data */}
      {data.map(card => {
        const { title, description, mediaUrl } = card; // we are receiving an object not an array like the others, build two cards
        return (
          <article className="section__grid__card">
            <div className="card">
              {(mediaUrl != "" && (
                <>
                  <img
                    alt="project preview "
                    src={
                      mediaUrl // spawn card for image
                    }
                  />
                </>
              )) || (
                // spawn card for details
                <>
                  <p className="title" attribute="title">
                    {title}
                  </p>

                  <ul>
                    <h3
                      className="description"
                      attribute="description"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </ul>
                </>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export const Services = ({ data }) => (
  <div className="section__grid">
    {/** build cards from data */}
    {data.map(card => {
      const { title, description } = card;
      // console.warn(card && description)
      return (
        <article className="section__grid__card">
          <div className="card">
            <p className="title" attribute="title">
              {title}
            </p>
            <ul>
              <h3 className="description" attribute="description">
                {description}
              </h3>
            </ul>
          </div>
        </article>
      );
    })}
  </div>
);

export const Contact = ({ data }) => {
  const [tooltipAlert, setTooltipAlert] = useState("Copy to clipboard");

  const copyText = useCallback(id => {
    const inputElem = document.getElementById(id);
    inputElem.select();
    inputElem.setSelectionRange(0, 99999);
    document.execCommand("copy");

    setTooltipAlert(`Copied: ${inputElem.value}`);
  });

  const tooltipExiit = useCallback(() => {
    setTooltipAlert("Copy to clipboard");
  });

  return (
    <div className="section__grid">
      {/** build cards from data */}
      {data.map(card => {
        const { title, value } = card;
        return (
          <article className="section__grid__card">
            <div className="card" style={{ textAlign: "center" }} key={title}>
              <h1 className="title" attribute="title">
                {title}
              </h1>
              <h3 className="description" attribute="description">
                <input type="text" value={value} id={value} />
              </h3>
              <ul>
                <li>
                  <a
                    style={{ color: "black" }}
                    type="button"
                    href={
                      title === "phone"
                        ? `tel:${value.trim()}`
                        : `mailto:${value}`
                    }
                  >
                    {" "}
                    {`${title} me`}
                  </a>
                </li>
                <div className="tooltip">
                  <span className="tooltiptext" key={value}>
                    {tooltipAlert}
                  </span>
                  <li>
                    <button
                      type="button"
                      onClick={() => copyText(value)}
                      onMouseOut={() => tooltipExiit()}
                    >
                      {" "}
                      Copy contact detail
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
};

// ref components
export const sections = {
  projects: React.memo(Projects),
  skills: React.memo(Skills),
  about: React.memo(About),
  services: React.memo(Services),
  contact: React.memo(Contact)
};
