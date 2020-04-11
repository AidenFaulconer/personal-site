//#region infinite scroll
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
//#endregion infinite scroll

//#region interactive touch on carousel
// <div id="slider" class="slider">
//    <div class="wrapper">
//       <div id="items" class="items">
//       <span class="slide">Slide 1</span>
//       <span class="slide">Slide 2</span>
//       <span class="slide">Slide 3</span>
//       <span class="slide">Slide 4</span>
//       <span class="slide">Slide 5</span>
//       ...
//       </div>
//    </div>
//    <a id="prev" class="control prev"></a>
//    <a id="next" class="control next"></a>
// </div>

// var slider = document.getElementById('slider'),
//       sliderItems = document.getElementById('items'),
//       prev = document.getElementById('prev'),
//       next = document.getElementById('next');

// slide(slider, sliderItems, prev, next);

// function slide(wrapper, items, prev, next) {
//    var posX1 = 0,
//       posX2 = 0,
//       posInitial,
//       posFinal,
//       threshold = 100,
//       slides = items.getElementsByClassName('slide'),
//       slidesLength = slides.length,
//       slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
//       firstSlide = slides[0],
//       lastSlide = slides[slidesLength - 1],
//       cloneFirst = firstSlide.cloneNode(true),
//       cloneLast = lastSlide.cloneNode(true),
//       index = 0,
//       allowShift = true;

//    // Clone first and last slide
//    items.appendChild(cloneFirst);
//    items.insertBefore(cloneLast, firstSlide);
//    wrapper.classList.add('loaded');

//    // Mouse and Touch events
//    items.onmousedown = dragStart;

//    // Touch events
//    items.addEventListener('touchstart', dragStart);
//    items.addEventListener('touchend', dragEnd);
//    items.addEventListener('touchmove', dragAction);

//    // Click events
//    prev.addEventListener('click', function () { shiftSlide(-1) });
//    next.addEventListener('click', function () { shiftSlide(1) });

//    // Transition events
//    items.addEventListener('transitionend', checkIndex);

//    function dragStart (e) {
//       e = e || window.event;
//       e.preventDefault();
//       posInitial = items.offsetLeft;

//       if (e.type == 'touchstart') {
//       posX1 = e.touches[0].clientX;
//       } else {
//       posX1 = e.clientX;
//       document.onmouseup = dragEnd;
//       document.onmousemove = dragAction;
//       }
//    }

//    function dragAction (e) {
//       e = e || window.event;

//       if (e.type == 'touchmove') {
//       posX2 = posX1 - e.touches[0].clientX;
//       posX1 = e.touches[0].clientX;
//       } else {
//       posX2 = posX1 - e.clientX;
//       posX1 = e.clientX;
//       }
//       items.style.left = (items.offsetLeft - posX2) + "px";
//    }

//    function dragEnd (e) {
//       posFinal = items.offsetLeft;
//       if (posFinal - posInitial < -threshold) {
//       shiftSlide(1, 'drag');
//       } else if (posFinal - posInitial > threshold) {
//       shiftSlide(-1, 'drag');
//       } else {
//       items.style.left = (posInitial) + "px";
//       }

//       document.onmouseup = null;
//       document.onmousemove = null;
//    }

//    function shiftSlide(dir, action) {
//       items.classList.add('shifting');

//       if (allowShift) {
//       if (!action) { posInitial = items.offsetLeft; }

//       if (dir == 1) {
//          items.style.left = (posInitial - slideSize) + "px";
//          index++;
//       } else if (dir == -1) {
//          items.style.left = (posInitial + slideSize) + "px";
//          index--;
//       }
//       };

//       allowShift = false;
//    }

//    function checkIndex (){
//       items.classList.remove('shifting');

//       if (index == -1) {
//       items.style.left = -(slidesLength * slideSize) + "px";
//       index = slidesLength - 1;
//       }

//       if (index == slidesLength) {
//       items.style.left = -(1 * slideSize) + "px";
//       index = 0;
//       }

//       allowShift = true;
//    }
// }
//#end region interactive touch on carousel
