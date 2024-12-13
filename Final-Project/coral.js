import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Coral {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.coral = null;
        this.mixer = null;

        this.loadModel();
    }

    loadModel() {
        this.loader.load('Models/starfish__sarcophyton_-_agisoftnaturechallenge.glb', (gltf) => {
        this.coral = gltf.scene;
        this.scene.add(this.coral);

        this.coral.rotation.y = Math.PI / 2;

        this.coral.scale.set(0.2, 0.2, 0.2);
        this.coral.position.set(-11, -6, 1);
        this.coral.rotation.set(-0.1, 0.4, -0.25);

        this.coral.traverse((child) => {
            if (child.isMesh) {
            child.material.color.set(0x777777);
            }
        });
        });
    }
}
