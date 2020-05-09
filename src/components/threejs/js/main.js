import {
  // Mesh,
  // MeshPhysicalMaterial,
  // ShaderMaterial,
  // TextureLoader,
  // FogExp2,
  CubeTextureLoader,
  // Color,
  LinearFilter,
  DefaultLoadingManager,
  Fog,
  Color
} from "three";
// interaction (raycasting methods)
import Interaction from "./components/Interaction/Interaction";

// camera
import View from "./components/view/View"; // do not use {View} it will break...

// helpers
import Geometry from "./components/gameobject/geometry";

// web worker (70kib in build, avoid importing if possible)
// import Worker from './workers/file.worker.js'

// shaders
// import shaderVert from './shaders/custom.v ert'
// import shaderFrag from './shaders/custom.frag'

// data for initial scene
import threeConfig from "./config/threeConfig.js";
import Lighting from "./components/lighting/lighting";
// the view class contains the camera, render pipeline, and scene... TODO: abstract scene seperatly
// TODO: Go through code and add naming convention __property for private object refrences
export default class extends View {
  constructor(canvas) {
    // canvas div to pass into view
    super(canvas); // attribures to pass into the extended parent class (View)

    // base web workers
    // #region
    // webworkers to multithread any heavy or data realted computations
    // refrence: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
    // const worker = new Worker()
    // worker.postMessage({ a: 1 })
    // worker.addEventListener('message', function (event) {
    //   console.log(event)
    // })
    // #endregion

    // handle mobile
    // #region
    if (threeConfig.isMobile) {
      // delete unused objects
      // delete threeConfig.models.aidenobj
      // delete threeConfig.models.kangaroobj
      delete threeConfig.models.lionobj;
      delete threeConfig.models.backdropobj;
      // threeConfig.models.backdropobj[0].material[0].props[0].wireframe = false
    } else {
      // delete threeConfig.models.aidenobj
      delete threeConfig.models.backdropobj_mobile;
    }
    // #endregion

    // base loading manager
    // #region
    // feedback on this threejs context's loading progress
    DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log(
        "Loading: ",
        `${Math.floor((itemsLoaded / itemsTotal) * 100)}%`
      );
      // show progress in the text of the element
      // document.getElementById('loader-bar').style.width = Math.floor(itemsLoaded / itemsTotal * 100) + '%'
      // document.getElementById('loader-bar').innerText = Math.floor(itemsLoaded / itemsTotal * 100) + '%'
    };
    DefaultLoadingManager.onLoad = () => {
      console.log("loaded");
      // tell the window when we are done loading for threejs and apply new styles on the eventj
      // document.getElementById('loader').className += ' finished'
    };
    // #endregion

    // initialize scene event handler and interaction handler
    // #region event handler
    // TODO
    // scene interaction
    this._interactionHandler = new Interaction(
      this._camera,
      canvas,
      [],
      this._scene,
      this._objectPool
    );
    // #endregion

    // #region load objs from configuration
    const geometry = new Geometry(this._scene, this._objectPool);
    geometry.loadFromConfiguration(this._interactionHandler); // these objects lookat the mouse
    // #endregion

    // #region configure scene
    let backgroundEmpty;
    let background;
    if (threeConfig.isMobile) {
      backgroundEmpty = threeConfig.background.sceneBg.mobile[1];
      background = threeConfig.background.sceneBg.mobile[0];
    } else {
      backgroundEmpty = threeConfig.background.sceneBg.pc[1];
      background = threeConfig.background.sceneBg.pc[0];
    }
    if (threeConfig.background.enabled) {
      const texture = new CubeTextureLoader().load([
        backgroundEmpty,
        backgroundEmpty,
        backgroundEmpty,
        backgroundEmpty,
        backgroundEmpty,
        backgroundEmpty
      ]);
      texture.minFilter = LinearFilter;
      this._scene.background = texture;
    } else {
      this._scene.background = new Color(threeConfig.background.color);
    }
    threeConfig.fog.isFog
      ? (this._scene.fog = new Fog(
          threeConfig.fog.color,
          threeConfig.fog.density,
          threeConfig.fog.far
        ))
      : console.log("not rendering fog");
    // TODO: configure an enabled/disabled background
    // this._scene.background = new Color('#affafa');
    // #endregion

