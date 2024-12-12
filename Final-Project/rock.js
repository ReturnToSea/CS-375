import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Rock {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.rock = null;

    this.loadModel();
  }

  loadModel() {
    this.loader.load('Models/rock.glb', (gltf) => {
      this.rock = gltf.scene;
      this.scene.add(this.rock);

      this.rock.scale.set(1.5, 1.5, 1.5);
      this.rock.position.set(-4.2, -8, -6.3);

      console.log("Rock model loaded");

    });
  }
}
