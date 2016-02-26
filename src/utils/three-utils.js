// Utility function for handling the three.js animations

import THREE from "three";

let ThreeUtils = {

  // Translates longitude and latitude to a Threejs vector3
  calculateVector(_lng, _lat) {
    const lat = _lat * Math.PI / 180.0;
    const lng = -_lng * Math.PI / 180.0;

    return new THREE.Vector3(
      Math.cos(lat) * Math.cos(lng),
      Math.sin(lat),
      Math.cos(lat) * Math.sin(lng));
  }
};

export default ThreeUtils;
