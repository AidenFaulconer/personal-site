import {
  DefaultLoadingManager,
  Fog,
  Color,
  Mesh,
  Group,
  AmbientLight,
  MeshBasicMaterial,
  PlaneGeometry,
  DoubleSide,
  IcosahedronGeometry,
  MeshLambertMaterial,
  SpotLight,
  Vector3
} from "three";

// boiler plate setup
import * as SimplexNoise from "simplex-noise";
import View from "./js/components/view/View";
import threeConfig from "./js/config/threeConfig";
// other
// import Geometry from "./js/components/gameobject/geometry";
// import threeConfig from "./js/config/threeConfig.js";
// import Lighting from "./js/components/lighting/lighting";
// the view class contains the camera, render pipeline, and scene... TODO: abstract scene seperatly

// #region experience functions
export const noise = new SimplexNoise();

export const makeRoughGround = (mesh, distortionFr) => {
  mesh.geometry.vertices.forEach((vertex, i) => {
    // replace
    const amp = 2;
    const time = Date.now();
    const distance =
      (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) *
      distortionFr *
      amp;
    vertex.z = distance;
  });
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
};

export const makeRoughBall = (mesh, bassFr, treFr, r) => {
  if (typeof window !== "undefined")
    mesh.geometry.vertices.forEach(function(vertex, i) {
      const offset = mesh.geometry.parameters.radius;
      const amp = 9;
      const time = window.performance.now();
      vertex.normalize();
      const rf = 0.00001;
      const distance =
        offset +
        bassFr +
        noise.noise4D(
          vertex.x + time * rf * 7,
          vertex.y + time * rf * 8,
          vertex.z + time * rf * 9,
          r
        ) *
          amp *
          treFr;
      vertex.multiplyScalar(distance);
    });

  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
};

// some helper functions here
export const fractionate = (val, minVal, maxVal) =>
  (val - minVal) / (maxVal - minVal);

export const modulate = (val, minVal, maxVal, outMin, outMax) => {
  const fr = fractionate(val, minVal, maxVal);
  const delta = outMax - outMin;
  return outMin + fr * delta;
};

export const avg = arr => {
  const total = arr.reduce((sum, b) => sum + b);
  return total / arr.length;
};

export const max = arr => arr.reduce((a, b) => Math.max(a, b));

export const onchange = audio => {
  audio.classList.add("active");
  audio.src = URL
    .createObjectURL
    // require("../../../static/sounds/Kiiara - Whippin (feat. Felix Snow) [Official Video].mp3")
    ();
  audio.load();
  audio.play();
  play();
};
// #endregion experience functions

//   audio.addEventListener('canplay', function () {
//     play();
//   })  audio.src="https://thomasvanglabeke.github.io/SoundCity/assets/holy.mp3"
//    // Initialization of audio and analyser
// if (AudioContext) {
//     var audio = new Audio()
//     audio.crossOrigin = "anonymous";
//     audio.controls = false
//     audio.src = "https://thomasvanglabeke.github.io/SoundCity/assets/holy.mp3"
//     document.body.appendChild(audio)
// // Once the song is playable, the loader disappears and the init function start
// }

// create a threejs experience
export default class extends View {
  constructor(canvas) {
    super(canvas);
    if (typeof window !== "undefined") {
      window.AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.msAudioContext ||
        window.oAudioContext;
      // #region window
      this.audio = document.getElementById("audio");
      this.context = new AudioContext();
      this.analyser = this.context.createAnalyser();

      if (AudioContext) {
        // this.audio.crossOrigin = "anonymous";
        this.audio.loop = true;
        this.audio.muted = true; // must be enabled first
        // this.audio.autoplay = true;
        this.audio.src = `/sounds/Whippin.mp3`;
        this.audio.load();
        this.audio.play();

        console.log(this.analyser);
        this.analyser.connect(this.context.destination);
        this.analyser.fftSize = 512;
        const dataLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(dataLength);
        // this.audio = new Audio();

        this.src = this.context.createMediaElementSource(this.audio);
        this.src.connect(this.analyser);

        this.camera.position.set(0, 0, 100);
        this.camera.lookAt(this.scene.position);

        this.audio.addEventListener("canplay", () => {
          this.audioEnabled = true;
        });
        // document.getElementById("out").appendChild(this.renderer.domElement);
      }
    }
    // #endregion window

    // #region scene
    this.group = new Group();
    this.planeGeometry = new PlaneGeometry(800, 800, 20, 20);
    this.planeMaterial = new MeshLambertMaterial({
      color: "#8CF2D9",
      side: DoubleSide,
      wireframe: true
    });

    // this.plane = new Mesh(this.planeGeometry, this.planeMaterial);
    // this.plane.rotation.x = -0.5 * Math.PI;
    // this.plane.position.set(0, 30, 0);
    // this.group.add(this.plane);

    this.plane2 = new Mesh(this.planeGeometry, this.planeMaterial);
    this.plane2.rotation.x = -0.5 * Math.PI;
    this.plane2.position.set(0, -30, 0);
    this.group.add(this.plane2);

    this.icosahedronGeometry = new IcosahedronGeometry(10, 4);
    this.lambertMaterial = new MeshLambertMaterial({
      color: "#8CF2D9",
      wireframe: true
    });

    this.ball = new Mesh(this.icosahedronGeometry, this.lambertMaterial);
    this.ball.position.set(0, 0, 0);
    this.group.add(this.ball);

    this.ambientLight = new AmbientLight(0xaaaaaa);
    this.scene.add(this.ambientLight);

    this.spotLight = new SpotLight(0xffffff);
    this.spotLight.intensity = 0.9;
    this.spotLight.position.set(-10, 40, 20);
    this.spotLight.lookAt(this.ball);
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);

    this.scene.add(this.group);

    if (threeConfig.fog.isFog)
      this.scene.fog = new Fog(
        threeConfig.fog.color,
        threeConfig.fog.density,
        threeConfig.fog.far
      );

    this.scene.background = new Color(threeConfig.background.color);
    // #endregion scene

    this.update();
  }

  update() {
    if (this.audioEnabled) {
      this.analyser.getByteFrequencyData(this.dataArray);

      const lowerHalfArray = this.dataArray.slice(
        0,
        this.dataArray.length / 2 - 1
      );
      const upperHalfArray = this.dataArray.slice(
        this.dataArray.length / 2 - 1,
        this.dataArray.length - 1
      );
      const overallAvg = avg(this.dataArray);

      const lowerMax = max(lowerHalfArray);
      const lowerMaxFr = lowerMax / lowerHalfArray.length / 2;

      const lowerAvg = avg(lowerHalfArray);
      const lowerAvgFr = lowerAvg / lowerHalfArray.length;

      const upperMax = max(upperHalfArray);
      const upperAvg = avg(upperHalfArray);
      const upperMaxFr = upperMax / upperHalfArray.length;

      const upperAvgFr = upperAvg / upperHalfArray.length;

      const r = Date.now() * 0.0005;
      // makeRoughGround(this.plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
      makeRoughGround(this.plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4));
      makeRoughBall(
        this.ball,
        modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
        modulate(upperAvgFr, 0, 1, 0, 3),
        r / 2
      );

      this.group.rotation.y += 0.0005;

      this.group.position.x = 5 * Math.cos(r);
      this.group.position.z = 5 * Math.sin(r);
      this.group.position.y = 5 * Math.sin(r);

      this.group.children[0].position.x = 70 * Math.cos(2 * r);
      this.group.children[0].position.z = 70 * Math.sin(r);
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.update.bind(this));
  }
}
