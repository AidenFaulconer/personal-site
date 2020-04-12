import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            home {
              title
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
          <h3>{data.site.siteMetadata.home.description}</h3>
        </div>
        <Link to='/contact' className="button -primary">Get in touch &rarr;</Link>
      </section>
    )}
  />
)