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
import forEach from "lodash/forEach";

export default class Earth extends Component {
  constructor() {
    super();
    this.state = {time: null};
    Utils.init(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize.bind(this));

    const container = document.getElementById("earth-container");
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial();
    const earth = new THREE.Mesh(geometry, material);

    container.appendChild(this.renderer.domElement);
    material.map = THREE.ImageUtils.loadTexture("assets/pictures/earth.png");

    this.scene.add(earth);
    this.camera.position.z = 1.3;
    this.scene.rotation.x = 0.5;

    setTimeout(this.handleResize.bind(this));

    if (this.props.data) {
      this.startAnimation(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.startAnimation(nextProps);
  }

  componentWillUnmount() {
    this.endLoop = true;
    window.removeEventListener("resize", this.handleResize);
  }

  startAnimation(nextProps) {
    const time = nextProps.data[nextProps.data.length - 1].time;
    this.setState({time});

    const animationLoop = () => {
      if (this.endLoop) {
        return;
      }
      this.renderAnimation();
      setTimeout(() => {
        this.id = requestAnimationFrame(animationLoop);
      }, 1500 / 30);
    };

    animationLoop();
  }

  handleResize(e) {
    const container = document.getElementById("earth-container");
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setTime(time) {
    this.setState({time: time});
  }

  renderAnimation() {
    if (this.state.time === null) {
      return;
    }

    this.scene.rotation.y += 0.009;

    if (this.state.time % 1000 === 0) {
      this.scene.remove(this.commits);
      this.commits = new THREE.Group();

      forEach(this.props.data, commit => {
        this.visualizeCommit(commit, this.state.time);
      });
      this.scene.add(this.commits);
    }

    if (this.props.data && this.props.data[0].time + 1000 < this.state.time) {
      this.setState({time: this.props.data[this.props.data.length - 1].time});
      forEach(this.props.data, commit => {
        commit.distanceFromEarth = undefined;
      });
    }

    this.renderer.render(this.scene, this.camera);
    this.setState({time: this.state.time + 1000000});
  }

  visualizeCommit(commit, time) {
    if (time - commit.time < 0) {
      return;
    }

    if (commit.distanceFromEarth === undefined) {
      commit.distanceFromEarth = 0.98;
    }
    commit.distanceFromEarth -= 0.01;

    if (commit.distanceFromEarth < 0) {
      return;
    }

    const geometry = new THREE.Geometry();
    const vertex = Utils.calculateVector(commit.lng, commit.lat);
    vertex.multiplyScalar(commit.distanceFromEarth);

    geometry.vertices.push(vertex);

    const vertex2 = vertex.clone();

    vertex2.multiplyScalar(commit.distanceFromEarth);
    geometry.vertices.push(vertex2);

    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({color: 0xff0000, opacity: 3})
      );

    this.commits.add(line);
  }

  render() {
    return (
      <div id="earth-wrapper">
        <div id="earth-container" />
        <div id="time">
          <p>Commits @</p>
          {new Date(this.state.time).toISOString().substring(0, 10)}
        </div>
      </div>
    );
  }
}

Earth.propTypes = React.PropTypes.arrayOf(
    React.PropTypes.shape({
      lat: React.PropTypes.number,
      lng: React.PropTypes.number,
      time: React.PropTypes.number
    })).isRequired;
