import * as AOS from "aos";
import React, { useEffect, useRef, useState } from "react";
import Main from "./js/main";
import threeConfig from "./js/config/threeConfig";
// ANIMATE ON SCROLL
import "aos/dist/aos.css";
// dont use {main}
// import ExperienceManger from './js/components/experiencemanager/experiencemanager'
// import { MainVR } from './js/mainVR'

// threeComponent wrapper
export default React.memo(() => {
  const canvasRef = useRef(null);
  const [threeContext, setThreeContext] = useState(null);

  // componentDidMount
  useEffect(() => {
    // #region  detect mobile view and configure threejs
    // check the device type the user has. TODO: change configuration to optimize for mobile and tablet useage better
    if (typeof window !== "undefined" && threeContext == null) {
      (window.mobileAndTabletcheck = (function() {
        let check = false;
        (function(a) {
          if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
              a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              a.substr(0, 4)
            )
          )
            check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
      })())
        ? (threeConfig.isMobile = true)
        : console.log("configuring for desktop usage");
      setThreeContext(new Main(canvasRef.current)); // this is the deafult and reccomended entry for the experience, which is with vr off at default
      // #endregion

      // initialize AOS
      AOS.init({
        duration: 1200
      });

      window.addEventListener("close", () => setThreeContext(null)); // delete allocated memory for three.js https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Delete_in_strict_mode

      // oncomponent unmount
      return () => {
        setThreeContext(threeContext);
      }; // preserve context
    }
  }, []);

  useEffect(() => console.error("warning, reinitalizing canvas"), [
    threeContext
  ]);

  return <div ref={canvasRef} id="canvas" />;
});

// TODO: these are ideal expansions we can explore on this site or future sites
// material click ripple https://github.com/samthor/rippleJS
// see this guys shit https://codepen.io/jakob-e
// allow zoom in of photos https://github.com/sparanoid/lightense-images
// add mobile pushbar https://github.com/oncebot/pushbar.js
// add magnifying glass https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
// add a library of shaders for further configuration
// tilt hover https://tympanus.net/codrops/2016/11/23/tilt-hover-effects/
// add es6 post processing modules
// consider position aware css https://css-tricks.com/direction-aware-hover-effects/
// ass a vr manager to reconfigure and handle a change from vr to normality
// https://github.com/abberg/three-volumetric-light/blob/master/advanced/main.js
// add this effect: https://codepen.io/AlainBarrios/full/jOOKWNX
// water noise shader https://codepen.io/AlainBarrios/pen/NWKaxNW
// displacement map transition https://codepen.io/AlainBarrios/pen/NQWzzz
// interactive particles https://codepen.io/AlainBarrios/pen/PvazpL
// fullscreen transition https://codepen.io/AlainBarrios/pen/YbaroJ
// mouse filters https://codepen.io/AlainBarrios/pen/KjpLLg
// resize on mouse hover https://codepen.io/AlainBarrios/pen/JwdavW
// magnetic repulsion https://codepen.io/AlainBarrios/pen/gywPVx
// 3d carousel https://codepen.io/AlainBarrios/pen/qBBGjKE

// circular menu https://codepen.io/AlainBarrios/pen/pKwdQq
// file upload https://codepen.io/AlainBarrios/pen/XBoxee
// particle slider https://codepen.io/cjp/pen/MGwPMb
// image transition https://codepen.io/zadvorsky/pen/PNXbGo
// slider https://codepen.io/veronicadev/pen/yjgjvL

// https://codepen.io/clarklab/pen/ByWjxy
// slider https://codepen.io/ReGGae/pen/povjKxV?editors=0010

// AOS
// https://www.npmjs.com/package/aos

// https://github.com/lhbzr/bruno-arizio/