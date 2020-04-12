import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Navigation from "../components/navigation"
import 'prismjs/themes/prism-okaidia.css';



export default ({Posts, children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="site-title">
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
        <Navigation />
      </header>
      {/**site content resides here*/}
      {children}
      {/**persistent footer at the bottom of every page*/}
      <footer className="site-footer">
        <p>&copy; 2020 Aiden Faulconer &bull; Crafted with <span role="img" aria-label="love">❤️</span> by <a href="./">Aiden Faulconer</a></p>
      </footer>
    </div>
  )
}