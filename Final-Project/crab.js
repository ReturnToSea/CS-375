import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Crab {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.crab = null;
        this.mixer = null;

        this.direction = new THREE.Vector3(1, 0, 0);
        this.speed = 0.01;
        this.turnThreshold = 10;

        this.loadModel();
    }

    loadModel() {
        this.loader.load('Models/crab.glb', (gltf) => {
        this.crab = gltf.scene;
        this.scene.add(this.crab);

        this.crab.rotation.y = 0;

        this.crab.scale.set(4, 4, 4);
        this.crab.position.set(-1, -7, 1.5);

        console.log("Crab model loaded");

        if (gltf.animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(this.crab);
            gltf.animations.forEach((clip) => {
            this.mixer.clipAction(clip).play();
            });
        }
        });
    }

    moveCrab() {
        if (this.crab) {
        this.crab.position.x += this.direction.x * this.speed;

        if (this.crab.position.x >= this.turnThreshold) {
            this.direction.x = -1;
        }
        if (this.crab.position.x <= -1) {
            this.direction.x = 1;
        }
        }
    }

    update(deltaTime) {
        if (this.crab) {
        if (this.mixer) {
            this.mixer.update(deltaTime);
        }

        this.moveCrab();
        } else {
        console.log("Crab is not loaded yet.");
        }
    }
}
