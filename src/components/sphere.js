/*
 * The Sphere component visualizes lng/lat coordinates with decreasing lines.
 *
 * A webgl sphere is "pinned" with lines that shrinks over time to
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

import React, {Component} from 'react';
import THREE from 'three';

export default class Sphere extends Component {
    constructor() {
        super();
        this.time = 0;
    }

    componentDidMount() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const container = document.getElementById('sphere-container');
        const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer();


        camera.position.z = 1000;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        container.appendChild(renderer.domElement);

        // Create Particles
        const material = new THREE.SpriteMaterial({
            color: 0xffffff
        });

        for (let i = 0; i < 1000; i += 1) {
            let particle = new THREE.Sprite(material);

            particle.position.x = Math.random() * 2 - 1;
            particle.position.y = Math.random() * 2 - 1;
            particle.position.z = Math.random() * 2 - 1;
            particle.position.normalize();
            particle.position.multiplyScalar(Math.random() * 10 + 450);
            particle.scale.multiplyScalar(1);
            scene.add(particle);
        }

        const animationLoop = () => {
            requestAnimationFrame(animationLoop);
            scene.rotation.y += 0.005;

            if (this.time % 100 === 0) {
                scene.remove(this.commits);
                this.commits = new THREE.Group();

                this.props.data.forEach(c => {
                    if (this.time - c.time < 0) {
                        return;
                    }

                    let lineLength =  1 - (this.time + c.time) / 5000.0;

                    if (lineLength < 0) {
                        return;
                    }

                    const geometry = new THREE.Geometry();
                    const vertex = this.calculateVector(c.lng, c.lat);

                    vertex.multiplyScalar(450);
                    geometry.vertices.push(vertex);

                    const vertex2 = vertex.clone();

                    vertex2.multiplyScalar(1 + lineLength);
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

        animationLoop();
    }

    // Translates longitude and latitude to a
    // Threejs vector3
    calculateVector(_lng, _lat) {
        const lat =  _lat * Math.PI / 180.0;
        const lng = -_lng * Math.PI / 180.0;

        return new THREE.Vector3(
            Math.cos(lat) * Math.cos(lng),
            Math.sin(lat),
            Math.cos(lat) * Math.sin(lng));
    }

    render() {
        return (<div id="sphere-container" />);
    }
}

Sphere.propTypes = {data: React.PropTypes.arrayOf(Object)};
