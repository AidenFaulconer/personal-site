import React, { useEffect, useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Navigation from "./navigation";
import "prismjs/themes/prism-okaidia.css";
import NavigationMenu from "./navigation-menu";
import AnalyticsComponent from "./analytics/analytics-component";
import LastListened from "./last-listened";
// #region loading wrapper to handle screen loading
// const LoadWrapper = ({}) => (
//   <div className="loader" id="loader">
//     <div className="lds-ring" id="lds-ring">
//       <img
//         alt="logo"
//         loading="lazy"
//         id="lds-ring__logo"
//         src="./img/logo.svg"
//         viewBox="0 0 10 10"
//         id="logo"
//       />
//       <label id="lds-ring__text">loading</label>
//       {/* ring segments */}
//       <div />
//       <div />
//       <div />
//       <div />
//       {/* ring segments */}
//     </div>
//     <div id="loader-bar" data="test" />
//   </div>
// );
// #endregion loading wrapper to handle screen loading

// #region hardcoded svgs

export const socialSvgs = {
  linkedin: `<svg width="29" height="25" viewBox="0 0 29 25"  xmlns="http://www.w3.org/2000/svg">
<path d="M5.86218 0C2.84681 0 0.378906 2.15758 0.378906 4.7939V19.6702C0.378906 22.3065 2.84675 24.4633 5.86218 24.4633H22.8777C25.8931 24.4633 28.3601 22.3065 28.3601 19.6702V4.7939C28.3601 2.15763 25.8931 0 22.8777 0H5.86218ZM7.2413 4.03694C8.68711 4.03694 9.57766 4.86676 9.60515 5.95754C9.60515 7.02424 8.68705 7.87738 7.21334 7.87738H7.18621C5.76792 7.87738 4.85122 7.02429 4.85122 5.95754C4.85122 4.86678 5.79567 4.03694 7.24128 4.03694H7.2413ZM19.7006 9.13513C22.4812 9.13513 24.5656 10.724 24.5656 14.1385V20.5127H20.3399V14.5659C20.3399 13.0715 19.7283 12.0519 18.1991 12.0519C17.0316 12.0519 16.3358 12.7391 16.0303 13.403C15.9187 13.6405 15.8912 13.9722 15.8912 14.3044V20.5127H11.6655C11.6655 20.5127 11.721 10.4389 11.6655 9.39583H15.8921V10.9701C16.4536 10.2126 17.4581 9.1351 19.7006 9.1351V9.13513ZM5.10048 9.39663H9.32617V20.5128H5.10048V9.39663V9.39663Z" />
</svg>
`,
  github: `<svg width="28" height="25" viewBox="0 0 28 25"  xmlns="http://www.w3.org/2000/svg">
<path d="M24.4675 0.0530396H3.25321C1.65611 0.0530396 0.360352 1.22285 0.360352 2.66471V21.817C0.360352 23.2588 1.65611 24.4286 3.25321 24.4286H24.4675C26.0646 24.4286 27.3604 23.2588 27.3604 21.817V2.66471C27.3604 1.22285 26.0646 0.0530396 24.4675 0.0530396ZM17.0726 20.9301C16.5664 21.0117 16.3795 20.7288 16.3795 20.4948C16.3795 20.201 16.3916 18.6993 16.3916 17.4859C16.3916 16.6371 16.0782 16.0985 15.7106 15.8156C17.9405 15.5925 20.2909 15.315 20.2909 11.8382C20.2909 10.8479 19.8992 10.3528 19.2604 9.71622C19.3628 9.48226 19.7063 8.5192 19.1579 7.26778C18.3202 7.03382 16.4037 8.24171 16.4037 8.24171C15.6081 8.0404 14.7463 7.93702 13.8965 7.93702C13.0467 7.93702 12.1849 8.0404 11.3894 8.24171C11.3894 8.24171 9.47285 7.03382 8.63513 7.26778C8.08669 8.51376 8.42419 9.47681 8.53267 9.71622C7.89383 10.3528 7.59249 10.8479 7.59249 11.8382C7.59249 15.2987 9.84049 15.5925 12.0704 15.8156C11.7811 16.0495 11.522 16.4521 11.4316 17.0289C10.859 17.2629 9.3945 17.6655 8.52062 16.2726C7.97218 15.4129 6.98379 15.3422 6.98379 15.3422C6.00745 15.3313 6.91749 15.8972 6.91749 15.8972C7.56839 16.1692 8.02642 17.2139 8.02642 17.2139C8.61102 18.8299 11.4075 18.2858 11.4075 18.2858C11.4075 19.0421 11.4195 20.2717 11.4195 20.4948C11.4195 20.7288 11.2387 21.0117 10.7264 20.9301C6.74874 19.7276 3.96437 16.3107 3.96437 12.317C3.96437 7.32219 8.19517 3.52982 13.7278 3.52982C19.2604 3.52982 23.7443 7.32219 23.7443 12.317C23.7503 16.3107 21.0503 19.7331 17.0726 20.9301ZM11.1604 17.6056C11.0458 17.6274 10.9374 17.5839 10.9253 17.5131C10.9133 17.4315 10.9916 17.3608 11.1061 17.339C11.2206 17.3281 11.3291 17.3717 11.3412 17.4424C11.3592 17.5131 11.2809 17.5839 11.1604 17.6056ZM10.5878 17.5567C10.5878 17.6274 10.4974 17.6873 10.3769 17.6873C10.2443 17.6981 10.1539 17.6383 10.1539 17.5567C10.1539 17.4859 10.2443 17.4261 10.3648 17.4261C10.4793 17.4152 10.5878 17.4751 10.5878 17.5567ZM9.76214 17.4968C9.73803 17.5675 9.61749 17.6002 9.51504 17.5675C9.40053 17.5458 9.32218 17.4642 9.34629 17.3934C9.3704 17.3227 9.49093 17.2901 9.59339 17.3118C9.71392 17.3445 9.79227 17.4261 9.76214 17.4968ZM9.02084 17.203C8.9666 17.2629 8.85209 17.252 8.76169 17.1704C8.67129 17.0996 8.64718 16.9962 8.70745 16.9473C8.76169 16.8874 8.8762 16.8983 8.9666 16.9799C9.04495 17.0507 9.07508 17.1595 9.02084 17.203ZM8.47241 16.7079C8.41816 16.7405 8.31571 16.7079 8.24941 16.6263C8.18312 16.5446 8.18312 16.4521 8.24941 16.4141C8.31571 16.3651 8.41816 16.4032 8.47241 16.4848C8.5387 16.5664 8.5387 16.6643 8.47241 16.7079V16.7079ZM8.08066 16.1801C8.02642 16.2291 7.93602 16.2019 7.86973 16.1475C7.80343 16.0767 7.79138 15.9951 7.84562 15.957C7.89986 15.908 7.99026 15.9353 8.05656 15.9897C8.12285 16.0604 8.13491 16.142 8.08066 16.1801ZM7.67687 15.7775C7.65276 15.8264 7.57441 15.8373 7.50812 15.7992C7.42977 15.7666 7.39361 15.7067 7.41772 15.6578C7.44182 15.6251 7.50812 15.6088 7.58647 15.636C7.66482 15.6741 7.70098 15.7339 7.67687 15.7775Z" />
</svg>
`,
  instagram: `<svg width="26" height="26" viewBox="0 0 26 26"  xmlns="http://www.w3.org/2000/svg">
<path d="M13.0002 8.83435C10.7064 8.83435 8.83453 10.7062 8.83453 13C8.83453 15.2937 10.7064 17.1656 13.0002 17.1656C15.2939 17.1656 17.1658 15.2937 17.1658 13C17.1658 10.7062 15.2939 8.83435 13.0002 8.83435ZM25.4939 13C25.4939 11.275 25.5095 9.5656 25.4127 7.84373C25.3158 5.84373 24.8595 4.06873 23.397 2.60623C21.9314 1.1406 20.1595 0.687477 18.1595 0.590602C16.4345 0.493727 14.7252 0.509352 13.0033 0.509352C11.2783 0.509352 9.5689 0.493727 7.84703 0.590602C5.84702 0.687477 4.07202 1.14373 2.60952 2.60623C1.1439 4.07185 0.690773 5.84373 0.593898 7.84373C0.497023 9.56873 0.512648 11.2781 0.512648 13C0.512648 14.7219 0.497023 16.4344 0.593898 18.1562C0.690773 20.1562 1.14702 21.9312 2.60952 23.3937C4.07515 24.8594 5.84702 25.3125 7.84703 25.4094C9.57203 25.5062 11.2814 25.4906 13.0033 25.4906C14.7283 25.4906 16.4377 25.5062 18.1595 25.4094C20.1595 25.3125 21.9345 24.8562 23.397 23.3937C24.8627 21.9281 25.3158 20.1562 25.4127 18.1562C25.5127 16.4344 25.4939 14.725 25.4939 13V13ZM13.0002 19.4094C9.45327 19.4094 6.59077 16.5469 6.59077 13C6.59077 9.4531 9.45327 6.5906 13.0002 6.5906C16.547 6.5906 19.4095 9.4531 19.4095 13C19.4095 16.5469 16.547 19.4094 13.0002 19.4094ZM19.672 7.82498C18.8439 7.82498 18.1752 7.15623 18.1752 6.3281C18.1752 5.49998 18.8439 4.83123 19.672 4.83123C20.5002 4.83123 21.1689 5.49998 21.1689 6.3281C21.1692 6.52474 21.1306 6.7195 21.0555 6.90122C20.9803 7.08294 20.8701 7.24806 20.731 7.3871C20.592 7.52615 20.4269 7.6364 20.2452 7.71154C20.0634 7.78668 19.8687 7.82522 19.672 7.82498V7.82498Z" />
</svg>
`
};
// #endregion hardcoded svgs

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

export const logoSvg = [
  `<svg width="60" height="52" viewBox="0 0 60 52"  xmlns="http://www.w3.org/2000/svg">
<path d="M50.2896 35.8431L43.2766 50.7547L34.7098 50.7944L43.1343 33.909" />
<path d="M37.8534 26.7798L25.6809 50.836L17.2677 50.875L34.159 17.8729" />
<path d="M31.6542 3.96509L9.32031 51.4757L0.964272 51.45L24.7164 0.311716L31.6542 3.96509Z" />
<path d="M30.9019 0.308364L39.313 15.1308C41.9265 19.1783 39.8338 23.1939 37.8349 26.7799L24.7168 0.336975L30.9019 0.308364Z" />
<path d="M43.0727 21.8555C41.0928 25.3878 38.8665 29.5829 40.8627 33.1146L51.0552 50.7365L59.4876 50.6975" />
</svg>
`
];

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

export default ({ Posts, children, pageState }) => {
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
              dangerouslySetInnerHTML={{ __html: logoSvg[0] }}
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
        {/** main page right interactive panel */}
        {pageState !== ".blog" && (
          <div className="panel right">
            <MediaLinks />
            <div className="site-title">
              <Link to="/">{data.site.siteMetadata.title}</Link>
            </div>
            {/** <LastListened /> */}
          </div>
        )}

        {/** page navigation panel */}
      </div>
    </>
  );
};
