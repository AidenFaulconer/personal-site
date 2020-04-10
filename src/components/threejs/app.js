import Main from './js/main'// dont use {main}
import Detector from './js/utils/detector'
import threeConfig from './js/config/threeConfig'
// ANIMATE ON SCROLL
import * as AOS from 'aos'
import 'aos/dist/aos.css'
import contentConfig from '../../../static/admin/contentConfig'
// import ExperienceManger from './js/components/experiencemanager/experiencemanager'
// import { MainVR } from './js/mainVR'

const threeCanvas = () => {
  // #region  detect mobile view and configure threejs
  // check the device type the user has. TODO: change configuration to optimize for mobile and tablet useage
  (window.mobileAndTabletcheck = (function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera)
    return check
  }())) ? threeConfig.isMobile = true : console.log('configuring for desktop usage')

  // threeConfig.isMobile = true
  // Check for webGL capabilities and create the threejs canvas
  if (!Detector.webgl) {
    Detector.addGetWebGLMessage()
  } else {
    const canvas = document.getElementById('canvas')// TODO: dynamically render vr mode rather than have it fixed at start
    console.error(canvas)
    // TODO: expand the experience manager
    // new ExperienceManger()
    new Main(canvas) // this is the deafult and reccomended entry for the experience, which is with vr off at default
  }
  // #endregion

  // initialize AOS
  AOS.init({
    duration: contentConfig.technical.AOS.animDuration
  })
  // #region handle sizing for the pages sections (will be reconfigured when the window resizes)
  let sections = [
    document.getElementById('main'),
    document.getElementById('projects'),
    document.getElementById('skills'),
    document.getElementById('services'),
    document.getElementById('about'),
    document.getElementById('contact')
  ]
  // #endregion


window.addEventListener('close', () => Main = null)// delete allocated memory for three.js https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Delete_in_strict_mode
}
export {threeCanvas};

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

// measurement in threejs https://tympanus.net/codrops/2019/12/18/case-study-portfolio-of-bruno-arizio/
// const fov = THREEMath.degToRad(this.camera.fov);
// const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
// const width = height * this.camera.aspect;

// this.environment = {
//   height,
//   width
// };

// // createPlane()
// const { height, width } = this.environment;
// this.plane = new PlaneBufferGeometry(width * 0.75, height * 0.75, 100, 50);
// detect user position in scroll
// this.position.current += (this.scroll.values.target - this.position.current) * 0.1;
// if (this.position.current < this.position.previous) {
//   this.direction = "up";
// } else if (this.position.current > this.position.previous) {
//   this.direction = "down";
// } else {
//   this.direction = "none";
// }
// this.position.previous = this.position.current;

// infinite scroll
// check() {
//   const { height } = this.environment;
//   const heightTotal = height * this.covers.length;

//   if (this.position.current < this.position.previous) {
//     this.direction = "up";
//   } else if (this.position.current > this.position.previous) {
//     this.direction = "down";
//   } else {
//     this.direction = "none";
//   }

//   this.projects.forEach(child =>; {
//     child.isAbove = child.position.y > height;
//     child.isBelow = child.position.y < -height;

//     if (this.direction === "down" && child.isAbove) {
//       const position = child.location - heightTotal;

//       child.isAbove = false;
//       child.isBelow = true;

//       child.location = position;
//     }

//     if (this.direction === "up" && child.isBelow) {
//       const position = child.location + heightTotal;

//       child.isAbove = true;
//       child.isBelow = false;

//       child.location = position;
//     }

//     child.update(this.position.current);
//   });
// }

// interactive touch on carousel
// 01
// 	<div id="slider" class="slider">
// 02
// 	  <div class="wrapper">
// 03
// 	    <div id="items" class="items">
// 04
// 	      <span class="slide">Slide 1</span>
// 05
// 	      <span class="slide">Slide 2</span>
// 06
// 	      <span class="slide">Slide 3</span>
// 07
// 	      <span class="slide">Slide 4</span>
// 08
// 	      <span class="slide">Slide 5</span>
// 09
// 	      ...
// 10
// 	    </div>
// 11
// 	  </div>
// 12
// 	  <a id="prev" class="control prev"></a>
// 13
// 	  <a id="next" class="control next"></a>
// 14
// 	</div>

