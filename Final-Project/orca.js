import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Orca {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.orca = null;
    this.mixer = null;

    this.direction = new THREE.Vector3(1, 0, 0);
    this.speed = 0.007;
    this.turnThreshold = 35;

    this.loadModel();
  }

  loadModel() {
    this.loader.load('Models/female_orca.glb', (gltf) => {
      this.orca = gltf.scene;
      this.scene.add(this.orca);

      this.orca.rotation.y = Math.PI / 2;

      this.orca.scale.set(0.2, 0.2, 0.2);
      this.orca.position.set(-13, 4, -5);

      console.log("Orca model loaded");

      if (gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.orca);
        gltf.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });
      }
    });
  }

  moveOrca() {
    if (this.orca) {
      this.orca.position.x += this.direction.x * this.speed;

      if (this.orca.position.x >= this.turnThreshold) {
        this.direction.x = -1;
        this.orca.rotation.y = -Math.PI / 2;
      }
      if (this.orca.position.x <= -this.turnThreshold) {
        this.direction.x = 1;
        this.orca.rotation.y = Math.PI / 2;
      }
    }
  }

  update(deltaTime) {
    if (this.orca) {
      if (this.mixer) {
        this.mixer.update(deltaTime);
      }

      this.moveOrca();
    } else {
      console.log("Orca is not loaded yet.");
    }
  }
}
