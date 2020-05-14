import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import TypeWriter from "./type-writer";

export default React.memo(() => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            home {
              title
              description
            }
            contentConfig {
              description
            }
          }
        }
      }
    `}
    render={data => (
      <section className="hero-header" id="main">
        <div className="headline">{data.site.siteMetadata.home.title}</div>
        <div className="primary-content">
          <TypeWriter
            typewriterText={data.site.siteMetadata.contentConfig.description}
          />
        </div>
        {/**
        <Link to="#contact" className="button -primary">
          Get in touch &rarr;
        </Link>
         */}
      </section>
    )}
  />
));
