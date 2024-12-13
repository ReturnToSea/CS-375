import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Ship {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.ship = null;
        this.loadModel();
    }

    loadModel() {
        this.loader.load('Models/the_dalaro_wreck_bodekull.glb', (gltf) => {
        this.ship = gltf.scene;
        this.scene.add(this.ship);

        const woodColor = new THREE.Color(0xD2B48C);

        this.ship.traverse((child) => {
        if (child.isMesh) {
            child.material.color.set(woodColor);
            child.material.needsUpdate = true;
            }
        });

        this.ship.scale.set(30, 30, 30);
        this.ship.position.set(24, -6, -1);
        this.ship.rotation.set(0, 0, 0);

        Console.log("Ship model loaded");

    });
    }
}
