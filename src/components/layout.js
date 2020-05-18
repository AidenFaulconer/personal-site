import React, { useEffect, useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Navigation from "./navigation";
import "prismjs/themes/prism-okaidia.css";
import NavigationMenu from "./navigation-menu";
import AnalyticsComponent from "./analytics/analytics-component";
import LastListened from "./last-listened";
import { socialSvgs, logoSvg } from "../../static/svg/hardcoded-svgs";

// #region Social media links (on the right)
export const MediaLinks = () => (
  <div id="social-media-bar">
    <a href="https://www.instagram.com/aidenfaulconer/">
      <div
        dangerouslySetInnerHTML={{ __html: socialSvgs.instagram }}
        description="navigation icon, click me to navigate to a new section"
      />
    </a>
    <a href="https://www.linkedin.com/in/aiden-faulconer/">
      <div
        dangerouslySetInnerHTML={{ __html: socialSvgs.linkedin }}
        description="navigation icon, click me to navigate to a new section"
      />
    </a>
    <a href="https://github.com/AidenFaulconer">
      <div
        dangerouslySetInnerHTML={{ __html: socialSvgs.github }}
        description="navigation icon, click me to navigate to a new section"
      />
    </a>
  </div>
);
// #endregion Social media links (on the right)

// #region mobile menu
export const MobileMenu = () => {
  const [menu, toggleMenu] = useState(false);
  return (
    <>
      <button
        onClick={() => toggleMenu(!menu)}
        className={`hamburger hamburger--stand-r ${menu && "is-active"}`}
        type="button"
        aria-label="Menu"
        aria-controls="navigation"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
      {/** styled to overlay the entire view with content */}
      {menu && (
        <div className="mobile__menu__overlay" id="mobile__menu__overlay">
          <span>
            <a onClick={() => toggleMenu(!menu)} href="./#main">
              Main
            </a>
          </span>
          <span>
            <a onClick={() => toggleMenu(!menu)} href="./#projects">
              Projects
            </a>
          </span>
          <span>
            <a onClick={() => toggleMenu(!menu)} href="./#skills">
              Skills
            </a>
          </span>
          <span>
            <a onClick={() => toggleMenu(!menu)} href="./#about">
              About
            </a>
          </span>
          <span>
            <a onClick={() => toggleMenu(!menu)} href="./#services">
              Servies
            </a>
          </span>
          <span>
            <a onClick={() => toggleMenu(!menu)} href="./#contact">
              Contact
            </a>
          </span>
        </div>
      )}
    </>
  );
};
// #endregion mobile menu

// #region circular progress indicator
export const PageProgressIndicator = ({ progress, stroke, radius }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <svg height={radius * 2} width={radius * 2} id="progress-indicator">
        <circle
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </>
  );
};
// #endregion circular progress indicator

export default ({
  children,
  pageState,
  LeftPanelContent,
  RightPanelContent
}) => {
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
  );

  const [navMenu, toggleNavMenu] = useState(true);
  const [pageProgress, setPageProgress] = useState(0); // the initial state used in jsx

  useEffect(() => {
    toggleNavMenu(false);
  }, []);

  const LeftPanelComponent = LeftPanelContent;
  const RightPanelComponent = RightPanelContent;

  return (
    <>
      <AnalyticsComponent />

      <div
        className="site-wrapper"
        // style={pageState === "blog" ? { width: "85%" } : {}}
      >
        {/** burger icon in <MobileMenu/> its availiblity is controlled by scss breakpoints */}
        <MobileMenu />

        {/** site content resides here */}
        {children}
        {/** persistent footer at the bottom of every page */}

        <footer className="site-footer">
          <p>
            &copy; 2020 Aiden Faulconer &bull; Crafted with
{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>
{" "}
            by
{' '}
<a href="./">Aiden Faulconer</a>
          </p>
        </footer>
      </div>

      {/** main page left interactive panel */}
      <div className="panel left">
        <div className="branding">
          <div className="logo-container">
            <div
              className="logo"
              dangerouslySetInnerHTML={{ __html: logoSvg }}
            />
            <PageProgressIndicator
              radius={50} // in px
              progress={pageProgress}
              stroke={1}
            />
          </div>

          <header className="site-header">
            <Navigation />
          </header>
        </div>

        <NavigationMenu setPageProgress={setPageProgress} />
        <LeftPanelComponent />

        {pageState !== ".blog" && (
          <div className="panel right">
            <MediaLinks />
            <RightPanelComponent />
            {/**
            <div className="site-title">
              <Link to="/">{data.site.siteMetadata.title}</Link>
            </div>
             */}
          </div>
        )}
      </div>
    </>
  );
};
