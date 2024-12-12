import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Orca {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.orca = null;
    this.mixer = null;

    this.direction = new THREE.Vector3(1, 0, 0); // Facing right initially
    this.speed = 0.007; // Swimming speed
    this.turnThreshold = 35; // Threshold to turn around

    this.loadModel();
  }

  loadModel() {
    this.loader.load('Models/female_orca.glb', (gltf) => {
      this.orca = gltf.scene;
      this.scene.add(this.orca);

      // Initial rotation (Facing right)
      this.orca.rotation.y = Math.PI / 2;

      // Scale and position adjustments for the orca
      this.orca.scale.set(0.2, 0.2, 0.2); // Adjust scale to fit the orca size
      this.orca.position.set(-13, 4, -5); // Start in the center of the scene

      console.log("Orca model loaded");

      // Check if animations exist
      if (gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.orca);
        gltf.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });
      } else {
        console.log("No animations found for the orca.");
      }
    }, undefined, (error) => {
      console.error("Error loading the orca model", error);
    });
  }

  moveOrca() {
    if (this.orca) {
      // Move the orca in the current direction (left or right)
      this.orca.position.x += this.direction.x * this.speed;

      // Turn around when reaching the threshold
      if (this.orca.position.x >= this.turnThreshold) {
        this.direction.x = -1; // Move left
        this.orca.rotation.y = -Math.PI / 2; // Face left
      }
      if (this.orca.position.x <= -this.turnThreshold) {
        this.direction.x = 1; // Move right
        this.orca.rotation.y = Math.PI / 2; // Face right
      }
    }
  }

  update(deltaTime) {
    if (this.orca) {
      // Update animation using deltaTime
      if (this.mixer) {
        this.mixer.update(deltaTime);
      }

      this.moveOrca();
    } else {
      console.log("Orca is not loaded yet.");
    }
  }
}
