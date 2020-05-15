import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Clock,
  OrthographicCamera
} from "three";
// import * as dat from "dat.gui";
import threeConfig from "../../config/threeConfig";
import { Controls } from "../controls/controls";

// post processing
// import Composer from '@superguigui/wagner/src/Composer'
import ObjectPool from "../gameobject/objectpool";

// export const datGUIConfigure = () => {
//   const gui = new dat.GUI();
//   if (typeof window !== "undefined") {
//     const cam = gui.addFolder("Camera");
//     cam.add(options.camera, "speed", 0, 0.001).listen();
//     cam.add(camera.position, "y", 0, 100).listen();
//     cam.open();

//     const velocity = gui.addFolder("Velocity");
//     velocity
//       .add(options, "velx", -0.2, 0.2)
//       .name("X")
//       .listen();
//     velocity
//       .add(options, "vely", -0.2, 0.2)
//       .name("Y")
//       .listen();
//     velocity.open();

//     const box = gui.addFolder("Cube");
//     box
//       .add(cube.scale, "x", 0, 3)
//       .name("Width")
//       .listen();
//     box
//       .add(cube.scale, "y", 0, 3)
//       .name("Height")
//       .listen();
//     box
//       .add(cube.scale, "z", 0, 3)
//       .name("Length")
//       .listen();
//     box.add(cube.material, "wireframe").listen();
//     box.open();

//     gui.add(options, "stop");
//     gui.add(options, "reset");
//   }
// };

