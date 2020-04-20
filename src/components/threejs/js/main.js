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
    geometry.loadFromConfiguration(true, this._interactionHandler); // these objects lookat the mouse
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
    this._lighting.place(this._lighting.lightTypes.ambient);
    this._lighting.place(this._lighting.lightTypes.directional);
    const directional = this.scene.children[1]; // get reference to the direcitonal light

    const hemi = this.scene.children[2]; // get reference to the direcitonal light
    this._lighting.place(this._lighting.lightTypes.hemi);
    // this._updateCallbacks.push(() => {
    //   directional.position.x = 500 * Math.sin(Date.now() / 1240)
    //   directional.position.z = 500 * Math.cos(Date.now() / 1240)
    //   hemi.position.x = 500 * Math.sin(Date.now() / 240)
    //   hemi.position.z = 500 * Math.cos(Date.now() / 240)
    // })
    this._lighting.place(this._lighting.lightTypes.point);
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
        this._objectPool.getPool()[0].traverse(mesh => {
          // console.log(mesh)
          const thisMesh = mesh;
          let rad = 0;
          // new Object3D().position
          this._updateCallbacks.push(() => {
            rad > 0.001 ? (rad -= 0.0001) : (rad += 0.00001);
            thisMesh.rotation.y += rad;
          });
        });
      }, 2000);
    }
    // this._updateCallbacks.push(
    // () => console.log(this._camera.position))
    // #endregion
    this.update();
  }
}