// The necessary CSS styles for the slider.
// 01
// 	.slider {
// 02
// 	  width: 300px;
// 03
// 	  height: 200px;
// 04
// 	}
// 05

// 06
// 	.wrapper {
// 07
// 	  overflow: hidden;
// 08
// 	  position: relative;
// 09
// 	  background: #222;
// 10
// 	  z-index: 1;
// 11
// 	}
// 12

// 13
// 	#items {
// 14
// 	  width: 10000px;
// 15
// 	  position: relative;
// 16
// 	  top: 0;
// 17
// 	  left: -300px;
// 18
// 	}
// 19

// 20
// 	#items.shifting {
// 21
// 	  transition: left .2s ease-out;
// 22
// 	}
// 23

// 24
// 	.slide {
// 25
// 	  width: 300px;
// 26
// 	  height: 200px;
// 27
// 	  cursor: pointer;
// 28
// 	  float: left;
// 29
// 	  display: flex;
// 30
// 	  flex-direction: column;
// 31
// 	  justify-content: center;
// 32
// 	  transition: all 1s;
// 33
// 	  position: relative;
// 34
// 	  background: #FFCF47;
// 35
// 	}

// Style the navigation controls.
// 01
// 	.control {
// 02
// 	  position: absolute;
// 03
// 	  top: 50%;
// 04
// 	  width: 40px;
// 05
// 	  height: 40px;
// 06
// 	  background: #fff;
// 07
// 	  border-radius: 20px;
// 08
// 	  margin-top: -20px;
// 09
// 	  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
// 10
// 	  z-index: 2;
// 11
// 	}
// 12

// 13
// 	.prev,
// 14
// 	.next {
// 15
// 	  background-size: 22px;
// 16
// 	  background-position: center;
// 17
// 	  background-repeat: no-repeat;
// 18
// 	  cursor: pointer;
// 19
// 	}
// 20

// 21
// 	.prev {
// 22
// 	  background-image: url(ChevronLeft.png);
// 23
// 	  left: -20px;
// 24
// 	}
// 25

// 26
// 	.next {
// 27
// 	  background-image: url(ChevronRight-512.png);
// 28
// 	  right: -20px;
// 29
// 	}
// 30

// 31
// 	.prev:active,
// 32
// 	.next:active {
// 33
// 	  transform: scale(0.8);
// 34
// 	}

// The necessary JavaScript to activate the slider.
// 001
// 	var slider = document.getElementById('slider'),
// 002
// 	    sliderItems = document.getElementById('items'),
// 003
// 	    prev = document.getElementById('prev'),
// 004
// 	    next = document.getElementById('next');
// 005

// 006
// 	slide(slider, sliderItems, prev, next);
// 007

// 008
// 	function slide(wrapper, items, prev, next) {
// 009
// 	  var posX1 = 0,
// 010
// 	      posX2 = 0,
// 011
// 	      posInitial,
// 012
// 	      posFinal,
// 013
// 	      threshold = 100,
// 014
// 	      slides = items.getElementsByClassName('slide'),
// 015
// 	      slidesLength = slides.length,
// 016
// 	      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
// 017
// 	      firstSlide = slides[0],
// 018
// 	      lastSlide = slides[slidesLength - 1],
// 019
// 	      cloneFirst = firstSlide.cloneNode(true),
// 020
// 	      cloneLast = lastSlide.cloneNode(true),
// 021
// 	      index = 0,
// 022
// 	      allowShift = true;
// 023

// 024
// 	  // Clone first and last slide
// 025
// 	  items.appendChild(cloneFirst);
// 026
// 	  items.insertBefore(cloneLast, firstSlide);
// 027
// 	  wrapper.classList.add('loaded');
// 028

// 029
// 	  // Mouse and Touch events
// 030
// 	  items.onmousedown = dragStart;
// 031

// 032
// 	  // Touch events
// 033
// 	  items.addEventListener('touchstart', dragStart);
// 034
// 	  items.addEventListener('touchend', dragEnd);
// 035
// 	  items.addEventListener('touchmove', dragAction);
// 036

// 037
// 	  // Click events
// 038
// 	  prev.addEventListener('click', function () { shiftSlide(-1) });
// 039
// 	  next.addEventListener('click', function () { shiftSlide(1) });
// 040

