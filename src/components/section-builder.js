import React from "react";
import { StaticQuery, Link, graphql } from "gatsby";
// import ContentViewer from "./content-viewer";

// TODO: add a contentID that refs a blog article, or find a better workaround here
// TODO: dont dangerously set inner html to avoid injeciton vunerabilities, write a script to pre-process it in nodejs rather than in react
export default () => {
  return (
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
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
              <section id={sectionName} key={sectionName + i}>
                <div className="section__header">
                  <h1 data-aos="fade-up">{sectionName.toUpperCase()}</h1>
                  <h1 data-aos="fade-up">{++i}</h1>
                </div>
                <div className="section__wrapper">
                  <SectionComponent
                    key={sectionName + i}
                    data={data.site.siteMetadata.mainPageContent[sectionName]}
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
};

export const Projects = ({ data }) => (
  <div className="section__grid">
    {/** build cards from data */}
    {data.map(card => {
      const { title, description, model, catagory, mediaUrl, postPath } = card;
      return (
        <article className="section__grid__projects">
          <div className="projects__card">
            <h2 className="title" attribute="title">
              {title}
            </h2>
            <h3 className="description" attribute="description">
              {description}
            </h3>
            <h3 className="catagory">{catagory}</h3>

            {/** TODO: add articles for each project with a page transition
        <Link to={postPath}>
          <div className="cta">
            <p>see more</p>
          </div>
        </Link>
    */}

            <div className="preview">
              {(model && <></>) || (
                <video className="video-fluid" autoPlay loop muted playsInline>
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
              {summaryPoints.map(point => (
                <li className="summary__point">{point}</li>
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
            {(mediaUrl != "" && (
              <img
                alt="project preview "
                src={
                  mediaUrl // spawn card for image
                }
              />
            )) || ( // spawn card for details
              <div className="card">
                <h2 className="title" attribute="title">
                  {title}
                </h2>
                <h3
                  className="description"
                  attribute="description"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}
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

// ref components
export const sections = {
  projects: Projects,
  skills: Skills,
  about: About,
  services: Services,
  contact: Contact
};
