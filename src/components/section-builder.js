import React, { useState, useEffect } from "react";
import { StaticQuery, Link, graphql } from "gatsby";
// import ProjectViewer from "./project-viewer";

// TODO: add a contentID that refs a blog article, or find a better workaround here
// TODO: dont dangerously set inner html to avoid injeciton vunerabilities, write a script to pre-process it in nodejs rather than in react
export default React.memo(() => {
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
                styles={sectionStyles[sectionName]}
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
                <h2 className="title" attribute="title" key={`${title}-title`}>
                  {title}
                </h2>
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
            <h2 className="title" attribute="title">
              {title}
            </h2>
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
                  <h2 className="title" attribute="title">
                    {title}
                  </h2>
                  <h3
                    className="description"
                    attribute="description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
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
            <h2 className="title" attribute="title">
              {title}
            </h2>
            <h3 className="description" attribute="description">
              {description}
            </h3>
          </div>
        </article>
      );
    })}
  </div>
);

export const Contact = ({ data }) => (
  <div className="section__grid">
    {/** build cards from data */}
    {data.map(card => {
      const { title, value } = card;
      return (
        <article className="section__grid__card">
          <div className="card">
            <h2 className="title" attribute="title">
              {title}
            </h2>
            <h3 className="description" attribute="description">
              {value}
            </h3>
          </div>
        </article>
      );
    })}
  </div>
);

export const sectionStyles = {
  skills: { borderTop: "5px solid #F28C8C" },
  about: { borderTop: "5px solid #8CF2D9" },
  projects: { borderTop: "5px solid #A68CF2" },
  services: { borderTop: "5px solid #A68CF2" },
  contact: { borderTop: "5px solid #F2D08C" }
};

// ref components
export const sections = {
  projects: Projects,
  skills: Skills,
  about: About,
  services: Services,
  contact: Contact
};
