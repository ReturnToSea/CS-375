import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

export class Fish {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.fish = null;
    this.mixer = null;

    this.direction = new THREE.Vector3(1, 0, 0); // Default direction (facing right)
    this.speed = 0.005; // Swimming speed
    this.rotationSpeed = 0.005; // Rotation speed

    this.targetRotation = Math.PI / 2; // Default facing direction (right)

    this.loadModel();
    this.changeDirection(); // Set an initial random direction
    this.setupRandomDirectionChange();
  }

  loadModel() {
    this.loader.load('Models/tuna_fish.glb', (gltf) => {
      this.fish = gltf.scene;
      this.scene.add(this.fish);

      // Set initial rotation
      this.fish.rotation.y = Math.PI / 2;

      // Scale and position the model
      this.fish.scale.set(0.5, 0.5, 0.5);
      this.fish.position.set(0, 0, 0);

      // Play the animation if available
      if (gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.fish);
        gltf.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });
      }
    });
  }

  // Change direction to a random value (rotate the fish)
  changeDirection() {
    this.targetRotation = Math.random() * Math.PI * 2; // Random direction (0 to 2π)
  }

  // Update the fish's rotation smoothly towards the target direction
  rotateFish() {
    let angleDiff = this.targetRotation - this.fish.rotation.y;

    // Normalize the angle difference to the range [-π, π]
    if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    // Smoothly rotate the fish towards the target direction
    this.fish.rotation.y += Math.sign(angleDiff) * this.rotationSpeed;
  }

  // Move the fish in the direction it's facing
  moveFish() {
    if (this.fish) {
      // Move the fish in the direction it's facing
      this.fish.position.x += Math.sin(this.fish.rotation.y) * this.speed;
      this.fish.position.z += Math.cos(this.fish.rotation.y) * this.speed;

      // Boundaries to prevent the fish from swimming off-screen
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Assuming the camera's z position is at 5
      const cameraZ = 5;

      // Boundaries (in world coordinates, based on the window size)
      const minBoundX = -w / 2;
      const maxBoundX = w / 2;
      const minBoundZ = -h / 2;
      const maxBoundZ = h / 2;

      if (this.fish.position.x > maxBoundX) this.fish.position.x = maxBoundX;
      if (this.fish.position.x < minBoundX) this.fish.position.x = minBoundX;
      if (this.fish.position.z > maxBoundZ) this.fish.position.z = maxBoundZ;
      if (this.fish.position.z < minBoundZ) this.fish.position.z = minBoundZ;
    }
  }

  // Set up random direction change every 5 seconds
  setupRandomDirectionChange() {
    setInterval(() => {
      this.changeDirection(); // Change direction randomly every 5 seconds
    }, 5000);
  }

  update() {
    // Update the animation mixer
    if (this.mixer) {
      this.mixer.update(0.01); // Update animation
    }

    this.rotateFish();  // Rotate the fish smoothly
    this.moveFish();    // Move the fish in the direction it's facing
  }
}
