/*
 * The Earth component visualizes lng/lat coordinates with decreasing lines.
 *
 * Lines appear inte the space surrounding the earth and slowly
 * "lands" at the geo cords where the commit originated.
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
    Utils.init(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize.bind(this));

    const container = document.getElementById("earth-container");
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial();
    const earth = new THREE.Mesh(geometry, material);

    container.appendChild(this.renderer.domElement);
    material.map = THREE.ImageUtils.loadTexture("assets/pictures/earth.jpg");

    this.scene.add(earth);
    this.camera.position.z = 1;

    const animationLoop = () => {
      this.renderAnimation();
      requestAnimationFrame(animationLoop);
    };

    animationLoop();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize(e) {
    const container = document.getElementById("earth-container");
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  renderAnimation() {
    this.scene.rotation.y += 0.003;

    if (this.time % 100 === 0) {
      this.scene.remove(this.commits);
      this.commits = new THREE.Group();

      this.props.data.forEach(commit => {
        this.visualizeCommit(commit, this.time);
      });
      this.scene.add(this.commits);
    }
    this.renderer.render(this.scene, this.camera);
    this.time += 1;
  }

  visualizeCommit(commit, time) {
    if (time - commit.time < 0) {
      return;
    }
    const lineLength = 1 - (time + commit.time) / 5000.0;
    if (lineLength < 0) {
      return;
    }

    const geometry = new THREE.Geometry();
    const vertex = Utils.calculateVector(commit.lng, commit.lat);
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
  }

  render() {
    return (<div id="earth-container" refs="coolShit" />);
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
