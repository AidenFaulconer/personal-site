import React, { useState, useEffect, useCallback } from "react";

// #region hardcoded SVGS (will be replaced by a proper inline svg loader when i find one)
export const navSvgs = [
  `<svg width="51" height="46" viewBox="0 0 51 46" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4018 38.271C20.9541 38.271 21.4018 37.8232 21.4018 37.271V27.7897C21.4018 27.2374 21.8495 26.7897 22.4018 26.7897H28.8327C29.385 26.7897 29.8327 27.2374 29.8327 27.7897V37.271C29.8327 37.8232 30.2804 38.271 30.8327 38.271H39.3713C39.9236 38.271 40.3713 37.8232 40.3713 37.271V23.9626C40.3713 23.4103 40.819 22.9626 41.3713 22.9626H43.8902C44.8303 22.9626 45.2509 21.783 44.5229 21.1882L26.25 6.2576C25.8818 5.95676 25.3527 5.95676 24.9845 6.2576L6.71162 21.1882C5.98362 21.783 6.40424 22.9626 7.34435 22.9626H9.86321C10.4155 22.9626 10.8632 23.4103 10.8632 23.9626V37.271C10.8632 37.8232 11.3109 38.271 11.8632 38.271H20.4018Z" />
</svg>
`,
  `<svg width="51" height="47" viewBox="0 0 51 47" xmlns="http://www.w3.org/2000/svg">
<path d="M42.479 11.9637H26.006C25.756 11.9637 25.515 11.87 25.3306 11.7011L21.6885 8.36524C21.5041 8.19634 21.2631 8.10266 21.0131 8.10266H8.75548C6.41591 8.10266 4.54004 9.82083 4.54004 11.9637V35.1301C4.54004 36.1541 4.98416 37.1361 5.77471 37.8602C6.56526 38.5843 7.63748 38.9911 8.75548 38.9911H42.479C44.7975 38.9911 46.6945 37.2536 46.6945 35.1301V15.8248C46.6945 13.7012 44.7975 11.9637 42.479 11.9637ZM39.1488 26.4427L32.6253 32.5575C32.2403 32.9185 31.641 32.918 31.2565 32.5565L24.7531 26.4427C23.9732 25.7091 23.5095 24.7438 23.5095 23.6434C23.5095 21.4619 25.4065 19.6858 27.725 19.6858C28.8632 19.6858 29.9381 20.1299 30.7179 20.8635L31.2588 21.3674C31.6428 21.7252 32.2381 21.7252 32.6221 21.3675L33.184 20.8441C33.9428 20.1299 35.0177 19.6858 36.1559 19.6858C38.4744 19.6858 40.3713 21.4619 40.3713 23.6434C40.3713 24.7245 39.9076 25.7284 39.1488 26.4427Z" />
</svg>
`,
  `<svg width="51" height="49" viewBox="0 0 51 49" xmlns="http://www.w3.org/2000/svg">
<path d="M44.5868 26.2035C45.8514 26.2035 46.9053 26.5998 47.5376 27.3926C48.3807 28.1853 48.8022 29.1761 48.8022 30.167L31.9404 36.1123L17.1864 32.1488V14.3129H21.191L36.5774 19.6636C37.6313 20.06 38.2636 20.8527 38.2636 21.8436C38.2636 22.4381 38.0528 23.0327 37.6313 23.429C37.2097 23.8254 36.5774 24.2217 35.7343 24.2217H29.8327L26.2496 22.8345L25.6173 24.6181L29.8327 26.2035H44.5868V26.2035ZM4.54004 14.3129H12.9709V36.1123H4.54004V14.3129Z" />
</svg>
`,
  `<svg width="52" height="50" viewBox="0 0 52 50" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9497 45.2031H40.6997C43.0436 45.2031 44.9497 43.3717 44.9497 41.1198V12.5364C44.9497 10.2845 43.0436 8.45308 40.6997 8.45308H36.4497V4.36975H32.1997V8.45308H19.4497V4.36975H15.1997V8.45308H10.9497C8.60583 8.45308 6.69971 10.2845 6.69971 12.5364V41.1198C6.69971 43.3717 8.60583 45.2031 10.9497 45.2031ZM23.6997 37.8817L15.8223 30.3132L18.8271 27.4263L23.6997 32.1078L32.8223 23.343L35.8271 26.2299L23.6997 37.8817ZM10.9497 14.5781H40.6997V18.6614H10.9497V14.5781Z" />
</svg>
`,
  `<svg width="51" height="47" viewBox="0 0 51 47" xmlns="http://www.w3.org/2000/svg">
<path d="M27.7255 6.17334C19.7794 6.17334 13.3719 11.8964 12.9714 19.0939L8.92459 24.0021C8.41873 24.6035 8.92459 25.5735 9.80983 25.5735H12.9714V31.3936C12.9714 33.547 14.8473 35.2736 17.1869 35.2736H19.2946V41.0937H34.0486V31.995C39.0439 29.8222 42.4795 25.1855 42.4795 19.7535C42.4795 12.265 35.9034 6.17334 27.7255 6.17334ZM36.1564 17.4836C36.1564 20.4713 33.2899 22.8575 28.948 26.4853L27.7255 27.5135L26.503 26.4853C22.1611 22.8575 19.2946 20.4713 19.2946 17.4836C19.2946 15.1556 21.318 13.235 23.8473 13.2156H23.9316C25.3859 13.2156 26.777 13.817 27.7255 14.8258C28.6739 13.817 30.065 13.2156 31.5194 13.2156C34.0486 13.1962 36.1564 15.078 36.1564 17.406V17.4836V17.4836Z" />
</svg>`,
  `<svg width="51" height="48" viewBox="0 0 51 48" xmlns="http://www.w3.org/2000/svg">
<path d="M40.3715 6.15139H38.2638V2.2312H34.0483V6.15139H17.1866V2.2312H12.9711V6.15139H10.8634C9.74539 6.15139 8.67317 6.56441 7.88262 7.29959C7.09207 8.03477 6.64795 9.03188 6.64795 10.0716V37.5129C6.64795 38.5526 7.09207 39.5497 7.88262 40.2849C8.67317 41.0201 9.74539 41.4331 10.8634 41.4331H40.3715C42.69 41.4331 44.5869 39.669 44.5869 37.5129V10.0716C44.5869 7.91548 42.69 6.15139 40.3715 6.15139ZM25.6174 12.0317C29.1163 12.0317 31.9406 14.6582 31.9406 17.912C31.9406 21.1657 29.1163 23.7922 25.6174 23.7922C22.1186 23.7922 19.2943 21.1657 19.2943 17.912C19.2943 14.6582 22.1186 12.0317 25.6174 12.0317ZM38.2638 35.5528H12.9711V33.5927C12.9711 29.6725 21.402 27.5164 25.6174 27.5164C29.8329 27.5164 38.2638 29.6725 38.2638 33.5927V35.5528Z" />
</svg>`
];

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
// #endregion hardcoded SVGS (will be replaced by a proper inline svg loader when i find one)