    // #region lights
    this._lighting = new Lighting(this._scene);
    this._lighting.place(this._lighting.lightTypes.directional);
    this._lighting.place(this._lighting.lightTypes.hemi);
    // #endregion

    // enable raycasting(mouse interaction)
    // #region
    // let raycastPlane = new Geometry(this._scene)
    // raycastPlane.make('plane', [0, -3, 0])(100, 100, 30)
    // raycastPlane.place([0, -2, -10], [0, 0, 0], threeConfig.materials.raycastPlane)
    // // #endregion

    // go through scene objects
    // https://stackoverflow.com/questions/38034816/how-to-move-and-rotate-imported-objects-in-three-js/38039394
    // #region
    if (threeConfig.isMobile) {
      setTimeout(() => {
        this._objectPool.getPool()[1].traverse(mesh => {
          const thisMesh = mesh;
          let rad = 0;
          thisMesh.children.map(subMesh =>
            this._updateCallbacks.push(() => {
              rad > 0.001 ? (rad -= 0.0001) : (rad += Math.random() * 0.0001);
              subMesh.rotation.x += rad;
            })
          );
        });
      }, 2000);
    }
    // this._updateCallbacks.push(
    // () => console.log(this._camera.position))
    // #endregion
    this.update();
  }
}

// https://experiments.withgoogle.com/experiments

// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
// import {BufferGeometryUtils} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/utils/BufferGeometryUtils.js';
// import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';

// function main() {
//   const canvas = document.querySelector('#c');
//   const renderer = new THREE.WebGLRenderer({canvas});

//   const fov = 60;
//   const aspect = 2;  // the canvas default
//   const near = 0.1;
//   const far = 10;
//   const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//   camera.position.z = 2.5;

//   const controls = new OrbitControls(camera, canvas);
//   controls.enableDamping = true;
//   controls.enablePan = false;
//   controls.minDistance = 1.2;
//   controls.maxDistance = 4;
//   controls.update();

//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color('black');

//   {
//     const loader = new THREE.TextureLoader();
//     const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/world.jpg', render);
//     const geometry = new THREE.SphereBufferGeometry(1, 64, 32);
//     const material = new THREE.MeshBasicMaterial({map: texture});
//     scene.add(new THREE.Mesh(geometry, material));
//   }

//   async function loadFile(url) {
//     const req = await fetch(url);
//     return req.text();
//   }

//   function parseData(text) {
//     const data = [];
//     const settings = {data};
//     let max;
//     let min;
//     // split into lines
//     text.split('\n').forEach((line) => {
//       // split the line by whitespace
//       const parts = line.trim().split(/\s+/);
//       if (parts.length === 2) {
//         // only 2 parts, must be a key/value pair
//         settings[parts[0]] = parseFloat(parts[1]);
//       } else if (parts.length > 2) {
//         // more than 2 parts, must be data
//         const values = parts.map((v) => {
//           const value = parseFloat(v);
//           if (value === settings.NODATA_value) {
//             return undefined;
//           }
//           max = Math.max(max === undefined ? value : max, value);
//           min = Math.min(min === undefined ? value : min, value);
//           return value;
//         });
//         data.push(values);
//       }
//     });
//     return Object.assign(settings, {min, max});
//   }

//   function addBoxes(file) {
//     const {min, max, data} = file;
//     const range = max - min;

