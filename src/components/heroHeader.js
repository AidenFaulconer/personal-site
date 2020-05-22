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
        <div className="primary-content">
        <div className="headline">{data.site.siteMetadata.home.title}</div>
          <TypeWriter
            typewriterText={data.site.siteMetadata.contentConfig.description}
          />
        <Link to="#contact" className="button -primary">
          Get in touch &rarr;
        </Link>
        </div>
      </section>
    )}
  />
));