// 041
// 	  // Transition events
// 042
// 	  items.addEventListener('transitionend', checkIndex);
// 043

// 044
// 	  function dragStart (e) {
// 045
// 	    e = e || window.event;
// 046
// 	    e.preventDefault();
// 047
// 	    posInitial = items.offsetLeft;
// 048

// 049
// 	    if (e.type == 'touchstart') {
// 050
// 	      posX1 = e.touches[0].clientX;
// 051
// 	    } else {
// 052
// 	      posX1 = e.clientX;
// 053
// 	      document.onmouseup = dragEnd;
// 054
// 	      document.onmousemove = dragAction;
// 055
// 	    }
// 056
// 	  }
// 057

// 058
// 	  function dragAction (e) {
// 059
// 	    e = e || window.event;
// 060

// 061
// 	    if (e.type == 'touchmove') {
// 062
// 	      posX2 = posX1 - e.touches[0].clientX;
// 063
// 	      posX1 = e.touches[0].clientX;
// 064
// 	    } else {
// 065
// 	      posX2 = posX1 - e.clientX;
// 066
// 	      posX1 = e.clientX;
// 067
// 	    }
// 068
// 	    items.style.left = (items.offsetLeft - posX2) + "px";
// 069
// 	  }
// 070

// 071
// 	  function dragEnd (e) {
// 072
// 	    posFinal = items.offsetLeft;
// 073
// 	    if (posFinal - posInitial < -threshold) {
// 074
// 	      shiftSlide(1, 'drag');
// 075
// 	    } else if (posFinal - posInitial > threshold) {
// 076
// 	      shiftSlide(-1, 'drag');
// 077
// 	    } else {
// 078
// 	      items.style.left = (posInitial) + "px";
// 079
// 	    }
// 080

// 081
// 	    document.onmouseup = null;
// 082
// 	    document.onmousemove = null;
// 083
// 	  }
// 084

// 085
// 	  function shiftSlide(dir, action) {
// 086
// 	    items.classList.add('shifting');
// 087

// 088
// 	    if (allowShift) {
// 089
// 	      if (!action) { posInitial = items.offsetLeft; }
// 090

// 091
// 	      if (dir == 1) {
// 092
// 	        items.style.left = (posInitial - slideSize) + "px";
// 093
// 	        index++;
// 094
// 	      } else if (dir == -1) {
// 095
// 	        items.style.left = (posInitial + slideSize) + "px";
// 096
// 	        index--;
// 097
// 	      }
// 098
// 	    };
// 099

// 100
// 	    allowShift = false;
// 101
// 	  }
// 102

// 103
// 	  function checkIndex (){
// 104
// 	    items.classList.remove('shifting');
// 105

// 106
// 	    if (index == -1) {
// 107
// 	      items.style.left = -(slidesLength * slideSize) + "px";
// 108
// 	      index = slidesLength - 1;
// 109
// 	    }
// 110

// 111
// 	    if (index == slidesLength) {
// 112
// 	      items.style.left = -(1 * slideSize) + "px";
// 113
// 	      index = 0;
// 114
// 	    }
// 115

