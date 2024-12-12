import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Anchor {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.anchor = null;

    this.loadModel();
  }

  loadModel() {
    // Load the sunken anchor model (no animations)
    this.loader.load('Models/old_rusted_anchor.glb', (gltf) => {
    this.anchor = gltf.scene;
    this.scene.add(this.anchor);

    // Position and scale adjustments for the anchor
    this.anchor.scale.set(5, 5, 5); // Adjust scale as needed
    this.anchor.position.set(-9.8, -4.3, 5.2); // Position the anchor in the scene
    this.anchor.rotation.set(-.8,1.3,.7)
        
    console.log("Sunken anchor model loaded");

    });
    }
}