export default class {
  constructor(canvas) {
    this._canvas = canvas; // passed in from start of program if its decided we want a custom container
    this._winWidth = this._canvas.clientWidth;
    this._winHeight = this._canvas.clientHeight;
    this._updateCallbacks = [];
    // this._objectPool = new ObjectPool();

    // scene
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      antialias: false,
      preserveDrawingBuffer: true
    });

    // #region configuration
    if (typeof window !== "undefined") {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this._winWidth, this._winHeight, false);
      this.renderer.shadowMap.enabled = threeConfig.renderer.shadow.enabled;
      this.renderer.shadowMap.type = threeConfig.renderer.shadow.type;
      this._canvas.appendChild(this.renderer.domElement); // append threejs canvas to the canvas on the document
    }
    // #endregion

    // orthographic or perspective?
    if (threeConfig.isMobile && threeConfig.camera.mobile.orthographic) {
      this.camera = new OrthographicCamera(
        70,
        this._winWidth / this._winHeight,
        1,
        1000
      );
    } else if (threeConfig.camera.orthographic) {
      this.camera = new OrthographicCamera(
        70,
        this._winWidth / this._winHeight,
        1,
        1000
      );
    } else {
      this.camera = new PerspectiveCamera(
        threeConfig.camera.fov,
        this._winWidth / this._winHeight,
        threeConfig.isMobile
          ? threeConfig.camera.mobile.near
          : threeConfig.camera.near,
        threeConfig.isMobile
          ? threeConfig.camera.mobile.far
          : threeConfig.camera.far
      );
    }

    // camera config
    if (threeConfig.isMobile) {
      this.camera.aspect = threeConfig.camera.mobile.aspect;
      this.camera.position.x = threeConfig.camera.mobile.posX;
      this.camera.position.y = threeConfig.camera.mobile.posY;
      this.camera.position.z = threeConfig.camera.mobile.posZ;
      this.camera.rotateX(threeConfig.camera.mobile.rotX);
      this.camera.rotateY(threeConfig.camera.mobile.rotY);
      this.camera.rotateZ(threeConfig.camera.mobile.rotZ);
    } else {
      this.camera.aspect = threeConfig.camera.aspect;
      this.camera.position.x = threeConfig.camera.posX;
      this.camera.position.y = threeConfig.camera.posY;
      this.camera.position.z = threeConfig.camera.posZ;
      this.camera.rotateX(threeConfig.camera.rotX);
      this.camera.rotateY(threeConfig.camera.rotY);
      this.camera.rotateZ(threeConfig.camera.rotZ);
    }

    // #region post processing
    this._pixelRatio = this.renderer.getPixelRatio(); // used in postprocessing uniform values in shader
    this._passes = [];
    // this._composer = new Composer(this.renderer)// manager allowing piping in new passes to render pipeline
    // if (threeConfig.PostProcessing.enabled) this.enablePostProcessing();
    // else this.disablePostProcessing();
    // #endregion

    // #region event listeners
    if (typeof window !== "undefined")
      window.addEventListener("resize", this.onWindowResize.bind(this), false);
    // #endregion
  }

  // public
  enablePostProcessing() {
    for (const pass in threeConfig.PostProcessing.Types) {
      console.log(pass);
      this._passes.push(new threeConfig.PostProcessing.Types[pass]()); // new pass in pipeline to antialias in final render stages
    }
    this.onWindowResize(); // ensure resolution is set when we enable this shader
  }


  onWindowResize() {
    if (typeof window !== "undefined") {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  // onWindowResize(e) {
  //   // camera
  //   // const canvas = this.renderer.domElement.parentNode
  //   const width = this._canvas.clientWidth;
  //   const height = this._canvas.clientHeight;
  //   // adjust displayBuffer size to match
  //   if (width !== this._winWidth || height !== this._winHeight) {
  //     this._winHeight = height;
  //     this._winWidth = width;
  //     this.camera.aspect = width / height;// you must pass false here or three.js fights the browser
  //     this.camera.fov =
  //       (360 / Math.PI) * Math.atan(this._tanFov * (height / this._winHeight));
  //     this.camera.updateProjectionMatrix();
  //     // update render pipeline
  //     this.renderer.setSize(width, height, false);
  //     this.renderer.render(this.scene, this.camera);
  //     // this._composer.setSize(width, height)
  //     // update any render passes here
  //     // for(let i=0;i<this._passes.length;++i){
  //     //   this._passes[i]
  //     // }
  //   }
  //   this.update();
  // }
}

// import {
//   DefaultLoadingManager,
//   Fog,
//   Color,
//   Mesh,
//   Group,
//   AmbientLight,
//   MeshBasicMaterial,
//   PlaneGeometry,
//   DoubleSide,
//   IcosahedronGeometry,
//   MeshLambertMaterial,
//   SpotLight
// } from "three";

// // boiler plate setup
// import * as SimplexNoise from "simplex-noise";
// import View from "./js/components/view/View";
// // other
// // import Geometry from "./js/components/gameobject/geometry";
// // import threeConfig from "./js/config/threeConfig.js";
// // import Lighting from "./js/components/lighting/lighting";
// // the view class contains the camera, render pipeline, and scene... TODO: abstract scene seperatly

// // #region experience functions
// export const noise = new SimplexNoise();

// export const makeRoughGround = (mesh, distortionFr) => {
//   mesh.geometry.vertices.forEach((vertex, i) => {
//     // replace
//     const amp = 2;
//     const time = Date.now();
//     const distance =
//       (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) *
//       distortionFr *
//       amp;
//     vertex.z = distance;
//   });
//   mesh.geometry.verticesNeedUpdate = true;
//   mesh.geometry.normalsNeedUpdate = true;
//   mesh.geometry.computeVertexNormals();
//   mesh.geometry.computeFaceNormals();
// };

// export const makeRoughBall = (mesh, bassFr, treFr, r) => {
//   mesh.geometry.vertices.forEach(function(vertex, i) {
//     const offset = mesh.geometry.parameters.radius;
//     const amp = 9;
//     const time = window.performance.now();
//     vertex.normalize();
//     const rf = 0.00001;
//     const distance =
//       offset +
//       bassFr +
//       noise.noise4D(
//         vertex.x + time * rf * 7,
//         vertex.y + time * rf * 8,
//         vertex.z + time * rf * 9,
//         r
//       ) *
//         amp *
//         treFr;

//     vertex.multiplyScalar(distance);
//   });
//   mesh.geometry.verticesNeedUpdate = true;
//   mesh.geometry.normalsNeedUpdate = true;
//   mesh.geometry.computeVertexNormals();
//   mesh.geometry.computeFaceNormals();
// };

// // some helper functions here
// export const fractionate = (val, minVal, maxVal) =>
//   (val - minVal) / (maxVal - minVal);

// export const modulate = (val, minVal, maxVal, outMin, outMax) => {
//   const fr = fractionate(val, minVal, maxVal);
//   const delta = outMax - outMin;
//   return outMin + fr * delta;
// };

// export const avg = arr => {
//   const total = arr.reduce((sum, b) => sum + b);
//   return total / arr.length;
// };

// export const max = arr => arr.reduce((a, b) => Math.max(a, b));
// // TODO: Go through code and add naming convention __property for private object refrences
// // #endregion experience functions

// // create a threejs experience
// export default class extends View {
//   constructor(canvas) {
//     super(canvas);
//     // #region window

// document.body.addEventListener("touchend", function(ev) {
//   context.resume();
// });

//     // #endregion scene
//     this.dataArray;

//     // #region scene
//     this.group = new Group();
//     this.planeGeometry = new PlaneGeometry(800, 800, 20, 20);
//     this.planeMaterial = new MeshLambertMaterial({
//       color: 0x6904ce,
//       side: DoubleSide,
//       wireframe: false
//     });

//     this.plane = new Mesh(this.planeGeometry, this.planeMaterial);
//     this.plane.rotation.x = -0.5 * Math.PI;
//     this.plane.position.set(0, 30, 0);
//     this.group.add(this.plane);

//     this.plane2 = new Mesh(this.planeGeometry, this.planeMaterial);
//     this.plane2.rotation.x = -0.5 * Math.PI;
//     this.plane2.position.set(0, -30, 0);
//     this.group.add(this.plane2);

//     this.icosahedronGeometry = new IcosahedronGeometry(10, 4);
//     this.lambertMaterial = new MeshLambertMaterial({
//       color: 0xff00ee,
//       wireframe: true
//     });

//     this.ball = new Mesh(this.icosahedronGeometry, this.lambertMaterial);
//     this.ball.position.set(0, 0, 0);
//     this.group.add(this.ball);

//     this.ambientLight = new AmbientLight(0xaaaaaa);
//     this.scene.add(this.ambientLight);

//     this.spotLight = new SpotLight(0xffffff);
//     this.spotLight.intensity = 0.9;
//     this.spotLight.position.set(-10, 40, 20);
//     this.spotLight.lookAt(this.ball);
//     this.spotLight.castShadow = true;
//     this.scene.add(this.spotLight);

//     this.scene.add(this.group);
//     // #endregion scene

//     // #region base loading manager
//     this.update();
//   }

//   update() {
//     analyser.getByteFrequencyData(this.dataArray);

//     const lowerHalfArray = this.dataArray.slice(0, this.dataArray.length / 2 - 1);
//     const upperHalfArray = this.dataArray.slice(
//       this.dataArray.length / 2 - 1,
//       this.dataArray.length - 1
//     );

//     const overallAvg = avg(this.dataArray);
//     const lowerMax = max(lowerHalfArray);
//     const lowerAvg = avg(lowerHalfArray);
//     const upperMax = max(upperHalfArray);
//     const upperAvg = avg(upperHalfArray);

//     const lowerMaxFr = lowerMax / lowerHalfArray.length / 2;
//     const lowerAvgFr = lowerAvg / lowerHalfArray.length;
//     const upperMaxFr = upperMax / upperHalfArray.length;
//     const upperAvgFr = upperAvg / upperHalfArray.length;

//     makeRoughGround(this.plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
//     makeRoughGround(this.plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4));
//     const r = Date.now() * 0.0005;
//     makeRoughBall(
//       this.ball,
//       modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
//       modulate(upperAvgFr, 0, 1, 0, 3),
//       r / 2
//     );

//     this.group.rotation.y += 0.0005;

//     this.group.position.x = 5 * Math.cos(r);
//     this.group.position.z = 5 * Math.sin(r);
//     this.group.position.y = 5 * Math.sin(r);

//     this.group.children[0].position.x = 70 * Math.cos(2 * r);
//     this.group.children[0].position.z = 70 * Math.sin(r);

//     this.renderer.render(this.scene, this.camera);
//     requestAnimationFrame(this.update.bind(this));
//   }
// }
// // initialise simplex noise instance
