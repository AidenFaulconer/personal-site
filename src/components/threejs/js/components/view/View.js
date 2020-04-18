import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Clock,
  OrthographicCamera,
  Vector3
} from 'three'
import threeConfig from '../../config/threeConfig'
import { Controls } from '../controls/controls'
import Stats from 'stats-js/src/Stats'

// post processing
// import Composer from '@superguigui/wagner/src/Composer'
import ObjectPool from '../gameobject/objectpool'

class View {
  constructor (canvas) {
    // private
    // #region
    this._canvas = canvas// passed in from start of program if its decided we want a custom container

    // object pool
    this._objectPool = new ObjectPool()

    // stats
    if (threeConfig.isDev) this._stats = new Stats()

    // width and height of canvas container
    this._winWidth = this._canvas.clientWidth
    this._winHeight = this._canvas.clientHeight

    // update callbacks, looped through every update, allowing individual classes to implement own custom update methods
    this._updateCallbacks = []

    // scene
    this._scene = new Scene()

    // renderer (the render pipeline)
    this._renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: false })
    // #endregion

    // public
    // #region
    // deltatime
    this._clock = new Clock(true)
    this.deltaTime = this._clock.getDelta()
    // #endregion

    // configuration
    // #region
    // renderer configuration (no special mobile configuration yet)
    // #region
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(this._winWidth, this._winHeight, false)
    this._renderer.shadowMap.enabled = threeConfig.renderer.shadow.enabled
    this._renderer.shadowMap.type = threeConfig.renderer.shadow.type
    this._canvas.appendChild(this._renderer.domElement)// append threejs canvas to the canvas on the document
    // #endregion

    // camera
    // #region

    // orthographic or perspective?
    if (threeConfig.isMobile && threeConfig.camera.mobile.orthographic) {
      this._camera = new OrthographicCamera(70, this._winWidth / this._winHeight, 1, 1000)
    } else if (threeConfig.camera.orthographic) {
      this._camera = new OrthographicCamera(70, this._winWidth / this._winHeight, 1, 1000)
    } else {
      this._camera = new PerspectiveCamera(threeConfig.camera.fov, this._winWidth / this._winHeight,
        threeConfig.isMobile ? threeConfig.camera.mobile.near : threeConfig.camera.near,
        threeConfig.isMobile ? threeConfig.camera.mobile.far : threeConfig.camera.far
      )
    }

    // camera config
    if (threeConfig.isMobile) {
      this._camera.aspect = threeConfig.camera.mobile.aspect
      this._camera.position.x = threeConfig.camera.mobile.posX
      this._camera.position.y = threeConfig.camera.mobile.posY
      this._camera.position.z = threeConfig.camera.mobile.posZ
      this._camera.rotateX(threeConfig.camera.mobile.rotX)
      this._camera.rotateY(threeConfig.camera.mobile.rotY)
      this._camera.rotateZ(threeConfig.camera.mobile.rotZ)
    } else {
      this._camera.aspect = threeConfig.camera.aspect
      this._camera.position.x = threeConfig.camera.posX
      this._camera.position.y = threeConfig.camera.posY
      this._camera.position.z = threeConfig.camera.posZ
      this._camera.rotateX(threeConfig.camera.rotX)
      this._camera.rotateY(threeConfig.camera.rotY)
      this._camera.rotateZ(threeConfig.camera.rotZ)
    }

    // #endregion

    // field of view
    this._tanFov = Math.tan((Math.PI / 180) * this.camera.fov / 2)

    // camera controls (camera configuration happens in here)
    this._controls = new Controls(this._camera, this._renderer.domElement, [], this.scene)
    this._updateCallbacks.push(this._controls.update.bind(this._controls))
    if(this._updateCallbacks.length> 3) this._updateCallbacks = [];

    // #endregion

    // post processing
    // #region
    this._pixelRatio = this._renderer.getPixelRatio()// used in postprocessing uniform values in shader
    this._passes = []
    // this._composer = new Composer(this._renderer)// manager allowing piping in new passes to render pipeline
    threeConfig.PostProcessing.enabled ? this.enablePostProcessing() : console.log('disabled postprocessing')
    // #endregion

    // event listeners
    // #region
    window.addEventListener('resize', this.onWindowResize.bind(this), false)
    // #endregion
  }
  // private

  // public
  enablePostProcessing () {
    for (let pass in threeConfig.PostProcessing.Types) {
      console.log(pass)
      this._passes.push(new threeConfig.PostProcessing.Types[pass]())// new pass in pipeline to antialias in final render stages
    }
    this.onWindowResize()// ensure resolution is set when we enable this shader
  }
  disablePostProcessing () {
    for (i = 0; i < this._passes.length; ++i) {
      delete this._pass[i]// delete allocated memory from refrence
    }
    this.onWindowResize()// update frame to be without post processing passes
  }

  get renderer () {
    return this._renderer
  }

  get camera () {
    return this._camera
  }

  get scene () {
    return this._scene
  }

  onWindowResize (e) {
    // camera
    // const canvas = this._renderer.domElement.parentNode
    const width = this._canvas.clientWidth
    const height = this._canvas.clientHeight
    // adjust displayBuffer size to match
    if (width !== this._winWidth || height !== this._winHeight) {
      this._winHeight = height; this._winWidth = width
      // you must pass false here or three.js fights the browser
      this._camera.aspect = width / height
      this._camera.fov = (360 / Math.PI) * Math.atan(this._tanFov * (height / this._winHeight))
      this._camera.updateProjectionMatrix()
      // update render pipeline
      this._renderer.setSize(width, height, false)
      this._renderer.render(this._scene, this._camera)
      // this._composer.setSize(width, height)
      // update any render passes here
      // for(let i=0;i<this._passes.length;++i){
      //   this._passes[i]
      // }
    }
    this.update()
  }

  update (timestamp) {
    // call all update methods/routine dependencies from other objects
    let thisUpdate = this._updateCallbacks.length
    while (thisUpdate > 0) {
      this._updateCallbacks[thisUpdate - 1]()
      thisUpdate -= 1
    }

    // if (this._stats !== 'undefined') this._stats.begin()
    requestAnimationFrame(this.update.bind(this))
    this._renderer.render(this._scene, this._camera)
    // if (this._stats !== 'undefined') this._stats.end()
  }
}

export default View
