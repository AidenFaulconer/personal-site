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
  Color,
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  MathUtils,
  BufferAttribute,
  Object3D,
  BoxBufferGeometry,
  VertexColors
} from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

// interaction (raycasting methods)
import Interaction from "./js/components/Interaction/Interaction";

// camera
import View from "./js/components/view/View"; // do not use {View} it will break...

// helpers
import Geometry from "./js/components/gameobject/geometry";

import { loadFile, parseData } from "./js/components/data/dataHandlers";

// web worker (70kib in build, avoid importing if possible)
// import Worker from './js/workers/file.worker.js'

// shaders
// import shaderVert from './js/shaders/custom.v ert'
// import shaderFrag from './js/shaders/custom.frag'

// data for initial scene
import threeConfig from "./js/config/threeConfig.js";
import Lighting from "./js/components/lighting/lighting";

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
      ); // show progress in the text of the element
      // document.getElementById('loader-bar').style.width = Math.floor(itemsLoaded / itemsTotal * 100) + '%'
      // document.getElementById('loader-bar').innerText = Math.floor(itemsLoaded / itemsTotal * 100) + '%'
    };
    DefaultLoadingManager.onLoad = () => {
      console.log("loaded"); // document.getElementById('loader').className += ' finished'
    };
    // #endregion

    // initialize scene event handler and interaction handler
    // #region event handler
    // TODO
    // scene interaction
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

    // const controls = new OrbitControls(camera, canvas);
    // controls.enableDamping = true;
    // controls.enablePan = false;
    // controls.minDistance = 1.2;
    // controls.maxDistance = 4;
    // controls.update();

    // #region load textures in
    const loader = new TextureLoader();
    const texture = loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/world.jpg"
    );
    const geometry = new SphereBufferGeometry(1, 64, 32);
    const material = new MeshBasicMaterial({ map: texture });
    this._scene.add(new Mesh(geometry, material));

    // #endregion load textures in

    loadFile(
      "https://threejsfundamentals.org/threejs/resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc"
    )
      .then(parseData)
      .then(file => {
        const { min, max, data } = file;
        const range = max - min;

        // these helpers will make it easy to position the boxes
        // We can rotate the lon helper on its Y axis to the longitude
        const lonHelper = new Object3D();
        this._scene.add(lonHelper);
        // We rotate the latHelper on its X axis to the latitude
        const latHelper = new Object3D();
        lonHelper.add(latHelper);
        // The position helper moves the object to the edge of the sphere
        const positionHelper = new Object3D();
        positionHelper.position.z = 1;
        latHelper.add(positionHelper);
        // Used to move the center of the cube so it scales from the position Z axis
        const originHelper = new Object3D();
        originHelper.position.z = 0.5;
        positionHelper.add(originHelper);

        const color = new Color();

        const lonFudge = Math.PI * 0.5;
        const latFudge = Math.PI * -0.135;
        const geometries = [];
        data.forEach((row, latNdx) => {
          row.forEach((value, lonNdx) => {
            if (value === undefined) {
              return;
            }
            const amount = (value - min) / range;

            const boxWidth = 1;
            const boxHeight = 1;
            const boxDepth = 1;
            const geometry = new BoxBufferGeometry(
              boxWidth,
              boxHeight,
              boxDepth
            );

            // adjust the helpers to point to the latitude and longitude
            lonHelper.rotation.y =
              MathUtils.degToRad(lonNdx + file.xllcorner) + lonFudge;
            latHelper.rotation.x =
              MathUtils.degToRad(latNdx + file.yllcorner) + latFudge;

            // use the world matrix of the origin helper to
            // position this geometry
            positionHelper.scale.set(
              0.005,
              0.005,
              MathUtils.lerp(0.01, 0.5, amount)
            );
            originHelper.updateWorldMatrix(true, false);
            geometry.applyMatrix4(originHelper.matrixWorld);

            // compute a color
            const hue = MathUtils.lerp(0.7, 0.3, amount);
            const saturation = 1;
            const lightness = MathUtils.lerp(0.4, 1.0, amount);
            color.setHSL(hue, saturation, lightness);
            // get the colors as an array of values from 0 to 255
            const rgb = color.toArray().map(v => v * 255);

            // make an array to store colors for each vertex
            const numVerts = geometry.getAttribute("position").count;
            const itemSize = 3; // r, g, b
            const colors = new Uint8Array(itemSize * numVerts);

            // copy the color into the colors array for each vertex
            colors.forEach((v, ndx) => {
              colors[ndx] = rgb[ndx % 3];
            });

            const normalized = true;
            const colorAttrib = new BufferAttribute(
              colors,
              itemSize,
              normalized
            );
            geometry.setAttribute("color", colorAttrib);

            geometries.push(geometry);
          });
        });

        const material = new MeshBasicMaterial({
          vertexColors: VertexColors
        });


        const mesh = new Mesh(geometries, material);
        this._scene.add(mesh);
      });

    // this._updateCallbacks.push(
    // () => console.log(this._camera.position))
    // #endregion
    this.update();
  }
}
