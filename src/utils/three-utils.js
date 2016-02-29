// Utility function for handling the three.js animations

import THREE from "three";

const ThreeUtils = {

  init(object) {
    const width = object.size ? object.size.width : window.innerWidth;
    const height = object.size ? object.size.height : window.innerHeight;

    object.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    object.renderer = this.renderer(width, height);
    object.scene = new THREE.Scene();
    object.time = 0;
  },

  width: null,
  height: null,

  // Translates longitude and latitude to a Threejs vector3
  calculateVector(_lng, _lat) {
    const lat = _lat * Math.PI / 180.0;
    const lng = -_lng * Math.PI / 180.0;

    return new THREE.Vector3(
      Math.cos(lat) * Math.cos(lng),
      Math.sin(lat),
      Math.cos(lat) * Math.sin(lng));
  },

  // Creates a new Webgl renderer and set the size
  renderer(width, height) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    return renderer;
  }
};

export default ThreeUtils;
