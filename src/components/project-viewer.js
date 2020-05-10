import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "gatsby";

const ContentViewer = ({data, toggleProjectViewer}) => {

  const {media,etc} = data;

  // for animation
  const [inProp, setInProp] = useState(false);

  // for navigating content
  const [selectedType, setSelectedType] = useState("about");
  const [inProp, setInProp] = useState(false);
  const content = data;//mapp data into catagories

  // set the look for each textEmphasisStyle:
  useEffect(() => {

    setInProp(true);
    ["about", "objective", "results"].map(contentType => {
      content.push();
    });
  }, []);



  return (
    <div class="project-viewer">
      <CSSTransition in={inProp} timeout={10000} classNames="left-transition">
      {/** content panel */}
        {["about", "objectives", "result"].map(type => (
          <div className="project-viwer__bar">
          {selectedType}
          </div>
            <button
              type="button"
              onClick={setSelectedType(type)}
              className={`${selectedType === contentType ? "active" : ""}`}
            >
              {content[selectedType]}
            </button>
        ))}

        {/** contains the html */}
        <div className="project-viewer__content">
          <h1>{contentType}</h1>
          <h2
            dangerouslySetInnerHTML={{ __html: data[contentType].description }}
          />
        </div>

        <Link className="back" href="./" to="./" onclick={{toggleProjectViewer(false)}} >
          <svg />
          <h3>go back</h3>
        </Link>

        {/** TODO: make this a webgl slideshow and make more content for your project showcasing */}
      </CSSTransition>

      <CSSTransition in={inProp} timeout={10000} classNames="top-transition">
        <div className="media-viewer">
          <video className="video-fluid" autoPlay loop muted playsInline>
            <source loading="lazy" src={media} type="video/mp4" />
          </video>
        </div>
      </CSSTransition>
      {/** content video panel */}
    </div>
  );
};


export default ContentViewer;