// #region circular progress indicator
export const PageProgressIndicator = ({ progress, stroke, radius }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div className="logo" dangerouslySetInnerHTML={{ __html: logoSvg[0] }} />
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

// #region the primary Navigation bar

// navigation menu
export default () => {
  // state & accompanying setter
  const [sections, setSections] = useState([]); // the initial state used in jsx
  const [pageProgress, setPageProgress] = useState(0); // the initial state used in jsx

  // #region local function state (not for use in jsx!!!)
  const offset = 0;
  let prevPosition = 0;
  let sectionCPY = [];
  let ellipses = [];
  let sectionBreakpoints = [];
  // #endregion local function state (not reliable for use in jsx!!!)

  // #region useCallback functions modifying local data (cannot be referenced in jsx)
  const checkEllipses = useCallback((currentSection = 0) => {
    ellipses.length < 1
      ? (ellipses = document.getElementsByName("ellipses"))
      : "";
    console.log(ellipses);
    ellipses[currentSection].checked = true;
    for (let i = currentSection; i < sections.length; ++i)
      if (ellipses[i].checked) sections[i][0].scrollIntoView(true);
    // sass logic handles the checked input box for us
  });
  // calculate section lengths on a 1:1 correspondence with the sections
  const measureSections = useCallback(() => {
    // if no value passed in, default to the react state held section list
    const newMeasurements = [0]; // first breakpoint is 0!
    sectionCPY
      .map(element => element[0].clientHeight) // get all the heights (in backward order)
      .reduce((accumulatedHeight, nextSectionHeight, i) => {
        // then reduce these to create a mapping of each sections height from the top of the page

        // push new measurement (first section breakpoint should be 0!)
        newMeasurements.push(accumulatedHeight - offset);

        return accumulatedHeight + nextSectionHeight; // keep accumulating
      });
    // set new measurements
    sectionBreakpoints = newMeasurements; // set the new measurements on this components state so it forces an update of the UI
  });

  const handleCurrentPosition = useCallback(() => {
    if (typeof window !== "undefined") {
      const thisPosition = window.scrollY;
    }
    const thisPageProgress =
      (thisPosition / sectionBreakpoints[sectionBreakpoints.length - 1]) * 100;
    setPageProgress(thisPageProgress > 100 ? 100 : thisPageProgress + 2.8);

    // console.warn(lineIndicatorHeight);
    if (
      thisPosition - prevPosition > 0 ||
      Math.abs(prevPosition - thisPosition) > 0
    ) {
      // we only handle every 30pixels we scroll down OR up to reduce overhead
      let currentSection;
      for (let i = 0; i <= sectionBreakpoints.length; ++i)
        if (
          thisPosition > sectionBreakpoints[i] ||
          thisPosition - sectionBreakpoints[i] > 0
        )
          currentSection = i;
      checkEllipses(currentSection);
      console.warn(`ellipse ${currentSection} selected`);
    }
    prevPosition = thisPosition; // now this position is the previous one
  });
  // #endregion functions modifying local data (cannot be referenced in jsx)

  // componentDidMount
  useEffect(() => {
    // #region get all the sections which will be used to determine the page height
    const documentGets = document.getElementsByTagName("section");
    sectionCPY = Object.keys(documentGets).map(elem => [documentGets[elem]]);
    setSections(
      [
        ...sections, // prevState
        ...sectionCPY // set initial section state for local functions
      ] /* newState */
    ); // set initial section state for jsx
    // #endregion get all the sections which will be used to determine the page height

    ellipses = document.getElementsByName("ellipses");
    console.log(`set ellipses ${ellipses}`);

    // #region attatch window events
    if (typeof window !== "undefined") {
      window.onresize = () => measureSections(); // recalculare section heights
      window.onscroll = () => handleCurrentPosition(); // handle logic for when we scroll
    }
    // #endregion window events

    // #region call initial window events
    measureSections(); // section state not accessible in this componentDidMount function call, use the local copy instead
    handleCurrentPosition();
    // #end region call initial window events
  }, []);

  // onScroll
  useEffect(() => {
    // console.error(pageProgress)
  }, [pageProgress]);

  // react jsx
  return (
    <>
      <PageProgressIndicator
        radius={50} // in px
        progress={pageProgress}
        stroke={1} // thickness
      />
      <nav className="ellipses-bar" id="ellipses-bar">
        <h3 className="ellipses__text">explore here</h3>
        {sections.map((sectionName, i) => (
          <input
            onClick={() => checkEllipses(i)}
            onChange={() => checkEllipses(i)}
            type="radio"
            name="ellipses"
            id={`ellipses-page__${i}`}
            checked={i === 0 && "checked"}
          />
        )) // sass logic handles which one is checked
        }
        <div id="slider">
          {sections.map((sectionName, i) => (
            <label key={`label${i}`} htmlFor={`ellipses-page__${i}`}>
              <span key={`text${i}`} className="slider-label">
                {sectionName[0].id}
              </span>
              <span key={`number${i}`} className="slider-number">
                {i}
              </span>
              <div
                key={`icon${i}`}
                dangerouslySetInnerHTML={{ __html: navSvgs[i] }}
                description="navigation icon, click me to navigate to a new section"
              />
            </label>
          ))}
        </div>
      </nav>
    </>
  );
};
// #endregion Ellipse Navigation bar
