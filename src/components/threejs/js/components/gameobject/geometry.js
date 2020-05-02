import {
  PlaneGeometry,
  SphereGeometry,
  CubeTextureLoader,
  Quaternion,
  Mesh,
  MeshPhysicalMaterial,
  ShaderMaterial,
  MeshPhongMaterial,
  BoxGeometry,
  LinearFilter,
  Vector3,
  Object3D
} from "three"; // when to use { } im imports depends on how each module is exported... https://stackoverflow.com/questions/48537180/difference-between-import-something-from-somelib-and-import-something-from
// import { obj } from 'three/examples/jsm/loaders/OBJLoader2Parallel'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { basename } from "path";
import Material from "./material";

import threeConfig from "../../config/threeConfig";
import ObjectPool from "./objectpool";

// handle filepaths
// const env = process.env.NODE_ENV === 'production' ? require('../../../../config/prod.env') : require('../../../../config/dev.env')
const modelPath = `${process.cwd()}/static/models/`;
const texturePath = `${process.cwd()}/static/img/`;

// for webpack filepath debugging

// This helper class can be used to create and then place geometry in the scene
// TODO: rework the control manager to be more generic with input
export default class Geometry {
  // two optional paramaters
  constructor(scene, objectpool = null) {
    // public
    // #region
    this._objectpool = objectpool; // TODO: abstract and rearchitect
    this._scene = scene;
    this.object = null; // assigned to later through methods, default is null TODO: restructure this scheme
    this.objLoader = new OBJLoader(); // refrence to an obj loader
    this.watchMouse.bind(this);
    this.data = [];
    // #endregion
  }

  // load objects from custom configuration (static)
  loadFromConfiguration(interactionHandler) {
    for (const modelName in threeConfig.models) {
      // load obj via local objloader instance
      const geometryInstance = new Geometry(this._scene);
      geometryInstance.objLoader.load(
        threeConfig.models[modelName][0].path,
        geometry => {
          // configure materials //TODO: abstract material creation from threeconfig
          let material;
          let fx;
          if (threeConfig.models[modelName][0].material) {
            const materialConfig = threeConfig.models[modelName][0].material;
            const materialProps = materialConfig[0].props[0];
            // fx = materialConfig[0]['props'][1].fx
            if (materialProps.envMap) {
              materialProps.envMap = new CubeTextureLoader().load(
                [
                  materialProps.envMap,
                  materialProps.envMap,
                  materialProps.envMap,
                  materialProps.envMap,
                  materialProps.envMap,
                  materialProps.envMap
                ].map(fileName => texturePath + fileName)
              );
              materialProps.envMap.minFilter = LinearFilter;
            }
            switch (materialConfig[0].type) {
              case "physical":
                material = new MeshPhysicalMaterial(materialProps);
                break;
              case "custom":
                material = new ShaderMaterial(materialProps);
                break;
              case "phong":
                material = new MeshPhongMaterial(materialProps);
                break;
              default:
                console.error(
                  "misconfigured material type, please use custom,phong or physical"
                );
                break;
            }
          }
          // append properties to submesh's / primary mesh
          if (geometry.children.length > 0) {
            geometry.traverse(childMesh => {
              // this will go through ALL children
              // add materials to all subobjects
              material
                ? (childMesh.material = material)
                : console.log("using default material");
              childMesh.scale.set(...threeConfig.models[modelName][0].scale);
              childMesh.position.set(
                ...threeConfig.models[modelName][0].position
              );
              // idenfity objects by their configured name (allow deletion and other useful methods in threejs)
              childMesh.name = modelName;
              // check for fx on object and append them to material
              // console.log(childMesh.geometry)
            });
          }
          geometryInstance.object = geometry;
          // bind the event handler to the instance while we pass it in (IMPORTANT OR WE WILL GET UNDEFINED BEHAVIOR IN OBJECT REFRENCE)
          if (threeConfig.models[modelName][0].interactive)
            interactionHandler.eventHandlers.push(
              geometryInstance.watchMouse.bind(geometryInstance)
            );
          // add the geometrys events to a event pool
          // console.log(geometryInstance)
          this._objectpool.addToPool(geometryInstance.object);
          geometryInstance._scene.add(geometryInstance.object);
        },
        // progress event
        () => {},
        // on error event
        err => {
          console.error(
            `obj loading failed: ${err} with path:${modelPath}${
              threeConfig.models[modelName][0].path
            } at directory ${basename(__dirname) + basename(__filename, ".js")}`
          );
        }
      );
    }
  }

  // custom object loading handling
  loadObj(url) {
    return func => {
      this.objLoader.load(url, func);
    };
  }

  // event handler that moves the mesh towards the 'target' specified
  watchMouse(target) {
    this.object.lookAt(...target);
  }

  // event handler that moves the mesh to position
  moveObject(position) {}

  // event handler that moves the mesh by the rotation amount (in quaternions)
  roateObject(quaternion) {}

  // for primitives (static)
  make(type) {
    if (type === "plane") {
      return (width, height, widthSegments = 1, heightSegments = 1) => {
        this.object = new PlaneGeometry(
          width,
          height,
          widthSegments,
          heightSegments
        );
      };
    }

    if (type === "sphere") {
      return (radius, widthSegments = 32, heightSegments = 32) => {
        this.object = new SphereGeometry(radius, widthSegments, heightSegments);
      };
    }
    if (type === "box") {
      return (
        width,
        height,
        depth,
        widthSegments = 32,
        heightSegments = 32,
        depthSegments
      ) => {
        this.object = new BoxGeometry(
          width,
          height,
          depth,
          widthSegments,
          heightSegments,
          depthSegments
        );
      };
    }
  }

  // static method to place objects
  place(position, rotation, material) {
    material
      ? console.log("using basic material")
      : (material = new Material("#1111a1").standard);
    const mesh = new Mesh(this.object, material);

    // Use ES6 spread to set position and rotation from passed in array
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);

    if (threeConfig.lighting.shadow.enabled) {
      mesh.receiveShadow = true;
    }

    this._scene.add(mesh);
  }
}
