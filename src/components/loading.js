import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { logoSvg } from "../../static/svg/hardcoded-svgs";

export default ({ loadProgress }) => {
  // if site cached, forget loading screen
  useEffect(() => {
    // if (win.length >= 0) loadProgress = 1;
  }, []);

  // useEffect(() => {}, loadProgress);

  return (
    !loadProgress >= 1 && (
      <CSSTransition
        in={loadProgress}
        timeout={1000}
        classNames="fade-transition"
      >
        <div
          className="loading"
          style={
            loadProgress >= 1
              ? setTimeout(
                  () => ({
                    display: "none",
                    visibility: "none",
                    zIndex: "-100"
                  }),
                  1000
                )
              : {}
          }
        >
          <div className="loading__content">
            <div
              className="loading-logo"
              dangerouslySetInnerHTML={{ __html: logoSvg }}
            />
            <circle />
            <circle />
            <circle />
            <circle />
            <circle />
            <p>loading</p>
          </div>
          {/**
          <p>{`loading ${progress}%`}</p>
           */}
        </div>
      </CSSTransition>
    )
  );
};
