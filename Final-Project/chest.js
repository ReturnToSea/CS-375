import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class TreasureChest {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.chest = null;

    this.loadModel();
  }

  loadModel() {
    this.loader.load('Models/treasure_chest.glb', (gltf) => {
      this.chest = gltf.scene;
      this.scene.add(this.chest);

      this.chest.scale.set(2, 2, 2);
      this.chest.position.set(-15.5, -4.2, 3);
      this.chest.rotation.set(0, .7, 0);

      console.log("Treasure chest model loaded");

    });
  }

  // No animation or updates needed for a static model
  update() {
    // Can be used for any interaction or behavior
  }
}
