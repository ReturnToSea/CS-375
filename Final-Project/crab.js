import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Crab {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.crab = null;
    this.mixer = null;

    this.direction = new THREE.Vector3(1, 0, 0); // Facing forward along X-axis (moving left/right)
    this.speed = 0.01; // Crab movement speed
    this.turnThreshold = 10; // Threshold to turn around (left/right)

    this.loadModel();
  }

  loadModel() {
    this.loader.load('Models/crab.glb', (gltf) => {
      this.crab = gltf.scene;
      this.scene.add(this.crab);

      // Initial rotation (Facing forward along X-axis)
      this.crab.rotation.y = 0; // No rotation needed, facing forward

      // Scale and position adjustments for the crab
      this.crab.scale.set(4, 4, 4); // Adjust scale to fit the crab size
      this.crab.position.set(-1, -7, 0); // Start at the center of the scene

      console.log("Crab model loaded");

      // Check if animations exist
      if (gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.crab);
        gltf.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });
      } else {
        console.log("No animations found for the crab.");
      }
    }, undefined, (error) => {
      console.error("Error loading the crab model", error);
    });
  }

  moveCrab() {
    if (this.crab) {
      // Move the crab left or right along the X-axis
      this.crab.position.x += this.direction.x * this.speed;

      // Turn around when reaching the threshold
      if (this.crab.position.x >= this.turnThreshold) {
        this.direction.x = -1; // Move left
      }
      if (this.crab.position.x <= -1) {
        this.direction.x = 1; // Move right
      }
    }
  }

  update(deltaTime) {
    if (this.crab) {
      // Update animation using deltaTime
      if (this.mixer) {
        this.mixer.update(deltaTime);
      }

      this.moveCrab();
    } else {
      console.log("Crab is not loaded yet.");
    }
  }
}