//     // these helpers will make it easy to position the boxes
//     // We can rotate the lon helper on its Y axis to the longitude
//     const lonHelper = new THREE.Object3D();
//     scene.add(lonHelper);
//     // We rotate the latHelper on its X axis to the latitude
//     const latHelper = new THREE.Object3D();
//     lonHelper.add(latHelper);
//     // The position helper moves the object to the edge of the sphere
//     const positionHelper = new THREE.Object3D();
//     positionHelper.position.z = 1;
//     latHelper.add(positionHelper);
//     // Used to move the center of the cube so it scales from the position Z axis
//     const originHelper = new THREE.Object3D();
//     originHelper.position.z = 0.5;
//     positionHelper.add(originHelper);

//     const color = new THREE.Color();

//     const lonFudge = Math.PI * .5;
//     const latFudge = Math.PI * -0.135;
//     const geometries = [];
//     data.forEach((row, latNdx) => {
//       row.forEach((value, lonNdx) => {
//         if (value === undefined) {
//           return;
//         }
//         const amount = (value - min) / range;

//         const boxWidth = 1;
//         const boxHeight = 1;
//         const boxDepth = 1;
//         const geometry = new THREE.BoxBufferGeometry(boxWidth, boxHeight, boxDepth);

//         // adjust the helpers to point to the latitude and longitude
//         lonHelper.rotation.y = THREE.MathUtils.degToRad(lonNdx + file.xllcorner) + lonFudge;
//         latHelper.rotation.x = THREE.MathUtils.degToRad(latNdx + file.yllcorner) + latFudge;

//         // use the world matrix of the origin helper to
//         // position this geometry
//         positionHelper.scale.set(0.005, 0.005, THREE.MathUtils.lerp(0.01, 0.5, amount));
//         originHelper.updateWorldMatrix(true, false);
//         geometry.applyMatrix4(originHelper.matrixWorld);

//         // compute a color
//         const hue = THREE.MathUtils.lerp(0.7, 0.3, amount);
//         const saturation = 1;
//         const lightness = THREE.MathUtils.lerp(0.4, 1.0, amount);
//         color.setHSL(hue, saturation, lightness);
//         // get the colors as an array of values from 0 to 255
//         const rgb = color.toArray().map(v => v * 255);

//         // make an array to store colors for each vertex
//         const numVerts = geometry.getAttribute('position').count;
//         const itemSize = 3;  // r, g, b
//         const colors = new Uint8Array(itemSize * numVerts);

//         // copy the color into the colors array for each vertex
//         colors.forEach((v, ndx) => {
//           colors[ndx] = rgb[ndx % 3];
//         });

//         const normalized = true;
//         const colorAttrib = new THREE.BufferAttribute(colors, itemSize, normalized);
//         geometry.setAttribute('color', colorAttrib);

//         geometries.push(geometry);
//       });
//     });

//     const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
//         geometries, false);
//     const material = new THREE.MeshBasicMaterial({
//       vertexColors: THREE.VertexColors,
//     });
//     const mesh = new THREE.Mesh(mergedGeometry, material);
//     scene.add(mesh);
//   }

//   loadFile('https://threejsfundamentals.org/threejs/resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc')
//     .then(parseData)
//     .then(addBoxes)
//     .then(render);

//   function resizeRendererToDisplaySize(renderer) {
//     const canvas = renderer.domElement;
//     const width = canvas.clientWidth;
//     const height = canvas.clientHeight;
//     const needResize = canvas.width !== width || canvas.height !== height;
//     if (needResize) {
//       renderer.setSize(width, height, false);
//     }
//     return needResize;
//   }

//   let renderRequested = false;

//   function render() {
//     renderRequested = undefined;

//     if (resizeRendererToDisplaySize(renderer)) {
//       const canvas = renderer.domElement;
//       camera.aspect = canvas.clientWidth / canvas.clientHeight;
//       camera.updateProjectionMatrix();
//     }

//     controls.update();
//     renderer.render(scene, camera);
//   }
//   render();

//   function requestRenderIfNotRequested() {
//     if (!renderRequested) {
//       renderRequested = true;
//       requestAnimationFrame(render);
//     }
//   }

//   controls.addEventListener('change', requestRenderIfNotRequested);
//   window.addEventListener('resize', requestRenderIfNotRequested);
// }

// main();
