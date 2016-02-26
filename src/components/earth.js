/*
 * The Earth component visualizes lng/lat coordinates with decreasing lines.
 *
 * A webgl earth is "pinned" with lines that shrinks over time to
 * visualise the location of events and give a representation of when the
 * event happened by adjusting the length of the "pins".
 *
 * Takes an array of objects containing lng, lat and time.
 * The Time is expected to be in the unix time format.
 *
 * example props.data:
 *      [
 *          {lat: 56.878655, lng: 14.819965, time: 300},
 *          {lat: 54.242091, lng: 14.727779, time: 1020},
 *          {lat: 39.399872, lng: -8.224454, time: 824},
 *          {lat: 0, lng: 180, time: 404},
 *          {lat: 0, lng: 90, time: 5083},
 *          {lat: 0, lng: -90, time: 1204},
 *          {lat: 0, lng: 0, time: 10}
 *      ];
 */

import React, {Component} from "react";
import THREE from "three";
import Utils from "../utils/three-utils";

export default class Earth extends Component {
  constructor() {
    super();
    this.time = 0;
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const container = document.getElementById("earth-container");

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial();
    material.map = THREE.ImageUtils.loadTexture("assets/pictures/earth.jpg");

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    camera.position.z = 1;

    const renderAnimation = () => {
      requestAnimationFrame(renderAnimation);
      scene.rotation.y += 0.003;

      if (this.time % 100 === 0) {
        scene.remove(this.commits);
        this.commits = new THREE.Group();

        this.props.data.forEach(c => {
          if (this.time - c.time < 0) {
            return;
          }

          let lineLength = 1 - (this.time + c.time) / 5000.0;

          if (lineLength < 0) {
            return;
          }

          const geometry = new THREE.Geometry();
          const vertex = Utils.calculateVector(c.lng, c.lat);
          vertex.multiplyScalar(lineLength);

          geometry.vertices.push(vertex);

          const vertex2 = vertex.clone();

          vertex2.multiplyScalar(lineLength);
          geometry.vertices.push(vertex2);

          const line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({color: 0xffffff, opacity: 3})
            );

          this.commits.add(line);
        });
        scene.add(this.commits);
      }
      renderer.render(scene, camera);
      this.time += 1;
    };

    renderAnimation();
  }

  render() {
    return (<div id="earth-container" />);
  }
}

Earth.propTypes = {
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      lat: React.PropTypes.number,
      lng: React.PropTypes.number,
      time: React.PropTypes.number
    })).isRequired
};
