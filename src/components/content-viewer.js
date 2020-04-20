import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "gatsby";

const ContentViewer = ({ media, data }) => {
  // for animation
  const [inProp, setInProp] = useState(false);

  // for navigating content
  const [selectedType, setSelectedType] = useState("about");
  // const { about, objectives, results } = data;
  const content = {};

  // set the look for each textEmphasisStyle:
  useEffect(() => {
    ["about", "objective", "results"].map(contentType => {
      content.push();
    });
  }, []);

  return (
    <div>
      {/** content panel */}
      <CSSTransition>
        {["about", "objectives", "result"].map(type => (
          <div className="content__selection-bar">
            <button
              type="button"
              onClick={setSelectedType(type)}
              className={`${selectedType === contentType ? "active" : ""}`}
            >
              {contentType}
            </button>
          </div>
        ))}

        {/** contains the html */}
        <div className="content-viewer__content">
          <h1>{contentType}</h1>
          <h2
            dangerouslySetInnerHTML={{ __html: data[contentType].description }}
          />
        </div>

        <Link className="back" href="./" to="./">
          <svg />
          <h3>go back</h3>
        </Link>

        {/** TODO: make this a webgl slideshow and make more content for your project showcasing */}
        <div className="media-viewer">
          <video className="video-fluid" autoPlay loop muted playsInline>
            <source loading="lazy" src={media} type="video/mp4" />
          </video>
        </div>
      </CSSTransition>
      {/** content video panel */}
      <CSSTransition />
    </div>
  );
};

export default ContentViewer;