// 116
// 	    allowShift = true;
// 117
// 	  }
// 118
// 	}



  // let documentGets = {
  //   navBar: document.getElementById('nav-bar'),
  //   logo: document.getElementById('logo'),
  //   rightBranding: document.getElementById('right-branding'),
  //   rightBrandingLabel: document.getElementById('right-branding').children.item(0),
  //   hover: document.getElementsByClassName('card-overlay'),
  //   media: document.getElementsByClassName('media'),
  //   mobileMenu: document.getElementById('mobile-menu'),
  //   mobileIcon: document.getElementById('nav-icon3'),
  //   mobilePages: document.getElementsByClassName('nav-bar__pages'),
  //   mainPageName: document.getElementById('name')
  // }

  // // #region values to calculate space each section takes for special naviagation
  // let offset = contentConfig.technical.scrollCheck.scrollOffset
  // let sectionOffsets = [
  //   -1,
  //   sections[0].clientHeight / 2, // its a tiny bit off, this makes the offset more correct
  //   sections[0].clientHeight + sections[1].clientHeight - offset,
  //   sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight - offset,
  //   sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight + sections[3].clientHeight - offset,
  //   sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight + sections[3].clientHeight + sections[4].clientHeight - offset
  // ]
  // // #endregion

  // // #region ellipse bar navigation
  // let ellipses = document.getElementsByName('ellipses')

  // let checkEllipses = () => {
  //   for (let i = 0; i < ellipses.length; ++i) {
  //     if (ellipses[i].checked) sections[i].scrollIntoView(true)
  //   }
  // }
  // // #endregion

  // // called when animation ends on parent container
  // // https://stackoverflow.com/questions/37402616/pass-click-event-to-an-element-underneath

  // // #region  z index fix for cards
  // // #endregion

  // // #region  mobile nav bar
  // let mobileMenuToggle = false
  // let toggleMenu = () => {
  //   mobileMenuToggle = !mobileMenuToggle
  //   mobileMenuToggle ? documentGets.mobileIcon.classList.add('open')
  //     : documentGets.mobileIcon.classList.remove('open')
  //   mobileMenuToggle ? documentGets.mobileMenu.classList.add('open')
  //     : documentGets.mobileMenu.classList.remove('open')
  //   console.log('test')
  // }
  // documentGets.mobileIcon.addEventListener('click', toggleMenu, false)
  // let mobilePages = documentGets.mobilePages
  // for (let i = 0; i < mobilePages.length; ++i) {
  //   mobilePages[i].addEventListener('click', toggleMenu, false)
  // }

  // // #endregion

  // // #region  adding event listeners
  // for (let i = 0; i < ellipses.length; ++i) {
  //   ellipses[i].addEventListener('click', checkEllipses, false)
  // }

  // // for (let i = 0; i < documentGets.hover.length; ++i) {
  // //   documentGets.hover[i].addEventListener('mouseover', zindexFixAnimEnd, false)
  // // }
  // // window events
  // window.onresize = function () { handleWindowResize() }
  // let handleWindowResize = () => {
  //   // just reset the section size calculations
  //   sectionOffsets = [
  //     -1,
  //     sections[0].clientHeight / 2, // its a tiny bit off, this makes the offset more correct
  //     sections[0].clientHeight + sections[1].clientHeight - offset,
  //     sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight - offset,
  //     sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight + sections[3].clientHeight - offset,
  //     sections[0].clientHeight + sections[1].clientHeight + sections[2].clientHeight + sections[3].clientHeight + sections[4].clientHeight - offset
  //   ]
  // }

  // let prevPos = 0

  // window.onscroll = function () { scrollFunction() }
  // let scrollFunction = () => {
  //   let currPos = document.body.scrollTop
  //   prevPos = currPos

  //   // only check if user moves more than 20px to reduce function calls
  //   if (curPos - prevPos > contentConfig.technical.scrollCheck.checkThreshold) {
  //     let currPos2 = document.documentElement.scrollTop

  //     if (currPos > 50 || currPos2 > 50) { // when we scroll past x we shrink the nav bar
  //       documentGets.logo.style.opacity = '0'
  //       documentGets.mainPageName.style.opacity = '0'
  //     } else {
  //       documentGets.mainPageName.style.opacity = '1'
  //       documentGets.logo.style.opacity = '1'
  //     }

  //     for (let i = 0; i < sectionOffsets.length; ++i) {
  //       if (currPos > sectionOffsets[i] || currPos2 > sectionOffsets[i]) {
  //         ellipses[i].checked = true
  //         sections[i].style.opacity = '1'
  //         // console.error('you are at: '+sections[i].id)
  //         // console.error(sections[i])
  //         documentGets.rightBrandingLabel.innerText = (i + 1)

  //         // style line on left based on our current section divided by the total sections
  //         documentGets.rightBranding.style.height = ((sectionOffsets[i] / sectionOffsets[sectionOffsets.length - 1]) * 100) + '%'
  //         i > 0 && i < sections.length
  //           ? documentGets.rightBranding.style.opacity = '1'
  //           : documentGets.rightBranding.style.opacity = '0'
  //       } else {
  //         sections[i].style.opacity = '0'// all elements fade into view, otherwise they fade out
  //       }
  //     }
  //   }
  // }
  // // #endregion