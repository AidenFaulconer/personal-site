import React, { useEffect, useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import TypeWriter from "./type-writer";

export default ({ typewriterText }) => {
  // type one text in the typwriter
  const [showText, setShowText] = useState("Let's boost your online presence");
  // keeps calling itself until the text is finished
  const typeWriter = (text, i, fnCallback) => {
    if (i < text.length) {
      // check if text isn't finished yet
      // console.warn(`${text.substring(0,i+1)} is the current letter rendering`);
      // re-render text
      setShowText(text.substring(0, i + 1));
      setTimeout(() => {
        // wait for a while and call this function again for next character
        typeWriter(text, i + 1, fnCallback);
      }, 70);
    } else if (typeof fnCallback === "function") {
      setTimeout(fnCallback, 200);
    } // call callback after timeout recursivly (HOW FAST IT TYPES)
  };
  const StartTextAnimation = i => {
    // start a typewriter animation for a text in the typewriterText array
    // check if typewriterText[i] exists
    if (typeof typewriterText[i] === "undefined") {
      setTimeout(() => {
        StartTextAnimation(0);
      }, 20000);
    } else {
      // console.warn(`running ${i < typewriterText[i].length} ${i} ${typewriterText[i].length} ${typewriterText[i]} `)
      // text exists! start typewriter animation
      typeWriter(typewriterText[i], 0, () => {
        StartTextAnimation(i + 1);
      }); // recursive call this for entirety of text
    }
    // after callback (and whole text has been animated), start next text
    if (i >= typewriterText.length) {
      console.warn("finished iteration");
    }
  };

  // component mounted, now we can query html in dom and modify it, load animation at index 0
  useEffect(() => {
    StartTextAnimation(0);
  }, []); // stop when typewriterText isnt changed

  return (
    <h2 className="typewriter">
      <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: showText }} />
    </h2>
  ); // text modified in funciton
};
