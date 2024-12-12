import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Coral2 {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.coral = null;
    this.mixer = null;


    this.loadModel();
  }

  loadModel() {
    this.loader.load('Models/coral_piece.glb', (gltf) => {
      this.coral = gltf.scene;
      this.scene.add(this.coral);


      //scale and position
      this.coral.scale.set(0.5, 0.5, 0.5);
      this.coral.position.set(-10.5, -6, 7);
      this.coral.rotation.set(0, 0, 0);

    });
  }
}